const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Widths pre-rendered by scripts/optimize-images.mjs; keep the two in sync.
export const OPT_WIDTHS = [320, 640, 1080, 1600, 2560];

// Files in /public/images are served as the pre-rendered WebP closest to the
// requested width. Anything else is served as-is under the base path.
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const match = src.match(/^\/images\/(.+)\.(png|jpe?g|webp|avif)$/i);
  if (match) {
    const w = OPT_WIDTHS.find((ow) => ow >= width) ?? OPT_WIDTHS[OPT_WIDTHS.length - 1];
    return `${basePath}/img-opt/${match[1]}-${w}.webp`;
  }
  const url = src.startsWith("/") ? `${basePath}${src}` : src;
  return `${url}?w=${width}`;
}
