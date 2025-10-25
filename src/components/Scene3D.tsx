/*
 * Scene3D.tsx - Main Three.js/React-Three-Fiber scene setup.
 * Adjustments made to camera position and controls to make the model appear smaller,
 * while increasing the apparent size and proximity of the project tabs.
 */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stars, Float } from "@react-three/drei";
// FIX: Simplifying import path to avoid recurring file resolution error.
import Untitled from "../assets/3D models/Untitled.jsx";

interface Scene3DProps {
  onHotspotClick: (hotspotId: string) => void;
}

export default function Scene3D({ onHotspotClick }: Scene3DProps) {
  return (
    <div className="w-full h-screen relative font-['Helvetica']">
      <Canvas
        // Camera moved farther back to make the model smaller initially
        camera={{ position: [0, 7, 13], fov: 55 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 15, 10]}
            intensity={1}
            castShadow
          />
          <pointLight position={[-10, -5, -10]} color="#8B5CF6" intensity={0.3} />
          <pointLight position={[10, -5, 10]} color="#06B6D4" intensity={0.3} />

          {/* Main 3D Island Model with floating text hotspots */}
          {/* Slightly scaled up so the project tabs appear larger and closer together */}
          <group scale={[1.3, 1.3, 1.3]}>
            <Untitled onHotspotClick={onHotspotClick} />
          </group>

          {/* Environment & Stars */}
          <Environment preset="sunset" />
          <Stars radius={50} depth={50} count={1200} factor={4} saturation={0} fade />

          {/* Floating particles for atmosphere */}
          <Float speed={2} rotationIntensity={0.1} floatIntensity={2}>
            <mesh position={[-4, 3, 2]}>
              <sphereGeometry args={[0.05]} />
              <meshBasicMaterial color="#8B5CF6" transparent opacity={0.6} />
            </mesh>
          </Float>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={1.5}>
            <mesh position={[5, 4, -1]}>
              <sphereGeometry args={[0.03]} />
              <meshBasicMaterial color="#06B6D4" transparent opacity={0.7} />
            </mesh>
          </Float>
          <Float speed={2.5} rotationIntensity={0.1} floatIntensity={2.5}>
            <mesh position={[0, 6, -3]}>
              <sphereGeometry args={[0.04]} />
              <meshBasicMaterial color="#F59E0B" transparent opacity={0.5} />
            </mesh>
          </Float>

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            // Adjusted zoom range to suit the new camera distance
            minDistance={6}
            maxDistance={16}
            autoRotate
            autoRotateSpeed={0.4}
          />
        </Suspense>
      </Canvas>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </div>

      {/* Title Overlay */}
      <div className="absolute top-10 w-full text-center">
        <h1 className="text-5xl font-bold text-white animate-pulse tracking-wide">
          Pragati&apos;s Portfolio
        </h1>
      </div>
    </div>
  );
}
