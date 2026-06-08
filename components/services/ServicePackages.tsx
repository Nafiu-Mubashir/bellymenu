"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import type { ServicePackage } from "@/types";

const FALLBACK_PACKAGES: ServicePackage[] = [
  {
    name: "Essential",
    price: "Contact for pricing",
    description: "Perfect for smaller gatherings and intimate celebrations.",
    features: ["Up to 50 guests", "3-course menu", "Service staff included", "Basic setup", "2-hour service window"],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "Contact for pricing",
    description: "Our most popular package — full experience, full service.",
    features: ["Up to 150 guests", "5-course menu", "Dedicated event coordinator", "Premium table setup", "Full-day service", "Dietary accommodations", "Cleanup included"],
    highlighted: true,
  },
  {
    name: "Grand",
    price: "Contact for pricing",
    description: "The complete Bellymenu experience for landmark events.",
    features: ["Unlimited guests", "Custom tasting menu", "Executive chef on-site", "Bespoke presentation", "Multi-day events supported", "Full bar service available", "Post-event cleanup", "Photo-ready plating"],
    highlighted: false,
  },
];

interface ServicePackagesProps {
  packages?: ServicePackage[];
  serviceTitle?: string; // optional — used for accessible headings
}

export default function ServicePackages({ packages, serviceTitle }: ServicePackagesProps) {
  const list = packages && packages.length > 0 ? packages : FALLBACK_PACKAGES;

  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-green-500 opacity-60" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-600">Packages</span>
            <span className="w-8 h-px bg-green-500 opacity-60" />
          </div>
          <h2 className="font-playfair text-[clamp(1.8rem,4vw,2.8rem)] font-semibold text-neutral-900 leading-tight">
            Choose Your <em className="not-italic text-green-600">Experience</em>
          </h2>
          <p className="text-sm text-neutral-500 font-light mt-3 max-w-md mx-auto">
            All packages are fully customisable. Final pricing depends on your guest count, menu selections, and location.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-2xl p-7 flex flex-col ${
                pkg.highlighted
                  ? "bg-neutral-950 border-2 border-green-600 shadow-2xl shadow-green-900/20"
                  : "bg-white border border-neutral-100"
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-green-600 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                  <Star size={10} fill="white" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-playfair text-2xl font-semibold mb-1 ${pkg.highlighted ? "text-white" : "text-neutral-900"}`}>
                  {pkg.name}
                </h3>
                <p className={`text-xs font-light leading-relaxed mb-4 ${pkg.highlighted ? "text-white/55" : "text-neutral-500"}`}>
                  {pkg.description}
                </p>
                <p className={`text-sm font-semibold ${pkg.highlighted ? "text-green-400" : "text-green-600"}`}>
                  {pkg.price}
                </p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-7">
                {pkg.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm font-light ${pkg.highlighted ? "text-white/70" : "text-neutral-600"}`}>
                    <CheckCircle2 size={13} className={`flex-shrink-0 mt-0.5 ${pkg.highlighted ? "text-green-400" : "text-green-500"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/booking?package=${encodeURIComponent(pkg.name)}`}
                className={`w-full text-center py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                  pkg.highlighted
                    ? "bg-green-600 hover:bg-green-500 text-white"
                    : "border border-neutral-200 hover:border-green-500 hover:bg-green-50 text-neutral-700 hover:text-green-700"
                }`}
              >
                Get a Quote
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
