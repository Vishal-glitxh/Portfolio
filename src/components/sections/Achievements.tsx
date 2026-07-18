"use client";

import React from "react";
import Card from "../ui/Card";
import { motion } from "framer-motion";
import { ShieldCheck, Award, GitBranch, ArrowUpRight } from "lucide-react";
import ScrambleText from "@/components/ui/ScrambleText";

interface AchievementItem {
  title: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge: string;
  credentialId?: string;
  credentialUrl?: string;
  institution?: string;
  board?: string;
  year?: string;
}

const achievementsList: AchievementItem[] = [
  {
    title: "IBM Cybersecurity Fundamentals",
    category: "Professional Certification",
    description: "Successfully mastered fundamental cybersecurity principles, including threat mitigation, data privacy, and systems security management.",
    icon: ShieldCheck,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/15",
    badge: "Verified Credential",
    credentialId: "abdd04e5-8a87-4546-bce2-9eec5b30b57a",
    credentialUrl: "https://www.credly.com/badges/abdd04e5-8a87-4546-bce2-9eec5b30b57a/public_url",
  },
  {
    title: "IBM Artificial Intelligence Fundamentals",
    category: "Professional Certification",
    description: "Built a strong foundation in AI, Machine Learning, Deep Learning, NLP, Computer Vision, AI Ethics, Chatbots, and Watson Studio",
    icon: ShieldCheck,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/15",
    badge: "Verified Credential",
    credentialId: "659c71c4-80bc-409f-b2e4-ca41b93e9657",
    credentialUrl: "https://www.credly.com/badges/659c71c4-80bc-409f-b2e4-ca41b93e9657/public_url",
  },
  {
    title: "Continuous AI & ML Learning",
    category: "Self-Driven Expertise",
    description: "Consistently researching deep learning papers, experimenting with neural architectures, and keeping up with ethical AI guidelines.",
    icon: Award,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/15",
    badge: "Active",
  },
  {
    title: "Active GitHub Contributions",
    category: "Open Source & Projects",
    description: "Developing public code repositories, maintaining version controls, and automating study and analytics platforms.",
    icon: GitBranch,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/15",
    badge: "Portfolio Tech",
    credentialUrl: "https://github.com/Vishal-glitxh",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden px-4 md:px-8 bg-slate-950/20">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

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
            Milestones
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white mt-2 font-heading"
          >
            Achievements & Credentials
          </motion.h3>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievementsList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Card
                  glowColor={idx % 2 === 0 ? "blue" : "cyan"}
                  animateEntry={false}
                  className="flex flex-col h-full hover:scale-[1.015] duration-300 border border-slate-900 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4.5 h-full">
                    {/* Icon wrap with double neon border */}
                    <div className={`p-3 rounded-xl border ${item.color} shrink-0 mb-3 sm:mb-0 shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="w-5.5 h-5.5" />
                    </div>

                    {/* Text details */}
                    <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[9px] font-mono font-extrabold tracking-widest text-slate-500 uppercase">
                            {item.category}
                          </span>

                          <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-900 text-slate-400 text-[9px] font-mono font-bold tracking-wide shrink-0">
                            {item.badge}
                          </span>
                        </div>

                        <h4 className="text-base md:text-lg font-extrabold text-white font-heading leading-snug group-hover:text-cyan-300 transition-colors duration-300">
                          {item.title}
                        </h4>

                        <p className="text-slate-400 text-xs md:text-sm font-body leading-relaxed font-medium">
                          {item.description}
                        </p>

                        {item.credentialId && (
                          <div className="p-2.5 rounded bg-slate-950/80 border border-slate-900/60 inline-block mt-2">
                            <p className="text-[9px] text-slate-500 font-mono font-bold leading-none">
                              Cred ID: <span className="text-cyan-400 select-all font-extrabold">{item.credentialId}</span>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Action verification details link */}
                      {item.credentialUrl && (
                        <div className="pt-3.5 border-t border-slate-900 mt-auto flex justify-end">
                          <motion.a
                            href={item.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 3, color: "#22d3ee" }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="text-[10px] md:text-xs text-cyan-400 font-extrabold flex items-center gap-1.5 transition-colors uppercase tracking-widest font-mono"
                          >
                            <ScrambleText text="Verification Details" triggerOn="hover" />
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </motion.a>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
