"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MessageCircle, Phone, Mail } from "lucide-react";

const QUICK_CONTACTS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat instantly",
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678"}`,
    color: "text-[#25D366]",
    bg: "bg-[#25D366]/8 border-[#25D366]/20 hover:border-[#25D366]/50",
    external: true,
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+234 801 234 5678",
    href: "tel:+2348012345678",
    color: "text-green-600",
    bg: "bg-green-50 border-green-100 hover:border-green-300",
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@bellymenukitchen.com",
    href: "mailto:hello@bellymenukitchen.com",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-100 hover:border-blue-300",
    external: false,
  },
] as const;

export default function ContactHero() {
  return (
    <section className="relative pt-32 pb-20 bg-neutral-950 overflow-hidden">
      {/* Glow */}
      <div
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-green-700/14 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 -right-24 w-80 h-80 rounded-full bg-emerald-900/10 blur-3xl"
        aria-hidden="true"
      />
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "54px 54px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950/70"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs text-white/30 font-medium tracking-wide mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <ChevronRight size={11} className="opacity-50" />
          <span className="text-white/60">Contact</span>
        </motion.nav>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          {/* Left: headline */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-px bg-green-500 opacity-70" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400">
                Get In Touch
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-playfair text-[clamp(2.6rem,6vw,4.8rem)] font-semibold text-white leading-[1.06] tracking-tight mb-5"
            >
              {`We'd Love to`}{" "}
              <br className="hidden sm:block" />
              <em className="not-italic text-green-400">Hear From You</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-base md:text-lg text-white/50 font-light leading-relaxed"
            >
             {` Whether you're ready to book, still exploring, or just have a
              question — our team is always happy to chat. Reach us any way
              that suits you.`}
            </motion.p>
          </div>

          {/* Right: quick contact cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-3 w-full lg:max-w-xs"
          >
            {QUICK_CONTACTS.map(({ icon: Icon, label, value, href, color, bg, external }, i) => (
              <motion.a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-4 border rounded-xl px-5 py-3.5 transition-all duration-200 group ${bg}`}
              >
                <div className={`shrink-0 ${color}`}>
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-500 tracking-wide uppercase">{label}</p>
                  <p className="text-sm font-medium text-gray-500 group-hover:text-gray-400 truncate transition-colors">
                    {value}
                  </p>
                </div>
                <ChevronRight size={13} className="ml-auto text-gray-500 transition-colors shrink-0" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
