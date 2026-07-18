"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, X, Github, Linkedin, Mail, ArrowUpRight, Award, GraduationCap, Code2, Briefcase } from "lucide-react";

export default function RecruiterMode() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          onClick={toggleOpen}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs md:text-sm shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/25 border border-cyan-400/20 transition-all hover:scale-105 active:scale-95"
        >
          <UserCheck className="w-4 h-4 animate-bounce" />
          Recruiter Mode?
        </motion.button>
      </div>

      {/* Recruiter Overlay Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleOpen}
              className="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-md"
            />

            {/* Content Card Panel */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-3xl bg-[#111827]/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl z-10 overflow-y-auto max-h-[85vh] select-none"
            >
              {/* Close Button */}
              <button
                onClick={toggleOpen}
                className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Close Recruiter Panel"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                {/* Header info */}
                <div>
                  <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                    Recruiter Console &bull; 2-Minute TL;DR
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white font-heading mt-1">
                    Vishal Suhas Summary
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left stats */}
                  <div className="space-y-4">
                    {/* Education Card */}
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-900 flex gap-3.5 items-start">
                      <GraduationCap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-white text-xs font-heading uppercase tracking-wider">Education</h4>
                        <p className="text-slate-300 font-semibold text-sm mt-1">B.E in AI & ML</p>
                        <p className="text-slate-500 text-xs">Visvesvaraya Technological University (VTU)</p>
                        <p className="text-cyan-400 text-xs font-bold mt-1">Graduation: 2028</p>
                      </div>
                    </div>

                    {/* Skill highlight Card */}
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-900 flex gap-3.5 items-start">
                      <Code2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-white text-xs font-heading uppercase tracking-wider">Top Skills</h4>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {["Python", "AI/ML Modeling", "React.js", "Node.js", "Cybersecurity"].map((skill, idx) => (
                            <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Certification card */}
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-900 flex gap-3.5 items-start">
                      <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-white text-xs font-heading uppercase tracking-wider">Key Certificate</h4>
                        <p className="text-slate-300 text-sm mt-1 font-semibold">IBM Cybersecurity Fundamentals</p>
                        <p className="text-slate-500 text-xs">Validating threat assessment, analysis, and network mitigation.</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: projects & connections */}
                  <div className="space-y-4">
                    {/* Active works */}
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-900 flex gap-3.5 items-start">
                      <Briefcase className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-white text-xs font-heading uppercase tracking-wider">Core Projects</h4>
                        <ul className="mt-2 space-y-2 text-xs">
                          <li>
                            <a href="#projects" onClick={toggleOpen} className="text-slate-300 hover:text-cyan-400 font-semibold flex items-center gap-1">
                              AI Question Predictor
                              <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                            </a>
                          </li>
                          <li>
                            <a href="#projects" onClick={toggleOpen} className="text-slate-300 hover:text-cyan-400 font-semibold flex items-center gap-1">
                              Talent IDP Platform (9-Box Matrix)
                              <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Quick actions panel */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-cyan-500/10 space-y-3.5">
                      <h4 className="font-extrabold text-white text-xs font-heading uppercase tracking-wider">Quick Actions</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href="mailto:vishalsuhas0662@gmail.com"
                          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs text-center"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Send Email
                        </a>
                        <a
                          href="https://www.linkedin.com/in/vishalsuhas"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs text-center"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          LinkedIn
                        </a>
                        <a
                          href="https://github.com/Vishal-glitxh"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs text-center"
                        >
                          <Github className="w-3.5 h-3.5" />
                          GitHub
                        </a>
                        <button
                          onClick={() => {
                            alert("CV Download Simulation Activated! Resume static link will resolve dynamically.");
                          }}
                          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-950 text-slate-400 hover:text-white text-xs text-center"
                        >
                          Download CV
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
