import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as SentinelLogo } from "./sentinel-logo-CWb_F0jH.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Lock, _ as Rocket, dt as ArrowRight, f as Shield, h as Settings, o as Users, pt as Activity, q as Clock, ut as Award } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DiduykZT.js
var import_jsx_runtime = require_jsx_runtime();
function Entry() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-grid opacity-40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/20 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SentinelLogo, {
								size: "xl",
								variant: "stacked",
								onBackground: "dark"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm uppercase tracking-[0.3em] text-cyan",
								children: "Plataforma de Tecnologia em Segurança Física"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-8 max-w-3xl text-3xl md:text-5xl font-bold tracking-tight",
								children: ["Como você quer acessar a ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient-blue",
									children: "Sentinel?"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-14 grid w-full max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessCard, {
								badge: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full border border-success/40 bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mr-1 inline h-3 w-3" }), " Acesso Seguro"]
								}),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-7 w-7 text-cyan" }),
								title: "Acesso Corporativo",
								description: "Centro de comando, CFTV com IA e dispositivos do ambiente autorizado da sua empresa.",
								ctaText: "Entrar na operação",
								ctaTo: "/login-corporate",
								primary: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessCard, {
								badge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 text-[11px] font-semibold text-warning",
									children: "• Sem cadastro"
								}),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-7 w-7 text-primary" }),
								title: "Acesso do Cliente",
								description: "Acompanhe serviços contratados, propostas, investimentos e solicitações da sua conta.",
								ctaText: "Entrar na área do cliente",
								ctaTo: "/login-customer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessCard, {
								badge: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mr-1 inline h-3 w-3" }), " Equipe Sentinel"]
								}),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-7 w-7 text-primary" }),
								title: "Acesso Administrativo",
								description: "Gestão global da plataforma, empresas e configurações internas da Sentinel.",
								ctaText: "Entrar na administração",
								ctaTo: "/login-admin"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-16 grid w-full max-w-4xl grid-cols-2 gap-6 md:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
								label: "Sites Corporativos",
								value: "500+"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" }),
								label: "Câmeras Gerenciadas",
								value: "120k+"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
								label: "Monitoramento",
								value: "24 / 7"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4" }),
								label: "Certificação",
								value: "ISO 27001"
							})
						]
					})
				]
			})
		]
	});
}
function AccessCard({ badge, icon, title, description, ctaText, ctaTo, primary }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative flex h-full flex-col rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute right-6 top-6",
				children: badge
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-14 w-14 place-items-center rounded-xl border border-border bg-secondary/50",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 text-2xl font-bold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 flex-1 text-sm leading-relaxed text-muted-foreground",
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: ctaTo,
				className: `mt-8 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${primary ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90" : "border border-primary/50 text-primary hover:bg-primary/10"}`,
				children: [
					ctaText,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
				]
			})
		]
	});
}
function Stat({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary/60 text-cyan",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-bold",
				children: value
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "truncate text-xs text-muted-foreground",
				children: label
			})]
		})]
	});
}
//#endregion
export { Entry as component };
