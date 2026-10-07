import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import Reveal from "@/components/Reveal";
import VeraGlow from "@/components/VeraGlow";
import { characters } from "@/data/characters";
import { scenes, sceneGallery } from "@/data/scenes";

export const metadata: Metadata = {
  title: "Scene Gallery",
  description: "THE CRITIC의 인물들과, 그들이 등장하는 장면을 한곳에 모은 갤러리.",
};

// Every scene still, in space order, each linking to its slot in the viewer.
const gallery = scenes.flatMap((scene) => {
  const viewer = sceneGallery(scene);
  return scene.stills.map((image) => ({
    image,
    href: `/scenes/${scene.slug}#${viewer.findIndex((g) => g.src === image.src)}`,
  }));
});

export default function CharactersPage() {
  return (
    <div>
      <PageHero
        index="01"
        eyebrow="Characters"
        title="Scene Gallery"
      />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
        <ul className="grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {characters.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 60}>
                <Link href={`/characters/${c.slug}`} data-cursor="hover" className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-paper-dim">
                    {c.portrait.src ? (
                      <Placeholder
                        image={c.portrait}
                        fill
                        sizes="(min-width: 640px) 220px, 50vw"
                        className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <VeraGlow />
                    )}
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-ink-faint">{c.role}</p>
                  <p className="font-display mt-1 text-lg text-ink">
                    {c.name}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <ul className="mx-auto mt-20 grid max-w-[1600px] grid-cols-1 gap-3 px-4 pb-24 sm:grid-cols-2 sm:gap-4 sm:px-6 lg:grid-cols-3">
        {gallery.map(({ image, href }, i) => (
          <li key={image.src}>
            <Reveal delay={(i % 3) * 60}>
              <Link href={href} data-cursor="hover" className="group block overflow-hidden">
                <Placeholder
                  image={{ ...image, aspect: "21/9" }}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
