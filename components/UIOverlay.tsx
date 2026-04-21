"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function UIOverlay() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Glow ring — centered on screen where 3D text sits */}
      <motion.div
        aria-hidden
        className="absolute rounded-full border"
        style={{
          width: "clamp(200px, 28vw, 420px)",
          height: "clamp(200px, 28vw, 420px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderColor: "rgba(124, 58, 237, 0.35)",
          boxShadow:
            "0 0 60px 12px rgba(124, 58, 237, 0.2), 0 0 120px 24px rgba(6, 182, 212, 0.1)",
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
                opacity: {
                  delay: 2.5,
                  duration: 2,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                },
              }
        }
      />

      {/* Tagline — below center, clears 3D Hello World */}
      <motion.p
        className="absolute left-0 right-0 text-center px-4"
        style={{
          top: "62%",
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
          letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.75)",
        }}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : { delay: 2.0, duration: 0.7, ease: "easeOut" }
        }
      >
        The only Hello World you&apos;ll never forget.
      </motion.p>

      {/* Bottom CTA — amber pulse dot + "Click Anywhere" */}
      <motion.div
        className="absolute left-0 right-0 flex flex-col items-center gap-3"
        style={{ bottom: "clamp(2rem, 5vh, 4rem)" }}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduced
            ? { duration: 0 }
            : { delay: 2.8, duration: 0.6, ease: "easeOut" }
        }
      >
        {/* Amber pulse dot — accent #F59E0B */}
        <motion.div
          aria-hidden
          className="rounded-full"
          style={{
            width: 10,
            height: 10,
            background: "#F59E0B",
            boxShadow: "0 0 8px 2px rgba(245, 158, 11, 0.5)",
          }}
          animate={
            reduced
              ? {}
              : { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
          }}
        />

        {/* CTA text */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Click Anywhere
        </p>
      </motion.div>
    </div>
  );
}
