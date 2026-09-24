import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import Reveal from "@/components/Reveal";
import { characters, getCharacter } from "@/data/characters";
import { getScene } from "@/data/scenes";
import type { ImageRef, Scene } from "@/data/types";

export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/characters/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const character = getCharacter(slug);
  if (!character) return {};
  return {
    title: character.name,
    description: character.oneLiner,
  };
}

function sceneGallery(scene: Scene): ImageRef[] {
  const raw = [scene.finalStill, scene.thumbnail, ...scene.storyboard.map((p) => p.image)];
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

export default async function CharacterDetailPage(
  props: PageProps<"/characters/[slug]">
) {
  const { slug } = await props.params;
  const character = getCharacter(slug);
  if (!character) notFound();

  const relatedScenes = character.relatedScenes
    .map((s) => getScene(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div>
      <PageHero index="01" eyebrow={character.role} title={character.name} lead={character.oneLiner} />

      <div className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-6">
        {relatedScenes.length > 0 ? (
          <div className="space-y-20">
            {relatedScenes.map((scene, si) => (
              <Reveal key={scene.slug} delay={si * 60}>
                <div className="flex items-baseline justify-between gap-4 border-t border-paper-line pt-6">
                  <h2 className="font-display text-xl uppercase tracking-tight text-ink">
                    {scene.number} · {scene.title}
                  </h2>
                  <Link
                    href={`/scenes/${scene.slug}`}
                    data-cursor="hover"
                    className="text-[12px] uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-ink"
                  >
                    View scene →
                  </Link>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {sceneGallery(scene).map((image) => (
                    <Link
                      key={image.label}
                      href={`/scenes/${scene.slug}`}
                      data-cursor="hover"
                      className="group block overflow-hidden"
                    >
                      <Placeholder
                        image={image}
                        sizes="(min-width: 1024px) 32vw, 45vw"
                        className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </Link>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <p className="max-w-md border-t border-paper-line pt-10 text-[14px] leading-relaxed text-ink-soft">
              {character.name} doesn&rsquo;t appear on camera — only as the interface layered over
              every scene she reads.
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
