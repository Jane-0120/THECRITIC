import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import Reveal from "@/components/Reveal";
import { getCharacter } from "@/data/characters";
import { scenes, sceneGallery } from "@/data/scenes";
import type { Scene } from "@/data/types";

export const metadata: Metadata = {
  title: "Scenes & Spaces",
  description: "Three rooms and the street between them — the spaces behind THE CRITIC.",
};

function SpaceRow({ scene }: { scene: Scene }) {
  const gallery = sceneGallery(scene);
  const characters = scene.relatedCharacterSlugs
    .map((s) => getCharacter(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  // Featured stills link straight to their slot in the viewer.
  const featured = scene.stills.slice(0, 4).map((image) => ({
    image,
    index: gallery.findIndex((g) => g.src === image.src),
  }));

  return (
    <article className="border-t border-paper-line pt-10">
      <div
        className={
          scene.floorPlan
            ? "grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24"
            : "max-w-3xl"
        }
      >
        {scene.floorPlan && (
          <Link href={`/scenes/${scene.slug}`} data-cursor="hover" className="group block">
            <Placeholder
              image={scene.floorPlan}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </Link>
        )}

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-2xl text-ink">
              {scene.number} — {scene.title}
              <span className="ml-3 text-ink-faint">{scene.titleKo}</span>
            </h2>
            <ul className="flex flex-wrap gap-2">
              {characters.slice(0, 1).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/characters/${c.slug}`}
                    data-cursor="hover"
                    className="flex items-center gap-2 rounded-full border border-paper-line py-1 pl-1 pr-4 text-[13px] text-ink transition-colors hover:border-ink"
                  >
                    <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
                      <Placeholder image={c.portrait} fill sizes="28px" />
                    </span>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 max-w-2xl text-balance text-[15px] leading-relaxed text-ink-soft">
            {scene.description}
          </p>
          <Link
            href={`/scenes/${scene.slug}`}
            data-cursor="hover"
            className="group mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
          >
            View space · {gallery.length} images
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {featured.map(({ image, index }) => (
          <li key={image.src}>
            <Link
              href={`/scenes/${scene.slug}#${index}`}
              data-cursor="hover"
              className="group block overflow-hidden"
            >
              <Placeholder
                image={{ ...image, aspect: "7/3" }}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function ScenesPage() {
  return (
    <div>
      <PageHero
        index="02"
        eyebrow="Scenes & Spaces"
        title="Spatial Design"
      />

      <div className="mx-auto max-w-[1600px] space-y-24 px-4 pb-24 sm:px-6">
        {scenes.map((scene, i) => (
          <Reveal key={scene.slug} delay={i * 50}>
            <SpaceRow scene={scene} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
