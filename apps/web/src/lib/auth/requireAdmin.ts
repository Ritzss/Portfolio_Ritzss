import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export async function requireAdmin() {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}