"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, HelpCircle } from "lucide-react";

export default function FAQHero() {
  return (
    <section className="relative pt-32 pb-20 bg-neutral-950 overflow-hidden">
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-175 h-95 rounded-full bg-green-700/13 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-emerald-900/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "54px 54px" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-neutral-950/40 via-transparent to-neutral-950/70" aria-hidden="true" />

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
          <span className="text-white/60">FAQ</span>
        </motion.nav>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
          className="w-16 h-16 rounded-2xl bg-green-600/20 border border-green-500/20 flex items-center justify-center mx-auto mb-6"
        >
          <HelpCircle size={30} className="text-green-400" />
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-3 mb-5 justify-center"
        >
          <span className="w-8 h-px bg-green-500 opacity-70" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400">
            Common Questions
          </span>
          <span className="w-8 h-px bg-green-500 opacity-70" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="font-playfair text-[clamp(2.6rem,6vw,4.8rem)] font-semibold text-white leading-[1.06] tracking-tight mb-5"
        >
          Frequently Asked{" "}
          <em className="not-italic text-green-400">Questions</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-xl mx-auto mb-10"
        >
          Everything you need to know about booking Bellymenu Kitchen — from pricing
          and menus to logistics and day-of service.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="#faq-list"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/40"
          >
            Browse Questions
            <ChevronRight size={14} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-green-500/50 text-white/70 hover:text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all"
          >
            Ask Us Directly
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
