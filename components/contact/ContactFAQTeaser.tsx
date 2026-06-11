"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, ChevronRight } from "lucide-react";

const QUICK_FAQS = [
  "How far in advance should I book?",
  "Do you cater outside Lagos?",
  "Can you accommodate dietary requirements?",
  "How does your consultation process work?",
];

export default function ContactFAQTeaser() {
  return (
    <section className="py-16 bg-neutral-50 border-t border-neutral-100">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-neutral-100 rounded-2xl p-7 md:p-10 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left */}
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                  <HelpCircle size={17} className="text-green-600" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-neutral-900">
                  Quick Answers
                </h3>
              </div>
              <p className="text-sm text-neutral-500 font-light leading-relaxed mb-5">
                Check our FAQ for instant answers to common questions.
              </p>
              <ul className="space-y-2">
                {QUICK_FAQS.map((q) => (
                  <li
                    key={q}
                    className="flex items-start gap-2 text-sm text-neutral-600 font-light"
                  >
                    <span className="text-green-500 mt-0.5 flex-shrink-0">
                      ›
                    </span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right */}
            <Link
              href="/faq"
              className="group inline-flex items-center gap-2 bg-neutral-950 hover:bg-green-700 text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg flex-shrink-0 self-start md:self-center"
            >
              Visit our FAQ
              <ChevronRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
