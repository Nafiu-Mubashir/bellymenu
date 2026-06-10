"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/app/lib/images";

interface SignatureDish {
  img: string;
  name: string;
  origin: string;
  description: string;
  tags: string[];
  accentColor: string;
  borderColor: string;
}

const SIGNATURE_DISHES: SignatureDish[] = [
  {
    img: IMAGES.dishes.jollof,
    name: "Firewood Jollof Rice",
    origin: "Nigerian Classic",
    description:
      "Slow-cooked over real firewood in the traditional party style. The smoky, rich base tomato sauce is our most-requested dish — guests always come back for more.",
    tags: ["Halal", "Most Requested", "Buffet"],
    accentColor: "text-orange-600",
    borderColor: "border-orange-100 hover:border-orange-200",
  },
  {
    img: IMAGES.dishes.suya,
    name: "Live Suya Station",
    origin: "Northern Nigerian",
    description:
      "Tender beef marinated in our house yaji spice blend and grilled live at your event. Served with fresh onions, tomatoes, and newspaper wrap for that authentic roadside feel.",
    tags: ["Halal", "Live Station", "Gluten-Free"],
    accentColor: "text-red-600",
    borderColor: "border-red-100 hover:border-red-200",
  },
  {
    img: IMAGES.dishes.egusi,
    name: "Egusi Soup & Swallow",
    origin: "Southern Nigerian",
    description:
      "Stone-ground melon seed soup, slow-cooked with assorted meats in palm oil. Served with pounded yam, eba, or semolina — the kind that makes you feel at home.",
    tags: ["Traditional", "Gluten-Free", "Halal"],
    accentColor: "text-green-700",
    borderColor: "border-green-100 hover:border-green-200",
  },
  {
    img: IMAGES.dishes.smallChops,
    name: "Small Chops Platter",
    origin: "Nigerian Party Staple",
    description:
      "Our premium small chops selection: puff puff, spring rolls, samosa, peppered gizzard, and mini jollof cups — beautifully presented and passed by uniformed staff.",
    tags: ["Cocktail Reception", "Popular", "Customisable"],
    accentColor: "text-amber-600",
    borderColor: "border-amber-100 hover:border-amber-200",
  },
];

export default function SignatureDishes() {
  return (
    <section className="py-24 md:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <span className="w-8 h-px bg-green-500 opacity-60" />
            <span className="text-xs font-medium tracking-[0.18em] uppercase text-green-600">
              The Fan Favourites
            </span>
            <span className="w-8 h-px bg-green-500 opacity-60" />
          </div>
          <h2 className="font-playfair text-[clamp(2rem,4.5vw,3rem)] font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-4">
            Our Signature{" "}
            <em className="not-italic text-green-600">Dishes</em>
          </h2>
          <p className="text-neutral-500 font-light leading-relaxed text-[15px]">
            These are the dishes guests talk about long after the event. Each one
            has been refined over hundreds of events to be exactly right.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SIGNATURE_DISHES.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`group bg-white border rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 ${dish.borderColor}`}
            >
              {/* Photo */}
              <div className="relative h-48 overflow-hidden bg-neutral-100">
                <Image
                  src={dish.img}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Gradient overlay for origin badge readability */}
                <div className="absolute inset-0 bg-linear-to-t from-neutral-950/50 to-transparent" />
                {/* Origin badge — floated over the photo */}
                <span className={`absolute bottom-3 left-3 text-[10px] font-bold tracking-widest uppercase text-white bg-neutral-950/60 backdrop-blur-sm px-2.5 py-1 rounded-full`}>
                  {dish.origin}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-playfair text-lg font-semibold text-neutral-900 leading-snug group-hover:text-green-700 transition-colors duration-200">
                  {dish.name}
                </h3>

                <p className="text-sm text-neutral-600 font-light leading-relaxed flex-1">
                  {dish.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                  {dish.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold bg-neutral-50 border border-neutral-100 px-2.5 py-1 rounded-full text-neutral-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
