"use client";

import { useState } from "react";
import type { BeyondInterest } from "@portfolio/types";
import InterestDrawer from "./InterestDrawer";

interface InterestsProps {
  interests: BeyondInterest[];
}

export default function Interests({ interests }: InterestsProps) {
  const [selectedInterest, setSelectedInterest] =
    useState<BeyondInterest | null>(null);

  return (
    <>
      <section
        id="interests"
        className="border-t border-white/10 px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-[120px_1fr]">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-orange-500">
              02
            </p>

            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Interests
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500">
                The things that occupy my attention when I&apos;m not building
                something.
              </p>
            </div>
          </div>

          <div className="mt-16 divide-y divide-white/10 border-y border-white/10">
            {interests.map((interest) => (
              <button
                key={interest.id}
                type="button"
                onClick={() => setSelectedInterest(interest)}
                className="group grid w-full gap-5 py-8 text-left transition-colors hover:bg-white/2 sm:grid-cols-[80px_260px_1fr_auto] sm:items-center"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-700">
                  {interest.number}
                </span>

                <h3 className="text-2xl font-medium tracking-tight text-zinc-300 transition-colors group-hover:text-orange-500 sm:text-3xl">
                  {interest.title}
                </h3>

                <p className="max-w-xl text-sm leading-7 text-zinc-600 transition-colors group-hover:text-zinc-400">
                  {interest.description}
                </p>

                <span className="hidden text-xl text-zinc-700 transition-all group-hover:translate-x-1 group-hover:text-orange-500 sm:block">
                  ↗
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <InterestDrawer
        interest={selectedInterest}
        onClose={() => setSelectedInterest(null)}
      />
    </>
  );
}
