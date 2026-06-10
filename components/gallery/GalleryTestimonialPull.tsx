"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight, Quote } from "lucide-react";

// A curated pull-quote from a client — sits between gallery sections
const QUOTE = {
  text: "The photos don't even capture it fully — but they give you an idea. Bellymenu Kitchen turned our reception into something none of our 300 guests will ever forget. The food was the highlight of the night.",
  name: "Adaeze & Chisom Okonkwo",
  event: "Wedding Reception · Lagos, 2024",
  initials: "AO",
  rating: 5,
};

export default function GalleryTestimonialPull() {
  return (
    <section className="py-20 bg-black overflow-hidden relative">
      {/* Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -top-16 -left-16 w-60 h-60 rounded-full bg-white/8 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-emerald-900/20 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <Quote size={36} className="text-white/25 mx-auto mb-6" />

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: QUOTE.rating }).map((_, i) => (
              <Star key={i} size={16} className="fill-white text-white" />
            ))}
          </div>

          <p className="font-playfair text-[clamp(1.3rem,3vw,2rem)] font-medium text-white leading-[1.5] italic mb-8 max-w-3xl mx-auto">
            "{QUOTE.text}"
          </p>

          {/* Author */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white text-sm font-semibold">
              {QUOTE.initials}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">{QUOTE.name}</p>
              <p className="text-xs text-white/60 font-light">{QUOTE.event}</p>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-white/80 hover:text-white border border-white/25 hover:border-white/60 px-6 py-2.5 rounded-full transition-all"
          >
            Read all reviews
            <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
