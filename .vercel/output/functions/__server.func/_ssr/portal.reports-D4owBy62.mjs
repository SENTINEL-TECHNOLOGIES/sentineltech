import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, r as CardHeader, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { t as useSession } from "./use-session-BevYDieA.mjs";
import { V as FileChartColumnIncreasing, W as Download } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.reports-D4owBy62.js
var import_jsx_runtime = require_jsx_runtime();
var reports = [
	{
		id: "RPT-2026-06",
		title: "Postura de Segurança — Junho 2026",
		type: "Segurança",
		date: "01 Jun 2026",
		size: "4,2 MB"
	},
	{
		id: "RPT-2026-05",
		title: "Postura de Segurança — Maio 2026",
		type: "Segurança",
		date: "01 Mai 2026",
		size: "3,9 MB"
	},
	{
		id: "RPT-Q2-26",
		title: "Revisão de SLA — 2º Trimestre",
		type: "SLA",
		date: "03 Abr 2026",
		size: "1,8 MB"
	},
	{
		id: "RPT-PEN-12",
		title: "Achados de Pentest Externo v12",
		type: "Auditoria",
		date: "22 Mar 2026",
		size: "6,1 MB"
	},
	{
		id: "RPT-SOC-04",
		title: "Resumo da Central — 1º Trimestre",
		type: "Operações",
		date: "10 Abr 2026",
		size: "2,3 MB"
	}
];
var clientReports = [];
var corporateReports = reports.filter((report) => report.type !== "Auditoria");
function Reports() {
	const { session } = useSession();
	const visibleReports = session?.role === "customer" ? clientReports : session?.role === "corporate" ? corporateReports : reports;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold",
			children: "Relatórios"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: session?.role === "customer" ? "Acesse somente materiais liberados para sua conta." : session?.role === "administrative" ? "Relatórios demonstrativos globais da plataforma." : "Relatórios operacionais do ambiente corporativo."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			title: "Relatórios disponíveis",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "info",
				children: session?.role === "customer" ? "Área do Cliente" : "PDF / CSV"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "divide-y divide-border",
			children: [visibleReports.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 p-4 hover:bg-accent/30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileChartColumnIncreasing, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate font-medium",
							children: r.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: r.id
								}),
								" · ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.type }),
								" · ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.date }),
								" · ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.size })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-xs font-semibold hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Baixar"]
					})
				]
			}, r.id)), visibleReports.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-6 text-sm text-muted-foreground",
				children: "Nenhum relatório foi liberado para esta conta."
			})]
		})] })]
	});
}
//#endregion
export { Reports as component };
