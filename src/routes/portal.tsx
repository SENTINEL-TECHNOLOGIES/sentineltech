import { createFileRoute } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/app-shell";
import { LayoutDashboard, Activity, Server, Briefcase, FileBarChart, Ticket, CreditCard, Settings } from "lucide-react";

const items: NavItem[] = [
  { to: "/portal/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: "/portal/monitoring", label: "Monitoring", icon: <Activity className="h-4 w-4" /> },
  { to: "/portal/infrastructure", label: "Infrastructure", icon: <Server className="h-4 w-4" /> },
  { to: "/portal/projects", label: "Projects", icon: <Briefcase className="h-4 w-4" /> },
  { to: "/portal/reports", label: "Reports", icon: <FileBarChart className="h-4 w-4" /> },
  { to: "/portal/tickets", label: "Support Tickets", icon: <Ticket className="h-4 w-4" /> },
  { to: "/portal/billing", label: "Billing", icon: <CreditCard className="h-4 w-4" /> },
  { to: "/portal/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
];

export const Route = createFileRoute("/portal")({
  component: () => <AppShell role="corporate" items={items} portalLabel="Client Portal" userLabel="Acme Corp" userSubtitle="Enterprise Client" />,
});
