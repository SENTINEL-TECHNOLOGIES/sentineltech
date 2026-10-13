import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "@/components/admin-dashboard";
import { RoleShell } from "@/components/role-shell";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard Administrativo — Sentinel" }] }),
  component: () => <RoleShell role="administrative"><AdminDashboard /></RoleShell>,
});