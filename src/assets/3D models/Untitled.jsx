/*
 * Untitled.jsx - City model with fixed-position, clearly visible hotspots
 */

import { useRef } from "react";
import { useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

import modelUrl from "../neighbourhood-city-modular-lowpoly/source/Untitled.glb";

// Predefined fixed hotspot positions (x, y, z)
const HOTSPOT_POSITIONS = {
  "design-portfolio": [1.5, 1.2, -0.5],
  "web-development": [-1, 1.3, 0.7],
  "tannin-project": [0.5, 1.4, 1.5],
  "uni-projects": [-1.5, 1.2, -1],
  "automobile": [0.8, 1.5, -1.8],
};

export default function Untitled({ onHotspotClick }) {
  const groupRef = useRef();

  const { scene } = useGLTF(modelUrl);

  const projectLabels = [
    { id: "design-portfolio", label: "DESIGN\nPORTFOLIO", color: "#8B5CF6" },
    { id: "web-development", label: "WEB\nDEVELOPMENT", color: "#06B6D4" },
    { id: "tannin-project", label: "TANNIN\nPROJECT", color: "#F59E0B" },
    { id: "uni-projects", label: "UNI\nPROJECTS", color: "#10B981" },
    { id: "automobile", label: "AUTOMOBILE\nPROJECTS", color: "#EF4444" },
  ];

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <hemisphereLight intensity={0.6} groundColor="blue" />

      {/* Main city model */}
      <primitive object={scene} scale={0.3} position={[0, -1, 0]} />

      {/* Hotspots */}
      {projectLabels.map((hotspot) => (
        <group key={hotspot.id} position={HOTSPOT_POSITIONS[hotspot.id]}>
          <Html
            distanceFactor={5.5}
            style={{ pointerEvents: "auto", userSelect: "none" }}
          >
            <div
              className="glass-card px-7 py-4 cursor-pointer transition-all duration-300 hover:scale-125 text-center min-w-[200px] rounded-xl shadow-xl"
              style={{
                color: hotspot.color,
                border: `2px solid ${hotspot.color}`,
                boxShadow: `0 0 30px ${hotspot.color}AA, 0 0 60px ${hotspot.color}55`,
                background: `rgba(0,0,0,0.6)`,
                fontSize: "2rem",
                fontWeight: "900",
                lineHeight: "1.2",
                textShadow: `0 0 10px ${hotspot.color}, 0 0 20px ${hotspot.color}`,
              }}
              onClick={() => onHotspotClick(hotspot.id)}
            >
              <div className="whitespace-pre-line tracking-wider">
                {hotspot.label}
              </div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

useGLTF.preload(modelUrl);
