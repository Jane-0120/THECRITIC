"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Placeholder from "./Placeholder";
import BorderGlow from "./BorderGlow";
import { characters } from "@/data/characters";

export default function CharacterShowcase() {
  const [hovered, setHovered] = useState<number>(0);
  const active = characters[hovered];
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Sweep a soft glow once around VERA's card the first time the section shows.
  useEffect(() => {
    const el = rootRef.current;
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
    <div ref={rootRef} className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:items-center">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {characters.map((c, i) => (
          <Link
            key={c.slug}
            href={`/characters/${c.slug}`}
            data-cursor="hover"
            onMouseEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
            className="group relative block aspect-[3/4] overflow-hidden bg-paper-dim"
          >
            {c.portrait.src ? (
              <Placeholder
                image={c.portrait}
                fill
                sizes="(min-width: 1024px) 240px, 45vw"
                className={`transition-opacity duration-500 ${
                  hovered === i ? "opacity-100" : "opacity-40"
                }`}
              />
            ) : (
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
            )}
          </Link>
        ))}
      </div>

      <div className="min-h-[220px]">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-ink-faint">
            {active.role}
          </p>
          <h3 className="font-display mt-2 text-xl uppercase leading-none tracking-tight text-ink sm:text-2xl">
            {active.name}
          </h3>
          <p className="mt-5 max-w-md text-[14px] leading-relaxed text-ink-soft">
            {active.oneLiner}
          </p>
          <dl className="mt-8 grid max-w-md gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                Wants
              </dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-ink-soft">
                {active.desire}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                Against
              </dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-ink-soft">
                {active.conflict}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
