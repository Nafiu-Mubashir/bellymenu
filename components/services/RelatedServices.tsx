"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";

interface RelatedServicesProps {
  services: Service[];
}

export default function RelatedServices({ services }: RelatedServicesProps) {
  if (!services || services.length === 0) return null;

  return (
    <section className="py-16 bg-neutral-50 border-t border-neutral-100">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <h2 className="font-playfair text-2xl font-semibold text-neutral-900 mb-8">
          Other Services You May Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {services.slice(0, 3).map((s, i) => (
            <motion.div
              key={s._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/services/${s.slug.current}`}
                className="group flex items-center gap-4 bg-white border border-neutral-100 hover:border-green-200 rounded-xl p-5 transition-all hover:shadow-lg hover:shadow-green-50"
              >
                <span className="text-2xl w-10 flex-shrink-0">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-neutral-900 mb-0.5">{s.title}</h3>
                  <p className="text-xs text-neutral-400 font-light truncate">{s.description}</p>
                </div>
                <ArrowRight size={14} className="flex-shrink-0 text-neutral-300 group-hover:text-green-500 transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
