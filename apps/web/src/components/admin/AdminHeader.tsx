"use client";

import { FiMenu, FiTerminal } from "react-icons/fi";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#080808]/90 px-5 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onMenuClick} className="rounded-lg border border-white/10 p-2 text-zinc-500 transition-colors hover:border-white/20 hover:text-white lg:hidden" aria-label="Open admin menu">
          <FiMenu size={18} />
        </button>

        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700">
            Control Center
          </p>

          <h1 className="mt-1 text-sm font-medium text-zinc-200">
            Dashboard
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-700 sm:block">
          System Online
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/2 text-orange-500">
          <FiTerminal size={14} />
        </span>

        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
      </div>
    </header>
  );
}