"use client";

import { useState, type ReactNode } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

interface AdminShellProps {
  children: ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <AdminSidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="min-h-screen lg:pl-72">
        <AdminHeader onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="min-h-[calc(100vh-5rem)] p-5 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}