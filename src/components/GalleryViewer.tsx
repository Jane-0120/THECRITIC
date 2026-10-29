"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import Placeholder from "./Placeholder";
import { getCharacter } from "@/data/characters";
import { site } from "@/data/site";
import type { ImageRef } from "@/data/types";

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

export type ViewerLink = { href: string; title: string };

export type ViewerItem = {
  number: string;
  title: string;
  titleKo?: string;
  description: string;
  relatedCharacterSlugs: string[];
};

/** Labels that differ between the space and sequence viewers. */
export type ViewerSection = {
  /** e.g. "Scenes & Spaces" */
  name: string;
  /** e.g. "space" — used in the details button and arrow labels */
  unit: string;
  back: ViewerLink;
};

function StepArrow({ href, label, side }: { href: string; label: string; side: "left" | "right" }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`absolute top-1/2 flex h-12 w-8 -translate-y-1/2 items-center justify-center text-stage-text-soft active:text-stage-text sm:hidden ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      <svg aria-hidden viewBox="0 0 12 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-3">
        <path d={side === "left" ? "M10 2 2 12l8 10" : "M2 2l8 10-8 10"} />
      </svg>
    </Link>
  );
}

/**
 * Full-screen image viewer for one space or one sequence: the active image,
 * a thumbnail strip, prev/next between siblings, and a details sheet.
 */
export default function GalleryViewer({
  item,
  gallery,
  section,
  prev,
  next,
  specs = [],
  links,
}: {
  item: ViewerItem;
  gallery: ImageRef[];
  section: ViewerSection;
  prev: ViewerLink;
  next: ViewerLink;
  /** Label/value rows shown in the details sheet, e.g. material and light. */
  specs?: { label: string; value: string }[];
  /** Cross-links shown in the details sheet, e.g. this space's sequences. */
  links?: { heading: string; items: ViewerLink[] };
}) {
  // Cards elsewhere link straight to an image with `#<index>`; a thumbnail
  // click overrides it.
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => "");
  const hashIndex = Number(hash.slice(1));
  const [picked, setActiveIndex] = useState<number | null>(null);
  const activeIndex =
    picked ?? (Number.isInteger(hashIndex) && hashIndex > 0 && hashIndex < gallery.length ? hashIndex : 0);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const characters = item.relatedCharacterSlugs
    .map((s) => getCharacter(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const unitTitle = section.unit.charAt(0).toUpperCase() + section.unit.slice(1);

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-stage text-stage-text">
      <header className="flex items-center justify-between px-5 pt-6 sm:px-10">
        <Link
          href="/"
          data-cursor="hover"
          className="font-display text-sm uppercase tracking-[0.2em] text-stage-text"
        >
          {site.shortName}
        </Link>
        <Link
          href={section.back.href}
          data-cursor="hover"
          className="text-[12px] uppercase tracking-[0.14em] text-stage-text-soft transition-colors hover:text-stage-text"
        >
          ← {section.back.title}
        </Link>
      </header>

      {/* Phones: the title sits on top; desktop keeps it in the details. */}
      <p className="mt-6 px-5 text-center text-[13px] uppercase tracking-[0.14em] text-stage-text sm:hidden">
        {item.number} — {item.title}
      </p>

      <div className="relative flex-1 px-9 py-6 sm:px-10">
        <div className="relative mx-auto h-full max-w-[1600px]">
          {gallery[activeIndex]?.src ? (
            <Image
              key={gallery[activeIndex].src}
              src={gallery[activeIndex].src}
              alt={gallery[activeIndex].alt}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-stage-text-soft">
              <span className="text-[12px] tracking-[0.08em]">{gallery[activeIndex]?.label}</span>
            </div>
          )}
        </div>

        {/* Phones: step between siblings with arrows beside the image. */}
        <StepArrow href={prev.href} label={`Previous ${section.unit}: ${prev.title}`} side="left" />
        <StepArrow href={next.href} label={`Next ${section.unit}: ${next.title}`} side="right" />
      </div>

      <div className="px-5 pb-6 sm:px-10">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => setDetailsOpen(true)}
            data-cursor="hover"
            className="text-[12px] uppercase tracking-[0.14em] text-stage-text-soft underline decoration-stage-line underline-offset-4 transition-colors hover:text-stage-text"
          >
            {unitTitle} details
          </button>

          <div className="hidden items-center gap-6 text-[12px] uppercase tracking-[0.14em] text-stage-text-soft sm:flex">
            <Link href={prev.href} data-cursor="hover" className="transition-colors hover:text-stage-text">
              ← {prev.title}
            </Link>
            <Link href={next.href} data-cursor="hover" className="transition-colors hover:text-stage-text">
              {next.title} →
            </Link>
          </div>
        </div>

        {gallery.length > 1 && (
          <div className="mx-auto mt-5 flex max-w-[1600px] gap-2 overflow-x-auto">
            {gallery.map((image, i) => (
              <button
                key={image.src ?? image.label}
                type="button"
                onClick={() => setActiveIndex(i)}
                data-cursor="hover"
                aria-label={`Show image ${i + 1}`}
                className={`relative h-16 w-24 shrink-0 overflow-hidden border transition-colors ${
                  i === activeIndex ? "border-accent" : "border-stage-line"
                }`}
              >
                <Placeholder image={image} fill sizes="96px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {detailsOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-md sm:items-center">
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto border-t border-stage-line bg-stage px-6 py-10 sm:border sm:px-10">
            <p className="text-[11px] uppercase tracking-[0.16em] text-accent">
              {item.number} — {section.name}
            </p>
            <h2 className="font-display mt-2 text-3xl uppercase tracking-tight text-stage-text">
              {item.title}
              {item.titleKo && (
                <span className="ml-3 text-xl normal-case text-stage-text-soft">{item.titleKo}</span>
              )}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-[14px] leading-relaxed text-stage-text-soft">
              {item.description}
            </p>

            {specs.length > 0 && (
              <dl className="mt-8 space-y-2 border-t border-stage-line pt-6 text-[13px]">
                {specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[7rem_1fr] gap-4">
                    <dt className="text-[11px] uppercase tracking-[0.12em] text-accent">{spec.label}</dt>
                    <dd className="leading-relaxed text-stage-text-soft">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {characters.length > 0 && (
              <div className="mt-8 border-t border-stage-line pt-6">
                <p className="text-[11px] uppercase tracking-[0.12em] text-accent">In this {section.unit}</p>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {characters.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/characters/${c.slug}`}
                        data-cursor="hover"
                        className="flex items-center gap-2 rounded-full border border-stage-line py-1 pl-1 pr-4 text-[13px] text-stage-text transition-colors hover:border-accent"
                      >
                        <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
                          <Placeholder image={c.portrait} fill />
                        </span>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {links && links.items.length > 0 && (
              <div className="mt-8 border-t border-stage-line pt-6">
                <p className="text-[11px] uppercase tracking-[0.12em] text-accent">{links.heading}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {links.items.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        data-cursor="hover"
                        className="block border border-stage-line px-3 py-1.5 text-[12px] uppercase tracking-[0.08em] text-stage-text transition-colors hover:border-accent"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="button"
              onClick={() => setDetailsOpen(false)}
              data-cursor="hover"
              className="mt-10 w-full border border-stage-line py-3 text-[12px] uppercase tracking-[0.16em] text-stage-text transition-colors hover:bg-stage-text hover:text-stage"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
