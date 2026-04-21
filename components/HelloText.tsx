"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

function easeOutBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function makeGradientTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, "#7C3AED");
  grad.addColorStop(1, "#06B6D4");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 64);
  return new THREE.CanvasTexture(canvas);
}

export function HelloText({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const gradientTexture = useMemo(() => makeGradientTexture(), []);

  useFrame((state) => {
    if (!ref.current) return;
    const elapsed = state.clock.elapsedTime;

    if (reduced) {
      ref.current.scale.setScalar(1);
      return;
    }

    if (elapsed > 0.8) {
      const t = Math.min(1, (elapsed - 0.8) / 1.2);
      ref.current.scale.setScalar(easeOutBack(t));
    }
  });

  return (
    <Text
      ref={ref}
      fontSize={1.4}
      anchorX="center"
      anchorY="middle"
      scale={reduced ? 1 : 0}
      fillOpacity={1}
    >
      Hello World
      <meshBasicMaterial map={gradientTexture} toneMapped={false} />
    </Text>
  );
}
