import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GalleryViewer from "@/components/GalleryViewer";
import { getScene } from "@/data/scenes";
import { sequences, getSequence } from "@/data/sequences";

export function generateStaticParams() {
  return sequences.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata(
  props: PageProps<"/sequences/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const sequence = getSequence(slug);
  if (!sequence) return {};
  return {
    title: `SQ ${sequence.number} ${sequence.title} · Sequences`,
    description: sequence.description,
  };
}

export default async function SequenceDetailPage(
  props: PageProps<"/sequences/[slug]">
) {
  const { slug } = await props.params;
  const sequence = getSequence(slug);
  if (!sequence) notFound();

  const index = sequences.findIndex((q) => q.slug === slug);
  const prev = sequences[(index - 1 + sequences.length) % sequences.length];
  const next = sequences[(index + 1) % sequences.length];
  const spaces = sequence.spaceSlugs
    .map((s) => getScene(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <GalleryViewer
      key={sequence.slug}
      item={sequence}
      gallery={sequence.stills}
      section={{ name: "Sequences", unit: "sequence", back: { href: "/#sequences", title: "Sequences" } }}
      prev={{ href: `/sequences/${prev.slug}`, title: `SQ ${prev.number}` }}
      next={{ href: `/sequences/${next.slug}`, title: `SQ ${next.number}` }}
      links={{
        heading: "Spaces",
        items: spaces.map((s) => ({ href: `/scenes/${s.slug}`, title: `${s.number} — ${s.title}` })),
      }}
    />
  );
}
