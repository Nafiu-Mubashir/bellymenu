"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroBackground from "@/components/ui/HeroBackground";
import type { AboutData } from "@/types";
import { ChevronRight } from "lucide-react";
import { IMAGES } from "@/app/lib/images";

interface AboutHeroProps {
  data: AboutData | null;
}

const FALLBACK_TAGLINE =
  "Born from a love of Nigerian cuisine, built on a promise of exceptional service.";

export default function AboutHero({ data }: AboutHeroProps) {
  const tagline = data?.tagline ?? FALLBACK_TAGLINE;

  return (
    <section className="relative min-h-[65vh] flex items-end overflow-hidden bg-neutral-950 pt-24 pb-20 md:pb-28">
      {/* Real hero photo */}
      <HeroBackground
        src={IMAGES.hero.about}
        overlayOpacity={0.70}
        greenTint={0.06}
        priority
      />

      {/* Decorative blobs — sit on top of photo */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-125 h-125 rounded-full bg-green-600/12 blur-[110px] z-10" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 -left-32 w-100 h-100 rounded-full bg-emerald-700/8 blur-[90px] z-10" aria-hidden="true" />

      {/* Fine grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] z-10"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto max-w-7xl w-full px-5 md:px-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs text-white/30 font-medium tracking-wide mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <ChevronRight size={11} className="opacity-50" />
          <span className="text-white/60">About Us</span>
        </motion.nav>

        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-px bg-green-500/70" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400">
              Our Story
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-playfair text-[clamp(2.6rem,6.5vw,5rem)] font-semibold text-white leading-[1.06] tracking-tight mb-6"
          >
            The People Behind
            <br />
            <em className="not-italic text-green-400">Every Meal</em>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="text-base md:text-lg text-white/55 font-light leading-relaxed max-w-xl"
          >
            {tagline}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 right-10 hidden md:flex items-center gap-2 text-white/25"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-widest uppercase font-light">Scroll to explore</span>
          <span className="w-10 h-px bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
}
