import { experience } from "@portfolio/content";

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-white/10 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#cd0000]">
          Experience
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Where I&apos;ve worked.
        </h2>

        <div className="mt-12">
          {experience.map((item) => (
            <article
              key={`${item.company}-${item.role}`}
              className="relative border-l border-white/10 pb-12 pl-8 last:pb-0 md:pl-10"
            >
              {/* Timeline dot */}
              <span className="absolute -left-1.25 top-1 h-2.5 w-2.5 rounded-full bg-[#cd0000] ring-4 ring-black" />

              <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm text-zinc-500">
                    {item.startDate}
                    {item.endDate ? ` — ${item.endDate}` : " — Present"}
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                    {item.role}
                  </h3>

                  <p className="mt-1 text-[#cd0000]">
                    {item.company}
                  </p>

                  {item.location && (
                    <p className="mt-2 text-sm text-zinc-500">
                      {item.location}
                    </p>
                  )}

                  <ul className="mt-6 space-y-3">
                    {item.description.map((description) => (
                      <li
                        key={description}
                        className="relative pl-5 text-sm leading-7 text-zinc-400"
                      >
                        <span className="absolute left-0 top-[0.7rem] h-1.5 w-1.5 rounded-full bg-zinc-600" />
                        {description}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap content-start gap-2 md:max-w-xs md:justify-end">
                  {item.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs text-zinc-400"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}