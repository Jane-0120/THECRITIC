import Image from "next/image";
import type { ImageRef } from "@/data/types";
import { cn } from "@/lib/utils";

type Props = {
  image: ImageRef;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Fill the parent element instead of setting its own aspect-ratio box. */
  fill?: boolean;
};

export default function Placeholder({ image, className, priority, sizes = "(min-width: 1024px) 50vw, 100vw", fill }: Props) {
  const isStage = image.tone === "stage";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        isStage ? "bg-stage" : "bg-paper-dim",
        fill && "absolute inset-0 h-full",
        className
      )}
      style={fill ? undefined : { aspectRatio: image.aspect ?? "4/3" }}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 flex items-end justify-start p-4",
            isStage ? "text-stage-text-soft" : "text-ink-faint"
          )}
          style={{
            backgroundImage: isStage
              ? "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 14px)"
              : "repeating-linear-gradient(135deg, rgba(27,24,21,0.05) 0px, rgba(27,24,21,0.05) 1px, transparent 1px, transparent 14px)",
          }}
          role="img"
          aria-label={image.alt}
        >
          <span className="text-[11px] tracking-[0.08em]">{image.label}</span>
        </div>
      )}
    </div>
  );
}
