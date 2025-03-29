import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useConfigStore } from "../store/config.store";

function createStripedTexture() {
  const canvas = document.createElement("canvas");
  const size = 256;

  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  // Draw stripes
  const stripeWidth = size / 8; // 5 stripes

  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i % 2 === 0 ? "yellow" : "lime"; // Alternate colors
    ctx.fillRect(i * stripeWidth, 0, stripeWidth, size);
  }

  const texture = new THREE.CanvasTexture(canvas);

  return texture;
}

function movimientoUniforme({ time, velocity, position }) {
  position.x += velocity * time;

  return position;
}

function movimientoRectilineoUniforme({ time, velocity, position }) {
  position.x += velocity * time;

  return position;
}

function movimientoRectilineoUniformementeVariado({
  time,
  velocity,
  acceleration,
  position
}) {
  position.x += velocity * time + 0.5 * acceleration * (time * time);

  return position;
}

// Real tennis ball diameter = 6.7 cm
// Radius = 6.7 cm / 2 = 3.35 cm (or 0.0335 meters in Three.js units)
export default function TennisBall({ camera }) {
  const [config] = useConfigStore((store) => store);

  const ballRef = useRef(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    let position = { x: 0 };

    if (ballRef.current) {
      if (config.movementType == "mu") {
        position = movimientoUniforme({
          velocity: config.objectParameters.velocity,
          position: ballRef.current.position,
          time,
        });
      } else if (config.movementType == "mru") {
        position = movimientoRectilineoUniforme({
          velocity: config.objectParameters.velocity,
          position: ballRef.current.position,
          time,
        });
      } else {
        position = movimientoRectilineoUniformementeVariado({
          velocity: config.objectParameters.velocity,
          position: ballRef.current.position,
          acceleration: config.objectParameters.acceleration,
          time,
        });
      }

      ballRef.current.position.set(
        position.x,
        config.objectParameters.size + 0.1,
        config.objectParameters.position.z
      );

      // TODO: why it's not updating!!!!
      if (camera.current && config.followObject) {
        camera.current.position.set(
          position.x,
          config.objectParameters.size + 0.3,
          0.5
        );

        camera.current.lookAt(ballRef.current.position);
      }
    }
  });

  return (
    <mesh ref={ballRef} position={[0, config.objectParameters.size, 0]}>
      <sphereGeometry args={[config.objectParameters.size, 32, 32]} />
      <meshStandardMaterial color="white" />
      {/* Create stripes using a texture */}
      <meshStandardMaterial map={createStripedTexture()} />
    </mesh>
  );
}
