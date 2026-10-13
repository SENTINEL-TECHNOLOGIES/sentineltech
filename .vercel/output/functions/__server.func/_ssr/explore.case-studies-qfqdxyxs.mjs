import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { dt as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore.case-studies-qfqdxyxs.js
var import_jsx_runtime = require_jsx_runtime();
var cases = [
	{
		client: "LogiPort SA",
		industry: "Logística e Portos",
		challenge: "Operadora de 42 km² de infraestrutura portuária com 6 portões, perímetro vulnerável e vigilância reativa feita por equipe interna pequena.",
		solution: "312 câmeras com IA, detecção térmica de perímetro, biometria em todos os portões e monitoramento 24/7 centralizado na nossa central.",
		results: [
			{
				k: "42 km²",
				v: "Perímetro coberto"
			},
			{
				k: "-82%",
				v: "Entradas não autorizadas"
			},
			{
				k: "3min",
				v: "Tempo médio de resposta"
			}
		]
	},
	{
		client: "MetroRetail Group",
		industry: "Varejo · 240 lojas",
		challenge: "Perdas e invasões fora do horário em uma rede nacional sem visibilidade centralizada nem resposta padronizada.",
		solution: "CFTV unificado em todas as lojas, analítica comportamental de furtos e monitoramento remoto com coordenação policial fora do expediente.",
		results: [
			{
				k: "-68%",
				v: "Incidentes de perda"
			},
			{
				k: "240",
				v: "Sites monitorados"
			},
			{
				k: "R$ 18M",
				v: "Perdas anuais evitadas"
			}
		]
	},
	{
		client: "MediCore Saúde",
		industry: "Saúde · 38 unidades",
		challenge: "Rede hospitalar precisava de fluxo de visitantes em compliance, controle de zonas restritas e registros de acesso auditáveis em farmácia e pediatria.",
		solution: "Biometria + gestão de visitantes, câmeras com IA em zonas restritas e integração com RH para provisionamento e offboarding automáticos.",
		results: [
			{
				k: "100%",
				v: "Registros prontos para auditoria"
			},
			{
				k: "-91%",
				v: "Boletins de ocorrência"
			},
			{
				k: "6.400",
				v: "Usuários gerenciados"
			}
		]
	},
	{
		client: "EnerCore Utilities",
		industry: "Energia e Utilities",
		challenge: "Subestações sem operador em regiões remotas eram alvo de roubo de cobre e vandalismo, com resposta por rondas lenta demais.",
		solution: "Câmeras térmicas com IA, detecção a laser de perímetro, automação de iluminação/sirenes e despacho com verificação pela central.",
		results: [
			{
				k: "100%",
				v: "Subestações monitoradas"
			},
			{
				k: "<2 min",
				v: "Detecção até alerta"
			},
			{
				k: "-94%",
				v: "Eventos de furto"
			}
		]
	}
];
function Cases() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "info",
				children: "Cases de Sucesso"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-3xl font-bold",
				children: "Resultados reais em instalações reais"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted-foreground",
				children: "Empresas confiam na Sentinel porque entregamos resultados mensuráveis em segurança física — não slides."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-5",
			children: cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 md:grid-cols-[1fr_320px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold",
								children: c.client
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "info",
								children: c.industry
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
									label: "Desafio",
									body: c.challenge
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
									label: "Solução",
									body: c.solution
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-mono uppercase tracking-widest text-primary",
									children: "Resultados"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 space-y-2",
									children: c.results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-lg font-bold text-gradient-blue",
										children: r.k
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-muted-foreground",
										children: r.v
									})] }, r.v))
								})] })
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative hidden border-l border-border bg-gradient-to-br from-primary/15 via-card to-cyan/10 p-7 md:flex md:flex-col md:justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-grid-sm opacity-30" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-mono uppercase tracking-widest text-muted-foreground",
									children: "Setor"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-lg font-bold",
									children: c.industry
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/explore/meeting",
								className: "relative inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline",
								children: ["Conversar sobre este case ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
							})
						]
					})]
				})
			}, c.client))
		})]
	});
}
function Section({ label, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-[10px] font-mono uppercase tracking-widest text-primary",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-sm leading-relaxed text-muted-foreground",
		children: body
	})] });
}
//#endregion
export { Cases as component };
