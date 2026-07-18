"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Menu, X, Sun, Moon, Volume2, VolumeX } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import SoundManager from "@/components/ui/SoundManager";
import ScrambleText from "@/components/ui/ScrambleText";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Clear active section if at the top of page
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Active section intersection observer (scroll-storytelling highlight)
    const sections = ["about", "skills", "journey", "projects", "achievements", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Trigger when section occupies center area
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Initialize sound and theme in setTimeout to avoid cascading renders
    setTimeout(() => {
      setIsMuted(SoundManager.getMuted());
      const savedTheme = localStorage.getItem("theme");
      const isLight = savedTheme === "light";
      setIsLightMode(isLight);
      
      if (isLight) {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    }, 0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    SoundManager.setMuted(newMuted);
    SoundManager.playClick();
  };

  const toggleTheme = () => {
    const newLight = !isLightMode;
    setIsLightMode(newLight);
    if (newLight) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
    SoundManager.playClick();
  };

  const handleLinkClick = () => {
    SoundManager.playClick();
    setIsMobileOpen(false);
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Journey", href: "#journey" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 pt-4 transition-all duration-300 select-none">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`max-w-5xl mx-auto w-full rounded-2xl md:rounded-full px-6 py-3.5 flex items-center justify-between border transition-all duration-500
            ${
              isScrolled
                ? "bg-[#111827]/75 border-slate-800/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] py-2.5 light:bg-white/75 light:border-slate-200/80"
                : "bg-transparent border-transparent py-4"
            }`}
        >
          {/* Logo Brand */}
          <Magnetic range={40} strength={0.25}>
            <a
              href="#"
              id="nav-logo"
              onClick={handleLinkClick}
              className="flex items-center gap-2 group text-white light:text-slate-800 hover:text-cyan-400 transition-colors"
            >
              <BrainCircuit className="w-5.5 h-5.5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-heading font-extrabold text-sm tracking-wider">
                VS <span className="text-cyan-400">.</span> AI
              </span>
            </a>
          </Magnetic>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2 bg-slate-950/45 light:bg-slate-100/50 p-1 rounded-full border border-slate-900/60 light:border-slate-200/40">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <Magnetic key={link.name} range={25} strength={0.15}>
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`text-xs md:text-sm font-bold tracking-wide transition-colors duration-300 relative py-1.5 px-3 rounded-full outline-none
                      ${isActive ? "text-cyan-400 font-extrabold" : "text-slate-400 hover:text-white light:hover:text-slate-900"}
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-slate-900/70 light:bg-slate-200/80 border border-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.06)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      <ScrambleText text={link.name} triggerOn="hover" />
                    </span>
                  </a>
                </Magnetic>
              );
            })}
          </div>

          {/* Quick controls & actions */}
          <div className="flex items-center gap-4">
            
            {/* Audio Toggle */}
            <Magnetic range={25} strength={0.25}>
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-400 hover:text-cyan-400 transition-all shadow-sm"
                aria-label="Toggle mute"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </Magnetic>

            {/* Dark/Light Theme Toggle */}
            <Magnetic range={25} strength={0.25}>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-400 hover:text-cyan-400 transition-all shadow-sm"
                aria-label="Toggle light theme"
                title={isLightMode ? "Dark Theme" : "Light Theme"}
              >
                {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </Magnetic>

            {/* Desktop Connect button */}
            <div className="hidden md:block">
              <Magnetic range={35} strength={0.3}>
                <a
                  href="#contact"
                  id="nav-connect-btn"
                  onClick={handleLinkClick}
                  className="px-5 py-2 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white hover:bg-cyan-600 hover:border-cyan-500 font-bold text-xs transition-all duration-200 block shadow-md shadow-cyan-950/20"
                >
                  Let&apos;s Connect
                </a>
              </Magnetic>
            </div>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => {
                SoundManager.playClick();
                setIsMobileOpen(!isMobileOpen);
              }}
              className="md:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[76px] z-30 bg-[#0B1120]/95 light:bg-[#F8FAFC]/95 backdrop-blur-xl border-b border-slate-900 light:border-slate-200 flex flex-col p-6 space-y-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-lg font-bold text-slate-200 light:text-slate-800 hover:text-cyan-400 transition-colors py-2 border-b border-slate-900 light:border-slate-100"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="w-full text-center py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md"
            >
              Let&apos;s Connect
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
