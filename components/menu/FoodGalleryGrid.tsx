"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { GalleryItem } from "@/types";
import { IMAGES } from "@/app/lib/images";
import { urlFor } from "@/sanity/lib/image";

// ─── Fallback stock-photo tiles ───────────────────────────────────────────────
// Replace by uploading galleryItem documents in Sanity Studio
const FALLBACK_TILES = [
  { id: "1", label: "Jollof Rice Spread",   category: "Nigerian",    img: IMAGES.gallery.food1      },
  { id: "2", label: "Small Chops Platter",  category: "Canapés",     img: IMAGES.gallery.cocktail1  },
  { id: "3", label: "Live Suya Station",    category: "Grill",       img: IMAGES.gallery.food2      },
  { id: "4", label: "Celebration Setup",    category: "Desserts",    img: IMAGES.gallery.party1     },
  { id: "5", label: "Continental Carving",  category: "Continental", img: IMAGES.gallery.corporate1 },
  { id: "6", label: "Egusi & Pounded Yam",  category: "Nigerian",    img: IMAGES.gallery.food4      },
  { id: "7", label: "Chapman Bar Setup",    category: "Drinks",      img: IMAGES.gallery.cocktail2  },
  { id: "8", label: "Outdoor Event Setup",  category: "Events",      img: IMAGES.gallery.outdoor1   },
  { id: "9", label: "Live Pasta Station",   category: "Continental", img: IMAGES.gallery.setup1     },
];

type FallbackTile = (typeof FALLBACK_TILES)[0];
type LightboxItem = { id: string; label: string; category: string; img: string };

const PHOTO_CATEGORIES = ["All", "Nigerian", "Continental", "Canapés", "Grill", "Desserts", "Drinks", "Events"];

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  items: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const current = items[currentIndex];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  if (!current) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 bg-neutral-950/96 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${current.label}`}
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
        className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 border border-white/10 hover:border-white/25 flex items-center justify-center text-white transition-all z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Main image */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, scale: 0.94, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-16 md:mx-24 w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-800" style={{ aspectRatio: "4/3" }}>
          <Image
            src={current.img}
            alt={current.label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 70vw"
            priority
          />
        </div>
        {/* Caption */}
        <div className="mt-4 text-center">
          <p className="text-sm font-semibold text-white">{current.label}</p>
          <p className="text-xs text-white/35 mt-1 font-light">
            {currentIndex + 1} / {items.length} · {current.category}
          </p>
        </div>
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 border border-white/10 hover:border-white/25 flex items-center justify-center text-white transition-all z-10"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot strip */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {items.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-5 h-1.5 bg-green-400" : "w-1.5 h-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Real Sanity tile ─────────────────────────────────────────────────────────
function RealTile({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const src = urlFor(item.image).url();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative aspect-square rounded-2xl overflow-hidden group cursor-zoom-in bg-neutral-100"
      onClick={onClick}
    >
      {src && (
        <Image
          src={src}
          alt={item.image.alt ?? item.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/45 transition-all duration-300 flex items-center justify-center">
        <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300" />
      </div>
      <div className="absolute bottom-0 inset-x-0 p-3 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <p className="text-xs font-semibold text-white truncate">{item.title}</p>
        <p className="text-[10px] text-white/55 capitalize">{item.category}</p>
      </div>
    </motion.div>
  );
}

// ─── Stock photo tile ─────────────────────────────────────────────────────────
function StockTile({ tile, index, onClick }: { tile: FallbackTile; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      onClick={onClick}
      className="relative aspect-square rounded-2xl overflow-hidden group cursor-zoom-in bg-neutral-100"
    >
      <Image
        src={tile.img}
        alt={tile.label}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Permanent light overlay */}
      <div className="absolute inset-0 bg-neutral-950/10" />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/40 transition-all duration-300 flex items-center justify-center">
        <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300" />
      </div>
      {/* Category badge */}
      <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold text-white bg-neutral-950/55 backdrop-blur-sm px-2 py-0.5 rounded-full">
        {tile.category}
      </span>
      {/* Caption on hover */}
      <div className="absolute bottom-0 inset-x-0 p-3 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <p className="text-xs font-semibold text-white truncate">{tile.label}</p>
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

  const filteredReal = hasRealData
    ? activeFilter === "All" ? items : items.filter((i) => i.category === activeFilter.toLowerCase())
    : [];

  const filteredFallback =
    activeFilter === "All" ? FALLBACK_TILES : FALLBACK_TILES.filter((t) => t.category === activeFilter);

  const displayItems = hasRealData ? filteredReal : filteredFallback;

  // Build normalised lightbox items from whichever source
  const lightboxItems: LightboxItem[] = hasRealData
    ? filteredReal.map((item) => ({
        id: item._id,
        label: item.title,
        category: item.category,
        img: urlFor(item.image).url(),
      }))
    : filteredFallback.map((t) => ({
        id: t.id,
        label: t.label,
        category: t.category,
        img: t.img,
      }));

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % displayItems.length));
  const prevImage = () => setLightboxIndex((i) => i === null ? 0 : (i - 1 + displayItems.length) % displayItems.length);

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

        {/* Filter pills */}
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <AnimatePresence>
            {hasRealData
              ? filteredReal.map((item, i) => (
                  <RealTile key={item._id} item={item} onClick={() => openLightbox(i)} />
                ))
              : filteredFallback.map((tile, i) => (
                  <StockTile key={tile.id} tile={tile} index={i} onClick={() => openLightbox(i)} />
                ))}
          </AnimatePresence>
        </div>

        {displayItems.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-neutral-400 font-light text-sm">No photos in this category yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={lightboxItems}
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
