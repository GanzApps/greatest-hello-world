"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function UIOverlay() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Glow ring — centered */}
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

      {/* Tagline — below center */}
      <motion.p
        className="absolute left-0 right-0 text-center px-4"
        style={{
          top: "62%",
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
          letterSpacing: "0.025em",
          color: "rgba(255,255,255,0.5)",
          fontWeight: 300,
          mixBlendMode: "screen",
          opacity: 0.8,
        }}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : { delay: 2.0, duration: 0.7, ease: "easeOut" }
        }
      >
        The only Hello World you&apos;ll never forget.
      </motion.p>

      {/* Bottom CTA — fixed bottom-12 (3rem), exact design spec */}
      <motion.div
        className="absolute left-0 right-0 flex flex-col items-center gap-4"
        style={{ bottom: "3rem" }}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduced
            ? { duration: 0 }
            : { delay: 2.8, duration: 0.6, ease: "easeOut" }
        }
      >
        {/* Amber dot — w-3 h-3, exact shadow from design */}
        <motion.div
          aria-hidden
          className="rounded-full"
          style={{
            width: 12,
            height: 12,
            background: "#F59E0B",
            boxShadow: "0 0 20px rgba(245, 158, 11, 0.6)",
          }}
          animate={reduced ? {} : { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
        />

        {/* CTA — white/40, tracking-[0.3em], font-light, uppercase — exact design */}
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(10px, 0.75vw, 12px)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            fontWeight: 300,
          }}
        >
          Click Anywhere
        </span>
      </motion.div>
    </div>
  );
}
