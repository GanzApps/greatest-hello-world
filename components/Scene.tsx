"use client";

import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./CameraRig";
import { ClickBurst } from "./ClickBurst";
import { HelloText } from "./HelloText";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Scene() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1} />
      <HelloText reduced={reduced} />
      <CameraRig reduced={reduced} />
      <ClickBurst reduced={reduced} />
    </Canvas>
  );
}
