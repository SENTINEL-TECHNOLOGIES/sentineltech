import { createFileRoute } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/app-shell";
import { LayoutDashboard, Radio, Camera, Fingerprint, Building2, Globe, Building, Briefcase, FileBarChart, Ticket, CreditCard, Settings } from "lucide-react";

const items: NavItem[] = [
  { to: "/portal/dashboard", label: "Operations", icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: "/portal/monitoring", label: "Command Center", icon: <Radio className="h-4 w-4" /> },
  { to: "/portal/ai-cctv", label: "AI CCTV", icon: <Camera className="h-4 w-4" /> },
  { to: "/portal/biometric", label: "Access Control", icon: <Fingerprint className="h-4 w-4" /> },
  { to: "/portal/automation", label: "Smart Automation", icon: <Building2 className="h-4 w-4" /> },
  { to: "/portal/remote", label: "Remote Monitoring", icon: <Globe className="h-4 w-4" /> },
  { to: "/portal/infrastructure", label: "Facilities", icon: <Building className="h-4 w-4" /> },
  { to: "/portal/projects", label: "Projects", icon: <Briefcase className="h-4 w-4" /> },
  { to: "/portal/reports", label: "Reports", icon: <FileBarChart className="h-4 w-4" /> },
  { to: "/portal/tickets", label: "Support Tickets", icon: <Ticket className="h-4 w-4" /> },
  { to: "/portal/billing", label: "Billing", icon: <CreditCard className="h-4 w-4" /> },
  { to: "/portal/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
];

export const Route = createFileRoute("/portal")({
  component: () => <AppShell role="corporate" items={items} portalLabel="Security Operations" userLabel="Acme Corp" userSubtitle="Enterprise Client" />,
});
