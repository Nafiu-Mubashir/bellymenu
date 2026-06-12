// ─── Sanity Image ───────────────────────────────────────────────────────────
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

// ─── Sanity Slug ─────────────────────────────────────────────────────────────
export interface SanitySlug {
  _type: "slug";
  current: string;
}

// ─── Stat Item ───────────────────────────────────────────────────────────────
export interface StatItem {
  value: string;
  suffix: string;
  label: string;
}

// ─── Homepage ────────────────────────────────────────────────────────────────
export interface HomepageData {
  heroEyebrow: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroStats: StatItem[];
  marqueeItems: string[];
}

// ─── Service ─────────────────────────────────────────────────────────────────
export interface Service {
  _id: string;
  icon: string;
  title: string;
  description: string;
  slug: SanitySlug;
  order: number;
  heroTagline?: string;
  coverImage?: SanityImage;
}

// ─── Testimonial ─────────────────────────────────────────────────────────────
export interface Testimonial {
  _id: string;
  name: string;
  eventType: string;
  location: string;
  year: string;
  quote: string;
  rating: number;
  initials: string;
}

// ─── Gallery Item ────────────────────────────────────────────────────────────
export interface GalleryItem {
  _id: string;
  title: string;
  image: SanityImage;
  category: string;
  order: number;
}

// ─── About Pillar ────────────────────────────────────────────────────────────
export interface AboutPillar {
  icon: string;
  title: string;
  description: string;
}

// ─── Navigation Link ─────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ─── Footer Column ───────────────────────────────────────────────────────────
export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

// ─── About ────────────────────────────────────────────────────────────────────
export interface TeamMember {
  _key?: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  image?: SanityImage;
}

export interface Milestone {
  _key?: string;
  year: string;
  label: string;
}

export interface AboutData {
  tagline?: string;
  story?: string;
  mission?: string;
  teamMembers?: TeamMember[];
  milestones?: Milestone[];
}

// ─── Menu (extended) ──────────────────────────────────────────────────────────
export type DietaryTag = "vegan" | "vegetarian" | "gluten-free" | "halal";

export interface MenuItemExtended {
  name: string;
  description?: string;
  dietary?: DietaryTag[];
  isSignature?: boolean;
}

export interface MenuCategoryExtended {
  _id: string;
  name: string;
  slug: SanitySlug;
  description?: string;
  emoji?: string;
  items: MenuItemExtended[];
}

// ─── Service Package / Tier ───────────────────────────────────────────────────
export interface ServicePackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

// ─── Process Step ─────────────────────────────────────────────────────────────
export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}


// ─── Service Detail (full page) ───────────────────────────────────────────────
export interface ServiceDetail extends Service {
  packages: ServicePackage[];
  processSteps: ProcessStep[];
  relatedServices: Service[];
  faq: FAQItem[];
  gallery: GalleryItem[];
  heroTagline?: string;
  longDescription?: string;
  highlights?: string[];
  features: string[];
  priceFrom: string;
}