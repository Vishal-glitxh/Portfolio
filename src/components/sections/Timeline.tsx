"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card";
import { Compass, ShieldCheck, Cpu, Database, HelpCircle, GraduationCap } from "lucide-react";

interface TimelineNode {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const timelineData: TimelineNode[] = [
  {
    title: "Starting Engineering Degree",
    subtitle: "VTU Specialization in AI & ML",
    description: "Began Bachelor of Engineering studies at Visvesvaraya Technological University, focusing on programming paradigms, calculus, and linear algebra.",
    icon: GraduationCap,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/15",
  },
  {
    title: "Deep Dive into Artificial Intelligence",
    subtitle: "Python & Machine Learning Fundamentals",
    description: "Explored predictive models, neural network layers, and data analysis using NumPy, Pandas, Matplotlib, and Scikit-learn.",
    icon: Cpu,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/15",
  },
  {
    title: "IBM Certification Accomplished",
    subtitle: "Cybersecurity Fundamentals Certificate",
    description: "Earned professional certificate proving expertise in security management, threat analysis, access control systems, and network protection.",
    icon: ShieldCheck,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/15",
  },
  {
    title: "Building the Study Companion",
    subtitle: "AI Question Predictor Development",
    description: "Architected an NLP-powered system utilizing BERT embeddings and semantic similarity scores to compare and predict examination questions.",
    icon: HelpCircle,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/15",
  },
  {
    title: "Workforce Skill Analytics Node",
    subtitle: "Intelligence Development Platform (IDP)",
    description: "Engineered a React + Node workforce dashboard containing an interactive 9-Box Talent Matrix grid to track employee performance.",
    icon: Database,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/15",
  },
  {
    title: "Seeking Internship & Collaborations",
    subtitle: "Current Focus",
    description: "Actively reaching out to tech engineering teams to work on real-world software setups, ML pipelines, and production features.",
    icon: Compass,
    color: "text-rose-400 bg-rose-500/10 border-rose-500/15",
  },
];

export default function Timeline() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <section id="timeline" className="py-24 relative overflow-hidden px-4 md:px-8 bg-slate-950/20">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm font-semibold tracking-widest text-cyan-400 uppercase font-heading"
          >
            My Timeline
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white mt-2 font-heading"
          >
            Milestones & Academic Journey
          </motion.h3>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative pl-6 md:pl-0">
          {/* Vertical central tracking line */}
          <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-[1.5px] bg-slate-900" />
          
          {/* Animated vertical track highlight */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute left-[11px] md:left-1/2 top-0 w-[1.5px] bg-gradient-to-b from-blue-500 via-cyan-400 to-purple-500 origin-top"
          />

          <div className="space-y-16">
            {timelineData.map((node, idx) => {
              const NodeIcon = node.icon;
              const isEven = idx % 2 === 0;
              const isHovered = hoveredNode === idx;

              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center">
                  
                  {/* central connecting dot */}
                  <div className="absolute left-[5px] md:left-1/2 -translate-x-[6.5px] md:-translate-x-1/2 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-cyan-400 z-10 flex items-center justify-center transition-all duration-300">
                    <motion.div
                      animate={isHovered ? { scale: 1.6 } : { scale: [1, 1.3, 1] }}
                      transition={isHovered ? { type: "spring", stiffness: 300, damping: 15 } : { duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isHovered ? "bg-purple-400" : "bg-cyan-400"}`}
                    />
                  </div>

                  {/* Left spacer block for desktop */}
                  <div className={`hidden md:block w-1/2 pr-12 text-right ${isEven ? "order-1" : "order-2"}`}>
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-block text-left"
                      >
                        <span className="text-[9px] font-mono font-extrabold text-slate-500 uppercase tracking-widest">
                          {node.subtitle}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Node content card wrapper with scroll entrance */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHoveredNode(idx)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`w-full md:w-1/2 pl-8 md:pl-0 ${isEven ? "md:pl-12 order-2" : "md:pr-12 order-1"}`}
                  >
                    <Card
                      glowColor={idx % 2 === 0 ? "blue" : "cyan"}
                      animateEntry={false}
                      className="hover:scale-[1.015] transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-slate-900"
                    >
                      <div className="flex gap-4 items-start">
                        <div className={`p-2.5 rounded-xl shrink-0 ${node.color} border shadow-inner`}>
                          <NodeIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block text-[9px] font-mono font-extrabold text-slate-500 uppercase tracking-widest md:hidden mb-1">
                            {node.subtitle}
                          </span>
                          <h4 className="font-extrabold text-white text-base font-heading tracking-wide">
                            {node.title}
                          </h4>
                          <span className="hidden md:block text-[9px] font-mono font-extrabold text-slate-500 uppercase tracking-widest mt-1">
                            {node.subtitle}
                          </span>
                          <p className="text-slate-400 text-xs md:text-sm font-body leading-relaxed mt-3">
                            {node.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
