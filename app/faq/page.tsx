import type { Metadata } from "next";
import type { FAQItem } from "@/types";
import FAQHero from "@/components/faq/FAQHero";
import FAQAccordion from "@/components/faq/FAQAccordion";
import FAQContactCTA from "@/components/faq/FAQContactCTA";
import CTABanner from "@/components/sections/CTABanner";
import { FAQ_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "FAQ — Bellymenu Kitchen",
  description:
    "Answers to common questions about Bellymenu Kitchen — booking, menus, pricing, dietary requirements, and how our catering service works.",
  openGraph: {
    title: "FAQ — Bellymenu Kitchen",
    description:
      "Everything you need to know before booking Nigeria's premium catering service.",
    type: "website",
  },
};

export default async function FAQPage() {
  // const faqs = await sanityFetch<FAQItem[]>(FAQ_QUERY);
  const [faqsResult] =
    await Promise.all([
      sanityFetch({ query: FAQ_QUERY }),
    ]);
    const faqs = (faqsResult.data ?? []) as FAQItem[];

  return (
    <main className="overflow-x-hidden">
      <FAQHero />
      <FAQAccordion faqs={faqs} />
      <FAQContactCTA />
      <CTABanner />
    </main>
  );
}
