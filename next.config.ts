import type { NextConfig } from "next";

// Set by the GitHub Pages workflow (e.g. "/repo-name"); empty for local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages.
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    // No image optimisation server on a static host — the loader points at
    // WebP sizes pre-rendered by scripts/optimize-images.mjs.
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    deviceSizes: [640, 1080, 1600, 2560],
    imageSizes: [320],
  },
};

export default nextConfig;
