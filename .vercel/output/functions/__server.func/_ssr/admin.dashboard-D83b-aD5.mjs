import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as KpiCard, n as Card, r as CardHeader, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as FileClock, at as Building2, dt as ArrowRight, l as TriangleAlert, nt as Camera, o as Users, pt as Activity, v as Radio } from "../_libs/lucide-react.mjs";
import { t as RoleShell } from "./role-shell-SsFQKfo4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.dashboard-D83b-aD5.js
var import_jsx_runtime = require_jsx_runtime();
var platformSites = [
	{
		name: "Torre Matriz — São Paulo",
		cameras: "128/128",
		status: "Operacional"
	},
	{
		name: "DC-2 Frankfurt",
		cameras: "92/92",
		status: "Operacional"
	},
	{
		name: "Hub Logístico — Singapura",
		cameras: "54/56",
		status: "Atenção"
	},
	{
		name: "Planta Industrial — Monterrey",
		cameras: "76/76",
		status: "Operacional"
	},
	{
		name: "Rede de Varejo",
		cameras: "498/504",
		status: "Atenção"
	}
];
function AdminDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: "Dashboard Administrativo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "info",
						children: "Visão global"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Saúde da plataforma e panorama consolidado dos ambientes monitorados."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					children: "Indicadores demonstrativos"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Locais monitorados",
						value: "46",
						delta: "em 12 regiões",
						deltaPositive: true,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5" }),
						accent: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Câmeras disponíveis",
						value: "848 / 856",
						delta: "99,1% online",
						deltaPositive: true,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-5 w-5" }),
						accent: "cyan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Dispositivos online",
						value: "2.184",
						delta: "indicador da plataforma",
						deltaPositive: true,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5" }),
						accent: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Incidentes em 24h",
						value: "7",
						delta: "2 em aberto",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" }),
						accent: "warning"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Saúde dos ambientes",
					description: "Resumo global dos locais demonstrativos",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "success",
						children: "Uptime 99,98%"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: platformSites.map((site) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-sm font-medium",
								children: site.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: ["Câmeras ", site.cameras]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: site.status === "Operacional" ? "success" : "warning",
							children: site.status
						})]
					}, site.name))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Administração da plataforma",
					description: "Acesso global restrito à equipe Sentinel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: [
						{
							to: "/admin/companies",
							title: "Empresas",
							detail: "Cadastro e contratos",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" })
						},
						{
							to: "/admin/users",
							title: "Usuários",
							detail: "Contas e permissões",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" })
						},
						{
							to: "/admin/audit",
							title: "Logs e auditoria",
							detail: "Acessos e alterações",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileClock, { className: "h-4 w-4" })
						},
						{
							to: "/portal/monitoring",
							title: "Centro de Comando",
							detail: "Visão operacional global",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-4 w-4" })
						}
					].map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: entry.to,
						className: "flex items-center gap-3 p-4 hover:bg-accent/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: entry.icon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-medium",
									children: entry.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs text-muted-foreground",
									children: entry.detail
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground" })
						]
					}, entry.to))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Os indicadores globais desta demonstração são mocks existentes no projeto; não representam dados conectados a empresas reais."
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleShell, {
	role: "administrative",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {})
});
//#endregion
export { SplitComponent as component };
