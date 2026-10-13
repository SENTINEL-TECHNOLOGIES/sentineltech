import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RoleShell } from "@/components/role-shell";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/portal")({
  component: PortalLayout,
});

function PortalLayout() {
  const { session, ready } = useSession();
  if (!ready) return <div className="min-h-screen bg-background" aria-busy="true" />;
  return <RoleShell role={session?.role ?? "customer"}><Outlet /></RoleShell>;
}
