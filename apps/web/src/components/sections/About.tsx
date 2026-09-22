export default function About() {
  return (
    <section
      id="about"
      className="border-t border-white/10 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#cd0000]">
          About
        </p>

        <div className="mt-6 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Building software that solves real problems.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            I&apos;m a full stack developer focused on building production
            web applications across frontend, backend, databases, and
            business workflows.
          </p>
        </div>
      </div>
    </section>
  );
}