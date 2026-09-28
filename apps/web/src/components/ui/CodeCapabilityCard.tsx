"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

interface CodeCapabilityCardProps {
  number: string;
  title: string;
  description: string;
  code: string;
  language?: string;
  accentColor?: string;
}

export default function CodeCapabilityCard({
  number,
  title,
  description,
  code,
  language = "typescript",
  accentColor = "#F97316",
}: CodeCapabilityCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  return (
    <>
      <article className="cursor-target group relative h-125 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}12, transparent 60%)` }} />

        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="shrink-0 font-mono text-[10px]" style={{ color: accentColor }}>
                {number}
              </span>

              <h3 className="truncate text-sm font-semibold uppercase tracking-[0.12em] text-zinc-200">
                {title}
              </h3>
            </div>

            <span className="ml-3 shrink-0 font-mono text-[9px] uppercase tracking-widest text-zinc-700">
              {language}
            </span>
          </div>

          <div className="px-5 pt-5">
            <p className="max-w-md text-sm leading-6 text-zinc-500">
              {description}
            </p>
          </div>

          <div className="mx-5 my-5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/8 bg-[#050505]">
            <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              </div>

              <button type="button" onClick={handleCopy} className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-zinc-600 transition-colors hover:text-white">
                {copied ? <FiCheck size={11} /> : <FiCopy size={11} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <pre className="code-scroll min-h-0 flex-1 overflow-auto p-4 font-mono text-[11px] leading-6 text-zinc-400">
              <code>{code}</code>
            </pre>
          </div>

          <div className="h-px w-0 shrink-0 transition-all duration-500 group-hover:w-full" style={{ backgroundColor: accentColor }} />
        </div>
      </article>

      <style>{`
        .code-scroll::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }

        .code-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .code-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 999px;
        }

        .code-scroll::-webkit-scrollbar-thumb:hover {
          background: ${accentColor};
        }
      `}</style>
    </>
  );
}