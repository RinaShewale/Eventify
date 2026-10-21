import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment, PerspectiveCamera } from '@react-three/drei';

function OrbCore() {
  const meshRef = useRef();
  const outerRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
    if (outerRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      outerRef.current.scale.setScalar(s);
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        {/* Core */}
        <mesh ref={outerRef}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Inner glow */}
        <mesh scale={0.5}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#e9d5ff"
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Orbit ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.9, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#ff6b3d"
            emissive="#ff6b3d"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>

        <mesh rotation={[Math.PI / 6, Math.PI / 4, 0]}>
          <torusGeometry args={[1.1, 0.015, 16, 64]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#c084fc"
            emissiveIntensity={0.4}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

function OrbSceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={40} />
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#a855f7" />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#ff6b3d" />

      <OrbCore />

      <Sparkles count={30} scale={4} size={1.5} speed={0.8} color="#c084fc" opacity={0.6} />
    </>
  );
}

export default function AIOrb({ className = '', size = 'md' }) {
  const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80',
  };

  return (
    <div className={`${sizeMap[size]} ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <OrbSceneContent />
      </Canvas>
    </div>
  );
}
