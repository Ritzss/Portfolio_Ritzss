"use client";

import { motion } from "motion/react";
// import MagicBento from "@/components/effects/MagicBento";
import { education } from "@portfolio/content";
import MagicBento from "../ui/MagicBento";

export default function Education() {
  const cards = education.map((item, index) => ({
    color: "#11100F",
    label: `${String(index + 1).padStart(2, "0")} / ${item.startDate.split(" ").pop()} — ${item.endDate.split(" ").pop()}`,
    title: `${item.degree} · ${item.field}`,
    description: `${item.institution}. ${item.description?.join(" ") ?? ""}`,
  }));

  return (
    <section id="education" className="relative overflow-hidden border-t border-white/10 px-6 py-28 bg-[#080808b0]">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-orange-500">06 / Education</p>

          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Where I built the foundation.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
            The academic journey that shaped my foundation in computer science, mathematics, and technology.
          </p>
        </motion.div>

        <div className="mt-16 flex justify-center">
          <MagicBento
            cards={cards}
            textAutoHide={false}
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt
            enableMagnetism
            clickEffect
            spotlightRadius={540}
            particleCount={12}
            glowColor="249, 115, 22"
            disableAnimations={false}
          />
        </div>
      </div>
    </section>
  );
}