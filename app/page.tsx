"use client";

import { Scene } from "../components/Scene";

export default function Home() {
  return (
    <main className="w-full h-screen bg-black">
      <noscript>
        <div className="flex items-center justify-center h-screen text-white text-4xl font-bold">
          Hello World
        </div>
      </noscript>
      <Scene />
    </main>
  );
}
