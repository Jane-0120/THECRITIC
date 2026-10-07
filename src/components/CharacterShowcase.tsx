"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Placeholder from "./Placeholder";
import VeraGlow from "./VeraGlow";
import { characters } from "@/data/characters";

const AUTO_ADVANCE_MS = 4000;

export default function CharacterShowcase() {
  const [hovered, setHovered] = useState<number>(0);
  const active = characters[hovered];

  // Touch screens can't hover, so the spotlight steps through the cast.
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const id = window.setInterval(() => {
      setHovered((i) => (i + 1) % characters.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:items-center">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
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
              <VeraGlow />
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
          {/* One sentence per line from `sm`; phones run them as a paragraph. */}
          <p className="mt-5 max-w-xl text-pretty text-[14px] leading-relaxed text-ink-soft">
            {(active.bio ?? [active.oneLiner]).map((line) => (
              <span key={line} className="sm:block sm:not-first:mt-1">
                {line}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
