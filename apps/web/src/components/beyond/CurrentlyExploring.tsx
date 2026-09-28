import type { ExploringItem } from "@portfolio/types";

interface CurrentlyExploringProps {
  items: ExploringItem[];
}

export default function CurrentlyExploring({ items }: CurrentlyExploringProps) {
  return (
    <section
      id="exploring"
      className="border-t border-white/10 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-[120px_1fr]">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-orange-500">
            03
          </p>

          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Currently Exploring
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500">
              Things I&apos;m actively learning, experimenting with, and trying
              to understand beyond simply knowing how to use them.
            </p>
          </div>
        </div>

        <div className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="group grid gap-6 py-8 sm:grid-cols-[70px_240px_1fr]"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-700">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="text-2xl font-medium tracking-tight text-zinc-300 transition-colors group-hover:text-orange-500 sm:text-3xl">
                {item.title}
              </h3>

              <div>
                <p className="max-w-2xl text-sm leading-7 text-zinc-500 transition-colors group-hover:text-zinc-400">
                  {item.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.focus.map((focus) => (
                    <span
                      key={focus}
                      className="rounded-full border border-white/10 bg-white/2 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-600 transition-colors group-hover:border-orange-500/20 group-hover:text-zinc-500"
                    >
                      {focus}
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
