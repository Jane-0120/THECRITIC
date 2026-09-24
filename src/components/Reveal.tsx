"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Reveal({
  children,
  className,
  delay = 0,
  duration,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Override the default 1.1s fade, in ms. */
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined,
        transitionDuration: duration ? `${duration}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
