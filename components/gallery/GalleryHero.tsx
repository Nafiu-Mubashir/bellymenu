"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Images } from "lucide-react";
import HeroBackground from "@/components/ui/HeroBackground";
import { IMAGES } from "@/app/lib/images";

interface GalleryHeroProps {
  totalCount: number;
}

export default function GalleryHero({ totalCount }: GalleryHeroProps) {
  return (
    <section className="relative pt-32 pb-20 bg-neutral-950 overflow-hidden">
      {/* Real event photo behind the hero */}
      <HeroBackground
        src={IMAGES.gallery.party1}
        overlayOpacity={0.68}
        greenTint={0.06}
        priority
      />

      {/* Decorative glows — z-10 to sit above the photo */}
      <div
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-225 h-105 rounded-full bg-green-700/12 blur-[130px] z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 -right-32 w-100 h-100 rounded-full bg-emerald-900/10 blur-3xl z-10"
        aria-hidden="true"
      />
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022] z-10"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "54px 54px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto max-w-7xl px-5 md:px-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs text-white/30 font-medium tracking-wide mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <ChevronRight size={11} className="opacity-50" />
          <span className="text-white/60">Gallery</span>
        </motion.nav>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          {/* Left: text */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-px bg-green-500 opacity-70" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400">
                Our Work
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-playfair text-[clamp(2.8rem,6.5vw,5rem)] font-semibold text-white leading-[1.06] tracking-tight mb-5"
            >
              Every Event,{" "}
              <br className="hidden sm:block" />
              <em className="not-italic text-green-400">Beautifully</em>{" "}
              Captured
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-base md:text-lg text-white/55 font-light leading-relaxed max-w-lg"
            >
            {`  A collection of moments from the weddings, corporate events, celebrations,
              and private dining experiences we've had the honour of catering across Nigeria.`}
            </motion.p>
          </div>

          {/* Right: quick stats + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-5 lg:items-end"
          >
            {/* Mini stats */}
            <div className="flex gap-6">
              {[
                { value: totalCount > 0 ? `${totalCount}+` : "50+", label: "Photos" },
                { value: "500+", label: "Events" },
                { value: "6", label: "Categories" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-playfair text-2xl font-semibold text-white leading-none">
                    {s.value}
                  </p>
                  <p className="text-[10px] tracking-widest uppercase text-white/35 mt-1 font-light">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/40"
              >
                Book Your Event
                <ChevronRight size={14} />
              </Link>
              <a
                href="#gallery-grid"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-green-500/50 text-white/70 hover:text-white px-6 py-3 rounded-full text-sm font-medium transition-all"
              >
                <Images size={14} />
                Browse Gallery
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
