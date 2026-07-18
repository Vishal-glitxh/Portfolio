"use client";

import React, { useEffect, useRef, useState } from "react";
import Card from "../ui/Card";
import { Cpu, Award, GraduationCap, Flame } from "lucide-react";

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

function Counter({ target, duration = 1500, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = target;
          const totalSteps = 30;
          const stepTime = duration / totalSteps;
          const increment = (end - start) / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={elementRef} className="font-heading font-extrabold tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function Metrics() {
  const stats = [
    {
      label: "Technologies Mastered",
      icon: Cpu,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/15",
      renderCounter: () => <Counter target={15} suffix="+" />,
      glow: "blue" as const,
    },
    {
      label: "Intelligent AI Projects",
      icon: Award,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/15",
      renderCounter: () => <Counter target={2} />,
      glow: "purple" as const,
    },
    {
      label: "Engineering Graduation",
      icon: GraduationCap,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/15",
      renderCounter: () => <Counter target={2028} />,
      glow: "cyan" as const,
    },
    {
      label: "Passion for Learning",
      icon: Flame,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/15",
      renderCounter: () => (
        <span className="font-heading font-extrabold text-5xl relative top-0.5 inline-block animate-pulse">
          &infin;
        </span>
      ),
      glow: "all" as const,
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden bg-slate-950/10 px-4 md:px-8 border-t border-slate-900/60">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <Card
                key={idx}
                glowColor={stat.glow}
                delay={idx * 0.05}
                className="text-center flex flex-col items-center justify-center p-6 md:p-8"
              >
                {/* Icon wrapper */}
                <div className={`p-3 rounded-2xl mb-4 ${stat.color} border shrink-0`}>
                  <StatIcon className="w-6 h-6" />
                </div>
                
                {/* Metric value */}
                <div className="text-3xl md:text-5xl font-extrabold text-white mb-2">
                  {stat.renderCounter()}
                </div>

                {/* Metric label */}
                <p className="text-slate-400 text-xs md:text-sm font-semibold font-body tracking-wide uppercase">
                  {stat.label}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
