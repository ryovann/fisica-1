import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';


function createStripedTexture() {
  const canvas = document.createElement('canvas');
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Draw stripes
  const stripeWidth = size / 8; // 5 stripes
  
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'yellow' : 'lime'; // Alternate colors
    ctx.fillRect(i * stripeWidth, 0, stripeWidth, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Real tennis ball diameter = 6.7 cm
// Radius = 6.7 cm / 2 = 3.35 cm (or 0.0335 meters in Three.js units)
export default function TennisBall({ camera, parameters }) {
const tennisBallRadius = parameters.size;

  const ballRef = useRef(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const x = time + 1;

    if (ballRef.current) {
      ballRef.current.position.set(x, tennisBallRadius, 0); // set ball to the correct height
      ballRef.current.rotation.z = -time;

      if (camera.current) {
        // Adjust the camera position to be closer
        camera.current.position.set(x, tennisBallRadius + 0.1, 0.5); // Adjusted camera position
        camera.current.lookAt(ballRef.current.position);
      }
    }

  });

  return (
    <mesh ref={ballRef} position={[0, tennisBallRadius, 0]}>
    <sphereGeometry args={[tennisBallRadius, 32, 32]} />
    <meshStandardMaterial color="white" />
    {/* Create stripes using a texture */}
    <meshStandardMaterial map={createStripedTexture()} />
  </mesh>
  );
}