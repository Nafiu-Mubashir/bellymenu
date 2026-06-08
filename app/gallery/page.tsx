import type { Metadata } from "next";
import type { GalleryItem } from "@/types";

import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryEventStrip from "@/components/gallery/GalleryEventStrip";
import GalleryMasonry from "@/components/gallery/GalleryMasonry";
import GalleryTestimonialPull from "@/components/gallery/GalleryTestimonialPull";
import CTABanner from "@/components/sections/CTABanner";
import { sanityFetch } from "@/sanity/lib/client";
import { GALLERY_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Gallery — Bellymenu Kitchen",
  description:
    "Browse our gallery of beautifully catered events — weddings, corporate dinners, parties and private dining experiences across Nigeria.",
  openGraph: {
    title: "Gallery — Bellymenu Kitchen",
    description:
      "A visual collection of 500+ events catered across Nigeria. Weddings, corporate events, parties and more.",
    type: "website",
  },
};

export default async function GalleryPage() {
  const items = await sanityFetch<GalleryItem[]>(GALLERY_QUERY);
  const totalCount = items?.length ?? 0;

  return (
    <main className="overflow-x-hidden">
      <GalleryHero totalCount={totalCount} />
      <GalleryEventStrip />
      <GalleryMasonry items={items} />
      <GalleryTestimonialPull />
      <CTABanner />
    </main>
  );
}
