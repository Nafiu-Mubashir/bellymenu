"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Service } from "@/types";

// ─── Fallback data ────────────────────────────────────────────────────────────
const FALLBACK_SERVICES: Service[] = [
  {
    _id: "1",
    icon: "💍",
    title: "Wedding Catering",
    description:
      "Elegant, multi-course menus curated for your perfect day — from cocktail hour hors d'oeuvres to grand reception spreads that honour both Nigerian and continental tastes.",
    slug: { _type: "slug", current: "wedding-catering" },
    order: 1,
  },
  {
    _id: "2",
    icon: "🏢",
    title: "Corporate Events",
    description:
      "Impress clients and energize teams with professionally presented meals. Boardroom lunches, company galas, product launches — every event handled with precision.",
    slug: { _type: "slug", current: "corporate-events" },
    order: 2,
  },
  {
    _id: "3",
    icon: "🎉",
    title: "Parties & Celebrations",
    description:
      "Birthdays, anniversaries, graduations — we make every celebration delicious. Flexible menus to suit any theme, guest count, and style.",
    slug: { _type: "slug", current: "parties" },
    order: 3,
  },
  {
    _id: "4",
    icon: "🍽️",
    title: "Private Dining",
    description:
      "Exclusive chef-crafted menus delivered to your home or private venue. An intimate dining experience that goes far beyond any restaurant.",
    slug: { _type: "slug", current: "private-dining" },
    order: 4,
  },
  {
    _id: "5",
    icon: "🌿",
    title: "Outdoor Events",
    description:
      "Picnics, garden parties, outdoor weddings — we bring our full setup to open-air venues and ensure fresh, beautifully served food regardless of the setting.",
    slug: { _type: "slug", current: "outdoor-events" },
    order: 5,
  },
  {
    _id: "6",
    icon: "🥂",
    title: "Cocktail Receptions",
    description:
      "Curated canapés, live food stations, and premium drink pairings for sophisticated pre-event or stand-alone cocktail receptions.",
    slug: { _type: "slug", current: "cocktail-receptions" },
    order: 6,
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/services/${service.slug.current}`}
        className="group relative flex flex-col h-full bg-white border border-neutral-100 rounded-2xl p-7 hover:border-green-200 hover:shadow-xl hover:shadow-green-50 transition-all duration-300 overflow-hidden"
      >
        {/* Hover gradient fill */}
        <div className="absolute inset-0 bg-linear-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-green-50 group-hover:bg-green-100 flex items-center justify-center text-2xl mb-5 transition-colors duration-300">
            {service.icon}
          </div>

          <h3 className="font-playfair text-xl font-semibold text-neutral-900 mb-3 leading-snug">
            {service.title}
          </h3>

          <p className="text-sm text-neutral-500 leading-relaxed font-light flex-1 mb-5">
            {service.description}
          </p>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600 group-hover:text-green-700 tracking-wide uppercase">
            Learn more
            <ArrowRight
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-1.5"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
interface ServicesSectionProps {
  services: Service[] | null;
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const list = services && services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <section id="services" className="py-24 md:py-32 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading
            label="What We Do"
            title="Catering for Every "
            accentWord="Occasion"
            subtitle="From intimate dinners to grand celebrations — we craft menus tailored to your vision."
          />
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="shrink-0"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-neutral-200 hover:border-green-500 text-sm font-medium text-neutral-600 hover:text-green-700 px-5 py-2.5 rounded-full transition-all hover:bg-green-50"
            >
              View all services
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((service, i) => (
            <ServiceCard key={service._id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
