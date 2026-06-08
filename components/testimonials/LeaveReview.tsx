"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MessageCircle, ChevronRight } from "lucide-react";

export default function LeaveReview() {
  const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678";

  return (
    <section className="py-20 bg-neutral-50 border-t border-neutral-100 overflow-hidden">
      <div className="mx-auto max-w-3xl px-5 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          {/* Stars decoration */}
          <div className="flex justify-center gap-1.5 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.2, type: "spring", stiffness: 300, damping: 18 }}
              >
                <Star size={24} className="fill-amber-400 text-amber-400" />
              </motion.div>
            ))}
          </div>

          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <span className="w-8 h-px bg-green-500 opacity-60" />
            <span className="text-xs font-medium tracking-[0.18em] uppercase text-green-600">
              Share Your Experience
            </span>
            <span className="w-8 h-px bg-green-500 opacity-60" />
          </div>

          <h2 className="font-playfair text-[clamp(2rem,4vw,2.8rem)] font-semibold text-neutral-900 leading-tight mb-4">
            Had an Event with <em className="not-italic text-green-600">Bellymenu?</em>
          </h2>

          <p className="text-neutral-500 font-light leading-relaxed text-[15px] mb-10 max-w-md mx-auto">
            We'd love to hear from you. Your review helps other families and businesses find the catering service they deserve.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://g.page/r/bellymenukitchen/review"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-neutral-950 hover:bg-green-700 text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-base font-bold leading-none">G</span>
              Leave a Google Review
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I'd like to share feedback about my recent event with Bellymenu Kitchen.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/60 text-[#25D366] px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all"
            >
              <MessageCircle size={16} />
              Send Feedback via WhatsApp
            </a>
          </div>

          {/* Micro CTA */}
          <div className="mt-10 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-500 font-light mb-4">
              Ready to experience it yourself?
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 underline underline-offset-4 decoration-green-300 hover:decoration-green-500 transition-all"
            >
              Book your catering today
              <ChevronRight size={13} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
