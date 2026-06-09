import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ServiceDetail } from "@/types";
import CTABanner from "@/components/sections/CTABanner";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServiceOverview from "@/components/services/ServiceOverview";
import ServicePackages from "@/components/services/ServicePackages";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import RelatedServices from "@/components/services/RelatedServices";
import {
  SERVICE_SLUGS_QUERY,
  SERVICE_DETAIL_QUERY,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";

// ─── Full fallback data keyed by slug ─────────────────────────────────────────
const FALLBACK_SERVICES: Record<string, ServiceDetail> = {
  "wedding-catering": {
    _id: "1",
    icon: "💍",
    title: "Wedding Catering",
    order: 1,
    slug: { _type: "slug", current: "wedding-catering" },
    heroTagline: "Where every bite tells your love story",
    description: "Elegant, multi-course menus curated for your perfect day.",
    longDescription:
      "Your wedding day deserves food as memorable as the occasion itself. At Bellymenu Kitchen, we understand that no two weddings are alike — which is why every menu we craft is designed around your unique story, your guests, and your vision.\n\nFrom intimate garden ceremonies to grand ballroom receptions for 500+, our team handles every detail with grace and professionalism. We combine the rich, bold flavours of Nigerian cuisine with continental classics, creating a spread that feels both celebratory and deeply personal.\n\nOur wedding service includes a dedicated event coordinator, a full tasting session before the day, and a team of experienced chefs and service staff who understand that your wedding is the most important day of the year.",
    highlights: [
      "Cater 50 to 1,000+ guests",
      "Full tasting session included",
      "Nigerian & continental menus",
      "Halal & dietary options available",
    ],
    features: [
      "Cocktail hour canapé service",
      "Seated multi-course dinner",
      "Buffet or plated options",
      "Custom cake coordination",
      "Late-night snack stations",
      "Uniformed service staff",
      "Full setup and teardown",
      "Dedicated event coordinator",
    ],
    priceFrom: "₦250,000",
    packages: [
      {
        name: "Essential",
        price: "₦250,000",
        description: "Perfect for intimate weddings of 50–100 guests.",
        features: [
          "3-course seated dinner",
          "Service staff (1:10 ratio)",
          "Basic decor setup",
          "Post-event cleanup",
        ],
        highlighted: false,
      },
      {
        name: "Signature",
        price: "₦500,000",
        description: "Our most popular wedding package for 100–300 guests.",
        features: [
          "Cocktail hour + 4-course dinner",
          "Premium service staff",
          "Live food station",
          "Full decor setup",
          "Dedicated coordinator",
          "Tasting session included",
        ],
        highlighted: true,
      },
      {
        name: "Grand",
        price: "Custom",
        description: "Bespoke service for large celebrations of 300+ guests.",
        features: [
          "Full cocktail + multi-course dinner",
          "Senior chef on-site",
          "Multiple live stations",
          "Complete décor & florals",
          "Day-of coordinator",
          "Rehearsal dinner option",
        ],
        highlighted: false,
      },
    ],
    processSteps: [
      {
        step: "01",
        icon: "📞",
        title: "Initial Enquiry",
        description:
          "Reach out with your date, guest count, and vision. We'll get back to you within 24 hours.",
      },
      {
        step: "02",
        icon: "☕",
        title: "Consultation Meeting",
        description:
          "We meet to understand your story, theme, and preferences — in person or virtually.",
      },
      {
        step: "03",
        icon: "📋",
        title: "Menu Design & Tasting",
        description:
          "We craft your custom menu and invite you for a complimentary tasting session.",
      },
      {
        step: "04",
        icon: "✅",
        title: "Confirm & Relax",
        description:
          "Once you're happy, we handle everything on the day so you can be fully present.",
      },
    ],
    faq: [
      {
        _id: "f1",
        question: "How far in advance should I book?",
        answer:
          "We recommend booking at least 3–6 months in advance for weddings, especially for peak season dates (December, Easter).",
      },
      {
        _id: "f2",
        question: "Do you cater outside Abuja?",
        answer:
          "Yes — we cater across Nigeria including Lagos, Port Harcourt, and Enugu. Travel and logistics fees apply for events outside Abuja.",
      },
      {
        _id: "f3",
        question: "Can we have a tasting session?",
        answer:
          "Absolutely. We offer a complimentary tasting session once you confirm your booking. Up to 4 guests can attend.",
      },
      {
        _id: "f4",
        question: "Do you handle halal and dietary requirements?",
        answer:
          "Yes. We accommodate halal, vegetarian, vegan, gluten-free, and other dietary requirements. Just let us know during consultation.",
      },
    ],
    relatedServices: [
      {
        _id: "3",
        icon: "🎉",
        title: "Parties & Celebrations",
        description: "Make every milestone unforgettable.",
        slug: { _type: "slug", current: "parties" },
        order: 3,
      },
      {
        _id: "6",
        icon: "🥂",
        title: "Cocktail Receptions",
        description: "Sophisticated bites for elegant evenings.",
        slug: { _type: "slug", current: "cocktail-receptions" },
        order: 6,
      },
      {
        _id: "4",
        icon: "🍽️",
        title: "Private Dining",
        description: "Exclusive chef-crafted dining at your venue.",
        slug: { _type: "slug", current: "private-dining" },
        order: 4,
      },
    ],
    gallery: [],
  },
  "corporate-events": {
    _id: "2",
    icon: "🏢",
    title: "Corporate Events",
    order: 2,
    slug: { _type: "slug", current: "corporate-events" },
    heroTagline: "Impressive food. Seamless service.",
    description: "Professional catering that reflects your brand standards.",
    longDescription:
      "First impressions matter in business — and the food at your corporate event communicates more about your company than you might think. Bellymenu Kitchen brings the same level of professionalism to your event that you bring to your work.\n\nFrom smart working lunches to black-tie annual dinners, we tailor every aspect of the catering experience to your brand, your guests, and your goals. Punctual, presentable, and precise.\n\nWe work with some of Nigeria's leading corporations and multinationals, and understand the specific demands of corporate event catering — from strict timing to dietary labelling to on-invoice billing.",
    highlights: [
      "Same-day setup available",
      "Invoice billing for companies",
      "Dietary labelling provided",
      "Multiple event formats",
    ],
    features: [
      "Working lunch setups",
      "Conference & seminar catering",
      "Annual gala dinners",
      "Product launch catering",
      "Away-day events",
      "Branded food stations",
      "Dietary labelling included",
      "On-invoice billing available",
    ],
    priceFrom: "₦150,000",
    packages: [
      {
        name: "Working Lunch",
        price: "₦150,000",
        description: "Professional lunch setup for meetings and seminars.",
        features: [
          "Buffet lunch setup",
          "Soft drinks & water",
          "Service staff",
          "Setup & cleanup",
        ],
        highlighted: false,
      },
      {
        name: "Corporate Dinner",
        price: "₦350,000",
        description: "Formal dining for galas and company celebrations.",
        features: [
          "3-course plated dinner",
          "Welcome drinks",
          "Uniformed staff",
          "Table setup & styling",
          "Full cleanup",
        ],
        highlighted: true,
      },
      {
        name: "Full Event Package",
        price: "Custom",
        description: "Complete catering management for large corporate events.",
        features: [
          "Full-day catering",
          "Multiple service formats",
          "Branded stations",
          "Dedicated coordinator",
          "AV-friendly setup",
        ],
        highlighted: false,
      },
    ],
    processSteps: [
      {
        step: "01",
        icon: "📧",
        title: "Send a Brief",
        description:
          "Email or WhatsApp us your event brief — date, guest count, format, and any brand requirements.",
      },
      {
        step: "02",
        icon: "📞",
        title: "Proposal Call",
        description:
          "We confirm the details and present a tailored proposal including menu options and pricing.",
      },
      {
        step: "03",
        icon: "✍️",
        title: "Sign Off",
        description:
          "Approve the menu and service plan. We handle all logistics from here.",
      },
      {
        step: "04",
        icon: "🏆",
        title: "Flawless Execution",
        description:
          "Our team arrives early, sets up professionally, and delivers service that reflects your brand.",
      },
    ],
    faq: [
      {
        _id: "f1",
        question: "Can you provide invoices for company billing?",
        answer:
          "Yes — we issue professional invoices and can work with your company's procurement process.",
      },
      {
        _id: "f2",
        question: "What is your minimum guest count for corporate events?",
        answer:
          "We typically cater for a minimum of 20 guests, though we can accommodate smaller executive dinners on request.",
      },
      {
        _id: "f3",
        question: "Can you set up within a corporate office?",
        answer:
          "Yes. We're experienced in office setups, boardrooms, and conference venues. We work quietly and efficiently around your space.",
      },
      {
        _id: "f4",
        question: "Do you provide dietary labelling?",
        answer:
          "Absolutely. All buffet items can be labelled with allergen and dietary information as standard.",
      },
    ],
    relatedServices: [
      {
        _id: "1",
        icon: "💍",
        title: "Wedding Catering",
        description: "Elegant menus for your perfect day.",
        slug: { _type: "slug", current: "wedding-catering" },
        order: 1,
      },
      {
        _id: "6",
        icon: "🥂",
        title: "Cocktail Receptions",
        description: "Sophisticated bites for elegant evenings.",
        slug: { _type: "slug", current: "cocktail-receptions" },
        order: 6,
      },
      {
        _id: "5",
        icon: "🌿",
        title: "Outdoor Events",
        description: "Professional catering anywhere you need it.",
        slug: { _type: "slug", current: "outdoor-events" },
        order: 5,
      },
    ],
    gallery: [],
  },
  parties: {
    _id: "3",
    icon: "🎉",
    title: "Parties & Celebrations",
    order: 3,
    slug: { _type: "slug", current: "parties" },
    heroTagline: "Because every milestone deserves a feast",
    description:
      "Birthdays, anniversaries, graduations — every milestone, deliciously celebrated.",
    longDescription:
      "Life's milestones deserve to be celebrated in style — and that means incredible food. Whether it's a surprise 50th birthday, a graduation bash, or a golden anniversary, Bellymenu Kitchen brings the feast that makes the night legendary.\n\nWe work with your theme, your vibe, and your guest list to craft a menu that feels made for the moment — because it is. From jollof rice stations to themed dessert tables, we know how to make a party feel special.\n\nOur party catering is flexible, fun, and always exceptional. Small intimate gathering? We've got you. Big celebration with 300 guests? Even better.",
    highlights: [
      "From 20 to 500+ guests",
      "Weekend & evening availability",
      "Theme-aligned presentation",
      "Themed food display options",
    ],
    features: [
      "Theme-aligned food presentation",
      "Buffet and cocktail options",
      "Live food stations",
      "Birthday cake coordination",
      "Kids menu available",
      "Outdoor party setups",
      "Late-night suya & small chops",
      "Custom dessert tables",
    ],
    priceFrom: "₦100,000",
    packages: [
      {
        name: "Intimate Celebration",
        price: "₦100,000",
        description: "For gatherings of 20–50 guests.",
        features: [
          "Buffet spread",
          "Small chops",
          "Soft drinks",
          "Service staff",
          "Basic setup",
        ],
        highlighted: false,
      },
      {
        name: "Party Package",
        price: "₦250,000",
        description: "Full celebration setup for 50–200 guests.",
        features: [
          "Full buffet + live station",
          "Birthday cake coordination",
          "Themed food display",
          "Service staff",
          "Full setup & cleanup",
        ],
        highlighted: true,
      },
      {
        name: "Grand Celebration",
        price: "Custom",
        description: "Large-scale events and milestone birthdays.",
        features: [
          "Multiple live stations",
          "Custom themed setup",
          "Entertainment coordination",
          "Dedicated coordinator",
          "Full day service",
        ],
        highlighted: false,
      },
    ],
    processSteps: [
      {
        step: "01",
        icon: "🎂",
        title: "Tell Us About Your Celebration",
        description:
          "Share the occasion, guest count, theme, and any special requests.",
      },
      {
        step: "02",
        icon: "🎨",
        title: "Theme & Menu Design",
        description:
          "We match the menu and presentation to your theme and vision.",
      },
      {
        step: "03",
        icon: "📦",
        title: "We Prepare Everything",
        description:
          "Fresh cooking begins the morning of your event for maximum quality.",
      },
      {
        step: "04",
        icon: "🎉",
        title: "You Celebrate, We Serve",
        description:
          "Our team runs the show so you can focus on having the time of your life.",
      },
    ],
    faq: [
      {
        _id: "f1",
        question: "Can you match a specific colour or theme?",
        answer:
          "Yes! We work with your theme for food presentation, display styling, and table setup. Share your mood board and we'll make it work.",
      },
      {
        _id: "f2",
        question: "Do you do children's parties?",
        answer:
          "Absolutely. We offer kid-friendly menus and can adapt the setup to be child-safe and fun.",
      },
      {
        _id: "f3",
        question: "Can you do late-night suya and small chops?",
        answer:
          "One of our specialities! We can run a dedicated suya and small chops station as a late-night addition.",
      },
      {
        _id: "f4",
        question: "How early do I need to book?",
        answer:
          "For weekends (especially Saturdays), we recommend booking at least 4–8 weeks in advance.",
      },
    ],
    relatedServices: [
      {
        _id: "1",
        icon: "💍",
        title: "Wedding Catering",
        description: "Elegant menus for your perfect day.",
        slug: { _type: "slug", current: "wedding-catering" },
        order: 1,
      },
      {
        _id: "4",
        icon: "🍽️",
        title: "Private Dining",
        description: "Exclusive chef-crafted dining.",
        slug: { _type: "slug", current: "private-dining" },
        order: 4,
      },
      {
        _id: "6",
        icon: "🥂",
        title: "Cocktail Receptions",
        description: "Sophisticated bites for elegant evenings.",
        slug: { _type: "slug", current: "cocktail-receptions" },
        order: 6,
      },
    ],
    gallery: [],
  },
  "private-dining": {
    _id: "4",
    icon: "🍽️",
    title: "Private Dining",
    order: 4,
    slug: { _type: "slug", current: "private-dining" },
    heroTagline: "A restaurant experience, in your own space",
    description:
      "An exclusive chef-crafted experience at your home or private venue.",
    longDescription:
      "Some occasions call for something truly exclusive. Private dining with Bellymenu Kitchen brings a world-class restaurant experience directly to your home, villa, or private venue — with none of the crowds and all of the magic.\n\nOur private dining service is ideal for romantic anniversaries, intimate family dinners, proposal evenings, or simply an extraordinary night in with the people who matter most.\n\nYour personal chef designs the menu around your preferences, arrives to prepare everything in your kitchen, presents each course beautifully, and leaves your space clean and serene.",
    highlights: [
      "Proposals & anniversaries a speciality",
      "Complete privacy guaranteed",
      "Chef consultation included",
      "Available in Lagos & Abuja",
    ],
    features: [
      "In-home personal chef experience",
      "Custom tasting menus",
      "Wine & drink pairing available",
      "Table dressing included",
      "Ideal for 2–20 guests",
      "Breakfast, lunch or dinner",
      "Post-dinner kitchen cleanup",
      "Dietary accommodations",
    ],
    priceFrom: "₦80,000",
    packages: [
      {
        name: "Intimate Dinner",
        price: "₦80,000",
        description: "A beautiful 3-course dinner for 2–6 guests.",
        features: [
          "3-course dinner",
          "Table dressing",
          "Personal chef",
          "Post-dinner cleanup",
        ],
        highlighted: false,
      },
      {
        name: "Private Chef Evening",
        price: "₦180,000",
        description: "Full chef experience for up to 12 guests.",
        features: [
          "5-course tasting menu",
          "Table & ambience setup",
          "Drink pairing suggestions",
          "Personal chef & server",
          "Full cleanup",
        ],
        highlighted: true,
      },
      {
        name: "Exclusive Experience",
        price: "Custom",
        description: "Bespoke dining for up to 20 guests.",
        features: [
          "Custom multi-course menu",
          "Full home transformation",
          "Sommelier pairing",
          "Dedicated chef & staff",
          "Complete event coordination",
        ],
        highlighted: false,
      },
    ],
    processSteps: [
      {
        step: "01",
        icon: "💌",
        title: "Share Your Vision",
        description:
          "Tell us the occasion, number of guests, any preferences, and where you'd like the dining experience.",
      },
      {
        step: "02",
        icon: "👨‍🍳",
        title: "Chef Consultation",
        description:
          "Your personal chef designs a custom menu around your tastes and dietary needs.",
      },
      {
        step: "03",
        icon: "🛒",
        title: "We Source & Prepare",
        description:
          "Fresh, premium ingredients are sourced and all preparation is done to the highest standard.",
      },
      {
        step: "04",
        icon: "🕯️",
        title: "A Magical Evening",
        description:
          "Your chef arrives, cooks, serves, and cleans up — leaving you with just the memories.",
      },
    ],
    faq: [
      {
        _id: "f1",
        question: "Do you bring all the equipment?",
        answer:
          "Yes — we bring everything needed including cookware, serving equipment, and table dressing. We just need your kitchen space.",
      },
      {
        _id: "f2",
        question: "Can you do a surprise dinner for a proposal?",
        answer:
          "Absolutely. We specialise in proposal dinners and work closely with you to create the perfect surprise.",
      },
      {
        _id: "f3",
        question: "What cities do you offer private dining in?",
        answer:
          "Currently Abuja and Lagos. We can travel to other cities for larger bookings — please enquire.",
      },
      {
        _id: "f4",
        question: "How many guests can you accommodate?",
        answer:
          "Our private dining service is ideal for 2–20 guests. For larger groups, our party or wedding packages may be more suitable.",
      },
    ],
    relatedServices: [
      {
        _id: "3",
        icon: "🎉",
        title: "Parties & Celebrations",
        description: "Make every milestone delicious.",
        slug: { _type: "slug", current: "parties" },
        order: 3,
      },
      {
        _id: "1",
        icon: "💍",
        title: "Wedding Catering",
        description: "Elegant menus for your perfect day.",
        slug: { _type: "slug", current: "wedding-catering" },
        order: 1,
      },
      {
        _id: "5",
        icon: "🌿",
        title: "Outdoor Events",
        description: "Great food, wherever the occasion takes you.",
        slug: { _type: "slug", current: "outdoor-events" },
        order: 5,
      },
    ],
    gallery: [],
  },
  "outdoor-events": {
    _id: "5",
    icon: "🌿",
    title: "Outdoor Events",
    order: 5,
    slug: { _type: "slug", current: "outdoor-events" },
    heroTagline: "Great food, wherever the occasion takes you",
    description:
      "Professional catering for gardens, fields, and open-air venues.",
    longDescription:
      "The great outdoors deserves great food. Bellymenu Kitchen is fully equipped for outdoor catering — from compact garden parties to sprawling open-air weddings and festivals.\n\nWe bring our complete mobile kitchen setup, weather-proof serving stations, and an experienced crew to any location. Fresh, hot, beautifully presented — regardless of the setting.\n\nWhether you're planning a garden wedding in Abuja, a beach event in Lagos, or a corporate picnic in Port Harcourt, our team has the equipment and experience to make it exceptional.",
    highlights: [
      "Available nationwide",
      "Site visit consultation included",
      "Generator backup available",
      "From 50 to 2,000+ guests",
    ],
    features: [
      "Full mobile kitchen",
      "Weather-proof serving stations",
      "Generator power backup",
      "Serving tent & structures",
      "Outdoor buffet layouts",
      "Bar & drinks service",
      "Waste management included",
      "Site visit & advance planning",
    ],
    priceFrom: "₦200,000",
    packages: [
      {
        name: "Garden Party",
        price: "₦200,000",
        description: "Relaxed outdoor setup for 50–150 guests.",
        features: [
          "Buffet station",
          "Drinks service",
          "Mobile kitchen",
          "Basic tent setup",
        ],
        highlighted: false,
      },
      {
        name: "Outdoor Event",
        price: "₦450,000",
        description: "Full outdoor event setup for 150–500 guests.",
        features: [
          "Full mobile kitchen",
          "Multiple food stations",
          "Generator backup",
          "Full tent & structure",
          "Service staff",
          "Waste management",
        ],
        highlighted: true,
      },
      {
        name: "Large-Scale Outdoor",
        price: "Custom",
        description: "Events for 500+ guests in any setting.",
        features: [
          "Multi-zone kitchen setup",
          "Full logistics coordination",
          "Site visit included",
          "Complete infrastructure",
          "Dedicated event team",
        ],
        highlighted: false,
      },
    ],
    processSteps: [
      {
        step: "01",
        icon: "📍",
        title: "Share the Location",
        description:
          "Send us the venue address, event date, and guest count. We'll assess suitability.",
      },
      {
        step: "02",
        icon: "🏕️",
        title: "Site Visit",
        description:
          "For larger events, we visit the venue in advance to plan setup, logistics, and any infrastructure needs.",
      },
      {
        step: "03",
        icon: "🚚",
        title: "Full Mobilisation",
        description:
          "Our team arrives with the complete mobile kitchen, structure, and equipment on the day.",
      },
      {
        step: "04",
        icon: "🌟",
        title: "Outdoor Excellence",
        description:
          "We deliver the same quality as any indoor event — weather, location, no excuses.",
      },
    ],
    faq: [
      {
        _id: "f1",
        question: "What if it rains?",
        answer:
          "We bring weather-proof serving structures and have contingency setups for all weather conditions. We plan for every scenario in advance.",
      },
      {
        _id: "f2",
        question: "Do you travel outside Abuja for outdoor events?",
        answer:
          "Yes — we operate nationwide. Travel and logistics fees apply. Please enquire for a custom quote.",
      },
      {
        _id: "f3",
        question: "Do you provide your own generator?",
        answer:
          "Yes. Generator backup is included in all outdoor packages to ensure uninterrupted hot food service.",
      },
      {
        _id: "f4",
        question: "Can you cater beach or waterfront events?",
        answer:
          "Absolutely — we've catered waterfront events in Lagos and coastal locations. Our mobile setup is designed for any terrain.",
      },
    ],
    relatedServices: [
      {
        _id: "1",
        icon: "💍",
        title: "Wedding Catering",
        description: "Elegant menus for your perfect day.",
        slug: { _type: "slug", current: "wedding-catering" },
        order: 1,
      },
      {
        _id: "3",
        icon: "🎉",
        title: "Parties & Celebrations",
        description: "Make every milestone unforgettable.",
        slug: { _type: "slug", current: "parties" },
        order: 3,
      },
      {
        _id: "2",
        icon: "🏢",
        title: "Corporate Events",
        description: "Professional catering for your brand.",
        slug: { _type: "slug", current: "corporate-events" },
        order: 2,
      },
    ],
    gallery: [],
  },
  "cocktail-receptions": {
    _id: "6",
    icon: "🥂",
    title: "Cocktail Receptions",
    order: 6,
    slug: { _type: "slug", current: "cocktail-receptions" },
    heroTagline: "Sophisticated bites for memorable evenings",
    description:
      "Curated canapés, live stations, and premium service for sophisticated receptions.",
    longDescription:
      "A well-executed cocktail reception sets the tone for any event. Bellymenu Kitchen specialises in sophisticated, high-impact canapé and drinks service that keeps guests mingling, satisfied, and impressed.\n\nFrom passed canapés to interactive food stations, we design each reception menu to complement the occasion — whether it's a gallery opening, an awards ceremony, or the start of a grand wedding day.\n\nOur cocktail reception team is trained in elegant, discreet service — gliding through your guests, presenting beautiful bites, and keeping the energy effortless.",
    highlights: [
      "Ideal for 50–300 guests",
      "Custom canapé design",
      "Elegant presentation standard",
      "Premium ingredient sourcing",
    ],
    features: [
      "Passed canapé service",
      "Live cooking stations",
      "Charcuterie & grazing tables",
      "Miniature dessert selection",
      "Mocktail & cocktail service",
      "Uniformed waiting staff",
      "1–3 hour service window",
      "Custom canapé menu design",
    ],
    priceFrom: "₦120,000",
    packages: [
      {
        name: "Classic Reception",
        price: "₦120,000",
        description: "Elegant canapé service for 50–100 guests.",
        features: [
          "6 canapé varieties",
          "Uniformed staff",
          "Drinks service",
          "1.5 hr window",
        ],
        highlighted: false,
      },
      {
        name: "Premium Reception",
        price: "₦280,000",
        description: "Full cocktail reception experience for up to 200 guests.",
        features: [
          "10 canapé varieties",
          "Live station",
          "Grazing table",
          "Cocktail service",
          "Full uniformed team",
          "2.5 hr window",
        ],
        highlighted: true,
      },
      {
        name: "Signature Reception",
        price: "Custom",
        description: "Bespoke cocktail event for up to 300+ guests.",
        features: [
          "Custom canapé menu",
          "Multiple live stations",
          "Premium ingredients",
          "Full bar service",
          "Dedicated maître d'",
          "3+ hr window",
        ],
        highlighted: false,
      },
    ],
    processSteps: [
      {
        step: "01",
        icon: "🥂",
        title: "Describe Your Event",
        description:
          "Tell us the occasion, guest count, duration, and any style preferences.",
      },
      {
        step: "02",
        icon: "🍴",
        title: "Canapé Design Session",
        description:
          "We present a curated canapé selection for you to choose and personalise.",
      },
      {
        step: "03",
        icon: "👔",
        title: "Staff & Logistics Brief",
        description:
          "We brief our service team on your event, space, and guest profile.",
      },
      {
        step: "04",
        icon: "✨",
        title: "A Flawless Reception",
        description:
          "Our team arrives immaculately uniformed and delivers effortless, elegant service.",
      },
    ],
    faq: [
      {
        _id: "f1",
        question: "How many canapés per person should I order?",
        answer:
          "As a standalone reception (no dinner following): 8–10 pieces per person. If preceding a meal: 4–6 pieces. We'll advise based on your timings.",
      },
      {
        _id: "f2",
        question: "Can you do non-alcoholic cocktail service?",
        answer:
          "Yes — our signature mocktail menu is extensive and beautiful. We can do fully non-alcoholic or a mix.",
      },
      {
        _id: "f3",
        question: "Do you work with event planners and venues?",
        answer:
          "Absolutely. We work regularly with event planners, wedding coordinators, and venue managers. We're easy to work with.",
      },
      {
        _id: "f4",
        question: "Can this be added to another service (e.g. pre-wedding)?",
        answer:
          "Yes — a cocktail reception package can be added to any wedding, corporate, or party booking as a pre-event service.",
      },
    ],
    relatedServices: [
      {
        _id: "1",
        icon: "💍",
        title: "Wedding Catering",
        description: "Elegant menus for your perfect day.",
        slug: { _type: "slug", current: "wedding-catering" },
        order: 1,
      },
      {
        _id: "2",
        icon: "🏢",
        title: "Corporate Events",
        description: "Professional catering for your brand.",
        slug: { _type: "slug", current: "corporate-events" },
        order: 2,
      },
      {
        _id: "4",
        icon: "🍽️",
        title: "Private Dining",
        description: "Exclusive chef-crafted dining.",
        slug: { _type: "slug", current: "private-dining" },
        order: 4,
      },
    ],
    gallery: [],
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(SERVICE_SLUGS_QUERY);

    if (slugs?.length) {
      return slugs.map((s) => ({ slug: s.slug }));
    }
  } catch {
    // fall through to fallback
  }

  return Object.keys(FALLBACK_SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
 const { slug } = await params;  // add await

  const { data } = await sanityFetch({
    query: SERVICE_DETAIL_QUERY,
    params: { slug },
  });

  const service = data as ServiceDetail | null;

  const d = service ?? FALLBACK_SERVICES[slug];

  if (!d) notFound();

  return {
    title: `${d.title} in Nigeria — Bellymenu Kitchen`,
    description: d.description,
    openGraph: {
      title: `${d.title} — Bellymenu Kitchen`,
      description: d.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  // const service = await sanityFetch<ServiceDetail>(SERVICE_DETAIL_QUERY, { slug });

  const [servicesResult] = await Promise.all([
    sanityFetch({ query: SERVICE_DETAIL_QUERY, params: { slug } }),
  ]);
  const service = servicesResult.data as ServiceDetail;
  const d = service ?? FALLBACK_SERVICES[slug];
  if (!d) notFound();

  return (
    <main className="overflow-x-hidden">
      <ServiceDetailHero service={d} />
      <ServiceOverview service={d} />
      {d.packages && d.packages.length > 0 && (
        <ServicePackages packages={d.packages} serviceTitle={d.title} />
      )}
      {d.processSteps && d.processSteps.length > 0 && (
        <ServiceProcess steps={d.processSteps} />
      )}
      {d.faq && d.faq.length > 0 && <ServiceFAQ items={d.faq} />}
      {d.relatedServices && d.relatedServices.length > 0 && (
        <RelatedServices services={d.relatedServices} />
      )}
      <CTABanner />
    </main>
  );
}
