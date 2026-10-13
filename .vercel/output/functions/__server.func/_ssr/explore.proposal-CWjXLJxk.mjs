import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, r as CardHeader } from "./ui-bits-DQh5hywF.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore.proposal-CWjXLJxk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Proposal() {
	const [sent, setSent] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold",
			children: "Solicitar proposta"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Conte sobre seu ambiente — retornamos em até um dia útil com escopo e investimento."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			title: "Detalhes do projeto",
			description: "Todos os campos são confidenciais"
		}), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-5xl",
					children: "✓"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-xl font-bold",
					children: "Solicitação recebida"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Um engenheiro de soluções Sentinel entrará em contato em até 24h."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4 p-6",
			onSubmit: (e) => {
				e.preventDefault();
				toast.success("Solicitação de proposta enviada");
				setSent(true);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nome completo",
							placeholder: "Maria Silva"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "E-mail corporativo",
							placeholder: "maria@empresa.com",
							type: "email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Empresa",
							placeholder: "Acme Corp"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Cargo",
							placeholder: "Diretor de Segurança"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Porte da empresa",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: inputCls,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "1-50" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "51-250" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "251-1000" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "1000+" })
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Orçamento anual",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: inputCls,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Até R$ 250 mil" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "R$ 250 mil – R$ 1 mi" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "R$ 1 mi – R$ 5 mi" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Acima de R$ 5 mi" })
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Serviços de interesse",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 grid grid-cols-2 gap-2 sm:grid-cols-3",
						children: [
							"CFTV com IA",
							"Acesso Biométrico",
							"Automação Predial",
							"Monitoramento Remoto",
							"Consultoria",
							"Projeto Integrado"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm hover:border-primary/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "accent-primary"
							}), s]
						}, s))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Conte sobre seu ambiente",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 5,
						placeholder: "Quantidade de sites, câmeras, portas, requisitos de compliance...",
						className: inputCls
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90",
					children: "Enviar solicitação"
				})
			]
		})] })]
	});
}
var inputCls = "mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary";
function Field({ label, placeholder, type = "text", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
		children: label
	}), children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		placeholder,
		className: inputCls
	})] });
}
//#endregion
export { Proposal as component };
