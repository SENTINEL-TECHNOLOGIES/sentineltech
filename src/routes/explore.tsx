import { createFileRoute } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/app-shell";
import { Home, Layers, Building2, Info, Phone } from "lucide-react";

const items: NavItem[] = [
  { to: "/explore/home", label: "Início", icon: <Home className="h-4 w-4" /> },
  { to: "/explore/services", label: "Soluções", icon: <Layers className="h-4 w-4" /> },
  { to: "/explore/industries", label: "Indústrias", icon: <Building2 className="h-4 w-4" /> },
  { to: "/explore/about", label: "Sobre", icon: <Info className="h-4 w-4" /> },
  { to: "/explore/contact", label: "Contato", icon: <Phone className="h-4 w-4" /> },
];

export const Route = createFileRoute("/explore")({
  component: () => <AppShell role="customer" items={items} portalLabel="Sentinel" userLabel="Visitante" userSubtitle="Sessão de descoberta" />,
});
