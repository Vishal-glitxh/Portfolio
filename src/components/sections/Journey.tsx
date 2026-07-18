"use client";

import React from "react";
import Card from "../ui/Card";
import { motion } from "framer-motion";
import { Sparkles, Calendar, BookOpen, Compass, Search, Rocket } from "lucide-react";

const focusAreas = [
  { text: "Building AI-powered applications", icon: Sparkles },
  { text: "Learning modern development frameworks", icon: Rocket },
  { text: "Strengthening cybersecurity fundamentals", icon: Compass },
  { text: "Developing full-stack applications", icon: BookOpen },
  { text: "Exploring machine learning models", icon: Search },
];

export default function Journey() {
  return (
    <section id="journey" className="py-24 relative overflow-hidden px-4 md:px-8 bg-slate-950/40">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm font-semibold tracking-widest text-purple-400 uppercase font-heading"
          >
            My Path
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white mt-2 font-heading"
          >
            Current Journey
          </motion.h3>
        </div>

        {/* Journey Card Layout */}
        <div className="max-w-4xl mx-auto">
          <Card glowColor="purple" className="relative p-8 md:p-12">
            {/* Corner Badge */}
            <div className="absolute top-0 right-0 px-6 py-2 rounded-bl-2xl bg-purple-500/10 border-b border-l border-purple-500/20 text-purple-400 text-xs font-semibold flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Active
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-2xl md:text-3xl font-extrabold text-white font-heading">
                  AI & ML Engineering Student
                </h4>
                <p className="text-slate-400 font-semibold text-sm md:text-base mt-1">
                  Pursuing deep technical knowledge & building software solutions
                </p>
              </div>

              <div className="h-[1px] w-full bg-slate-800" />

              <div>
                <h5 className="text-slate-200 font-bold text-sm uppercase tracking-wider mb-4">
                  Core Development Focus
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {focusAreas.map((focus, idx) => {
                    const AreaIcon = focus.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-900"
                      >
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                          <AreaIcon className="w-4 h-4" />
                        </div>
                        <span className="text-slate-300 text-sm font-medium font-body">
                          {focus.text}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="h-[1px] w-full bg-slate-800" />

              {/* Callout section for internship search */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-purple-500/5 border border-cyan-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <h6 className="text-cyan-400 font-bold text-base font-heading">
                    Seeking Opportunities
                  </h6>
                  <p className="text-slate-400 text-xs md:text-sm font-body max-w-lg">
                    Currently seeking internship and collaborative opportunities to apply technical knowledge, write code, and build machine learning features in real-world developer environments.
                  </p>
                </div>
                
                <a
                  href="#contact"
                  id="collaborate-btn"
                  className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all hover:scale-105 shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/20 shrink-0"
                >
                  Let&apos;s Collaborate
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
