/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronLeft,
  FiClock,
  FiMail,
  FiRefreshCw,
  FiSend,
  FiStar,
  FiTrash2,
} from "react-icons/fi";

type FeedbackStatus = "new" | "read" | "resolved";

type FeedbackType =
  | "feedback"
  | "project"
  | "job"
  | "collaboration"
  | "other";

interface Feedback {
  _id: string;
  name: string;
  email: string;
  type: FeedbackType;
  message: string;
  rating?: number;
  status: FeedbackStatus;
  createdAt: string;
  updatedAt: string;
}

type StatusFilter = "all" | FeedbackStatus;
type TypeFilter = "all" | FeedbackType;

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "resolved", label: "Resolved" },
];

const typeFilters: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "feedback", label: "Feedback" },
  { value: "project", label: "Project" },
  { value: "job", label: "Job" },
  { value: "collaboration", label: "Collaboration" },
  { value: "other", label: "Other" },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
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

export default function MessagesClient() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [selected, setSelected] = useState<Feedback | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      setError("");

      const query =
        statusFilter === "all"
          ? ""
          : `?status=${encodeURIComponent(statusFilter)}`;

      const response = await fetch(`/api/admin/feedback${query}`, {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load feedback");
      }

      setFeedback(data.feedback);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load feedback",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [statusFilter]);

  const filteredFeedback = useMemo(() => {
    if (typeFilter === "all") {
      return feedback;
    }

    return feedback.filter((item) => item.type === typeFilter);
  }, [feedback, typeFilter]);

  const updateStatus = async (
    item: Feedback,
    status: FeedbackStatus,
  ) => {
    try {
      setActionLoading(true);
      setError("");

      const response = await fetch(
        `/api/admin/feedback/${item._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update feedback",
        );
      }

      const updatedFeedback = data.feedback as Feedback;

      setFeedback((current) =>
        current.map((entry) =>
          entry._id === updatedFeedback._id
            ? updatedFeedback
            : entry,
        ),
      );

      setSelected((current) =>
        current?._id === updatedFeedback._id
          ? updatedFeedback
          : current,
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update feedback",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const deleteFeedback = async (item: Feedback) => {
    const confirmed = window.confirm(
      `Delete the message from ${item.name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      const response = await fetch(
        `/api/admin/feedback/${item._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete feedback",
        );
      }

      setFeedback((current) =>
        current.filter((entry) => entry._id !== item._id),
      );

      setSelected(null);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete feedback",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const selectFeedback = async (item: Feedback) => {
    setSelected(item);

    if (item.status === "new") {
      await updateStatus(item, "read");
    }
  };

  const statusCounts = useMemo(
    () => ({
      all: feedback.length,
      new: feedback.filter((item) => item.status === "new").length,
      read: feedback.filter((item) => item.status === "read").length,
      resolved: feedback.filter(
        (item) => item.status === "resolved",
      ).length,
    }),
    [feedback],
  );

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange-500">
            02 / Communication
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Messages<span className="text-orange-500">.</span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500">
            Feedback, project enquiries, opportunities, and
            collaboration requests from the portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchFeedback}
          disabled={loading}
          className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/2 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:border-white/20 hover:text-white disabled:opacity-40"
        >
          <FiRefreshCw
            size={13}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {statusFilters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setStatusFilter(item.value)}
            className={`rounded-full border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors ${
              statusFilter === item.value
                ? "border-orange-500/40 bg-orange-500/10 text-orange-400"
                : "border-white/10 text-zinc-600 hover:border-white/20 hover:text-zinc-300"
            }`}
          >
            {item.label}

            <span className="ml-2 text-zinc-700">
              {statusCounts[item.value]}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {typeFilters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setTypeFilter(item.value)}
            className={`rounded-lg border px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] transition-colors ${
              typeFilter === item.value
                ? "border-white/20 bg-white/5 text-zinc-200"
                : "border-white/5 text-zinc-700 hover:border-white/10 hover:text-zinc-400"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="mt-6 grid min-h-150 overflow-hidden rounded-2xl border border-white/10 bg-[#090909] lg:grid-cols-[400px_minmax(0,1fr)]">
        <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
          <div className="border-b border-white/10 px-5 py-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
              Inbox / {filteredFeedback.length}
            </p>
          </div>

          <div className="max-h-175 overflow-y-auto">
            {loading ? (
              <div className="flex min-h-60 items-center justify-center">
                <FiRefreshCw
                  className="animate-spin text-zinc-700"
                  size={18}
                />
              </div>
            ) : filteredFeedback.length === 0 ? (
              <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">
                <FiMail size={24} className="text-zinc-700" />

                <p className="mt-4 text-sm text-zinc-500">
                  No messages here.
                </p>

                <p className="mt-1 text-xs text-zinc-700">
                  Try another filter.
                </p>
              </div>
            ) : (
              filteredFeedback.map((item) => (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => selectFeedback(item)}
                  className={`w-full border-b border-white/5 px-5 py-5 text-left transition-colors hover:bg-white/2.5 ${
                    selected?._id === item._id
                      ? "bg-white/4"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/3 font-mono text-[9px] text-orange-500">
                      {getInitials(item.name)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p
                          className={`truncate text-sm ${
                            item.status === "new"
                              ? "font-semibold text-white"
                              : "text-zinc-300"
                          }`}
                        >
                          {item.name}
                        </p>

                        {item.status === "new" && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                        )}
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="truncate text-[10px] uppercase tracking-wider text-orange-500/70">
                          {formatType(item.type)}
                        </span>

                        {item.rating && (
                          <span className="flex items-center gap-1 text-[9px] text-zinc-600">
                            <FiStar
                              size={9}
                              className="text-orange-500"
                            />
                            {item.rating}
                          </span>
                        )}
                      </div>

                      <p className="mt-2 truncate text-xs text-zinc-700">
                        {item.message}
                      </p>

                      <p className="mt-3 font-mono text-[8px] uppercase tracking-wider text-zinc-800">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="min-w-0">
          {!selected ? (
            <div className="flex h-full min-h-150 flex-col items-center justify-center px-8 text-center">
              <FiMail size={28} className="text-zinc-800" />

              <p className="mt-5 text-sm text-zinc-600">
                Select a message to read it.
              </p>
            </div>
          ) : (
            <div className="flex h-full min-h-150 flex-col">
              <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-7">
                <div className="flex min-w-0 items-start gap-4">
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="mt-1 text-zinc-600 hover:text-white lg:hidden"
                    aria-label="Back to messages"
                  >
                    <FiChevronLeft size={18} />
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-medium text-white">
                        {formatType(selected.type)}
                      </h3>

                      {selected.rating && (
                        <span className="flex items-center gap-1 rounded-full border border-orange-500/20 bg-orange-500/5 px-2 py-1 font-mono text-[8px] text-orange-400">
                          <FiStar size={9} />
                          {selected.rating}/5
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600">
                      <span>{selected.name}</span>

                      <span className="text-zinc-800">/</span>

                      <a
                        href={`mailto:${selected.email}`}
                        className="transition-colors hover:text-orange-400"
                      >
                        {selected.email}
                      </a>
                    </div>
                  </div>
                </div>

                <span
                  className={`w-fit rounded-full border px-3 py-1 font-mono text-[8px] uppercase tracking-[0.18em] ${
                    selected.status === "new"
                      ? "border-orange-500/30 bg-orange-500/5 text-orange-400"
                      : selected.status === "resolved"
                        ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                        : "border-white/10 text-zinc-600"
                  }`}
                >
                  {selected.status}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-7 sm:px-7">
                <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-zinc-700">
                  <FiClock size={11} />
                  {formatDate(selected.createdAt)}
                </div>

                <div className="mt-8 max-w-2xl whitespace-pre-wrap text-sm leading-8 text-zinc-400">
                  {selected.message}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-5 py-4 sm:px-7">
                {selected.status !== "new" && (
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() => updateStatus(selected, "new")}
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 font-mono text-[8px] uppercase tracking-wider text-zinc-600 transition-colors hover:text-white disabled:opacity-40"
                  >
                    <FiMail size={12} />
                    New
                  </button>
                )}

                {selected.status !== "read" && (
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() => updateStatus(selected, "read")}
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 font-mono text-[8px] uppercase tracking-wider text-zinc-600 transition-colors hover:text-white disabled:opacity-40"
                  >
                    <FiCheck size={12} />
                    Read
                  </button>
                )}

                {selected.status !== "resolved" && (
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() =>
                      updateStatus(selected, "resolved")
                    }
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 font-mono text-[8px] uppercase tracking-wider text-zinc-600 transition-colors hover:text-white disabled:opacity-40"
                  >
                    <FiCheck size={12} />
                    Resolve
                  </button>
                )}

                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent(
                    `Re: ${formatType(selected.type)}`,
                  )}`}
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-3 py-2 font-mono text-[8px] uppercase tracking-wider text-black transition-colors hover:bg-orange-400"
                >
                  <FiSend size={12} />
                  Reply
                </a>

                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => deleteFeedback(selected)}
                  className="ml-auto flex items-center gap-2 rounded-lg border border-red-500/10 px-3 py-2 font-mono text-[8px] uppercase tracking-wider text-red-500/60 transition-colors hover:border-red-500/30 hover:text-red-400 disabled:opacity-40"
                >
                  <FiTrash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}