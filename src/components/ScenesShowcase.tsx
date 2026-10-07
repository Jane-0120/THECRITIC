"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

import { scenes, sceneGallery } from "@/data/scenes";
import type { ImageRef } from "@/data/types";

// The track is laid out in `--u` units (≈1vh on desktop). Each space opens
// with its axonometric plan and caption spanning both rows (a space without a
// plan gets a caption column), followed by its featured stills staggered
// across two rows.
type Card =
  | { kind: "plan"; slug: string; left: number; width: number; image?: ImageRef; heading: string; titleKo: string; description: string }
  | { kind: "still"; slug: string; left: number; width: number; row: number; image: ImageRef; index: number };

const CARD_H = 21;
const ROW_GAP = 8;
// The plan stands about as tall as the two rows of stills beside it.
const PLAN_IMG_H = 52;
const TEXT_W = 52;
const STILL_ASPECT = 21 / 9;
const TOP = "20svh";
const rowTop = (row: number) => `calc(${TOP} + ${row * (CARD_H + ROW_GAP)} * var(--u))`;

const cards: Card[] = [];
let cursor = 12;
for (const scene of scenes) {
  const gallery = sceneGallery(scene);
  const planAspect = scene.floorPlan ? 1672 / 941 : 0;
  const planW = scene.floorPlan ? PLAN_IMG_H * planAspect : TEXT_W;
  cards.push({
    kind: "plan",
    slug: scene.slug,
    left: cursor,
    width: planW,
    image: scene.floorPlan,
    heading: `${scene.number} — ${scene.title}`,
    titleKo: scene.titleKo,
    description: scene.description,
  });
  const rows = [cursor + planW + 8, cursor + planW + 26];
  scene.stills.slice(0, 4).forEach((image, i) => {
    const row = i % 2;
    const width = CARD_H * STILL_ASPECT;
    cards.push({
      kind: "still",
      slug: scene.slug,
      left: rows[row],
      width,
      row,
      image,
      index: gallery.findIndex((g) => g.src === image.src),
    });
    rows[row] += width + 6;
  });
  cursor = Math.max(...rows) + 16;
}
const TRACK_W = cursor;
// How far (as a fraction of card width) the image drifts inside its frame.
const PARALLAX = 0.12;

/**
 * Pinned horizontal gallery: the section is made as tall as the track is
 * wide, and vertical scroll through it slides the track sideways while each
 * image drifts left→right inside its frame for depth.
 *
 * Below `lg` the track would be wider than the screen at any legible size,
 * so phones and portrait tablets get a plain vertical stack instead.
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
      // Hidden (display: none) below `lg` — leave the section collapsed.
      if (section.offsetParent === null) {
        distance = 0;
        section.style.height = "";
        return;
      }
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
    <>
      <StackedSpaces header={header} />
      <div ref={sectionRef} className="relative hidden h-[300svh] lg:block">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pt-24 sm:px-6 sm:pt-28">
            {header}
          </div>

          <div
            ref={trackRef}
            className="absolute inset-y-0 left-0 will-change-transform [--u:min(1svh,0.85vw)]"
            style={{ width: `calc(${TRACK_W} * var(--u))` }}
          >
            {cards.map((card) =>
              card.kind === "plan" ? (
                <Link
                  key={`plan-${card.slug}`}
                  href={`/scenes/${card.slug}`}
                  data-cursor="hover"
                  className="group absolute block"
                  style={{
                    left: `calc(${card.left} * var(--u))`,
                    top: TOP,
                    width: `calc(${card.width} * var(--u))`,
                  }}
                >
                  {card.image && (
                    <div className="relative overflow-hidden" style={{ height: `calc(${PLAN_IMG_H} * var(--u))` }}>
                      <Image
                        src={card.image.src!}
                        alt={card.image.alt}
                        fill
                        sizes="(min-width: 1024px) 60vw, 90vw"
                        loading="eager"
                        className="object-contain opacity-85 transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.02] group-hover:opacity-100"
                      />
                    </div>
                  )}
                  {/* The caption may run on under the stills so its description
                      keeps its two set lines. */}
                  <PlanCaption card={card} className={card.image ? "mt-8 w-max" : "w-max"} />
                </Link>
              ) : (
                <Link
                  key={card.image.src}
                  href={`/scenes/${card.slug}#${card.index}`}
                  data-cursor="hover"
                  data-card
                  className="group absolute block"
                  style={{
                    left: `calc(${card.left} * var(--u))`,
                    top: rowTop(card.row),
                    width: `calc(${card.width} * var(--u))`,
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
                        src={card.image.src!}
                        alt={card.image.alt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 70vw"
                        loading="eager"
                        className="object-cover opacity-80 transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
                      />
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/** Phone / portrait-tablet layout: each space as plan, caption, then a 2×2 of stills. */
function StackedSpaces({ header }: { header: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-24 sm:px-6 sm:py-28 lg:hidden">
      {header}
      <div className="mt-12 space-y-20">
        {scenes.map((scene) => {
          const gallery = sceneGallery(scene);
          return (
            <article key={scene.slug}>
              {scene.floorPlan && (
                <Link href={`/scenes/${scene.slug}`} data-cursor="hover" className="block">
                  <div className="relative w-full" style={{ aspectRatio: scene.floorPlan.aspect }}>
                    <Image
                      src={scene.floorPlan.src!}
                      alt={scene.floorPlan.alt}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  </div>
                </Link>
              )}
              <p className="mt-6 text-[17px] uppercase tracking-[0.06em] text-ink">
                {scene.number} — {scene.title}
                <span className="ml-3 normal-case tracking-normal text-ink-faint">{scene.titleKo}</span>
              </p>
              <p className="mt-3 text-pretty text-[14px] leading-relaxed text-ink-soft">
                {scene.description}
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
                {scene.stills.slice(0, 4).map((image) => (
                  <li key={image.src}>
                    <Link
                      href={`/scenes/${scene.slug}#${gallery.findIndex((g) => g.src === image.src)}`}
                      data-cursor="hover"
                      className="relative block overflow-hidden bg-paper-dim"
                      style={{ aspectRatio: "21/9" }}
                    >
                      <Image src={image.src!} alt={image.alt} fill sizes="50vw" className="object-cover" />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function PlanCaption({
  card,
  className = "",
}: {
  card: Extract<Card, { kind: "plan" }>;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[18px] uppercase tracking-[0.06em] text-ink">
        {card.heading}
        <span className="ml-3 normal-case tracking-normal text-ink-faint">{card.titleKo}</span>
      </p>
      <p className="mt-3 whitespace-pre text-[14px] leading-relaxed text-ink-soft">{card.description}</p>
    </div>
  );
}
