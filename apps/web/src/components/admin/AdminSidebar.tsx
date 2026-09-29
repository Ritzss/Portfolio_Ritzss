"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import BranchedMenu from "@/components/ui/BranchedMenu";
import AdminLogout from "./AdminLogout";

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const adminMenu = [
  {
    label: "Overview",
    children: [
      {
        value: "dashboard",
        label: "Dashboard",
      },
    ],
  },
  {
    label: "Communication",
    children: [
      {
        value: "messages",
        label: "Messages",
      },
    ],
  },
  {
    label: "System",
    children: [
      {
        value: "portfolio",
        label: "View Portfolio",
      },
    ],
  },
];

export default function AdminSidebar({
  mobileOpen,
  onClose,
}: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const activeValue =
    pathname === "/admin"
      ? "dashboard"
      : pathname.startsWith("/admin/messages")
        ? "messages"
        : "dashboard";

  const handleSelect = (value: string) => {
    switch (value) {
      case "dashboard":
        router.push("/admin");
        break;

      case "messages":
        router.push("/admin/messages");
        break;

      case "portfolio":
        window.open("/", "_blank", "noopener,noreferrer");
        break;
    }

    onClose();
  };

  return (
    <>
      {mobileOpen && (
        <button type="button" aria-label="Close navigation" onClick={onClose} className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden" />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-[#080808b0] transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6">
          <Link href="/admin" onClick={onClose}>
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-orange-500">
              Private System
            </p>

            <p className="mt-1 text-sm font-semibold tracking-tight text-white">
              Ritanshu<span className="text-orange-500">.</span>Admin
            </p>
          </Link>

          <button type="button" onClick={onClose} aria-label="Close menu" className="text-zinc-500 transition-colors hover:text-white lg:hidden">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex flex-1 items-center overflow-y-auto px-6">
          <BranchedMenu
            items={adminMenu}
            defaultOpen={[0, 1, 2]}
            defaultActive={activeValue}
            onSelect={handleSelect}
            color="#a1a1aa"
            accentColor="#f97316"
            lineColor="#3f3f46"
            width={220}
            rowHeight={38}
            indent={42}
            trunk={14}
            radius={10}
            lineWidth={1.5}
            fontSize={13}
            drawDuration={400}
            foldDuration={300}
          />
        </div>

        <div className="border-t border-white/10 p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
              System Online
            </span>
          </div>

          <AdminLogout />
        </div>
      </aside>
    </>
  );
}