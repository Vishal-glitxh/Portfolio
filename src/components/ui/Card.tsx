"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "cyan" | "emerald" | "all";
  delay?: number;
  id?: string;
  animateEntry?: boolean;
}

export default function Card({
  children,
  className = "",
  glowColor = "cyan",
  delay = 0,
  id,
  animateEntry = true,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCoarse, setIsCoarse] = useState(false);
  const [shineStyle, setShineStyle] = useState<React.CSSProperties>({
    opacity: 0,
    background: "radial-gradient(circle at 0px 0px, rgba(255,255,255,0.05), transparent 45%)",
  });

  // Framer Motion motion values for tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  // Smooth springs to avoid jittering
  const springX = useSpring(tiltX, { damping: 25, stiffness: 120 });
  const springY = useSpring(tiltY, { damping: 25, stiffness: 120 });

  // Map normalized mouse offsets (-0.5 to 0.5) to degree rotations (-10 to 10 degrees)
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCoarse || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    // Normalize cursor coordinate between -0.5 and 0.5
    tiltX.set((mouseX - width / 2) / width);
    tiltY.set((mouseY - height / 2) / height);

    // Smoothly position glass shine reflection
    setShineStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.07), transparent 45%)`,
    });
  };

  const handleMouseLeave = () => {
    if (isCoarse) return;
    tiltX.set(0);
    tiltY.set(0);
    setShineStyle({
      opacity: 0,
      background: "radial-gradient(circle at 0px 0px, rgba(255,255,255,0.05), transparent 45%)",
    });
  };

  const glowStyles = {
    blue: "hover:border-blue-500/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.18)]",
    purple: "hover:border-purple-500/40 hover:shadow-[0_0_35px_rgba(139,92,246,0.18)]",
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.18)]",
    emerald: "hover:border-emerald-500/40 hover:shadow-[0_0_35px_rgba(16,185,129,0.18)]",
    all: "hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.18)]",
  };

  const motionProps = animateEntry
    ? {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
      }
    : {};

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX: isCoarse ? 0 : rotateX,
        rotateY: isCoarse ? 0 : rotateY,
      }}
      className={`glass-card rounded-[24px] p-6 md:p-8 transition-shadow duration-500 relative group overflow-hidden ${glowStyles[glowColor]} ${className}`}
    >
      {/* 3D Glass shine reflection overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none z-10"
        style={shineStyle}
      />

      {/* Floating color background lights */}
      <div
        className={`absolute top-0 right-0 w-28 h-28 rounded-full filter blur-[50px] opacity-0 group-hover:opacity-30 transition-all duration-500 pointer-events-none translate-x-4 -translate-y-4
        ${glowColor === "blue" ? "bg-blue-500" : ""}
        ${glowColor === "purple" ? "bg-purple-500" : ""}
        ${glowColor === "cyan" ? "bg-cyan-500" : ""}
        ${glowColor === "all" ? "bg-indigo-500" : ""}
      `}
      />

      {/* Transformed content container */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
}
