"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BURST_COUNT = 30;
const BURST_DURATION_MS = 600;

type BurstData = { id: number; position: THREE.Vector3 };

function BurstInstance({
  burst,
  onDone,
}: {
  burst: BurstData;
  onDone: (id: number) => void;
}) {
  const ref = useRef<THREE.Points>(null);
  const startTime = useRef<number | null>(null);
  const done = useRef(false);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(BURST_COUNT * 3);
    const vels: THREE.Vector3[] = [];
    for (let i = 0; i < BURST_COUNT; i++) {
      // Uniform sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 0.8 + Math.random() * 1.5;
      vels.push(
        new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed,
          Math.cos(phi) * speed * 0.4
        )
      );
    }
    return { positions: pos, velocities: vels };
  }, []);

  useFrame((state) => {
    if (!ref.current || done.current) return;
    if (startTime.current === null) startTime.current = state.clock.elapsedTime;

    const elapsed = (state.clock.elapsedTime - startTime.current) * 1000;
    if (elapsed >= BURST_DURATION_MS) {
      done.current = true;
      onDone(burst.id);
      return;
    }

    const t = elapsed / BURST_DURATION_MS;
    const posAttr = ref.current.geometry.attributes
      .position as THREE.BufferAttribute;

    for (let i = 0; i < BURST_COUNT; i++) {
      posAttr.setXYZ(
        i,
        burst.position.x + velocities[i].x * t,
        burst.position.y + velocities[i].y * t,
        burst.position.z + velocities[i].z * t
      );
    }
    posAttr.needsUpdate = true;

    // Ease out opacity
    (ref.current.material as THREE.PointsMaterial).opacity =
      1 - t * t;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#9966ff"
        transparent
        opacity={1}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

let nextId = 0;

export function ClickBurst({ reduced }: { reduced: boolean }) {
  const [bursts, setBursts] = useState<BurstData[]>([]);

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      if (reduced) return;
      e.stopPropagation();
      const id = nextId++;
      setBursts((prev) => [
        ...prev,
        { id, position: e.point.clone() },
      ]);
    },
    [reduced]
  );

  const handleDone = useCallback((id: number) => {
    setBursts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return (
    <>
      {/* Invisible full-screen plane captures clicks in 3D space */}
      <mesh onClick={handleClick} visible={false}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial side={THREE.DoubleSide} />
      </mesh>

      {bursts.map((burst) => (
        <BurstInstance key={burst.id} burst={burst} onDone={handleDone} />
      ))}
    </>
  );
}
