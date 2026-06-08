"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, CalendarCheck, ChevronRight } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678";

export default function FAQContactCTA() {
  return (
    <section className="py-20 bg-white border-t border-neutral-100">
      <div className="mx-auto max-w-4xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="bg-neutral-950 rounded-3xl overflow-hidden p-10 md:p-14 relative"
        >
          {/* Orbs */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-green-700/15 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-emerald-900/15 blur-3xl" aria-hidden="true" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-green-500 opacity-60" />
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400">
                  Still Unsure?
                </span>
              </div>
              <h2 className="font-playfair text-[clamp(1.8rem,4vw,2.8rem)] font-semibold text-white leading-tight mb-3">
                Can't Find Your{" "}
                <em className="not-italic text-green-400">Answer?</em>
              </h2>
              <p className="text-sm text-white/50 font-light leading-relaxed">
                Our team is on hand to answer any question — big or small. We'd love to chat about your event and help you plan with confidence.
              </p>
            </div>

            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link
                href="/booking"
                className="group inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/40"
              >
                <CalendarCheck size={15} />
                Book a Free Consultation
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I have a question about your catering services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/25 hover:border-[#25D366]/60 text-[#25D366] px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all"
              >
                <MessageCircle size={15} />
                Ask on WhatsApp
              </a>

              <Link
                href="/contact"
                className="text-center text-xs font-medium text-white/40 hover:text-white/70 transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
              >
                Send us an email instead
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
