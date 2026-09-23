/* eslint-disable @next/next/no-location-assign-relative-destination */
"use client";

import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, Linkedin02Icon } from "@hugeicons/core-free-icons";
import { contact, socialLinks } from "@portfolio/content";
import FuseButton from "../ui/FuseButton";
import StatusMark from "../ui/StatusMark";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const github = socialLinks.find((link) => link.platform === "GitHub");
  const linkedin = socialLinks.find((link) => link.platform === "LinkedIn");
  const [resumeStatus, setResumeStatus] = useState<
    "pending" | "running" | "done" | "failed"
  >("pending");

  const downloadResume = () => {
    setResumeStatus("running");

    const link = document.createElement("a");
    link.href = "/api/resume";
    link.download = "Ritanshu-Babuta-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      setResumeStatus("done");
    }, 700);

    setTimeout(() => {
      setResumeStatus("pending");
    }, 2200);
  };
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 px-6 py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/6 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-orange-500">
            07 / Contact
          </p>

          <h2 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
            {contact.heading}
          </h2>

          <p className="mt-8 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
            {contact.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-16"
        >
          <Link
            href={`mailto:${contact.email}`}
            className="group inline-flex w-fit items-center gap-4 border-b border-white/20 pb-3 text-xl text-white transition-colors duration-300 hover:border-orange-500 hover:text-orange-400 sm:text-2xl"
          >
            {contact.email}
            <span className="text-orange-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          {github && (
            <FuseButton
              label="GitHub"
              icon={
                <HugeiconsIcon icon={GithubIcon} size={16} strokeWidth={1.8} />
              }
              color="#F5F0E8"
              background="#111111"
              fuseColor="#F97316"
              size="md"
              fuse="outline"
              commitOn="fuseEnd"
              settle="reset"
              onCommit={() => {
                window.open(github.url, "_blank", "noopener,noreferrer");
              }}
            />
          )}

          {linkedin && (
            <FuseButton
              label="LinkedIn"
              icon={
                <HugeiconsIcon
                  icon={Linkedin02Icon}
                  size={16}
                  strokeWidth={1.8}
                />
              }
              color="#F5F0E8"
              background="#111111"
              fuseColor="#F97316"
              size="md"
              fuse="outline"
              commitOn="fuseEnd"
              settle="reset"
              onCommit={() => {
                window.open(linkedin.url, "_blank", "noopener,noreferrer");
              }}
            />
          )}

          <button
            type="button"
            onClick={downloadResume}
            aria-label="Download resume"
            className="cursor-target"
          >
            <StatusMark
              status={resumeStatus}
              label={
                resumeStatus === "running"
                  ? "Preparing Resume"
                  : resumeStatus === "done"
                    ? "Resume Downloaded"
                    : resumeStatus === "failed"
                      ? "Download Failed"
                      : "Download Resume"
              }
              color="#F97316"
              doneColor="#22C55E"
              errorColor="#EF4444"
              size={18}
              strokeWidth={2}
              fontSize={13}
              dashes={8}
              strike={false}
              className="cursor-target rounded-full border border-orange-500/30 bg-orange-500/5 px-5 py-3 transition-all duration-300 hover:border-orange-500/60 hover:bg-orange-500/10"
            />
          </button>
        </motion.div>

        <div className="mt-24 flex flex-col gap-4 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.25em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>Ritanshu Babuta · Full Stack Developer</span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
            Available for opportunities
          </span>
        </div>
      </div>
    </section>
  );
}
