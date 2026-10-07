import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import Reveal from "@/components/Reveal";
import { characters, getCharacter } from "@/data/characters";
import { getScene, sceneGallery } from "@/data/scenes";

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
      <PageHero index="01" eyebrow={character.role} title={character.name}>
        {/* The same description as the home showcase, run wide so it reads
            as two long lines. */}
        <p className="mt-5 max-w-6xl text-balance text-[15px] leading-relaxed text-ink-soft">
          {(character.bio ?? [character.oneLiner]).join(" ")}
        </p>
      </PageHero>

      <div className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-6">
        {relatedScenes.length > 0 ? (
          <div className="space-y-20">
            {relatedScenes.map((scene, si) => (
              <Reveal key={scene.slug} delay={si * 60}>
                <div className="flex items-baseline justify-between gap-3 border-t border-paper-line pt-6 sm:gap-4">
                  <h2 className="font-display whitespace-nowrap text-[15px] uppercase tracking-tight text-ink sm:text-xl">
                    {scene.number} · {scene.title} <span className="text-ink-faint">{scene.titleKo}</span>
                  </h2>
                  <Link
                    href={`/scenes/${scene.slug}`}
                    data-cursor="hover"
                    className="whitespace-nowrap text-[11px] uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-ink sm:text-[12px]"
                  >
                    View space →
                  </Link>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {sceneGallery(scene).slice(0, 6).map((image) => (
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
              {character.name}은(는) 화면에 직접 등장하지 않는다. 모든 장면 위에 겹쳐진
              인터페이스로만 존재한다.
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
