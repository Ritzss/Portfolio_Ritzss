import Image from "next/image";
import { projects } from "@portfolio/content";
import Link from "next/link";

export default function Projects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="border-t border-white/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#cd0000]">
          Featured Project
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Work I&apos;ve built.
        </h2>

        <div className="mt-12 space-y-8">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/3"
            >
              <div className="p-8 md:p-10">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                  
                  {/* Project Details */}
                  <div className="max-w-2xl">
                    <p className="text-sm text-zinc-500">
                      Featured Project
                    </p>

                    <h3 className="mt-2 text-3xl font-semibold">
                      {project.title}
                    </h3>

                    <p className="mt-5 leading-7 text-zinc-400">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-400"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    {project.url && (
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex rounded-full bg-[#cd0000] px-5 py-2.5 text-sm font-medium transition-transform hover:scale-105"
                      >
                        Visit Project
                      </Link>
                    )}
                  </div>

                  {/* Project Image / Fallback */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black md:w-96">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} project preview`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 384px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-2xl font-semibold tracking-tight text-zinc-300">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}