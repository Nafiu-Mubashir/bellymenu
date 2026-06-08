"use client";

import { motion } from "framer-motion";

export const GALLERY_CATEGORIES = [
  { id: "all",       label: "All Events",   emoji: "✨", count: 0 },
  { id: "wedding",   label: "Weddings",     emoji: "💍", count: 0 },
  { id: "corporate", label: "Corporate",    emoji: "🏢", count: 0 },
  { id: "party",     label: "Parties",      emoji: "🎉", count: 0 },
  { id: "food",      label: "Food",         emoji: "🍛", count: 0 },
  { id: "setup",     label: "Setup",        emoji: "✨", count: 0 },
] as const;

export type GalleryCategoryId = (typeof GALLERY_CATEGORIES)[number]["id"];

interface GalleryFilterProps {
  active: GalleryCategoryId;
  counts: Record<string, number>;
  total: number;
  onChange: (id: GalleryCategoryId) => void;
}

export default function GalleryFilter({ active, counts, total, onChange }: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {GALLERY_CATEGORIES.map((cat) => {
        const count = cat.id === "all" ? total : (counts[cat.id] ?? 0);
        const isActive = active === cat.id;

        return (
          <motion.button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 ${
              isActive
                ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-200"
                : "bg-white border-neutral-200 text-neutral-600 hover:border-green-400 hover:text-green-700"
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
            {count > 0 && (
              <span
                className={`text-[10px] font-normal ${
                  isActive ? "text-white/70" : "text-neutral-400"
                }`}
              >
                {count}
              </span>
            )}
            {isActive && (
              <motion.span
                layoutId="gallery-filter-pill"
                className="absolute inset-0 rounded-full bg-green-600 -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
