"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";
import type { MakingVersion } from "@/data/types";
import { cn } from "@/lib/utils";

export default function VersionSwitcher({ versions }: { versions: MakingVersion[] }) {
  const [index, setIndex] = useState(0);
  const current = versions[index];

  return (
    <div>
      <div className="flex gap-1" role="tablist" aria-label="버전 전환">
        {versions.map((v, i) => (
          <button
            key={v.label}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-t-sm border-b-2 px-3 py-1.5 text-[12px] transition-colors",
              i === index
                ? "border-accent text-ink"
                : "border-transparent text-ink-soft hover:text-ink"
            )}
          >
            {v.label}
          </button>
        ))}
      </div>
      <Lightbox image={current.image} caption={current.note} />

      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        {versions.map((v, i) => (
          <div key={v.label} className={cn("border-l-2 pl-3", i === index ? "border-accent" : "border-paper-line")}>
            <dt className="text-[12px] text-ink">{v.label}</dt>
            <dd className="mt-1 text-[12px] leading-relaxed text-ink-soft">{v.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
