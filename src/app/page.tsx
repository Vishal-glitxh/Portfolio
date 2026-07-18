"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Core Layout Modules
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Journey from "@/components/sections/Journey";
import Projects from "@/components/sections/Projects";
import Technologies from "@/components/sections/Technologies";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

// Custom Premium Sections
import Metrics from "@/components/sections/Metrics";
import Timeline from "@/components/sections/Timeline";

// Custom UI Overlays
import LoadingScreen from "@/components/ui/LoadingScreen";
import RecruiterMode from "@/components/ui/RecruiterMode";
import AiAssistant from "@/components/ui/AiAssistant";

// Client-Only Dynamic Interactive Elements
const CursorGlow = dynamic(() => import("@/components/ui/CursorGlow"), { ssr: false });
const InteractiveBackground = dynamic(() => import("@/components/ui/InteractiveBackground"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Cinematic entry loading overlay */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative min-h-screen bg-[#0B1120] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300 antialiased overflow-x-hidden"
        >
          {/* Constellation Canvas Nodes & Grid Overlay */}
          <InteractiveBackground />

          {/* Interactive Global Glow effect */}
          <CursorGlow />

          {/* Awwwards Custom Cursor follower */}
          <CustomCursor />

          {/* Recruiter 2-Minute Summary Dashboard Console */}
          <RecruiterMode />

          {/* Floating AI chatbot assistant helper */}
          <AiAssistant />

          {/* Header Floating Navigation Capsule */}
          <Navbar />

          {/* Main content aggregator */}
          <main className="relative">
            <Hero />
            <About />
            <Metrics />
            <Skills />
            <Journey />
            <Projects />
            <Technologies />
            <Timeline />
            <Achievements />
            <Contact />
          </main>

          {/* Footer copyright and tech stack references */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}
