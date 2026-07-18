"use client";

import React, { useState } from "react";
import Card from "../ui/Card";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import Magnetic from "@/components/ui/Magnetic";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [error, setError] = useState("");
  const [focusFields, setFocusFields] = useState<Record<string, boolean>>({});

  const handleFocus = (field: string) => {
    setFocusFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusFields((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("Please fill out all fields.");
      return;
    }

    setStatus("submitting");

    // Simulate sending progress
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("sent");
    setForm({ name: "", email: "", subject: "", message: "" });

    // Success Confetti Spray!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#3B82F6", "#8B5CF6", "#06B6D4", "#ffffff"],
    });
  };

  const isFloating = (field: "name" | "email" | "subject" | "message") => {
    return focusFields[field] || !!form[field];
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden px-4 md:px-8">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <Card glowColor="blue" className="h-full flex flex-col justify-between">
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white font-heading">Contact Details</h4>
                <p className="text-slate-400 text-sm font-body leading-relaxed">
                  Feel free to reach out via email, connect on LinkedIn, browse my code on GitHub, or send a message using the form. I will respond as soon as possible!
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

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <Card glowColor="cyan" className="h-full">
              <h4 className="text-xl font-bold text-white mb-6 font-heading">Send Message</h4>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Floating Input Name */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="name-input"
                      name="name"
                      value={form.name}
                      onFocus={() => handleFocus("name")}
                      onBlur={() => handleBlur("name")}
                      onChange={handleChange}
                      placeholder=" "
                      className="w-full bg-slate-950/40 border border-slate-900 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/10 rounded-xl px-4 pt-6 pb-2.5 text-sm text-slate-200 outline-none transition-all font-body"
                    />
                    <label
                      htmlFor="name-input"
                      className={`absolute left-4 pointer-events-none transition-all duration-300 font-bold tracking-wider uppercase
                        ${
                          isFloating("name")
                            ? "top-2 text-[9px] text-cyan-400"
                            : "top-4 text-[10px] text-slate-500"
                        }`}
                    >
                      Name
                    </label>
                  </div>

                  {/* Floating Input Email */}
                  <div className="relative w-full">
                    <input
                      type="email"
                      id="email-input"
                      name="email"
                      value={form.email}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      onChange={handleChange}
                      placeholder=" "
                      className="w-full bg-slate-950/40 border border-slate-900 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/10 rounded-xl px-4 pt-6 pb-2.5 text-sm text-slate-200 outline-none transition-all font-body"
                    />
                    <label
                      htmlFor="email-input"
                      className={`absolute left-4 pointer-events-none transition-all duration-300 font-bold tracking-wider uppercase
                        ${
                          isFloating("email")
                            ? "top-2 text-[9px] text-cyan-400"
                            : "top-4 text-[10px] text-slate-500"
                        }`}
                    >
                      Email Address
                    </label>
                  </div>

                </div>

                {/* Floating Input Subject */}
                <div className="relative w-full">
                  <input
                    type="text"
                    id="subject-input"
                    name="subject"
                    value={form.subject}
                    onFocus={() => handleFocus("subject")}
                    onBlur={() => handleBlur("subject")}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full bg-slate-950/40 border border-slate-900 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/10 rounded-xl px-4 pt-6 pb-2.5 text-sm text-slate-200 outline-none transition-all font-body"
                  />
                  <label
                    htmlFor="subject-input"
                    className={`absolute left-4 pointer-events-none transition-all duration-300 font-bold tracking-wider uppercase
                      ${
                        isFloating("subject")
                          ? "top-2 text-[9px] text-cyan-400"
                          : "top-4 text-[10px] text-slate-500"
                      }`}
                  >
                    Subject
                  </label>
                </div>

                {/* Floating Input Message */}
                <div className="relative w-full">
                  <textarea
                    id="message-input"
                    name="message"
                    rows={5}
                    value={form.message}
                    onFocus={() => handleFocus("message")}
                    onBlur={() => handleBlur("message")}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full bg-slate-950/40 border border-slate-900 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/10 rounded-xl px-4 pt-6 pb-3 text-sm text-slate-200 outline-none transition-all resize-none font-body"
                  />
                  <label
                    htmlFor="message-input"
                    className={`absolute left-4 pointer-events-none transition-all duration-300 font-bold tracking-wider uppercase
                      ${
                        isFloating("message")
                          ? "top-2 text-[9px] text-cyan-400"
                          : "top-4.5 text-[10px] text-slate-500"
                      }`}
                  >
                    Message
                  </label>
                </div>

                {error && (
                  <p className="text-xs font-semibold text-rose-500 font-body">
                    {error}
                  </p>
                )}

                {status === "sent" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3 text-sm font-semibold font-body"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Message sent successfully! Thank you for connecting.
                  </motion.div>
                ) : (
                  <button
                    type="submit"
                    id="form-submit-button"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-700 text-white font-bold text-sm md:text-base shadow-lg shadow-cyan-500/10 transition-all hover:scale-[1.01] active:scale-[0.99] duration-200 mt-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Transmitting Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4.5 h-4.5" />
                        Send Message
                      </>
                    )}
                  </button>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
