"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/types";
import { IMAGES } from "@/app/lib/images";
import { urlFor } from "@/sanity/lib/image";

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
    bio: "Fatima brings continental culinary training from Lagos and Lagos's finest hotels to every Bellymenu spread. She specialises in fusion menus that honour both Nigerian and international palates.",
    initials: "FG",
  },
  {
    name: "Tolu Adeyemi",
    role: "Client Relations Manager",
    bio: "Tolu is the first voice you hear when you reach out. She guides every client through the consultation process with warmth, patience, and attention to detail.",
    initials: "TA",
  },
];

// Stock placeholder headshots — matched to roles.
// Replace by uploading real headshots to Sanity Studio:
// About → teamMembers[] → image field
const STOCK_HEADSHOTS = [
  IMAGES.team.founder,
  IMAGES.team.operations,
  IMAGES.team.chef,
  IMAGES.team.clientRel,
];

// const AVATAR_RING_COLORS = [
//   "ring-green-500/40",
//   "ring-emerald-500/40",
//   "ring-teal-500/40",
//   "ring-green-400/40",
// ];

export default function TeamSection({
  members,
}: {
  members: TeamMember[] | null | undefined;
}) {
  const list = members && members.length > 0 ? members : FALLBACK_TEAM;

  return (
    <section className="py-24 md:py-32 bg-neutral-950 overflow-hidden relative">
      {/* Background orb */}
      <div
        className="pointer-events-none absolute -left-40 top-1/2 w-96 h-96 rounded-full bg-green-700/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 md:px-10 relative">
        {/* Section header */}
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
            A tight-knit team united by a shared love of food, hospitality, and
            making every event special.
          </p>
        </motion.div>

        {/* Team cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((member, i) => {
            // Prefer real Sanity image → fall back to stock headshot
            const sanityUrl = member.image ? urlFor(member.image).url() : null;
            const imgSrc =
              sanityUrl ?? STOCK_HEADSHOTS[i % STOCK_HEADSHOTS.length];

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: i * 0.09,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group bg-white/5 hover:bg-white/8 border border-white/8 hover:border-green-500/30 rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
              >
                {/* Photo */}
                <div className="relative h-56 overflow-hidden bg-neutral-800">
                  <Image
                    src={imgSrc}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Bottom gradient for smooth card transition */}
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-950/70 via-neutral-950/10 to-transparent" />

                  {/* Stock photo watermark — remove once real photos are added */}
                  {!sanityUrl && (
                    <div className="absolute top-3 right-3 bg-neutral-950/60 backdrop-blur-sm text-white/40 text-[9px] font-medium px-2 py-1 rounded-full tracking-wide">
                      Photo placeholder
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h3 className="text-base font-semibold text-white group-hover:text-green-300 transition-colors duration-200 leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs text-green-500 font-medium tracking-wide uppercase">
                    {member.role}
                  </p>
                  <p className="text-sm text-white/45 font-light leading-relaxed mt-1">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Replace photos nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-xs text-white/20 font-light"
        >
          Team photos are placeholders — upload real headshots in Sanity Studio
          → About → Team Members
        </motion.p>
      </div>
    </section>
  );
}
