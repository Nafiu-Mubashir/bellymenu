// ─── Homepage Hero + Marquee ─────────────────────────────────────────────────
export const HOMEPAGE_QUERY = `
  *[_type == "homepage"][0] {
    heroEyebrow,
    heroTitle,
    heroTitleAccent,
    heroSubtitle,
    heroStats[] {
      value,
      suffix,
      label
    },
    marqueeItems
  }
`;

// ─── Services ────────────────────────────────────────────────────────────────
export const SERVICES_QUERY = `
  *[_type == "service"] | order(order asc) [0...6] {
    _id,
    icon,
    title,
    description,
    slug,
    order
  }
`;

// ─── Testimonials ────────────────────────────────────────────────────────────
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(_createdAt desc) [0...3] {
    _id,
    name,
    eventType,
    location,
    year,
    quote,
    rating,
    initials
  }
`;

// ─── Gallery Preview (homepage uses first 5) ─────────────────────────────────
export const GALLERY_PREVIEW_QUERY = `
  *[_type == "galleryItem"] | order(order asc) [0...5] {
    _id,
    title,
    image {
      asset,
      hotspot,
      alt
    },
    category,
    order
  }
`;

// ─── About page ───────────────────────────────────────────────────────────────
export const ABOUT_QUERY = `
  *[_type == "about"][0] {
    tagline,
    story,
    mission,
    teamMembers[] {
      name,
      role,
      bio,
      initials
    },
    milestones[] {
      year,
      label
    }
  }
`;

// ─── Menu categories + items ──────────────────────────────────────────────────
export const MENU_QUERY = `
  *[_type == "menuCategory"] | order(order asc) {
    _id, name, slug,
    description,
    emoji,
    items[] { name, description, dietary, isSignature }
  }
`;

// ─── All services (listing page) ─────────────────────────────────────────────
export const ALL_SERVICES_QUERY = `
  *[_type == "service"] | order(order asc) {
    _id, icon, title, description, heroTagline, slug, order,
    coverImage { asset, hotspot, alt },
    highlights
  }
`;

// ─── Single service detail ────────────────────────────────────────────────────
export const SERVICE_DETAIL_QUERY = `
  *[_type == "service" && slug.current == $slug][0] {
    _id, icon, title, description, heroTagline, longDescription,
    highlights, features, priceFrom, slug, order,
    coverImage { asset, hotspot, alt },
    packages[] { name, price, description, features, highlighted },
    processSteps[] { step, title, description, icon },
    faq[] { _key, question, answer },
    gallery[]-> {
      _id, title,
      image { asset, hotspot, alt },
      category, order
    },
    "relatedServices": *[_type == "service" && slug.current != $slug] | order(order asc) [0...3] {
      _id, icon, title, description, slug, order
    }
  }
`;

// ─── Service slugs (generateStaticParams) ────────────────────────────────────
export const SERVICE_SLUGS_QUERY = `
  *[_type == "service"] { "slug": slug.current }
`;


// ─── All testimonials ─────────────────────────────────────────────────────────
export const ALL_TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id, name, eventType, location, year, quote, rating, initials
  }
`;


// ─── Full gallery ─────────────────────────────────────────────────────────────
export const GALLERY_QUERY = `
  *[_type == "galleryItem"] | order(order asc) {
    _id, title,
    image { asset, hotspot, alt },
    category, order
  }
`;

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ_QUERY = `
  *[_type == "faq"] | order(order asc) {
    _id, question, answer, order
  }
`;