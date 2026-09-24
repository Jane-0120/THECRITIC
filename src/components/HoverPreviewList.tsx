"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import Placeholder from "./Placeholder";
import type { ImageRef } from "@/data/types";

export type HoverPreviewItem = {
  key: string;
  index: string;
  title: string;
  subtitle: string;
  href: string;
  image: ImageRef;
};

export default function HoverPreviewList({ items }: { items: HoverPreviewItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<HoverPreviewItem | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setActive(null)}
      className="relative"
    >
      <ul className="divide-y divide-paper-line border-t border-paper-line">
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              data-cursor="hover"
              onMouseEnter={() => setActive(item)}
              onFocus={() => setActive(item)}
              className="group flex items-baseline justify-between gap-6 py-6 sm:py-9"
            >
              <span className="flex items-baseline gap-5 sm:gap-9">
                <span className="text-[12px] tabular-nums text-ink-faint">
                  {item.index}
                </span>
                <span className="font-display text-2xl uppercase leading-none tracking-tight text-ink transition-colors duration-300 group-hover:text-ink-soft sm:text-4xl lg:text-5xl">
                  {item.title}
                </span>
              </span>
              <span className="hidden shrink-0 text-[12px] uppercase tracking-[0.14em] text-ink-faint transition-colors duration-300 group-hover:text-accent sm:inline">
                {item.subtitle}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className="pointer-events-none absolute z-10 hidden h-[230px] w-[180px] overflow-hidden border border-paper-line transition-[opacity,transform] duration-300 ease-out sm:block"
        style={{
          left: pos.x + 28,
          top: pos.y - 115,
          opacity: active ? 1 : 0,
          transform: `scale(${active ? 1 : 0.92})`,
        }}
      >
        {active && <Placeholder image={active.image} fill sizes="180px" />}
      </div>
    </div>
  );
}
