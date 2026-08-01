// src/components/three/Scene3D.jsx
import { lazy, Suspense } from 'react';
import { use3DEnabled } from '../../lib/hooks';

const GraphCanvas = lazy(() => import('./GraphCanvas'));

/** Rendered always — also the fallback whenever WebGL is skipped. */
function Poster() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(60% 50% at 50% 38%, rgba(0,255,136,0.055) 0%, rgba(0,255,136,0) 70%), radial-gradient(45% 40% at 85% 15%, rgba(0,212,255,0.04) 0%, rgba(0,212,255,0) 70%)',
      }}
    />
  );
}

export default function Scene3D() {
  const enabled = use3DEnabled();

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Poster />
      {enabled && (
        <Suspense fallback={null}>
          <GraphCanvas />
        </Suspense>
      )}
    </div>
  );
}
