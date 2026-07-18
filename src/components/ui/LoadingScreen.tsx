"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 500);
          return 100;
        }
        // Random incremental steps to simulate active AI node configuration
        const increment = Math.floor(Math.random() * 9) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#0B1120] flex flex-col items-center justify-center select-none"
        >
          {/* Subtle grid layer */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="text-center relative z-10 flex flex-col items-center gap-6">
            {/* Spinning Brand Icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              className="p-3.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            >
              <BrainCircuit className="w-10 h-10" />
            </motion.div>

            {/* Title & Status */}
            <div className="space-y-1">
              <motion.h1
                initial={{ letterSpacing: "0.25em", opacity: 0 }}
                animate={{ letterSpacing: "0.15em", opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-2xl md:text-3xl font-extrabold text-white font-heading"
              >
                VISHAL SUHAS
              </motion.h1>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                System Initialization &bull; AI Network Active
              </p>
            </div>

            {/* Glowing progress track */}
            <div className="w-52 bg-slate-950 border border-slate-900 rounded-full h-1.5 overflow-hidden mt-3 relative shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage counter */}
            <span className="text-cyan-400 font-extrabold font-heading text-sm shadow-sm">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
