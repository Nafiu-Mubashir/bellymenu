"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";
import type { GalleryItem } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface FallbackTile {
  _id: string;
  title: string;
  category: string;
  emoji: string;
  bg: string;
}

type AnyTile = GalleryItem | FallbackTile;

function isRealItem(item: AnyTile): item is GalleryItem {
  return "image" in item;
}

interface GalleryLightboxProps {
  items: AnyTile[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  wedding: "Wedding",
  corporate: "Corporate",
  party: "Party",
  food: "Food",
  setup: "Setup",
};

export default function GalleryLightbox({
  items,
  index,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  const current = items[index];

  // Keyboard navigation
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

  const isReal = isRealItem(current);
  const imgSrc = isReal ? urlFor((current as GalleryItem).image).url() : null;
  const categoryLabel = CATEGORY_LABELS[current.category] ?? current.category;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/97 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${current.title}`}
    >
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-5 py-4 bg-gradient-to-b from-neutral-950/80 to-transparent">
        {/* Left: title + category */}
        <div>
          <p className="text-sm font-semibold text-white">{current.title}</p>
          <p className="text-xs text-white/40 mt-0.5">{categoryLabel}</p>
        </div>

        {/* Right: actions + close */}
        <div className="flex items-center gap-2">
          {isReal && imgSrc && (
            <>
              <a
                href={imgSrc}
                download
                onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all"
                aria-label="Download"
                title="Download"
              >
                <Download size={15} />
              </a>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (navigator.share) {
                    navigator.share({ title: current.title, url: imgSrc });
                  }
                }}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all"
                aria-label="Share"
                title="Share"
              >
                <Share2 size={14} />
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/20 flex items-center justify-center text-white transition-all ml-1"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Prev button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 flex items-center justify-center text-white transition-all border border-white/10 hover:border-white/25"
        aria-label="Previous image"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Main image area */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.94, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: -8 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-16 md:mx-20 w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {isReal && imgSrc ? (
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: "16/10" }}
          >
            <Image
              src={imgSrc}
              alt={(current as GalleryItem).image?.alt ?? current.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 75vw"
              priority
            />
          </div>
        ) : (
          // Placeholder when no real image
          <div
            className={`w-full rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl ${(current as FallbackTile).bg}`}
            style={{ aspectRatio: "16/10" }}
          >
            <div className="text-center select-none">
              <span className="text-[100px] block mb-4 leading-none">
                {(current as FallbackTile).emoji}
              </span>
              <p className="text-xl font-semibold text-neutral-600">{current.title}</p>
              <p className="text-sm text-neutral-400 mt-1">{categoryLabel}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 flex items-center justify-center text-white transition-all border border-white/10 hover:border-white/25"
        aria-label="Next image"
      >
        <ChevronRight size={22} />
      </button>

      {/* Bottom: counter + dot strip */}
      <div className="absolute bottom-0 inset-x-0 z-10 flex flex-col items-center gap-3 pb-6 bg-gradient-to-t from-neutral-950/80 to-transparent pt-8">
        {/* Dot strip — max 12 visible */}
        <div className="flex items-center gap-1.5">
          {items.slice(0, 12).map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? "w-5 h-1.5 bg-green-400"
                  : "w-1.5 h-1.5 bg-white/20"
              }`}
            />
          ))}
          {items.length > 12 && (
            <span className="text-white/30 text-xs ml-1">…</span>
          )}
        </div>
        {/* Counter */}
        <p className="text-xs text-white/30 font-light tracking-widest">
          {index + 1} / {items.length}
        </p>
      </div>
    </motion.div>
  );
}
