"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import type { FAQItem } from "@/types";

const FALLBACK_FAQ: FAQItem[] = [
  { _id: "1", question: "How far in advance should I book?", answer: "We recommend booking at least 4–6 weeks in advance for most events, and 3–6 months ahead for weddings. However, we do accommodate last-minute requests when availability allows — don't hesitate to reach out." },
  { _id: "2", question: "Do you offer tastings before the event?", answer: "Yes! For weddings and large corporate events, we offer optional tasting sessions so you can experience the menu before your event. A small tasting fee applies which is deducted from your final invoice." },
  { _id: "3", question: "Can you cater for dietary restrictions?", answer: "Absolutely. We cater for vegetarian, vegan, gluten-free, halal, and other dietary requirements. Just let us know during consultation and we'll build the menu accordingly." },
  { _id: "4", question: "What areas do you cover?", answer: "We're based in Abuja but regularly cater across Nigeria — Lagos, Port Harcourt, Ibadan, Enugu and beyond. Travel fees apply for events outside Abuja. Contact us for a custom quote." },
  { _id: "5", question: "How is payment structured?", answer: "We require a 50% deposit to secure your date, with the balance due 7 days before the event. We accept bank transfers, and can provide invoices for corporate clients." },
];

interface ServiceFAQProps {
  faq?: FAQItem[];
  items?: FAQItem[]; // alias — slug page passes items={}
}

export default function ServiceFAQ({ faq, items: itemsProp }: ServiceFAQProps) {
  const items = (faq ?? itemsProp) && (faq ?? itemsProp)!.length > 0 ? (faq ?? itemsProp)! : FALLBACK_FAQ;
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-green-500 opacity-60" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-600">FAQ</span>
            <span className="w-8 h-px bg-green-500 opacity-60" />
          </div>
          <h2 className="font-playfair text-[clamp(1.8rem,4vw,2.8rem)] font-semibold text-neutral-900">
            Common <em className="not-italic text-green-600">Questions</em>
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item) => {
            const isOpen = open === item._id;
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
                  isOpen ? "border-green-200 bg-green-50/50" : "border-neutral-100 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : item._id)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-neutral-900 pr-4">{item.question}</span>
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-green-600 text-white" : "bg-neutral-100 text-neutral-500"}`}>
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-5 text-sm text-neutral-500 font-light leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
