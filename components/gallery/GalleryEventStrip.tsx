"use client";

import { motion } from "framer-motion";

// A quick visual summary row — event types with counts
const EVENT_TYPES = [
  { emoji: "💍", label: "Weddings",       count: "200+", description: "From intimate ceremonies to grand receptions" },
  { emoji: "🏢", label: "Corporate",      count: "120+", description: "Galas, lunches, product launches & away-days" },
  { emoji: "🎉", label: "Celebrations",   count: "150+", description: "Birthdays, anniversaries, graduations" },
  { emoji: "🍽️", label: "Private Dining", count: "80+",  description: "Exclusive chef experiences at home or venue" },
];

export default function GalleryEventStrip() {
  return (
    <section className="py-16 bg-neutral-50 border-y border-neutral-100">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {EVENT_TYPES.map((event, i) => (
            <motion.div
              key={event.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group text-center p-5 rounded-2xl bg-white border border-neutral-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-50 transition-all duration-300"
            >
              <motion.div
                className="text-4xl mb-3"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: "easeInOut" }}
              >
                {event.emoji}
              </motion.div>
              <p className="font-playfair text-2xl font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">
                {event.count}
              </p>
              <p className="text-sm font-semibold text-neutral-700 mt-0.5">{event.label}</p>
              <p className="text-xs text-neutral-400 font-light mt-1.5 leading-snug">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
