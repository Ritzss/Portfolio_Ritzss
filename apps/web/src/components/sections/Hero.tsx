import { profile } from "@portfolio/content";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-24 sm:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#cd0000]">
            {profile.role}
          </p>

          <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-8xl">
            {profile.name}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {profile.stack.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300"
              >
                {technology}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="rounded-full bg-[#cd0000] px-6 py-3 text-sm font-medium transition-transform hover:scale-105"
            >
              View Projects
            </Link>

            <Link
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
