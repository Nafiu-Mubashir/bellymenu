"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search } from "lucide-react";
import type { FAQItem } from "@/types";

// ─── Fallback data — organised by category ────────────────────────────────────
const FALLBACK_FAQS: FAQItem[] = [
  // Booking & Planning
  { _id: "1",  category: "Booking & Planning",   order: 1,  question: "How far in advance should I book Bellymenu Kitchen?", answer: "We recommend booking at least 4–6 weeks in advance for standard events, and 3–6 months for large weddings or corporate galas. However, we always do our best to accommodate last-minute requests — reach out and we'll let you know our availability." },
  { _id: "2",  category: "Booking & Planning",   order: 2,  question: "How does your consultation process work?", answer: "After you submit a quote request or get in touch, a team member contacts you within 24 hours. We schedule a free consultation — in person or via video call — where we discuss your event, guest count, menu preferences, and budget. You'll receive a tailored proposal within 48 hours of the consultation." },
  { _id: "3",  category: "Booking & Planning",   order: 3,  question: "Is there a minimum guest count?", answer: "Our minimum for full-service catering is typically 30 guests. For intimate private dining experiences, we can cater for as few as 10 guests. Contact us to discuss your specific needs — we'll do our best to find a solution that works." },
  { _id: "4",  category: "Booking & Planning",   order: 4,  question: "Do you require a deposit to confirm a booking?", answer: "Yes. Once you're happy with your proposal, we confirm your booking with a 30–50% deposit (depending on event size and lead time). The remaining balance is due 7 days before the event. For last-minute bookings, full payment may be required upfront." },
  { _id: "5",  category: "Booking & Planning",   order: 5,  question: "What is your cancellation policy?", answer: "Cancellations made more than 30 days before the event receive a 70% refund of the deposit. Within 14–30 days, 50% is refunded. Cancellations within 14 days are non-refundable as we will have already purchased ingredients and confirmed staffing. We always recommend event insurance for large occasions." },

  // Menu & Food
  { _id: "6",  category: "Menu & Food",          order: 1,  question: "Can you accommodate dietary requirements and allergies?", answer: "Absolutely. We cater for all major dietary requirements including halal, vegetarian, vegan, gluten-free, nut-free, and dairy-free. During your consultation, we'll discuss your guests' needs in detail and design a menu that ensures everyone is well-fed and safe. Please disclose any severe allergies as early as possible." },
  { _id: "7",  category: "Menu & Food",          order: 2,  question: "Do you do custom menus, or do I have to choose from a fixed menu?", answer: "Every Bellymenu menu is fully custom. The dishes on our website are a sample of what we offer — in your consultation, our head chef works with you to design a menu from scratch based on your event theme, guest preferences, and cultural background. Nothing is off the table (literally)." },
  { _id: "8",  category: "Menu & Food",          order: 3,  question: "Can you cater for both Nigerian and continental dishes at the same event?", answer: "Yes — this is one of our specialties. We regularly create menus that seamlessly blend Nigerian classics (like firewood jollof rice, suya stations, and egusi soup) with continental options (grilled salmon, pasta stations, carving boards). Our team is experienced in executing both with equal excellence." },
  { _id: "9",  category: "Menu & Food",          order: 4,  question: "Do you offer food tasting sessions?", answer: "Yes, we offer optional tasting sessions for weddings and large events (100+ guests). Tasting sessions are held at our kitchen in Abuja and can be scheduled after your initial consultation. A tasting fee applies but is credited against your final invoice when you confirm the booking." },
  { _id: "10", category: "Menu & Food",          order: 5,  question: "Do you provide drinks and bar service as well?", answer: "Yes. We offer Nigerian signature drinks (Chapman, Zobo, Kunu, fresh juices) and can arrange full cocktail and mocktail bar service. For events requiring licensed alcohol service, we partner with certified bar operators. Let us know during consultation and we'll build it into your package." },

  // Service & Logistics
  { _id: "11", category: "Service & Logistics",  order: 1,  question: "Do you cater for events outside Abuja?", answer: "Yes! We regularly cater events in Lagos, Port Harcourt, Enugu, Ibadan, and other cities across Nigeria. Travel and logistics costs apply for events outside Abuja, and we require a minimum notice period for out-of-town bookings. Contact us with your location and we'll confirm feasibility." },
  { _id: "12", category: "Service & Logistics",  order: 2,  question: "What does your service include — do you handle setup and cleanup?", answer: "Our full-service package includes everything: food preparation, delivery, professional setup of food stations and presentation, uniformed service staff throughout the event, and full cleanup and pack-down at the end. You don't lift a finger — we handle it all so you can focus on your guests." },
  { _id: "13", category: "Service & Logistics",  order: 3,  question: "Do you bring your own equipment and serving ware?", answer: "Yes. We supply all necessary equipment including chafing dishes, serving utensils, food warmers, tablecloths for food stations, and standard service ware. If you require premium crockery, custom linen, or specialised equipment, we can source it for an additional fee." },
  { _id: "14", category: "Service & Logistics",  order: 4,  question: "How do you handle outdoor and open-air events?", answer: "We have extensive experience with outdoor events. We bring canopies and weather contingency plans as needed, and all our food is prepared fresh on-site or transported in temperature-controlled containers. We conduct a site visit for larger outdoor events to plan setup logistics." },

  // Pricing
  { _id: "15", category: "Pricing",              order: 1,  question: "How do you price your services?", answer: "Our pricing is per-head, based on your menu selections, event type, guest count, and location. Because every menu is custom, we don't publish fixed price lists — your proposal will include a detailed per-head breakdown. As a rough guide, full-service catering starts from ₦5,000 per head for basic packages and rises with premium selections and service levels." },
  { _id: "16", category: "Pricing",              order: 2,  question: "What's included in a quote?", answer: "Your quote will include: itemised menu with all dishes, per-head pricing, service staff costs, equipment, setup and cleanup, and any applicable travel costs. Everything is transparent — there are no hidden fees. Any changes to the menu or guest count after the quote will be reflected in an updated proposal." },
  { _id: "17", category: "Pricing",              order: 3,  question: "Can we get catering for a small, budget-conscious event?", answer: "Yes. We offer scaled packages for smaller events and can work creatively within budget constraints. During your consultation, be upfront about your budget and we'll design the best possible menu within it. We'd rather give you a smaller, excellent spread than overpromise on a larger, compromised one." },
];

// ─── Category order ───────────────────────────────────────────────────────────
const CATEGORY_ORDER = [
  "Booking & Planning",
  "Menu & Food",
  "Service & Logistics",
  "Pricing",
];

// ─── Accordion item ───────────────────────────────────────────────────────────
function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
        isOpen
          ? "border-green-200 shadow-sm shadow-green-50"
          : "border-neutral-100 hover:border-neutral-200"
      } bg-white`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className={`text-sm font-semibold leading-snug transition-colors ${
          isOpen ? "text-green-700" : "text-neutral-800"
        }`}>
          {item.question}
        </span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
          isOpen ? "bg-green-600 text-white" : "bg-neutral-100 text-neutral-500"
        }`}>
          {isOpen ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-neutral-100">
              <p className="text-sm text-neutral-600 font-light leading-[1.85]">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface FAQAccordionProps {
  faqs: FAQItem[] | null;
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const list = faqs && faqs.length > 0 ? faqs : FALLBACK_FAQS;

  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  // Derive categories from data
  const categories = useMemo(() => {
    const raw = Array.from(new Set(list.map((f) => f.category).filter(Boolean)));
    const ordered = CATEGORY_ORDER.filter((c) => raw.includes(c));
    const rest = raw.filter((c) => !CATEGORY_ORDER.includes(c!));
    return ["All", ...ordered, ...rest] as string[];
  }, [list]);

  // Filter
  const filtered = useMemo(() => {
    let items = list;
    if (activeCategory !== "All") {
      items = items.filter((f) => f.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q)
      );
    }
    return items;
  }, [list, activeCategory, search]);

  // Group by category for rendering
  const grouped = useMemo(() => {
    if (search.trim()) {
      // Flat list when searching
      return [{ category: `${filtered.length} result${filtered.length !== 1 ? "s" : ""} found`, items: filtered }];
    }
    const map = new Map<string, FAQItem[]>();
    filtered.forEach((item) => {
      const cat = item.category ?? "General";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    });
    return Array.from(map.entries()).map(([category, items]) => ({ category, items }));
  }, [filtered, search]);

  return (
    <section id="faq-list" className="py-16 md:py-24 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-5 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* ── Sidebar: category nav + search ── */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search FAQs…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category nav */}
              <nav className="bg-white border border-neutral-100 rounded-2xl p-2 shadow-sm" aria-label="FAQ categories">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setSearch(""); }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeCategory === cat && !search
                        ? "bg-green-600 text-white shadow-sm"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    {cat}
                    <span className={`ml-1 text-xs font-normal ${activeCategory === cat && !search ? "text-white/60" : "text-neutral-400"}`}>
                      ({cat === "All"
                        ? list.length
                        : list.filter((f) => f.category === cat).length})
                    </span>
                  </button>
                ))}
              </nav>

              {/* Still have questions card */}
              <div className="bg-neutral-950 rounded-2xl p-5">
                <p className="text-xs font-semibold text-white mb-1.5">
                  Still have questions?
                </p>
                <p className="text-xs text-white/40 font-light leading-relaxed mb-4">
                  Can't find what you're looking for? Our team is always happy to help.
                </p>
                <a
                  href="/contact"
                  className="block text-center text-xs font-semibold bg-green-600 hover:bg-green-500 text-white py-2.5 rounded-full transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          {/* ── Main accordion ── */}
          <div className="lg:col-span-3 space-y-10">
            {grouped.length > 0 ? (
              grouped.map(({ category, items }) => (
                <div key={category}>
                  {/* Category heading */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-green-600">
                      <span className="w-6 h-px bg-green-500 opacity-60" />
                      {category}
                    </div>
                    <span className="text-xs text-neutral-400 font-light">
                      {items.length} question{items.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {items.map((item, i) => (
                      <AccordionItem
                        key={item._id}
                        item={item}
                        isOpen={openId === item._id}
                        onToggle={() => toggle(item._id)}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <p className="text-3xl mb-3">🔍</p>
                <p className="text-neutral-500 font-light text-sm">
                  No FAQs match your search.
                </p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory("All"); }}
                  className="mt-3 text-xs text-green-600 hover:underline"
                >
                  Clear search
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
