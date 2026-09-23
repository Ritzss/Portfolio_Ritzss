"use client";

import { useEffect, useState } from "react";
import SplitFlapText from "../ui/SplitFlapText";

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setExit(true);
    }, 2800);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center bg-[#050505] transition-opacity duration-600 ${
        exit
          ? "pointer-events-none opacity-0"
          : "opacity-100"
      }`}
    >
      <div
        className={`flex flex-col items-center transition-all duration-700 ${
          exit
            ? "-translate-y-8 scale-95 opacity-0"
            : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.45em] text-zinc-500">
          Initializing portfolio
        </p>

        <SplitFlapText
          words={["INITIALIZING", "RITANSHU BABUTA"]}
          loop={false}
          cycleDelay={500}
          flipsPerChar={6}
          flipDuration={0.1}
          stagger={0.07}
          charset="alphanumeric"
          tileColor="#C2410C"
          textColor="#FFF7ED"
          tileRadius={5}
          gap={4}
          fontSize="clamp(24px, 5vw, 64px)"
          padTo={15}
        />

        <div className="mt-8 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#cd0000]" />

          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            System online
          </span>
        </div>
      </div>
    </div>
  );
}