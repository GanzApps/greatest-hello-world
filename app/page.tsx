"use client";

import { Scene } from "../components/Scene";
import { UIOverlay } from "../components/UIOverlay";

export default function Home() {
  return (
    <main
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      <noscript>
        <div className="flex items-center justify-center h-screen text-white text-4xl font-bold">
          Hello World
        </div>
      </noscript>

      {/* Animated gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: "-10vw", left: "-10vw",
          width: "40vw", height: "40vw",
          borderRadius: "50%",
          background: "#7C3AED",
          filter: "blur(100px)",
          opacity: 0.4,
          animation: "pulse-blob 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          bottom: "-5vw", right: "-5vw",
          width: "35vw", height: "35vw",
          borderRadius: "50%",
          background: "#06B6D4",
          filter: "blur(100px)",
          opacity: 0.4,
          animation: "pulse-blob 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 1s",
        }}
      />

      {/* R3F canvas */}
      <div className="absolute inset-0">
        <Scene />
      </div>

      {/* UI overlay — tagline, glow ring, CTA */}
      <UIOverlay />

      <style>{`
        @keyframes pulse-blob {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 0.55; }
        }
      `}</style>
    </main>
  );
}
