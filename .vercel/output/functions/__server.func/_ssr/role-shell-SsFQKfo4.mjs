import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as SentinelLogo } from "./sentinel-logo-CWb_F0jH.mjs";
import { r as dashboardForRole, u as logout } from "./auth-XT4XOf5W.mjs";
import { t as useSession } from "./use-session-BevYDieA.mjs";
import { b as Link, g as Outlet, p as useRouterState, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as ChevronRight, B as FileClock, E as LogOut, J as ClipboardList, S as Menu, V as FileChartColumnIncreasing, Y as CircleQuestionMark, Z as CircleCheck, at as Building2, b as Package, c as UserRound, d as Ticket, g as Search, h as Settings, j as LayoutDashboard, lt as BadgeDollarSign, n as X, nt as Camera, o as Users, ot as BriefcaseBusiness, p as ShieldCheck, pt as Activity, s as User, st as Bell, v as Radio } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/role-shell-SsFQKfo4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var icon = (Icon) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" });
var ROLE_NAVIGATION = {
	customer: {
		label: "Área do Cliente",
		subtitle: "Cliente Sentinel",
		items: [
			{
				to: "/cliente/dashboard",
				label: "Visão Geral",
				icon: icon(LayoutDashboard)
			},
			{
				to: "/explore/services",
				label: "Serviços",
				icon: icon(Package)
			},
			{
				to: "/portal/billing",
				label: "Planos e Investimentos",
				icon: icon(BadgeDollarSign)
			},
			{
				to: "/explore/proposal",
				label: "Orçamentos e Propostas",
				icon: icon(BriefcaseBusiness)
			},
			{
				to: "/portal/tickets",
				label: "Solicitações",
				icon: icon(Ticket)
			},
			{
				to: "/portal/reports",
				label: "Relatórios",
				icon: icon(FileChartColumnIncreasing)
			},
			{
				to: "/portal/settings",
				label: "Perfil",
				icon: icon(UserRound)
			}
		],
		allowedPaths: [
			"/portal/billing",
			"/portal/tickets",
			"/portal/reports",
			"/portal/settings"
		]
	},
	corporate: {
		label: "Operação Corporativa",
		subtitle: "Ambiente da empresa",
		items: [
			{
				to: "/corporativo/dashboard",
				label: "Centro de Comando",
				icon: icon(LayoutDashboard)
			},
			{
				to: "/portal/monitoring",
				label: "Alertas e Ocorrências",
				icon: icon(Radio)
			},
			{
				to: "/portal/ai-cctv",
				label: "CFTV com IA",
				icon: icon(Camera)
			},
			{
				to: "/portal/remote",
				label: "Tempo Real",
				icon: icon(Activity)
			},
			{
				to: "/portal/infrastructure",
				label: "Dispositivos",
				icon: icon(Package)
			},
			{
				to: "/portal/reports",
				label: "Evidências e Relatórios",
				icon: icon(FileChartColumnIncreasing)
			},
			{
				to: "/portal/tickets",
				label: "Solicitações",
				icon: icon(Ticket)
			},
			{
				to: "/portal/projects",
				label: "Projetos",
				icon: icon(ClipboardList)
			},
			{
				to: "/portal/biometric",
				label: "Controle de Acesso",
				icon: icon(ShieldCheck)
			},
			{
				to: "/portal/automation",
				label: "Automação",
				icon: icon(Settings)
			},
			{
				to: "/corporativo/users",
				label: "Usuários",
				icon: icon(Users)
			},
			{
				to: "/portal/settings",
				label: "Perfil",
				icon: icon(UserRound)
			}
		],
		allowedPaths: [
			"/portal/monitoring",
			"/portal/ai-cctv",
			"/portal/remote",
			"/portal/infrastructure",
			"/portal/reports",
			"/portal/tickets",
			"/portal/projects",
			"/portal/biometric",
			"/portal/automation",
			"/portal/settings"
		]
	},
	administrative: {
		label: "Administração Sentinel",
		subtitle: "Administração da plataforma",
		items: [
			{
				to: "/admin/dashboard",
				label: "Dashboard Administrativo",
				icon: icon(LayoutDashboard)
			},
			{
				to: "/admin/companies",
				label: "Empresas",
				icon: icon(Building2)
			},
			{
				to: "/admin/users",
				label: "Usuários",
				icon: icon(Users)
			},
			{
				to: "/admin/devices",
				label: "Câmeras e Dispositivos",
				icon: icon(Camera)
			},
			{
				to: "/portal/ai-cctv",
				label: "CFTV com IA",
				icon: icon(Camera)
			},
			{
				to: "/portal/monitoring",
				label: "Centro de Comando",
				icon: icon(Radio)
			},
			{
				to: "/portal/reports",
				label: "Relatórios Globais",
				icon: icon(FileChartColumnIncreasing)
			},
			{
				to: "/admin/audit",
				label: "Logs e Auditoria",
				icon: icon(FileClock)
			},
			{
				to: "/admin/settings",
				label: "Configurações",
				icon: icon(Settings)
			},
			{
				to: "/admin/profile",
				label: "Perfil",
				icon: icon(UserRound)
			}
		],
		allowedPaths: [
			"/portal/ai-cctv",
			"/portal/monitoring",
			"/portal/reports"
		]
	}
};
function canAccessPath(role, pathname, items) {
	return items.some((item) => item.to === pathname) || ROLE_NAVIGATION[role].allowedPaths.includes(pathname);
}
var CRUMB_TRANSLATIONS = {
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
	contact: "Contato"
};
var INITIAL_NOTIFS = [
	{
		id: "n1",
		title: "Tentativa de acesso bloqueada · Portão 4 Galpão SP",
		time: "há 4 min",
		level: "destructive",
		read: false
	},
	{
		id: "n2",
		title: "Câmera Lobby 03 detectou objeto abandonado",
		time: "há 12 min",
		level: "warning",
		read: false
	},
	{
		id: "n3",
		title: "Manutenção concluída · Leitor BR-02",
		time: "há 1 h",
		level: "success",
		read: false
	},
	{
		id: "n4",
		title: "Novo visitante registrado · J. Almeida",
		time: "há 2 h",
		level: "info",
		read: true
	}
];
var CLIENT_NOTIFS = [{
	id: "c1",
	title: "Sua área do cliente está pronta",
	time: "agora",
	level: "info",
	read: false
}];
function AppShell({ role, items, portalLabel, userLabel, userSubtitle, children }) {
	const navigate = useNavigate();
	const { session, ready } = useSession();
	const displayName = session?.name?.trim() || userLabel;
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [notifOpen, setNotifOpen] = (0, import_react.useState)(false);
	const [accountOpen, setAccountOpen] = (0, import_react.useState)(false);
	const [notifs, setNotifs] = (0, import_react.useState)(role === "customer" ? CLIENT_NOTIFS : INITIAL_NOTIFS);
	const searchRef = (0, import_react.useRef)(null);
	const notifRef = (0, import_react.useRef)(null);
	const accountRef = (0, import_react.useRef)(null);
	const canAccess = canAccessPath(role, pathname, items);
	(0, import_react.useEffect)(() => {
		setNotifs(role === "customer" ? CLIENT_NOTIFS : INITIAL_NOTIFS);
	}, [role]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		if (!session) navigate({ to: "/login" });
		else if (session.role !== role) navigate({ to: dashboardForRole(session.role) });
		else if (!canAccess) navigate({ to: dashboardForRole(role) });
	}, [
		canAccess,
		navigate,
		ready,
		role,
		session
	]);
	(0, import_react.useEffect)(() => {
		function onDocClick(e) {
			const t = e.target;
			if (searchRef.current && !searchRef.current.contains(t)) setSearchOpen(false);
			if (notifRef.current && !notifRef.current.contains(t)) setNotifOpen(false);
			if (accountRef.current && !accountRef.current.contains(t)) setAccountOpen(false);
		}
		document.addEventListener("mousedown", onDocClick);
		return () => document.removeEventListener("mousedown", onDocClick);
	}, []);
	(0, import_react.useEffect)(() => {
		setSidebarOpen(false);
		setSearchOpen(false);
		setNotifOpen(false);
		setAccountOpen(false);
	}, [pathname]);
	async function handleLogout() {
		await logout();
		navigate({ to: "/" });
	}
	const crumbs = pathname.split("/").filter(Boolean);
	const unread = notifs.filter((n) => !n.read).length;
	const searchResults = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return items.slice(0, 6);
		return items.filter((i) => i.label.toLowerCase().includes(q) || i.to.toLowerCase().includes(q));
	}, [query, items]);
	function selectResult(to) {
		setQuery("");
		setSearchOpen(false);
		navigate({ to });
	}
	function markAllRead() {
		setNotifs((ns) => ns.map((n) => ({
			...n,
			read: true
		})));
	}
	function clearOne(id) {
		setNotifs((ns) => ns.filter((n) => n.id !== id));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [
			sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden",
				onClick: () => setSidebarOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex h-20 shrink-0 items-center justify-center border-b border-sidebar-border px-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SentinelLogo, {
							size: "lg",
							variant: "mark",
							onBackground: "dark"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "absolute right-4 lg:hidden text-muted-foreground",
							onClick: () => setSidebarOpen(false),
							"aria-label": "Fechar menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "sidebar-scroll flex-1 overflow-y-auto p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-1",
							children: items.map((it) => {
								const active = pathname === it.to;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: it.to,
									onClick: () => setSidebarOpen(false),
									className: `group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${active ? "bg-primary/15 text-foreground shadow-inner shadow-primary/10 ring-1 ring-primary/30" : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `flex w-5 shrink-0 items-center justify-center ${active ? "text-primary" : "text-muted-foreground group-hover:text-cyan"}`,
											children: it.icon
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: it.label
										}),
										active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" })
									]
								}, it.to);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "shrink-0 border-t border-sidebar-border p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-lg bg-sidebar-accent/40 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan text-xs font-bold text-primary-foreground",
									children: displayName.slice(0, 2).toUpperCase()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-semibold",
										children: displayName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-[11px] text-muted-foreground",
										children: userSubtitle
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleLogout,
									className: "text-muted-foreground hover:text-destructive",
									title: "Sair",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "lg:hidden text-muted-foreground",
							onClick: () => setSidebarOpen(true),
							"aria-label": "Abrir menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden items-center gap-1.5 text-sm text-muted-foreground md:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-foreground",
								children: "Início"
							}), crumbs.slice(1).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: i === crumbs.length - 2 ? "text-foreground font-medium" : "",
									children: CRUMB_TRANSLATIONS[c] ?? c.replace("-", " ")
								})]
							}, i))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									ref: searchRef,
									className: "relative hidden md:block",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: query,
											onChange: (e) => {
												setQuery(e.target.value);
												setSearchOpen(true);
											},
											onFocus: () => setSearchOpen(true),
											onKeyDown: (e) => {
												if (e.key === "Enter" && searchResults[0]) selectResult(searchResults[0].to);
												if (e.key === "Escape") setSearchOpen(false);
											},
											placeholder: "Buscar módulos, chamados, alertas...",
											className: "w-72 rounded-lg border border-border bg-input/50 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
										}),
										searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-lg border border-border bg-card shadow-2xl",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "border-b border-border px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
												children: query ? `Resultados (${searchResults.length})` : "Navegação rápida"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "max-h-80 overflow-y-auto",
												children: [searchResults.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "p-4 text-sm text-muted-foreground",
													children: "Nenhum resultado encontrado."
												}), searchResults.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => selectResult(r.to),
													className: "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-accent",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-primary",
															children: r.icon
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "flex-1",
															children: r.label
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] text-muted-foreground",
															children: r.to
														})
													]
												}, r.to))]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									ref: notifRef,
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											setNotifOpen((v) => !v);
											setAccountOpen(false);
										},
										className: "relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-card hover:bg-accent",
										title: "Notificações",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground",
											children: unread
										})]
									}), notifOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute right-0 top-full mt-2 w-96 overflow-hidden rounded-lg border border-border bg-card shadow-2xl",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-b border-border px-4 py-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-sm font-semibold",
													children: "Notificações"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[11px] text-muted-foreground",
													children: [unread, " não lidas"]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: markAllRead,
													className: "text-[11px] font-semibold text-primary hover:underline",
													children: "Marcar todas como lidas"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "max-h-96 overflow-y-auto divide-y divide-border",
												children: [notifs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "p-6 text-center text-sm text-muted-foreground",
													children: "Sem notificações."
												}), notifs.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: `flex items-start gap-3 p-4 ${n.read ? "opacity-60" : ""}`,
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `mt-1 h-2 w-2 shrink-0 rounded-full ${n.level === "destructive" ? "bg-destructive" : n.level === "warning" ? "bg-warning" : n.level === "success" ? "bg-success" : "bg-primary"}` }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "min-w-0 flex-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-sm",
																children: n.title
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "mt-0.5 text-[11px] text-muted-foreground",
																children: n.time
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => clearOne(n.id),
															className: "text-muted-foreground hover:text-foreground",
															title: "Descartar",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
														})
													]
												}, n.id))]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "border-t border-border bg-secondary/30 px-4 py-2 text-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: role === "customer" ? "/portal/tickets" : "/portal/monitoring",
													className: "text-xs font-semibold text-primary hover:underline",
													children: role === "customer" ? "Ver solicitações →" : "Abrir Centro de Comando →"
												})
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => navigate({ to: "/explore/contact" }),
									className: "hidden sm:grid h-9 w-9 place-items-center rounded-lg border border-border bg-card hover:bg-accent",
									title: "Ajuda",
									"aria-label": "Abrir ajuda e contato",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									ref: accountRef,
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setAccountOpen((v) => !v);
											setNotifOpen(false);
										},
										className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan text-xs font-bold text-primary-foreground ring-2 ring-transparent transition hover:ring-primary/40",
										title: "Minha conta",
										children: displayName.slice(0, 2).toUpperCase()
									}), accountOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-lg border border-border bg-card shadow-2xl",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 border-b border-border p-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan text-sm font-bold text-primary-foreground",
													children: displayName.slice(0, 2).toUpperCase()
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "truncate text-sm font-semibold",
															children: displayName
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "truncate text-[11px] text-muted-foreground",
															children: userSubtitle
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-success",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Sessão verificada"]
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "p-1",
												children: (role === "customer" ? [{
													to: "/portal/settings",
													icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }),
													label: "Meu perfil"
												}, {
													to: "/portal/billing",
													icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }),
													label: "Planos e investimentos"
												}] : role === "administrative" ? [{
													to: "/admin/profile",
													icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }),
													label: "Meu perfil"
												}, {
													to: "/admin/settings",
													icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" }),
													label: "Configurações"
												}] : [{
													to: "/portal/settings",
													icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }),
													label: "Meu perfil"
												}, {
													to: "/portal/reports",
													icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }),
													label: "Relatórios"
												}]).map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: opt.to,
													className: "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: opt.icon
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt.label })]
												}, opt.label))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "border-t border-border p-1",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: handleLogout,
													className: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sair da conta"]
												})
											})
										]
									})]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 p-4 md:p-8",
					children: !ready || !session || session.role !== role || !canAccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-h-40",
						"aria-live": "polite"
					}) : children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			})
		]
	});
}
function RoleShell({ role, children }) {
	const profile = ROLE_NAVIGATION[role];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		role,
		items: profile.items,
		portalLabel: profile.label,
		userLabel: role === "administrative" ? "Admin Sentinel" : role === "corporate" ? "Empresa" : "Cliente",
		userSubtitle: profile.subtitle,
		children
	});
}
//#endregion
export { RoleShell as t };
