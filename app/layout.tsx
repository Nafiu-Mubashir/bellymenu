import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bellymenu Kitchen — Premium Catering in Nigeria",
    template: "%s | Bellymenu Kitchen",
  },
  description:
    "Premium catering services for weddings, corporate events, parties and private occasions across Nigeria.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bellymenukitchen.com"
  ),
  icons: {
    icon: "/favicon.ico",
  },
};

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} overflow-x-hidden`}>
      <body className="font-inter antialiased bg-white text-neutral-900 overflow-x-hidden">
        <Navbar />
        {children}
        <SanityLive />
        <Footer />
        <FloatingWhatsApp phoneNumber={WHATSAPP_NUMBER} />
      </body>
    </html>
  );
}
