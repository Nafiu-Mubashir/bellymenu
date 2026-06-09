"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { AboutData } from "@/types";
import { IMAGES } from "@/app/lib/images";

interface OurStoryProps {
  data: AboutData | null;
}

const FALLBACK_STORY = `Bellymenu Kitchen started in 2016 in a modest kitchen in Abuja with a single mission: prove that caterers in Nigeria didn't have to choose between authentic flavour and professional presentation.

Our founder, inspired by her grandmother's legendary cooking and her own hospitality management training, began cooking for family events. Word spread quickly — the food was different. It felt like home, but elevated. The portions were generous, the presentation was restaurant-quality, and the service was warm without being stiff.

Within two years we had expanded to a full team of chefs, service staff, and event coordinators. By 2020 we were catering corporate events for multinationals, weddings for hundreds of guests, and intimate private dinners for some of Abuja's most discerning families.`;

const FALLBACK_MISSION = `Our mission is simple: to make every meal we serve a memory worth keeping. We believe that great food isn't just about taste — it's about the care in sourcing ingredients, the discipline in preparation, and the warmth of how it's presented and served. When you hire Bellymenu Kitchen, you're not just getting a caterer. You're getting a partner who takes your event as seriously as you do.`;

export default function OurStory({ data }: OurStoryProps) {
  const story = data?.story ?? FALLBACK_STORY;
  const mission = data?.mission ?? FALLBACK_MISSION;
  const paragraphs = story.split("\n\n").filter(Boolean);

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: story text */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-5 text-xs font-medium tracking-[0.18em] uppercase text-green-600">
              <span className="w-8 h-px bg-green-500 opacity-60" />
              How It Began
            </div>
            <h2 className="font-playfair text-[clamp(2rem,4.5vw,3rem)] font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-8">
              A Kitchen, A Dream,
              <br />
              <em className="not-italic text-green-600">A Movement</em>
            </h2>

            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="text-neutral-600 leading-[1.85] font-light text-[15px]"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Right: photo card + mission */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28 space-y-6"
          >
            {/* Real photo card */}
            <div className="relative rounded-3xl overflow-hidden h-72 shadow-xl">
              <Image
                src={IMAGES.about.kitchenCard}
                alt="Bellymenu Kitchen chefs at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Dark overlay for text */}
              <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
              {/* Caption */}
              <div className="absolute bottom-6 left-7 right-7">
                <p className="font-playfair text-xl text-white font-semibold leading-snug">
                 {` "Every plate tells a`}<br />
                  <em className="not-italic text-green-400">{`story worth sharing."`}</em>
                </p>
                <p className="text-xs text-white/45 font-light mt-2 tracking-wide">
                  — Founder, Bellymenu Kitchen
                </p>
              </div>
            </div>

            {/* Mission card */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-lg">
                  🎯
                </div>
                <h3 className="text-sm font-semibold text-green-900 tracking-wide uppercase">
                  Our Mission
                </h3>
              </div>
              <p className="text-[15px] text-neutral-700 font-light leading-[1.85]">
                {mission}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
