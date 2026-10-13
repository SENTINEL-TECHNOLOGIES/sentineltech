import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as KpiCard, n as Card, r as CardHeader, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as CreditCard, b as Package, dt as ArrowRight, lt as BadgeDollarSign } from "../_libs/lucide-react.mjs";
import { i as getActiveServices, t as SERVICE_CATALOG } from "./account-DOgxP7m4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.billing-Dz8gYdQ_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Billing() {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: "Planos e Investimentos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Serviços e valores associados à sua conta."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Serviços ativos",
					value: String(services.length),
					delta: "nesta conta",
					deltaPositive: true,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" }),
					accent: "primary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Investimento mensal",
					value: `R$ ${monthlyInvestment.toLocaleString("pt-BR")}`,
					delta: "estimativa pelos serviços ativos",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-5 w-5" }),
					accent: "cyan"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Serviços contratados",
					description: "Valores demonstrativos do catálogo Sentinel",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "info",
						children: "Valores de referência"
					})
				}),
				services.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeDollarSign, { className: "h-5 w-5" })
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono font-semibold",
									children: ["R$ ", service.price.toLocaleString("pt-BR")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: ["/", service.period]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "success",
								children: "Ativo"
							})
						]
					}, service.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 text-sm text-muted-foreground",
					children: "Você ainda não possui serviços ativos nesta conta."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/explore/services",
						className: "inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline",
						children: ["Explorar serviços disponíveis ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Preços e contratações são demonstrativos e armazenados nesta sessão local; não há cobrança nem contrato conectado."
			})
		]
	});
}
//#endregion
export { Billing as component };
