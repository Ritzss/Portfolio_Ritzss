export default function BeyondSoftware() {
  return (
    <section id="beyond-software" className="border-t border-white/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-[120px_1fr]">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-orange-500">
            04
          </p>

          <div className="max-w-4xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700">
              Beyond Software
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Building software is what I do.
              <br />
              <span className="text-zinc-600">
                Curiosity is what keeps me doing it.
              </span>
            </h2>

            <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
              <p className="text-sm leading-7 text-zinc-500">
                Software is only one part of what interests me. I like
                understanding how things work, exploring unfamiliar subjects,
                watching documentaries, following stories, and occasionally
                doing something that does not involve staring at a code editor.
              </p>

              <p className="text-sm leading-7 text-zinc-500">
                The things outside development often end up influencing how I
                approach development itself: staying curious, experimenting,
                breaking things, figuring out why they broke, and trying again.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-white/10 pt-6">
          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-700">
            Beyond the Code
          </span>

          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-700">
            Ritanshu Babuta · 2026
          </span>
        </div>
      </div>
    </section>
  );
}