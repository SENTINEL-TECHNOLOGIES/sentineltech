import { createFileRoute } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/app-shell";
import { Home, Sparkles, Trophy, FileText, Calendar, Phone } from "lucide-react";

const items: NavItem[] = [
  { to: "/explore/home", label: "Home", icon: <Home className="h-4 w-4" /> },
  { to: "/explore/services", label: "Services", icon: <Sparkles className="h-4 w-4" /> },
  { to: "/explore/case-studies", label: "Case Studies", icon: <Trophy className="h-4 w-4" /> },
  { to: "/explore/proposal", label: "Request Proposal", icon: <FileText className="h-4 w-4" /> },
  { to: "/explore/meeting", label: "Schedule Meeting", icon: <Calendar className="h-4 w-4" /> },
  { to: "/explore/contact", label: "Contact", icon: <Phone className="h-4 w-4" /> },
];

export const Route = createFileRoute("/explore")({
  component: () => <AppShell role="customer" items={items} portalLabel="Discovery" userLabel="Visitor" userSubtitle="Discovery session" />,
});
