"use client";

import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Clock,
   MessageCircle,
} from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

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
    lines: ["Abuja, FCT, Nigeria", "Available nationwide"],
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

      {/* Contact details card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm divide-y divide-neutral-100"
      >
        {INFO_ITEMS.map(({ icon: Icon, label, lines, href, iconColor, iconBg }, i) => (
          <div
            key={label}
            className={`flex items-start gap-4 py-4 ${i === 0 ? "pt-0" : ""} ${i === INFO_ITEMS.length - 1 ? "pb-0" : ""}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
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

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.06 }}
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
              <Icon size={17} className={`${color} shrink-0`} />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-neutral-700">{label}</p>
                <p className="text-xs text-neutral-500 font-light">{handle}</p>
              </div>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Map embed */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm"
      >
        <div className="px-5 pt-4 pb-3 border-b border-neutral-100 flex items-center gap-2">
          <MapPin size={14} className="text-green-600" />
          <p className="text-xs font-semibold text-neutral-700">Abuja, Nigeria</p>
        </div>
        {/* Decorative map placeholder — replace with real embed */}
        <div className="relative h-48 bg-neutral-50 flex flex-col items-center justify-center gap-2 overflow-hidden">
          {/* Subtle map grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#d1fae5 1px,transparent 1px),linear-gradient(90deg,#d1fae5 1px,transparent 1px)",
              backgroundSize: "28px 28px",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-200">
              <MapPin size={15} fill="white" className="text-white" />
            </div>
            <p className="text-xs font-semibold text-neutral-700">Abuja, FCT</p>
            <p className="text-[11px] text-neutral-400 font-light">Nigeria</p>
          </div>
          {/*
            To embed a real Google Map replace the div above with:
            <iframe
              src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
              width="100%" height="192" style={{border:0}}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bellymenu Kitchen location"
            />
          */}
        </div>
        <div className="px-5 py-3">
          <a
            href="https://maps.google.com/?q=Abuja,Nigeria"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-green-600 hover:text-green-700 flex items-center gap-1.5 transition-colors"
          >
            Open in Google Maps
            <ChevronRight size={12} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function ChevronRight({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
