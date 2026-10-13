import { createFileRoute } from "@tanstack/react-router";
import { ClientDashboard } from "@/components/client-dashboard";
import { RoleShell } from "@/components/role-shell";

export const Route = createFileRoute("/cliente/dashboard")({
  head: () => ({ meta: [{ title: "Visão Geral do Cliente — Sentinel" }] }),
  component: () => <RoleShell role="customer"><ClientDashboard /></RoleShell>,
});