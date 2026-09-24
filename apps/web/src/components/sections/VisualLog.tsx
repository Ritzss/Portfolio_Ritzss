"use client";

import DriftWall from "@/components/ui/DriftWall";

const items = [
  {
    image: "/visual-log/vastradrobe-home.webp",
    title: "VastraDrobe — Homepage",
    href: "/projects/vastradrobe",
  },
  {
    image: "/visual-log/product-page.webp",
    title: "Product Variant System",
  },
  {
    image: "/visual-log/inventory.webp",
    title: "Inventory Workflow",
  },
  {
    image: "/visual-log/api.webp",
    title: "REST API Architecture",
  },
  {
    image: "/visual-log/home.webp",
    title: "Experimental Home",
  },
  {
    image: "/visual-log/next-component.webp",
    title: "Reusable Next.js Component",
  },
  {
    image: "/visual-log/home-code.webp",
    title: "Home Code",
  },
  {
    image: "/visual-log/ui-experiment.webp",
    title: "UI Experiment",
  },
];

export default function VisualLog() {
  return (
    <section
      id="visual-log"
      className="relative min-h-212.5 overflow-hidden border-t border-white/10 bg-[#050505b0] py-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-orange-500">
              Visual Log
            </p>

            <h2 className="max-w-3xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Things I&apos;ve been
              <br />
              <span className="text-zinc-500">building lately.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-zinc-400">
            A rotating collection of code experiments, interface ideas,
            project snapshots, and small things worth keeping.
          </p>
        </div>

        <div className="relative h-150 overflow-hidden rounded-3xl border border-white/10 bg-black">
          <DriftWall
            items={items}
            columns={4}
            tileWidth={310}
            tileHeight={216}
            gap={20}
            tilt={16}
            turn={-20}
            perspective={1600}
            depth={90}
            speed={44}
            direction="up"
            variance={0.35}
            parallax={0.35}
            lift={40}
            fade={0.65}
            dim={0.95}
            overlayColor="#080808"
            radius={14}
            roll={0}
            pauseOnHover={false}
            grayscale={false}
          />

          {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#050505] to-transparent" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#050505] to-transparent" /> */}
        </div>
      </div>
    </section>
  );
}