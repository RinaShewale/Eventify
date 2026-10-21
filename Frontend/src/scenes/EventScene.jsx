import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function CelebrationSphere() {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={meshRef}>
        {/* Main sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#ff6b3d"
            emissive="#ff6b3d"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Inner glow sphere */}
        <mesh scale={0.85}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#ffa07a"
            emissive="#ffa07a"
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingRing({ position, rotation, color, scale = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 + rotation[0];
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2 + rotation[2];
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[0.5, 0.08, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.7}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

function FloatingShape({ position, color, geometry = 'octahedron', scale = 0.3 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          transparent
          opacity={0.6}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <Environment preset="sunset" />
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffa07a" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#c084fc" />

      <CelebrationSphere />

      <FloatingRing position={[2, 0.5, -1]} rotation={[0.5, 0, 0.3]} color="#c084fc" scale={0.8} />
      <FloatingRing position={[-1.8, -0.8, -0.5]} rotation={[0.2, 0, -0.5]} color="#ff8a6b" scale={0.6} />

      <FloatingShape position={[1.8, -1, 0.5]} color="#a855f7" geometry="octahedron" scale={0.25} />
      <FloatingShape position={[-2, 1.2, 0]} color="#ff6b3d" geometry="dodecahedron" scale={0.2} />
      <FloatingShape position={[0.8, 1.8, -0.5]} color="#fbbf24" geometry="icosahedron" scale={0.18} />

      <Sparkles count={40} scale={5} size={2} speed={0.5} color="#ff8a6b" opacity={0.5} />
    </>
  );
}

export default function EventScene({ className = '' }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
