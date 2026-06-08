"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ImageOff } from "lucide-react";
import type { GalleryItem } from "@/types";
import { urlFor } from "@/sanity/lib/client";

// ─── Fallback placeholder items ───────────────────────────────────────────────
// When Sanity images aren't available, we show tasteful placeholder tiles
const FALLBACK_ITEMS = [
  { _id: "1", title: "Wedding Banquet", category: "wedding", emoji: "🍽️", bg: "bg-green-50" },
  { _id: "2", title: "Nigerian Cuisine", category: "food", emoji: "🥘", bg: "bg-amber-50" },
  { _id: "3", title: "Corporate Setup", category: "corporate", emoji: "🏢", bg: "bg-slate-50" },
  { _id: "4", title: "Celebration Cake", category: "party", emoji: "🎂", bg: "bg-rose-50" },
  { _id: "5", title: "Outdoor Event", category: "setup", emoji: "🌿", bg: "bg-emerald-50" },
];

const CATEGORY_LABELS: Record<string, string> = {
  wedding: "Wedding",
  corporate: "Corporate",
  party: "Party",
  food: "Food",
  setup: "Setup",
};

// ─── Real image tile ──────────────────────────────────────────────────────────
function GalleryTile({
  item,
  index,
  large = false,
}: {
  item: GalleryItem;
  index: number;
  large?: boolean;
}) {
  const src = urlFor(item.image);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl ${large ? "row-span-2" : ""} group cursor-pointer`}
    >
      {src ? (
        <Image
          src={src}
          alt={item.image.alt ?? item.title}
          fill
          sizes={large ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        // Placeholder when no Sanity image yet
        <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
          <ImageOff size={24} className="text-neutral-300" />
        </div>
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/40 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <span className="text-[10px] tracking-widest uppercase text-white/70 font-medium bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {CATEGORY_LABELS[item.category] ?? item.category}
        </span>
        <p className="text-sm font-semibold text-white mt-1.5">{item.title}</p>
      </div>
    </motion.div>
  );
}

// ─── Placeholder tile (no Sanity data yet) ────────────────────────────────────
function PlaceholderTile({
  item,
  index,
  large = false,
}: {
  item: (typeof FALLBACK_ITEMS)[0];
  index: number;
  large?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl ${
        large ? "row-span-2" : ""
      } ${item.bg} group cursor-pointer flex items-center justify-center min-h-45`}
    >
      <div className="text-center transition-transform duration-300 group-hover:scale-110">
        <span className="text-5xl block mb-2">{item.emoji}</span>
        <span className="text-xs font-medium text-neutral-400 tracking-wider uppercase">
          {item.title}
        </span>
      </div>
      <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/10 transition-all duration-300 rounded-2xl" />
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
interface GalleryPreviewProps {
  items: GalleryItem[] | null;
}

export default function GalleryPreview({ items }: GalleryPreviewProps) {
  const hasRealData = items && items.length > 0;

  return (
    <section id="gallery" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-3 mb-4 text-xs font-medium tracking-[0.18em] uppercase text-green-600">
              <span className="inline-block w-8 h-px bg-green-500 opacity-60" />
              Our Gallery
            </div>
            <h2 className="font-playfair text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-neutral-900">
              A Taste of Our{" "}
              <em className="not-italic text-green-600">Best Moments</em>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-neutral-950 hover:bg-green-700 text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg shrink-0"
          >
            View full gallery
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {hasRealData ? (
            <>
              <GalleryTile item={items[0]} index={0} large />
              {items.slice(1).map((item, i) => (
                <GalleryTile key={item._id} item={item} index={i + 1} />
              ))}
            </>
          ) : (
            <>
              <PlaceholderTile item={FALLBACK_ITEMS[0]} index={0} large />
              {FALLBACK_ITEMS.slice(1).map((item, i) => (
                <PlaceholderTile key={item._id} item={item} index={i + 1} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
