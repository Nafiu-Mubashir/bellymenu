"use client";
import Image from "next/image";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import type { AboutPillar } from "@/types";
import { IMAGES } from "@/app/lib/images";

const PILLARS: AboutPillar[] = [
  {
    icon: "🌿",
    title: "Fresh, Quality Ingredients",
    description:
      "We source locally and cook daily — never frozen, never compromised.",
  },
  {
    icon: "👨‍🍳",
    title: "Expert Chef Team",
    description:
      "Our chefs bring hospitality-grade training and deep cultural knowledge to every menu.",
  },
  {
    icon: "✨",
    title: "Seamless Service",
    description:
      "Setup, service, and cleanup — we handle everything so you can be fully present.",
  },
];

const FEATURES = [
  "Nigerian & continental cuisine",
  "Custom menu consultation",
  "Professional service staff",
  "Full setup & teardown",
  "Dietary accommodations",
  "Timely delivery, every time",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: visual card ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative bg-neutral-950 rounded-3xl overflow-hidden aspect-[4/3] flex items-end">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-neutral-950 to-neutral-950" />
              {/* Real photo */}
              <Image
                src={IMAGES.about.homepageCard}
                alt="Bellymenu Kitchen team at work"
                fill
                className="object-cover opacity-60"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent" />
              {/* Caption */}
              <div className="relative z-10 p-8 w-full">
                <h3 className="font-playfair text-2xl text-white font-semibold leading-snug mb-1">
                  Born from a love of<br />
                  <em className="not-italic text-green-400">Nigerian cuisine</em>
                </h3>
                <p className="text-sm text-white/40 font-light mt-2">
                  Feeding celebrations across Nigeria since 2016
                </p>
              </div>

              {/* Floating years badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-6 right-6 bg-green-600 text-white rounded-2xl px-4 py-3 text-center shadow-lg shadow-green-900/30"
              >
                <span className="font-playfair text-3xl font-semibold block leading-none">8+</span>
                <span className="text-[10px] tracking-widest uppercase font-medium opacity-80">Years</span>
              </motion.div>
            </div>

            {/* Feature chips below */}
            <div className="mt-6 flex flex-wrap gap-2">
              {FEATURES.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-50 border border-neutral-100 px-3 py-1.5 rounded-full font-medium"
                >
                  <CheckCircle2 size={11} className="text-green-500" />
                  {f}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Right: text + pillars ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeading
              label="Our Story"
              title="Passion on Every "
              accentWord="Plate"
              subtitle="We started Bellymenu Kitchen because we believed great food deserved great service. Every event we cater is treated with the same care as our own family table."
            />

            <div className="space-y-4 mb-10">
              {PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.45 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-neutral-100 hover:border-green-200 hover:bg-green-50/40 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl flex-shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900 mb-0.5">{pillar.title}</h4>
                    <p className="text-sm text-neutral-500 font-light leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 bg-neutral-950 hover:bg-green-700 text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Our full story
              <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
