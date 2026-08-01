// src/lib/sceneStore.js
// Mutable bridge between the DOM layer and the WebGL layer.
// Deliberately not React state: these values change on every mousemove and are
// read inside useFrame, so re-rendering on them would be a disaster.

export const sceneStore = {
  /** whole-document scroll progress, 0..1 — written by <ScrollProgress /> */
  progress: 0,
  /** normalised pointer, -1..1 on both axes */
  pointer: { x: 0, y: 0 },
  /** which experience cluster is centred (0-2), -1 when not in that section */
  activeCluster: -1,
  /** 0..1, spiked on project hover, decays in useFrame */
  pulse: 0,
};

export const setPointer = (x, y) => {
  sceneStore.pointer.x = x;
  sceneStore.pointer.y = y;
};

export const setActiveCluster = (index) => {
  sceneStore.activeCluster = index;
};

export const firePulse = () => {
  sceneStore.pulse = 1;
};
