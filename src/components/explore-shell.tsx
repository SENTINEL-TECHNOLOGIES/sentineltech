import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { SentinelLogo } from "./sentinel-logo";

export interface NavItem { to: string; label: string; icon: ReactNode; }

const CRUMB_TRANSLATIONS: Record<string, string> = {
  explore: "Descoberta",
  home: "Início",
  services: "Plataforma",
  "case-studies": "Cases",
  industries: "Para quem é",
  about: "Sobre",
  contact: "Contato",
  meeting: "Reunião",
  proposal: "Proposta",
};

export function ExploreShell({ items }: { items: NavItem[] }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const crumbs = pathname.split("/").filter(Boolean);

  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (sidebarOpen) setSidebarOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-background">
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border px-5">
          <SentinelLogo size="sm" variant="stacked" onBackground="dark" />
          <button className="lg:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu"><X className="h-5 w-5" /></button>
        </div>

        <nav className="sidebar-scroll flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-1">
            {items.map((it) => {
              const active = pathname === it.to;
              return (
                <Link key={it.to} to={it.to} onClick={() => setSidebarOpen(false)} className={`group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${active ? "bg-primary/15 text-foreground shadow-inner shadow-primary/10 ring-1 ring-primary/30" : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground"}`}>
                  <span className={`flex w-5 shrink-0 items-center justify-center ${active ? "text-primary" : "text-muted-foreground group-hover:text-cyan"}`}>{it.icon}</span>
                  <span className="font-medium">{it.label}</span>
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
          <button className="lg:hidden text-muted-foreground" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu"><Menu className="h-5 w-5" /></button>
          <nav className="hidden items-center gap-1.5 text-sm text-muted-foreground md:flex">
            <Link to="/" className="hover:text-foreground">Início</Link>
            {crumbs.slice(1).map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className={i === crumbs.length - 2 ? "text-foreground font-medium" : ""}>{CRUMB_TRANSLATIONS[c] ?? c.replace("-", " ")}</span>
              </span>
            ))}
          </nav>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
