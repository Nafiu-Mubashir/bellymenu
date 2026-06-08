import type { Metadata } from "next";
import type { Service } from "@/types";

import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import HowItWorks from "@/components/services/HowItWorks";
import ServicesWhyUs from "@/components/services/ServicesWhyUs";
import CTABanner from "@/components/sections/CTABanner";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_SERVICES_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Our Services — Catering for Every Occasion | Bellymenu Kitchen",
  description:
    "From weddings to corporate events, Bellymenu Kitchen delivers professional catering across Nigeria. Explore our full range of services.",
  openGraph: {
    title: "Our Catering Services — Bellymenu Kitchen",
    description:
      "Weddings, corporate events, parties, private dining and more. Premium catering across Nigeria.",
    type: "website",
  },
};

export default async function ServicesPage() {
  const services = await sanityFetch<Service[]>(ALL_SERVICES_QUERY);

  return (
    <main className="overflow-x-hidden">
      <ServicesHero />
      <ServicesGrid services={services} />
      <HowItWorks />
      <ServicesWhyUs />
      <CTABanner />
    </main>
  );
}
