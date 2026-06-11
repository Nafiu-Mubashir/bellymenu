"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Search } from "lucide-react";
import type { Testimonial } from "@/types";

// ─── Fallback data ────────────────────────────────────────────────────────────
const FALLBACK: Testimonial[] = [
  {
    _id: "1",
    name: "Adaeze Okonkwo",
    initials: "AO",
    eventType: "Wedding Reception",
    location: "Lagos",
    year: "2024",
    rating: 5,
    quote:
      "Bellymenu catered our wedding and it was absolutely flawless. Every single guest kept asking who did the food. The jollof rice alone had people going back for thirds! 10 out of 10, will absolutely use again.",
  },
  {
    _id: "2",
    name: "Tunde Martins",
    initials: "TM",
    eventType: "Corporate Annual Dinner",
    location: "Lagos",
    year: "2024",
    rating: 5,
    quote:
      "Professional, punctual, and genuinely restaurant quality. The setup was beautiful, the service was polished, and our entire team was thoroughly impressed. Will be booking every year.",
  },
  {
    _id: "3",
    name: "Funmi Kadiri",
    initials: "FK",
    eventType: "Birthday Celebration",
    location: "Lagos",
    year: "2023",
    rating: 5,
    quote:
      "My daughter's 30th birthday was magical — a huge part of that was the food. Stunning presentation, delicious everything. Our guests are still talking about it!",
  },
  {
    _id: "4",
    name: "Emeka Eze",
    initials: "EE",
    eventType: "Outdoor Graduation Party",
    location: "Port Harcourt",
    year: "2023",
    rating: 5,
    quote:
      "From the initial consultation to the last bite, Bellymenu was exceptional. They handled an outdoor event for 200+ guests without a single hitch. The variety of dishes — traditional and continental side by side — was incredible.",
  },
  {
    _id: "5",
    name: "Ngozi Adeleke",
    initials: "NA",
    eventType: "Wedding Reception",
    location: "Lagos",
    year: "2024",
    rating: 5,
    quote:
      "From the very first call to the last plate cleared, Bellymenu was exceptional. Booking was easy, the team listened carefully, and delivery was flawless. Couldn't have asked for better.",
  },
  {
    _id: "6",
    name: "Biodun Adegoke",
    initials: "BA",
    eventType: "Product Launch Event",
    location: "Lagos",
    year: "2024",
    rating: 5,
    quote:
      "For our brand's product launch, we needed catering that matched our premium positioning. Bellymenu delivered exactly that — sophisticated, beautifully presented, and absolutely delicious.",
  },
  {
    _id: "7",
    name: "Chidi Ike",
    initials: "CI",
    eventType: "Private Anniversary Dinner",
    location: "Lagos",
    year: "2023",
    rating: 5,
    quote:
      "We hosted an intimate anniversary dinner for 30 guests. The private dining experience was genuinely world-class. Chef Chiamaka is truly gifted — every course was better than the last.",
  },
  {
    _id: "8",
    name: "Yetunde Abiodun",
    initials: "YA",
    eventType: "Traditional Wedding",
    location: "Ibadan",
    year: "2024",
    rating: 5,
    quote:
      "They captured the full essence of a Yoruba traditional spread — and did it beautifully. Guests wouldn't stop talking about the amala and ewedu. Phenomenal.",
  },
  {
    _id: "9",
    name: "Kelechi Obi",
    initials: "KO",
    eventType: "Corporate Team Lunch",
    location: "Lagos",
    year: "2024",
    rating: 5,
    quote:
      "Our weekly team lunches have been transformed. Fresh, varied, and always on time. The team loves Thursdays now because of Bellymenu. Genuinely elevated our office culture.",
  },
  {
    _id: "10",
    name: "Amaka Nwofor",
    initials: "AN",
    eventType: "Baby Shower",
    location: "Enugu",
    year: "2023",
    rating: 5,
    quote:
      "They came in, set up everything beautifully, served 60 guests with warmth and professionalism, and cleaned up before we even noticed. Absolutely magical experience.",
  },
  {
    _id: "11",
    name: "Seun Banwo",
    initials: "SB",
    eventType: "Cocktail Reception",
    location: "Lagos",
    year: "2024",
    rating: 5,
    quote:
      "The small chops were out of this world. The puff puff alone was worth every naira. But honestly everything — presentation, service, quality — was exceptional from start to finish.",
  },
  {
    _id: "12",
    name: "Damilola Falade",
    initials: "DF",
    eventType: "End of Year Party",
    location: "Lagos",
    year: "2023",
    rating: 5,
    quote:
      "We hired Bellymenu for our company end-of-year party and they absolutely delivered. 150 guests, live suya station, rice buffet — everything was hot, fresh and beautiful.",
  },
];

// ─── Filter categories ────────────────────────────────────────────────────────
const FILTERS = [
  { id: "all", label: "All Reviews", emoji: "⭐" },
  { id: "wedding", label: "Weddings", emoji: "💍" },
  { id: "corporate", label: "Corporate", emoji: "🏢" },
  { id: "party", label: "Parties", emoji: "🎉" },
  { id: "private", label: "Private Dining", emoji: "🍽️" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

// ─── Avatar colours ───────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "bg-green-100 text-green-700",
  "bg-emerald-100 text-emerald-700",
  "bg-teal-100 text-teal-700",
  "bg-lime-100 text-lime-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
];

// ─── Card ─────────────────────────────────────────────────────────────────────
function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = t.quote.length > 160;
  const displayQuote =
    isLong && !expanded ? t.quote.slice(0, 155) + "…" : t.quote;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        delay: Math.min(index * 0.05, 0.3),
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group bg-white border border-neutral-100 rounded-2xl p-6 flex flex-col gap-4 hover:border-green-200 hover:shadow-lg hover:shadow-green-50/80 transition-all duration-300"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <Quote
          size={22}
          className="text-green-400/40 flex-shrink-0 mt-0.5 group-hover:text-green-500/60 transition-colors"
        />
        {/* Stars */}
        <div className="flex gap-0.5 flex-shrink-0">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="flex-1">
        <p className="text-sm text-neutral-600 font-light leading-[1.85] italic">
          "{displayQuote}"
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded((p) => !p)}
            className="text-xs text-green-600 hover:text-green-700 font-medium mt-2 transition-colors"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
            AVATAR_COLORS[parseInt(t._id, 10) % AVATAR_COLORS.length] ??
            AVATAR_COLORS[0]
          }`}
        >
          {t.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-neutral-900 truncate">
            {t.name}
          </p>
          <p className="text-[11px] text-neutral-400 font-light truncate">
            {t.eventType} · {t.location}, {t.year}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface TestimonialsGridProps {
  testimonials: Testimonial[] | null;
}

export default function TestimonialsGrid({
  testimonials,
}: TestimonialsGridProps) {
  const list =
    testimonials && testimonials.length > 0 ? testimonials : FALLBACK;

  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  // Filter + search
  const filtered = useMemo(() => {
    let items = list;

    if (activeFilter !== "all") {
      items = items.filter((t) =>
        t.eventType.toLowerCase().includes(activeFilter.toLowerCase()),
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (t) =>
          t.quote.toLowerCase().includes(q) ||
          t.name.toLowerCase().includes(q) ||
          t.eventType.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q),
      );
    }

    return items;
  }, [list, activeFilter, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section
      id="reviews"
      className="py-16 md:py-24 bg-neutral-50 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-3 mb-3 text-xs font-medium tracking-[0.18em] uppercase text-green-600">
              <span className="w-8 h-px bg-green-500 opacity-60" />
              All Reviews
            </div>
            <h2 className="font-playfair text-[clamp(2rem,4vw,2.8rem)] font-semibold text-neutral-900 leading-tight">
              {filtered.length}{" "}
              <em className="not-italic text-green-600">
                {filtered.length === 1 ? "Review" : "Reviews"}
              </em>
            </h2>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Search reviews…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(9);
              }}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-neutral-200 rounded-full text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <motion.button
              key={f.id}
              onClick={() => {
                setActiveFilter(f.id);
                setVisibleCount(9);
              }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                activeFilter === f.id
                  ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-200"
                  : "bg-white border-neutral-200 text-neutral-600 hover:border-green-400 hover:text-green-700"
              }`}
            >
              <span>{f.emoji}</span>
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => (
              <TestimonialCard key={t._id} t={t} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-neutral-500 font-light text-sm">
              No reviews match your search.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("all");
              }}
              className="mt-3 text-xs text-green-600 hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Load more */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setVisibleCount((p) => p + 6)}
              className="inline-flex items-center gap-2 border border-neutral-200 hover:border-green-500 text-sm font-semibold text-neutral-600 hover:text-green-700 px-8 py-3.5 rounded-full transition-all hover:bg-green-50"
            >
              Load more reviews
              <span className="text-neutral-400 font-normal">
                ({filtered.length - visibleCount} remaining)
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
