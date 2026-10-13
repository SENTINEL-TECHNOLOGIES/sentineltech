import type { ReactNode } from "react";
import type { Role } from "@/lib/auth";
import { AppShell } from "./app-shell";
import { ROLE_NAVIGATION } from "./role-navigation";

export function RoleShell({ role, children }: { role: Role; children?: ReactNode }) {
  const profile = ROLE_NAVIGATION[role];
  return (
    <AppShell
      role={role}
      items={profile.items}
      portalLabel={profile.label}
      userLabel={role === "administrative" ? "Admin Sentinel" : role === "corporate" ? "Empresa" : "Cliente"}
      userSubtitle={profile.subtitle}
    >
      {children}
    </AppShell>
  );
}