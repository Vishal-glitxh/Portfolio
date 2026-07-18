"use client";

import React, { useState } from "react";
import Card from "../ui/Card";
import { motion } from "framer-motion";
import { Github, Play, Hammer, Network, TrendingUp, Sparkles } from "lucide-react";
import ScrambleText from "@/components/ui/ScrambleText";

interface ChecklistItem {
  label: string;
  completed: boolean;
}

interface ProjectItem {
  title: string;
  status: "Under Development" | "Completed";
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  glow: "blue" | "cyan";
  progress: number;
  checklist: ChecklistItem[];
  renderMockupContent: () => React.ReactNode;
}

// Pixel-perfect CSS MacBook Mockup container with 3D layer depth transforms
function MacBookMockup({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="relative mx-auto w-[94%] max-w-[460px] select-none pointer-events-none group-hover:scale-[1.03] transition-transform duration-500 ease-[0.16,1,0.3,1]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Screen Lid Bezel (Floats higher in Z-space) */}
      <div 
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        className="relative rounded-t-2xl bg-[#0c1220] p-2.5 md:p-3 border-t border-x border-slate-700/60 shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
      >
        {/* Camera Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-11 h-3.5 bg-slate-950 rounded-b-md flex justify-center pt-0.5 z-30">
          <div className="w-1 h-1 rounded-full bg-blue-500/40" />
        </div>
        {/* Inner Screen Surface */}
        <div className="rounded-lg overflow-hidden border border-slate-950 bg-slate-950 aspect-[16/10] relative z-20">
          {children}
        </div>
      </div>
      {/* Base Keyboard Deck (Floats slightly lower) */}
      <div 
        style={{ transform: "translateZ(10px)" }}
        className="relative h-2.5 md:h-3 w-[108%] -left-[4%] bg-[#1f293d] border-t border-slate-600/30 border-b-2 border-b-slate-950 rounded-b-xl shadow-[0_12px_25px_rgba(0,0,0,0.5)] flex justify-center z-10"
      >
        {/* Lift groove */}
        <div className="w-14 h-1 bg-slate-950 rounded-b-md" />
      </div>
    </div>
  );
}

export default function Projects() {
  const [demoRequested, setDemoRequested] = useState<string | null>(null);

  const triggerDemoAlert = (title: string) => {
    setDemoRequested(title);
    setTimeout(() => {
      setDemoRequested(null);
    }, 3000);
  };

  const projectsList: ProjectItem[] = [
    {
      title: "AI Question Predictor (Study Companion)",
      status: "Under Development",
      description:
        "An AI-powered study companion that predicts likely examination questions using semantic similarity, intelligent document analysis, and machine learning techniques to improve student preparation.",
      tags: ["Python", "AI", "Machine Learning", "NLP", "Semantic Search", "React", "MongoDB"],
      githubUrl: "https://github.com/Vishal-glitxh",
      glow: "blue",
      progress: 70,
      checklist: [
        { label: "Research", completed: true },
        { label: "Planning", completed: true },
        { label: "Frontend", completed: true },
        { label: "Backend", completed: true },
        { label: "AI Model", completed: true },
        { label: "Testing", completed: false },
        { label: "Deployment", completed: false },
      ],
      renderMockupContent: () => (
        <div className="absolute inset-0 bg-slate-950/95 overflow-hidden p-3 font-mono text-[9px] md:text-[10px] text-slate-400 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-900/80 pb-1.5 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500/80" />
              <span className="w-2 h-2 rounded-full bg-amber-500/80" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-cyan-400 font-bold text-[8px] uppercase tracking-wider">Semantic-Match-Engine</span>
          </div>
          
          {/* Content */}
          <div className="flex-1 py-2 flex flex-col justify-center gap-1.5 overflow-hidden">
            <div className="flex items-center justify-between bg-slate-900/40 p-1.5 rounded border border-slate-900/60">
              <div className="truncate pr-1 text-slate-300">Ref: Explain SGD Optimizations</div>
              <div className="shrink-0 px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold text-[7px]">Anchor</div>
            </div>
            
            <div className="flex items-center justify-between bg-slate-900/40 p-1.5 rounded border border-slate-900/60">
              <div className="truncate pr-1 text-slate-300">Match: How do stochastic gradients work?</div>
              <div className="shrink-0 flex items-center gap-1">
                <div className="w-10 bg-slate-900 h-1 rounded overflow-hidden">
                  <div className="w-[88%] h-full bg-cyan-400" />
                </div>
                <span className="text-cyan-400 font-bold text-[8px]">88% Similarity</span>
              </div>
            </div>
          </div>

          {/* Footer stats */}
          <div className="flex items-center justify-between border-t border-slate-900/80 pt-1.5 text-[8px] text-slate-500 shrink-0">
            <div className="flex items-center gap-1">
              <Network className="w-3 h-3 text-cyan-400" />
              <span>Embedding Dimension: 768</span>
            </div>
            <span className="text-emerald-400 font-semibold">Active Predictors</span>
          </div>
        </div>
      ),
    },
    {
      title: "Intelligence Development Platform (IDP)",
      status: "Under Development",
      description:
        "An intelligent employee development platform that analyzes workforce skills using the 9-Box Talent Matrix to visualize employee performance, potential, and growth opportunities.",
      tags: ["Artificial Intelligence", "Analytics", "React", "Node.js", "Python", "Visualization", "9-Box Matrix"],
      githubUrl: "https://github.com/Vishal-glitxh",
      glow: "cyan",
      progress: 55,
      checklist: [
        { label: "Research", completed: true },
        { label: "Planning", completed: true },
        { label: "Frontend", completed: true },
        { label: "Backend", completed: true },
        { label: "AI Model", completed: false },
        { label: "Testing", completed: false },
        { label: "Deployment", completed: false },
      ],
      renderMockupContent: () => (
        <div className="absolute inset-0 bg-slate-950/95 overflow-hidden p-3 font-mono text-[8px] md:text-[9px] text-slate-400 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-900/80 pb-1.5 shrink-0">
            <h5 className="font-extrabold text-white text-xs font-heading">9-Box Talent Grid</h5>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[7px]">
              <TrendingUp className="w-2.5 h-2.5" />
              Optimal Fit
            </div>
          </div>

          {/* 9 Box Grid */}
          <div className="grid grid-cols-3 gap-1 my-1.5 flex-1 overflow-hidden">
            <div className="bg-slate-900/30 border border-slate-900/60 rounded flex flex-col items-center justify-center p-0.5">
              <span className="text-[6px] text-slate-500">Low Pot</span>
            </div>
            <div className="bg-slate-900/30 border border-slate-900/60 rounded flex flex-col items-center justify-center p-0.5">
              <span className="text-[6px] text-slate-500">Med Pot</span>
            </div>
            {/* Glowing active box */}
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded flex flex-col items-center justify-center p-0.5 relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
              <span className="text-[6px] text-cyan-300 font-bold text-center">High Perf/Pot</span>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-0.5 animate-ping" />
            </div>

            <div className="bg-slate-900/30 border border-slate-900/60 rounded flex flex-col items-center justify-center p-0.5">
              <span className="text-[6px] text-slate-500">Med Perf</span>
            </div>
            <div className="bg-slate-900/30 border border-slate-900/60 rounded flex flex-col items-center justify-center p-0.5">
              <span className="text-[6px] text-slate-500">Med/Med</span>
            </div>
            <div className="bg-slate-900/30 border border-slate-900/60 rounded flex flex-col items-center justify-center p-0.5">
              <span className="text-[6px] text-slate-500">High Perf</span>
            </div>

            <div className="bg-slate-900/30 border border-slate-900/60 rounded flex flex-col items-center justify-center p-0.5">
              <span className="text-[6px] text-slate-500">Low Perf</span>
            </div>
            <div className="bg-slate-900/30 border border-slate-900/60 rounded flex flex-col items-center justify-center p-0.5">
              <span className="text-[6px] text-slate-500">Low/Med</span>
            </div>
            <div className="bg-slate-900/30 border border-slate-900/60 rounded flex flex-col items-center justify-center p-0.5">
              <span className="text-[6px] text-slate-500">Low/High</span>
            </div>
          </div>

          {/* Footer stats */}
          <div className="flex items-center justify-between border-t border-slate-900/80 pt-1.5 text-[7px] text-slate-500 shrink-0">
            <span>Grid Coordinates Map: Loaded</span>
            <span className="text-cyan-400 font-semibold">Nodes: 124</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden px-4 md:px-8 bg-slate-950/20">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm font-semibold tracking-widest text-cyan-400 uppercase font-heading"
          >
            My Works
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white mt-2 font-heading"
          >
            Featured Projects
          </motion.h3>
        </div>

        {/* Projects Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsList.map((project, idx) => (
            <Card
              key={idx}
              glowColor={project.glow}
              delay={idx * 0.1}
              className="flex flex-col h-full hover:scale-[1.01] duration-300"
            >
              {/* MacBook Device Bezel Chassis Container (Lifts inside parent Card 3D perspective) */}
              <div 
                className="mb-8"
                style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
              >
                <MacBookMockup>
                  {project.renderMockupContent()}
                </MacBookMockup>
              </div>

              {/* Title & Status */}
              <div 
                style={{ transform: "translateZ(25px)" }}
                className="flex items-start justify-between gap-4 mb-3"
              >
                <h4 className="text-lg md:text-xl font-bold text-white font-heading group-hover:text-cyan-300 transition-colors duration-300 leading-snug">
                  {project.title}
                </h4>
                
                <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold tracking-wide">
                  <Hammer className="w-3 h-3" />
                  {project.status}
                </div>
              </div>

              {/* Description */}
              <p 
                style={{ transform: "translateZ(20px)" }}
                className="text-slate-300 text-sm font-body leading-relaxed flex-1 mb-6"
              >
                {project.description}
              </p>

              {/* Development Roadmap Checklist */}
              <div 
                style={{ transform: "translateZ(30px)" }}
                className="mb-6 p-4 md:p-5 rounded-2xl bg-slate-950/40 border border-slate-900/60 shadow-inner"
              >
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="text-slate-400 font-extrabold tracking-wider uppercase font-heading text-[9px]">
                    Development Roadmap
                  </span>
                  <span className="text-cyan-400 font-extrabold font-heading text-[10px]">
                    {project.progress}% Complete
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded-full mb-4 overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${project.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-2 text-[9px] md:text-[10px]">
                  {project.checklist.map((item, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${item.completed ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" : "bg-slate-700"}`} />
                      <span className={item.completed ? "text-slate-300 font-bold" : "text-slate-500 font-medium"}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div 
                style={{ transform: "translateZ(15px)" }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {project.tags.map((tag, tagIdx) => (
                  <motion.span
                    key={tagIdx}
                    whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.3)", color: "#22d3ee" }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 text-slate-400 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Buttons Panel */}
              <div 
                style={{ transform: "translateZ(30px)" }}
                className="flex items-center gap-4 mt-auto"
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs md:text-sm hover:border-slate-700 transition-all shadow-md shadow-black/20"
                >
                  <Github className="w-5 h-5" />
                  <ScrambleText text="GitHub Repository" triggerOn="hover" />
                </a>

                <div className="relative">
                  <button
                    onClick={() => triggerDemoAlert(project.title)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-950 border border-slate-900/60 text-slate-500 cursor-not-allowed font-bold text-xs md:text-sm"
                  >
                    <Play className="w-5 h-5 text-slate-600" />
                    <ScrambleText text="Live Demo" triggerOn="hover" />
                  </button>

                  {/* Tooltip Overlay */}
                  {demoRequested === project.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-cyan-400 font-bold whitespace-nowrap shadow-xl z-20 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Coming Soon (Under Construction)
                    </motion.div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
