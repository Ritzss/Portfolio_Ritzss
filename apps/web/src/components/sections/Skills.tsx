"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CodeIcon,
  Database01Icon,
  GitBranchIcon,
  ServerStack01Icon,
} from "@hugeicons/core-free-icons";
import { skillGroups } from "@portfolio/content";
import BranchedMenu from "../ui/BranchedMenu";

const groupIcons = [
  CodeIcon,
  ServerStack01Icon,
  Database01Icon,
  GitBranchIcon,
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(skillGroups[0]?.children[0]?.value ?? "");

  return (
    <section id="skills" className="border-t border-white/10 px-6 py-24 bg-[#080808b0]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-orange-500">03 / Skills</p>

            <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Tools I use to turn ideas into working software.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-zinc-500">
              My stack covers the interface, the APIs behind it, the database underneath, and the tools that keep everything moving.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {skillGroups.map((group, index) => {
                const Icon = groupIcons[index];

                return (
                  <div key={group.label} className="cursor-target flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-xs text-zinc-400">
                    <HugeiconsIcon icon={Icon} size={14} strokeWidth={1.7} />
                    {group.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-white/2 p-8 sm:p-10">
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">Stack</p>
                <p className="mt-2 text-sm text-zinc-400">Select a branch</p>
              </div>

              <span className="font-mono text-xs text-zinc-700">
                {activeSkill}
              </span>
            </div>

            <div className="inline-block">
              <BranchedMenu
                items={skillGroups}
                defaultOpen={[0]}
                defaultActive={activeSkill}
                onSelect={(value) => setActiveSkill(value)}
                color="#f5f5f5"
                accentColor="#f97316"
                lineColor="#3f3f46"
                width={320}
                rowHeight={40}
                indent={52}
                trunk={16}
                radius={10}
                lineWidth={1.5}
                fontSize={14}
                drawDuration={400}
                foldDuration={300}
              />
            </div>

            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-xs leading-6 text-zinc-600">
                Frontend → backend → database → deployment. The fun little chain of events that makes a button actually do something.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}