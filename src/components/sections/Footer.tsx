"use client";

import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const techStack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"];

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#0B1120]/90 backdrop-blur-md py-12 px-4 md:px-8 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-cyan-500/5 blur-[80px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left Side: Brand & Copyright */}
        <div className="text-center md:text-left space-y-1.5">
          <p className="text-slate-200 font-extrabold font-heading text-lg tracking-wide">
            Vishal Suhas
          </p>
          <p className="text-slate-500 text-[11px] font-mono tracking-wide">
            &copy; 2026 Vishal Suhas. All rights reserved.
          </p>
        </div>

        {/* Middle: Tech stack labels (styled as monospace telemetry indicators) */}
        <div className="text-center space-y-2">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-mono font-bold">
            Built with info structure:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded bg-slate-950 border border-slate-900 text-slate-400 font-mono text-[9px] tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Social links & scroll-to-top (with magnetic fields) */}
        <div className="flex items-center gap-4">
          <Magnetic range={30} strength={0.25}>
            <a
              href="https://github.com/Vishal-glitxh"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-github-link"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors shadow-sm flex items-center justify-center"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </Magnetic>
          
          <Magnetic range={30} strength={0.25}>
            <a
              href="https://www.linkedin.com/in/vishalsuhas"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-linkedin-link"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20 transition-colors shadow-sm flex items-center justify-center"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </Magnetic>

          <Magnetic range={30} strength={0.25}>
            <a
              href="mailto:vishalsuhas0662@gmail.com"
              id="footer-email-link"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/20 transition-colors shadow-sm flex items-center justify-center"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </Magnetic>

          <div className="w-[1px] h-6 bg-slate-900" />

          <Magnetic range={35} strength={0.3}>
            <button
              onClick={scrollToTop}
              id="footer-scroll-top-btn"
              className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-900 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/20 transition-all active:scale-95 group shadow-sm flex items-center justify-center overflow-hidden relative"
              title="Back to Top"
            >
              <motion.div
                whileHover={{ y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex flex-col items-center justify-center h-5"
              >
                <ArrowUp className="w-5 h-5 shrink-0" />
                <ArrowUp className="w-5 h-5 shrink-0 mt-5 text-cyan-400" />
              </motion.div>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
