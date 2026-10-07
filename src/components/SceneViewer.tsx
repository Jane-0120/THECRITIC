"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import Placeholder from "./Placeholder";
import { getCharacter } from "@/data/characters";
import { site } from "@/data/site";
import { sceneGallery } from "@/data/scenes";
import type { Scene } from "@/data/types";

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function SpaceArrow({ href, label, side }: { href: string; label: string; side: "left" | "right" }) {
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

export default function SceneViewer({
  scene,
  prev,
  next,
}: {
  scene: Scene;
  prev: Scene;
  next: Scene;
}) {
  const gallery = useMemo(() => sceneGallery(scene), [scene]);
  // Cards elsewhere link straight to an image with `#<index>`; a thumbnail
  // click overrides it.
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => "");
  const hashIndex = Number(hash.slice(1));
  const [picked, setActiveIndex] = useState<number | null>(null);
  const activeIndex =
    picked ?? (Number.isInteger(hashIndex) && hashIndex > 0 && hashIndex < gallery.length ? hashIndex : 0);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const characters = scene.relatedCharacterSlugs
    .map((s) => getCharacter(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

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
          href="/#scenes"
          data-cursor="hover"
          className="text-[12px] uppercase tracking-[0.14em] text-stage-text-soft transition-colors hover:text-stage-text"
        >
          ← Spaces
        </Link>
      </header>

      {/* Phones: the space's name sits on top; desktop keeps it in the details. */}
      <p className="mt-6 px-5 text-center text-[13px] uppercase tracking-[0.14em] text-stage-text sm:hidden">
        {scene.number} — {scene.title}
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

        {/* Phones: step between spaces with arrows beside the image. */}
        <SpaceArrow href={`/scenes/${prev.slug}`} label={`Previous space: ${prev.title}`} side="left" />
        <SpaceArrow href={`/scenes/${next.slug}`} label={`Next space: ${next.title}`} side="right" />
      </div>

      <div className="px-5 pb-6 sm:px-10">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => setDetailsOpen(true)}
            data-cursor="hover"
            className="text-[12px] uppercase tracking-[0.14em] text-stage-text-soft underline decoration-stage-line underline-offset-4 transition-colors hover:text-stage-text"
          >
            Space details
          </button>

          <div className="hidden items-center gap-6 text-[12px] uppercase tracking-[0.14em] text-stage-text-soft sm:flex">
            <Link href={`/scenes/${prev.slug}`} data-cursor="hover" className="transition-colors hover:text-stage-text">
              ← {prev.title}
            </Link>
            <Link href={`/scenes/${next.slug}`} data-cursor="hover" className="transition-colors hover:text-stage-text">
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
              {scene.number} — Scenes &amp; Spaces
            </p>
            <h2 className="font-display mt-2 text-3xl uppercase tracking-tight text-stage-text">
              {scene.title}
              <span className="ml-3 text-xl normal-case text-stage-text-soft">{scene.titleKo}</span>
            </h2>
            <p className="mt-4 max-w-xl text-balance text-[14px] leading-relaxed text-stage-text-soft">
              {scene.description}
            </p>

            {characters.length > 0 && (
              <div className="mt-8 border-t border-stage-line pt-6">
                <p className="text-[11px] uppercase tracking-[0.12em] text-accent">In this space</p>
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
