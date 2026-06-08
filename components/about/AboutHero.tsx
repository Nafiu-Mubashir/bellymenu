"use client";

import { motion } from "framer-motion";
import type { AboutData } from "@/types";

interface AboutHeroProps {
  data: AboutData | null;
}

const FALLBACK_TAGLINE =
  "Born from a love of Nigerian cuisine, built on a promise of exceptional service.";

export default function AboutHero({ data }: AboutHeroProps) {
  const tagline = data?.tagline ?? FALLBACK_TAGLINE;

  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-neutral-950 pt-24 pb-20 md:pb-28">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-green-600/15 blur-[110px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-emerald-700/10 blur-[90px]" aria-hidden="true" />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-transparent to-neutral-950/70" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-5 md:px-10">
        {/* Breadcrumb */}
        {/* <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs text-white/30 font-light tracking-wider mb-8"
        >
          <span>Home</span>
          <span>/</span>
          <span className="text-green-400">About Us</span>
        </motion.div> */}

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
            className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-xl"
          >
            {tagline}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 right-10 hidden md:flex items-center gap-2 text-white/20"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-widest uppercase font-light">Scroll to explore</span>
          <span className="w-10 h-px bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
}
