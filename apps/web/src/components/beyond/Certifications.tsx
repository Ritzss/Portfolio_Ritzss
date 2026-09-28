import { certifications } from "@portfolio/content";

export default function Certifications() {
  return (
    <section id="certifications" className="border-t border-white/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="grid gap-6 sm:grid-cols-[120px_1fr]">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-orange-500">
            01
          </p>

          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Certifications
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500">
              Formal training that added structure to the things I was already
              learning by building.
            </p>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-16 space-y-6">
          {certifications.map((certification) => (
            <article
              key={`${certification.issuer}-${certification.name}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b] p-6 transition-colors duration-300 hover:border-orange-500/30 sm:p-8 lg:p-10"
            >
              {/* Ambient glow */}
              <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-orange-500/4 blur-3xl transition-opacity duration-500 group-hover:bg-orange-500/8" />

              <div className="relative">
                {/* Top metadata */}
                <div className="flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-orange-500">
                      Training / Certification
                    </p>

                    <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      {certification.name}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      {certification.issuer}
                    </p>
                  </div>

                  <div className="shrink-0 sm:text-right">
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-700">
                      Issued
                    </p>

                    <p className="mt-2 font-mono text-sm text-zinc-400">
                      {certification.issueDate}
                    </p>
                  </div>
                </div>

                {/* Main content */}
                <div className="grid gap-10 pt-8 lg:grid-cols-[1fr_280px]">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-700">
                      What I covered
                    </p>

                    <div className="mt-5 space-y-4">
                      {certification.description?.map((item) => (
                        <p
                          key={item}
                          className="max-w-3xl text-sm leading-7 text-zinc-500 transition-colors group-hover:text-zinc-400"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-700">
                      Skills
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {certification.skills?.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/2 px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500 transition-colors group-hover:border-orange-500/20 group-hover:text-zinc-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Credential */}
                {certification.credentialId && (
                  <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-700">
                        Credential ID
                      </p>

                      <p className="mt-2 font-mono text-xs tracking-wider text-zinc-500">
                        {certification.credentialId}
                      </p>
                    </div>

                    {certification.credentialUrl && (
                      <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-400 transition-all hover:border-orange-500/40 hover:bg-orange-500/5 hover:text-orange-400"
                      >
                        Verify Credential
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}