"use client";

import React from "react";
import Card from "../ui/Card";
import { motion } from "framer-motion";
import { Code2, ShieldAlert, Sparkles, BrainCircuit, BarChart3, Settings, GraduationCap, BookOpen, School } from "lucide-react";

const interests = [
  { name: "Artificial Intelligence", icon: BrainCircuit, color: "text-blue-400 bg-blue-500/10 border-blue-500/15" },
  { name: "Machine Learning", icon: Sparkles, color: "text-purple-400 bg-purple-500/10 border-purple-500/15" },
  { name: "Software Development", icon: Code2, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/15" },
  { name: "Cybersecurity", icon: ShieldAlert, color: "text-rose-400 bg-rose-500/10 border-rose-500/15" },
  { name: "Data Analytics", icon: BarChart3, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/15" },
  { name: "Automation", icon: Settings, color: "text-amber-400 bg-amber-500/10 border-amber-500/15" },
];

const keyTraits = [
  "Continuous Learner",
  "Problem Solver",
  "Passionate about Innovation",
  "Enjoys experimenting with modern technologies",
  "Strong interest in creating impactful AI-driven applications",
];

const education = [
  {
    degree: "Bachelor of Engineering",
    specialization: "Artificial Intelligence & Machine Learning",
    institution: "Visvesvaraya Technological University (VTU)",
    yearRange: "Current & Expected Graduation: 2028",
    description: "Actively building strong foundations in programming, algorithms, databases, artificial intelligence, machine learning, software engineering, and modern neural architectures.",
    icon: GraduationCap,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/15",
    glowColor: "cyan" as const,
    badge: "Current",
  },
  {
    degree: "Pre-University Course (PUC)",
    specialization: "PCMC (Physics, Chemistry, Mathematics & Computer Science)",
    institution: "Reva Independent PU College",
    board: "Karnataka Pre-University Education Board",
    yearRange: "Completed: 2024",
    description: "Completed the PCMC curriculum, developing a strong foundation in mathematics, physics, chemistry, and computer science while strengthening analytical thinking and logical problem-solving skills before pursuing engineering.",
    icon: BookOpen,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/15",
    glowColor: "emerald" as const,
    badge: "2024",
  },
  {
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "Royale Concorde High School",
    board: "Karnataka Secondary Education Examination Board",
    yearRange: "Completed: 2022",
    description: "Completed secondary education while building strong academic fundamentals, discipline, curiosity, analytical thinking, and an early passion for technology.",
    icon: School,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/15",
    glowColor: "purple" as const,
    badge: "2022",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden px-4 md:px-8 bg-[#0B1120]/20">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm font-semibold tracking-widest text-cyan-400 uppercase font-heading"
          >
            About Me
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white mt-2 font-heading"
          >
            Who I Am & What Drives Me
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Bio & Interests */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Bio Card */}
            <Card glowColor="blue" className="hover:scale-[1.005] duration-300">
              <h4 className="text-lg md:text-xl font-bold text-white mb-5 font-heading flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-blue-500" />
                Who I Am
              </h4>
              <p className="text-slate-300 leading-relaxed font-body text-sm md:text-base">
                A motivated Artificial Intelligence and Machine Learning engineering student passionate about developing intelligent software solutions that solve practical problems. Focused on building clean applications, analyzing data patterns, and strengthening cybersecurity systems.
              </p>

              <div className="mt-6 space-y-4">
                {keyTraits.map((trait, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="flex items-start gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 animate-pulse shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                    <span className="text-slate-300 font-body text-sm md:text-base group-hover:text-cyan-300 transition-colors duration-200">
                      {trait}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Focus Areas Card */}
            <Card glowColor="purple" className="hover:scale-[1.005] duration-300">
              <h4 className="text-lg md:text-xl font-bold text-white mb-5 font-heading flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-purple-500" />
                Interests & Focus Areas
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {interests.map((interest, idx) => {
                  const Icon = interest.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        borderColor: "rgba(6, 182, 212, 0.2)",
                        backgroundColor: "rgba(17, 24, 39, 0.8)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3.5 cursor-pointer shadow-sm shadow-black/10"
                    >
                      <div className={`p-2.5 rounded-lg ${interest.color} border shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-slate-200 text-xs md:text-sm font-bold tracking-wide leading-tight">
                        {interest.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Side: Education Timeline */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="text-lg md:text-xl font-bold text-white mb-2 pl-4 font-heading flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-cyan-400" />
              Education Journey
            </h4>

            <div className="relative pl-6 ml-4 border-l border-slate-900/60 space-y-6 py-2">
              {/* Active scrolling tracker track highlight */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="absolute left-[-1px] top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-emerald-400 to-purple-500 origin-top"
              />

              {education.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="relative group pl-2">
                    {/* Glowing Timeline Node */}
                    <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full flex items-center justify-center z-10">
                      <div className={`absolute inset-0 rounded-full animate-ping opacity-25 ${
                        item.glowColor === "cyan" ? "bg-cyan-500" : item.glowColor === "emerald" ? "bg-emerald-500" : "bg-purple-500"
                      }`} />
                      <div className={`w-3 h-3 rounded-full border-2 ${
                        item.glowColor === "cyan" 
                          ? "bg-cyan-500 border-cyan-300 shadow-[0_0_8px_#06b6d4]" 
                          : item.glowColor === "emerald" 
                          ? "bg-emerald-500 border-emerald-300 shadow-[0_0_8px_#10b981]" 
                          : "bg-purple-500 border-purple-300 shadow-[0_0_8px_#8b5cf6]"
                      }`} />
                    </div>

                    {/* Milestone Card */}
                    <motion.div
                      whileHover={{
                        scale: 1.02,
                        y: -3,
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    >
                      <Card glowColor={item.glowColor} delay={idx * 0.12} className="relative overflow-hidden">
                        <div className="flex items-start gap-4">
                          {/* Left icon cap */}
                          <div className={`p-2.5 rounded-xl border shrink-0 ${item.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>

                          {/* Details */}
                          <div className="space-y-2 flex-1">
                            {/* Year chip */}
                            <span className={`inline-flex px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 border border-slate-800 ${
                              item.glowColor === "cyan" ? "text-cyan-400" : item.glowColor === "emerald" ? "text-emerald-400" : "text-purple-400"
                            }`}>
                              {item.badge}
                            </span>

                            {/* Degree title */}
                            <h5 className="text-base md:text-lg font-black text-white font-heading leading-tight mt-1.5">
                              {item.degree}
                            </h5>

                            {/* Specialization */}
                            {item.specialization && (
                              <p className="text-slate-300 font-bold text-xs md:text-sm tracking-wide">
                                {item.specialization}
                              </p>
                            )}

                            {/* Institution */}
                            <p className="text-slate-400 font-extrabold text-[11px] md:text-xs uppercase tracking-wide">
                              {item.institution}
                            </p>

                            {/* Board */}
                            {item.board && (
                              <p className="text-slate-500 font-medium text-[10px] md:text-[11px] tracking-wide">
                                {item.board}
                              </p>
                            )}

                            {/* Description container */}
                            <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-900/50 mt-3.5">
                              <p className="text-xs text-slate-400 leading-relaxed font-body">
                                {item.description}
                              </p>
                            </div>
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
      </div>
    </section>
  );
}
