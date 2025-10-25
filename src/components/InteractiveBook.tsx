import React, { useState, useRef } from 'react';
import { a, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import * as Tone from 'tone';

const synth = new Tone.NoiseSynth({
    noise: { type: 'pink' },
    envelope: { attack: 0.001, decay: 0.1, sustain: 0.0, release: 0.1 },
});
synth.volume.value = -10; 

const bookColors: { [key: string]: string } = {
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
  mesh: BookMesh; 
  bookId: string;
  onBookClick: (bookId: string) => void;
}

const InteractiveBook: React.FC<InteractiveBookProps> = ({ mesh, bookId, onBookClick }) => {
  const [hovered, setHover] = useState(false);

  const initialProps = useRef({
      position: mesh.position.toArray(),
      rotation: mesh.rotation.toArray(),
  });

  const { scale, position, rotation } = useSpring({
    scale: hovered ? 1.05 : 1,
    position: hovered 
      ? initialProps.current.position.map((p, i) => i === 2 ? p + 0.05 : p)
      : initialProps.current.position,
    rotation: initialProps.current.rotation,
    config: { mass: 1, tension: 300, friction: 20 },
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    Tone.context.resume().then(() => {
        synth.toDestination();
        synth.triggerAttackRelease('4n', '16n');
    });
    onBookClick(bookId);
  };

  return (
    <a.mesh
      onClick={handleClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      geometry={mesh.geometry}
      material={mesh.material} 
      position={position as any}
      rotation={rotation as any}
      scale={scale as any}
    >
        {hovered && (
            <meshBasicMaterial 
                attach="material"
                color={bookColors[bookId] || '#FFFFFF'} 
                toneMapped={false} 
                transparent={true} 
                opacity={0.8}
            />
        )}
    </a.mesh>
  );
};

export default InteractiveBook;
