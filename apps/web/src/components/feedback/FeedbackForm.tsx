"use client";

import { useEffect, useRef, useState } from "react";
import Stepper, { Step } from "@/components/ui/Stepper";
import PeekRating from "@/components/ui/PeekRating";
import HoldButton from "@/components/ui/HoldButton";

const feedbackTypes = [
  {
    value: "feedback",
    label: "Site Feedback",
  },
  {
    value: "project",
    label: "Project Query",
  },
  {
    value: "job",
    label: "Job Opportunity",
  },
  {
    value: "collaboration",
    label: "Collaboration",
  },
  {
    value: "other",
    label: "Other",
  },
];

const initialForm = {
  name: "",
  email: "",
  type: "feedback",
  message: "",
  rating: 0,
};

export default function FeedbackForm() {
  const [form, setForm] = useState(initialForm);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [error, setError] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  const [formVersion, setFormVersion] = useState(0);

  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const updateForm = (field: keyof typeof form, value: string | number) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const submitFeedback = async () => {
    if (status === "submitting") {
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          type: form.type,
          message: form.message.trim(),
          ...(form.type === "feedback" && form.rating > 0
            ? {
                rating: form.rating,
              }
            : {}),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
      setIsClosed(true);

      resetTimerRef.current = setTimeout(() => {
        setForm(initialForm);
        setStatus("idle");
        setError("");
        setIsClosed(false);

        setFormVersion((version) => version + 1);
      }, 3000);
    } catch (error) {
      setStatus("error");

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  if (isClosed) {
    return (
      <div className="flex min-h-90 w-full items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500">
            Message received
          </p>

          <h3 className="mt-4 text-3xl font-medium tracking-tight text-white">
            Thanks for reaching out.
          </h3>

          <p className="mt-3 text-sm text-zinc-500">
            Your message has been saved successfully.
          </p>

          <div className="mx-auto mt-6 h-1 w-32 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full origin-left animate-[shrink_3s_linear] bg-orange-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Stepper
        key={formVersion}
        initialStep={1}
        nextButtonText="Continue"
        backButtonText="Back"
        disableStepIndicators
        hideFooterOnLastStep
        className="w-full"
        stepCircleContainerClassName="border-white/10 bg-[#0a0a0a]"
        stepContainerClassName="border-white/5"
        contentClassName="text-white"
        footerClassName="border-t border-white/5"
        nextButtonProps={{
          className:
            "rounded-full bg-orange-500 px-5 py-2 text-sm font-medium text-black transition hover:bg-orange-400",
        }}
        backButtonProps={{
          className:
            "rounded-full border border-white/10 px-5 py-2 text-sm text-zinc-400 transition hover:border-white/20 hover:text-white",
        }}
        validateStep={(step) => {
          if (step === 1) {
            return form.name.trim().length > 0 && form.email.trim().length > 0;
          }

          if (step === 2) {
            return Boolean(form.type);
          }

          return form.message.trim().length > 0;
        }}
      >
        <Step>
          <div className="pb-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500">
              01 / About you
            </p>

            <h3 className="mt-4 text-2xl font-medium text-white">
              Who are you?
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Just enough information to know who I&apos;m talking to.
            </p>

            <div className="mt-8 space-y-6">
              <label className="block">
                <span className="text-sm text-zinc-300">Name</span>

                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  className="mt-3 w-full border-b border-white/10 bg-transparent pb-3 text-sm text-white outline-none placeholder:text-zinc-700 transition-colors focus:border-orange-500"
                />
              </label>

              <label className="block">
                <span className="text-sm text-zinc-300">Email</span>

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateForm("email", event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="mt-3 w-full border-b border-white/10 bg-transparent pb-3 text-sm text-white outline-none placeholder:text-zinc-700 transition-colors focus:border-orange-500"
                />
              </label>
            </div>
          </div>
        </Step>

        <Step>
          <div className="pb-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500">
              02 / Purpose
            </p>

            <h3 className="mt-4 text-2xl font-medium text-white">
              What is this about?
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Pick the reason that best describes your message.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {feedbackTypes.map((item) => {
                const active = form.type === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => updateForm("type", item.value)}
                    className={`cursor-target rounded-xl border px-4 py-4 text-left text-sm transition-all duration-300 ${
                      active
                        ? "border-orange-500/60 bg-orange-500/10 text-white"
                        : "border-white/10 bg-white/2 text-zinc-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span
                      className={`mb-2 block h-1.5 w-1.5 rounded-full ${
                        active ? "bg-orange-500" : "bg-zinc-700"
                      }`}
                    />

                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Step>

        <Step>
          <div className="pb-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-500">
              03 / Message
            </p>

            <h3 className="mt-4 text-2xl font-medium text-white">
              Tell me what&apos;s on your mind.
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Keep it short, detailed, strange, or somewhere in between.
            </p>

            <div className="mt-8">
              <label className="block">
                <span className="text-sm text-zinc-300">Message</span>

                <textarea
                  value={form.message}
                  onChange={(event) =>
                    updateForm("message", event.target.value)
                  }
                  placeholder="Write your message..."
                  rows={5}
                  maxLength={2000}
                  className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-white/2 p-4 text-sm leading-6 text-white outline-none placeholder:text-zinc-700 transition-colors focus:border-orange-500/60"
                />
              </label>

              {form.type === "feedback" && (
                <div className="mt-7">
                  <p className="mb-3 text-sm text-zinc-300">
                    How would you rate the site?
                  </p>

                  <PeekRating
                    value={form.rating}
                    count={5}
                    shape="star"
                    labels={["Poor", "Fair", "Good", "Great", "Superb"]}
                    activeColor="#f97316"
                    idleColor="#52525b"
                    tipColor="#27272a"
                    tipTextColor="#f5f5f5"
                    size={40}
                    lift={8}
                    magnify={1.15}
                    riseDuration={320}
                    popScale={1.3}
                    showTip
                    allowClear
                    onChange={(value) => updateForm("rating", value)}
                    readOnly={false}
                  />
                </div>
              )}

              {error && (
                <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                  <p className="text-sm leading-6 text-red-400">{error}</p>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-zinc-600">
                  Maximum 5 submissions per 24 hours.
                </p>

                <HoldButton
                  holdTime={1200}
                  resetAfter={0}
                  backgroundColor="#18181b"
                  fillColor="#f97316"
                  textColor="#f5f5f5"
                  fillTextColor="#09090b"
                  glow
                  doneLabel="Sent"
                  disabled={status === "submitting"}
                  onHold={submitFeedback}
                >
                  {status === "submitting" ? "Sending..." : "Hold to submit"}
                </HoldButton>
              </div>
            </div>
          </div>
        </Step>
      </Stepper>

      <style jsx>{`
        @keyframes shrink {
          from {
            transform: scaleX(1);
          }

          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </div>
  );
}
