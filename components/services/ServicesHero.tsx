"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import HeroBackground from "../ui/HeroBackground";
import { IMAGES } from "@/app/lib/images";

export default function ServicesHero() {
  return (
    <section className="relative pt-32 pb-20 bg-neutral-950 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-175 h-100 rounded-full bg-green-700/20 blur-[100px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
<HeroBackground src={IMAGES.hero.services} />
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10 text-center">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-2 text-xs text-white/35 mb-8 font-medium tracking-wide"
        >
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-white/60">Services</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-3 mb-5"
        >
          <span className="w-8 h-px bg-green-500 opacity-70" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400">
            What We Offer
          </span>
          <span className="w-8 h-px bg-green-500 opacity-70" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-playfair text-[clamp(2.4rem,6vw,4.5rem)] font-semibold text-white leading-[1.08] tracking-tight mb-5"
        >
          Catering Services for{" "}
          <em className="not-italic text-green-400">Every Occasion</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-xl mx-auto mb-10"
        >
          From intimate gatherings to grand celebrations — each service is tailored
          to your vision, your guests, and your budget.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/40"
          >
            Request a Quote
            <ChevronRight size={14} />
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-green-500/50 text-white/70 hover:text-white px-6 py-3 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5"
          >
            Chat with us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
