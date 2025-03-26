import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from 'three';
import TennisBall from "./TenisBall";
import Controls from "./Controls";
import Graficas from "./Graficas";

export default function Scene() {
  const cameraRef = useRef(null);

  const [objectVelocity, setObjectVelocity] = useState(0);
  const [objectPosition, setObjectPosition] = useState(0);
  const [objectAcceleration, setObjectAcceleration] = useState(0);
  const [time, setTime] = useState(0);

  console.log("Time: ", time);

  return (
    <div style={{ width: "800px", height: "600px", border: "1px solid black" }}>
      <Canvas
        camera={{ position: [0, 2, 5] }} 
        onCreated={({ camera }) => (cameraRef.current = camera)}
      >
        <ambientLight intensity={0.5} /> 
        <directionalLight position={[3, 5, 2]} intensity={1} />

        {/* Surface (Plane) */}
        <mesh scale={[20, 4, 2]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="lightgray" />
        </mesh>

        <TennisBall
          camera={cameraRef}
          parameters={{
            size: 0.0355
          }}
        />

        <OrbitControls /> 
      </Canvas>
      <Controls />
      <Graficas />
    </div>
  );
}


