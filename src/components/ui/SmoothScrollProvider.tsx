"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Instantiate Lenis smooth scroll settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential deceleration
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    // Notify GSAP ScrollTrigger on every scroll frame
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis frame requests with GSAP's ticker loop
    const tickHandler = (time: number) => {
      lenis.raf(time * 1000); // convert seconds to ms
    };

    gsap.ticker.add(tickHandler);

    // Turn off lag smoothing to prevent scroll timeline jumps
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickHandler);
    };
  }, []);

  return <>{children}</>;
}
