import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { t as useSession } from "./use-session-BevYDieA.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as CreditCard, dt as ArrowRight, p as ShieldCheck, tt as Check } from "../_libs/lucide-react.mjs";
import { i as getActiveServices, t as SERVICE_CATALOG } from "./account-DOgxP7m4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore.services-7O8KBpFm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Services() {
	const { session } = useSession();
	const [activeIds, setActiveIds] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setActiveIds(getActiveServices().map((service) => service.serviceId));
	}, [session]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl space-y-10 px-5 py-8 pb-12 sm:px-8 md:py-12 lg:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "info",
						children: "Serviços Sentinel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-4xl font-bold tracking-tight md:text-5xl",
						children: "Escolha a estrutura da sua operação"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground",
						children: "Ative um serviço para liberar sua dashboard e começar a cadastrar equipamentos monitorados."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: SERVICE_CATALOG.map((service) => {
					const active = activeIds.includes(service.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex flex-col p-6 transition hover:border-primary/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 text-xl font-bold",
									children: service.name
								})] }), active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "success",
									children: "Ativo"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: service.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 space-y-2 text-sm",
								children: service.features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-success" }), feature]
								}, feature))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7 flex items-end justify-between gap-4 border-t border-border pt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-2xl font-bold",
									children: ["R$ ", service.price.toFixed(2).replace(".", ",")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [" / ", service.period]
								})] }), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/portal/dashboard",
									className: "inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent",
									children: ["Abrir dashboard ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/explore/checkout",
									search: { service: service.id },
									className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4" }), " Contratar"]
								})]
							})
						]
					}, service.id);
				})
			}),
			!session && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-cyan/30 bg-cyan/10 p-4 text-sm text-cyan",
				children: ["Crie uma conta antes de contratar um serviço. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cadastro",
					className: "font-semibold underline",
					children: "Cadastrar agora"
				})]
			})
		]
	});
}
//#endregion
export { Services as component };
