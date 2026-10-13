import type { ReactNode } from "react";
import {
  Activity,
  BadgeDollarSign,
  Bell,
  BriefcaseBusiness,
  Building2,
  Camera,
  ClipboardList,
  FileBarChart,
  FileClock,
  LayoutDashboard,
  Package,
  Radio,
  Settings,
  ShieldCheck,
  Ticket,
  UserRound,
  Users,
} from "lucide-react";
import type { Role } from "@/lib/auth";
import type { NavItem } from "./app-shell";

type NavigationProfile = {
  label: string;
  subtitle: string;
  items: NavItem[];
  allowedPaths: string[];
};

const icon = (Icon: typeof LayoutDashboard) => <Icon className="h-4 w-4" />;

export const ROLE_NAVIGATION: Record<Role, NavigationProfile> = {
  customer: {
    label: "Área do Cliente",
    subtitle: "Cliente Sentinel",
    items: [
      { to: "/cliente/dashboard", label: "Visão Geral", icon: icon(LayoutDashboard) },
      { to: "/explore/services", label: "Serviços", icon: icon(Package) },
      { to: "/portal/billing", label: "Planos e Investimentos", icon: icon(BadgeDollarSign) },
      { to: "/explore/proposal", label: "Orçamentos e Propostas", icon: icon(BriefcaseBusiness) },
      { to: "/portal/tickets", label: "Solicitações", icon: icon(Ticket) },
      { to: "/portal/reports", label: "Relatórios", icon: icon(FileBarChart) },
      { to: "/portal/settings", label: "Perfil", icon: icon(UserRound) },
    ],
    allowedPaths: ["/portal/billing", "/portal/tickets", "/portal/reports", "/portal/settings"],
  },
  corporate: {
    label: "Operação Corporativa",
    subtitle: "Ambiente da empresa",
    items: [
      { to: "/corporativo/dashboard", label: "Centro de Comando", icon: icon(LayoutDashboard) },
      { to: "/portal/monitoring", label: "Alertas e Ocorrências", icon: icon(Radio) },
      { to: "/portal/ai-cctv", label: "CFTV com IA", icon: icon(Camera) },
      { to: "/portal/remote", label: "Tempo Real", icon: icon(Activity) },
      { to: "/portal/infrastructure", label: "Dispositivos", icon: icon(Package) },
      { to: "/portal/reports", label: "Evidências e Relatórios", icon: icon(FileBarChart) },
      { to: "/portal/tickets", label: "Solicitações", icon: icon(Ticket) },
      { to: "/portal/projects", label: "Projetos", icon: icon(ClipboardList) },
      { to: "/portal/biometric", label: "Controle de Acesso", icon: icon(ShieldCheck) },
      { to: "/portal/automation", label: "Automação", icon: icon(Settings) },
      { to: "/corporativo/users", label: "Usuários", icon: icon(Users) },
      { to: "/portal/settings", label: "Perfil", icon: icon(UserRound) },
    ],
    allowedPaths: [
      "/portal/monitoring", "/portal/ai-cctv", "/portal/remote", "/portal/infrastructure",
      "/portal/reports", "/portal/tickets", "/portal/projects", "/portal/biometric",
      "/portal/automation", "/portal/settings",
    ],
  },
  administrative: {
    label: "Administração Sentinel",
    subtitle: "Administração da plataforma",
    items: [
      { to: "/admin/dashboard", label: "Dashboard Administrativo", icon: icon(LayoutDashboard) },
      { to: "/admin/companies", label: "Empresas", icon: icon(Building2) },
      { to: "/admin/users", label: "Usuários", icon: icon(Users) },
      { to: "/admin/devices", label: "Câmeras e Dispositivos", icon: icon(Camera) },
      { to: "/portal/ai-cctv", label: "CFTV com IA", icon: icon(Camera) },
      { to: "/portal/monitoring", label: "Centro de Comando", icon: icon(Radio) },
      { to: "/portal/reports", label: "Relatórios Globais", icon: icon(FileBarChart) },
      { to: "/admin/audit", label: "Logs e Auditoria", icon: icon(FileClock) },
      { to: "/admin/settings", label: "Configurações", icon: icon(Settings) },
      { to: "/admin/profile", label: "Perfil", icon: icon(UserRound) },
    ],
    allowedPaths: ["/portal/ai-cctv", "/portal/monitoring", "/portal/reports"],
  },
};

export function canAccessPath(role: Role, pathname: string, items: NavItem[]): boolean {
  return items.some((item) => item.to === pathname) || ROLE_NAVIGATION[role].allowedPaths.includes(pathname);
}

export type NavigationItem = NavItem & { icon: ReactNode };