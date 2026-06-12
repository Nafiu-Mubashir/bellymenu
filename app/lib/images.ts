/**
 * Bellymenu Kitchen — Centralized Stock Image Registry
 *
 * All images are sourced from Unsplash (free, commercial-use, no attribution required).
 * Unsplash License: https://unsplash.com/license
 *
 * URL format:
 *   https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w={W}&h={H}&q=80
 *
 * TO REPLACE WITH ORIGINAL PHOTOGRAPHY:
 *   Swap the URL string for any key — nothing else needs to change.
 *   Recommended: upload originals to /public/images/ and use "/images/filename.jpg"
 */

const U = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const IMAGES = {
  // ─── Hero Backgrounds ────────────────────────────────────────────────────────
  // Used behind dark overlays at 15–25% visible — needs strong colour & contrast

  hero: {
    /** Homepage — elegant food-table spread, warm event lighting */
    homepage: U("1555939594-58d7cb561ad1", 1920, 1080),
    /** Services listing — grand banquet hall setup */
    services: U("1414235077428-338989a2e8c0", 1920, 1080),
    /** About page — professional kitchen team at work */
    about: U("1556909114-f6e7ad7d3136", 1920, 1080),
    /** Menu page — overhead Nigerian / African food spread */
    menu: U("1567620905732-2d1ec7ab7445", 1920, 1080),
    /** Gallery page — grand reception event */
    gallery: U("1521336575822-6da63fb45455", 1920, 1080),
    /** Booking page — warm kitchen, invitation feel */
    booking: U("1577219491135-ce391730fb2c", 1920, 1080),
    /** Testimonials page — happy guests celebrating */
    testimonials: U("1529543544282-ea669407fca3", 1920, 1080),
    /** Contact page — approachable chef / team portrait */
    contact: U("1556157382-97eda2d62296", 1920, 1080),
    /** FAQ page — clean close-up food detail */
    faq: U("1504674900247-0877df9cc836", 1920, 1080),
  },

  // ─── About Page ──────────────────────────────────────────────────────────────

  about: {
    /** OurStory right-column photo card — chef plating food */
    kitchenCard: U("1581299894007-aaa50297cf16", 800, 600),
    /** Homepage AboutSection left-column card — kitchen team */
    homepageCard: U("1565299585323-38d6b0865b47", 800, 600),
    /** Chefs preparing food together — used in WhyChooseUs */
    teamWorking: U("1529692236671-f1f6cf9683ba", 800, 600),
  },

  // ─── Service Cover Images ────────────────────────────────────────────────────
  // One per service — shown in ServiceDetailHero and ServicesGrid

  services: {
    /** Wedding — elegant reception table with floral centrepieces */
    wedding: U("1465495976277-4387d4b0b4c6", 1200, 800),
    /** Corporate — smart buffet, suited-up event */
    corporate: U("1414235077428-338989a2e8c0", 1200, 800),
    /** Parties — colourful celebration spread */
    parties: U("1530103862676-de8c9debad1d", 1200, 800),
    /** Private dining — intimate candlelit table setting */
    privateDining: U("1424847651672-bf20a4b0982b", 1200, 800),
    /** Outdoor events — garden event under a canopy */
    outdoorEvents: U("1529543544282-ea669407fca3", 1200, 800),
    /** Cocktail receptions — elegant canapés / grazing board */
    cocktail: U("1567521464027-f127ff144326", 1200, 800),
  },

  // ─── Team Headshot Placeholders ──────────────────────────────────────────────
  // Replace by uploading real headshots in Sanity Studio → About → Team Members

  team: {
    /** Founder & Head Chef — female chef portrait */
    founder: U("1494790108377-be9c29b29330", 600, 600),
    /** Operations Director — professional male portrait */
    operations: U("1507003211169-0a1dd7228f2d", 600, 600),
    /** Senior Chef — chef in uniform */
    chef: U("1531746020798-e6953c6e8e04", 600, 600),
    /** Client Relations — professional female portrait */
    clientRel: U("1573496359142-b8d87734a5a2", 600, 600),
  },

  // ─── Gallery Fallback Tiles ───────────────────────────────────────────────────
  // Shown in GalleryMasonry and GalleryPreview when no Sanity galleryItem docs exist.
  // Upload galleryItem documents in Sanity Studio to replace all of these.

  gallery: {
    // Weddings
    wedding1: U("1520857014576-2c4f4c972b57", 800, 800),
    wedding2: U("1465495976277-4387d4b0b4c6", 800, 800),
    wedding3: U("1519167758481-83f550bb49b3", 800, 800),
    // Food close-ups
    food1: U("1555939594-58d7cb561ad1", 800, 800),
    food2: U("1567620905732-2d1ec7ab7445", 800, 800),
    food3: U("1504674900247-0877df9cc836", 800, 800),
    food4: U("1565299585323-38d6b0865b47", 800, 800),
    // Corporate
    corporate1: U("1414235077428-338989a2e8c0", 800, 800),
    corporate2: U("1556909114-f6e7ad7d3136", 800, 800),
    // Parties
    party1: U("1530103862676-de8c9debad1d", 800, 800),
    party2: U("1514525253161-7a46d19cd819", 800, 800),
    // Setup / behind the scenes
    setup1: U("1581299894007-aaa50297cf16", 800, 800),
    setup2: U("1577219491135-ce391730fb2c", 800, 800),
    setup3: U("1424847651672-bf20a4b0982b", 800, 800),
    // Cocktail / drinks
    cocktail1: U("1567521464027-f127ff144326", 800, 800),
    cocktail2: U("1529543544282-ea669407fca3", 800, 800),
    // Outdoor
    outdoor1: U("1500530855697-b586d89ba3ee", 800, 800),
    outdoor2: U("1519167758481-83f550bb49b3", 800, 800),
  },

  // ─── Contact Page ───────────────────────────────────────────────────────────
  // Static map preview — replace with a real Google Maps <iframe> in production.
  // Instructions are in ContactInfo.tsx as a comment block.

  contact: {
    /** Aerial city view used as map placeholder — replace with real Maps embed */
    mapPreview: U("1477959858617-67f85cf4f1df", 600, 400),
  },

  // ─── Signature Dishes (Menu page) ────────────────────────────────────────────

  dishes: {
    /** Firewood Jollof Rice — warm orange tones, steaming */
    jollof: U("1555939594-58d7cb561ad1", 600, 600),
    /** Live Suya Station — grilled meat, charred, rustic */
    suya: U("1504674900247-0877df9cc836", 600, 600),
    /** Egusi Soup & Swallow — rich earthy bowl */
    egusi: U("1567620905732-2d1ec7ab7445", 600, 600),
    /** Small Chops Platter — varied canapés, elegant tray */
    smallChops: U("1567521464027-f127ff144326", 600, 600),
  },
} as const;

// Type helper
export type ImageKey = keyof typeof IMAGES;
