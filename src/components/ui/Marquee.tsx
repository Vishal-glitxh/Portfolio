import React from "react";

interface MarqueeProps {
  items: React.ReactNode[];
  reverse?: boolean;
  className?: string;
}

export default function Marquee({ items, reverse = false, className = "" }: MarqueeProps) {
  // Duplicate items array multiple times to ensure seamless infinite looping on wider displays
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`w-full overflow-hidden relative flex py-4 select-none pointer-events-none ${className}`}>
      {/* Left and Right Fade Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-28 bg-gradient-to-r from-[#0B1120] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-28 bg-gradient-to-l from-[#0B1120] to-transparent z-10" />

      <div
        className={`flex shrink-0 items-center gap-12 md:gap-20 min-w-full ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
