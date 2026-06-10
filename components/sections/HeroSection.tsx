"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, MessageCircle, ArrowDown } from "lucide-react";
import type { HomepageData, StatItem } from "@/types";
import { IMAGES } from "@/app/lib/images";
import Image from "next/image";

// ─── Fallback data ────────────────────────────────────────────────────────────
const FALLBACK: HomepageData = {
  heroEyebrow: "Premium Catering Services",
  heroTitle: "Food That Makes Every",
  heroTitleAccent: "Occasion",
  heroSubtitle:
    "Weddings, corporate events, parties & celebrations — we bring exceptional Nigerian cuisine and seamless service to every table.",
  heroStats: [
    { value: "500", suffix: "+", label: "Events Catered" },
    { value: "98", suffix: "%", label: "Client Satisfaction" },
    { value: "8", suffix: "+", label: "Years Experience" },
    { value: "20", suffix: "+", label: "Cities Served" },
  ],
  marqueeItems: [],
};

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
      className="text-center"
    >
      <p className="font-playfair text-3xl md:text-4xl font-semibold text-white leading-none">
        {stat.value}
        <span className="text-green-400 text-2xl md:text-3xl">
          {stat.suffix}
        </span>
      </p>
      <p className="text-[11px] tracking-widest uppercase text-white/40 mt-1.5 font-light">
        {stat.label}
      </p>
    </motion.div>
  );
}

interface HeroSectionProps {
  data: HomepageData | null;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const d = {
    ...FALLBACK,
    ...(data || {}),
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const heroStats = d.heroStats ?? FALLBACK.heroStats;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "8%"]);
    const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const WHATSAPP_NUMBER =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-neutral-950 w-full"
    >
     {/* ── Real background photo with parallax ── */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0">
        <Image
          src={IMAGES.hero.homepage}
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark gradient overlay — keeps text readable */}
        <div className="absolute inset-0 bg-neutral-950/70" />
        <div className="absolute inset-0 bg-linear-to-b from-neutral-950/40 via-neutral-950/20 to-neutral-950/80" />
      </motion.div>

      {/* Green colour tint orbs */}
      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute -top-32 -right-32 w-150 h-150 rounded-full bg-green-600/15 blur-[120px] z-10"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute bottom-0 -left-40 w-125 h-125 rounded-full bg-emerald-500/8 blur-[100px] z-10"
        aria-hidden="true"
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto max-w-7xl w-full px-5 md:px-10 pt-28 pb-20"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-green-500 opacity-70" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400">
              {d.heroEyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-playfair text-[clamp(2.8rem,7vw,5.5rem)] font-semibold text-white leading-[1.04] tracking-tight mb-6"
          >
            {d.heroTitle} {/* <br className="hidden sm:block" /> */}
            <em className="not-italic text-green-400">{d.heroTitleAccent}</em>
            <br className="hidden sm:block" /> Unforgettable
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-white/55 font-light leading-relaxed max-w-xl mb-10"
          >
            {d.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/40"
            >
              Request a Quote
              <ChevronRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/14 border border-white/15 hover:border-green-500/60 text-white/80 hover:text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
            </a>
            <Link
              href="/gallery"
              className="text-sm font-medium text-white/50 hover:text-white/80 underline underline-offset-4 decoration-white/20 hover:decoration-green-500 transition-all"
            >
              View our work
            </Link>
          </motion.div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-xl">
          {heroStats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/30"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-widest uppercase font-light">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
