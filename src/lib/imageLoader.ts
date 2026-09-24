const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Serves the original file from /public under the site's base path. `width`
// is appended only so each srcset entry stays distinct; static hosts ignore it.
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const url = src.startsWith("/") ? `${basePath}${src}` : src;
  return `${url}?w=${width}`;
}
