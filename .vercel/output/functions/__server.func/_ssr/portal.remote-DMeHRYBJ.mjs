import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, t as Badge } from "./ui-bits-DQh5hywF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.remote-DMeHRYBJ.js
var import_jsx_runtime = require_jsx_runtime();
function Remote() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "info",
				children: "Monitoramento Remoto 24/7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-2xl font-bold",
				children: "Monitoramento Remoto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Este menu foi zerado. Para popular a central remota, edite os arrays do arquivo desta rota."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
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
						children: "Use `sites`, `incidents`, `team` e as listas de relatórios para inserir instalações monitoradas, incidentes e operadores."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-secondary/30 p-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "1. `sites`"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground",
									children: "Adicione locais monitorados, país, câmeras e status de cada instalação."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-secondary/30 p-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "2. `incidents`"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground",
									children: "Cadastre incidentes ativos, severidade, prazo e status de resposta."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-secondary/30 p-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "3. `team`"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground",
									children: "Preencha o time de monitoramento com operadores e escalas."
								})]
							})
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { Remote as component };
