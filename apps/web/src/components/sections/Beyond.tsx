import React from "react";
import BeyondTransition from "../beyond/BeyondTransition";

const Beyond = () => {
  return (
    <section
      id="beyond"
      className="relative overflow-hidden border-t border-white/10 bg-[#080808] px-6 py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-orange-500">
          07 / Beyond
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              There&apos;s more beyond the code.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
              Certifications, interests, achievements, things I&apos;m learning,
              and the person behind the projects.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <BeyondTransition />
        </div>
      </div>
    </section>
  );
};

export default Beyond;
