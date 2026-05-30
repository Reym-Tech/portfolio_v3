'use client';

import { Environment, Float, Lightformer } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

// John Remy: a single noble object, slowly breathing (DESIGN.md §7). Metal in the lone
// primary blue, lit by a soft neutral studio so reflections stay clean — never flashy.
// Loaded client-only and skipped entirely for reduced-motion visitors (see Hero).
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1.4} />

      <Float speed={1.1} rotationIntensity={0.6} floatIntensity={0.9}>
        <mesh>
          <torusKnotGeometry args={[0.9, 0.28, 220, 32]} />
          <meshStandardMaterial color="#3B82F6" roughness={0.1} metalness={1} />
        </mesh>
      </Float>

      {/* Self-contained neutral studio — soft reflections without a network HDR fetch. */}
      <Environment resolution={256}>
        <Lightformer intensity={2.4} position={[5, 5, 5]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.2} position={[-5, 2, -3]} scale={[10, 10, 1]} color="#cbd5e1" />
        <Lightformer intensity={0.8} position={[0, -5, 2]} scale={[10, 5, 1]} color="#ffffff" />
      </Environment>
    </Canvas>
  );
}
