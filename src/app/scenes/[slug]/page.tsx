import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SceneViewer from "@/components/SceneViewer";
import { scenes, getScene } from "@/data/scenes";

export function generateStaticParams() {
  return scenes.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/scenes/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const scene = getScene(slug);
  if (!scene) return {};
  return {
    title: `${scene.title} · Scenes & Spaces`,
    description: scene.directorIntent,
  };
}

export default async function SceneDetailPage(
  props: PageProps<"/scenes/[slug]">
) {
  const { slug } = await props.params;
  const scene = getScene(slug);
  if (!scene) notFound();

  const index = scenes.findIndex((s) => s.slug === slug);
  const prev = scenes[(index - 1 + scenes.length) % scenes.length];
  const next = scenes[(index + 1) % scenes.length];

  return <SceneViewer scene={scene} prev={prev} next={next} />;
}
