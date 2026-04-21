"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function UIOverlay() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
      {/* Glow ring — centered, scales in at 2.5s then pulses */}
      <motion.div
        aria-hidden
        className="absolute rounded-full border"
        style={{
          width: "clamp(200px, 28vw, 420px)",
          height: "clamp(200px, 28vw, 420px)",
          borderColor: "rgba(124, 58, 237, 0.35)",
          boxShadow: "0 0 60px 12px rgba(124, 58, 237, 0.2), 0 0 120px 24px rgba(6, 182, 212, 0.1)",
        }}
        initial={reduced ? false : { scale: 0.6, opacity: 0 }}
        animate={
          reduced
            ? { scale: 1, opacity: 1 }
            : { scale: [1, 1.2, 1], opacity: [0.8, 0.4, 0.8] }
        }
        transition={
          reduced
            ? { duration: 0 }
            : {
                scale: { delay: 2.5, duration: 0.6, ease: [0.4, 0, 0.6, 1] },
                opacity: { delay: 2.5, duration: 2, repeat: Infinity, ease: [0.4, 0, 0.6, 1] },
              }
        }
      />

      {/* Push text below center where 3D Hello World renders */}
      <div style={{ marginTop: "clamp(100px, 14vw, 200px)" }} />

      {/* Tagline — fades + slides up at 2.0s */}
      <motion.p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
          letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.8)",
          textAlign: "center",
        }}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { delay: 2.0, duration: 0.7, ease: "easeOut" }}
      >
        The only Hello World you&apos;ll never forget.
      </motion.p>

      {/* CTA — gradient text, fades in at 2.8s */}
      <motion.p
        style={{
          marginTop: "1rem",
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(0.75rem, 1.1vw, 0.9rem)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textAlign: "center",
        }}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 2.8, duration: 0.6, ease: "easeOut" }}
      >
        Click Anywhere
      </motion.p>
    </div>
  );
}
