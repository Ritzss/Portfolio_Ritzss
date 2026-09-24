"use client";

import { useState } from "react";
import { projects } from "@portfolio/content";
import TearTicket from "../ui/TearTicket";
// import TearTicket from "@/components/effects/TearTicket";

export default function Projects() {
  const [tornProjects, setTornProjects] = useState<string[]>([]);

  const featuredProjects = projects.filter((project) => project.featured);

  const handleTear = (title: string) => {
    setTornProjects((current) => [...new Set([...current, title])]);
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-white/10 px-6 py-28 bg-[#080808b0]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-orange-500">
            04 / Projects
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Things I&apos;ve actually built.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
            Real products, real systems, real problems. The frontend is only
            part of the story.
          </p>
        </div>

        <div className="mt-20 space-y-28">
          {featuredProjects.map((project, index) => {
            const torn = tornProjects.includes(project.title);

            return (
              <article key={project.title} className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-600">
                    Project {String(index + 1).padStart(2, "0")}
                  </p>

                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-700">
                    {torn ? "Ticket opened" : "Interactive project"}
                  </p>
                </div>

                <div className="flex justify-center">
                  <TearTicket
                    image={project.image}
                    imageAlt={`${project.title} project preview`}
                    orientation="horizontal"
                    scrim
                    imageRadius={8}
                    width={1050}
                    height={480}
                    stubSize={240}
                    radius={22}
                    holes={14}
                    holeSize={7}
                    notch={4}
                    roughness={0.45}
                    tearAngle={30}
                    stretch={32}
                    resistance={0.45}
                    rotate={1.5}
                    tilt
                    tiltMax={6}
                    tiltReach={320}
                    parallax={7}
                    perspective={1200}
                    background="#151515"
                    color="#F5F0E8"
                    border
                    borderColor="rgba(255,255,255,0.12)"
                    borderWidth={1}
                    stubBackground="#111111"
                    recenter
                    onTear={() => handleTear(project.title)}
                    className="max-w-full"
                    ariaLabel={`Tear ticket to explore ${project.title}`}
                    stub={
                      <div className="flex h-full flex-col justify-between px-7 py-8 text-[#F5F0E8]">
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-500">
                            Project {String(index + 1).padStart(2, "0")}
                          </p>

                          <div className="mt-5 h-px w-full bg-orange-500/60" />
                        </div>

                        <div>
                          <p className="text-3xl font-semibold uppercase leading-[0.9] tracking-tight">
                            Tear
                          </p>

                          <p className="text-3xl font-semibold uppercase leading-[0.9] tracking-tight">
                            to
                          </p>

                          <p className="text-3xl font-semibold uppercase leading-[0.9] tracking-tight">
                            explore <span className="text-orange-500">→</span>
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                            Ideas
                          </p>
                          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                            Code
                          </p>
                          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                            Products
                          </p>
                          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                            Impact
                          </p>
                        </div>

                        <div>
                          <div className="mb-4 flex h-7 items-end gap-0.5 opacity-70">
                            {Array.from({ length: 34 }).map((_, barIndex) => (
                              <span
                                key={barIndex}
                                className={`w-0.5 bg-[#F5F0E8] ${barIndex % 3 === 0 ? "h-5" : barIndex % 2 === 0 ? "h-7" : "h-4"}`}
                              />
                            ))}
                          </div>

                          <p className="font-mono text-[9px] tracking-[0.35em] text-zinc-600">
                            NO. {String(index + 1).padStart(4, "0")}
                          </p>
                        </div>
                      </div>
                    }
                  >
                    <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/10 to-transparent p-8 sm:p-10">
                      <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange-400">
                        VastraDrobe / Fashion Commerce
                      </p>

                      <h3 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                        {project.title}
                      </h3>

                      <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300">
                        {project.description}
                      </p>
                    </div>
                  </TearTicket>
                </div>

                <div
                  className={`mx-auto max-w-5xl overflow-hidden transition-all duration-700 ${
                    torn
                      ? "mt-10 max-h-[2000px] opacity-100 lg:max-h-[700px]"
                      : "mt-0 max-h-0 opacity-0"
                  }`}
                >
                  <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/2.5 p-5 sm:p-8 lg:grid-cols-[1fr_1.5fr]">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange-500">
                        What I worked on
                      </p>

                      <h4 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                        {project.title}
                      </h4>

                      <p className="mt-4 text-sm leading-7 text-zinc-500">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {project.highlights ? (
                        <ul className="space-y-4">
                          {project.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex gap-4 text-sm leading-6 text-zinc-400"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <div className="mt-8 flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs text-zinc-400"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>

                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor-target mt-8 inline-flex rounded-full border border-orange-500/40 px-5 py-3 text-xs uppercase tracking-[0.2em] text-orange-400 transition-colors hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-300"
                        >
                          View live project ↗
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
