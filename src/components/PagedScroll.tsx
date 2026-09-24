"use client";

import { useEffect, useRef, type ReactNode } from "react";

const TICKS_TO_ADVANCE = 2;
const TICK_COOLDOWN_MS = 450;
const MAX_DIM = 0.65;
const LOCK_MS = 700;

/**
 * Turns the homepage's `.snap-section` blocks into a paginated scroll: each
 * first wheel gesture darkens the current section, and the second one
 * commits a smooth scroll to the next (or previous) section.
 *
 * Any section taller than the viewport (the pinned Scenes gallery) is left
 * to scroll natively while there's still room inside it — this component
 * only takes over once you've scrolled through to its edge. Past the last
 * section, scrolling is fully native so the footer stays reachable.
 */
export default function PagedScroll({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>(".snap-section"));
    if (sections.length === 0) return;

    const overlays = sections.map((section) => {
      const overlay = document.createElement("div");
      overlay.setAttribute("aria-hidden", "true");
      Object.assign(overlay.style, {
        position: "absolute",
        inset: "0",
        pointerEvents: "none",
        background: "black",
        opacity: "0",
        transition: "opacity 220ms ease-out",
        zIndex: "30",
      });
      if (getComputedStyle(section).position === "static") {
        section.style.position = "relative";
      }
      section.appendChild(overlay);
      return overlay;
    });

    let tickCount = 0;
    let lastDir = 0;
    let lastTickTime = 0;
    let locked = false;

    function currentIndex() {
      const y = window.scrollY;
      let idx = 0;
      for (let i = 0; i < sections.length; i += 1) {
        if (sections[i].offsetTop <= y + 2) idx = i;
      }
      return idx;
    }

    function hasNativeRoom(idx: number, dir: number) {
      if (idx === sections.length - 1 && dir > 0) return true;
      const rect = sections[idx].getBoundingClientRect();
      return dir > 0 ? rect.bottom > window.innerHeight + 1 : rect.top < -1;
    }

    // Entering a tall section from below lands on its end, not its start.
    function targetTop(idx: number, dir: number) {
      const section = sections[idx];
      if (dir < 0 && section.offsetHeight > window.innerHeight) {
        return section.offsetTop + section.offsetHeight - window.innerHeight;
      }
      return section.offsetTop;
    }

    function setDim(idx: number, amount: number) {
      const overlay = overlays[idx];
      if (overlay) overlay.style.opacity = String(amount);
    }

    function onWheel(e: WheelEvent) {
      if (locked || document.documentElement.dataset.intro === "playing") {
        e.preventDefault();
        return;
      }
      if (e.deltaY === 0) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const idx = currentIndex();
      if (hasNativeRoom(idx, dir)) {
        setDim(idx, 0);
        tickCount = 0;
        return;
      }

      e.preventDefault();
      const now = performance.now();
      if (now - lastTickTime < TICK_COOLDOWN_MS) return;
      lastTickTime = now;

      const targetIndex = idx + dir;
      if (targetIndex < 0 || targetIndex >= sections.length) return;

      if (dir !== lastDir) tickCount = 0;
      lastDir = dir;
      tickCount += 1;
      setDim(idx, (tickCount / TICKS_TO_ADVANCE) * MAX_DIM);

      if (tickCount >= TICKS_TO_ADVANCE) {
        locked = true;
        tickCount = 0;
        window.scrollTo({ top: targetTop(targetIndex, dir), behavior: "smooth" });
        setTimeout(() => {
          setDim(idx, 0);
          locked = false;
        }, LOCK_MS);
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      overlays.forEach((o) => o.remove());
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
