"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-green-100"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-5 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Bellymenu Kitchen home">
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white text-sm font-bold font-playfair transition-transform group-hover:scale-105">
              B
            </div>
            <span
              className={`font-playfair font-semibold text-xl tracking-tight transition-colors ${
                scrolled ? "text-neutral-900" : "text-white"
              }`}
            >
              Belly<span className="text-green-500">menu</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative text-sm font-medium tracking-wide transition-colors group ${
                      scrolled
                        ? isActive
                          ? "text-green-600"
                          : "text-neutral-600 hover:text-green-600"
                        : isActive
                        ? "text-green-300"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-green-500 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
            <Link
              href="/booking"
              className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Get a Quote
              <ChevronRight size={13} />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-neutral-700 hover:bg-neutral-100" : "text-white hover:bg-white/10"
            }`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-72 bg-white shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-neutral-100">
                <span className="font-playfair font-semibold text-lg text-neutral-900">
                  Belly<span className="text-green-500">menu</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-6">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map(({ label, href }, i) => (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <Link
                        href={href}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          pathname === href
                            ? "bg-green-50 text-green-700"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        {label}
                        <ChevronRight size={14} className="text-neutral-300" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="p-6 border-t border-neutral-100 flex flex-col gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3 rounded-full text-sm font-semibold transition-colors"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/booking"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
