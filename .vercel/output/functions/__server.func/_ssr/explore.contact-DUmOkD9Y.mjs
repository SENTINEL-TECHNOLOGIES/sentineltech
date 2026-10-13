import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, r as CardHeader } from "./ui-bits-DQh5hywF.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as MapPin, rt as Calendar, w as Mail, x as MessageCircle, y as Phone } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore.contact-DUmOkD9Y.js
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold",
			children: "Fale com a gente"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Converse com vendas, suporte ou a nossa central 24/7 — o que você precisar."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[1fr_380px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { title: "Envie uma mensagem" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-4 p-6",
				onSubmit: (e) => {
					e.preventDefault();
					toast.success("Mensagem enviada — respondemos em até 24h");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Nome completo",
								className: inputCls
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "E-mail",
								type: "email",
								className: inputCls
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Empresa",
								className: inputCls
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Telefone",
								className: inputCls
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: inputCls,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Quero falar sobre... Vendas" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Suporte" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Parcerias" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Imprensa" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 5,
						placeholder: "Como podemos ajudar?",
						className: inputCls
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90",
						children: "Enviar mensagem"
					})
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactItem, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" }),
						title: "WhatsApp",
						subtitle: "+55 (11) 4002-8922",
						cta: "Abrir chat",
						href: "https://wa.me/551140028922",
						accent: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactItem, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5" }),
						title: "E-mail",
						subtitle: "contato@sentinel.tech",
						cta: "Enviar e-mail",
						href: "mailto:contato@sentinel.tech",
						accent: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactItem, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5" }),
						title: "Telefone — Global",
						subtitle: "+55 (11) 4000-0199",
						cta: "Ligar agora",
						href: "tel:+551140000199",
						accent: "cyan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactItem, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5" }),
						title: "Agendar reunião",
						subtitle: "Consultoria de 30 min",
						cta: "Agendar",
						href: "/explore/meeting",
						accent: "warning",
						internal: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: "Sede"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-sm text-muted-foreground",
										children: [
											"Av. Brigadeiro Faria Lima, 3500",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Itaim Bibi · São Paulo, SP"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 text-xs text-muted-foreground",
										children: "Centrais de Operação · São Paulo · Rio de Janeiro · Curitiba · Recife"
									})
								]
							})]
						})
					})
				]
			})]
		})]
	});
}
var inputCls = "w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary";
function ContactItem({ icon, title, subtitle, cta, href, accent, internal }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex items-center gap-4 p-5 transition hover:border-primary/50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid h-10 w-10 shrink-0 place-items-center rounded-xl ${{
					primary: "text-primary bg-primary/15",
					cyan: "text-cyan bg-cyan/15",
					success: "text-success bg-success/15",
					warning: "text-warning bg-warning/15"
				}[accent]}`,
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-xs text-muted-foreground",
					children: subtitle
				})]
			}),
			internal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: href,
				className: "shrink-0 text-xs font-semibold text-primary hover:underline",
				children: [cta, " →"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href,
				className: "shrink-0 text-xs font-semibold text-primary hover:underline",
				children: [cta, " →"]
			})
		]
	});
}
//#endregion
export { Contact as component };
