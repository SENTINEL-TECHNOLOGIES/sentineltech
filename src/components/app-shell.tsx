import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Bell, Search, ChevronRight, LogOut, HelpCircle, Menu, X } from "lucide-react";
import { SentinelLogo } from "./sentinel-logo";
import { getSession, logout, type Role } from "@/lib/auth";

export interface NavItem { to: string; label: string; icon: ReactNode; }

const CRUMB_TRANSLATIONS: Record<string, string> = {
  portal: "Portal",
  explore: "Descoberta",
  dashboard: "Operações",
  monitoring: "Centro de Comando",
  "ai-cctv": "CFTV com IA",
  biometric: "Controle de Acesso",
  automation: "Automação",
  remote: "Monitoramento Remoto",
  infrastructure: "Instalações",
  projects: "Projetos",
  reports: "Relatórios",
  tickets: "Chamados",
  billing: "Financeiro",
  settings: "Configurações",
  home: "Início",
  services: "Serviços",
  "case-studies": "Cases",
  proposal: "Proposta",
  meeting: "Reunião",
  contact: "Contato",
};

export function AppShell({ role, items, portalLabel, userLabel, userSubtitle }: { role: Role; items: NavItem[]; portalLabel: string; userLabel: string; userSubtitle: string }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== role) navigate({ to: role === "corporate" ? "/login/corporate" : "/login/customer" });
  }, [role, navigate]);

  function handleLogout() { logout(); navigate({ to: "/" }); }

  const crumbs = pathname.split("/").filter(Boolean);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-sidebar-border bg-sidebar transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <SentinelLogo size="sm" subtitle={portalLabel} />
          <button className="lg:hidden text-muted-foreground" onClick={() => setOpen(false)} aria-label="Fechar menu"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {items.map((it) => {
            const active = pathname === it.to;
            return (
              <Link key={it.to} to={it.to} onClick={() => setOpen(false)} className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${active ? "bg-primary/15 text-foreground shadow-inner shadow-primary/10 ring-1 ring-primary/30" : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground"}`}>
                <span className={active ? "text-primary" : "text-muted-foreground group-hover:text-cyan"}>{it.icon}</span>
                <span className="font-medium">{it.label}</span>
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/40 p-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan text-xs font-bold text-primary-foreground">
              {userLabel.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{userLabel}</div>
              <div className="truncate text-[11px] text-muted-foreground">{userSubtitle}</div>
            </div>
            <button onClick={handleLogout} className="text-muted-foreground hover:text-destructive" title="Sair">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
          <button className="lg:hidden text-muted-foreground" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu className="h-5 w-5" /></button>
          <nav className="hidden items-center gap-1.5 text-sm text-muted-foreground md:flex">
            <Link to="/" className="hover:text-foreground">Início</Link>
            {crumbs.slice(1).map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className={i === crumbs.length - 2 ? "text-foreground font-medium" : ""}>{CRUMB_TRANSLATIONS[c] ?? c.replace("-", " ")}</span>
              </span>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Buscar chamados, projetos, alertas..." className="w-72 rounded-lg border border-border bg-input/50 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary" />
            </div>
            <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-card hover:bg-accent" title="Notificações">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">3</span>
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card hover:bg-accent" title="Ajuda"><HelpCircle className="h-4 w-4" /></button>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan text-xs font-bold text-primary-foreground">{userLabel.slice(0, 2).toUpperCase()}</div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
