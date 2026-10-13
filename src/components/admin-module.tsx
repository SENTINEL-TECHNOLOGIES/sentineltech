import { RoleShell } from "@/components/role-shell";
import { AdminWorkspace } from "@/components/admin-workspace";

export function AdminModule({ title, description }: { title: string; description: string }) {
  return <RoleShell role="administrative"><AdminWorkspace title={title} description={description} /></RoleShell>;
}