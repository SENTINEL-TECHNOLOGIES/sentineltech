import { createFileRoute } from "@tanstack/react-router";
import { AccountSettings } from "@/components/account-settings";
import { RoleShell } from "@/components/role-shell";

export const Route = createFileRoute("/admin/profile")({
  head: () => ({ meta: [{ title: "Perfil Administrativo — Sentinel" }] }),
  component: () => <RoleShell role="administrative"><AccountSettings /></RoleShell>,
});