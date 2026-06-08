"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const STATS: Stat[] = [
  { value: 500, suffix: "+", label: "Events Catered", description: "Weddings, parties, corporate dinners and more" },
  { value: 98, suffix: "%", label: "Client Satisfaction", description: "Based on post-event feedback surveys" },
  { value: 8, suffix: "+", label: "Years in Business", description: "Serving Nigeria's celebrations since 2016" },
  { value: 20, suffix: "+", label: "Cities Served", description: "From Abuja to Lagos, PH and beyond" },
];

// Animated counter hook
function useCounter(target: number, duration = 1800, inView = false) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return count;
}

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCounter(stat.value, 1600, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group text-center px-4 py-6 rounded-2xl hover:bg-white/5 transition-colors duration-300"
    >
      <p className="font-playfair text-[clamp(2.4rem,4vw,3.5rem)] font-semibold text-white leading-none mb-1 group-hover:text-green-300 transition-colors duration-300">
        {count}
        <span className="text-green-400">{stat.suffix}</span>
      </p>
      <p className="text-sm font-semibold text-white/80 mb-1">{stat.label}</p>
      <p className="text-xs text-white/30 font-light">{stat.description}</p>
    </motion.div>
  );
}

export default function StatsStrip() {
  return (
    <section className="py-20 bg-green-700 overflow-hidden relative">
      {/* Pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #fff 0,#fff 1px, transparent 0,transparent 50%)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-5 md:px-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
