"use client";

import React, { useMemo } from "react";
import Marquee from "../ui/Marquee";
import { motion } from "framer-motion";

const line1 = [
  { name: "Python", color: "from-blue-500/20 to-yellow-500/10 text-slate-200" },
  { name: "React", color: "from-cyan-500/20 to-blue-500/10 text-slate-200" },
  { name: "Next.js", color: "from-slate-700/20 to-slate-800/10 text-slate-200" },
  { name: "Node.js", color: "from-green-500/20 to-emerald-500/10 text-slate-200" },
  { name: "Express", color: "from-slate-600/20 to-slate-700/10 text-slate-200" },
  { name: "Flask", color: "from-cyan-700/20 to-slate-800/10 text-slate-200" },
  { name: "MongoDB", color: "from-green-600/20 to-emerald-600/10 text-slate-200" },
  { name: "MySQL", color: "from-blue-600/20 to-orange-500/10 text-slate-200" },
  { name: "SQLite", color: "from-sky-600/20 to-blue-500/10 text-slate-200" },
  { name: "Prisma", color: "from-indigo-600/20 to-violet-500/10 text-slate-200" },
];

const line2 = [
  { name: "Power BI", color: "from-yellow-500/20 to-amber-500/10 text-slate-200" },
  { name: "Scikit-Learn", color: "from-orange-500/20 to-blue-500/10 text-slate-200" },
  { name: "NumPy", color: "from-sky-500/20 to-blue-600/10 text-slate-200" },
  { name: "Pandas", color: "from-indigo-500/20 to-purple-600/10 text-slate-200" },
  { name: "Matplotlib", color: "from-cyan-500/20 to-emerald-500/10 text-slate-200" },
  { name: "HTML5", color: "from-orange-600/20 to-red-500/10 text-slate-200" },
  { name: "Java", color: "from-red-600/20 to-orange-600/10 text-slate-200" },
  { name: "C", color: "from-blue-700/20 to-indigo-600/10 text-slate-200" },
  { name: "C++", color: "from-blue-600/20 to-sky-500/10 text-slate-200" },
  { name: "GitHub", color: "from-slate-700/20 to-slate-900/10 text-slate-200" },
];

export default function Technologies() {
  const pillsLine1 = useMemo(() => {
    return line1.map((tech, idx) => (
      <div
        key={idx}
        className={`px-6 py-3 rounded-full bg-gradient-to-r ${tech.color} border border-slate-800/80 font-heading text-sm md:text-base font-semibold shadow-lg backdrop-blur-md flex items-center gap-2 hover:border-cyan-500/30 transition-colors duration-300`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
        {tech.name}
      </div>
    ));
  }, []);

  const pillsLine2 = useMemo(() => {
    return line2.map((tech, idx) => (
      <div
        key={idx}
        className={`px-6 py-3 rounded-full bg-gradient-to-r ${tech.color} border border-slate-800/80 font-heading text-sm md:text-base font-semibold shadow-lg backdrop-blur-md flex items-center gap-2 hover:border-cyan-500/30 transition-colors duration-300`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
        {tech.name}
      </div>
    ));
  }, []);

  return (
    <section className="py-16 relative overflow-hidden bg-slate-950/20 border-t border-b border-slate-900">
      <div className="max-w-6xl mx-auto w-full px-4 md:px-8 mb-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold tracking-widest text-slate-500 uppercase font-heading"
        >
          Tools of Trade
        </motion.p>
      </div>

      <div className="flex flex-col gap-6 w-full">
        {/* First Marquee scrolling left */}
        <Marquee items={pillsLine1} reverse={false} />
        {/* Second Marquee scrolling right */}
        <Marquee items={pillsLine2} reverse={true} />
      </div>
    </section>
  );
}
