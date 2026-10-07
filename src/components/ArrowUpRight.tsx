import { cn } from "@/lib/utils";

/**
 * Thin "↗" for external links. Drawn as SVG because iOS swaps the ↗
 * character for its colour emoji.
 */
export default function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={cn("h-[0.8em] w-[0.8em] shrink-0", className)}
    >
      <path d="M3 9 9 3M4 3h5v5" />
    </svg>
  );
}
