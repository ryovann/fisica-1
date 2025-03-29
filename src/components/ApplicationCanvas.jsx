import { Canvas } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import TennisBall from "./TenisBall";
import { useRef } from "react";
import * as THREE from "three";

export default function ApplicationCanvas() {
  const cameraRef = useRef(null);
  
  return (
    <Canvas
      camera={{ position: [0, 2, 5] }}
      onCreated={({ camera }) => (cameraRef.current = camera)}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={1} />
      <mesh
        scale={[20, 4, 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
      <TennisBall
        camera={cameraRef}
        parameters={{
          size: 0.0355,
        }}
      />
      <OrbitControls />
      <TransformControls />
    </Canvas>
  );
}
