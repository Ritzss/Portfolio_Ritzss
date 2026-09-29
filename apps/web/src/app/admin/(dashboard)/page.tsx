"use client";

import { useEffect, useState } from "react";
import MagicBento from "@/components/ui/MagicBento";

type FeedbackType =
  | "feedback"
  | "project"
  | "job"
  | "collaboration"
  | "other";

interface DashboardStats {
  total: number;
  new: number;
  read: number;
  resolved: number;
}

interface LatestFeedback {
  _id: string;
  name: string;
  email: string;
  type: FeedbackType;
  message: string;
  rating?: number;
  status: "new" | "read" | "resolved";
  createdAt: string;
}

function formatType(type: FeedbackType) {
  const labels: Record<FeedbackType, string> = {
    feedback: "Site Feedback",
    project: "Project Query",
    job: "Job Opportunity",
    collaboration: "Collaboration",
    other: "Other",
  };

  return labels[type];
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    new: 0,
    read: 0,
    resolved: 0,
  });

  const [latestFeedback, setLatestFeedback] =
    useState<LatestFeedback | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetch("/api/admin/dashboard", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        const data = await response.json();

        setStats(data.stats);
        setLatestFeedback(data.latestFeedback);
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const cards = [
    {
      label: "01 / Messages",
      title: loading ? "—" : String(stats.total).padStart(2, "0"),
      description:
        "Total feedback, enquiries, opportunities, and collaboration requests.",
      color: "#100D0B",
    },
    {
      label: "02 / New",
      title: loading ? "—" : String(stats.new).padStart(2, "0"),
      description: "Messages that have not been reviewed yet.",
      color: "#0B1014",
    },
    {
      label: "03 / Resolved",
      title: loading ? "—" : String(stats.resolved).padStart(2, "0"),
      description: "Messages that have been handled and resolved.",
      color: "#0B120F",
    },
    {
      label: "04 / Latest Contact",
      title: loading ? "—" : latestFeedback?.name || "None",
      description: latestFeedback
        ? formatType(latestFeedback.type)
        : "No messages have been received yet.",
      color: "#100C14",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange-500">
          01 / Overview
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Control Center<span className="text-orange-500">.</span>
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500">
          Portfolio administration and communication control center.
        </p>
      </div>

      <div className="mt-10">
        <MagicBento
          cards={cards}
          textAutoHide={false}
          enableStars
          enableSpotlight
          enableBorderGlow
          disableAnimations={false}
          spotlightRadius={260}
          particleCount={6}
          enableTilt={false}
          glowColor="249, 115, 22"
          clickEffect={false}
          enableMagnetism={false}
        />
      </div>

      <section className="mt-8 rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-orange-500">
              Communication
            </p>

            <h3 className="mt-2 text-lg font-medium text-white">
              Latest Message
            </h3>
          </div>

          <a
            href="/admin/messages"
            className="rounded-full border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-zinc-600 transition-colors hover:border-white/20 hover:text-white"
          >
            Open Inbox
          </a>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          {!latestFeedback ? (
            <div className="py-8 text-center">
              <p className="text-sm text-zinc-600">
                No messages have been received yet.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-medium text-zinc-200">
                      {latestFeedback.name}
                    </p>

                    <span className="rounded-full border border-orange-500/20 bg-orange-500/5 px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider text-orange-400">
                      {formatType(latestFeedback.type)}
                    </span>

                    {latestFeedback.rating && (
                      <span className="font-mono text-[9px] text-zinc-600">
                        ★ {latestFeedback.rating}/5
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-zinc-600">
                    {latestFeedback.email}
                  </p>
                </div>

                <p className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-zinc-700">
                  {formatDate(latestFeedback.createdAt)}
                </p>
              </div>

              <p className="mt-6 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-zinc-500">
                {latestFeedback.message}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <span
                  className={`rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider ${
                    latestFeedback.status === "new"
                      ? "border-orange-500/20 bg-orange-500/5 text-orange-400"
                      : latestFeedback.status === "resolved"
                        ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                        : "border-white/10 text-zinc-600"
                  }`}
                >
                  {latestFeedback.status}
                </span>

                <a
                  href="/admin/messages"
                  className="font-mono text-[9px] uppercase tracking-wider text-zinc-600 transition-colors hover:text-orange-400"
                >
                  View message →
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}