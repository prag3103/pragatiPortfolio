import React from 'react';
import { useGLTF } from '@react-three/drei';
import InteractiveBook from './InteractiveBook';

// ✅ Correct GLB import
import libraryGLBUrl from '@/assets/3D models/library.glb';

export default function Library({ onBookClick, ...props }) {
  // ✅ Load the GLB model
  const { nodes, materials } = useGLTF(libraryGLBUrl);

  const getInteractiveBookProps = (nodeName) => ({
    mesh: nodes[nodeName],
    bookId: nodeName,
    onBookClick,
  });

  const INTERACTIVE_BOOKS = [
    'purple book',
    'green book',
    'yellow book',
    'lilac book',
  ];

  return (
    <group
      {...props}
      dispose={null}
      // ✅ Adjusted to make the scene more visible on load
      scale={[0.75, 0.75, 0.75]}
      position={[0, -1.5, 0]}
    >
      {Object.keys(nodes).map((key) => {
        if (INTERACTIVE_BOOKS.includes(key)) {
          return <InteractiveBook key={key} {...getInteractiveBookProps(key)} />;
        }

        const node = nodes[key];
        if (!node.geometry) return null;

        return (
          <mesh
            key={key}
            geometry={node.geometry}
            material={node.material}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
          />
        );
      })}
    </group>
  );
}

// ✅ Preload the model
useGLTF.preload(libraryGLBUrl);
