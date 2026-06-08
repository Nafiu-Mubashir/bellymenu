"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock, CheckCircle2, MessageCircle,
  Phone, Star, ChevronRight,
} from "lucide-react";

const PROCESS_STEPS = [
  { icon: "📋", title: "Submit your request",    desc: "Fill in the form with your event details." },
  { icon: "📞", title: "We call you back",        desc: "A team member contacts you within 24 hours." },
  { icon: "🍽️", title: "Custom proposal",        desc: "Receive a tailored menu and pricing proposal." },
  { icon: "✅", title: "Confirm & we get cooking",desc: "Agree on the details and we handle everything." },
];

const TESTIMONIAL = {
  quote: "From the very first call to the last plate cleared — Bellymenu was exceptional. Booking was easy and the team really listened to what we wanted.",
  name: "Ngozi Adeleke",
  event: "Wedding · Abuja, 2024",
  initials: "NA",
  rating: 5,
};

export default function BookingSidebar() {
  const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678";

  return (
    <div className="space-y-5">

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm"
      >
        <h3 className="font-playfair text-lg font-semibold text-neutral-900 mb-5">
          How It Works
        </h3>
        <div className="space-y-4">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.title} className="flex items-start gap-3">
              {/* Step number + connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-base">
                  {step.icon}
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="w-px h-5 bg-green-100 mt-1" />
                )}
              </div>
              <div className="pb-1">
                <p className="text-sm font-semibold text-neutral-800 leading-snug">{step.title}</p>
                <p className="text-xs text-neutral-500 font-light mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Response time badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="bg-green-50 border border-green-100 rounded-2xl p-5 flex items-center gap-4"
      >
        <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
          <Clock size={20} className="text-green-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-green-900">We respond within 24 hours</p>
          <p className="text-xs text-green-700/65 font-light mt-0.5">
            Often much sooner. Check WhatsApp too!
          </p>
        </div>
      </motion.div>

      {/* WhatsApp shortcut */}
      <motion.a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I'd like to get a catering quote for my event.")}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ y: -2 }}
        className="flex items-center gap-4 bg-[#25D366]/8 hover:bg-[#25D366]/14 border border-[#25D366]/25 hover:border-[#25D366]/50 rounded-2xl p-5 transition-all group"
      >
        <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 flex items-center justify-center flex-shrink-0">
          <MessageCircle size={20} className="text-[#25D366]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-neutral-800">Prefer WhatsApp?</p>
          <p className="text-xs text-neutral-500 font-light mt-0.5">
            Chat with us directly — we reply fast.
          </p>
        </div>
        <ChevronRight size={14} className="text-neutral-400 group-hover:text-[#25D366] transition-colors" />
      </motion.a>

      {/* Phone */}
      <motion.a
        href="tel:+2348012345678"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex items-center gap-4 bg-white hover:bg-neutral-50 border border-neutral-100 rounded-2xl p-5 transition-all group"
      >
        <div className="w-11 h-11 rounded-xl bg-neutral-50 flex items-center justify-center flex-shrink-0">
          <Phone size={18} className="text-neutral-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-neutral-800">Call us directly</p>
          <p className="text-xs text-neutral-500 font-light mt-0.5">+234 801 234 5678</p>
        </div>
        <ChevronRight size={14} className="text-neutral-400 group-hover:text-neutral-600 transition-colors" />
      </motion.a>

      {/* Testimonial pull-quote */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-neutral-950 rounded-2xl p-6"
      >
        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: TESTIMONIAL.rating }).map((_, i) => (
            <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-sm text-white/65 font-light leading-relaxed italic mb-5">
          "{TESTIMONIAL.quote}"
        </p>
        <div className="flex items-center gap-3 border-t border-white/8 pt-4">
          <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center text-green-300 text-xs font-semibold flex-shrink-0">
            {TESTIMONIAL.initials}
          </div>
          <div>
            <p className="text-xs font-semibold text-white">{TESTIMONIAL.name}</p>
            <p className="text-[10px] text-white/30 font-light">{TESTIMONIAL.event}</p>
          </div>
        </div>
      </motion.div>

      {/* Trust checklist */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-white border border-neutral-100 rounded-2xl p-5"
      >
        <p className="text-xs font-semibold text-neutral-700 tracking-wider uppercase mb-3">
          Why Clients Trust Us
        </p>
        <ul className="space-y-2.5">
          {[
            "500+ successful events",
            "Licensed & fully insured",
            "Health & food safety certified",
            "Professional service team",
            "Flexible dietary options",
            "Full setup & teardown included",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-xs text-neutral-600 font-light">
              <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
