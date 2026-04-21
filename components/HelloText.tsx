"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

function easeOutBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

export function HelloText({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const elapsed = state.clock.elapsedTime;

    if (reduced) {
      ref.current.scale.setScalar(1);
      return;
    }

    // Entry: scale up from 0 starting at 0.8s over 1.2s
    if (elapsed > 0.8) {
      const t = Math.min(1, (elapsed - 0.8) / 1.2);
      ref.current.scale.setScalar(easeOutBack(t));
    }

    // Emissive shimmer after 1.5s
    if (elapsed > 1.5) {
      const mat = ref.current.material as THREE.MeshBasicMaterial & {
        emissiveIntensity?: number;
      };
      if (mat && mat.emissiveIntensity !== undefined) {
        mat.emissiveIntensity = 0.3 + Math.sin(elapsed * 2) * 0.15;
      }
    }
  });

  return (
    <Text
      ref={ref}
      fontSize={1.4}
      anchorX="center"
      anchorY="middle"
      scale={reduced ? 1 : 0}
      outlineColor="#6644ff"
      outlineWidth={0.015}
      fillOpacity={1}
    >
      Hello World
      <meshStandardMaterial
        color="#ffffff"
        emissive="#6644ff"
        emissiveIntensity={0.3}
      />
    </Text>
  );
}
