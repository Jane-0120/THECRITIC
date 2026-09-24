"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { chapters, site } from "@/data/site";

const IMMERSIVE_ROUTE = /^\/scenes\/[^/]+$/;

export default function Footer() {
  const pathname = usePathname();
  if (IMMERSIVE_ROUTE.test(pathname)) return null;

  return (
    <footer className="relative border-t border-paper-line bg-paper">
      <span aria-hidden className="corner-cross" style={{ top: -4, left: -4 }} />
      <span aria-hidden className="corner-cross" style={{ top: -4, right: -4 }} />
      <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-lg uppercase tracking-[0.1em] text-ink">
              {site.name}
            </p>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-ink-soft">
              {site.description}
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              Directed by {site.director}
            </p>
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-2 text-[12px] uppercase tracking-[0.06em] sm:grid-cols-1">
            {chapters.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                data-cursor="hover"
                className="flex items-baseline gap-2 text-ink-soft transition-colors hover:text-ink"
              >
                <span className="text-ink-faint">{`//${c.index}`}</span>
                {c.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-12 text-[12px] text-ink-faint">
          [ © {new Date().getFullYear()} {site.shortName} ]
        </p>
      </div>
    </footer>
  );
}
