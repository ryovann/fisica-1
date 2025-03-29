import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TennisBall from "./TenisBall";
import { useRef } from "react";
import Plane from "./Plane";

export default function ApplicationCanvas() {
  const cameraRef = useRef(null);

  return (
    <Canvas
      style={{ width: "100vw", height: "400px", border: "1px solid black" }}
      camera={{ position: [-5, 3, 2] }}
      onCreated={({ camera }) => (cameraRef.current = camera)}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={1} />
      <Plane roadLength={1000} roadWidth={10} />
      <TennisBall camera={cameraRef} />
      <OrbitControls enableDamping={true} />
    </Canvas>
  );
}
