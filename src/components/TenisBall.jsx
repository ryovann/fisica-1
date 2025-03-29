import { useFrame } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import * as THREE from "three";
import { useConfigStore } from "../store/config.store";
import { useBallStore } from "../store/ball.store";

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
  // deltaT = tf - ti
  // deltaX = v * (deltaT)
  const displacement = velocity * time;

  position.x = displacement;

  return [position];
}

function movimientoRectilineoUniforme({ time, velocity, position }) {
  const displacement = velocity * time;

  position.x = displacement;

  return [position];
}

function movimientoRectilineoUniformementeVariado({
  velocity,
  acceleration,
  position,
  deltaT,
}) {
  // deltaX = v * (deltaT) + (1/2) * a * (deltaT)^2
  const displacement = velocity * deltaT + 0.5 * acceleration * deltaT * deltaT;

  position.x += displacement;

  return [position, displacement];
}

function movimientoRectilineoUniformementeVariadoVelocidadInicial({
  initialVelocity,
  acceleration,
  position,
  time,
}) {
  // deltaX = v * (deltaT) + (1/2) * a * (deltaT)^2
  const displacement =
    initialVelocity * time + 0.5 * acceleration * time * time;

  position.x = displacement;

  return [position, displacement];
}

// Real tennis ball diameter = 6.7 cm
// Radius = 6.7 cm / 2 = 3.35 cm (or 0.0335 meters in Three.js units)
export default function TennisBall({ camera }) {
  const [config, setConfig] = useConfigStore((store) => store);
  const [ballSize, setBallConfig] = useBallStore((store) => store.size);

  const initialVelocity = useRef(config.parameters.initialVelocity);

  const prevTime = useRef(0);
  const prevPosition = useRef(new THREE.Vector3(0, 0, 0));
  const velocity = useRef(config.parameters.initialVelocity);
  const displacement = useRef(0);

  const ballRef = useRef(null);

  const updateBallPosition = useCallback(
    ({ position, rotation }) => {
      if (position) {
        ballRef.current.position.set(position.x, position.y, position.z);
      }

      if (rotation) {
        ballRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
      }

      if (camera.current && config.followObject) {
        camera.current.position.set(position.x - 3, 3, 2);

        camera.current.lookAt(ballRef.current.position);
      }
    },
    [camera, config.followObject]
  );

  const updateParameters = useCallback(
    ({ newVelocity, newDisplacement, newTime, newPosition, acceleration }) => {
      prevPosition.current = newPosition.clone();
      prevTime.current = newTime;
      velocity.current = newVelocity;
      displacement.current = newDisplacement;

      setBallConfig({
        velocity: newVelocity,
        displacement: newDisplacement,
        position: newPosition,
        time: newTime,
        acceleration: acceleration,
      });
    },
    [setBallConfig]
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const deltaT = time - prevTime.current;

    let newPosition = prevPosition.current.clone();

    let newDisplacement = 0;

    if (ballRef.current) {
      if (config.movementType == "mu") {
        [newPosition, newDisplacement] = movimientoUniforme({
          velocity: config.parameters.initialVelocity,
          position: ballRef.current.position,
          time,
        });
      } else if (config.movementType == "mru") {
        [newPosition, newDisplacement] = movimientoRectilineoUniforme({
          velocity: config.parameters.initialVelocity,
          position: ballRef.current.position,
          time,
        });
      } else {
        if (config.parameters.useInitialVelocity) {
          [newPosition, newDisplacement] =
            movimientoRectilineoUniformementeVariadoVelocidadInicial({
              initialVelocity: initialVelocity.current,
              position: ballRef.current.position,
              acceleration: config.parameters.acceleration,
              time,
            });
        } else {
          [newPosition, newDisplacement] =
            movimientoRectilineoUniformementeVariado({
              velocity: velocity.current,
              position: newPosition,
              acceleration: config.parameters.acceleration,
              deltaT: deltaT,
            });
        }
      }

      const deltaX = newPosition.x - prevPosition.current.x;

      const newVelocity = deltaX / deltaT;

      // debounce update parameters based on time
      if (time - prevTime.current > 0.1) {
        updateParameters({
          newVelocity: newVelocity,
          newDisplacement: newDisplacement,
          newTime: time,
          newPosition: newPosition,
          acceleration: config.parameters.acceleration,
        });
      }

      // Update the ball position
      updateBallPosition({
        position: newPosition,
      });
    }
  });

  return (
    <mesh ref={ballRef} position={[0, ballSize, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry args={[ballSize, 32, 32]} />
      <meshStandardMaterial color="white" />
      {/* Create stripes using a texture */}
      <meshStandardMaterial map={createStripedTexture()} />
    </mesh>
  );
}
