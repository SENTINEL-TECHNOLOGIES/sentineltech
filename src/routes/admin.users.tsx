import { createFileRoute } from "@tanstack/react-router";
import { AccessManagement } from "@/components/access-management";
import { RoleShell } from "@/components/role-shell";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Gestão de Acessos — Sentinel" }] }),
  component: () => (
    <RoleShell role="administrative">
      <AccessManagement />
    </RoleShell>
  ),
});
