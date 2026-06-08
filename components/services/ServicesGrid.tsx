"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";

const FALLBACK_SERVICES: Service[] = [
  {
    _id: "1", icon: "💍", title: "Wedding Catering", order: 1,
    slug: { _type: "slug", current: "wedding-catering" },
    description: "Elegant, multi-course menus for your perfect day — from intimate ceremonies to grand receptions honouring Nigerian and continental traditions.",
    heroTagline: "Where every bite tells your love story",
  },
  {
    _id: "2", icon: "🏢", title: "Corporate Events", order: 2,
    slug: { _type: "slug", current: "corporate-events" },
    description: "Professional catering that reflects your brand — boardroom lunches, galas, product launches and away-days handled with absolute precision.",
    heroTagline: "Impressive food. Seamless service.",
  },
  {
    _id: "3", icon: "🎉", title: "Parties & Celebrations", order: 3,
    slug: { _type: "slug", current: "parties" },
    description: "Birthdays, anniversaries, graduations — make every milestone unforgettable with flexible menus for any theme, size, and style.",
    heroTagline: "Because every milestone deserves a feast",
  },
  {
    _id: "4", icon: "🍽️", title: "Private Dining", order: 4,
    slug: { _type: "slug", current: "private-dining" },
    description: "An exclusive chef-crafted experience delivered to your home or private venue — intimate, indulgent, and completely personal.",
    heroTagline: "A restaurant experience, in your own space",
  },
  {
    _id: "5", icon: "🌿", title: "Outdoor Events", order: 5,
    slug: { _type: "slug", current: "outdoor-events" },
    description: "Garden parties, picnics, outdoor weddings — we bring our full professional setup to any location and deliver the same exceptional quality.",
    heroTagline: "Great food, wherever the occasion takes you",
  },
  {
    _id: "6", icon: "🥂", title: "Cocktail Receptions", order: 6,
    slug: { _type: "slug", current: "cocktail-receptions" },
    description: "Curated canapés, live food stations, and premium service for sophisticated pre-dinner receptions or standalone cocktail events.",
    heroTagline: "Sophisticated bites for memorable evenings",
  },
];

interface ServicesGridProps {
  services: Service[] | null;
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const list = services && services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-3 mb-3 text-xs font-medium tracking-[0.18em] uppercase text-green-600">
              <span className="w-7 h-px bg-green-500 opacity-60" />
              All Services
            </div>
            <h2 className="font-playfair text-[clamp(1.8rem,4vw,2.8rem)] font-semibold text-neutral-900 leading-tight">
              Choose Your{" "}
              <em className="not-italic text-green-600">Experience</em>
            </h2>
          </div>
          <p className="text-sm text-neutral-500 font-light max-w-sm md:text-right leading-relaxed">
            Every service includes a free consultation, custom menu design, and full event management.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/services/${service.slug.current}`}
                className="group relative flex flex-col h-full bg-white rounded-2xl border border-neutral-100 p-8 hover:border-green-200 hover:shadow-xl hover:shadow-green-50/80 transition-all duration-300 overflow-hidden"
              >
                {/* Top accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Bottom-right decorative blob */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-green-50 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-green-50 group-hover:bg-green-100 flex items-center justify-center text-3xl mb-6 transition-colors duration-200 flex-shrink-0 relative z-10">
                  {service.icon}
                </div>

                {/* Title */}
                <h2 className="font-playfair text-xl font-semibold text-neutral-900 mb-2 leading-snug group-hover:text-green-800 transition-colors duration-200 relative z-10">
                  {service.title}
                </h2>

                {/* Tagline */}
                {service.heroTagline && (
                  <p className="text-[11px] font-semibold text-green-600 tracking-widest uppercase mb-3 relative z-10">
                    {service.heroTagline}
                  </p>
                )}

                {/* Description */}
                <p className="text-sm text-neutral-500 leading-relaxed font-light flex-1 mb-6 relative z-10">
                  {service.description}
                </p>

                {/* CTA row */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2 text-xs font-semibold text-green-600 group-hover:text-green-700 tracking-wide uppercase">
                    Explore service
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1.5 duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
