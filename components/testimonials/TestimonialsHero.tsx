"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";

export default function TestimonialsHero() {
  return (
    <section className="relative pt-32 pb-24 bg-neutral-950 overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[800px] h-[420px] rounded-full bg-green-700/13 blur-[130px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-80 h-80 rounded-full bg-emerald-900/10 blur-3xl" aria-hidden="true" />
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "54px 54px" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950/70" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10 text-center">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-2 text-xs text-white/30 font-medium tracking-wide mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <ChevronRight size={11} className="opacity-50" />
          <span className="text-white/60">Testimonials</span>
        </motion.nav>

        {/* Star row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex justify-center gap-1.5 mb-6"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 + 0.1 }}
            >
              <Star size={22} className="fill-amber-400 text-amber-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-5 justify-center"
        >
          <span className="w-8 h-px bg-green-500 opacity-70" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400">
            Client Reviews
          </span>
          <span className="w-8 h-px bg-green-500 opacity-70" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="font-playfair text-[clamp(2.8rem,6.5vw,5rem)] font-semibold text-white leading-[1.06] tracking-tight mb-5"
        >
          Trusted by Hundreds
          <br />
          of <em className="not-italic text-green-400">Happy Clients</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-xl mx-auto mb-10"
        >
          Over 500 events catered, a 98% client satisfaction rate, and reviews
          that speak for themselves — straight from the people we've served.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/40"
          >
            Book Your Event
            <ChevronRight size={14} />
          </Link>
          <Link
            href="#reviews"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-green-500/50 text-white/70 hover:text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all"
          >
            Read Reviews
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
