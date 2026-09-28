/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect } from "react";
import Image from "next/image";
import { BeyondInterest } from "@portfolio/types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface InterestDrawerProps {
  interest: BeyondInterest | null;
  onClose: () => void;
}

export default function InterestDrawer({
  interest,
  onClose,
}: InterestDrawerProps) {
  useEffect(() => {
    if (!interest) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [interest, onClose]);

  if (!interest) return null;

  const movies =
    interest.media?.filter((item: { type: string; }) => item.type === "movie") ?? [];

  const series =
    interest.media?.filter((item: { type: string; }) => item.type === "series") ?? [];

  return (
    <div className="fixed inset-0 z-100">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close interest drawer"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/70 backdrop-blur-sm"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={interest.title}
        className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto rounded-t-[28px] border-t border-white/10 bg-[#0b0b0b] shadow-[0_-30px_100px_rgba(0,0,0,0.6)] sm:bottom-4 sm:left-auto sm:right-4 sm:top-4 sm:max-h-none sm:w-[min(720px,calc(100vw-2rem))] sm:rounded-[28px] sm:border"
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-orange-500">
                {interest.number} / Interest
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {interest.title}
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500">
                {interest.description}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-zinc-500 transition-colors hover:border-orange-500/40 hover:text-white"
            >
              ×
            </button>
          </div>

          {/* Media */}
          {interest.media && interest.media.length > 0 && (
            <div className="mt-8">
              {movies.length > 0 && (
                <MediaGroup title="Movies" items={movies} />
              )}

              {series.length > 0 && (
                <MediaGroup title="Series" items={series} />
              )}
            </div>
          )}

          {/* Empty media state */}
          {(!interest.media || interest.media.length === 0) && (
            <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/2 p-8 text-center">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-700">
                More to come
              </p>

              <p className="mt-3 text-sm text-zinc-500">
                This part of the collection is still being put together.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-700">
              Beyond the Code · Ritanshu Babuta
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function MediaGroup({
  title,
  items,
}: {
  title: string;
  items: NonNullable<BeyondInterest["media"]>;
}) {
  return (
    <div className="mb-10 last:mb-0">
      <div className="mb-4 flex items-center gap-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
          {title}
        </p>

        <span className="h-px flex-1 bg-white/10" />

        <span className="font-mono text-[8px] text-zinc-700">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item: { type: any; tmdbId: any; image: string | StaticImport; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <article key={`${item.type}-${item.tmdbId}`} className="group">
            <div className="relative aspect-2/3 overflow-hidden rounded-xl border border-white/10 bg-[#111]">
              <Image
                src={item.image}
                alt={String(item.title ?? "")}
                fill
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/30 to-transparent p-3 pt-10">
                <p className="text-xs font-medium text-white">
                  {item.title}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}