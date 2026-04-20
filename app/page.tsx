"use client";

import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <main className="flex-1 w-full h-screen bg-black">
      <noscript>
        <div className="flex items-center justify-center h-screen text-white text-4xl font-bold">
          Hello World
        </div>
      </noscript>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
      </Canvas>
    </main>
  );
}
