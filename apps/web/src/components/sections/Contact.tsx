import { socialLinks } from "@portfolio/content";
import Link from "next/link";

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-white/10 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#cd0000]">
            Contact
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s build something useful.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            I&apos;m open to opportunities where I can contribute to
            production applications, solve real problems, and continue
            growing as a full stack developer.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="mailto:ritanshubabuta399@gmail.com"
            className="inline-flex w-fit rounded-full bg-[#cd0000] px-6 py-3 text-sm font-medium transition-transform hover:scale-105"
          >
            Email Me
          </Link>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                {social.label ?? social.platform}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}