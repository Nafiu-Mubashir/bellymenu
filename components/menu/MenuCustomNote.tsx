"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChefHat, MessageCircle, CalendarCheck } from "lucide-react";

const PERKS = [
  { icon: "🥩", text: "Nigerian & continental options" },
  { icon: "🌿", text: "Fresh, locally sourced ingredients" },
  { icon: "⚕️", text: "All dietary requirements catered for" },
  { icon: "🎯", text: "100% custom menu per event" },
];

export default function MenuCustomNote() {
  return (
    <section className="py-24 bg-neutral-950 overflow-hidden relative">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-60 rounded-full bg-green-700/12 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 rounded-full bg-emerald-900/10 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-green-500 opacity-60" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400">
                Everything Is Custom
              </span>
            </div>

            <h2 className="font-playfair text-[clamp(2rem,4.5vw,3rem)] font-semibold text-white leading-[1.1] tracking-tight mb-5">
              Your Menu, Built{" "}
              <em className="not-italic text-green-400">Around You</em>
            </h2>

            <p className="text-white/55 font-light leading-relaxed text-[15px] max-w-md mb-8">
              The dishes on this page are just a starting point. In your free consultation, our head chef works with you to design a menu that reflects your occasion, guests, and vision — nothing generic, ever.
            </p>

            {/* Perks */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {PERKS.map((perk, i) => (
                <motion.div
                  key={perk.text}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 + 0.2 }}
                  className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3 hover:border-green-700/40 transition-colors"
                >
                  <span className="text-xl">{perk.icon}</span>
                  <span className="text-xs font-light text-white/65">{perk.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="group inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/40"
              >
                <CalendarCheck size={15} />
                Book a Tasting Consultation
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678"}?text=${encodeURIComponent("Hi! I'd like to discuss a custom menu for my event.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/60 text-[#25D366] px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all"
              >
                <MessageCircle size={15} />
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          {/* Right: chef card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white/5 border border-white/8 rounded-3xl p-8">
              {/* Chef icon */}
              <div className="w-16 h-16 rounded-2xl bg-green-900/50 border border-green-700/30 flex items-center justify-center mb-6">
                <ChefHat size={30} className="text-green-400" />
              </div>

              <h3 className="font-playfair text-2xl font-semibold text-white mb-2">
                Free Menu Consultation
              </h3>
              <p className="text-sm text-white/50 font-light leading-relaxed mb-7">
                Sit with our head chef — in person or virtually — to design your event menu from scratch. No pressure, no commitment until you're completely happy.
              </p>

              {/* Steps */}
              <div className="space-y-4">
                {[
                  { step: "01", text: "Tell us your event date & guest count" },
                  { step: "02", text: "Describe your vision, theme & preferences" },
                  { step: "03", text: "Receive a custom menu proposal within 48hrs" },
                  { step: "04", text: "Optional tasting session before you confirm" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <span className="font-playfair text-green-500/60 font-semibold text-lg leading-none flex-shrink-0 w-8">
                      {item.step}
                    </span>
                    <p className="text-sm text-white/60 font-light leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 pt-5 border-t border-white/8 text-center">
                <p className="text-xs text-white/30 font-light">
                  100% free · No obligation · We reply within 24 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
