import type { ReactNode } from "react";

export default function PageHero({
  index,
  eyebrow,
  title,
  lead,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-10 pt-32 sm:px-6 sm:pt-40">
      <div className="flex items-baseline gap-4 text-[12px] uppercase tracking-[0.18em] text-ink-faint">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <h1 className="font-display mt-4 max-w-3xl text-2xl leading-tight text-ink sm:text-4xl">
        {title}
      </h1>
      {lead && (
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          {lead}
        </p>
      )}
      {children}
    </div>
  );
}
