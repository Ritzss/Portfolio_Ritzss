"use client";

import {
  FiActivity,
  FiDatabase,
  FiGitBranch,
  FiLayers,
  FiLock,
  FiServer,
} from "react-icons/fi";

const capabilities = [
  {
    icon: FiServer,
    title: "REST APIs",
    description: "Designing structured APIs for products, users, inventory, orders, and business workflows.",
    color: "#f97316",
  },
  {
    icon: FiDatabase,
    title: "Database Design",
    description: "Working with MongoDB schemas, indexes, queries, and data consistency.",
    color: "#3b82f6",
  },
  {
    icon: FiLock,
    title: "Authentication",
    description: "Protected routes, JWT authentication, role-based access, and permission-driven workflows.",
    color: "#8b5cf6",
  },
  {
    icon: FiLayers,
    title: "Business Logic",
    description: "Turning real business requirements into backend workflows that connect different parts of an application.",
    color: "#10b981",
  },
  {
    icon: FiGitBranch,
    title: "API Integrations",
    description: "Connecting applications with services such as Cloudinary, payment gateways, email, and external APIs.",
    color: "#06b6d4",
  },
  {
    icon: FiActivity,
    title: "Production APIs",
    description: "Debugging, performance improvements, environment configuration, deployment, and production issues.",
    color: "#f43f5e",
  },
];

export default function ApiEngineering() {
  return (
    <section id="api" className="relative overflow-hidden border-t border-white/10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-[120px_1fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-orange-500">
              04
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
              Backend / API Engineering
            </p>

            <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
              The part users don&apos;t see.
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-500">
              I build the backend systems behind the interfaces I create,
              including APIs, database operations, authentication, business
              logic, integrations, and production workflows.
            </p>
          </div>
        </div>

        <div className="mt-20 grid overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                onMouseEnter={(event) => {
                  const card = event.currentTarget;
                  const rect = card.getBoundingClientRect();

                  const x = event.clientX - rect.left;
                  const y = event.clientY - rect.top;

                  const distances = {
                    top: y,
                    right: rect.width - x,
                    bottom: rect.height - y,
                    left: x,
                  };

                  const direction = Object.entries(distances).sort(
                    ([, a], [, b]) => a - b,
                  )[0][0];

                  card.dataset.direction = direction;
                }}
                className="group relative min-h-65 overflow-hidden border-b border-white/10 bg-[#080808] p-7 transition-colors duration-300 sm:odd:border-r lg:border-r lg:nth-[3n]:border-r-0 lg:nth-last-[-n+3]:border-b-0"
              >
                <div aria-hidden className="api-card-fill pointer-events-none absolute inset-0" style={{ backgroundColor: item.color }} />

                <div className="relative z-10">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-orange-500 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white">
                    <Icon size={19} />
                  </div>

                  <h3 className="mt-8 text-lg font-medium text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500 transition-colors duration-300 group-hover:text-white/80">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            Backend stack
          </span>

          <div className="flex flex-wrap gap-2">
            {[
              "Node.js",
              "Next.js",
              "MongoDB",
              "REST APIs",
              "JWT",
              "Cloudinary",
              "Razorpay",
              "Postmark",
            ].map((tech) => (
              <span
                key={tech}
                className="cursor-target border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-zinc-500 transition-colors hover:border-orange-500/40 hover:text-orange-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}