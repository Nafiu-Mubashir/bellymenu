import type { Metadata } from "next";
import BookingHero from "@/components/booking/BookingHero";
import BookingForm from "@/components/booking/BookingForm";
import BookingSidebar from "@/components/booking/BookingSidebar";

export const metadata: Metadata = {
  title: "Request a Quote — Bellymenu Kitchen",
  description:
    "Get a personalised catering quote for your wedding, corporate event, party or private dining experience across Nigeria. We respond within 24 hours.",
  openGraph: {
    title: "Request a Quote — Bellymenu Kitchen",
    description:
      "Tell us about your event and we'll send a tailored proposal within 24 hours. No commitment required.",
    type: "website",
  },
};

export default function BookingPage() {
  return (
    <main className="overflow-x-hidden">
      <BookingHero />

      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">

            {/* ── Main form: takes 2 columns ── */}
            <div className="lg:col-span-2">
              <BookingForm />
            </div>

            {/* ── Sidebar: 1 column, sticky ── */}
            <div className="lg:sticky lg:top-28">
              <BookingSidebar />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
