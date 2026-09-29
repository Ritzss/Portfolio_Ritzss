"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiLock, FiUser } from "react-icons/fi";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("READY");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setStatus("AUTHENTICATING...");

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("ACCESS DENIED");
        setError(data.error ?? "Authentication failed");
        return;
      }

      setStatus("ACCESS GRANTED");

      router.replace("/admin");
      router.refresh();
    } catch {
      setStatus("SYSTEM ERROR");
      setError("Unable to reach authentication service");
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-5 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(249,115,22,0.08),transparent_45%)]" />

      <div className="relative w-full max-w-lg">
        <div className="mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-500">
            RITANSHU.OS v1.0.0
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            System Access<span className="text-orange-500">.</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="overflow-hidden rounded-2xl border border-white/10 bg-[#090909] shadow-2xl shadow-black/40">
          <div className="border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              <span className="h-2 w-2 rounded-full bg-green-500" />

              <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-700">
                Secure Terminal
              </span>
            </div>
          </div>

          <div className="space-y-7 p-6 sm:p-8">
            <div>
              <p className="font-mono text-xs text-zinc-600">
                &gt; identify
              </p>

              <label className="mt-3 flex items-center gap-3 border-b border-white/10 pb-3 focus-within:border-orange-500/60">
                <FiUser size={15} className="text-zinc-700" />

                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="USER"
                  autoComplete="username"
                  className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-zinc-800"
                  required
                />
              </label>
            </div>

            <div>
              <p className="font-mono text-xs text-zinc-600">
                &gt; authenticate
              </p>

              <label className="mt-3 flex items-center gap-3 border-b border-white/10 pb-3 focus-within:border-orange-500/60">
                <FiLock size={15} className="text-zinc-700" />

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="PASSKEY"
                  autoComplete="current-password"
                  className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-zinc-800"
                  required
                />
              </label>
            </div>

            <button type="submit" disabled={status === "AUTHENTICATING..."} className="group flex w-full items-center justify-between rounded-xl border border-orange-500/30 bg-orange-500/5 px-5 py-4 font-mono text-xs uppercase tracking-[0.2em] text-orange-500 transition-all duration-300 hover:border-orange-500/60 hover:bg-orange-500/10 disabled:cursor-wait disabled:opacity-50">
              <span>[ ENTER ]</span>

              <FiArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {error && (
              <p className="border border-red-500/20 bg-red-500/5 px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-red-400">
                ERROR :: {error}
              </p>
            )}
          </div>

          <div className="border-t border-white/10 px-6 py-5">
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-700">
              System Status
            </p>

            <div className="grid gap-2 sm:grid-cols-3">
              <StatusItem label="Portfolio" />
              <StatusItem label="API" />
              <StatusItem label="Database" />
            </div>

            <p className="mt-5 font-mono text-[9px] uppercase tracking-wider text-zinc-700">
              STATUS ::{" "}
              <span className={status === "ACCESS DENIED" ? "text-red-500" : "text-emerald-500"}>
                {status}
              </span>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

function StatusItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-zinc-600">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {label}
    </div>
  );
}