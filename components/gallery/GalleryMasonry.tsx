"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import type { GalleryItem } from "@/types";
import GalleryFilter, {
  GALLERY_CATEGORIES,
  type GalleryCategoryId,
} from "./GalleryFilter";
import GalleryLightbox from "./GalleryLightbox";
import { urlFor } from "@/sanity/lib/client";

// ─── Rich fallback tiles ──────────────────────────────────────────────────────
const FALLBACK_TILES = [
  { _id: "f1",  title: "Grand Wedding Reception",    category: "wedding",   emoji: "💍", bg: "bg-green-50",    span: "row-span-2" },
  { _id: "f2",  title: "Firewood Jollof Station",    category: "food",      emoji: "🍛", bg: "bg-amber-50",    span: "" },
  { _id: "f3",  title: "Corporate Gala Dinner",      category: "corporate", emoji: "🏢", bg: "bg-slate-50",    span: "" },
  { _id: "f4",  title: "Birthday Dessert Table",     category: "party",     emoji: "🎂", bg: "bg-rose-50",     span: "row-span-2" },
  { _id: "f5",  title: "Live Suya Station",          category: "food",      emoji: "🍖", bg: "bg-orange-50",   span: "" },
  { _id: "f6",  title: "Outdoor Garden Wedding",     category: "wedding",   emoji: "🌸", bg: "bg-pink-50",     span: "" },
  { _id: "f7",  title: "Buffet Table Setup",         category: "setup",     emoji: "✨", bg: "bg-purple-50",   span: "row-span-2" },
  { _id: "f8",  title: "Cocktail Reception",         category: "party",     emoji: "🥂", bg: "bg-yellow-50",   span: "" },
  { _id: "f9",  title: "Team Lunch Spread",          category: "corporate", emoji: "👔", bg: "bg-blue-50",     span: "" },
  { _id: "f10", title: "Celebration Cake",           category: "food",      emoji: "🎂", bg: "bg-fuchsia-50",  span: "" },
  { _id: "f11", title: "Outdoor Event Canopy",       category: "setup",     emoji: "🌿", bg: "bg-emerald-50",  span: "" },
  { _id: "f12", title: "Anniversary Dinner",         category: "party",     emoji: "🕯️", bg: "bg-neutral-50",  span: "" },
  { _id: "f13", title: "VIP Plating Setup",          category: "setup",     emoji: "🍽️", bg: "bg-teal-50",    span: "row-span-2" },
  { _id: "f14", title: "Egusi & Pounded Yam",        category: "food",      emoji: "🥣", bg: "bg-lime-50",     span: "" },
  { _id: "f15", title: "Award Ceremony Dinner",      category: "corporate", emoji: "🏆", bg: "bg-amber-50",    span: "" },
  { _id: "f16", title: "Small Chops Platter",        category: "food",      emoji: "🥂", bg: "bg-green-50",    span: "" },
  { _id: "f17", title: "Floral Table Setting",       category: "wedding",   emoji: "🌷", bg: "bg-rose-50",     span: "" },
  { _id: "f18", title: "Drinks Bar Setup",           category: "setup",     emoji: "🍹", bg: "bg-sky-50",      span: "" },
] as const;

type FallbackTile = (typeof FALLBACK_TILES)[number] & { span?: string };

// ─── Tile heights for masonry variety ────────────────────────────────────────
const HEIGHTS = ["h-48", "h-60", "h-72", "h-52", "h-64", "h-56"];
function getHeight(index: number): string {
  return HEIGHTS[index % HEIGHTS.length];
}

// ─── Real item tile ───────────────────────────────────────────────────────────
function RealTile({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const src = urlFor(item.image);
  const height = getHeight(index);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`group relative w-full ${height} rounded-2xl overflow-hidden cursor-zoom-in bg-neutral-100`}
    >
      {src && (
        <Image
          src={src}
          alt={item.image?.alt ?? item.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/45 transition-all duration-300 flex flex-col items-center justify-center gap-2">
        <ZoomIn
          size={22}
          className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
        />
      </div>
      {/* Caption */}
      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-neutral-950/75 to-transparent translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <p className="text-xs font-semibold text-white truncate">{item.title}</p>
        <p className="text-[10px] text-white/50 capitalize mt-0.5">{item.category}</p>
      </div>
    </motion.div>
  );
}

// ─── Placeholder tile ─────────────────────────────────────────────────────────
function PlaceholderTile({
  tile,
  index,
  onClick,
}: {
  tile: FallbackTile;
  index: number;
  onClick: () => void;
}) {
  const height = getHeight(index);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`group relative w-full ${height} rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center ${tile.bg} border border-white`}
    >
      <div className="text-center transition-transform duration-300 group-hover:scale-105 select-none px-4">
        <motion.span
          className="text-5xl block mb-2 leading-none"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 + (index % 3), ease: "easeInOut" }}
        >
          {tile.emoji}
        </motion.span>
        <p className="text-xs font-semibold text-neutral-600 leading-tight">{tile.title}</p>
        <p className="text-[10px] text-neutral-400 capitalize mt-0.5">{tile.category}</p>
      </div>

      {/* Category badge */}
      <span className="absolute top-3 left-3 text-[10px] font-semibold bg-white/80 backdrop-blur-sm text-neutral-500 px-2.5 py-1 rounded-full capitalize border border-white/60">
        {tile.category}
      </span>

      {/* Hover */}
      <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/8 transition-all duration-300 rounded-2xl flex items-end justify-center pb-3">
        <ZoomIn
          size={15}
          className="text-neutral-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 mb-1"
        />
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface GalleryMasonryProps {
  items: GalleryItem[] | null;
}

export default function GalleryMasonry({ items }: GalleryMasonryProps) {
  const hasReal = items && items.length > 0;

  const [activeCategory, setActiveCategory] = useState<GalleryCategoryId>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Build category counts
  const counts = useMemo<Record<string, number>>(() => {
    const source = hasReal ? items : FALLBACK_TILES;
    return source.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    }, {});
  }, [hasReal, items]);

  // Filtered items
  const filteredReal = useMemo<GalleryItem[]>(() => {
    if (!hasReal) return [];
    return activeCategory === "all"
      ? items
      : items.filter((i) => i.category === activeCategory);
  }, [hasReal, items, activeCategory]);

  const filteredFallback = useMemo<FallbackTile[]>(() => {
    const list = [...FALLBACK_TILES] as FallbackTile[];
    return activeCategory === "all"
      ? list
      : list.filter((i) => i.category === activeCategory);
  }, [activeCategory]);

  const displayItems = hasReal ? filteredReal : filteredFallback;
  const total = hasReal ? items.length : FALLBACK_TILES.length;

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % displayItems.length)),
    [displayItems.length]
  );
  const prevImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? 0 : (i - 1 + displayItems.length) % displayItems.length
      ),
    [displayItems.length]
  );

  return (
    <>
      <section id="gallery-grid" className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10">

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <GalleryFilter
              active={activeCategory}
              counts={counts}
              total={total}
              onChange={setActiveCategory}
            />
          </motion.div>

          {/* Results count */}
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-neutral-400 font-light mb-8 tracking-wide"
          >
            Showing{" "}
            <span className="text-neutral-700 font-medium">{displayItems.length}</span>{" "}
            {displayItems.length === 1 ? "photo" : "photos"}
            {activeCategory !== "all" && (
              <>
                {" "}in{" "}
                <span className="text-green-600 font-medium capitalize">{activeCategory}</span>
              </>
            )}
          </motion.p>

          {/* Masonry grid — CSS columns approach for true masonry */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            <AnimatePresence>
              {hasReal
                ? filteredReal.map((item, i) => (
                    <div key={item._id} className="break-inside-avoid">
                      <RealTile item={item} index={i} onClick={() => openLightbox(i)} />
                    </div>
                  ))
                : filteredFallback.map((tile, i) => (
                    <div key={tile._id} className="break-inside-avoid">
                      <PlaceholderTile tile={tile} index={i} onClick={() => openLightbox(i)} />
                    </div>
                  ))}
            </AnimatePresence>
          </div>

          {displayItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <p className="text-5xl mb-4">📷</p>
              <p className="text-neutral-500 font-light text-sm">
                No photos in this category yet.
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-4 text-xs text-green-600 hover:underline"
              >
                View all photos
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            items={
              hasReal
                ? filteredReal
                : filteredFallback.map((t) => ({
                    _id: t._id,
                    title: t.title,
                    category: t.category,
                    emoji: t.emoji,
                    bg: t.bg,
                  }))
            }
            index={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}
