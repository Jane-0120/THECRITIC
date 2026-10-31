import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import Reveal from "@/components/Reveal";
import { sequences } from "@/data/sequences";
import type { Sequence } from "@/data/types";

export const metadata: Metadata = {
  title: "Sequences",
  description: "THE CRITIC의 여덟 시퀀스 — 아침의 글래스에서 글래스 없이 나선 거리까지.",
};

const lead =
  "영화는 여덟 개의 시퀀스로 구성된다.\n글래스를 쓰는 아침에서 글래스 없이 나서는 거리까지, 판단을 기술에 넘겼던 조나가 다시 자신의 말을 찾아가는 과정을 따라간다.";

function SequenceRow({ sequence }: { sequence: Sequence }) {
  return (
    <article className="grid gap-8 border-t border-paper-line pt-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
      <div>
        <p className="text-[12px] uppercase tracking-[0.18em] text-ink-faint">SQ {sequence.number}</p>
        <h2 className="font-display mt-2 text-2xl text-ink">
          <Link href={`/sequences/${sequence.slug}`} data-cursor="hover" className="transition-colors hover:text-ink-soft">
            {sequence.title}
          </Link>
        </h2>
        <p className="mt-5 text-pretty text-[15px] leading-relaxed text-ink-soft">{sequence.description}</p>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {sequence.stills.slice(0, 6).map((image, i) => (
          <li key={image.src}>
            <Link
              href={`/sequences/${sequence.slug}#${i}`}
              data-cursor="hover"
              className="group block overflow-hidden"
            >
              <Placeholder
                image={{ ...image, aspect: "21/9" }}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw"
                className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function SequencesPage() {
  return (
    <div>
      <PageHero index="02" eyebrow="Sequences" title="Eight Sequences">
        <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-ink-soft lg:whitespace-pre">
          {lead}
        </p>
      </PageHero>

      <div className="mx-auto max-w-[1600px] space-y-20 px-4 pb-24 sm:px-6">
        {sequences.map((sequence, i) => (
          <Reveal key={sequence.slug} delay={i * 40}>
            <SequenceRow sequence={sequence} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
