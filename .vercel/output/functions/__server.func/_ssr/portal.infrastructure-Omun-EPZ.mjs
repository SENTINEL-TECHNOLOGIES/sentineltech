import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, t as Badge } from "./ui-bits-DQh5hywF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.infrastructure-Omun-EPZ.js
var import_jsx_runtime = require_jsx_runtime();
function Infra() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold",
			children: "Instalações"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Este menu foi zerado. Para popular os locais e indicadores, edite o array `sites` desta rota."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "border-dashed",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: "Área vazia"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold",
						children: "Nenhum item cadastrado neste menu"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Use `sites` para inserir instalações, regiões, câmeras e indicadores de carga e saúde."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-secondary/30 p-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "1. `sites`"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted-foreground",
								children: "Adicione cada local monitorado com nome, região, câmeras, portas e status."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-secondary/30 p-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "2. Carga e capacidade"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted-foreground",
								children: "Defina os indicadores de uso para exibir saúde, capacidade e previsões do site."
							})]
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { Infra as component };
