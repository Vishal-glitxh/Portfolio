"use client";

import { motion } from "framer-motion";

interface AnimatedProgressProps {
  value: number; // 0 to 100
  colorClass?: string;
  delay?: number;
}

export default function AnimatedProgress({
  value,
  colorClass = "bg-cyan-500",
  delay = 0.2,
}: AnimatedProgressProps) {
  return (
    <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden relative">
      {/* Background glow tracker */}
      <div className="absolute inset-0 bg-slate-700/20" />
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`h-full rounded-full relative ${colorClass}`}
      >
        {/* Glow tip at the end of the bar */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_currentColor]" />
      </motion.div>
    </div>
  );
}
