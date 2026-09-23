"use client";

import { experience } from "@portfolio/content";
import FlipCard from "../ui/FlipCard";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-t border-white/10 px-6 py-28 bg-[#080808b0]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-orange-500">
            05 / Experience
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            How I got here.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
            The roles, projects, and systems that shaped how I approach
            software.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {experience.map((experience, index) => (
            <div
              key={`${experience.company}-${experience.role}`}
              className="flex justify-center"
            >
              <FlipCard
                axis="y"
                flipOnClick
                draggable
                dragDistance={0}
                tilt
                tiltMax={8}
                glare
                glareOpacity={0.16}
                hoverScale={1.025}
                perspective={1100}
                stiffness={170}
                damping={20}
                width={320}
                height={430}
                radius={24}
                background="#111111"
                color="#F5F0E8"
                shadow
                shadowColor="#000000"
                shadowOpacity={0.5}
                ariaLabel={`View details for ${experience.role} at ${experience.company}`}
                className="cursor-target"
                front={
                  <div className="relative flex h-full flex-col justify-between overflow-hidden p-7">
                    <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-orange-500/10 blur-[70px]" />

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange-500">
                          Experience
                        </span>

                        <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-700">
                          0{index + 1}
                        </span>
                      </div>

                      <div className="mt-16">
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                          {experience.startDate} —{" "}
                          {experience.endDate || "Present"}
                        </p>

                        <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white">
                          {experience.company}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-zinc-500">
                          {experience.role}
                        </p>

                        {experience.location ? (
                          <p className="mt-1 text-xs text-zinc-700">
                            {experience.location}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-5">
                      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700">
                        Flip to explore
                      </span>

                      <span className="text-orange-500">↗</span>
                    </div>
                  </div>
                }
                back={
                  <div className="flex h-full flex-col p-7">
                    <div className="flex shrink-0 items-center justify-between border-b border-white/10 pb-5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange-500">
                        What I worked on
                      </span>
                      <span className="font-mono text-[9px] text-zinc-700">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-6 min-h-0 flex-1 overflow-y-auto pr-2 scrollbar-thin [scrollbar-color:#3f3f46_transparent]">
                      <h3 className="text-xl font-semibold tracking-tight text-white">
                        {experience.role}
                      </h3>

                      <p className="mt-2 text-xs text-zinc-600">
                        {experience.company}
                      </p>

                      <ul className="mt-6 space-y-4">
                        {experience.description.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-xs leading-6 text-zinc-400"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 shrink-0 border-t border-white/10 pt-5">
                      <div className="flex flex-wrap gap-1.5">
                        {experience.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full border border-white/10 bg-white/3 px-2.5 py-1 text-[9px] text-zinc-500"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700">
            Click · Drag · Explore
          </p>
        </div>
      </div>
    </section>
  );
}
