"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const STEPS = [
  {
    icon: "💬",
    title: "Get in Touch",
    description:
      "Reach out via our booking form, WhatsApp, or a call. Tell us your event date, guest count, and what you have in mind.",
  },
  {
    icon: "☕",
    title: "Free Consultation",
    description:
      "We sit with you — in person or virtually — to understand your vision, guests, dietary needs and budget. No pressure, no obligation.",
  },
  {
    icon: "📋",
    title: "Custom Menu Design",
    description:
      "Our chefs craft a personalised menu proposal. You review, tweak, and approve. Tasting sessions can be arranged.",
  },
  {
    icon: "✨",
    title: "We Handle Everything",
    description:
      "On the day we manage full setup, service, and teardown. You enjoy your event — we handle everything else.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <span className="w-7 h-px bg-green-500 opacity-60" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-600">
              How It Works
            </span>
            <span className="w-7 h-px bg-green-500 opacity-60" />
          </div>
          <h2 className="font-playfair text-[clamp(1.8rem,4vw,2.8rem)] font-semibold text-neutral-900 leading-tight mb-4">
            From Enquiry to{" "}
            <em className="not-italic text-green-600">Exceptional Event</em>
          </h2>
          <p className="text-neutral-500 font-light text-sm md:text-base leading-relaxed">
            A seamless, stress-free process from your first message to the last plate cleared.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting dashed line — desktop only */}
          <div
            className="hidden lg:block absolute top-9 left-[calc(12.5%+40px)] right-[calc(12.5%+40px)] h-px border-t border-dashed border-green-200"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center group"
              >
                {/* Circle with emoji + step badge */}
                <div className="relative mb-6">
                  <div className="w-18 h-18 rounded-full bg-green-50 border-2 border-green-100 group-hover:border-green-400 group-hover:bg-green-100 flex items-center justify-center text-2xl transition-all duration-300 shadow-sm">
                    {step.icon}
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center shadow">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-semibold text-neutral-900 text-base mb-2 group-hover:text-green-700 transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-14 text-center"
        >
          <Link
            href="/booking"
            className="group inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-200"
          >
            Start Your Enquiry
            <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="text-xs text-neutral-400 mt-3 font-light">
            Free consultation · No commitment · We reply within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
