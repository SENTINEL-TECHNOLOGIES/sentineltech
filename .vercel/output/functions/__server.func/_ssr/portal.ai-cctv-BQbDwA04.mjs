import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, t as Badge } from "./ui-bits-DQh5hywF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.ai-cctv-BQbDwA04.js
var import_jsx_runtime = require_jsx_runtime();
Array.from({ length: 24 }, (_, i) => ({
	h: `${String(i).padStart(2, "0")}h`,
	pessoas: 80 + Math.round(Math.max(0, 200 - Math.abs(i - 12) * 18) + Math.random() * 30),
	veiculos: 30 + Math.round(Math.max(0, 90 - Math.abs(i - 9) * 8) + Math.random() * 18),
	objetos: 12 + Math.round(Math.random() * 28)
}));
function AICCTV() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "info",
				children: "Vigilância com IA"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-2xl font-bold",
				children: "Inteligência de CFTV"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Este menu foi zerado. Para reconstituí-lo, edite os arrays do arquivo atual."
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
						children: "Use as constantes do arquivo para adicionar módulos, eventos e gráficos do CFTV com IA."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-secondary/30 p-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "1. `modules`"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground",
									children: "Adicione cada módulo de IA, como detecção de pessoas, veículos, objetos e reconhecimento facial."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-secondary/30 p-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "2. `detections`"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground",
									children: "Insira os pontos do gráfico das últimas 24 horas para popular o painel."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-secondary/30 p-3 text-sm md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "3. `aiEvents`"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground",
									children: "Preencha o histórico com hora, câmera, tipo de detecção, confiança e severidade para alimentar a tabela."
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
export { AICCTV as component };
