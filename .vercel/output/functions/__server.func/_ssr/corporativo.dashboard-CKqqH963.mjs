import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as KpiCard, n as Card, r as CardHeader, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { t as useSession } from "./use-session-BevYDieA.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Z as CircleCheck, dt as ArrowRight, l as TriangleAlert, nt as Camera, p as ShieldCheck, pt as Activity, v as Radio } from "../_libs/lucide-react.mjs";
import { t as RoleShell } from "./role-shell-SsFQKfo4.mjs";
import { n as useDevices } from "./devices-CEchUaQv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/corporativo.dashboard-CKqqH963.js
var import_jsx_runtime = require_jsx_runtime();
function CorporateDashboard() {
	const { firstName } = useSession();
	const { devices } = useDevices();
	const cameras = devices.filter((device) => device.type === "camera");
	const online = devices.filter((device) => device.status === "online").length;
	const attention = devices.filter((device) => device.status !== "online");
	const sites = [...new Set(devices.map((device) => device.location.trim()).filter(Boolean))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: firstName ? `Olá, ${firstName}` : "Centro de Comando"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "success",
						children: "Ambiente corporativo"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Operação e equipamentos associados à sessão da sua empresa."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/portal/monitoring",
					className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-accent",
					children: ["Abrir monitoramento ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Dispositivos cadastrados",
						value: String(devices.length),
						delta: "neste ambiente",
						deltaPositive: true,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5" }),
						accent: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Dispositivos online",
						value: String(online),
						delta: devices.length ? `${Math.round(online / devices.length * 100)}% disponíveis` : "sem dispositivos",
						deltaPositive: true,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" }),
						accent: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Câmeras",
						value: String(cameras.length),
						delta: "no inventário da empresa",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-5 w-5" }),
						accent: "cyan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Equipamentos em atenção",
						value: String(attention.length),
						delta: attention.length ? "verifique o status" : "sem alertas de equipamento",
						deltaPositive: !attention.length,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" }),
						accent: attention.length ? "warning" : "success"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.25fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Status dos equipamentos",
					description: "Inventário vinculado à conta autenticada",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/portal/infrastructure",
						className: "text-xs font-semibold text-primary hover:underline",
						children: "Abrir dispositivos"
					})
				}), devices.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: devices.slice(0, 6).map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary",
								children: device.type === "camera" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-medium",
									children: device.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs text-muted-foreground",
									children: device.location
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: device.status === "online" ? "success" : device.status === "maintenance" ? "warning" : "destructive",
								children: device.status === "online" ? "Online" : device.status === "maintenance" ? "Manutenção" : "Offline"
							})
						]
					}, device.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center px-5 py-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-9 w-9 text-cyan" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-semibold",
							children: "Nenhum dispositivo neste ambiente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-md text-sm text-muted-foreground",
							children: "Os dados operacionais aparecem aqui quando equipamentos forem associados a esta conta."
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Resumo do ambiente",
					description: "Visibilidade corporativa, sem administração global"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-success/10 text-success",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: "Monitoramento da empresa"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Alertas e ocorrências do ambiente autorizado."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: "Locais cadastrados"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: sites.length ? sites.join(", ") : "Nenhum local cadastrado nos dispositivos desta conta."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/portal/reports",
							className: "flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-primary hover:underline",
							children: ["Consultar relatórios e evidências ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				})] })]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleShell, {
	role: "corporate",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorporateDashboard, {})
});
//#endregion
export { SplitComponent as component };
