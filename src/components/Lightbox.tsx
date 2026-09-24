"use client";

import { useState } from "react";
import Placeholder from "./Placeholder";
import type { ImageRef } from "@/data/types";

export default function Lightbox({ image, caption }: { image: ImageRef; caption?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group block w-full text-left">
        <Placeholder
          image={image}
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="transition-opacity group-hover:opacity-90"
        />
        {caption && <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{caption}</p>}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-6"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-6 top-6 text-[13px] uppercase tracking-[0.14em] text-white/80 hover:text-white"
          >
            Close ✕
          </button>
          <div className="relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Placeholder image={image} className="max-h-[85vh]" />
            {caption && <p className="mt-3 text-center text-[13px] text-white/70">{caption}</p>}
          </div>
        </div>
      )}
    </>
  );
}
