"use client";

import { useEffect, useRef, useState } from "react";
import SplitFlapText from "./SplitFlapText";

export default function SectionLabel({ label }: { label: string }) {
  const upper = label.toUpperCase();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="inline-block">
      {visible ? (
        <SplitFlapText
          words={[" ".repeat(upper.length), upper]}
          loop={false}
          cycleDelay={200}
          flipDuration={0.12}
          stagger={0.06}
          flipsPerChar={12}
          charset="alpha"
          tileColor="#111111"
          textColor="#f5f5f2"
          tileRadius={3}
          gap={2}
          fontSize={13}
          padTo={upper.length}
        />
      ) : (
        <span className="text-[12px] uppercase tracking-[0.2em] text-transparent">{upper}</span>
      )}
    </div>
  );
}
