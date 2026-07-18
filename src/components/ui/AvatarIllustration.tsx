"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AvatarIllustration() {
  // synced float translation and breathing scale pulse
  // base scale is set to 1.08 to prevent edge gaps during translations
  const floatAnimation = {
    y: [-3, 3, -3],
    scale: [1.08, 1.095, 1.08],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden rounded-full bg-[#0B1120]">
      {/* Premium character portrait bust (scaled to cover borderlessly) */}
      <motion.img
        src="/avatar_illustration.png"
        alt="Vishal Suhas - AI & Full-Stack Engineer"
        animate={floatAnimation}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
      />

      {/* Holographic radial spotlight glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_75%)] pointer-events-none z-20 mix-blend-screen" />

      {/* Holographic rotating tech HUD rings overlay */}
      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 w-[96%] h-[96%] opacity-25 pointer-events-none z-30"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="47" stroke="#06b6d4" strokeWidth="0.6" strokeDasharray="4 6" fill="none" />
        <circle cx="50" cy="50" r="41" stroke="#8b5cf6" strokeWidth="0.4" strokeDasharray="1 8" fill="none" />
        <circle cx="50" cy="50" r="35" stroke="#3b82f6" strokeWidth="0.3" strokeDasharray="8 4" fill="none" />
      </motion.svg>
    </div>
  );
}
