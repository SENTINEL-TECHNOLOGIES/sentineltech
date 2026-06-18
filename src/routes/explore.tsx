import { createFileRoute } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/app-shell";
import { Home, Sparkles, Trophy, FileText, Calendar, Phone } from "lucide-react";

const items: NavItem[] = [
  { to: "/explore/home", label: "Início", icon: <Home className="h-4 w-4" /> },
  { to: "/explore/services", label: "Serviços", icon: <Sparkles className="h-4 w-4" /> },
  { to: "/explore/case-studies", label: "Cases de Sucesso", icon: <Trophy className="h-4 w-4" /> },
  { to: "/explore/proposal", label: "Solicitar Proposta", icon: <FileText className="h-4 w-4" /> },
  { to: "/explore/meeting", label: "Agendar Reunião", icon: <Calendar className="h-4 w-4" /> },
  { to: "/explore/contact", label: "Contato", icon: <Phone className="h-4 w-4" /> },
];

export const Route = createFileRoute("/explore")({
  component: () => <AppShell role="customer" items={items} portalLabel="Descoberta" userLabel="Visitante" userSubtitle="Sessão de descoberta" />,
});
