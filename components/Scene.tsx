"use client";

import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./CameraRig";
import { HelloText } from "./HelloText";
import { ParticleField } from "./ParticleField";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Scene() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <ParticleField reduced={reduced} />
      <HelloText reduced={reduced} />
      <CameraRig reduced={reduced} />
    </Canvas>
  );
}
