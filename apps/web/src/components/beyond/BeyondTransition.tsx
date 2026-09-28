"use client";

import PixelSwap from "../ui/PixelSwap";

interface BeyondTransitionProps {
  onComplete: () => void;
}

export default function BeyondTransition({ onComplete }: BeyondTransitionProps) {
  return (
    <div className="mx-auto w-full">
      <PixelSwap
        firstContent={
          <div className="flex h-full w-full items-center justify-center bg-[#11100F] px-6">
            <div className="text-center">
              <h3 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Beyond the Code
              </h3>

              <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600">
                Click to enter
              </p>
            </div>
          </div>
        }
        secondContent={
          <div className="flex h-full w-full items-center justify-center bg-orange-500 px-6">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/60">
                You found it
              </p>

              <h3 className="mt-4 text-4xl font-semibold tracking-tight text-black sm:text-6xl">
                Entering...
              </h3>

              <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-black/50">
                Beyond the Code
              </p>
            </div>
          </div>
        }
        pixelSize={36}
        gap={0}
        pixelRadius={11}
        pixelSpin={0}
        pixelScale={0.1}
        duration={1700}
        pixelDuration={450}
        pattern="random"
        randomness={0.15}
        fade
        trigger="click"
        onComplete={(active) => {
          if (active) {
            onComplete();
          }
        }}
      />
    </div>
  );
}