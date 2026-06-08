"use client";

import { motion } from "framer-motion";

interface Value {
  icon: string;
  title: string;
  description: string;
  color: string;
  lightColor: string;
}

const VALUES: Value[] = [
  {
    icon: "🌿",
    title: "Fresh Every Time",
    description:
      "We source ingredients locally and prepare everything fresh on the day. No freezers, no shortcuts — just honest, quality food.",
    color: "text-green-700",
    lightColor: "bg-green-50 border-green-100",
  },
  {
    icon: "🤝",
    title: "People First",
    description:
      "We see every client as a partner, not just a booking. Your vision drives everything we do — from menu design to the last plate cleared.",
    color: "text-blue-700",
    lightColor: "bg-blue-50 border-blue-100",
  },
  {
    icon: "🏆",
    title: "Excellence in Detail",
    description:
      "The difference between good and outstanding is in the details. We obsess over presentation, timing, temperature, and service quality.",
    color: "text-amber-700",
    lightColor: "bg-amber-50 border-amber-100",
  },
  {
    icon: "🌍",
    title: "Proudly Nigerian",
    description:
      "We celebrate Nigerian culinary heritage in everything we cook. Our menus honour local ingredients, traditional techniques, and bold flavours.",
    color: "text-emerald-700",
    lightColor: "bg-emerald-50 border-emerald-100",
  },
  {
    icon: "♻️",
    title: "Sustainable Practices",
    description:
      "We minimise waste, support local farmers and suppliers, and are committed to sustainable sourcing across all our menus.",
    color: "text-teal-700",
    lightColor: "bg-teal-50 border-teal-100",
  },
  {
    icon: "✨",
    title: "Joy in Every Bite",
    description:
      "Ultimately we are in the business of joy. When your guests leave full, satisfied and talking about the food — that's our win.",
    color: "text-purple-700",
    lightColor: "bg-purple-50 border-purple-100",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4 text-xs font-medium tracking-[0.18em] uppercase text-green-600">
            <span className="w-8 h-px bg-green-500 opacity-60" />
            What Drives Us
            <span className="w-8 h-px bg-green-500 opacity-60" />
          </div>
          <h2 className="font-playfair text-[clamp(2rem,4.5vw,3rem)] font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-4">
            The Values We Cook{" "}
            <em className="not-italic text-green-600">By</em>
          </h2>
          <p className="text-neutral-500 font-light leading-relaxed text-[15px]">
            These aren't just words on a wall — they're the principles our team lives by in every kitchen, at every event.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative border rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${value.lightColor}`}
            >
              {/* Icon */}
              <div className="text-3xl mb-5">{value.icon}</div>

              {/* Title */}
              <h3 className={`text-base font-semibold mb-3 ${value.color}`}>
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
