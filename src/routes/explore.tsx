import { createFileRoute } from "@tanstack/react-router";
import { ExploreShell, type NavItem } from "@/components/explore-shell";
import { Home, Layers, Building2, Info, Phone, BriefcaseBusiness, FileText } from "lucide-react";

const items: NavItem[] = [
  { to: "/explore/home", label: "Início", icon: <Home className="h-4 w-4" /> },
  { to: "/explore/services", label: "Plataforma", icon: <Layers className="h-4 w-4" /> },
  { to: "/explore/industries", label: "Para quem é", icon: <Building2 className="h-4 w-4" /> },
  { to: "/explore/about", label: "Sobre", icon: <Info className="h-4 w-4" /> },
  { to: "/explore/case-studies", label: "Cases", icon: <BriefcaseBusiness className="h-4 w-4" /> },
  { to: "/explore/proposal", label: "Proposta", icon: <FileText className="h-4 w-4" /> },
  { to: "/explore/contact", label: "Contato", icon: <Phone className="h-4 w-4" /> },
];

export const Route = createFileRoute("/explore")({
  component: () => <ExploreShell items={items} />,
});
