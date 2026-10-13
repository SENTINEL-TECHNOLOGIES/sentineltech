import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as House, N as Landmark, dt as ArrowRight, i as Warehouse, it as Building } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore.industries-cRQ0nEHJ.js
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-6 w-6" }),
		title: "Empresas",
		desc: "Acesso controlado e áreas críticas sob vigilância."
	},
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-6 w-6" }),
		title: "Condomínios",
		desc: "Portaria remota e perímetro monitorado 24h."
	},
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-6 w-6" }),
		title: "Poder público",
		desc: "Câmeras urbanas integradas a um centro de comando."
	},
	{
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Warehouse, { className: "h-6 w-6" }),
		title: "Logística e indústria",
		desc: "Pátios, docas e cargas acompanhados em tempo real."
	}
];
function Industries() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-16 pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto max-w-2xl text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "info",
					children: "Para quem é"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-4xl font-bold tracking-tight md:text-5xl",
					children: "Feita para quem não pode parar"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-7 transition hover:translate-y-[-2px] hover:border-primary/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-12 w-12 place-items-center rounded-xl bg-secondary/60 text-cyan",
							children: i.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-5 text-lg font-bold",
							children: i.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: i.desc
						})
					]
				}, i.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card p-10 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold md:text-3xl",
					children: "Sua operação também cabe aqui"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/explore/meeting",
					className: "mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90",
					children: ["Solicitar Demonstração ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			})
		]
	});
}
//#endregion
export { Industries as component };
