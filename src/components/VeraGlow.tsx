"use client";

import { useEffect, useRef, useState } from "react";
import BorderGlow from "./BorderGlow";

/**
 * VERA has no portrait — her card is a dark panel whose edge glows toward
 * the pointer. The glow sweeps around once the first time the card shows.
 */
export default function VeraGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <BorderGlow
        className="h-full w-full"
        backgroundColor="#060606"
        glowColor="0 0 100"
        colors={["#ffffff", "#cfcfcf", "#8a8a8a"]}
        borderRadius={0}
        glowRadius={26}
        edgeSensitivity={30}
        fillOpacity={0.35}
        border={false}
        animated={inView}
        sweepPeak={54}
      >
        <div className="h-full w-full" />
      </BorderGlow>
    </div>
  );
}
