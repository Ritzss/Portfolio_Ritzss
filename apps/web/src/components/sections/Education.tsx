import { certifications, education } from "@portfolio/content";
import Link from "next/link";

export default function Education() {
  return (
    <section
      id="education"
      className="border-t border-white/10 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#cd0000]">
          Education
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Education & certifications.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Education */}
          {education.map((item) => (
            <article
              key={`${item.institution}-${item.degree}`}
              className="rounded-3xl border border-white/10 bg-white/3 p-8 transition-colors hover:border-white/20"
            >
              <p className="text-sm text-zinc-500">
                {item.startDate} — {item.endDate}
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                {item.degree}
              </h3>

              <p className="mt-1 text-[#cd0000]">
                {item.institution}
              </p>

              <p className="mt-4 text-sm text-zinc-400">
                {item.field}
              </p>

              {item.grade && (
                <p className="mt-5 inline-flex rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs text-zinc-400">
                  {item.grade}
                </p>
              )}

              {item.description && (
                <p className="mt-5 text-sm leading-7 text-zinc-500">
                  {item.description}
                </p>
              )}
            </article>
          ))}

          {/* Certifications */}
          {certifications.map((certification) => (
            <article
              key={certification.credentialId ?? certification.name}
              className="rounded-3xl border border-white/10 bg-white/3 p-8 transition-colors hover:border-white/20"
            >
              <p className="text-sm text-zinc-500">
                Certification
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                {certification.name}
              </h3>

              <p className="mt-1 text-[#cd0000]">
                {certification.issuer}
              </p>

              <div className="mt-5 space-y-2 text-sm text-zinc-400">
                <p>Issued: {certification.issueDate}</p>

                {certification.credentialId && (
                  <p>
                    Credential ID:{" "}
                    <span className="text-zinc-300">
                      {certification.credentialId}
                    </span>
                  </p>
                )}
              </div>

              {certification.credentialUrl && (
                <Link
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/10"
                >
                  View Credential
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}