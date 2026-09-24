"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Replaces the native pointer with a small cross ("+") on precise-pointer
 * devices (see the paired `cursor: none` rule in globals.css). Blooms and
 * gains an accent dot over links/buttons. Elements with `data-cursor-label`
 * also get that text floated beside the cursor.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [lastLabel, setLastLabel] = useState("");
  const pos = useRef({ x: -100, y: -100 });
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    const apply = () => {
      if (el.current) {
        el.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const syncTarget = (target: HTMLElement | null) => {
      setHovering(Boolean(target?.closest('a, button, [data-cursor="hover"]')));
      const labelled = target?.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelled?.dataset.cursorLabel ?? null);
    };

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      syncTarget(e.target as HTMLElement | null);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };
    // The page can scroll under a still pointer, so re-check what's beneath it.
    const onScroll = () => {
      const { x, y } = pos.current;
      syncTarget(document.elementFromPoint(x, y) as HTMLElement | null);
    };
    const onLeave = () => setVisible(false);
    const onDown = () => el.current?.classList.add("scale-90");
    const onUp = () => el.current?.classList.remove("scale-90");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (label && label !== lastLabel) setLastLabel(label);

  if (!enabled) return null;

  return (
    <div
      ref={el}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center transition-[opacity,transform] duration-150 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className={`relative flex items-center justify-center transition-transform duration-200 ease-out ${
          hovering ? "scale-[2.1]" : "scale-100"
        }`}
      >
        <span className="absolute h-px w-4 bg-ink" />
        <span className="absolute h-4 w-px bg-ink" />
        <span
          className={`absolute h-1.5 w-1.5 rounded-full bg-accent transition-opacity duration-200 ${
            hovering ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <span
        className={`absolute left-7 top-1/2 whitespace-nowrap text-[11px] uppercase tracking-[0.16em] text-ink transition-[opacity,transform] duration-300 ease-out ${
          label ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
        }`}
        style={{ marginTop: "-0.5em", lineHeight: 1 }}
      >
        {lastLabel}
      </span>
    </div>
  );
}
