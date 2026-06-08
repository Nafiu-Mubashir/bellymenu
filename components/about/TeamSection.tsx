"use client";

import { motion } from "framer-motion";
import type { TeamMember } from "@/types";

interface TeamSectionProps {
  members: TeamMember[] | null | undefined;
}

const FALLBACK_TEAM: TeamMember[] = [
  {
    name: "Chiamaka Obi",
    role: "Founder & Head Chef",
    bio: "With over 12 years in professional kitchens and a passion for Nigerian culinary heritage, Chiamaka built Bellymenu Kitchen from the ground up. She leads menu design and quality control for every event.",
    initials: "CO",
  },
  {
    name: "Emeka Obi",
    role: "Operations Director",
    bio: "Emeka ensures every event runs like clockwork — from logistics and staffing to setup and teardown. His background in hospitality management keeps everything seamless behind the scenes.",
    initials: "EO",
  },
  {
    name: "Fatima Garba",
    role: "Senior Chef — Continental",
    bio: "Fatima brings continental culinary training from Lagos and Abuja's finest hotels to every Bellymenu spread. She specialises in fusion menus that honour both Nigerian and international palates.",
    initials: "FG",
  },
  {
    name: "Tolu Adeyemi",
    role: "Client Relations Manager",
    bio: "Tolu is the first voice you hear when you reach out to Bellymenu Kitchen. She guides every client through the consultation and planning process with warmth, patience, and attention to detail.",
    initials: "TA",
  },
];

// Avatar colours mapped by index for visual variety
const AVATAR_COLORS = [
  "bg-green-900/60 text-green-300",
  "bg-emerald-900/60 text-emerald-300",
  "bg-teal-900/60 text-teal-300",
  "bg-green-800/60 text-green-200",
];

export default function TeamSection({ members }: TeamSectionProps) {
  const list =
    members && members.length > 0 ? members : FALLBACK_TEAM;

  return (
    <section className="py-24 md:py-32 bg-neutral-950 overflow-hidden">
      {/* Decorative orb */}
      <div className="pointer-events-none absolute -left-40 top-1/2 w-96 h-96 rounded-full bg-green-700/8 blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 md:px-10 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-3 mb-4 text-xs font-medium tracking-[0.18em] uppercase text-green-400">
              <span className="w-8 h-px bg-green-500 opacity-60" />
              The Team
            </div>
            <h2 className="font-playfair text-[clamp(2rem,4.5vw,3rem)] font-semibold text-white leading-[1.1] tracking-tight">
              Faces Behind the{" "}
              <em className="not-italic text-green-400">Flavour</em>
            </h2>
          </div>
          <p className="text-sm text-white/40 font-light max-w-sm leading-relaxed md:text-right">
            A tight-knit team united by a shared love of food, hospitality, and making every event special.
          </p>
        </motion.div>

        {/* Team cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white/5 hover:bg-white/8 border border-white/8 hover:border-green-500/30 rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300"
            >
              {/* Avatar */}
              <div className="flex items-start justify-between">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-semibold font-playfair ${
                    AVATAR_COLORS[i % AVATAR_COLORS.length]
                  }`}
                >
                  {member.initials}
                </div>
                {/* Subtle decoration */}
                <div className="w-6 h-6 rounded-full border border-green-500/20 group-hover:border-green-500/50 transition-colors duration-300" />
              </div>

              {/* Name + role */}
              <div>
                <h3 className="text-base font-semibold text-white mb-1 group-hover:text-green-300 transition-colors duration-200">
                  {member.name}
                </h3>
                <p className="text-xs text-green-500 font-medium tracking-wide uppercase">
                  {member.role}
                </p>
              </div>

              {/* Bio */}
              <p className="text-sm text-white/45 font-light leading-relaxed flex-1">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
