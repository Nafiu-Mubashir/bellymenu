"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Clock, MessageCircle, ShieldCheck } from "lucide-react";

const TRUST_PILLS = [
  { icon: Clock,        text: "24hr response" },
  { icon: ShieldCheck,  text: "No commitment" },
  { icon: MessageCircle,text: "Free consultation" },
];

export default function BookingHero() {
  return (
    <section className="relative pt-32 pb-20 bg-neutral-950 overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full bg-green-700/14 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-80 h-80 rounded-full bg-emerald-900/10 blur-3xl" aria-hidden="true" />
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "54px 54px" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950/70" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
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
          <span className="text-white/60">Request a Quote</span>
        </motion.nav>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          {/* Left: headline */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-px bg-green-500 opacity-70" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400">
                Let's Plan Together
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-playfair text-[clamp(2.6rem,6vw,4.8rem)] font-semibold text-white leading-[1.06] tracking-tight mb-5"
            >
              Tell Us About
              <br />
              Your <em className="not-italic text-green-400">Event</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-base md:text-lg text-white/50 font-light leading-relaxed"
            >
              Fill in the details below and we'll come back to you within 24 hours
              with a personalised proposal — no commitment, no pressure.
            </motion.p>
          </div>

          {/* Right: trust pills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap lg:flex-col gap-3"
          >
            {TRUST_PILLS.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="inline-flex items-center gap-2.5 bg-white/6 border border-white/10 px-4 py-2.5 rounded-full text-sm text-white/65 font-light"
              >
                <Icon size={14} className="text-green-400 flex-shrink-0" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
