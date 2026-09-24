"use client";

import { motion, type Variants } from "motion/react";
import { about, capabilities } from "@portfolio/content";

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-white/10 bg-[#080808b0] px-6 py-28 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute right-[-10%] top-[10%] h-125 w-125 rounded-full bg-[#C2410C]/6 blur-[130px]" />

      <div className="relative mx-auto max-w-350">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-[#F97316]" />
          <p className="text-[10px] uppercase tracking-[0.45em] text-zinc-600">01 / About</p>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            <p className="text-sm uppercase tracking-[0.25em] text-[#F97316]">{about.eyebrow}</p>

            <h2 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.055em] text-[#F5F0E8] sm:text-6xl md:text-7xl lg:text-8xl">
              I build
              <br />
              things that
              <br />
              <span className="text-[#F97316]">actually work.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col justify-end">
            <div className="max-w-xl border-l border-[#C2410C]/40 pl-6 sm:pl-8">
              {about.paragraphs.map((paragraph, index) => (
                <p key={paragraph} className={`${index === 0 ? "text-lg text-zinc-300" : "mt-6 text-base text-zinc-500"} leading-8`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="my-20 h-px origin-left bg-white/10" />

        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
          {capabilities.map((item, index) => (
            <motion.article key={item.number} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }} className="cursor-target group relative bg-[#0a0a0a] p-7 transition-colors duration-500 hover:bg-[#0f0b09] sm:p-8">
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-[#F97316]">{item.number}</span>
                <span className="text-xl text-zinc-700 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#F97316]">↗</span>
              </div>

              <h3 className="mt-16 text-xl font-semibold tracking-tight text-zinc-200">{item.title}</h3>

              <p className="mt-4 text-sm leading-7 text-zinc-500">{item.description}</p>

              <div className="mt-8 h-px w-0 bg-[#F97316] transition-all duration-500 group-hover:w-12" />
            </motion.article>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-2xl font-medium leading-relaxed tracking-tight text-zinc-300 sm:text-3xl">
            {about.closingStatement}
          </p>

          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-700">
            React / Next.js / Node / MongoDB
          </div>
        </div>
      </div>
    </section>
  );
}