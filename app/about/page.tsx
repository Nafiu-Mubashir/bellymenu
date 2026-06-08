import type { Metadata } from "next";


import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import StatsStrip from "@/components/about/StatsStrip";
import ValuesSection from "@/components/about/ValuesSection";
import MilestonesSection from "@/components/about/MilestonesSection";
import TeamSection from "@/components/about/TeamSection";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import CTABanner from "@/components/sections/CTABanner";
import { sanityFetch } from "@/sanity/lib/client";
import { AboutData } from "@/types";
import { ABOUT_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Bellymenu Kitchen — our founding, our team, our values, and why hundreds of clients across Nigeria trust us with their most important events.",
  openGraph: {
    title: "About Bellymenu Kitchen",
    description:
      "The people, the story, and the values behind Nigeria's premium catering service.",
    type: "website",
  },
};

// Server Component — fetches About data, falls back gracefully
export default async function AboutPage() {
  const aboutData = await sanityFetch<AboutData>(ABOUT_QUERY);

  return (
    <main className="overflow-x-hidden">
      <AboutHero data={aboutData} />
      <OurStory data={aboutData} />
      <StatsStrip />
      <ValuesSection />
      <MilestonesSection milestones={aboutData?.milestones} />
      <TeamSection members={aboutData?.teamMembers} />
      <WhyChooseUs />
      <CTABanner />
    </main>
  );
}
