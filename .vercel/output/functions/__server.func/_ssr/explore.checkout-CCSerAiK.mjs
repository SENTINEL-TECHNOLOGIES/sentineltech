import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { a as getSession } from "./auth-XT4XOf5W.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as CreditCard, et as ChevronLeft, k as LoaderCircle, p as ShieldCheck, tt as Check } from "../_libs/lucide-react.mjs";
import { a as getService, n as activateService } from "./account-DOgxP7m4.mjs";
import "./auth-shell-B87dlTlP.mjs";
import { n as Route$18 } from "./router-DrZdlpEH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore.checkout-CCSerAiK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Checkout() {
	const { service: requestedService } = Route$18.useSearch();
	const navigate = useNavigate();
	const service = getService(requestedService) || getService("sentinel-core");
	const [step, setStep] = (0, import_react.useState)(0);
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const [card, setCard] = (0, import_react.useState)({
		name: "",
		number: "",
		expiry: "",
		cvv: ""
	});
	(0, import_react.useEffect)(() => {
		if (!getSession()) navigate({ to: "/cadastro" });
	}, [navigate]);
	function next() {
		if (step === 1 && (!card.name.trim() || card.number.replace(/\D/g, "").length < 12 || !/^\d{2}\/\d{2}$/.test(card.expiry) || card.cvv.length < 3)) return;
		setStep((current) => current + 1);
	}
	function pay() {
		setProcessing(true);
		window.setTimeout(() => {
			activateService(service.id);
			setProcessing(false);
			setStep(3);
		}, 1800);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-3xl space-y-8 px-5 py-8 pb-12 sm:px-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "info",
					children: "Contratação segura e simulada"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-4 text-3xl font-bold",
					children: ["Ativar ", service.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Nenhum pagamento real será realizado nesta demonstração."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-2",
				children: [
					"Serviço",
					"Pagamento",
					"Revisão",
					"Concluído"
				].map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `border-t-2 pt-2 text-xs ${index <= step ? "border-primary text-primary" : "border-border text-muted-foreground"}`,
					children: [
						index + 1,
						". ",
						label
					]
				}, label))
			}),
			step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: "Serviço selecionado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-2xl font-bold",
								children: service.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: service.description
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-7 w-7 text-cyan" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-lg border border-border bg-secondary/20 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Periodicidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: service.period })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Valor simulado" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["R$ ", service.price.toFixed(2).replace(".", ",")] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setStep(1),
						className: "mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90",
						children: ["Continuar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4" })]
					})
				]
			}),
			step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold",
						children: "Dados fictícios de pagamento"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Use qualquer cartão de teste com formato válido. Nada será enviado."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-semibold text-muted-foreground",
								children: ["Nome no cartão", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: `w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2 mt-1`,
									value: card.name,
									onChange: (event) => setCard({
										...card,
										name: event.target.value
									}),
									placeholder: "Cliente Sentinel"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-semibold text-muted-foreground",
								children: ["Número do cartão", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: `w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2 mt-1`,
									value: card.number,
									onChange: (event) => setCard({
										...card,
										number: event.target.value.replace(/\D/g, "").slice(0, 16)
									}),
									placeholder: "4242 4242 4242 4242",
									inputMode: "numeric"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-semibold text-muted-foreground",
									children: ["Validade", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: `w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2 mt-1`,
										value: card.expiry,
										onChange: (event) => setCard({
											...card,
											expiry: event.target.value.replace(/[^\d/]/g, "").slice(0, 5)
										}),
										placeholder: "12/30"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-xs font-semibold text-muted-foreground",
									children: ["CVV", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: `w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2 mt-1`,
										value: card.cvv,
										onChange: (event) => setCard({
											...card,
											cvv: event.target.value.replace(/\D/g, "").slice(0, 4)
										}),
										placeholder: "123",
										inputMode: "numeric"
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: next,
						className: "mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90",
						children: "Continuar"
					})
				]
			}),
			step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold",
						children: "Confirme sua contratação"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 divide-y divide-border rounded-lg border border-border",
						children: [
							["Serviço", service.name],
							["Periodicidade", service.period],
							["Valor", `R$ ${service.price.toFixed(2).replace(".", ",")}`],
							["Pagamento", `Cartão terminado em ${card.number.slice(-4)}`]
						].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-4 px-4 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: value })]
						}, label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setStep(1),
							className: "rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent",
							children: "Voltar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: pay,
							className: "rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90",
							children: "Confirmar pagamento"
						})]
					})
				]
			}),
			step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-8 text-center",
				children: processing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto h-10 w-10 animate-spin text-cyan" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 text-xl font-bold",
						children: "Processando pagamento simulado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Aguarde um instante enquanto ativamos seu serviço."
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 text-xl font-bold",
						children: "Pagamento aprovado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: [service.name, " está ativo na sua conta."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => navigate({ to: "/portal/dashboard" }),
						className: "mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90",
						children: "Acessar dashboard"
					})
				] })
			}),
			step > 0 && step < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setStep((current) => current - 1),
				className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Voltar"]
			})
		]
	});
}
//#endregion
export { Checkout as component };
