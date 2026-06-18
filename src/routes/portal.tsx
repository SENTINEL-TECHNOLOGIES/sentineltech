import { createFileRoute } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/app-shell";
import { LayoutDashboard, Radio, Camera, Fingerprint, Building2, Globe, Building, Briefcase, FileBarChart, Ticket, CreditCard, Settings } from "lucide-react";

const items: NavItem[] = [
  { to: "/portal/dashboard", label: "Operações", icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: "/portal/monitoring", label: "Centro de Comando", icon: <Radio className="h-4 w-4" /> },
  { to: "/portal/ai-cctv", label: "CFTV com IA", icon: <Camera className="h-4 w-4" /> },
  { to: "/portal/biometric", label: "Controle de Acesso", icon: <Fingerprint className="h-4 w-4" /> },
  { to: "/portal/automation", label: "Automação Predial", icon: <Building2 className="h-4 w-4" /> },
  { to: "/portal/remote", label: "Monitoramento Remoto", icon: <Globe className="h-4 w-4" /> },
  { to: "/portal/infrastructure", label: "Instalações", icon: <Building className="h-4 w-4" /> },
  { to: "/portal/projects", label: "Projetos", icon: <Briefcase className="h-4 w-4" /> },
  { to: "/portal/reports", label: "Relatórios", icon: <FileBarChart className="h-4 w-4" /> },
  { to: "/portal/tickets", label: "Chamados", icon: <Ticket className="h-4 w-4" /> },
  { to: "/portal/billing", label: "Financeiro", icon: <CreditCard className="h-4 w-4" /> },
  { to: "/portal/settings", label: "Configurações", icon: <Settings className="h-4 w-4" /> },
];

export const Route = createFileRoute("/portal")({
  component: () => <AppShell role="corporate" items={items} portalLabel="Operações de Segurança" userLabel="Acme Corp" userSubtitle="Cliente Corporativo" />,
});
