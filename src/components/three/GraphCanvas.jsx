// src/components/three/GraphCanvas.jsx
// Lazy-loaded. Nothing in here is imported on first paint.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { buildGraph } from '../../lib/graph';
import { sceneStore } from '../../lib/sceneStore';

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ramp = (p, a, b) => clamp01((p - a) / (b - a));
const { lerp, damp } = THREE.MathUtils;

/* Shared displacement: points and edges must move together or the graph tears. */
const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uSpread;
  uniform float uSplit;
  uniform float uSize;
  uniform float uPulse;
  uniform vec3 uBright;

  attribute float aSeed;
  attribute float aCluster;
  attribute vec3 aCenter;

  varying float vFade;
  varying float vBright;

  void main() {
    vec3 p = position * uSpread + aCenter * uSplit;

    p += vec3(
      sin(uTime * 0.40 + aSeed * 6.2831),
      cos(uTime * 0.33 + aSeed * 4.1000),
      sin(uTime * 0.27 + aSeed * 2.7000)
    ) * (0.12 + 0.10 * uPulse);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float depth = -mv.z;

    vFade = smoothstep(18.0, 3.0, depth);
    vBright = dot(uBright, vec3(
      step(aCluster, 0.5),
      step(0.5, aCluster) * step(aCluster, 1.5),
      step(1.5, aCluster)
    ));

    gl_PointSize = uSize * (1.0 + 0.45 * uPulse) * (260.0 / max(depth, 0.001));
    gl_Position = projectionMatrix * mv;
  }
`;

const POINT_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uAlpha;
  varying float vFade;
  varying float vBright;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float sprite = smoothstep(0.5, 0.06, d);
    float b = 0.35 + 0.65 * vBright;
    gl_FragColor = vec4(uColor * b, sprite * vFade * uAlpha * b);
  }
`;

const LINE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uAlpha;
  varying float vFade;
  varying float vBright;

  void main() {
    float b = 0.30 + 0.70 * vBright;
    gl_FragColor = vec4(uColor * b, 0.16 * vFade * uAlpha * b);
  }
`;

function KnowledgeGraph() {
  const group = useRef(null);
  const { camera } = useThree();

  const graph = useMemo(() => buildGraph({ nodeCount: 600, neighbours: 3 }), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpread: { value: 1 },
      uSplit: { value: 0 },
      uAlpha: { value: 0 },
      uSize: { value: 5.5 },
      uPulse: { value: 0 },
      uBright: { value: new THREE.Vector3(1, 1, 1) },
      uColor: { value: new THREE.Color('#00ff88') },
    }),
    []
  );

  // Points and lines share attribute buffers — one upload, two draw calls total.
  const { pointsGeometry, linesGeometry } = useMemo(() => {
    const position = new THREE.BufferAttribute(graph.positions, 3);
    const aSeed = new THREE.BufferAttribute(graph.seeds, 1);
    const aCluster = new THREE.BufferAttribute(graph.clusters, 1);
    const aCenter = new THREE.BufferAttribute(graph.centers, 3);

    const attach = (geometry) => {
      geometry.setAttribute('position', position);
      geometry.setAttribute('aSeed', aSeed);
      geometry.setAttribute('aCluster', aCluster);
      geometry.setAttribute('aCenter', aCenter);
      return geometry;
    };

    const points = attach(new THREE.BufferGeometry());
    const lines = attach(new THREE.BufferGeometry());
    lines.setIndex(new THREE.BufferAttribute(graph.indices, 1));

    return { pointsGeometry: points, linesGeometry: lines };
  }, [graph]);

  useEffect(
    () => () => {
      pointsGeometry.dispose();
      linesGeometry.dispose();
    },
    [pointsGeometry, linesGeometry]
  );

  const brightTarget = useRef(new THREE.Vector3(1, 1, 1));

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const p = sceneStore.progress;

    // Phase ramps. Each one is 0 until its section, so the lerps chain cleanly.
    const pIn = ramp(p, 0.0, 0.15);
    const pAbout = ramp(p, 0.15, 0.35);
    const pExp = ramp(p, 0.35, 0.6);
    const pWork = ramp(p, 0.6, 0.8);
    const pEnd = ramp(p, 0.8, 1.0);

    let z = lerp(9.6, 8.2, pIn);
    z = lerp(z, 6.6, pAbout);
    z = lerp(z, 7.4, pExp);
    z = lerp(z, 9.2, pWork);
    z = lerp(z, 12.5, pEnd);

    let spread = lerp(1.0, 1.05, pIn);
    spread = lerp(spread, 1.3, pAbout);
    spread = lerp(spread, 1.15, pExp);
    spread = lerp(spread, 0.7, pWork);
    spread = lerp(spread, 2.4, pEnd);

    let alpha = 1;
    alpha = lerp(alpha, 0.45, pAbout);
    alpha = lerp(alpha, 0.5, pExp);
    alpha = lerp(alpha, 0.25, pWork);
    alpha = lerp(alpha, 0.05, pEnd);

    const split = lerp(0, 1, pExp) * (1 - pWork);

    // Camera pans to whichever company cluster is centred in the pinned scroll.
    const cluster = sceneStore.activeCluster;
    const pan = cluster >= 0 ? (cluster - 1) * 2.6 * split : 0;
    const targetX = pan + sceneStore.pointer.x * 0.3;

    camera.position.x = damp(camera.position.x, targetX, 3.5, dt);
    camera.position.z = damp(camera.position.z, z, 3.5, dt);
    camera.position.y = damp(camera.position.y, sceneStore.pointer.y * -0.18, 3.5, dt);

    if (group.current) {
      group.current.rotation.y += 0.04 * dt;
      group.current.rotation.x = damp(
        group.current.rotation.x,
        sceneStore.pointer.y * 0.052, // ±3°
        4,
        dt
      );
    }

    // Dim the two clusters that aren't being read.
    const active = cluster >= 0 && split > 0.05 ? cluster : -1;
    brightTarget.current.set(
      active === -1 || active === 0 ? 1 : 0.3,
      active === -1 || active === 1 ? 1 : 0.3,
      active === -1 || active === 2 ? 1 : 0.3
    );
    uniforms.uBright.value.lerp(brightTarget.current, 1 - Math.exp(-4 * dt));

    sceneStore.pulse *= Math.exp(-3 * dt);
    if (sceneStore.pulse < 0.001) sceneStore.pulse = 0;

    uniforms.uTime.value += dt;
    uniforms.uSpread.value = damp(uniforms.uSpread.value, spread, 4, dt);
    uniforms.uSplit.value = damp(uniforms.uSplit.value, split, 4, dt);
    uniforms.uAlpha.value = damp(uniforms.uAlpha.value, alpha, 4, dt);
    uniforms.uPulse.value = sceneStore.pulse;
  });

  return (
    <group ref={group}>
      <points>
        <primitive object={pointsGeometry} attach="geometry" />
        <shaderMaterial
          attach="material"
          uniforms={uniforms}
          vertexShader={VERTEX}
          fragmentShader={POINT_FRAGMENT}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments>
        <primitive object={linesGeometry} attach="geometry" />
        <shaderMaterial
          attach="material"
          uniforms={uniforms}
          vertexShader={VERTEX}
          fragmentShader={LINE_FRAGMENT}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export default function GraphCanvas() {
  // Stop rendering entirely when the tab isn't visible.
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
      camera={{ position: [0, 0, 9.6], fov: 50, near: 0.1, far: 60 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <KnowledgeGraph />
    </Canvas>
  );
}
