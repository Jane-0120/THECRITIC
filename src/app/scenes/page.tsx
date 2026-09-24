import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import Reveal from "@/components/Reveal";
import { scenes } from "@/data/scenes";

export const metadata: Metadata = {
  title: "Scenes & Spaces",
  description: "Five rooms VERA reads — the spaces behind THE CRITIC.",
};

export default function ScenesPage() {
  return (
    <div>
      <PageHero
        index="02"
        eyebrow="Scenes & Spaces"
        title="Five Rooms"
        lead="From the final frame back to the space, the light, and the material behind it."
      />

      <ul className="mx-auto grid max-w-[1400px] grid-cols-1 gap-x-8 gap-y-14 px-4 pb-24 sm:px-6 lg:grid-cols-2">
        {scenes.map((scene, i) => (
          <li key={scene.slug}>
            <Reveal delay={i * 50}>
              <Link href={`/scenes/${scene.slug}`} className="group block">
                <Placeholder image={scene.thumbnail} sizes="(min-width: 1024px) 50vw, 100vw" />
                <div className="mt-4 flex items-baseline gap-4">
                  <span className="font-display text-sm text-ink-faint">
                    {scene.number}
                  </span>
                  <div>
                    <p className="font-display text-xl text-ink group-hover:text-accent">
                      {scene.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
                      {scene.directorIntent}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
