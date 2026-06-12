"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { IMAGES } from "@/app/lib/images";
import { urlFor } from "@/sanity/lib/image";

// ─── Fallback stock cover per service slug ────────────────────────────────────
// Sanity: add a coverImage field to each service document to override these.
const SERVICE_COVERS: Record<string, string> = {
  "wedding-catering":    IMAGES.services.wedding,
  "corporate-events":    IMAGES.services.corporate,
  "parties":             IMAGES.services.parties,
  "private-dining":      IMAGES.services.privateDining,
  "outdoor-events":      IMAGES.services.outdoorEvents,
  "cocktail-receptions": IMAGES.services.cocktail,
};

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
          {list.map((service, i) => {
            // Prefer Sanity coverImage → then slug-matched stock → then services hero
            const sanityUrl = service.coverImage ? urlFor(service.coverImage).url() : null;
            const imgSrc = sanityUrl ?? SERVICE_COVERS[service.slug.current] ?? IMAGES.hero.services;

            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/services/${service.slug.current}`}
                  className="group relative flex flex-col h-full bg-white rounded-2xl border border-neutral-100 hover:border-green-200 hover:shadow-xl hover:shadow-green-50/80 transition-all duration-300 overflow-hidden"
                >
                  {/* ── Cover photo ── */}
                  <div className="relative h-48 overflow-hidden bg-neutral-200">
                    <Image
                      src={imgSrc}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Gradient — fades to white card background below */}
                    <div className="absolute inset-0 bg-linear-to-t from-white via-white/10 to-transparent" />

                    {/* Icon badge — floated bottom-left over the photo */}
                    <div className="absolute bottom-3 left-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-2xl border border-white">
                      {service.icon}
                    </div>
                  </div>

                  {/* ── Card body ── */}
                  <div className="flex flex-col flex-1 p-6 pt-5">
                    {/* Top accent line on hover */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <h3 className="font-playfair text-xl font-semibold text-neutral-900 mb-1.5 leading-snug group-hover:text-green-800 transition-colors duration-200">
                      {service.title}
                    </h3>

                    {service.heroTagline && (
                      <p className="text-[11px] font-semibold text-green-600 tracking-widest uppercase mb-3">
                        {service.heroTagline}
                      </p>
                    )}

                    <p className="text-sm text-neutral-500 leading-relaxed font-light flex-1 mb-5">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-semibold text-green-600 group-hover:text-green-700 tracking-wide uppercase">
                      Explore service
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1.5 duration-200" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
