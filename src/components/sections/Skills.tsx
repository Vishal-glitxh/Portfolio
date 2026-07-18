"use client";

import React, { useState } from "react";
import Card from "../ui/Card";
import AnimatedProgress from "../ui/AnimatedProgress";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Layout, Server, Database, Brain, BarChart, ShieldAlert, Award } from "lucide-react";

interface SkillItem {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  glow: "blue" | "purple" | "cyan" | "all";
  type: "dev" | "ai" | "security_soft";
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: Code,
    glow: "blue",
    type: "dev",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 80 },
      { name: "C", level: 75 },
      { name: "C++", level: 70 },
    ],
  },
  {
    title: "Frontend Development",
    icon: Layout,
    glow: "cyan",
    type: "dev",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    glow: "purple",
    type: "dev",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "Flask", level: 75 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    glow: "all",
    type: "dev",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "MySQL", level: 85 },
      { name: "SQLite", level: 75 },
      { name: "Prisma ORM", level: 78 },
    ],
  },
  {
    title: "Artificial Intelligence",
    icon: Brain,
    glow: "blue",
    type: "ai",
    skills: [
      { name: "Machine Learning", level: 82 },
      { name: "Deep Learning", level: 78 },
      { name: "Neural Networks", level: 75 },
      { name: "NLP", level: 80 },
      { name: "Computer Vision", level: 72 },
      { name: "AI Ethics", level: 85 },
      { name: "Watson Studio", level: 70 },
    ],
  },
  {
    title: "Data Science",
    icon: BarChart,
    glow: "purple",
    type: "ai",
    skills: [
      { name: "NumPy / Pandas", level: 88 },
      { name: "Matplotlib", level: 85 },
      { name: "Scikit-learn", level: 82 },
      { name: "Power BI", level: 80 },
    ],
  },
  {
    title: "Cybersecurity",
    icon: ShieldAlert,
    glow: "cyan",
    type: "security_soft",
    skills: [
      { name: "Cybersecurity Fundamentals", level: 85 },
      { name: "Security Management", level: 75 },
    ],
  },
  {
    title: "Professional Skills",
    icon: Award,
    glow: "all",
    type: "security_soft",
    skills: [
      { name: "Problem Solving", level: 92 },
      { name: "Proactive Design Thinking", level: 85 },
      { name: "Continuous Learning", level: 95 },
    ],
  },
];

function TechOrbit() {
  const orbits = [
    {
      radius: 95,
      duration: 20,
      direction: 1,
      skills: ["Python", "PyTorch", "ML Model", "NLP"],
      color: "border-blue-500/25 text-blue-400"
    },
    {
      radius: 145,
      duration: 28,
      direction: -1,
      skills: ["React", "Next.js", "Node.js", "SQL"],
      color: "border-purple-500/25 text-purple-400"
    },
    {
      radius: 195,
      duration: 36,
      direction: 1,
      skills: ["Cybersec", "Flask", "MongoDB", "Ethics"],
      color: "border-cyan-500/25 text-cyan-400"
    }
  ];

  return (
    <div className="relative w-full max-w-[500px] h-[340px] mx-auto overflow-hidden flex items-center justify-center select-none pointer-events-none mb-6 relative">
      {/* Central Core Brain */}
      <div className="relative z-20 p-4 rounded-full bg-slate-900/90 border-2 border-cyan-500/30 text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.2)] flex items-center justify-center animate-pulse">
        <Brain className="w-8 h-8" />
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-extrabold text-slate-500 tracking-widest uppercase whitespace-nowrap">
          AI & ML CORE
        </span>
      </div>

      {/* Orbit Tracks */}
      {orbits.map((orbit, oIdx) => (
        <div
          key={oIdx}
          className={`absolute rounded-full border border-dashed ${orbit.color} flex items-center justify-center`}
          style={{
            width: orbit.radius * 2,
            height: orbit.radius * 2,
            transform: "rotateX(72deg) rotateY(-12deg)",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Rotate nodes on this track */}
          <motion.div
            animate={{ rotate: orbit.direction * 360 }}
            transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {orbit.skills.map((skill, sIdx) => {
              const angle = (sIdx / orbit.skills.length) * 2 * Math.PI;
              const x = Math.cos(angle) * orbit.radius;
              const y = Math.sin(angle) * orbit.radius;

              return (
                <div
                  key={sIdx}
                  className="absolute px-3 py-1.5 rounded-full bg-slate-950/90 border border-slate-800 text-[9px] font-extrabold text-slate-300 shadow-md shadow-black/40 flex items-center justify-center"
                  style={{
                    left: `calc(50% + ${x}px - 28px)`,
                    top: `calc(50% + ${y}px - 14px)`,
                    transform: "rotateY(12deg) rotateX(-72deg)",
                  }}
                >
                  <span className="whitespace-nowrap">{skill}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

type FilterType = "all" | "dev" | "ai" | "security_soft";

export default function Skills() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredCategories = skillCategories.filter(
    (cat) => filter === "all" || cat.type === filter
  );

  const tabs: { label: string; id: FilterType }[] = [
    { label: "All Skills", id: "all" },
    { label: "Development", id: "dev" },
    { label: "AI & Data Science", id: "ai" },
    { label: "Security & Professional", id: "security_soft" },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden px-4 md:px-8">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-600/5 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm font-semibold tracking-widest text-cyan-400 uppercase font-heading"
          >
            My Tech Stack
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white mt-2 font-heading"
          >
            Expertise & Technical Capabilities
          </motion.h3>
        </div>

        {/* 3D Orbiting Technology Constellation */}
        <TechOrbit />

        {/* Tab Filters (Interactive layout with dynamic capsules) */}
        <div className="flex justify-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-[#111827]/80 border border-slate-800/80 backdrop-blur-md shadow-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wide transition-colors duration-300 outline-none
                  ${filter === tab.id ? "text-cyan-400 font-extrabold" : "text-slate-400 hover:text-white"}
                `}
              >
                {filter === tab.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-slate-900 border border-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.06)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Animated Category Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <Card
                    glowColor={category.glow}
                    animateEntry={false}
                    className="flex flex-col h-full hover:scale-[1.02] duration-300 border border-slate-800/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                  >
                    {/* Category Header with rotating icon ring */}
                    <div className="flex items-center gap-3.5 mb-6">
                      <div className={`p-2.5 rounded-xl shrink-0 relative group-hover:rotate-12 transition-transform duration-300
                        ${category.glow === "blue" ? "bg-blue-500/10 text-blue-400 border border-blue-500/15" : ""}
                        ${category.glow === "purple" ? "bg-purple-500/10 text-purple-400 border border-purple-500/15" : ""}
                        ${category.glow === "cyan" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/15" : ""}
                        ${category.glow === "all" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/15" : ""}
                      `}>
                        <CategoryIcon className="w-5.5 h-5.5" />
                      </div>
                      <h4 className="font-extrabold text-white text-base font-heading leading-tight tracking-wide">
                        {category.title}
                      </h4>
                    </div>

                    {/* Skill List */}
                    <div className="space-y-4.5 flex-1">
                      {category.skills.map((skill, skillIdx) => (
                        <div key={skillIdx} className="space-y-2 group/item">
                          <div className="flex justify-between text-xs md:text-sm">
                            <span className="text-slate-300 font-semibold group-hover/item:text-white transition-colors duration-200">
                              {skill.name}
                            </span>
                            <span className="text-slate-500 font-bold group-hover/item:text-cyan-400 transition-colors duration-200">
                              {skill.level}%
                            </span>
                          </div>
                          
                          <AnimatedProgress
                            value={skill.level}
                            colorClass={`
                              ${category.glow === "blue" ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" : ""}
                              ${category.glow === "purple" ? "bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.3)]" : ""}
                              ${category.glow === "cyan" ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : ""}
                              ${category.glow === "all" ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]" : ""}
                            `}
                            delay={0.08 + skillIdx * 0.06}
                          />
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
