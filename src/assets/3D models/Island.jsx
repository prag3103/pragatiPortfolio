import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

export function Island({ onHotspotClick }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  // Create the island geometry procedurally since we don't have a 3D model file
  const IslandMesh = () => {
    const islandRef = useRef();
    
    return (
      <group ref={islandRef}>
        {/* Main island base */}
        <mesh position={[0, -1, 0]} receiveShadow>
          <cylinderGeometry args={[4, 3, 2, 32]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
        
        {/* Grass top */}
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <cylinderGeometry args={[3.8, 3.8, 0.2, 32]} />
          <meshStandardMaterial color="#4ADE80" />
        </mesh>
        
        {/* Main building (rocket/tower) */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <coneGeometry args={[0.5, 2, 8]} />
          <meshStandardMaterial color="#F97316" />
        </mesh>
        
        {/* Building base */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.6, 1, 8]} />
          <meshStandardMaterial color="#DC2626" />
        </mesh>
        
        {/* Design Portfolio Building */}
        <mesh position={[-2, 0.7, 1]} castShadow>
          <boxGeometry args={[0.8, 1.4, 0.8]} />
          <meshStandardMaterial color="#8B5CF6" />
        </mesh>
        
        {/* Web Development Building */}
        <mesh position={[2, 0.5, 1]} castShadow>
          <boxGeometry args={[1, 1, 0.6]} />
          <meshStandardMaterial color="#06B6D4" />
        </mesh>
        
        {/* Tannin Project Structure */}
        <mesh position={[-1.5, 0.3, -1.5]} castShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#F59E0B" />
        </mesh>
        
        {/* Uni Projects Building */}
        <mesh position={[1.5, 0.4, -1.5]} castShadow>
          <boxGeometry args={[0.7, 0.8, 0.7]} />
          <meshStandardMaterial color="#10B981" />
        </mesh>
        
        {/* Automobile Research Structure */}
        <mesh position={[2.5, 0.3, -0.5]} castShadow>
          <boxGeometry args={[0.5, 0.6, 1]} />
          <meshStandardMaterial color="#EF4444" />
        </mesh>
        
        {/* Trees */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 2.5 + Math.random() * 0.5;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          
          return (
            <group key={i} position={[x, 0.2, z]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.4]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[0, 0.3, 0]} castShadow>
                <sphereGeometry args={[0.15]} />
                <meshStandardMaterial color="#22C55E" />
              </mesh>
            </group>
          );
        })}
      </group>
    );
  };

  // Interactive hotspots
  const hotspots = [
    {
      id: 'design-portfolio',
      position: [-2, 1.8, 1],
      label: 'DESIGN\nPORTFOLIO',
      color: '#8B5CF6'
    },
    {
      id: 'web-development',
      position: [2, 1.5, 1],
      label: 'Web\ndevelopment',
      color: '#06B6D4'
    },
    {
      id: 'tannin-project',
      position: [-1.5, 1.2, -1.5],
      label: 'TANNIN PROJECT',
      color: '#F59E0B'
    },
    {
      id: 'uni-projects',
      position: [1.5, 1.4, -1.5],
      label: 'UNI PROJECTS',
      color: '#10B981'
    },
    {
      id: 'automobile',
      position: [2.5, 1.2, -0.5],
      label: 'AUTOMOBILE\nprojects and\nresearch',
      color: '#EF4444'
    }
  ];

  return (
    <group ref={groupRef}>
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
        <IslandMesh />
        
        {/* Interactive Hotspots */}
        {hotspots.map((hotspot) => (
          <group key={hotspot.id} position={hotspot.position}>
            <Html
              distanceFactor={8}
              style={{
                pointerEvents: 'auto',
                userSelect: 'none'
              }}
            >
              <div
                className={`
                  glass-card px-4 py-2 cursor-pointer transition-all duration-300
                  hover:scale-110 hover:glow text-center min-w-[120px]
                  ${hovered === hotspot.id ? 'scale-110 glow' : ''}
                `}
                style={{
                  color: hotspot.color,
                  borderColor: `${hotspot.color}33`
                }}
                onMouseEnter={() => setHovered(hotspot.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onHotspotClick(hotspot.id)}
              >
                <div className="text-xs font-bold whitespace-pre-line">
                  {hotspot.label}
                </div>
              </div>
            </Html>
          </group>
        ))}
      </Float>
    </group>
  );
}

export default Island;