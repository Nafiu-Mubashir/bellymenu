import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFAQTeaser from "@/components/contact/ContactFAQTeaser";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Contact Us — Bellymenu Kitchen",
  description:
    "Get in touch with Bellymenu Kitchen. Call, WhatsApp, or email us — we're always happy to hear from you and respond within 24 hours.",
  openGraph: {
    title: "Contact Bellymenu Kitchen",
    description:
      "Reach out to Nigeria's premium catering service. We respond within 24 hours.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden">
      <ContactHero />

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">

            {/* Main form — 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Section label */}
              <div>
                <div className="inline-flex items-center gap-3 mb-2 text-xs font-medium tracking-[0.18em] uppercase text-green-600">
                  <span className="w-8 h-px bg-green-500 opacity-60" />
                  Send a Message
                </div>
                <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-neutral-900">
                  Drop Us a{" "}
                  <em className="not-italic text-green-600">Line</em>
                </h2>
              </div>
              <ContactForm />
            </div>

            {/* Sidebar — 1 column, sticky */}
            <div className="lg:sticky lg:top-28">
              <div className="mb-5">
                <div className="inline-flex items-center gap-3 mb-2 text-xs font-medium tracking-[0.18em] uppercase text-green-600">
                  <span className="w-8 h-px bg-green-500 opacity-60" />
                  Find Us
                </div>
                <h2 className="font-playfair text-2xl font-semibold text-neutral-900">
                  Our <em className="not-italic text-green-600">Details</em>
                </h2>
              </div>
              <ContactInfo />
            </div>

          </div>
        </div>
      </section>

      <ContactFAQTeaser />
      <CTABanner />
    </main>
  );
}
