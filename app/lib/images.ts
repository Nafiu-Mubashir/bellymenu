/**
 * Bellymenu Kitchen — Centralized Stock Image Registry
 *
 * All stock images are sourced from Unsplash (free, commercial-use).
 * Format: https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w={W}&q=80
 *
 * TO REPLACE WITH ORIGINAL PHOTOGRAPHY:
 * Simply swap out the URL string for each key — everything else updates automatically.
 * Recommended: upload originals to /public/images/ and use "/images/filename.jpg"
 */

const U = (id: string, w = 1920, h = 1080) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const IMAGES = {

  // ─── Hero Backgrounds ────────────────────────────────────────────────────────
  // Dimmed with overlay — opacity 15–25% — so needs rich colour/contrast

  hero: {
    /** Homepage hero — elegant Nigerian event table, warm lighting */
    homepage:     U("1555939594-58d7cb561ad1", 1920, 1080),
    /** Services listing — banquet hall setup */
    services:     U("1414235077428-338989a2e8c0", 1920, 1080),
    /** About page — behind-the-scenes kitchen */
    about:        U("1577219491135-ce391730fb2c", 1920, 1080),
    /** Menu page — overhead Nigerian/African food spread */
    menu:         U("1567620905732-2d1ec7ab7445", 1920, 1080),
    /** Gallery page — grand reception / event photo */
    gallery:      U("1519225421980-9b9571fa0f48", 1920, 1080),
    /** Booking page — warm kitchen/team shot */
    booking:      U("1556909114-f6e7ad7d3136", 1920, 1080),
    /** Testimonials page — happy guests celebrating */
    testimonials: U("1529543544282-ea669407fca3", 1920, 1080),
    /** Contact page — approachable chef portrait */
    contact:      U("1600565597-8b6abf08fad8", 1920, 1080),
    /** FAQ page — clean food detail */
    faq:          U("1504674900247-0877df9cc836", 1920, 1080),
  },

  // ─── About Page ──────────────────────────────────────────────────────────────

  about: {
    /** OurStory card — chef at work */
    kitchenCard:  U("1581299894007-aaa50297cf16", 800, 600),
    /** Homepage AboutSection card */
    homepageCard: U("1565299585323-38d6b0865b47", 800, 600),
  },

  // ─── Service Cover Images (one per service) ──────────────────────────────────

  services: {
    /** Wedding — elegant reception table with centrepieces */
    wedding:      U("1519225421980-9b9571fa0f48", 1200, 800),
    /** Corporate — smart buffet, suited guests */
    corporate:    U("1414235077428-338989a2e8c0", 1200, 800),
    /** Parties — colourful celebration spread */
    parties:      U("1530103862676-de8c9debad1d", 1200, 800),
    /** Private dining — intimate candlelit table */
    privateDining:U("1424847651672-bf20a4b0982b", 1200, 800),
    /** Outdoor events — garden event setup */
    outdoorEvents:U("1464366400600-ac67b7a5ba1e", 1200, 800),
    /** Cocktail receptions — elegant canapés / grazing table */
    cocktail:     U("1567521464027-f127ff144326", 1200, 800),
  },

  // ─── Team Headshot Placeholders ──────────────────────────────────────────────
  // (Replace with real headshots ASAP — highest trust signal)

  team: {
    founder:    U("1494790108377-be9c29b29330", 400, 400),
    operations: U("1507003211169-0a1dd7228f2d", 400, 400),
    chef:       U("1531746020798-e6953c6e8e04", 400, 400),
    clientRel:  U("1573496359142-b8d87734a5a2", 400, 400),
  },

  // ─── Gallery Fallback Tiles ───────────────────────────────────────────────────
  // Used when no Sanity galleryItem documents exist yet

  gallery: {
    wedding1:   U("1519225421980-9b9571fa0f48", 800, 800),
    wedding2:   U("1465495976277-4387d4b0b4c6", 800, 800),
    wedding3:   U("1519167758481-83f550bb49b3", 800, 800),
    food1:      U("1555939594-58d7cb561ad1", 800, 800),
    food2:      U("1567620905732-2d1ec7ab7445", 800, 800),
    food3:      U("1504674900247-0877df9cc836", 800, 800),
    food4:      U("1565299585323-38d6b0865b47", 800, 800),
    corporate1: U("1414235077428-338989a2e8c0", 800, 800),
    corporate2: U("1556909114-f6e7ad7d3136", 800, 800),
    party1:     U("1530103862676-de8c9debad1d", 800, 800),
    party2:     U("1514525253161-7a46d19cd819", 800, 800),
    setup1:     U("1581299894007-aaa50297cf16", 800, 800),
    setup2:     U("1577219491135-ce391730fb2c", 800, 800),
    setup3:     U("1424847651672-bf20a4b0982b", 800, 800),
    cocktail1:  U("1567521464027-f127ff144326", 800, 800),
    cocktail2:  U("1529543544282-ea669407fca3", 800, 800),
    outdoor1:   U("1464366400600-ac67b7a5ba1e", 800, 800),
    outdoor2:   U("1519167758481-83f550bb49b3", 800, 800),
  },

  // ─── Menu / Signature Dishes ─────────────────────────────────────────────────

  dishes: {
    jollof:     U("1555939594-58d7cb561ad1", 600, 600),
    suya:       U("1504674900247-0877df9cc836", 600, 600),
    egusi:      U("1567620905732-2d1ec7ab7445", 600, 600),
    smallChops: U("1567521464027-f127ff144326", 600, 600),
  },

} as const;

// Type helper — useful for prop typing
export type ImageKey = keyof typeof IMAGES;
