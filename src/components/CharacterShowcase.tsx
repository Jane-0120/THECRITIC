"use client";

import Link from "next/link";
import { useState } from "react";
import Placeholder from "./Placeholder";
import VeraGlow from "./VeraGlow";
import { characters } from "@/data/characters";

export default function CharacterShowcase() {
  const [hovered, setHovered] = useState<number>(0);
  const active = characters[hovered];

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
          <div className="mt-5 max-w-xl space-y-1 text-[14px] leading-relaxed text-ink-soft">
            {(active.bio ?? [active.oneLiner]).map((line) => (
              <p key={line} className="text-pretty">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
