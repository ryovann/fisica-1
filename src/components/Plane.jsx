import React, { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Line } from "@react-three/drei"; // Import Line

function Road({ roadLength = 50, roadWidth = 10 }) {
  const [roadAlbedoMap, roadNormalMap, roadRoughnessMap] = useLoader(
    THREE.TextureLoader,
    [
      "textures/asphalt_02_diff_1k.png",
      "textures/asphalt_02_nor_gl_1k.png",
      "textures/asphalt_02_rough_1k.png",
    ]
  );

  const tilingRepeat = 1;
  [roadAlbedoMap, roadNormalMap, roadRoughnessMap].forEach((texture) => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(roadLength / roadWidth, tilingRepeat);
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[roadLength, roadWidth, 1, 1]} />
      <meshStandardMaterial
        map={roadAlbedoMap}
        normalMap={roadNormalMap}
        roughnessMap={roadRoughnessMap}
      />
    </mesh>
  );
}

function RoadLines({ roadLength = 50, roadWidth = 10 }) {
  const lineWidth = 0.06; // Width of the lines in world units
  const linePositionY = 0.001;
  const lineColor = "white";
  const yellowLineColor = "yellow";
  const yellowLineLength = 1;

  const yellowLineCount = roadLength;

  return (
    <>
      {/* Left White Line */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, linePositionY, roadWidth / 4]}
      >
        <planeGeometry args={[roadLength, lineWidth]} />
        <meshBasicMaterial
          color={lineColor}
          transparent={true}
          depthWrite={false}
        />
      </mesh>

      {/* Right White Line */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, linePositionY, -roadWidth / 4]}
      >
        <planeGeometry args={[roadLength, lineWidth]} />
        <meshBasicMaterial
          color={lineColor}
          transparent={true}
          depthWrite={false}
        />
      </mesh>

      {/* Dashed Yellow Center Line */}
      {Array.from({ length: yellowLineCount }).map((_, index) => {
        const possitionX = index * (yellowLineLength + 1);

        const positionY = linePositionY;
        const positionZ = 0;

        return (
          <mesh
            key={index}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[possitionX, positionY, positionZ]}
          >
            <planeGeometry args={[yellowLineLength, lineWidth]} />
            <meshBasicMaterial
              color={yellowLineColor}
              transparent={true}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </>
  );
}

export default function Plane({ roadLength, roadWidth }) {
  return (
    <Suspense fallback={null}>
      <Road roadLength={roadLength} />
      <RoadLines roadLength={roadLength} roadWidth={roadWidth} />
    </Suspense>
  );
}
