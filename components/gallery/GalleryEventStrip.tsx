"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/app/lib/images";

const EVENT_TYPES = [
  {
    img:         IMAGES.gallery.wedding1,
    label:       "Weddings",
    count:       "200+",
    description: "From intimate ceremonies to grand receptions",
    accent:      "from-rose-900/60",
  },
  {
    img:         IMAGES.gallery.corporate1,
    label:       "Corporate",
    count:       "120+",
    description: "Galas, lunches, product launches & away-days",
    accent:      "from-blue-900/60",
  },
  {
    img:         IMAGES.gallery.party1,
    label:       "Celebrations",
    count:       "150+",
    description: "Birthdays, anniversaries, graduations",
    accent:      "from-purple-900/60",
  },
  {
    img:         IMAGES.gallery.setup1,
    label:       "Private Dining",
    count:       "80+",
    description: "Exclusive chef experiences at home or venue",
    accent:      "from-green-900/60",
  },
];

export default function GalleryEventStrip() {
  return (
    <section className="py-16 bg-neutral-50 border-y border-neutral-100">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {EVENT_TYPES.map((event, i) => (
            <motion.div
              key={event.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden cursor-default h-48 bg-neutral-200"
            >
              {/* Photo */}
              <Image
                src={event.img}
                alt={event.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              {/* Gradient overlay — darkens bottom for text */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${event.accent} via-neutral-950/20 to-transparent`}
              />

              {/* Content over photo */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <p className="font-playfair text-2xl font-semibold text-white leading-none mb-0.5">
                  {event.count}
                </p>
                <p className="text-sm font-semibold text-white">{event.label}</p>
                <p className="text-[11px] text-white/60 font-light mt-1 leading-snug">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
