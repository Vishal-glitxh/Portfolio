"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ChevronDown, ArrowUpRight, Mail } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Magnetic from "@/components/ui/Magnetic";
import ScrambleText from "@/components/ui/ScrambleText";
import AvatarIllustration from "@/components/ui/AvatarIllustration";

const roles = [
  "AI & Machine Learning Student",
  "Full Stack Developer",
  "Python Developer",
  "Data & AI Enthusiast",
  "Cybersecurity Learner",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isCoarse, setIsCoarse] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  // Parallax scroll tracking
  const { scrollY } = useScroll();
  const shape1Y = useTransform(scrollY, [0, 1000], [0, 120]);
  const shape2Y = useTransform(scrollY, [0, 1000], [0, -100]);

  // Spotlight coordinates tracking
  const spotlightX = useMotionValue(-500);
  const spotlightY = useMotionValue(-500);
  const smoothSpotX = useSpring(spotlightX, { damping: 40, stiffness: 220 });
  const smoothSpotY = useSpring(spotlightY, { damping: 40, stiffness: 220 });

  // Avatar 3D tilt coordinates
  const avatarMouseX = useMotionValue(0);
  const avatarMouseY = useMotionValue(0);
  const springX = useSpring(avatarMouseX, { damping: 24, stiffness: 140 });
  const springY = useSpring(avatarMouseY, { damping: 24, stiffness: 140 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    // Detect coarse pointers (mobiles/tablets) to safe-guard layouts asynchronously
    requestAnimationFrame(() => {
      setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
    });

    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(roleInterval);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".hero-status-badge", 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(".hero-title", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(".hero-roles-widget", 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6 },
      "-=0.5"
    )
    .fromTo(".hero-desc", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(".hero-cta-wrapper", 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    )
    .fromTo(".hero-avatar-wrapper", 
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "elastic.out(1, 0.8)" },
      "-=0.8"
    );
  }, { scope: containerRef });

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (isCoarse || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleAvatarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCoarse || !avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    avatarMouseX.set((e.clientX - rect.left - width / 2) / width);
    avatarMouseY.set((e.clientY - rect.top - height / 2) / height);
  };

  const handleAvatarMouseLeave = () => {
    avatarMouseX.set(0);
    avatarMouseY.set(0);
  };

  const spotlightBg = useTransform(
    [smoothSpotX, smoothSpotY],
    ([x, y]) => `radial-gradient(550px circle at ${x}px ${y}px, rgba(6, 182, 212, 0.08), transparent 60%)`
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleHeroMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden px-4 md:px-8 bg-[#0B1120]"
    >
      {/* Volumetric Mouse-Following Spotlight Light Ray */}
      {!isCoarse && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: spotlightBg }}
        />
      )}

      {/* Premium Tech Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
          maskImage: "radial-gradient(circle at center, black 15%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 15%, transparent 70%)",
        }}
      />

      {/* Back glow layers */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 md:w-[500px] h-80 md:h-[500px] rounded-full bg-blue-500/10 blur-[130px] animate-pulse-slow pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 md:w-[500px] h-80 md:h-[500px] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none z-0" />

      {/* Floating 3D perspective elements (With parallax scroll-link) */}
      <motion.div
        style={{ y: shape1Y }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[18%] right-[10%] w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/15 border border-cyan-500/10 backdrop-blur-md shadow-xl pointer-events-none hidden sm:block z-0"
      />
      <motion.div
        style={{ y: shape2Y }}
        animate={{ rotate: [0, -15, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-[20%] left-[8%] w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500/5 to-blue-500/15 border border-blue-500/10 backdrop-blur-md shadow-xl pointer-events-none hidden sm:block z-0"
      />

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          
          {/* Status Badge */}
          <div
            className="hero-status-badge inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-[#111827]/70 border border-slate-800/80 backdrop-blur-md text-xs text-cyan-400 font-semibold mb-6 shadow-md shadow-cyan-950/5 select-none opacity-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            Available for Internships & Collaborations
          </div>

          {/* Heading */}
          <h1
            className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading leading-tight opacity-0"
          >
            Hi, I am <br />
            <span className="gradient-text-primary block mt-2.5 pb-1.5 font-black">
              Vishal Suhas
            </span>
          </h1>

          {/* Scrambled Matrix Role Widget */}
          <div className="hero-roles-widget h-10 md:h-14 flex items-center justify-center lg:justify-start overflow-hidden mt-4 opacity-0">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-300 tracking-wide font-heading">
              <ScrambleText text={roles[roleIndex]} />
            </div>
          </div>

          {/* Description */}
          <p
            className="hero-desc text-slate-400 text-sm md:text-base max-w-xl mt-5 leading-relaxed font-body font-normal opacity-0"
          >
            Engineering student passionate about building real-world solutions using software development, data, and cybersecurity fundamentals, with a strong enthusiasm for Artificial Intelligence and Machine Learning. Skilled in Python, SQL, Node.js, React.js, and Power BI, with hands-on experience in GitHub, automation, and AI-powered development. Focused on problem-solving, continuous learning, and applying modern technologies to practical use cases.
          </p>

          {/* Interactive CTA Buttons */}
          <div
            className="hero-cta-wrapper flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8.5 justify-center lg:justify-start opacity-0"
          >
            <Magnetic range={40} strength={0.25}>
              <a
                href="#projects"
                id="cta-view-projects"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 block text-center"
              >
                <ScrambleText text="View Projects" triggerOn="hover" />
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Magnetic>
            
            <Magnetic range={40} strength={0.3}>
              <a
                href="#contact"
                id="cta-contact-me"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold hover:border-cyan-500/40 hover:text-cyan-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 block text-center shadow-lg"
              >
                <ScrambleText text="Contact Me" triggerOn="hover" />
                <Mail className="w-4 h-4" />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* 3D Profile Character Picture Area */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            ref={avatarRef}
            onMouseMove={handleAvatarMouseMove}
            onMouseLeave={handleAvatarMouseLeave}
            style={{
              transformStyle: "preserve-3d",
              perspective: 1000,
              rotateX: isCoarse ? 0 : rotateX,
              rotateY: isCoarse ? 0 : rotateY,
            }}
            className="hero-avatar-wrapper relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full cursor-grab active:cursor-grabbing group select-none opacity-0"
          >
            {/* Outer rotating dashboard halo ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-cyan-500/25 scale-[1.03]"
            />
            {/* Pulsing neon halo border */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/20 group-hover:border-cyan-400/50 transition-colors duration-500 pointer-events-none scale-100 group-hover:scale-102" />
            
            {/* Inner dynamic color glow */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-cyan-500/25 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Card Frame Layer */}
            <div 
              style={{ transform: "translateZ(40px)" }} 
              className="absolute inset-4 rounded-full overflow-hidden border-2 border-slate-800/80 bg-[#111827]/40 shadow-[0_15px_45px_rgba(0,0,0,0.6)] backdrop-blur-sm flex items-center justify-center"
            >
              <AvatarIllustration />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Parallax bottom indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.a
          href="#about"
          id="scroll-to-about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-slate-500 hover:text-cyan-400 transition-colors flex flex-col items-center gap-1.5 text-xs font-semibold tracking-wider font-heading"
        >
          Scroll Down
          <ChevronDown className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  );
}
