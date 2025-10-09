/*
 * Untitled.jsx - City model with grouped building hotspots (fixed)
 */

import { useRef, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

import modelUrl from "../neighbourhood-city-modular-lowpoly/source/Untitled.glb";

// Adjust this value to control how high the labels float above the building center.
// Lowering this can also help fix the "spread out" look if the center calculation is too high.
const HOTSPOT_HEIGHT_OFFSET = 2.0; 

export default function Untitled({ onHotspotClick }) {
  const groupRef = useRef();
  const [hotspots, setHotspots] = useState([]);

  const { scene } = useGLTF(modelUrl);

  // Define your projects
  const projectLabels = [
    { id: "design-portfolio", label: "DESIGN\nPORTFOLIO", color: "#8B5CF6" },
    { id: "web-development", label: "WEB\nDEVELOPMENT", color: "#06B6D4" },
    { id: "tannin-project", label: "TANNIN\nPROJECT", color: "#F59E0B" },
    { id: "uni-projects", label: "UNI\nPROJECTS", color: "#10B981" },
    { id: "automobile", label: "AUTOMOBILE\nPROJECTS", color: "#EF4444" },
  ];

  useEffect(() => {
    const buildingGroups = {};

    // Group meshes by prefix (first 3 parts of name)
    scene.traverse((child) => {
      if (child.type === "Mesh") {
        const parts = child.name.split("_");
        // Adjusted prefix logic to capture most common building parts.
        // It's possible the original logic was too broad.
        const prefix = parts.slice(0, 2).join("_"); 
        if (!buildingGroups[prefix]) buildingGroups[prefix] = [];
        buildingGroups[prefix].push(child);
      }
    });

    // Turn groups into hotspots
    const newHotspots = [];
    const groupKeys = Object.keys(buildingGroups).sort(); // consistent order

    groupKeys.slice(0, projectLabels.length).forEach((prefix, i) => {
      const meshes = buildingGroups[prefix];
      const box = new THREE.Box3();

      // Only expand the box if the mesh is visible (e.g., has geometry)
      meshes.forEach((mesh) => {
          if (mesh.geometry) {
              box.expandByObject(mesh);
          }
      });
      
      // Safety check: ensure the box is not empty
      if (box.isEmpty()) return;


      const center = new THREE.Vector3();
      box.getCenter(center);

      const project = projectLabels[i];
      console.log(`🏢 Assigned ${project.label} → ${prefix} at`, center);

      newHotspots.push({
        ...project,
        // Use the defined offset to control hover height
        position: [center.x, center.y + HOTSPOT_HEIGHT_OFFSET, center.z], 
      });
    });

    setHotspots(newHotspots);
  }, [scene]);

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <hemisphereLight intensity={0.6} groundColor="blue" />

      {/* Main city model */}
      <primitive object={scene} scale={0.15} position={[0, -1, 0]} />

      {/* Hotspots */}
      {hotspots.map((hotspot) => (
        <group key={hotspot.id} position={hotspot.position}>
          <Html 
            distanceFactor={8} // Reduced from 12 to 8: This makes the HTML label appear larger/closer when the camera moves away, visually 'tightening' the distribution.
            style={{ pointerEvents: "auto", userSelect: "none" }}
          >
            <div
              className="glass-card px-4 py-2 cursor-pointer transition-all duration-300 hover:scale-110 text-center min-w-[120px]"
              style={{ color: hotspot.color, borderColor: `${hotspot.color}33` }}
              onClick={() => onHotspotClick(hotspot.id)}
            >
              <div className="text-xs font-bold whitespace-pre-line">{hotspot.label}</div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

useGLTF.preload(modelUrl);
