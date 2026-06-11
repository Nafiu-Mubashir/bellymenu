"use client";

import { motion } from "framer-motion";
import type { Milestone } from "@/types";

interface MilestonesSectionProps {
  milestones: Milestone[] | null | undefined;
}

const FALLBACK_MILESTONES: Milestone[] = [
  { year: "2016", label: "Founded in Lagos, catering first family events" },
  {
    year: "2017",
    label: "Expanded to a 5-person team, first wedding contract",
  },
  { year: "2018", label: "Launched corporate catering division" },
  { year: "2019", label: "Crossed 100 events milestone" },
  { year: "2020", label: "Adapted to intimate gatherings during the pandemic" },
  {
    year: "2021",
    label: "Resumed full-scale operations, first Port Harcourt event",
  },
  { year: "2022", label: "Reached 300 events, expanded to Lagos market" },
  { year: "2023", label: "Launched private dining experience service" },
  { year: "2024", label: "500+ events, 98% client satisfaction rate" },
];

export default function MilestonesSection({
  milestones,
}: MilestonesSectionProps) {
  const list =
    milestones && milestones.length > 0 ? milestones : FALLBACK_MILESTONES;

  return (
    <section className="py-24 md:py-32 bg-neutral-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-xl mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4 text-xs font-medium tracking-[0.18em] uppercase text-green-600">
            <span className="w-8 h-px bg-green-500 opacity-60" />
            Our Journey
          </div>
          <h2 className="font-playfair text-[clamp(2rem,4.5vw,3rem)] font-semibold text-neutral-900 leading-[1.1] tracking-tight">
            Eight Years of{" "}
            <em className="not-italic text-green-600">Growth & Flavour</em>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop only */}
          <div
            className="hidden md:block absolute left-29.5 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-green-200 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-0">
            {list.map((milestone, i) => (
              <motion.div
                key={milestone.year + i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="group relative flex items-start gap-8 md:gap-12 py-5 md:py-6"
              >
                {/* Year */}
                <div className="shrink-0 w-20 md:w-25 text-right">
                  <span className="font-playfair text-lg md:text-xl font-semibold text-neutral-400 group-hover:text-green-600 transition-colors duration-200">
                    {milestone.year}
                  </span>
                </div>

                {/* Dot — desktop */}
                <div className="hidden md:flex shrink-0 w-5 h-5 rounded-full border-2 border-neutral-200 group-hover:border-green-500 group-hover:bg-green-500 bg-white transition-all duration-200 mt-1 z-10" />

                {/* Content */}
                <div className="flex-1 pb-5 md:pb-6 border-b border-neutral-100 group-hover:border-green-100 transition-colors duration-200">
                  <p className="text-[15px] text-neutral-600 font-light leading-relaxed group-hover:text-neutral-800 transition-colors duration-200">
                    {milestone.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
