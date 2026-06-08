import {
  HOMEPAGE_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
  GALLERY_PREVIEW_QUERY,
} from "@/sanity/lib/queries";
import type {
  HomepageData,
  Service,
  Testimonial,
  GalleryItem,
} from "@/types";

import HeroSection from "@/components/sections/HeroSection";
import MarqueeBar from "@/components/sections/MarqueeBar";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GalleryPreview from "@/components/sections/GalleryPreview";
import CTABanner from "@/components/sections/CTABanner";
import { sanityFetch } from "@/sanity/lib/client";

export const metadata = {
  title: "Bellymenu Kitchen — Premium Catering Services in Nigeria",
  description:
    "Bellymenu Kitchen offers professional catering for weddings, corporate events, parties, and private dining across Nigeria. Request a quote today.",
  openGraph: {
    title: "Bellymenu Kitchen — Premium Catering Services in Nigeria",
    description:
      "Exceptional cuisine and seamless service for every occasion. Weddings, corporate events, parties & celebrations.",
    type: "website",
    locale: "en_NG",
  },
};

// All Sanity fetches run in parallel on the server.
// If any fetch fails, it returns null — each component falls back to its
// own hardcoded data so the page always renders correctly.
export default async function HomePage() {
  const [homepageData, services, testimonials, galleryItems] =
    await Promise.all([
      sanityFetch<HomepageData>(HOMEPAGE_QUERY),
      sanityFetch<Service[]>(SERVICES_QUERY),
      sanityFetch<Testimonial[]>(TESTIMONIALS_QUERY),
      sanityFetch<GalleryItem[]>(GALLERY_PREVIEW_QUERY),
    ]);

  return (
    <main>
      <HeroSection data={homepageData} />
      <MarqueeBar items={homepageData?.marqueeItems} />
      <ServicesSection services={services} />
      <AboutSection />
      <TestimonialsSection testimonials={testimonials} />
      <GalleryPreview items={galleryItems} />
      <CTABanner />
    </main>
  );
}
