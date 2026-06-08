"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Platform {
  name: string;
  rating: number;
  count: string;
  icon: string;
  color: string;
  bg: string;
}

const PLATFORMS: Platform[] = [
  { name: "Google",    rating: 5.0, count: "80+ reviews",  icon: "G",  color: "text-blue-600",   bg: "bg-blue-50   border-blue-100" },
  { name: "Instagram", rating: 5.0, count: "200+ mentions", icon: "📸", color: "text-pink-600",   bg: "bg-pink-50   border-pink-100" },
  { name: "Facebook",  rating: 5.0, count: "60+ reviews",  icon: "f",  color: "text-blue-700",   bg: "bg-blue-50   border-blue-100" },
  { name: "WhatsApp",  rating: 5.0, count: "Direct clients",icon: "💬", color: "text-green-600",  bg: "bg-green-50  border-green-100" },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-neutral-200"}
        />
      ))}
    </div>
  );
}

export default function PlatformRatings() {
  return (
    <section className="py-16 bg-white border-t border-neutral-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-3 justify-center">
            <span className="w-8 h-px bg-green-500 opacity-60" />
            <span className="text-xs font-medium tracking-[0.18em] uppercase text-green-600">
              Rated Across All Platforms
            </span>
            <span className="w-8 h-px bg-green-500 opacity-60" />
          </div>
          <h2 className="font-playfair text-[clamp(1.8rem,4vw,2.6rem)] font-semibold text-neutral-900 leading-tight">
            Consistently <em className="not-italic text-green-600">5 Stars</em> Everywhere
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PLATFORMS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`group border rounded-2xl p-5 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${p.bg}`}
            >
              {/* Platform icon */}
              <div className={`text-2xl font-bold mb-3 ${p.color} ${p.icon.length === 1 ? "font-serif text-3xl" : ""}`}>
                {p.icon}
              </div>

              <p className="text-sm font-semibold text-neutral-800 mb-2">{p.name}</p>

              {/* Stars */}
              <div className="flex justify-center mb-2">
                <StarRow rating={p.rating} />
              </div>

              {/* Rating number */}
              <p className="font-playfair text-2xl font-semibold text-neutral-900">
                {p.rating.toFixed(1)}
              </p>

              <p className="text-[11px] text-neutral-500 font-light mt-1">{p.count}</p>
            </motion.div>
          ))}
        </div>

        {/* Overall badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 bg-neutral-950 rounded-2xl px-8 py-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="font-playfair text-3xl font-semibold text-white">5.0</p>
          </div>
          <div className="sm:border-l sm:border-white/10 sm:pl-4">
            <p className="text-sm font-semibold text-white">Overall Rating</p>
            <p className="text-xs text-white/40 font-light">Across 340+ verified reviews</p>
          </div>
          <div className="sm:border-l sm:border-white/10 sm:pl-4 text-center sm:text-left">
            <p className="text-xs text-white/50 font-light max-w-[200px] leading-relaxed">
              Based on real reviews collected across Google, Instagram, Facebook and direct client feedback.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
