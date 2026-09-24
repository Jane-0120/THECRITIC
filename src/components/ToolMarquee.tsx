"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export type ToolItem = { name: string; logo?: string };

export default function ToolMarquee({ items }: { items: ToolItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const baseSpeedRef = useRef(0.35);
  const boostRef = useRef(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = Math.abs(y - lastScrollYRef.current);
      lastScrollYRef.current = y;
      boostRef.current = Math.min(boostRef.current + delta * 0.04, 6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const tick = () => {
      const track = trackRef.current;
      if (track) {
        boostRef.current *= 0.94;
        const speed = baseSpeedRef.current + boostRef.current;
        offsetRef.current -= speed;
        const half = track.scrollWidth / 2;
        if (half > 0 && Math.abs(offsetRef.current) >= half) {
          offsetRef.current += half;
        }
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const loopItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-4">
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {loopItems.map((item, i) => (
          <span key={`${item.name}-${i}`} className="flex shrink-0 items-center gap-2.5 px-9">
            {item.logo && (
              <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-[6px] bg-paper-dim">
                <Image src={item.logo} alt="" fill sizes="20px" className="object-cover" />
              </span>
            )}
            <span className="text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              {item.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
