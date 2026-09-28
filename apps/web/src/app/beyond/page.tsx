import Link from "next/link";

import { beyond } from "@portfolio/content";

import Certifications from "@/components/beyond/Certifications";
import Interests from "@/components/beyond/Interest";
import CurrentlyExploring from "@/components/beyond/CurrentlyExploring";
import BeyondSoftware from "@/components/beyond/BeyondSoftware";
import MaskedHeading from "@/components/ui/MaskedHeading";
import Navbar from "@/components/layout/Navbar";

export default function BeyondPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-[#05050505] text-white">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-28 sm:pb-30">

          <div className="relative mx-auto max-w-6xl">

            {/* Hero content */}
            <div className="mt-20 w-full sm:mt-28">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange-500">
                {beyond.intro.eyebrow}
              </p>

              <MaskedHeading
                text={beyond.intro.title}
                src="/headingbg.png"
                mediaType="image"
                fillScale={1.25}
                parallax={26}
                reveal="rise"
                trigger="view"
                drift={18}
                brightness={1}
                saturation={1}
                grayscale={false}
                duration={1.1}
                stagger={0.09}
                align="left"
                weight={700}
                tracking={-0.03}
                lineHeight={1.06}
                textScale={0.08}
                className="mt-7 whitespace-nowrap"
              />

              <p className="mt-10 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
                {beyond.intro.description}
              </p>
            </div>
          </div>
        </section>

        {/* Main sections */}
        <Certifications />

        <Interests interests={beyond.interests} />

        <CurrentlyExploring items={beyond.currentlyExploring} />

        <BeyondSoftware />

        {/* Footer */}
        <footer className="border-t border-white/10 px-6 py-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-700">
              Beyond the Code
            </p>

            <Link
              href="/"
              className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-700 transition-colors hover:text-orange-500"
            >
              Back to portfolio ↗
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
