"use client";
import HeroBackground from "@/components/ui/HeroBackground";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import type { ServiceDetail } from "@/types";
import { IMAGES } from "@/app/lib/images";

interface ServiceDetailHeroProps {
  service: ServiceDetail;
}

export default function ServiceDetailHero({ service }: ServiceDetailHeroProps) {

  // Map service slug → stock cover image
  const SERVICE_COVERS: Record<string, string> = {
    "wedding-catering":      IMAGES.services.wedding,
    "corporate-events":      IMAGES.services.corporate,
    "parties":               IMAGES.services.parties,
    "private-dining":        IMAGES.services.privateDining,
    "outdoor-events":        IMAGES.services.outdoorEvents,
    "cocktail-receptions":   IMAGES.services.cocktail,
  };
  const coverSrc = SERVICE_COVERS[service.slug.current] ?? IMAGES.hero.services;

  return (
    <section className="relative pt-32 pb-20 bg-neutral-950 overflow-hidden">
      <HeroBackground src={coverSrc} priority />
      <div className="pointer-events-none absolute -top-20 right-0 w-125 h-125 rounded-full bg-green-700/15 blur-[100px] z-10" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-xs text-white/30 mb-10 font-medium tracking-wide"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/services" className="hover:text-white/60 transition-colors">Services</Link>
          <ChevronRight size={12} />
          <span className="text-white/60">{service.title}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-5"
            >
              <span className="text-3xl">{service.icon}</span>
              <span className="text-xs font-medium tracking-[0.18em] uppercase text-green-400">
                {service.heroTagline ?? "Premium Service"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-[clamp(2.4rem,5.5vw,4rem)] font-semibold text-white leading-[1.08] tracking-tight mb-5"
            >
              {service.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-base text-white/55 font-light leading-relaxed mb-8 max-w-lg"
            >
              {service.longDescription ?? service.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/40"
              >
                Get a Quote for This
                <ChevronRight size={14} />
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-green-500/50 text-white/70 hover:text-white px-6 py-3 rounded-full text-sm font-medium transition-all"
              >
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Highlights card */}
          {service.highlights && service.highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-7"
            >
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-green-400 mb-5">
               {" What's Included"}
              </p>
              <ul className="space-y-3">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-white/70 font-light">
                    <CheckCircle2 size={15} className="text-green-500 shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
