/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

export default function PrivacyConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("portfolio-consent");

    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("portfolio-consent", "accepted");
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-200 mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#0b0b0b]/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-orange-500">
            Privacy & Data
          </p>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            This site stores information you voluntarily provide, such as
            your name, email address, and messages submitted through the
            contact form. This information is used to respond to your
            enquiry.
          </p>

          <a
            href="/privacy"
            className="mt-3 inline-block text-xs text-zinc-600 underline underline-offset-4 transition-colors hover:text-orange-400"
          >
            Read Privacy Policy
          </a>
        </div>

        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-xl bg-orange-500 px-6 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-orange-400"
        >
          Accept
        </button>
      </div>
    </div>
  );
}