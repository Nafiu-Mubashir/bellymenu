import Image from "next/image";

interface HeroBackgroundProps {
  /** Unsplash URL or any absolute/relative image path */
  src: string;
  /** 0–1 — how dark the overlay is. Higher = more readable text. Default 0.72 */
  overlayOpacity?: number;
  /** Pass true for above-the-fold heroes */
  priority?: boolean;
  /** Optional secondary green tint level (0–1). Default 0 */
  greenTint?: number;
}

/**
 * Reusable full-bleed hero background.
 * Renders the photo + dark overlay + optional green colour tint.
 * Add inside any <section className="relative overflow-hidden …">
 */
export default function HeroBackground({
  src,
  overlayOpacity = 0.72,
  priority = false,
  greenTint = 0.08,
}: HeroBackgroundProps) {
  return (
    <>
      {/* Photo layer */}
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-center"
        priority={priority}
        sizes="100vw"
      />
      {/* Dark overlay — keeps text readable */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(10,10,10,${overlayOpacity})` }}
        aria-hidden="true"
      />
      {/* Green tint — keeps brand colour present */}
      {greenTint > 0 && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(22,163,74,${greenTint})` }}
          aria-hidden="true"
        />
      )}
      {/* Gradient fade — bottom vignette for text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-transparent to-neutral-950/60"
        aria-hidden="true"
      />
    </>
  );
}
