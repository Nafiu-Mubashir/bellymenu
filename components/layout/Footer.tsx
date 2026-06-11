import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const SERVICES_LINKS = [
  { label: "Wedding Catering", href: "/services/wedding-catering" },
  { label: "Corporate Events", href: "/services/corporate-events" },
  { label: "Parties & Celebrations", href: "/services/parties" },
  { label: "Private Dining", href: "/services/private-dining" },
  { label: "Outdoor Events", href: "/services/outdoor-events" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

// Server Component
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white">
      {/* Main footer body */}
      <div className="mx-auto max-w-7xl px-5 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white text-sm font-bold font-playfair">
                B
              </div>
              <span className="font-playfair font-semibold text-xl tracking-tight">
                Belly<span className="text-green-400">menu</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed font-light max-w-60 mb-6">
              Premium catering for weddings, corporate events, parties, and
              private occasions across Nigeria.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                {
                  href: "https://instagram.com/bellymenukitchen",
                  Icon: FaInstagram,
                  label: "Instagram",
                },
                {
                  href: "https://facebook.com/bellymenukitchen",
                  Icon: FaFacebook,
                  label: "Facebook",
                },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:border-green-500 hover:text-green-400 transition-colors"
                >
                  <Icon />
                </a>
              ))}
              {/* TikTok — lucide doesn't have one, use SVG */}
              <a
                href="https://tiktok.com/@bellymenukitchen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:border-green-500 hover:text-green-400 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="15"
                  height="15"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 100 12.67 6.34 6.34 0 006.33-6.34V8.73a8.25 8.25 0 004.84 1.55V6.83a4.85 4.85 0 01-1.07-.14z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-white mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-400 hover:text-green-400 transition-colors font-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-white mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-400 hover:text-green-400 transition-colors font-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-white mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=Lagos+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-neutral-400 hover:text-green-400 transition-colors group"
                >
                  <MapPin
                    size={15}
                    className="mt-0.5 shrink-0 text-green-600 group-hover:text-green-400"
                  />
                  <span className="font-light leading-snug">
                    Lagos, Nigeria
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+2348012345678"
                  className="flex items-center gap-3 text-sm text-neutral-400 hover:text-green-400 transition-colors group"
                >
                  <Phone
                    size={15}
                    className="shrink-0 text-green-600 group-hover:text-green-400"
                  />
                  <span className="font-light">+234 801 234 5678</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@bellymenukitchen.com"
                  className="flex items-center gap-3 text-sm text-neutral-400 hover:text-green-400 transition-colors group"
                >
                  <Mail
                    size={15}
                    className="shrink-0 text-green-600 group-hover:text-green-400"
                  />
                  <span className="font-light break-all">
                    hello@bellymenukitchen.com
                  </span>
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/2348012345678?text=Hello!%20I%27d%20like%20to%20enquire%20about%20catering."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="14"
                height="14"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.832L.057 23.786a.5.5 0 00.657.657l5.954-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.503-5.233-1.381l-.376-.22-3.532.869.888-3.532-.22-.376A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {year} Bellymenu Kitchen. All rights reserved.</p>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="hover:text-green-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-green-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
