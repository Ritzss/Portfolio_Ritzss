import type { BeyondData } from "@portfolio/types";

interface BeyondSoftwareProps {
  data: BeyondData["personalNote"];
}

export default function BeyondSoftware({
  data,
}: BeyondSoftwareProps) {
  return (
    <section
      id="beyond-software"
      className="relative overflow-hidden border-t border-white/10 px-6 py-28 sm:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-[120px_1fr]">
          {/* Section number */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-orange-500">
              {data.eyebrow}
            </p>
          </div>

          {/* Main content */}
          <div>
            <p className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              {data.title}
            </p>

            <div className="mt-12 h-px w-full bg-white/10" />

            <div className="mt-8 flex flex-col gap-4 text-xs uppercase tracking-[0.2em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
              <span>Beyond the code</span>
              <span>Still learning. Still building.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative typography */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-[#f861004f]"
      >
        CURIOSITY
      </div>
    </section>
  );
}