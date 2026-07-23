"use client";

import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FrostCelebrationProps = {
  show: boolean;
  onClose: () => void;
};

type Flake = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
};

export function FrostCelebration({ show, onClose }: FrostCelebrationProps) {
  const flakes = useMemo<Flake[]>(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
      size: 4 + Math.random() * 8,
    }));
  }, []);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 8000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-900/80 via-blue-900/70 to-indigo-950/80 backdrop-blur-sm"
          onClick={onClose}
        >
          {flakes.map((flake) => (
            <motion.span
              key={flake.id}
              className="pointer-events-none absolute rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)]"
              style={{
                left: `${flake.left}%`,
                width: flake.size,
                height: flake.size,
                top: -20,
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [0, Math.sin(flake.id) * 40],
                opacity: [0, 1, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: flake.duration,
                delay: flake.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.5, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 14 }}
            className="relative mx-4 max-w-lg rounded-3xl border-2 border-white/30 bg-gradient-to-br from-white/95 to-sky-50/95 p-8 text-center shadow-2xl shadow-blue-900/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-200 via-white to-blue-200 opacity-60 blur-xl" />
            <div className="relative">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-5xl"
              >
                ❄️
              </motion.span>
              <h2 className="mt-4 font-heading text-3xl text-[#D72638] sm:text-4xl">
                ¡Ganaste!
              </h2>
              <p className="mt-4 text-lg font-semibold leading-relaxed text-neutral-800">
                Ganaste una carapulcra el 28 de julio en el local del Carapulcrón
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                Presenta este mensaje para reclamar tu premio 🎉
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full bg-[#D72638] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#b91c2c]"
              >
                ¡Genial!
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
