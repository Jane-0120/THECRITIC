import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import Reveal from "@/components/Reveal";
import { characters } from "@/data/characters";

export const metadata: Metadata = {
  title: "Characters",
  description: "The critic, the chef, and the intelligence reading them both.",
};

export default function CharactersPage() {
  return (
    <div>
      <PageHero
        index="01"
        eyebrow="Characters"
        title="Who's at the Table"
        lead="Role, desire, conflict — and the design criteria behind each character's look."
      />

      <ul className="mx-auto grid max-w-[1400px] grid-cols-1 gap-x-8 gap-y-14 px-4 pb-24 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {characters.map((c, i) => (
          <li key={c.slug}>
            <Reveal delay={i * 60}>
              <Link href={`/characters/${c.slug}`} className="group block">
                <Placeholder image={c.portrait} sizes="(min-width: 1024px) 33vw, 50vw" />
                <div className="mt-4">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-accent">
                    {c.role}
                  </p>
                  <p className="font-display mt-1 text-xl text-ink group-hover:text-accent">
                    {c.name}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                    {c.oneLiner}
                  </p>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
