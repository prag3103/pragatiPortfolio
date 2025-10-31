import React, { useState, useRef } from 'react';
import { a, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import * as Tone from 'tone';

// Pre-initialize a simple sound feedback when a book is clicked
const synth = new Tone.NoiseSynth({
  noise: { type: 'pink' },
  envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 },
});
synth.volume.value = -10;

// Unique glow colors for books
const bookColors: Record<string, string> = {
  'purple book': '#8A2BE2',
  'green book': '#00B000',
  'yellow book': '#FFD700',
  'lilac book': '#C8A2C8',
};

interface BookMesh extends THREE.Object3D {
  geometry: THREE.BufferGeometry;
  material: THREE.Material | THREE.Material[];
}

interface InteractiveBookProps {
  geometry: THREE.BufferGeometry;
  material: THREE.Material | THREE.Material[];
  position: THREE.Vector3 | [number, number, number];
  rotation: THREE.Euler | [number, number, number];
  scale: THREE.Vector3 | [number, number, number];
  bookId: string;
  onBookClick: (bookId: string) => void;
}

const InteractiveBook: React.FC<InteractiveBookProps> = ({
  geometry,
  material,
  position,
  rotation,
  scale,
  bookId,
  onBookClick,
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Hover animation: makes the book pop slightly forward and grow a bit
  const { animatedScale, animatedPosition } = useSpring({
    animatedScale: hovered ? 1.08 : 1,
    animatedPosition: hovered
      ? [position[0], position[1] + 0.05, position[2] + 0.05]
      : position,
    config: { tension: 170, friction: 16 },
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    Tone.context.resume().then(() => {
      synth.toDestination();
      synth.triggerAttackRelease('4n', '16n');
    });
    onBookClick(bookId);
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    setHovered(true);
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'default';
    setHovered(false);
  };

  return (
    <a.mesh
      ref={ref}
      geometry={geometry}
      material={material}
      position={animatedPosition as any}
      rotation={rotation as any}
      scale={animatedScale as any}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      castShadow
      receiveShadow
    >
      {hovered && (
        <meshBasicMaterial
          attach="material"
          color={bookColors[bookId] || '#FFD19A'}
          toneMapped={false}
          transparent
          opacity={0.85}
        />
      )}
    </a.mesh>
  );
};

export default InteractiveBook;
