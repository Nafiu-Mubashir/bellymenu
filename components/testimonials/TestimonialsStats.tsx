"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

const STATS: StatItem[] = [
  { value: 500,  suffix: "+", label: "Events Catered",     sub: "Weddings, parties, corporate & more" },
  { value: 98,   suffix: "%", label: "Satisfaction Rate",  sub: "Based on post-event feedback" },
  { value: 5,    suffix: ".0", label: "Average Rating",    sub: "Across all reviewed events" },
  { value: 8,    suffix: "+", label: "Years Trusted",      sub: "Serving Nigeria since 2016" },
];

function Counter({ target, suffix, duration = 1800, inView }: { target: number; suffix: string; duration?: number; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span>
      {count}
      <span className="text-green-400">{suffix}</span>
    </span>
  );
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="text-center px-4 py-2"
    >
      {/* Special rendering for star rating */}
      {stat.label === "Average Rating" ? (
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="font-playfair text-[clamp(2.4rem,4vw,3.5rem)] font-semibold text-white leading-none">
            5
            <span className="text-green-400">.0</span>
          </span>
        </div>
      ) : (
        <p className="font-playfair text-[clamp(2.4rem,4vw,3.5rem)] font-semibold text-white leading-none mb-1">
          <Counter target={stat.value} suffix={stat.suffix} inView={inView} />
        </p>
      )}
      {/* Stars under rating */}
      {stat.label === "Average Rating" && (
        <div className="flex justify-center gap-0.5 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
      )}
      <p className="text-sm font-semibold text-white/80 mb-1">{stat.label}</p>
      <p className="text-xs text-white/35 font-light">{stat.sub}</p>
    </motion.div>
  );
}

export default function TestimonialsStats() {
  return (
    <section className="py-16 bg-green-700 overflow-hidden relative">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "repeating-linear-gradient(-45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-5 md:px-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
