"use client";

import { motion } from "framer-motion";

const FALLBACK_ITEMS = [
  "Wedding Catering",
  "Corporate Events",
  "Birthday Parties",
  "Private Dinners",
  "Outdoor Events",
  "Buffet Service",
  "Live Cooking Stations",
  "Cocktail Receptions",
];

interface MarqueeBarProps {
  items?: string[];
}

export default function MarqueeBar({ items }: MarqueeBarProps) {
  const list = items && items.length > 0 ? items : FALLBACK_ITEMS;
  // Duplicate for seamless infinite loop
  const doubled = [...list, ...list, ...list];

  return (
    <div className="relative overflow-hidden bg-green-600 py-3.5 select-none w-full max-w-[100vw]" aria-hidden="true">
      {/* Fade masks on edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-green-600 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-green-600 to-transparent z-10" />

      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: [0, `-${100 / 3}%`] }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-3 px-8 text-[11px] font-semibold tracking-[0.16em] uppercase text-white/90"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
