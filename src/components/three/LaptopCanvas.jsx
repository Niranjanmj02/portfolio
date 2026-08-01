// src/components/three/LaptopCanvas.jsx
// Lazy-loaded. Procedural laptop — no GLTF, no external assets, no loader.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { sceneStore } from '../../lib/sceneStore';

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ramp = (p, a, b) => clamp01((p - a) / (b - a));
const { lerp, damp } = THREE.MathUtils;

// Hinge is at the back edge: +90° lays the lid flat on the deck,
// 0 is vertical, and a little negative leans the screen back.
const LAPTOP_WIDTH = 3.3;
const LID_CLOSED = Math.PI / 2;
const LID_OPEN = -0.28; // ~106° from the deck

const PALETTE = {
  dark: {
    body: '#c9d1d9',
    bodyMetal: 0.82,
    bodyRough: 0.32,
    deck: '#0d1117',
    key: '#161b22',
    screenA: '#021c26',
    screenB: '#00d4ff',
    ambient: 0.55,
    key1: 1.5,
    rim: '#00d4ff',
    rimPower: 2.4,
  },
  light: {
    body: '#5b6570',
    bodyMetal: 0.7,
    bodyRough: 0.38,
    deck: '#20262e',
    key: '#2c333c',
    screenA: '#05323f',
    screenB: '#22d3ee',
    ambient: 1.15,
    key1: 2.1,
    rim: '#06b6d4',
    rimPower: 1.5,
  },
};

const SCREEN_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Abstract "IDE at a glance" — bars of code, a cursor line, a slow sweep.
const SCREEN_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uOn;
  uniform float uPulse;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    vec2 uv = vUv;
    vec3 col = mix(uColorA, uColorA * 1.6, uv.y);

    // code bars
    const float ROWS = 16.0;
    float row = floor((1.0 - uv.y) * ROWS);
    float r = hash(row * 3.17);
    float indent = 0.06 + step(0.55, hash(row * 7.7)) * 0.06;
    float width = 0.16 + r * 0.58;
    float inRow = step(0.28, fract((1.0 - uv.y) * ROWS)) * step(fract((1.0 - uv.y) * ROWS), 0.62);
    float inCol = step(indent, uv.x) * step(uv.x, indent + width);
    float bar = inRow * inCol;

    float twinkle = 0.55 + 0.45 * sin(uTime * 0.7 + row * 1.7);
    col += uColorB * bar * 0.55 * twinkle;

    // caret on one line
    float caretRow = floor(mod(uTime * 0.5, ROWS));
    float caret = step(abs(row - caretRow), 0.5) *
                  step(indent + width, uv.x) * step(uv.x, indent + width + 0.012) *
                  inRow * step(0.5, fract(uTime * 1.6));
    col += uColorB * caret * 1.6;

    // slow sweep
    float sweep = smoothstep(0.16, 0.0, abs(fract(uv.y + uTime * 0.05) - 0.5));
    col += uColorB * sweep * 0.05;

    // panel vignette
    col *= smoothstep(1.25, 0.4, length((uv - 0.5) * vec2(1.1, 1.35)) * 1.3);

    gl_FragColor = vec4(col * (0.04 + 0.96 * uOn) * (1.0 + 0.5 * uPulse), 1.0);
  }
`;

function Laptop({ theme }) {
  const root = useRef(null);
  const lidPivot = useRef(null);
  const glowRef = useRef(null);
  const { camera, size, gl } = useThree();

  const palette = PALETTE[theme] || PALETTE.dark;

  const geometry = useMemo(
    () => ({
      base: new RoundedBoxGeometry(LAPTOP_WIDTH, 0.17, 2.3, 4, 0.07),
      lid: new RoundedBoxGeometry(LAPTOP_WIDTH, 2.16, 0.09, 4, 0.05),
      deck: new THREE.PlaneGeometry(3.06, 2.06),
      screen: new THREE.PlaneGeometry(3.04, 1.9),
      key: new THREE.BoxGeometry(0.155, 0.03, 0.145),
      trackpad: new THREE.PlaneGeometry(1.02, 0.66),
    }),
    []
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOn: { value: 0 },
      uPulse: { value: 0 },
      uColorA: { value: new THREE.Color(PALETTE.dark.screenA) },
      uColorB: { value: new THREE.Color(PALETTE.dark.screenB) },
    }),
    []
  );

  useEffect(() => {
    uniforms.uColorA.value.set(palette.screenA);
    uniforms.uColorB.value.set(palette.screenB);
  }, [palette, uniforms]);

  useEffect(
    () => () => Object.values(geometry).forEach((g) => g.dispose()),
    [geometry]
  );

  // 70 keys as one InstancedMesh — one draw call for the whole keyboard.
  const keys = useMemo(() => {
    const COLS = 14;
    const ROWS = 5;
    const matrix = new THREE.Matrix4();
    const instances = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        matrix.makeTranslation(
          -1.32 + c * 0.203,
          0.096,
          -0.42 + r * 0.185
        );
        instances.push(matrix.clone());
      }
    }
    return instances;
  }, []);

  const keyMeshRef = useRef(null);
  useEffect(() => {
    const mesh = keyMeshRef.current;
    if (!mesh) return;
    keys.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.instanceMatrix.needsUpdate = true;
  }, [keys]);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    // Section-relative position: 0 hero, 1 about, 2 experience, 3 work,
    // 4 skills, 5 research, 6 contact. Fractions are progress within a section.
    const st = sceneStore.stage;
    const mobile = size.width < 768;

    // ── lid: opens through the hero, closes again as you reach contact ──
    const openness = ramp(st, 0.38, 1.1) * (1 - ramp(st, 5.6, 6.5));

    if (lidPivot.current) {
      const target = lerp(LID_CLOSED, LID_OPEN, openness);
      lidPivot.current.rotation.x = damp(lidPivot.current.rotation.x, target, 6, dt);
    }
    uniforms.uOn.value = damp(uniforms.uOn.value, openness, 5, dt);

    // ── camera: one continuous take across the page ──
    const pAbout = ramp(st, 0.75, 1.25); // hero -> about
    const pExp = ramp(st, 1.75, 2.2); // about -> experience
    const pWork = ramp(st, 2.8, 3.2); // experience -> work
    const pEnd = ramp(st, 4.4, 5.6); // skills -> research -> contact

    // It's set dressing, not the subject — keep it small and out of the
    // reading column. Size is driven by scale, not by dollying the camera.
    let scale = mobile ? 0.62 : 0.58;
    scale = lerp(scale, mobile ? 0.55 : 0.52, pAbout);
    scale = lerp(scale, mobile ? 0.5 : 0.48, pWork);
    scale = lerp(scale, mobile ? 0.44 : 0.42, pEnd);

    let z = lerp(7.6, 7.2, ramp(st, 0.0, 0.6));
    z = lerp(z, 7.0, pAbout);
    z = lerp(z, 7.6, pExp);
    z = lerp(z, 8.0, pWork);
    z = lerp(z, 9.2, pEnd);

    // Never frame it tighter than it fits. Derived from the live aspect and
    // the current scale, so it holds on any phone.
    const aspect = size.width / Math.max(1, size.height);
    const vFov = (camera.fov * Math.PI) / 180;
    const fitZ = (LAPTOP_WIDTH * scale * 1.5) / (2 * Math.tan(vFov / 2) * aspect);
    z = Math.max(z, fitZ);

    // Look down on the closed lid, then level off as it opens.
    let height = lerp(1.55, 1.15, openness);
    height = lerp(height, 1.05, pAbout);
    height = lerp(height, 1.3, pEnd);

    camera.position.z = damp(camera.position.z, z, 3, dt);
    camera.position.y = damp(camera.position.y, height + sceneStore.pointer.y * -0.12, 3, dt);
    camera.position.x = damp(camera.position.x, sceneStore.pointer.x * 0.22, 3, dt);
    camera.lookAt(0, 0.3, 0);

    if (root.current) {
      // Sit in the right gutter on desktop and cross to the left for Work.
      // Mobile has no gutter, so it stays centred and low behind the content.
      let offsetX = mobile ? 0 : 2.0;
      offsetX = lerp(offsetX, mobile ? 0 : 2.85, pAbout);
      offsetX = lerp(offsetX, 0, pExp);
      offsetX = lerp(offsetX, mobile ? 0 : -2.9, pWork);
      offsetX = lerp(offsetX, 0, pEnd);

      let offsetY = mobile ? -0.55 : -0.3;
      offsetY = lerp(offsetY, mobile ? -0.2 : -0.95, pAbout);
      offsetY = lerp(offsetY, 0, pExp);

      // Yaw: idle drift, pointer parallax, and a nudge per experience card.
      const cluster = sceneStore.activeCluster;
      const clusterYaw = cluster >= 0 ? (cluster - 1) * 0.3 : 0;
      const yaw =
        -0.5 +
        lerp(0, 0.34, ramp(st, 0.0, 0.8)) +
        clusterYaw +
        sceneStore.pointer.x * 0.13 +
        Math.sin(state.clock.elapsedTime * 0.18) * 0.05;

      const pitch =
        lerp(0.44, 0.12, openness) + sceneStore.pointer.y * 0.05 + lerp(0, 0.14, pEnd);

      root.current.position.x = damp(root.current.position.x, offsetX, 3, dt);
      root.current.position.y = damp(
        root.current.position.y,
        offsetY + Math.sin(state.clock.elapsedTime * 0.5) * 0.04,
        3,
        dt
      );
      root.current.rotation.y = damp(root.current.rotation.y, yaw, 3.5, dt);
      root.current.rotation.x = damp(root.current.rotation.x, pitch, 3.5, dt);
      root.current.scale.setScalar(damp(root.current.scale.x, scale, 3, dt));
    }

    if (glowRef.current) {
      glowRef.current.intensity = damp(
        glowRef.current.intensity,
        openness * (theme === 'light' ? 2.2 : 3.4),
        4,
        dt
      );
    }

    sceneStore.pulse *= Math.exp(-3 * dt);
    if (sceneStore.pulse < 0.001) sceneStore.pulse = 0;
    uniforms.uPulse.value = sceneStore.pulse;
    uniforms.uTime.value += dt;

    // Canvas opacity is a compositor-only change — keeps text legible without
    // touching a single material.
    let alpha = 0.9;
    alpha = lerp(alpha, 0.16, pAbout);
    alpha = lerp(alpha, 0.38, pExp);
    alpha = lerp(alpha, 0.18, pWork);
    alpha = lerp(alpha, 0.1, pEnd);
    if (mobile) alpha *= 0.8;
    // A dark laptop under dark body text is harsher than a light one on dark.
    if (theme === 'light') alpha *= 0.72;
    const el = gl.domElement;
    const current = parseFloat(el.style.opacity || '0');
    el.style.opacity = String(damp(current, alpha, 4, dt).toFixed(3));
  });

  return (
    <>
      <ambientLight intensity={palette.ambient} />
      <directionalLight position={[3.5, 6, 4]} intensity={palette.key1} />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color={palette.rim} />
      <pointLight ref={glowRef} position={[0, 1.5, 0.6]} intensity={0} color={palette.rim} distance={9} />

      <group ref={root} position={[0, 0, 0]}>
        {/* base */}
        <mesh geometry={geometry.base} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={palette.body}
            metalness={palette.bodyMetal}
            roughness={palette.bodyRough}
          />
        </mesh>

        {/* deck inlay */}
        <mesh geometry={geometry.deck} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.087, 0.02]}>
          <meshStandardMaterial color={palette.deck} metalness={0.2} roughness={0.85} />
        </mesh>

        {/* keys */}
        <instancedMesh
          ref={keyMeshRef}
          args={[geometry.key, null, keys.length]}
          frustumCulled={false}
        >
          <meshStandardMaterial color={palette.key} metalness={0.15} roughness={0.9} />
        </instancedMesh>

        {/* trackpad */}
        <mesh
          geometry={geometry.trackpad}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.089, 0.74]}
        >
          <meshStandardMaterial color={palette.deck} metalness={0.4} roughness={0.5} />
        </mesh>

        {/* lid — pivots on the hinge at the back edge */}
        <group ref={lidPivot} position={[0, 0.08, -1.12]} rotation={[LID_CLOSED, 0, 0]}>
          <mesh geometry={geometry.lid} position={[0, 1.07, -0.045]}>
            <meshStandardMaterial
              color={palette.body}
              metalness={palette.bodyMetal}
              roughness={palette.bodyRough}
            />
          </mesh>

          <mesh geometry={geometry.screen} position={[0, 1.07, 0.006]}>
            <shaderMaterial
              uniforms={uniforms}
              vertexShader={SCREEN_VERTEX}
              fragmentShader={SCREEN_FRAGMENT}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default function LaptopCanvas({ theme = 'dark' }) {
  const [frameloop, setFrameloop] = useState('always');

  useEffect(() => {
    const onVisibility = () =>
      setFrameloop(document.visibilityState === 'visible' ? 'always' : 'never');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.5]}
      camera={{ position: [0, 2.0, 6.9], fov: 40, near: 0.1, far: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      // NOTE: this style goes on R3F's wrapper div, not the canvas element.
      // Never put opacity here — useFrame fades gl.domElement (the canvas).
      style={{ position: 'absolute', inset: 0 }}
      onCreated={({ gl }) => {
        gl.domElement.style.opacity = '0';
      }}
    >
      <Laptop theme={theme} />
    </Canvas>
  );
}
