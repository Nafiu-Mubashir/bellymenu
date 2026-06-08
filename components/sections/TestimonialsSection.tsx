"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/types";

// ─── Fallback data ────────────────────────────────────────────────────────────
const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: "1",
    name: "Adaeze Okonkwo",
    initials: "AO",
    eventType: "Wedding Reception",
    location: "Lagos",
    year: "2024",
    quote:
      "Bellymenu catered our wedding reception and it was absolutely flawless. Every single guest kept asking who did the food. The jollof rice alone had people going back for thirds! 10 out of 10, will absolutely use them again.",
    rating: 5,
  },
  {
    _id: "2",
    name: "Tunde Martins",
    initials: "TM",
    eventType: "Corporate Annual Dinner",
    location: "Abuja",
    year: "2024",
    quote:
      "We hired Bellymenu for our company's annual dinner. Professional, punctual, and the food was genuinely restaurant quality. The setup was beautiful and our entire team was thoroughly impressed. Highly recommended for any corporate event.",
    rating: 5,
  },
  {
    _id: "3",
    name: "Funmi Kadiri",
    initials: "FK",
    eventType: "Birthday Celebration",
    location: "Abuja",
    year: "2023",
    quote:
      "My daughter's 30th birthday party was absolutely magical, and a huge part of that was the food presentation. Everything was delicious and the service team was so professional and warm. Our guests are still talking about it!",
    rating: 5,
  },
  {
    _id: "4",
    name: "Emeka Eze",
    initials: "EE",
    eventType: "Outdoor Graduation Party",
    location: "Port Harcourt",
    year: "2023",
    quote:
      "From the initial consultation to the last bite, Bellymenu was exceptional. They handled an outdoor event for 200+ guests without a hitch. The variety of dishes was incredible — traditional and continental side by side.",
    rating: 5,
  },
];

// ─── Star rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-amber-400 text-amber-400" : "text-neutral-200"}
        />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface TestimonialsSectionProps {
  testimonials: Testimonial[] | null;
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const list =
    testimonials && testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p === 0 ? list.length - 1 : p - 1));
  const next = () => setActive((p) => (p === list.length - 1 ? 0 : p + 1));

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-neutral-950 overflow-hidden">
      {/* Decorative orb */}
      <div className="pointer-events-none absolute -right-40 top-1/2 w-96 h-96 rounded-full bg-green-700/10 blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 md:px-10 relative">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading
            label="Client Love"
            title="What Our Clients "
            accentWord="Say"
            subtitle="Over 500 events and thousands of happy guests — here's what a few of them had to say about us."
            light
          />
          {/* Desktop nav arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-green-500 hover:text-green-400 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-green-500 hover:text-green-400 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards grid — show 3 on desktop, 1 on mobile with slide */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {list.slice(0, 3).map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="bg-white/5 border border-white/8 rounded-2xl p-7 flex flex-col gap-5 hover:bg-white/8 transition-colors"
            >
              <Quote size={28} className="text-green-500/60" />
              <StarRating rating={t.rating} />
              <p className="text-sm text-white/70 leading-relaxed font-light italic flex-1">
               {` "${t.quote}"`}
              </p>
              <div className="flex items-center gap-3 border-t border-white/8 pt-5">
                <div className="w-10 h-10 rounded-full bg-green-900/60 flex items-center justify-center text-green-300 text-sm font-semibold shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/35 font-light">
                    {t.eventType} · {t.location}, {t.year}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative min-h-80">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.35 }}
              className="bg-white/5 border border-white/8 rounded-2xl p-7 flex flex-col gap-5"
            >
              <Quote size={28} className="text-green-500/60" />
              <StarRating rating={list[active].rating} />
              <p className="text-sm text-white/70 leading-relaxed font-light italic">
                {` "${list[active].quote}"`}
              </p>
              <div className="flex items-center gap-3 border-t border-white/8 pt-5">
                <div className="w-10 h-10 rounded-full bg-green-900/60 flex items-center justify-center text-green-300 text-sm font-semibold shrink-0">
                  {list[active].initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{list[active].name}</p>
                  <p className="text-xs text-white/35 font-light">
                    {list[active].eventType} · {list[active].location}, {list[active].year}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile dots */}
          <div className="flex justify-center gap-2 mt-6">
            {list.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-green-500" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-400 hover:text-green-300 underline underline-offset-4 decoration-green-800 hover:decoration-green-400 transition-all"
          >
            Read all reviews
            <ChevronRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
