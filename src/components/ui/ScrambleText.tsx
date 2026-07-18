"use client";

import React, { useState, useEffect, useCallback } from "react";

const GLYPHS = "XYZ01!@#$%&*?_-+=<>[]{}";

// Custom hook to trigger text scramble programmatically or on events
export function useTextScramble(targetText: string, speed = 30) {
  const [displayText, setDisplayText] = useState(targetText);

  const triggerScramble = useCallback(() => {
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(() =>
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return targetText[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      iteration += 1.8;
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, speed]);

  return { displayText, triggerScramble };
}

interface ScrambleTextProps {
  text: string;
  speed?: number;
  triggerOn?: "mount" | "hover";
  className?: string;
}

// Reusable ScrambleText component
export default function ScrambleText({
  text,
  speed = 30,
  triggerOn = "mount",
  className = "",
}: ScrambleTextProps) {
  const { displayText, triggerScramble } = useTextScramble(text, speed);

  useEffect(() => {
    if (triggerOn === "mount") {
      triggerScramble();
    }
  }, [text, triggerOn, triggerScramble]);

  return (
    <span
      className={className}
      onMouseEnter={triggerOn === "hover" ? triggerScramble : undefined}
    >
      {displayText}
    </span>
  );
}
