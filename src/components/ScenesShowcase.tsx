"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { scenes } from "@/data/scenes";

// Two spaces per scene: its thumbnail plus the most distinct other frame.
const places = scenes.flatMap((scene) => {
  const second =
    scene.space.image.src !== scene.thumbnail.src ? scene.space.image : scene.finalStill;
  return [scene.thumbnail, second].map((image) => ({
    slug: scene.slug,
    title: scene.title,
    note: image.label === scene.title ? null : image.label.split(" — ").pop() ?? null,
    image,
  }));
});

// Staggered two-row layout, in `--u` units (≈1vh on desktop). `left` is the
// card's x offset along the track, `aspect` its width/height.
const layout = [
  { left: 12, row: 0, aspect: 2.3 },
  { left: 51, row: 1, aspect: 1.72 },
  { left: 118, row: 0, aspect: 1.18 },
  { left: 137, row: 1, aspect: 1.55 },
  { left: 190, row: 0, aspect: 1.9 },
  { left: 222, row: 1, aspect: 1.2 },
  { left: 282, row: 0, aspect: 1.4 },
  { left: 300, row: 1, aspect: 2.2 },
  { left: 365, row: 0, aspect: 1.6 },
  { left: 395, row: 1, aspect: 1.3 },
];
const CARD_H = 27;
const TRACK_W = Math.max(...layout.map((l) => l.left + l.aspect * CARD_H)) + 12;
const ROW_TOP = ["20svh", "57svh"];
// How far (as a fraction of card width) the image drifts inside its frame.
const PARALLAX = 0.12;

/**
 * Pinned horizontal gallery: the section is made as tall as the track is
 * wide, and vertical scroll through it slides the track sideways while each
 * image drifts left→right inside its frame for depth.
 */
export default function ScenesShowcase({ header }: { header: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
    const imgs = cards.map((c) => c.querySelector<HTMLElement>("[data-parallax]"));
    let distance = 0;
    let current = 0;
    let frame = 0;

    const measure = () => {
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${window.innerHeight + distance}px`;
    };

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const progress = distance ? Math.min(1, Math.max(0, -rect.top / distance)) : 0;
      const target = progress * distance;
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.1) current = target;
      track.style.transform = `translate3d(${-current}px, 0, 0)`;

      const vw = window.innerWidth;
      cards.forEach((card, i) => {
        const img = imgs[i];
        if (!img) return;
        const r = card.getBoundingClientRect();
        const offset = (r.left + r.width / 2 - vw / 2) / vw; // -1 … 1 across the screen
        img.style.transform = `translate3d(${-offset * PARALLAX * r.width}px, 0, 0)`;
      });

      frame = target === current ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      kick();
    };

    measure();
    tick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      section.style.height = "";
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[300svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pt-24 sm:px-6 sm:pt-28">
          {header}
        </div>

        <div
          ref={trackRef}
          className="absolute inset-y-0 left-0 will-change-transform [--u:min(1svh,0.9vw)]"
          style={{ width: `calc(${TRACK_W} * var(--u))` }}
        >
          {places.map((place, i) => {
            const l = layout[i % layout.length];
            return (
              <Link
                key={`${place.slug}-${i}`}
                href={`/scenes/${place.slug}`}
                data-cursor="hover"
                data-card
                className="group absolute block"
                style={{
                  left: `calc(${l.left} * var(--u))`,
                  top: ROW_TOP[l.row],
                  width: `calc(${l.aspect * CARD_H} * var(--u))`,
                }}
              >
                <div
                  className="relative overflow-hidden bg-paper-dim"
                  style={{ height: `calc(${CARD_H} * var(--u))` }}
                >
                  {place.image.src && (
                    <div
                      data-parallax
                      className="absolute inset-y-0 will-change-transform"
                      style={{ left: `-${PARALLAX * 100}%`, right: `-${PARALLAX * 100}%` }}
                    >
                      <Image
                        src={place.image.src}
                        alt={place.image.alt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 70vw"
                        loading="eager"
                        className="object-cover opacity-80 transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-[11px] text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[12px] uppercase tracking-[0.08em] text-ink-soft transition-colors group-hover:text-ink">
                    {place.title}
                  </span>
                  {place.note && (
                    <span className="text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                      {place.note}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
