"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import type { GalleryItem } from "@/types";
import GalleryFilter, {
  // GALLERY_CATEGORIES,
  type GalleryCategoryId,
} from "./GalleryFilter";
import GalleryLightbox from "./GalleryLightbox";
import { IMAGES } from "@/app/lib/images";
import { urlFor } from "@/sanity/lib/image";

// ─── Fallback tiles — real Unsplash stock photos ──────────────────────────────
// Replace by uploading galleryItem documents in Sanity Studio
const FALLBACK_TILES = [
  { _id: "f1",  title: "Grand Wedding Reception",  category: "wedding",   img: IMAGES.gallery.wedding1   },
  { _id: "f2",  title: "Firewood Jollof Station",  category: "food",      img: IMAGES.gallery.food1      },
  { _id: "f3",  title: "Corporate Gala Dinner",    category: "corporate", img: IMAGES.gallery.corporate1 },
  { _id: "f4",  title: "Birthday Dessert Table",   category: "party",     img: IMAGES.gallery.party1     },
  { _id: "f5",  title: "Live Suya Station",        category: "food",      img: IMAGES.gallery.food2      },
  { _id: "f6",  title: "Outdoor Garden Wedding",   category: "wedding",   img: IMAGES.gallery.outdoor1   },
  { _id: "f7",  title: "Buffet Table Setup",       category: "setup",     img: IMAGES.gallery.setup1     },
  { _id: "f8",  title: "Cocktail Reception",       category: "party",     img: IMAGES.gallery.cocktail1  },
  { _id: "f9",  title: "Team Lunch Spread",        category: "corporate", img: IMAGES.gallery.corporate2 },
  { _id: "f10", title: "Celebration Spread",       category: "food",      img: IMAGES.gallery.food3      },
  { _id: "f11", title: "Outdoor Event Canopy",     category: "setup",     img: IMAGES.gallery.outdoor2   },
  { _id: "f12", title: "Anniversary Dinner",       category: "party",     img: IMAGES.gallery.party2     },
  { _id: "f13", title: "VIP Plating Setup",        category: "setup",     img: IMAGES.gallery.setup2     },
  { _id: "f14", title: "Egusi & Pounded Yam",      category: "food",      img: IMAGES.gallery.food4      },
  { _id: "f15", title: "Award Ceremony Dinner",    category: "corporate", img: IMAGES.gallery.wedding2   },
  { _id: "f16", title: "Small Chops Platter",      category: "food",      img: IMAGES.gallery.cocktail2  },
  { _id: "f17", title: "Floral Table Setting",     category: "wedding",   img: IMAGES.gallery.wedding3   },
  { _id: "f18", title: "Drinks Bar Setup",         category: "setup",     img: IMAGES.gallery.setup3     },
] as const;

type FallbackTile = (typeof FALLBACK_TILES)[number];

// Normalised shape passed to GalleryLightbox
type LightboxItem = {
  _id: string;
  title: string;
  category: string;
  img: string;
};

// Varying heights for CSS-columns masonry feel
const HEIGHTS = ["h-48", "h-60", "h-72", "h-52", "h-64", "h-56"];
const getHeight = (i: number) => HEIGHTS[i % HEIGHTS.length];

// ─── Real Sanity tile ─────────────────────────────────────────────────────────
function RealTile({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) {
  const src = urlFor(item.image).url();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`group relative w-full ${getHeight(index)} rounded-2xl overflow-hidden cursor-zoom-in bg-neutral-200`}
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
      <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/45 transition-all duration-300 flex items-center justify-center">
        <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" />
      </div>
      <div className="absolute bottom-0 inset-x-0 p-3 bg-linear-to-t from-neutral-950/75 to-transparent translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <p className="text-xs font-semibold text-white truncate">{item.title}</p>
        <p className="text-[10px] text-white/50 capitalize mt-0.5">{item.category}</p>
      </div>
    </motion.div>
  );
}

// ─── Stock photo tile ─────────────────────────────────────────────────────────
function StockTile({ tile, index, onClick }: { tile: FallbackTile; index: number; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`group relative w-full ${getHeight(index)} rounded-2xl overflow-hidden cursor-zoom-in bg-neutral-200`}
    >
      <Image
        src={tile.img}
        alt={tile.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Always-on subtle overlay */}
      <div className="absolute inset-0 bg-neutral-950/10" />
      {/* Category badge */}
      <span className="absolute top-3 left-3 z-10 text-[10px] font-semibold bg-neutral-950/55 backdrop-blur-sm text-white px-2.5 py-1 rounded-full capitalize">
        {tile.category}
      </span>
      {/* Hover */}
      <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/40 transition-all duration-300 flex items-center justify-center">
        <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" />
      </div>
      {/* Caption */}
      <div className="absolute bottom-0 inset-x-0 p-3 bg-linear-to-t from-neutral-950/75 to-transparent translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <p className="text-xs font-semibold text-white truncate">{tile.title}</p>
        <p className="text-[10px] text-white/50 capitalize mt-0.5">{tile.category}</p>
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

  // Category counts
  const counts = useMemo<Record<string, number>>(() => {
    const source = hasReal ? items : FALLBACK_TILES;
    return source.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    }, {});
  }, [hasReal, items]);

  // Filtered sets
  const filteredReal = useMemo<GalleryItem[]>(() => {
    if (!hasReal) return [];
    return activeCategory === "all" ? items : items.filter((i) => i.category === activeCategory);
  }, [hasReal, items, activeCategory]);

  const filteredFallback = useMemo<FallbackTile[]>(() => {
    const list = [...FALLBACK_TILES] as FallbackTile[];
    return activeCategory === "all" ? list : list.filter((i) => i.category === activeCategory);
  }, [activeCategory]);

  const displayItems = hasReal ? filteredReal : filteredFallback;
  const total = hasReal ? items.length : FALLBACK_TILES.length;

  // Build normalised lightbox items from whichever source
  const lightboxItems: LightboxItem[] = hasReal
    ? filteredReal.map((item) => ({
        _id: item._id,
        title: item.title,
        category: item.category,
        img: urlFor(item.image).url(),
      }))
    : filteredFallback.map((t) => ({
        _id: t._id,
        title: t.title,
        category: t.category,
        img: t.img,
      }));

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % displayItems.length)),
    [displayItems.length]
  );
  const prevImage = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + displayItems.length) % displayItems.length)),
    [displayItems.length]
  );

  return (
    <>
      <section id="gallery-grid" className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10">

          {/* Filter pills */}
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

          {/* Result count */}
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

          {/* CSS columns masonry */}
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
                      <StockTile tile={tile} index={i} onClick={() => openLightbox(i)} />
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
              <p className="text-neutral-500 font-light text-sm">No photos in this category yet.</p>
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

      {/* Lightbox — receives normalised items so it always has an img */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            items={lightboxItems}
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
