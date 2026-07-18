"use client";

import React from "react";
import Card from "../ui/Card";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden px-4 md:px-8 bg-[#0B1120]/10">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

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
            Get In Touch
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white mt-2 font-heading"
          >
            Let&apos;s Build Something Intelligent
          </motion.h3>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card glowColor="blue">
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white font-heading">Contact Details</h4>
              <p className="text-slate-400 text-sm font-body leading-relaxed font-medium">
                Feel free to reach out via email, connect on LinkedIn, or browse my code on GitHub. I will respond as soon as possible!
              </p>

              {/* Data fields */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 border border-blue-500/10">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold">Email</span>
                    <a href="mailto:vishalsuhas0662@gmail.com" className="hover:text-cyan-400 transition-colors font-extrabold font-heading text-sm md:text-base">
                      vishalsuhas0662@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 border border-purple-500/10">
                    <Linkedin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold">LinkedIn</span>
                    <a
                      href="https://www.linkedin.com/in/vishalsuhas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition-colors font-extrabold font-heading text-sm md:text-base"
                    >
                      linkedin.com/in/vishalsuhas
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 border border-cyan-500/10">
                    <Github className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold">GitHub</span>
                    <a
                      href="https://github.com/Vishal-glitxh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition-colors font-extrabold font-heading text-sm md:text-base"
                    >
                      github.com/Vishal-glitxh
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="p-2.5 rounded-lg bg-slate-800 text-slate-400 shrink-0 border border-slate-700/20">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold">Location</span>
                    <span className="font-extrabold font-heading text-slate-200 text-sm md:text-base">Bangalore, Karnataka, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Call To Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-slate-900">
              <Magnetic range={30} strength={0.25}>
                <a
                  href="mailto:vishalsuhas0662@gmail.com"
                  id="contact-btn-email"
                  className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors text-center w-full shadow-md"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Send Email
                </a>
              </Magnetic>

              <Magnetic range={30} strength={0.25}>
                <a
                  href="https://www.linkedin.com/in/vishalsuhas"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-btn-linkedin"
                  className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/20 font-bold text-xs transition-all text-center w-full"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  Open LinkedIn
                </a>
              </Magnetic>

              <Magnetic range={30} strength={0.25}>
                <a
                  href="https://github.com/Vishal-glitxh"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-btn-github"
                  className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/20 font-bold text-xs transition-all text-center w-full"
                >
                  <Github className="w-3.5 h-3.5" />
                  View GitHub
                </a>
              </Magnetic>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
