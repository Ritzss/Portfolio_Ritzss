"use client";

import Link from "next/link";
import { useState } from "react";
import RubberSegment from "../ui/RubberSegment";
import LineSidebar from "../ui/LineSidebar";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const sidebarItems = links.map((link) => link.label);

const rubberItems = links.map((link) => ({
  value: link.href,
  label: link.label,
}));

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleRubberChange = (value: string) => {
    scrollToSection(value);
  };

  const handleSidebarClick = (index: number) => {
    const link = links[index];

    if (!link) return;

    setOpen(false);
    scrollToSection(link.href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#070707]/75 px-3 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-4">
        {/* Identity */}
        <Link
          href="#home"
          onClick={() => setOpen(false)}
          className="group relative z-60 flex items-center gap-3"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-orange-500/30 bg-orange-500/5 text-[10px] font-bold tracking-tight text-orange-400 transition-all duration-300 group-hover:border-orange-500/70 group-hover:bg-orange-500/10">
            RB

            <span className="absolute bottom-0 left-0 h-px w-full bg-orange-500/70 transition-transform duration-500 group-hover:translate-x-full" />
          </span>

          <span className="hidden sm:block">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-200">
              Ritanshu Babuta
            </span>

            <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-600">
              Full Stack Developer
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <div className="rounded-xl border border-white/8 bg-white/2.5 p-1 shadow-inner shadow-white/2">
            <RubberSegment
              items={rubberItems}
              defaultValue="#about"
              trackColor="#111111"
              thumbColor="#f97316"
              textColor="#737373"
              activeTextColor="#111111"
              size="md"
              radius={10}
              inset={3}
              equalSlots={false}
              stretch={90}
              squash={4}
              speed={1}
              glide={70}
              draggable
              aria-label="Portfolio navigation"
              onChange={handleRubberChange}
            />
          </div>
        </div>

        {/* Desktop status */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-2 border-r border-white/10 pr-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>

            <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-zinc-500">
              Available
            </span>
          </div>

          <Link
            href="#contact"
            className="group flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/5 px-3.5 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-orange-300 transition-all duration-300 hover:border-orange-400/70 hover:bg-orange-500/10 hover:text-orange-200"
          >
            <span>Let&apos;s Talk</span>

            <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="relative z-60 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/3 text-zinc-300 transition-all duration-300 hover:border-orange-500/40 hover:text-white md:hidden"
        >
          <span
            className={`absolute h-px w-4 bg-current transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />

          <span
            className={`absolute h-px w-4 bg-current transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </nav>

      {/* Mobile navigation */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 h-full w-full bg-black/70 backdrop-blur-md transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sidebar */}
        <aside
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-white/10 bg-[#070707] px-7 pt-28 shadow-[-30px_0_100px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar header */}
          <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-6">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-orange-500">
                Navigation
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Explore.
              </h2>
            </div>

            <span className="font-mono text-[9px] text-zinc-700">
              06 SECTIONS
            </span>
          </div>

          {/* Line Sidebar */}
          <LineSidebar
            items={sidebarItems}
            accentColor="#f97316"
            textColor="#737373"
            markerColor="#27272a"
            showIndex
            showMarker
            proximityRadius={130}
            maxShift={38}
            falloff="smooth"
            markerLength={60}
            markerGap={10}
            tickScale={0.65}
            scaleTick
            itemGap={26}
            fontSize={1.1}
            smoothing={90}
            defaultActive={0}
            onItemClick={handleSidebarClick}
          />

          {/* Mobile footer */}
          <div className="mt-auto border-t border-white/10 pb-8 pt-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-700">
                RITANSHU BABUTA
              </span>

              <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-600">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Online
              </span>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}