"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import SoundManager from "./SoundManager";

export default function CustomCursor() {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [labelText, setLabelText] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for a high-end float follow lag
  const springConfig = { damping: 38, stiffness: 280, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setTimeout(() => {
      setIsEnabled(true);
    }, 0);

    const updateCoordinates = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setClicked(true);
      SoundManager.playClick();
    };

    const handleMouseUp = () => {
      setClicked(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive-hover");

      if (isInteractive) {
        setHovered(true);
        SoundManager.playTick();

        // Check if item has a custom cursor hover text tag
        const closestLabelHolder = target.closest("[data-cursor-label]") as HTMLElement;
        if (closestLabelHolder && closestLabelHolder.dataset.cursorLabel) {
          setLabelText(closestLabelHolder.dataset.cursorLabel);
        }
      } else {
        setHovered(false);
        setLabelText("");
      }
    };

    window.addEventListener("mousemove", updateCoordinates);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateCoordinates);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Target center core dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ x: mouseX, y: mouseY }}
      />
      
      {/* Outer spring alignment ring */}
      <motion.div
        className="fixed top-0 left-0 border rounded-full z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[7px] font-extrabold text-cyan-300 select-none tracking-widest uppercase hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          width: hovered ? 60 : 30,
          height: hovered ? 60 : 30,
          backgroundColor: hovered ? "rgba(6, 182, 212, 0.06)" : "rgba(6, 182, 212, 0)",
          borderColor: clicked
            ? "rgba(59, 130, 246, 0.8)"
            : hovered
            ? "rgba(6, 182, 212, 0.6)"
            : "rgba(6, 182, 212, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
      >
        <span className="scale-75 origin-center">{labelText}</span>
      </motion.div>
    </>
  );
}
