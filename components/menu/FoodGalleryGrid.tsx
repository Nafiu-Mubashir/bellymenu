"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { GalleryItem } from "@/types";
import { urlFor } from "@/sanity/lib/client";

// ─── Fallback placeholder tiles ───────────────────────────────────────────────
const FALLBACK_TILES = [
  { id: "1", emoji: "🍛", label: "Jollof Rice Spread",       category: "Nigerian",   bg: "bg-orange-50" },
  { id: "2", emoji: "🥂", label: "Small Chops Platter",      category: "Canapés",    bg: "bg-amber-50" },
  { id: "3", emoji: "🍖", label: "Live Suya Station",        category: "Grill",      bg: "bg-red-50" },
  { id: "4", emoji: "🎂", label: "Celebration Cake",         category: "Desserts",   bg: "bg-rose-50" },
  { id: "5", emoji: "🥩", label: "Continental Carving",      category: "Continental",bg: "bg-slate-50" },
  { id: "6", emoji: "🥣", label: "Egusi & Pounded Yam",      category: "Nigerian",   bg: "bg-green-50" },
  { id: "7", emoji: "🍹", label: "Chapman Bar Setup",        category: "Drinks",     bg: "bg-sky-50" },
  { id: "8", emoji: "🌿", label: "Outdoor Event Setup",      category: "Events",     bg: "bg-emerald-50" },
  { id: "9", emoji: "🍝", label: "Live Pasta Station",       category: "Continental",bg: "bg-yellow-50" },
];

const PHOTO_CATEGORIES = ["All", "Nigerian", "Continental", "Canapés", "Grill", "Desserts", "Drinks", "Events"];

// ─── Lightbox ────────────────────────────────────────────────────────────────
interface LightboxProps {
  tiles: typeof FALLBACK_TILES;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function Lightbox({ tiles, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const current = tiles[currentIndex];

  // Keyboard navigation
  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Image area */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative mx-16 md:mx-24 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center ${current.bg}`}>
          <div className="text-center">
            <span className="text-8xl block mb-4">{current.emoji}</span>
            <p className="text-lg font-semibold text-neutral-700">{current.label}</p>
          </div>
        </div>
        {/* Caption */}
        <div className="mt-4 text-center">
          <p className="text-white font-medium">{current.label}</p>
          <p className="text-white/40 text-sm mt-1">
            {currentIndex + 1} / {tiles.length} · {current.category}
          </p>
        </div>
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {tiles.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-6 bg-green-400" : "w-1.5 bg-white/25"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Real image tile (when Sanity data exists) ────────────────────────────────
function RealTile({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const src = urlFor(item.image);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      {src ? (
        <Image
          src={src}
          alt={item.image.alt ?? item.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-100" />
      )}
      <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/50 transition-all duration-300 flex items-center justify-center">
        <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <p className="text-xs font-semibold text-white truncate">{item.title}</p>
        <p className="text-[10px] text-white/60 capitalize">{item.category}</p>
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
  tile: (typeof FALLBACK_TILES)[0];
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={onClick}
      className={`relative aspect-square rounded-2xl overflow-hidden group cursor-pointer flex items-center justify-center ${tile.bg}`}
    >
      <div className="text-center transition-transform duration-300 group-hover:scale-110 select-none">
        <span className="text-5xl block mb-1.5">{tile.emoji}</span>
        <span className="text-xs font-medium text-neutral-500 px-2">{tile.label}</span>
      </div>
      {/* Category badge */}
      <span className="absolute top-3 right-3 text-[10px] font-semibold text-neutral-500 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white">
        {tile.category}
      </span>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/10 transition-all duration-300 rounded-2xl flex items-end justify-center pb-4">
        <ZoomIn
          size={16}
          className="text-neutral-600 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        />
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface FoodGalleryGridProps {
  items: GalleryItem[] | null;
}

export default function FoodGalleryGrid({ items }: FoodGalleryGridProps) {
  const hasRealData = items && items.length > 0;

  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // For real data — filter by category
  const filteredReal = hasRealData
    ? activeFilter === "All"
      ? items
      : items.filter((i) => i.category === activeFilter.toLowerCase())
    : [];

  // For placeholder data
  const filteredPlaceholder =
    activeFilter === "All"
      ? FALLBACK_TILES
      : FALLBACK_TILES.filter((t) => t.category === activeFilter);

  const displayTiles = hasRealData ? filteredReal : filteredPlaceholder;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % displayTiles.length));
  const prevImage = () =>
    setLightboxIndex((i) =>
      i === null ? 0 : (i - 1 + displayTiles.length) % displayTiles.length
    );

  return (
    <section className="py-24 md:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-3 mb-3 text-xs font-medium tracking-[0.18em] uppercase text-green-600">
              <span className="w-8 h-px bg-green-500 opacity-60" />
              Food Gallery
            </div>
            <h2 className="font-playfair text-[clamp(2rem,4.5vw,3rem)] font-semibold text-neutral-900 leading-tight">
              See the Food We{" "}
              <em className="not-italic text-green-600">Create</em>
            </h2>
          </div>
          <p className="text-sm text-neutral-500 font-light max-w-xs md:text-right">
            A visual taste of what we bring to your event.
          </p>
        </motion.div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PHOTO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                activeFilter === cat
                  ? "bg-green-600 border-green-600 text-white shadow-sm"
                  : "bg-white border-neutral-200 text-neutral-600 hover:border-green-400 hover:text-green-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
        >
          <AnimatePresence>
            {hasRealData
              ? (filteredReal as GalleryItem[]).map((item, i) => (
                  <RealTile
                    key={item._id}
                    item={item}
                    onClick={() => openLightbox(i)}
                  />
                ))
              : filteredPlaceholder.map((tile, i) => (
                  <PlaceholderTile
                    key={tile.id}
                    tile={tile}
                    index={i}
                    onClick={() => openLightbox(i)}
                  />
                ))}
          </AnimatePresence>
        </motion.div>

        {displayTiles.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-neutral-400 font-light text-sm">
              No photos in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            tiles={hasRealData
              ? filteredReal.map((item) => ({
                  id: item._id,
                  emoji: "🍽️",
                  label: item.title,
                  category: item.category,
                  bg: "bg-neutral-100",
                }))
              : filteredPlaceholder}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
