"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, Leaf, Wheat, Star } from "lucide-react";
import type { MenuCategoryExtended, MenuItemExtended, DietaryTag } from "@/types";

// ─── Fallback data ────────────────────────────────────────────────────────────
const FALLBACK_CATEGORIES: MenuCategoryExtended[] = [
  {
    _id: "1",
    name: "Nigerian Classics",
    slug: { _type: "slug", current: "nigerian-classics" },
    description: "Authentic Nigerian dishes prepared with traditional techniques and the finest local ingredients.",
    emoji: "🍛",
    items: [
      { name: "Firewood Jollof Rice", description: "Party-style smoky jollof, slow-cooked over real firewood for that signature flavour.", dietary: ["halal"], isSignature: true },
      { name: "Fried Rice & Coleslaw", description: "Perfectly seasoned fried rice with fresh vegetable coleslaw and choice of protein.", dietary: ["halal"] },
      { name: "Egusi Soup & Swallow", description: "Rich ground melon seed soup with assorted meats. Served with pounded yam, eba, or semolina.", dietary: ["halal", "gluten-free"] },
      { name: "Banga Soup & Starch", description: "Palm nut soup with dried fish and crayfish — a Delta classic.", dietary: ["halal", "gluten-free"] },
      { name: "Pepper Soup", description: "Light, aromatic catfish or goat meat broth with Nigerian spices.", dietary: ["halal", "gluten-free"] },
      { name: "Ofada Rice & Ayamase", description: "Native ofada rice paired with the iconic designer stew and assorted meats.", dietary: ["halal"] },
      { name: "Ogbono Soup", description: "Draw soup made from wild mango seeds with assorted proteins and leafy greens.", dietary: ["halal", "gluten-free"] },
      { name: "Efo Riro", description: "Rich Yoruba spinach stew with palm oil, peppers, and assorted meats or fish.", dietary: ["halal", "gluten-free"] },
    ],
  },
  {
    _id: "2",
    name: "Small Chops & Canapés",
    slug: { _type: "slug", current: "small-chops" },
    description: "Perfect for cocktail receptions and pre-dinner service — beautifully presented bite-sized creations.",
    emoji: "🥂",
    items: [
      { name: "Puff Puff", description: "Light, golden Nigerian fried dough — a timeless crowd favourite.", isSignature: true },
      { name: "Samosa (Beef & Vegetable)", description: "Crispy triangles filled with spiced minced beef or fresh vegetables.", dietary: ["vegetarian"] },
      { name: "Spring Rolls", description: "Crunchy rolls filled with seasoned vegetables and glass noodles.", dietary: ["vegan"] },
      { name: "Mini Jollof Cups", description: "Individual party jollof in elegant shot cups — perfect for cocktail service." },
      { name: "Peppered Snail", description: "Tender snail in a rich pepper sauce — a sophisticated canapé.", dietary: ["gluten-free"] },
      { name: "Grilled Chicken Skewers", description: "Marinated chicken morsels on skewers with dipping sauces.", dietary: ["gluten-free", "halal"] },
      { name: "Chin Chin Bites", description: "Classic crunchy Nigerian snack, perfectly seasoned.", dietary: ["vegan"] },
      { name: "Peppered Gizzard", description: "Tender gizzard in a bold pepper sauce — a true Nigerian party essential.", dietary: ["halal", "gluten-free"] },
    ],
  },
  {
    _id: "3",
    name: "Continental Favourites",
    slug: { _type: "slug", current: "continental" },
    description: "Classic international dishes prepared with the same passion and quality as our Nigerian menu.",
    emoji: "🥩",
    items: [
      { name: "Live Pasta Station", description: "Pasta cooked to order — carbonara, arrabbiata, or garlic butter with your choice of protein." },
      { name: "Grilled Salmon Fillet", description: "Pan-seared Atlantic salmon with lemon butter sauce and seasonal greens.", dietary: ["gluten-free"] },
      { name: "Roast Beef Carving Station", description: "Slow-roasted prime beef, carved live at your event with horseradish and au jus.", dietary: ["gluten-free"], isSignature: true },
      { name: "Herb-Roasted Chicken", description: "Whole chicken with rosemary, garlic, and thyme — juicy and golden.", dietary: ["gluten-free", "halal"] },
      { name: "Beef Tenderloin", description: "Premium slow-roasted tenderloin, sliced fresh with red wine jus.", dietary: ["gluten-free"] },
      { name: "Garden Salad Bar", description: "Fresh seasonal greens with a range of dressings and gourmet toppings.", dietary: ["vegan", "gluten-free"] },
      { name: "Garlic Bread & Bruschetta", description: "Toasted artisan bread with tomato, fresh basil, and mozzarella.", dietary: ["vegetarian"] },
      { name: "Creamy Mashed Potatoes", description: "Buttery whipped potatoes — the perfect complement to any protein.", dietary: ["vegetarian", "gluten-free"] },
    ],
  },
  {
    _id: "4",
    name: "Grills & Live Stations",
    slug: { _type: "slug", current: "grills" },
    description: "Interactive live cooking stations that become a centrepiece of your event experience.",
    emoji: "🍖",
    items: [
      { name: "Suya Station", description: "Live-grilled beef skewers in yaji spice, served with fresh onions and tomatoes.", dietary: ["halal", "gluten-free"], isSignature: true },
      { name: "Asun Station", description: "Peppered goat meat, grilled and finished in a fiery pepper sauce.", dietary: ["halal", "gluten-free"] },
      { name: "BBQ Chicken Station", description: "Marinated whole chicken pieces grilled over charcoal — smoky and irresistible.", dietary: ["halal", "gluten-free"] },
      { name: "Shawarma Station", description: "Live-built shawarma wraps with chicken, beef, or vegetables.", dietary: ["halal"] },
      { name: "Fried Fish Station", description: "Whole tilapia or catfish, fried to order in seasoned oil.", dietary: ["halal", "gluten-free"] },
      { name: "Peppered Turkey", description: "Whole turkey legs grilled and tossed in our bold pepper sauce.", dietary: ["halal", "gluten-free"] },
    ],
  },
  {
    _id: "5",
    name: "Desserts & Sweets",
    slug: { _type: "slug", current: "desserts" },
    description: "From Nigerian favourites to continental classics — the sweetest end to any event.",
    emoji: "🎂",
    items: [
      { name: "Puff Puff Royale", description: "Premium puff puff dusted with icing sugar and served warm with chocolate dipping sauce.", isSignature: true },
      { name: "Chin Chin Selection", description: "Classic crunchy Nigerian snack in a beautiful display jar.", dietary: ["vegan"] },
      { name: "Zobo Panna Cotta", description: "Nigerian hibiscus flower set cream — a signature Bellymenu dessert.", dietary: ["gluten-free", "vegetarian"] },
      { name: "Layered Trifle", description: "Cream, sponge, and fresh fruit in elegant individual glasses.", dietary: ["vegetarian"] },
      { name: "Chocolate Fondue Station", description: "Live fondue with strawberries, marshmallows, and brownie bites." },
      { name: "Celebration Cake (Custom)", description: "Bespoke cakes — flavour, design, and tier count all by arrangement.", dietary: ["vegetarian"] },
      { name: "Fruit Platter", description: "Tropical and seasonal fruits, elegantly displayed and carved.", dietary: ["vegan", "gluten-free"] },
      { name: "Mini Pastry Selection", description: "A curated assortment of eclairs, tartlets, and petit fours.", dietary: ["vegetarian"] },
    ],
  },
  {
    _id: "6",
    name: "Drinks & Refreshments",
    slug: { _type: "slug", current: "drinks" },
    description: "From Nigerian staples to premium bar service — we keep your guests well-hydrated and happy.",
    emoji: "🍹",
    items: [
      { name: "Chapman", description: "The classic Nigerian party drink — sparkling, citrusy, and always a crowd favourite.", dietary: ["vegan", "gluten-free"], isSignature: true },
      { name: "Zobo (Hibiscus Punch)", description: "Freshly brewed spiced hibiscus drink, served chilled in elegant dispensers.", dietary: ["vegan", "gluten-free"] },
      { name: "Kunu", description: "Traditional millet drink, lightly spiced and naturally refreshing.", dietary: ["vegan", "gluten-free"] },
      { name: "Freshly Squeezed Juices", description: "Seasonal citrus and tropical fruit juices, prepared on site.", dietary: ["vegan", "gluten-free"] },
      { name: "Cocktail & Mocktail Bar", description: "Full bar service available — both alcoholic and non-alcoholic. Custom cocktail menu on request." },
      { name: "Tea & Coffee Station", description: "Filter coffee, herbal teas, and hot chocolate for post-dinner service." },
      { name: "Sparkling Water & Sodas", description: "Premium still and sparkling water, plus a range of soft drinks." },
    ],
  },
];

// ─── Dietary badge config ─────────────────────────────────────────────────────
const DIETARY_CONFIG: Record<DietaryTag, { label: string; className: string; icon?: React.ReactNode }> = {
  halal:         { label: "Halal",        className: "bg-green-50  text-green-700  border-green-100"  },
  vegan:         { label: "Vegan",        className: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: <Leaf size={9} /> },
  vegetarian:    { label: "Vegetarian",   className: "bg-lime-50   text-lime-700   border-lime-100"   },
  "gluten-free": { label: "Gluten-Free",  className: "bg-amber-50  text-amber-700  border-amber-100", icon: <Wheat size={9} /> },
};

const ALL_DIETARY_FILTERS: DietaryTag[] = ["halal", "vegan", "vegetarian", "gluten-free"];

// ─── Sub-components ───────────────────────────────────────────────────────────
function DietaryBadge({ tag }: { tag: DietaryTag }) {
  const cfg = DIETARY_CONFIG[tag];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${cfg.className}`}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function MenuItemRow({ item }: { item: MenuItemExtended }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className="group py-4 border-b border-neutral-100 last:border-0"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <p className="text-sm font-semibold text-neutral-800 group-hover:text-green-700 transition-colors">
              {item.name}
            </p>
            {item.isSignature && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                <Star size={8} fill="currentColor" />
                Signature
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              {item.description}
            </p>
          )}
          {item.dietary && item.dietary.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {item.dietary.map((tag) => (
                <DietaryBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface MenuCatalogueProps {
  categories: MenuCategoryExtended[] | null;
}

export default function MenuCatalogue({ categories }: MenuCatalogueProps) {
  const cats = categories && categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  const [activeCatId, setActiveCatId] = useState(cats[0]._id);
  const [search, setSearch] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState<DietaryTag | "all">("all");

  const activeCategory = cats.find((c) => c._id === activeCatId) ?? cats[0];

  // Filter items within the active category
  const filteredItems = useMemo(() => {
    let items = activeCategory.items;
    if (dietaryFilter !== "all") {
      items = items.filter((item) => item.dietary?.includes(dietaryFilter));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description ?? "").toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, dietaryFilter, search]);

  return (
    <section className="py-16 md:py-24 bg-neutral-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-3 text-xs font-medium tracking-[0.18em] uppercase text-green-600">
            <span className="w-8 h-px bg-green-500 opacity-60" />
            Full Menu
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-playfair text-[clamp(1.9rem,4vw,2.8rem)] font-semibold text-neutral-900 leading-tight">
              Browse by <em className="not-italic text-green-600">Category</em>
            </h2>
            <p className="text-sm text-neutral-500 font-light max-w-xs md:text-right">
              All menus are customised for your event. This is a sample of our full offering.
            </p>
          </div>
        </motion.div>

        {/* Dietary legend */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ALL_DIETARY_FILTERS.map((tag) => {
            const cfg = DIETARY_CONFIG[tag];
            return (
              <button
                key={tag}
                onClick={() => setDietaryFilter(dietaryFilter === tag ? "all" : tag)}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                  dietaryFilter === tag
                    ? cfg.className + " ring-2 ring-offset-1 ring-green-400"
                    : cfg.className + " opacity-60 hover:opacity-100"
                }`}
              >
                {cfg.icon}
                {cfg.label}
              </button>
            );
          })}
          {dietaryFilter !== "all" && (
            <button
              onClick={() => setDietaryFilter("all")}
              className="text-xs font-medium text-neutral-500 hover:text-neutral-800 px-3 py-1.5 rounded-full border border-neutral-200 bg-white transition-colors"
            >
              Clear filter ×
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ── Sidebar: category tabs ── */}
          <div className="lg:col-span-1">
            <nav className="lg:sticky lg:top-28 space-y-1.5" aria-label="Menu categories">
              {cats.map((cat) => {
                const isActive = cat._id === activeCatId;
                return (
                  <button
                    key={cat._id}
                    onClick={() => { setActiveCatId(cat._id); setSearch(""); }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                      isActive
                        ? "bg-green-600 text-white shadow-md shadow-green-200"
                        : "text-neutral-600 bg-white hover:bg-neutral-100 border border-neutral-100"
                    }`}
                  >
                    <span className="text-lg leading-none">{cat.emoji ?? "🍽️"}</span>
                    <span className="flex-1 leading-tight">{cat.name}</span>
                    <span className={`text-xs font-normal flex-shrink-0 ${isActive ? "text-white/60" : "text-neutral-400"}`}>
                      {cat.items.length}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ── Main panel ── */}
          <div className="lg:col-span-3">
            {/* Search bar */}
            <div className="relative mb-5">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder={`Search in ${activeCategory.name}…`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Items panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCatId}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
              >
                {/* Panel header */}
                <div className="flex items-center gap-4 px-7 pt-6 pb-4 border-b border-neutral-100">
                  <span className="text-4xl">{activeCategory.emoji ?? "🍽️"}</span>
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-neutral-900">
                      {activeCategory.name}
                    </h3>
                    {activeCategory.description && (
                      <p className="text-xs text-neutral-500 font-light mt-0.5 max-w-sm">
                        {activeCategory.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-auto text-xs text-neutral-400 flex-shrink-0">
                    {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
                  </div>
                </div>

                {/* Items list */}
                <div className="px-7 py-2">
                  <AnimatePresence>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <MenuItemRow key={item.name} item={item} />
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-12 text-center"
                      >
                        <p className="text-2xl mb-2">🍽️</p>
                        <p className="text-sm text-neutral-500 font-light">
                          No items match your filters.
                        </p>
                        <button
                          onClick={() => { setSearch(""); setDietaryFilter("all"); }}
                          className="mt-3 text-xs text-green-600 hover:underline"
                        >
                          Clear all filters
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Disclaimer + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-5 p-5 bg-green-50 rounded-2xl border border-green-100 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-green-900 mb-0.5">
                  This is a sample menu
                </p>
                <p className="text-xs text-green-800/70 font-light leading-relaxed">
                  All menus are fully customised during your free consultation. Final pricing
                  depends on event size, selections, and location.
                </p>
              </div>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all hover:-translate-y-0.5 flex-shrink-0 whitespace-nowrap"
              >
                Get a custom quote
                <ArrowRight size={12} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
