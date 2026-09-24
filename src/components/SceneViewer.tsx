"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Placeholder from "./Placeholder";
import { getCharacter } from "@/data/characters";
import { site } from "@/data/site";
import type { ImageRef, Scene } from "@/data/types";

function buildGallery(scene: Scene): ImageRef[] {
  const raw = [
    scene.finalStill,
    scene.thumbnail,
    ...scene.storyboard.map((p) => p.image),
    scene.compare.before,
    scene.compare.after,
  ];
  const seen = new Set<string>();
  const gallery: ImageRef[] = [];
  for (const image of raw) {
    const key = image.src ?? image.label;
    if (seen.has(key)) continue;
    seen.add(key);
    gallery.push(image);
  }
  return gallery;
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
  const gallery = useMemo(() => buildGallery(scene), [scene]);
  const [activeIndex, setActiveIndex] = useState(0);
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
          ← Scenes
        </Link>
      </header>

      <div className="relative flex-1 px-5 py-6 sm:px-10">
        <div className="relative mx-auto h-full max-w-[1600px]">
          {gallery[activeIndex]?.src ? (
            <Image
              key={gallery[activeIndex].label}
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
      </div>

      <div className="px-5 pb-6 sm:px-10">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => setDetailsOpen(true)}
            data-cursor="hover"
            className="text-[12px] uppercase tracking-[0.14em] text-stage-text-soft underline decoration-stage-line underline-offset-4 transition-colors hover:text-stage-text"
          >
            Project details
          </button>

          <div className="flex items-center gap-6 text-[12px] uppercase tracking-[0.14em] text-stage-text-soft">
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
                key={image.label}
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
            </h2>
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-stage-text-soft">
              {scene.directorIntent}
            </p>

            <dl className="mt-8 grid gap-6 border-t border-stage-line pt-6 sm:grid-cols-3">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.12em] text-accent">Lighting</dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-stage-text-soft">{scene.space.lighting}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.12em] text-accent">Color</dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-stage-text-soft">{scene.space.color}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.12em] text-accent">Material</dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-stage-text-soft">{scene.space.material}</dd>
              </div>
            </dl>

            {characters.length > 0 && (
              <div className="mt-8 border-t border-stage-line pt-6">
                <p className="text-[11px] uppercase tracking-[0.12em] text-accent">In this scene</p>
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
