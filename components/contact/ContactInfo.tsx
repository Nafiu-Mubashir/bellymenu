"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Clock,
  MessageCircle, ChevronRight,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IMAGES } from "@/app/lib/images";

interface InfoItem {
  icon: React.ElementType;
  label: string;
  lines: string[];
  href?: string;
  iconColor: string;
  iconBg: string;
}

const INFO_ITEMS: InfoItem[] = [
  {
    icon: MapPin,
    label: "Location",
    lines: ["Lagos, Epe, Nigeria", "Available nationwide"],
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+234 801 234 5678"],
    href: "tel:+2348012345678",
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["hello@bellymenukitchen.com"],
    href: "mailto:hello@bellymenukitchen.com",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    icon: Clock,
    label: "Response Hours",
    lines: ["Mon – Sat: 8am – 8pm WAT", "We reply within 24 hours"],
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
];

const SOCIALS = [
  {
    icon: FaInstagram,
    label: "Instagram",
    handle: "@bellymenukitchen",
    href: "https://instagram.com/bellymenukitchen",
    color: "text-pink-600",
    bg: "bg-pink-50 border-pink-100 hover:border-pink-300",
  },
  {
    icon: FaFacebook,
    label: "Facebook",
    handle: "Bellymenu Kitchen",
    href: "https://facebook.com/bellymenukitchen",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-100 hover:border-blue-300",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    handle: "Chat with us",
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678"}`,
    color: "text-[#25D366]",
    bg: "bg-[#25D366]/8 border-[#25D366]/20 hover:border-[#25D366]/50",
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-5">

      {/* ── Team photo card ────────────────────────────────────────────────── */}
      {/* A warm, human touch at the top of the sidebar — builds trust before
          the user has even typed a word */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden bg-neutral-900 h-44"
      >
        <Image
          src={IMAGES.about.teamWorking}
          alt="Bellymenu Kitchen team preparing food"
          fill
          className="object-cover opacity-75"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        {/* Bottom gradient + text */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <p className="font-playfair text-base font-semibold text-white leading-snug">
            Real people,{" "}
            <em className="not-italic text-green-400">real replies</em>
          </p>
          <p className="text-xs text-white/50 font-light mt-1">
           {" You'll hear from a team member — not a bot."}
          </p>
        </div>
      </motion.div>

      {/* ── Contact details ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.04 }}
        className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm divide-y divide-neutral-100"
      >
        {INFO_ITEMS.map(({ icon: Icon, label, lines, href, iconColor, iconBg }, i) => (
          <div
            key={label}
            className={`flex items-start gap-4 py-4 ${i === 0 ? "pt-0" : ""} ${
              i === INFO_ITEMS.length - 1 ? "pb-0" : ""
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}
            >
              <Icon size={17} className={iconColor} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 tracking-widest uppercase mb-1">
                {label}
              </p>
              {lines.map((line) =>
                href ? (
                  <a
                    key={line}
                    href={href}
                    className="block text-sm text-neutral-700 font-medium hover:text-green-600 transition-colors"
                  >
                    {line}
                  </a>
                ) : (
                  <p key={line} className="text-sm text-neutral-700 font-light leading-relaxed">
                    {line}
                  </p>
                )
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Social links ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm"
      >
        <p className="text-xs font-semibold text-neutral-500 tracking-widest uppercase mb-4">
          Find Us Online
        </p>
        <div className="space-y-3">
          {SOCIALS.map(({ icon: Icon, label, handle, href, color, bg }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3.5 border rounded-xl px-4 py-3 transition-all duration-200 group ${bg}`}
            >
              <Icon size={17} className={`${color} flex-shrink-0`} />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-neutral-700">{label}</p>
                <p className="text-xs text-neutral-500 font-light">{handle}</p>
              </div>
            </a>
          ))}
        </div>
      </motion.div>

      {/* ── Map ──────────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm"
      >
        {/* Map header */}
        <div className="px-5 pt-4 pb-3 border-b border-neutral-100 flex items-center gap-2">
          <MapPin size={14} className="text-green-600" />
          <p className="text-xs font-semibold text-neutral-700">Lagos, Nigeria</p>
        </div>

        {/* ── Map area ──────────────────────────────────────────────────────
            OPTION A (current): Static map screenshot from Unsplash.
            OPTION B (production): Replace <Image> with a real Google Maps
            <iframe> embed — paste your embed URL from:
            Google Maps → Share → Embed a map → copy the src="…" value

            <iframe
              src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
              width="100%"
              height="192"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bellymenu Kitchen location — Lagos, Nigeria"
            />
        ─────────────────────────────────────────────────────────────────── */}
        <div className="relative h-48 overflow-hidden bg-neutral-100">
          <Image
            src={IMAGES.contact.mapPreview}
            alt="Map showing Lagos, Nigeria"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          {/* Green pin overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pulse ring */}
              <div className="absolute -inset-3 rounded-full bg-green-500/20 animate-ping" />
              <div className="w-8 h-8 rounded-full bg-green-600 shadow-lg shadow-green-900/40 flex items-center justify-center">
                <MapPin size={15} fill="white" className="text-white" />
              </div>
            </div>
          </div>
          {/* Subtle vignette so pin pops */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Map footer */}
        <div className="px-5 py-3">
          <a
            href="https://maps.google.com/?q=Lagos+FCT+Nigeria"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
          >
            Open in Google Maps
            <ChevronRight size={12} />
          </a>
        </div>
      </motion.div>

    </div>
  );
}
