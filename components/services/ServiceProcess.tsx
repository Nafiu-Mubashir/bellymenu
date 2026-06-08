"use client";

import { motion } from "framer-motion";
import type { ProcessStep } from "@/types";

interface ServiceProcessProps {
  steps: ProcessStep[];
}

export default function ServiceProcess({ steps }: ServiceProcessProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-neutral-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <span className="w-7 h-px bg-green-500 opacity-60" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-600">
              The Process
            </span>
            <span className="w-7 h-px bg-green-500 opacity-60" />
          </div>
          <h2 className="font-playfair text-[clamp(1.8rem,4vw,2.8rem)] font-semibold text-neutral-900 leading-tight">
            How It{" "}
            <em className="not-italic text-green-600">Works</em>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div
            className="hidden lg:block absolute top-10 left-[calc(12.5%+36px)] right-[calc(12.5%+36px)] h-px border-t border-dashed border-green-200"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center group"
              >
                {/* Circle with emoji + step badge */}
                <div className="relative mb-6">
                  <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-neutral-200 group-hover:border-green-400 group-hover:bg-green-50 flex items-center justify-center text-2xl transition-all duration-300 shadow-sm">
                    {step.icon}
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-semibold text-neutral-900 text-sm mb-2 group-hover:text-green-700 transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
