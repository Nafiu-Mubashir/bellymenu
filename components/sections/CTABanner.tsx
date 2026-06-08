"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, CalendarCheck } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678";
const WHATSAPP_MSG = encodeURIComponent(
  "Hello! I'd like to enquire about catering for my event."
);

export default function CTABanner() {
  return (
    <section className="relative py-24 bg-green-600 overflow-hidden w-full">
      {/* Decorative patterns */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      {/* Orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-emerald-900/20 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-white/50" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70">
              {"Let's Work Together"}
            </span>
            <span className="w-6 h-px bg-white/50" />
          </div>

          <h2 className="font-playfair text-[clamp(2rem,5vw,3.25rem)] font-semibold text-white leading-[1.1] tracking-tight mb-4">
            Ready to Plan Your{" "}
            <br className="hidden sm:block" />
            Perfect Event?
          </h2>

          <p className="text-base text-white/70 font-light leading-relaxed mb-10 max-w-lg mx-auto">
            Tell us about your occasion and get a personalised quote within 24 hours — no pressure, just great food.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2 bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-full text-sm font-bold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shadow-lg"
            >
              <CalendarCheck size={16} />
              Request a Quote
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Trust micro-copy */}
          <p className="mt-6 text-xs text-white/50 font-light">
            We reply within minutes · Free consultation · No commitment required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
