"use client";

import type { ReactNode } from "react";

interface DashboardCardProps {
  number: string;
  label: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  accent?: string;
}

export default function DashboardCard({
  number,
  label,
  value,
  description,
  icon,
  accent = "#f97316",
}: DashboardCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" style={{ backgroundColor: accent }} />

      <div className="relative flex min-h-55 flex-col">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[9px] tracking-[0.25em]" style={{ color: accent }}>
            {number}
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/3 text-zinc-500 transition-colors duration-300 group-hover:text-white" style={{ borderColor: `${accent}30` }}>
            {icon}
          </span>
        </div>

        <div className="mt-auto">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600">
            {label}
          </p>

          <p className="mt-2 text-5xl font-semibold tracking-tighter text-white">
            {value}
          </p>

          <div className="mt-5 h-px w-full bg-white/10">
            <div className="h-px w-0 transition-all duration-700 group-hover:w-full" style={{ backgroundColor: accent }} />
          </div>

          <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-zinc-700">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}