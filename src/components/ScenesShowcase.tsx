"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

// Ten distinct places from the film, each linking to the scene it belongs to.
const places = [
  { slug: "nula", name: "NULA Storefront", src: "/images/scene-nula-exterior.png", alt: "NULA restaurant storefront at dusk" },
  { slug: "nula", name: "The Press Wall", src: "/images/scene-nula-frames.png", alt: "Framed photographs and Jonah's old column on the wall of NULA" },
  { slug: "nula", name: "NULA Kitchen", src: "/images/place-nula-kitchen.png", alt: "Marco in NULA's kitchen during service" },
  { slug: "morning", name: "The White Apartment", src: "/images/scene-morning-room.png", alt: "Jonah's minimal white apartment at dawn" },
  { slug: "morning", name: "Morning Counter", src: "/images/scene-morning-dim.png", alt: "The AETER glasses waiting on the apartment counter" },
  { slug: "signal", name: "The Night Pedestal", src: "/images/scene-signal-night.png", alt: "AETER glasses on a pedestal with a lit ring interface" },
  { slug: "tasting", name: "The Dining Hall", src: "/images/place-dining-hall.png", alt: "Marco carrying a dish across NULA's columned dining hall" },
  { slug: "tasting", name: "The Corner Table", src: "/images/place-corner-table.png", alt: "Jonah alone at a round table, seen from the kitchen pass" },
  { slug: "three-stars", name: "AETER Three-Star", src: "/images/scene-aeter-restaurant.png", alt: "An AETER-rated restaurant storefront at night" },
  { slug: "three-stars", name: "The Billboard", src: "/images/scene-aeter-billboard.png", alt: "A VERA campaign billboard seen through a car window" },
];

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
                key={place.src}
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
                  <div
                      data-parallax
                      className="absolute inset-y-0 will-change-transform"
                      style={{ left: `-${PARALLAX * 100}%`, right: `-${PARALLAX * 100}%` }}
                    >
                      <Image
                        src={place.src}
                        alt={place.alt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 70vw"
                        loading="eager"
                        className="object-cover opacity-80 transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
                      />
                  </div>
                </div>
                <p className="mt-3 text-[12px] uppercase tracking-[0.08em] text-ink-soft transition-colors group-hover:text-ink">
                  {place.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
