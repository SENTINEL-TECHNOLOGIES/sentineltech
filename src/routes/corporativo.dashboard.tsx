import { createFileRoute } from "@tanstack/react-router";
import { CorporateDashboard } from "@/components/corporate-dashboard";
import { RoleShell } from "@/components/role-shell";

export const Route = createFileRoute("/corporativo/dashboard")({
  head: () => ({ meta: [{ title: "Centro de Comando Corporativo — Sentinel" }] }),
  component: () => <RoleShell role="corporate"><CorporateDashboard /></RoleShell>,
});