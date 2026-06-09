"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

const WHY_US_ITEMS = [
  "500+ successful events catered",
  "Nigerian & continental cuisine expertise",
  "Fully equipped mobile kitchen",
  "Professional uniformed service staff",
  "Dietary & allergen accommodations",
  "Custom menu consultation included",
  "Punctual delivery, every single time",
  "Full setup & post-event cleanup",
];

const STATS = [
  { value: "500+", label: "Events Catered" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "8+", label: "Years Experience" },
];

export default function ServicesWhyUs() {
  return (
    <section className="py-20 md:py-28 bg-neutral-950 overflow-hidden relative">
      {/* Decorative orb */}
      <div
        className="pointer-events-none absolute -right-32 top-1/3 w-96 h-96 rounded-full bg-green-700/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-green-900/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 md:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left: text + stats */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-green-500 opacity-60" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400">
                Why Bellymenu
              </span>
            </div>

            <h2 className="font-playfair text-[clamp(1.8rem,4vw,3rem)] font-semibold text-white leading-tight mb-5">
              The Standard Your{" "}
              <em className="not-italic text-green-400">Event Deserves</em>
            </h2>

            <p className="text-white/50 font-light leading-relaxed mb-10 text-sm md:text-[15px] max-w-md">
              {`Eight years of refining every detail — from sourcing to service. Here's what you always get when you choose Bellymenu Kitchen.`}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/8 rounded-xl p-4 text-center hover:border-green-700/40 transition-colors duration-200"
                >
                  <p className="font-playfair text-2xl font-semibold text-green-400 leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-white/35 font-light tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/30"
            >
              Get a free quote
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right: checklist */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-1 gap-2.5">
              {WHY_US_ITEMS.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 + 0.2, duration: 0.4 }}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl border border-white/6 hover:border-green-700/50 hover:bg-green-900/10 transition-all duration-200 group cursor-default"
                >
                  <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />
                  <span className="text-sm text-white/65 font-light group-hover:text-white/85 transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
