"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { ServiceDetail } from "@/types";

interface ServiceOverviewProps {
  service: ServiceDetail;
}

export default function ServiceOverview({ service }: ServiceOverviewProps) {
  // Parse long description into paragraphs
  const paragraphs = (service.longDescription ?? service.description)
    .split("\n\n")
    .filter(Boolean);

  const features = service.features ?? [];

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left: description */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-4 text-xs font-medium tracking-[0.18em] uppercase text-green-600">
              <span className="w-8 h-px bg-green-500 opacity-60" />
              About This Service
            </div>
            <h2 className="font-playfair text-[clamp(1.8rem,4vw,2.8rem)] font-semibold text-neutral-900 leading-tight mb-7">
              {service.title} with{" "}
              <em className="not-italic text-green-600">Bellymenu Kitchen</em>
            </h2>

            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="text-neutral-600 font-light leading-[1.85] text-[15px]"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Price from */}
            {service.priceFrom && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 inline-flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-5 py-3"
              >
                <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">
                  Starting from
                </span>
                <span className="font-playfair text-2xl font-semibold text-green-700">
                  {service.priceFrom}
                </span>
                <span className="text-xs text-green-600/60 font-light">
                  / varies by guest count & menu
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Right: features grid */}
          {features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-28"
            >
              <div className="bg-neutral-950 rounded-3xl p-8">
                {/* Orb */}
                <div className="pointer-events-none absolute top-0 right-0 w-40 h-40 rounded-full bg-green-700/15 blur-3xl" aria-hidden="true" />

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] uppercase text-green-400 mb-0.5">
                      Everything Included
                    </p>
                    <h3 className="font-playfair text-xl font-semibold text-white leading-snug">
                      What You Get
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 + 0.15 }}
                      className="flex items-center gap-2.5 bg-white/5 border border-white/8 rounded-xl px-3.5 py-2.5 hover:border-green-700/40 transition-colors duration-200"
                    >
                      <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
                      <span className="text-xs text-white/65 font-light leading-snug">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
