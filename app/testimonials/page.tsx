import type { Metadata } from "next";

import type { Testimonial } from "@/types";

import TestimonialsHero from "@/components/testimonials/TestimonialsHero";
import TestimonialsStats from "@/components/testimonials/TestimonialsStats";
import FeaturedTestimonial from "@/components/testimonials/FeaturedTestimonial";
import PlatformRatings from "@/components/testimonials/PlatformRatings";
import TestimonialsGrid from "@/components/testimonials/TestimonialsGrid";
import LeaveReview from "@/components/testimonials/LeaveReview";
import CTABanner from "@/components/sections/CTABanner";
import { ALL_TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials — Bellymenu Kitchen",
  description:
    "See what hundreds of clients across Nigeria say about Bellymenu Kitchen. 5-star reviews for weddings, corporate events, parties and private dining.",
  openGraph: {
    title: "Client Reviews — Bellymenu Kitchen",
    description:
      "500+ events, 98% satisfaction rate, 5.0 stars across all platforms. Read genuine client reviews.",
    type: "website",
  },
};

export default async function TestimonialsPage() {
  // const testimonials = await sanityFetch<Testimonial[]>(ALL_TESTIMONIALS_QUERY);
  const [testimonialsResult] = await Promise.all([
    sanityFetch({ query: ALL_TESTIMONIALS_QUERY }),
  ]);
  const testimonials = (testimonialsResult.data ?? []) as Testimonial[];

  // Use the most recent review as the featured one (or null for fallback)
  const featured =
    testimonials && testimonials.length > 0 ? testimonials[0] : null;

  return (
    <main className="overflow-x-hidden">
      <TestimonialsHero />
      <TestimonialsStats />
      <FeaturedTestimonial testimonial={featured} />
      <PlatformRatings />
      <TestimonialsGrid testimonials={testimonials} />
      <LeaveReview />
      <CTABanner />
    </main>
  );
}
