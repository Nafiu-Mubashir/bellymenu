import type { Metadata } from "next";


import MenuHero from "@/components/menu/MenuHero";
import SignatureDishes from "@/components/menu/SignatureDishes";
import MenuCatalogue from "@/components/menu/MenuCatalogue";
import FoodGalleryGrid from "@/components/menu/FoodGalleryGrid";
import MenuCustomNote from "@/components/menu/MenuCustomNote";
import CTABanner from "@/components/sections/CTABanner";
import { sanityFetch } from "@/sanity/lib/client";
import { MENU_QUERY, GALLERY_PREVIEW_QUERY } from "@/sanity/lib/queries";
import { GalleryItem, MenuCategoryExtended } from "@/types";

export const metadata: Metadata = {
  title: "Our Menu — Bellymenu Kitchen",
  description:
    "Explore Bellymenu Kitchen's menu — a celebration of Nigerian classics and continental favourites, crafted fresh for every event. Weddings, parties, corporate events.",
  openGraph: {
    title: "Our Menu — Bellymenu Kitchen",
    description:
      "From firewood jollof rice to live suya stations — explore the food that makes every Bellymenu event unforgettable.",
    type: "website",
  },
};

// Parallel server fetches — both fall back gracefully if Sanity is not connected
export default async function MenuPage() {
  const [categories, galleryItems] = await Promise.all([
    sanityFetch<MenuCategoryExtended[]>(MENU_QUERY),
    sanityFetch<GalleryItem[]>(GALLERY_PREVIEW_QUERY),
  ]);

  return (
    <main className="overflow-x-hidden">
      <MenuHero />
      <SignatureDishes />
      <MenuCatalogue categories={categories} />
      <FoodGalleryGrid items={galleryItems} />
      <MenuCustomNote />
      <CTABanner />
    </main>
  );
}
