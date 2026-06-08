"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MessageCircle } from "lucide-react";

export default function MenuHero() {
  return (
    <section className="relative pt-32 pb-24 bg-neutral-950 overflow-hidden">
      {/* Centre glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-green-700/15 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-emerald-900/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 -right-24 w-72 h-72 rounded-full bg-green-900/10 blur-3xl"
        aria-hidden="true"
      />
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-transparent to-neutral-950/80"
        aria-hidden="true"
      />

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
          <span className="text-white/60">Menu</span>
        </motion.nav>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-3 mb-5 justify-center"
        >
          <span className="w-8 h-px bg-green-500 opacity-70" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400">
            What We Cook
          </span>
          <span className="w-8 h-px bg-green-500 opacity-70" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-playfair text-[clamp(2.6rem,6.5vw,5rem)] font-semibold text-white leading-[1.06] tracking-tight mb-5"
        >
          A Celebration of{" "}
          <em className="not-italic text-green-400">Flavour</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-xl mx-auto mb-10"
        >
          Our menu is a love letter to Nigerian cuisine — elevated with continental
          classics and crafted fresh for every single event.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/40"
          >
            Request a Custom Menu
            <ChevronRight size={14} />
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678"}?text=${encodeURIComponent("Hi! I'd like to know more about your menu options.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-green-500/50 text-white/70 hover:text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5 backdrop-blur-sm"
          >
            <MessageCircle size={14} />
            Discuss Your Menu
          </a>
        </motion.div>

        {/* Floating food icons */}
        {["🍛", "🥘", "🍖", "🎂", "🥗", "🍹"].map((emoji, i) => (
          <motion.span
            key={emoji}
            className="absolute text-2xl select-none pointer-events-none hidden lg:block"
            style={{
              left: `${8 + i * 16}%`,
              top: `${20 + (i % 2 === 0 ? 10 : 55)}%`,
              opacity: 0.12,
            }}
            animate={{ y: [0, -10, 0], rotate: [0, i % 2 === 0 ? 8 : -8, 0] }}
            transition={{ repeat: Infinity, duration: 3 + i * 0.4, ease: "easeInOut", delay: i * 0.3 }}
            aria-hidden="true"
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
