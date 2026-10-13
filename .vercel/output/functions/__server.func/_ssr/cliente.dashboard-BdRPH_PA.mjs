import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as KpiCard, n as Card, r as CardHeader, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { t as useSession } from "./use-session-BevYDieA.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as CreditCard, I as Headset, Z as CircleCheck, b as Package, dt as ArrowRight, ot as BriefcaseBusiness, p as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as RoleShell } from "./role-shell-SsFQKfo4.mjs";
import { i as getActiveServices, t as SERVICE_CATALOG } from "./account-DOgxP7m4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cliente.dashboard-BdRPH_PA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientDashboard() {
	const { firstName } = useSession();
	const [activeServices, setActiveServices] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const sync = () => setActiveServices(getActiveServices());
		sync();
		window.addEventListener("sentinel-account-change", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("sentinel-account-change", sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	const services = SERVICE_CATALOG.filter((service) => activeServices.some((active) => active.serviceId === service.id));
	const monthlyInvestment = services.reduce((sum, service) => sum + (service.period === "mês" ? service.price : 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: firstName ? `Olá, ${firstName}` : "Visão Geral"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "info",
						children: "Área do Cliente"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Acompanhe serviços contratados, investimentos e solicitações da sua conta."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/explore/proposal",
					className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90",
					children: ["Solicitar proposta ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Serviços contratados",
						value: String(services.length),
						delta: services.length ? "ativos nesta conta" : "nenhum serviço ativo",
						deltaPositive: services.length > 0,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" }),
						accent: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Investimento mensal",
						value: `R$ ${monthlyInvestment.toLocaleString("pt-BR")}`,
						delta: "com base nos serviços ativos",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-5 w-5" }),
						accent: "cyan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Solicitações abertas",
						value: "Consultar",
						delta: "acompanhe o status de atendimento",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headset, { className: "h-5 w-5" }),
						accent: "success"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Seus serviços",
					description: "Serviços associados à sua conta",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/explore/services",
						className: "text-xs font-semibold text-primary hover:underline",
						children: "Ver catálogo"
					})
				}), services.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-success/10 text-success",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: service.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: service.description
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "success",
								children: "Ativo"
							})
						]
					}, service.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: "Nenhum serviço contratado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: "Conheça as soluções disponíveis ou solicite uma proposta para sua empresa."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/explore/services",
							className: "text-sm font-semibold text-primary hover:underline",
							children: "Conhecer serviços"
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Acesso rápido",
					description: "Gestão da sua relação com a Sentinel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y divide-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/portal/billing",
							className: "flex items-center gap-3 p-4 hover:bg-accent/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4 text-cyan" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 text-sm font-medium",
									children: "Planos e investimentos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/portal/tickets",
							className: "flex items-center gap-3 p-4 hover:bg-accent/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headset, { className: "h-4 w-4 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 text-sm font-medium",
									children: "Solicitações e atendimento"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/explore/proposal",
							className: "flex items-center gap-3 p-4 hover:bg-accent/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefcaseBusiness, { className: "h-4 w-4 text-success" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 text-sm font-medium",
									children: "Orçamentos e propostas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground" })
							]
						})
					]
				})] })]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleShell, {
	role: "customer",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientDashboard, {})
});
//#endregion
export { SplitComponent as component };
