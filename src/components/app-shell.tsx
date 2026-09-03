import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Bell, Search, ChevronRight, LogOut, HelpCircle, Menu, X, User, Settings as SettingsIcon, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SentinelLogo } from "./sentinel-logo";
import { getSession, logout, type Role } from "@/lib/auth";
import { useSession } from "@/hooks/use-session";

export interface NavItem { to: string; label: string; icon: ReactNode; }

const CRUMB_TRANSLATIONS: Record<string, string> = {
  portal: "Portal", explore: "Descoberta", dashboard: "Operações", monitoring: "Centro de Comando",
  "ai-cctv": "CFTV com IA", biometric: "Controle de Acesso", automation: "Automação",
  remote: "Monitoramento Remoto", infrastructure: "Instalações", projects: "Projetos",
  reports: "Relatórios", tickets: "Chamados", billing: "Financeiro", settings: "Configurações",
  home: "Início", services: "Serviços", "case-studies": "Cases", proposal: "Proposta",
  meeting: "Reunião", contact: "Contato",
};

interface NotificationItem { id: string; title: string; time: string; level: "info" | "warning" | "destructive" | "success"; read: boolean; }

const INITIAL_NOTIFS: NotificationItem[] = [
  { id: "n1", title: "Tentativa de acesso bloqueada · Portão 4 Galpão SP", time: "há 4 min", level: "destructive", read: false },
  { id: "n2", title: "Câmera Lobby 03 detectou objeto abandonado", time: "há 12 min", level: "warning", read: false },
  { id: "n3", title: "Manutenção concluída · Leitor BR-02", time: "há 1 h", level: "success", read: false },
  { id: "n4", title: "Novo visitante registrado · J. Almeida", time: "há 2 h", level: "info", read: true },
];

export function AppShell({ role, items, portalLabel, userLabel, userSubtitle }: { role: Role; items: NavItem[]; portalLabel: string; userLabel: string; userSubtitle: string }) {
  const navigate = useNavigate();
  const { session } = useSession();
  const displayName = session?.name?.trim() || userLabel;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [notifs, setNotifs] = useState<NotificationItem[]>(INITIAL_NOTIFS);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== role) navigate({ to: role === "corporate" ? "/login/corporate" : "/login/customer" });
  }, [role, navigate]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (searchRef.current && !searchRef.current.contains(t)) setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(t)) setNotifOpen(false);
      if (accountRef.current && !accountRef.current.contains(t)) setAccountOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => { setSidebarOpen(false); setSearchOpen(false); setNotifOpen(false); setAccountOpen(false); }, [pathname]);

  function handleLogout() { logout(); navigate({ to: "/" }); }

  const crumbs = pathname.split("/").filter(Boolean);
  const unread = notifs.filter((n) => !n.read).length;

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 6);
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.to.toLowerCase().includes(q));
  }, [query, items]);

  function selectResult(to: string) {
    setQuery(""); setSearchOpen(false);
    navigate({ to });
  }

  function markAllRead() { setNotifs((ns) => ns.map((n) => ({ ...n, read: true }))); }
  function clearOne(id: string) { setNotifs((ns) => ns.filter((n) => n.id !== id)); }

  return (
    <div className="flex min-h-screen bg-background">
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border px-5">
          <SentinelLogo size="sm" variant="mark" onBackground="dark" subtitle={portalLabel === "Sentinel" ? undefined : portalLabel} />
          <button className="lg:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu"><X className="h-5 w-5" /></button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 [scrollbar-width:thin]">
          <div className="flex flex-col gap-1">
            {items.map((it) => {
              const active = pathname === it.to;
              return (
                <Link key={it.to} to={it.to} onClick={() => setSidebarOpen(false)} className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${active ? "bg-primary/15 text-foreground shadow-inner shadow-primary/10 ring-1 ring-primary/30" : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground"}`}>
                  <span className={active ? "text-primary" : "text-muted-foreground group-hover:text-cyan"}>{it.icon}</span>
                  <span className="font-medium">{it.label}</span>
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="shrink-0 border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/40 p-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan text-xs font-bold text-primary-foreground">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{displayName}</div>
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
          <div className="ml-auto flex items-center gap-2">
            {/* Search */}
            <div ref={searchRef} className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchResults[0]) selectResult(searchResults[0].to);
                  if (e.key === "Escape") setSearchOpen(false);
                }}
                placeholder="Buscar módulos, chamados, alertas..."
                className="w-72 rounded-lg border border-border bg-input/50 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
                  <div className="border-b border-border px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {query ? `Resultados (${searchResults.length})` : "Navegação rápida"}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {searchResults.length === 0 && <div className="p-4 text-sm text-muted-foreground">Nenhum resultado encontrado.</div>}
                    {searchResults.map((r) => (
                      <button key={r.to} onClick={() => selectResult(r.to)} className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-accent">
                        <span className="text-primary">{r.icon}</span>
                        <span className="flex-1">{r.label}</span>
                        <span className="text-[10px] text-muted-foreground">{r.to}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div ref={notifRef} className="relative">
              <button onClick={() => { setNotifOpen((v) => !v); setAccountOpen(false); }} className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-card hover:bg-accent" title="Notificações">
                <Bell className="h-4 w-4" />
                {unread > 0 && <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">{unread}</span>}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-96 overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <div>
                      <div className="text-sm font-semibold">Notificações</div>
                      <div className="text-[11px] text-muted-foreground">{unread} não lidas</div>
                    </div>
                    <button onClick={markAllRead} className="text-[11px] font-semibold text-primary hover:underline">Marcar todas como lidas</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto divide-y divide-border">
                    {notifs.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">Sem notificações.</div>}
                    {notifs.map((n) => (
                      <div key={n.id} className={`flex items-start gap-3 p-4 ${n.read ? "opacity-60" : ""}`}>
                        <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.level === "destructive" ? "bg-destructive" : n.level === "warning" ? "bg-warning" : n.level === "success" ? "bg-success" : "bg-primary"}`} />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm">{n.title}</div>
                          <div className="mt-0.5 text-[11px] text-muted-foreground">{n.time}</div>
                        </div>
                        <button onClick={() => clearOne(n.id)} className="text-muted-foreground hover:text-foreground" title="Descartar"><X className="h-3.5 w-3.5" /></button>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border bg-secondary/30 px-4 py-2 text-center">
                    <Link to="/portal/monitoring" className="text-xs font-semibold text-primary hover:underline">Abrir Centro de Comando →</Link>
                  </div>
                </div>
              )}
            </div>

            <button className="hidden sm:grid h-9 w-9 place-items-center rounded-lg border border-border bg-card hover:bg-accent" title="Ajuda"><HelpCircle className="h-4 w-4" /></button>

            {/* Account */}
            <div ref={accountRef} className="relative">
              <button onClick={() => { setAccountOpen((v) => !v); setNotifOpen(false); }} className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan text-xs font-bold text-primary-foreground ring-2 ring-transparent transition hover:ring-primary/40" title="Minha conta">
                {displayName.slice(0, 2).toUpperCase()}
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
                  <div className="flex items-center gap-3 border-b border-border p-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan text-sm font-bold text-primary-foreground">{displayName.slice(0, 2).toUpperCase()}</div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{displayName}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{userSubtitle}</div>
                      <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-success"><CheckCircle2 className="h-3 w-3" /> Sessão verificada</div>
                    </div>
                  </div>
                  <div className="p-1">
                    {[
                      { to: "/portal/settings", icon: <User className="h-4 w-4" />, label: "Meu perfil" },
                      { to: "/portal/settings", icon: <SettingsIcon className="h-4 w-4" />, label: "Configurações" },
                      { to: "/portal/billing", icon: <ShieldCheck className="h-4 w-4" />, label: "Plano e Financeiro" },
                    ].map((opt) => (
                      <Link key={opt.label} to={opt.to} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent">
                        <span className="text-muted-foreground">{opt.icon}</span>
                        <span>{opt.label}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-border p-1">
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
                      <LogOut className="h-4 w-4" /> Sair da conta
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
