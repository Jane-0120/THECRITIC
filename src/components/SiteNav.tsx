"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { chapters, site } from "@/data/site";
import { cn } from "@/lib/utils";

const IMMERSIVE_ROUTE = /^\/scenes\/[^/]+\/?$/;

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (IMMERSIVE_ROUTE.test(pathname)) return null;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div
        aria-hidden
        data-intro-fade
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-32 bg-gradient-to-b from-black/70 to-transparent"
      />
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            data-cursor="hover"
            data-intro-rise
            className="font-display text-sm uppercase tracking-[0.2em] text-ink"
          >
            {site.shortName}
          </Link>

          <nav aria-label="Main navigation" className="-mr-3 hidden items-center gap-2 lg:flex">
            {chapters.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                data-cursor="hover"
                data-intro-rise
                className="px-3 py-2 text-[12px] uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-ink"
              >
                {c.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            data-cursor="hover"
            data-intro-rise
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={cn(
                "h-px w-5 bg-ink transition-transform",
                open && "translate-y-[3px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-ink transition-opacity",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-ink transition-transform",
                open && "-translate-y-[3px] -rotate-45"
              )}
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 bg-paper transition-opacity lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex h-full flex-col justify-center gap-1 px-6 pt-16"
        >
          {chapters.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="flex items-baseline gap-4 border-b border-paper-line py-4 font-display text-2xl uppercase tracking-tight text-ink"
            >
              <span className="text-xs text-ink-faint">{`//${c.index}`}</span>
              {c.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
