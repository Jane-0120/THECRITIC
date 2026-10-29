"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// The full film, cut into HLS segments under /public/film so no single file
// passes GitHub's 100MB limit. The master playlist offers 1080p and 720p and
// the player switches between them with the connection.
const FILM_SRC = `${basePath}/film/master.m3u8`;
const FILM_POSTER = `${basePath}/film/poster.jpg`;
const OPEN_EVENT = "film:open";

/** Opens the full-film player from anywhere on the page. */
export function openFilm() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/** A link that opens the player in place; `/#film` also works as a URL. */
export function FilmLink({
  className,
  children,
  ...rest
}: {
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
  "data-cursor"?: string;
  "data-cursor-label"?: string;
}) {
  return (
    <a
      href="#film"
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        openFilm();
      }}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * Full-screen player for the film, mounted once in the layout. Safari plays
 * the HLS playlist natively; everywhere else hls.js feeds it through Media
 * Source Extensions, loaded only once the player is first opened.
 */
export default function FilmPlayer() {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const show = () => setOpen(true);
    const onHash = () => {
      if (window.location.hash === "#film") show();
    };
    window.addEventListener(OPEN_EVENT, show);
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => {
      window.removeEventListener(OPEN_EVENT, show);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    if (!video) return;
    const root = document.documentElement;

    // Paged scrolling and the page underneath stay still while it plays.
    root.dataset.film = "open";
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    let destroyed = false;
    let hls: { destroy: () => void } | null = null;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = FILM_SRC;
      video.play().catch(() => undefined);
    } else {
      import("hls.js").then(({ default: Hls }) => {
        if (destroyed || !Hls.isSupported()) return;
        const instance = new Hls({ capLevelToPlayerSize: true });
        instance.loadSource(FILM_SRC);
        instance.attachMedia(video);
        instance.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => undefined);
        });
        hls = instance;
      });
    }

    return () => {
      destroyed = true;
      hls?.destroy();
      video.pause();
      video.removeAttribute("src");
      video.load();
      delete root.dataset.film;
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      // Leave a shareable `/#film` link behind only while it's open.
      if (window.location.hash === "#film") {
        window.history.replaceState(
          window.history.state,
          "",
          window.location.pathname + window.location.search
        );
      }
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="THE CRITIC — full film"
      className="fixed inset-0 z-[90] flex flex-col bg-black"
    >
      <div className="flex items-center justify-between px-5 pt-5 sm:px-10 sm:pt-6">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-stage-text">The Critic</p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          data-cursor="hover"
          className="text-[12px] uppercase tracking-[0.14em] text-stage-text-soft transition-colors hover:text-stage-text"
        >
          Close ✕
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center p-4 sm:p-10">
        <video
          ref={videoRef}
          poster={FILM_POSTER}
          controls
          playsInline
          preload="metadata"
          className="max-h-full w-full max-w-[1600px] bg-black"
        />
      </div>
    </div>
  );
}
