"use client";

import FuzzyText from "../ui/FuzzyText";


interface OfflineFallbackProps {
  title?: string;
  message?: string;
}

export default function OfflineFallback({
  title = "NO SIGNAL",
  message = "Something went wrong. Check your internet connection and try again.",
}: OfflineFallbackProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-[#F5F0E8]">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C2410C]/10 blur-[140px]" />

      <div className="relative z-10 w-full max-w-4xl text-center">
        <p className="mb-10 text-[10px] uppercase tracking-[0.5em] text-zinc-600">
          System Error
        </p>

        <div className="flex justify-center overflow-hidden">
          <FuzzyText
            fontSize="clamp(4rem, 12vw, 9rem)"
            fontWeight={900}
            color="#F5F0E8"
            enableHover
            baseIntensity={0.08}
            hoverIntensity={0.45}
            fuzzRange={18}
            fps={60}
            direction="horizontal"
            transitionDuration={120}
            glitchMode
            glitchInterval={2200}
            glitchDuration={180}
            className="max-w-full"
          >
            {title}
          </FuzzyText>
        </div>

        <p className="mx-auto mt-10 max-w-md text-sm leading-7 text-zinc-500 sm:text-base">
          {message}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-8 rounded-full border border-[#F97316]/40 px-6 py-3 text-xs uppercase tracking-[0.25em] text-orange-300 transition-all duration-300 hover:border-[#F97316] hover:bg-[#C2410C]/10 hover:text-orange-200"
        >
          Try Again ↗
        </button>

        <div className="mt-16 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#C2410C]/40" />
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-700">
            RITANSHU BABUTA
          </span>
          <span className="h-px w-10 bg-[#C2410C]/40" />
        </div>
      </div>
    </main>
  );
}