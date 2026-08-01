// src/components/three/Scene3D.jsx
import { lazy, Suspense } from 'react';
import { use3DEnabled } from '../../lib/hooks';
import { useTheme } from '../../lib/themeContext';

const LaptopCanvas = lazy(() => import('./LaptopCanvas'));

/** Always rendered — and the whole visual when WebGL is skipped. */
function Poster() {
  return <div className="absolute inset-0" style={{ background: 'var(--poster)' }} />;
}

export default function Scene3D() {
  const enabled = use3DEnabled();
  const { theme } = useTheme();

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Poster />
      {enabled && (
        <Suspense fallback={null}>
          <LaptopCanvas theme={theme} />
        </Suspense>
      )}
    </div>
  );
}
