import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GalleryViewer from "@/components/GalleryViewer";
import { scenes, getScene, sceneGallery } from "@/data/scenes";
import { sequencesInSpace } from "@/data/sequences";

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
    description: scene.description.replace(/\n/g, " "),
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

  return (
    <GalleryViewer
      key={scene.slug}
      item={{ ...scene, description: scene.detail }}
      gallery={sceneGallery(scene)}
      section={{ name: "Scenes & Spaces", unit: "space", back: { href: "/#scenes", title: "Spaces" } }}
      prev={{ href: `/scenes/${prev.slug}`, title: prev.title }}
      next={{ href: `/scenes/${next.slug}`, title: next.title }}
      specs={[
        { label: "Material", value: scene.material },
        { label: "Light", value: scene.light },
      ]}
      links={{
        heading: "Sequences",
        items: sequencesInSpace(scene.slug).map((q) => ({
          href: `/sequences/${q.slug}`,
          title: `SQ ${q.number} — ${q.title}`,
        })),
      }}
    />
  );
}
