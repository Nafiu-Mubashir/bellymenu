"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

const FALLBACK_FEATURED: Testimonial = {
  _id: "featured",
  name: "Chioma & Emeka Nwosu",
  initials: "CN",
  eventType: "Traditional & White Wedding",
  location: "Enugu",
  year: "2024",
  quote: "We had Bellymenu cater both our traditional and white wedding — two events, two days, two entirely different menus. Both days were flawless. The traditional spread had our family speechless and the continental buffet was elegant and refined. Every single detail was considered, from the food stations to how the staff carried themselves. This is the catering company Nigerians deserve.",
  rating: 5,
};

interface FeaturedTestimonialProps {
  testimonial?: Testimonial | null;
}

export default function FeaturedTestimonial({ testimonial }: FeaturedTestimonialProps) {
  const t = testimonial ?? FALLBACK_FEATURED;

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-neutral-950 rounded-3xl overflow-hidden p-10 md:p-16"
        >
          {/* Background orbs */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-green-700/15 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-emerald-900/15 blur-3xl" aria-hidden="true" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-green-500 opacity-60" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400">
              Featured Review
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
            {/* Quote */}
            <div>
              <Quote size={44} className="text-green-500/25 mb-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="font-playfair text-[clamp(1.2rem,2.8vw,1.7rem)] text-white font-medium leading-[1.55] italic">
                "{t.quote}"
              </blockquote>
            </div>

            {/* Author card */}
            <div className="flex-shrink-0 lg:text-right">
              <div className="lg:flex lg:flex-col lg:items-end gap-3">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-green-900/50 border border-green-700/30 flex items-center justify-center text-green-300 text-lg font-semibold font-playfair mb-3 lg:mb-0 lg:ml-auto">
                  {t.initials}
                </div>
                <div>
                  <p className="text-base font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40 font-light mt-0.5">{t.eventType}</p>
                  <p className="text-xs text-white/30 font-light">{t.location}, {t.year}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-40" />
        </motion.div>
      </div>
    </section>
  );
}
