"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";

const REASONS = [
  {
    number: "01",
    title: "Authentic Nigerian Flavours",
    description:
      "We don't just cook Nigerian food — we honour it. Every dish is prepared with cultural respect, the right spices, and generations of technique.",
  },
  {
    number: "02",
    title: "Custom Menu Consultation",
    description:
      "No two events are the same. We sit with you, understand your guests, theme, and preferences, and build a menu from scratch for your occasion.",
  },
  {
    number: "03",
    title: "Full-Service Experience",
    description:
      "From the first consultation to the last cleared table, we handle everything — chefs, service staff, equipment, setup, and cleanup.",
  },
  {
    number: "04",
    title: "Flexible for Any Scale",
    description:
      "Whether you're hosting 20 guests for an intimate dinner or 1,000 for a grand reception, our operations scale to your needs without compromising quality.",
  },
];

const CHECKLIST = [
  "Licensed & fully insured",
  "Health & food safety certified",
  "Experienced event chefs",
  "Professional service staff",
  "Own equipment & setup crew",
  "Flexible dietary accommodations",
  "Prompt, clear communication",
  "Post-event feedback & follow-up",
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-neutral-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-xl mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4 text-xs font-medium tracking-[0.18em] uppercase text-green-600">
            <span className="w-8 h-px bg-green-500 opacity-60" />
            Why Bellymenu
          </div>
          <h2 className="font-playfair text-[clamp(2rem,4.5vw,3rem)] font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-4">
            What Makes Us{" "}
            <em className="not-italic text-green-600">Different</em>
          </h2>
          <p className="text-neutral-500 font-light leading-relaxed text-[15px]">
            There are many caterers in Nigeria. Here's why clients keep choosing — and returning to — Bellymenu Kitchen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Reasons list */}
          <div className="space-y-0 divide-y divide-neutral-100">
            {REASONS.map((reason, i) => (
              <motion.div
                key={reason.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group flex gap-6 py-7 hover:bg-white rounded-2xl px-4 -mx-4 transition-colors duration-200"
              >
                {/* Number */}
                <div className="flex-shrink-0 font-playfair text-4xl font-semibold text-neutral-100 group-hover:text-green-100 transition-colors duration-200 leading-none mt-1 w-10">
                  {reason.number}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 mb-2 group-hover:text-green-700 transition-colors duration-200">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Checklist card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-sm">
              <h3 className="font-playfair text-xl font-semibold text-neutral-900 mb-2">
                Everything Included
              </h3>
              <p className="text-sm text-neutral-500 font-light mb-7">
                When you book Bellymenu Kitchen, here's what you always get:
              </p>

              <ul className="grid grid-cols-1 gap-3">
                {CHECKLIST.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + 0.2 }}
                    className="flex items-center gap-3 text-sm text-neutral-700 font-light"
                  >
                    <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>

              {/* CTA inside card */}
              <div className="mt-8 pt-6 border-t border-neutral-100">
                <Link
                  href="/booking"
                  className="group w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-green-100"
                >
                  Book a Consultation
                  <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="text-center text-xs text-neutral-400 mt-3 font-light">
                  Free consultation · Response within 24 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
