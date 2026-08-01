// src/lib/graph.js
// Procedural knowledge-graph geometry: nodes on a lobed volume, each wired to
// its k nearest neighbours. Seeded so the layout is identical on every load.

function mulberry32(seed) {
  let a = seed >>> 0;
  return function random() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Where each cluster travels to when the graph splits during the experience section.
const CLUSTER_CENTERS = [
  [-3.4, 0.25, -0.4],
  [0.0, -0.3, 0.3],
  [3.4, 0.35, -0.2],
];

export function buildGraph({ nodeCount = 600, neighbours = 3, seed = 7 } = {}) {
  const random = mulberry32(seed);

  const positions = new Float32Array(nodeCount * 3);
  const seeds = new Float32Array(nodeCount);
  const clusters = new Float32Array(nodeCount);
  const centers = new Float32Array(nodeCount * 3);

  for (let i = 0; i < nodeCount; i++) {
    // uniform direction on the sphere
    const u = random() * 2 - 1;
    const theta = random() * Math.PI * 2;
    const s = Math.sqrt(Math.max(0, 1 - u * u));

    // lobed radius so it reads as a structure, not a beach ball
    const lobe = 1 + 0.32 * Math.sin(3 * theta) * Math.cos(2 * Math.acos(u));
    const r = (1.5 + 1.3 * Math.cbrt(random())) * lobe;

    const x = s * Math.cos(theta) * r;
    const y = u * r * 0.82;
    const z = s * Math.sin(theta) * r;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    seeds[i] = random();

    // three coherent wedges around Y — one per company
    const angle = Math.atan2(z, x) + Math.PI; // 0..2π
    const cluster = Math.min(2, Math.floor((angle / (Math.PI * 2)) * 3));
    clusters[i] = cluster;
    centers[i * 3] = CLUSTER_CENTERS[cluster][0];
    centers[i * 3 + 1] = CLUSTER_CENTERS[cluster][1];
    centers[i * 3 + 2] = CLUSTER_CENTERS[cluster][2];
  }

  // k nearest neighbours, deduplicated — O(n²) once at init, ~360k ops at n=600
  const pairs = new Set();
  const best = new Array(neighbours);
  for (let i = 0; i < nodeCount; i++) {
    for (let k = 0; k < neighbours; k++) best[k] = { j: -1, d: Infinity };

    const ax = positions[i * 3];
    const ay = positions[i * 3 + 1];
    const az = positions[i * 3 + 2];

    for (let j = 0; j < nodeCount; j++) {
      if (j === i) continue;
      const dx = ax - positions[j * 3];
      const dy = ay - positions[j * 3 + 1];
      const dz = az - positions[j * 3 + 2];
      const d = dx * dx + dy * dy + dz * dz;
      if (d >= best[neighbours - 1].d) continue;

      let slot = neighbours - 1;
      while (slot > 0 && best[slot - 1].d > d) {
        best[slot] = best[slot - 1];
        slot--;
      }
      best[slot] = { j, d };
    }

    for (let k = 0; k < neighbours; k++) {
      const j = best[k].j;
      if (j < 0) continue;
      const lo = Math.min(i, j);
      const hi = Math.max(i, j);
      pairs.add(lo * nodeCount + hi);
    }
  }

  const indices = new Uint16Array(pairs.size * 2);
  let cursor = 0;
  pairs.forEach((key) => {
    indices[cursor++] = Math.floor(key / nodeCount);
    indices[cursor++] = key % nodeCount;
  });

  return { positions, seeds, clusters, centers, indices, nodeCount };
}
