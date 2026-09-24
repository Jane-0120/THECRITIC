import type { ReactNode } from "react";

export default function Disclosure({
  summary,
  children,
  defaultOpen = false,
}: {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group border-t border-paper-line py-4 first:border-t-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] text-ink marker:content-none [&::-webkit-details-marker]:hidden">
        <span>{summary}</span>
        <span className="shrink-0 text-ink-faint transition-transform duration-200 group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="mt-3 text-[14px] leading-relaxed text-ink-soft">
        {children}
      </div>
    </details>
  );
}
