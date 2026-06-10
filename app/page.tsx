import {
  HOMEPAGE_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
  GALLERY_PREVIEW_QUERY,
} from "@/sanity/lib/queries";
import type { HomepageData, Service, Testimonial, GalleryItem } from "@/types";

import HeroSection from "@/components/sections/HeroSection";
import MarqueeBar from "@/components/sections/MarqueeBar";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GalleryPreview from "@/components/sections/GalleryPreview";
import CTABanner from "@/components/sections/CTABanner";
import { sanityFetch } from "@/sanity/lib/live";

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
  const [homepageResult, servicesResult, testimonialsResult, galleryResult] =
    await Promise.all([
      sanityFetch({ query: HOMEPAGE_QUERY }),
      sanityFetch({ query: SERVICES_QUERY }),
      sanityFetch({ query: TESTIMONIALS_QUERY }),
      sanityFetch({ query: GALLERY_PREVIEW_QUERY }),
    ]);
  // (rawStatsRes.data ?? []) as SanityKeyStatistic[]
  const homepageData = (homepageResult.data ?? []) as HomepageData;
  const services = (servicesResult.data ?? []) as Service[];
  const testimonials = (testimonialsResult.data ?? []) as Testimonial[];
  const galleryItems = (galleryResult.data ?? []) as GalleryItem[];

  return (
    <main className="overflow-x-hidden">
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
