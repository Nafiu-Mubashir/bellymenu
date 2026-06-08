"use client";

import { motion } from "framer-motion";

interface SignatureDish {
  emoji: string;
  name: string;
  origin: string;
  description: string;
  tags: string[];
  accentColor: string;
  lightBg: string;
}

const SIGNATURE_DISHES: SignatureDish[] = [
  {
    emoji: "🍚",
    name: "Firewood Jollof Rice",
    origin: "Nigerian Classic",
    description:
      "Slow-cooked over real firewood in the traditional party style. The smoky, rich base tomato sauce is our most-requested dish — guests always come back for more.",
    tags: ["Halal", "Most Requested", "Buffet"],
    accentColor: "text-orange-600",
    lightBg: "bg-orange-50 border-orange-100",
  },
  {
    emoji: "🍖",
    name: "Live Suya Station",
    origin: "Northern Nigerian",
    description:
      "Tender beef marinated in our house yaji spice blend and grilled live at your event. Served with fresh onions, tomatoes, and newspaper wrap for that authentic roadside feel.",
    tags: ["Halal", "Live Station", "Gluten-Free"],
    accentColor: "text-red-600",
    lightBg: "bg-red-50 border-red-100",
  },
  {
    emoji: "🥣",
    name: "Egusi Soup & Swallow",
    origin: "Southern Nigerian",
    description:
      "Stone-ground melon seed soup, slow-cooked with assorted meats in palm oil. Served with pounded yam, eba, or semolina — the kind that makes you feel at home.",
    tags: ["Traditional", "Gluten-Free", "Halal"],
    accentColor: "text-green-700",
    lightBg: "bg-green-50 border-green-100",
  },
  {
    emoji: "🥂",
    name: "Small Chops Platter",
    origin: "Nigerian Party Staple",
    description:
      "Our premium small chops selection: puff puff, spring rolls, samosa, peppered gizzard, and mini jollof cups — beautifully presented and passed by uniformed staff.",
    tags: ["Cocktail Reception", "Popular", "Customisable"],
    accentColor: "text-amber-600",
    lightBg: "bg-amber-50 border-amber-100",
  },
];

export default function SignatureDishes() {
  return (
    <section className="py-24 md:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <span className="w-8 h-px bg-green-500 opacity-60" />
            <span className="text-xs font-medium tracking-[0.18em] uppercase text-green-600">
              The Fan Favourites
            </span>
            <span className="w-8 h-px bg-green-500 opacity-60" />
          </div>
          <h2 className="font-playfair text-[clamp(2rem,4.5vw,3rem)] font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-4">
            Our Signature{" "}
            <em className="not-italic text-green-600">Dishes</em>
          </h2>
          <p className="text-neutral-500 font-light leading-relaxed text-[15px]">
            These are the dishes guests talk about long after the event. Each one
            has been refined over hundreds of events to be exactly right.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SIGNATURE_DISHES.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`group border rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${dish.lightBg}`}
            >
              {/* Emoji */}
              <motion.div
                className="text-5xl"
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut" }}
              >
                {dish.emoji}
              </motion.div>

              {/* Origin badge */}
              <span className={`text-[10px] font-semibold tracking-widest uppercase ${dish.accentColor}`}>
                {dish.origin}
              </span>

              {/* Name */}
              <h3 className="font-playfair text-xl font-semibold text-neutral-900 leading-snug">
                {dish.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-neutral-600 font-light leading-relaxed flex-1">
                {dish.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {dish.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium bg-white/70 border border-white px-2.5 py-1 rounded-full text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
