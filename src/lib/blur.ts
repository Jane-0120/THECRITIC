import previews from "@/data/blur.json";

type Preview = `data:image/${string}`;

// Tiny blurred stand-in from scripts/optimize-images.mjs, shown while the
// real image loads. Falls back to an empty frame for anything not listed.
export function blurFor(src?: string): Preview | "empty" {
  return (src && (previews as Record<string, Preview>)[src]) || "empty";
}
