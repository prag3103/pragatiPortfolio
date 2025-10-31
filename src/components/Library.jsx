import React from 'react';
import { useGLTF } from '@react-three/drei';
import InteractiveBook from './InteractiveBook';
import libraryGLBUrl from '@/assets/3D models/library.glb';

export default function Library({ onBookClick, ...props }) {
  const { nodes, materials } = useGLTF(libraryGLBUrl);

  const INTERACTIVE_BOOKS = ['purple book', 'green book', 'yellow book', 'lilac book'];

  return (
    <group {...props} dispose={null} scale={[0.2, 0.2, 0.2]} position={[0, -1.5, 0]}>
      {Object.entries(nodes).map(([key, node]) => {
        if (!node.geometry) return null;

        // Render interactive books with click functionality
        if (INTERACTIVE_BOOKS.includes(key)) {
          return (
            <InteractiveBook
              key={key}
              geometry={node.geometry}
              material={node.material}
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
              bookId={key}
              onBookClick={onBookClick}
            />
          );
        }

        // Render static parts of the library
        return (
          <mesh
            key={key}
            geometry={node.geometry}
            material={node.material}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
            castShadow
            receiveShadow
          />
        );
      })}
    </group>
  );
}

useGLTF.preload(libraryGLBUrl);
