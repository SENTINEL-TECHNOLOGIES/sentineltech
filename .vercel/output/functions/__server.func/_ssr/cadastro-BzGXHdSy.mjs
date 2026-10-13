import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as isPasswordValid, d as register, n as PASSWORD_RULES, s as isEmailValid } from "./auth-XT4XOf5W.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as ChevronRight, H as Eye, U as EyeOff, et as ChevronLeft, k as LoaderCircle, tt as Check } from "../_libs/lucide-react.mjs";
import { o as saveAccountProfile } from "./account-DOgxP7m4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Field, t as AuthShell } from "./auth-shell-B87dlTlP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cadastro-BzGXHdSy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var steps = [
	"Dados pessoais",
	"Contato",
	"Segurança",
	"Endereço",
	"Revisão"
];
var emptyForm = {
	fullName: "",
	username: "",
	email: "",
	phone: "",
	recoveryEmail: "",
	address: {
		zip: "",
		state: "",
		city: "",
		neighborhood: "",
		street: "",
		number: "",
		complement: ""
	},
	password: "",
	confirmPassword: ""
};
function onlyDigits(value) {
	return value.replace(/\D/g, "");
}
function formatPhone(value) {
	const digits = onlyDigits(value).slice(0, 11);
	if (digits.length <= 2) return digits ? `(${digits}` : "";
	if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
	return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
function formatZip(value) {
	const digits = onlyDigits(value).slice(0, 8);
	return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}
function usernameSuggestion(name) {
	return name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "");
}
function RegisterForm() {
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const [step, setStep] = (0, import_react.useState)(0);
	const [attempted, setAttempted] = (0, import_react.useState)(false);
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [addressLoading, setAddressLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	const passwordValid = (0, import_react.useMemo)(() => isPasswordValid(form.password), [form.password]);
	const update = (patch) => setForm((current) => ({
		...current,
		...patch
	}));
	const updateAddress = (patch) => setForm((current) => ({
		...current,
		address: {
			...current.address,
			...patch
		}
	}));
	async function fetchAddressByZip(zip) {
		if (zip.length !== 8) return;
		setAddressLoading(true);
		try {
			const response = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
			const data = await response.json();
			if (!response.ok || data.erro) throw new Error("CEP não encontrado ou indisponível no momento.");
			updateAddress({
				zip: formatZip(zip),
				state: data.uf ?? "",
				city: data.localidade ?? "",
				neighborhood: data.bairro ?? "",
				street: data.logradouro ?? "",
				complement: data.complemento ?? ""
			});
			setError(null);
		} catch (error) {
			const message = error instanceof Error ? error.message : "Não foi possível buscar o endereço.";
			setError(message);
			toast.error(message);
		} finally {
			setAddressLoading(false);
		}
	}
	function validate(currentStep = step) {
		if (currentStep === 0 && (!form.fullName.trim() || !form.username.trim())) return "Informe seu nome completo e nome de usuário.";
		if (currentStep === 1 && (!isEmailValid(form.email) || onlyDigits(form.phone).length < 10)) return "Informe um e-mail e telefone válidos.";
		if (currentStep === 2 && (!passwordValid || form.password !== form.confirmPassword || form.recoveryEmail && (!isEmailValid(form.recoveryEmail) || form.recoveryEmail.trim().toLowerCase() === form.email.trim().toLowerCase()))) return "Revise a senha, a confirmação e o e-mail de recuperação.";
		if (currentStep === 3 && (!/^\d{5}-?\d{3}$/.test(form.address.zip) || !form.address.state || !form.address.city || !form.address.neighborhood || !form.address.street || !form.address.number)) return "Preencha o endereço obrigatório e informe um CEP válido.";
		return null;
	}
	function continueStep() {
		setAttempted(true);
		const message = validate();
		if (message) {
			setError(message);
			return;
		}
		setError(null);
		if (step < steps.length - 1) setStep((current) => current + 1);
	}
	async function finish() {
		setAttempted(true);
		for (let index = 0; index < 4; index += 1) {
			const message = validate(index);
			if (message) {
				setError(message);
				setStep(index);
				return;
			}
		}
		setLoading(true);
		const result = await register(form.fullName, form.email, form.password, form.phone, "customer");
		if (!result.ok) {
			setError(result.error);
			toast.error(result.error);
			setLoading(false);
			return;
		}
		saveAccountProfile(form);
		toast.success("Conta criada com sucesso.");
		navigate({ to: "/explore/services" });
	}
	const invalid = attempted ? validate() : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
		title: "Criar conta de cliente",
		subtitle: "Configure sua conta em poucos passos e escolha os serviços da Sentinel.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Já tem uma conta? " }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			className: "font-semibold text-primary hover:underline",
			children: "Entrar"
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-5 gap-1.5",
				"aria-label": "Progresso do cadastro",
				children: steps.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => index <= step && setStep(index),
					className: `min-w-0 text-center ${index <= step ? "text-primary" : "text-muted-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `mx-auto grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold ${index <= step ? "border-primary bg-primary/15" : "border-border"}`,
						children: index < step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : index + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 hidden truncate text-[10px] sm:block",
						children: label
					})]
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 min-h-[300px]",
				children: [
					step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nome completo",
							required: true,
							error: attempted && !form.fullName.trim() ? "Informe seu nome completo." : null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2",
								value: form.fullName,
								onChange: (event) => update({
									fullName: event.target.value,
									username: form.username || usernameSuggestion(event.target.value)
								}),
								placeholder: "Ex.: Caio Gabriel",
								autoComplete: "name"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nome de usuário",
							required: true,
							hint: "Você poderá usar este nome para identificar sua conta.",
							error: attempted && !form.username.trim() ? "Informe um nome de usuário." : null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2",
								value: form.username,
								onChange: (event) => update({ username: event.target.value.replace(/\s/g, ".") }),
								placeholder: "caio.gabriel",
								autoComplete: "username"
							})
						})]
					}),
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "E-mail principal",
							required: true,
							error: attempted && !isEmailValid(form.email) ? "Digite um e-mail válido." : null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2",
								type: "email",
								value: form.email,
								onChange: (event) => update({ email: event.target.value }),
								placeholder: "voce@empresa.com",
								autoComplete: "email"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Telefone",
							required: true,
							error: attempted && onlyDigits(form.phone).length < 10 ? "Informe um telefone válido." : null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2",
								value: form.phone,
								onChange: (event) => update({ phone: formatPhone(event.target.value) }),
								placeholder: "(11) 99999-9999",
								inputMode: "tel",
								autoComplete: "tel"
							})
						})]
					}),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Senha",
								required: true,
								hint: "Use pelo menos 8 caracteres, maiúscula, minúscula, número e símbolo.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: `w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2 pr-10`,
										type: showPassword ? "text" : "password",
										value: form.password,
										onChange: (event) => update({ password: event.target.value }),
										autoComplete: "new-password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowPassword((current) => !current),
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
										"aria-label": showPassword ? "Ocultar senha" : "Mostrar senha",
										children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "grid gap-1 rounded-lg border border-border/50 bg-secondary/30 p-3 sm:grid-cols-2",
								children: PASSWORD_RULES.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: `flex items-center gap-2 text-[11px] ${rule.test(form.password) ? "text-success" : "text-muted-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), rule.label]
								}, rule.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Confirmar senha",
								required: true,
								error: attempted && form.password !== form.confirmPassword ? "As senhas não coincidem." : null,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2",
									type: "password",
									value: form.confirmPassword,
									onChange: (event) => update({ confirmPassword: event.target.value }),
									autoComplete: "new-password"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "E-mail de recuperação",
								hint: "Opcional e diferente do e-mail principal.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2",
									type: "email",
									value: form.recoveryEmail,
									onChange: (event) => update({ recoveryEmail: event.target.value }),
									placeholder: "recuperacao@exemplo.com"
								})
							})
						]
					}),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "CEP",
								required: true,
								hint: addressLoading ? "Buscando endereço..." : "Digite o CEP e os campos de endereço serão preenchidos automaticamente.",
								error: attempted && !/^\d{5}-?\d{3}$/.test(form.address.zip) ? "Informe um CEP válido." : null,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: `w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2 pr-10`,
										value: form.address.zip,
										onChange: (event) => {
											const zip = formatZip(event.target.value);
											updateAddress({ zip });
											if (onlyDigits(zip).length === 8) fetchAddressByZip(onlyDigits(zip));
										},
										placeholder: "00000-000",
										inputMode: "numeric",
										autoComplete: "postal-code"
									}), addressLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Estado",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2",
										value: form.address.state,
										onChange: (event) => updateAddress({ state: event.target.value }),
										placeholder: "SP"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Cidade",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2",
										value: form.address.city,
										onChange: (event) => updateAddress({ city: event.target.value }),
										placeholder: "São Paulo"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Bairro",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2",
										value: form.address.neighborhood,
										onChange: (event) => updateAddress({ neighborhood: event.target.value })
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Rua",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2",
										value: form.address.street,
										onChange: (event) => updateAddress({ street: event.target.value })
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-[120px_1fr]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Número",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2",
										value: form.address.number,
										onChange: (event) => updateAddress({ number: event.target.value })
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Complemento",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2",
										value: form.address.complement,
										onChange: (event) => updateAddress({ complement: event.target.value })
									})
								})]
							})
						]
					}),
					step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-3",
						children: [[
							{
								title: "Dados pessoais",
								values: [form.fullName, `@${form.username}`],
								index: 0
							},
							{
								title: "Contato",
								values: [form.email, form.phone],
								index: 1
							},
							{
								title: "Segurança",
								values: ["Senha configurada", form.recoveryEmail || "Sem e-mail de recuperação"],
								index: 2
							},
							{
								title: "Endereço",
								values: [`${form.address.street}, ${form.address.number}`, `${form.address.city} - ${form.address.state} · ${form.address.zip}`],
								index: 3
							}
						].map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border border-border bg-secondary/20 p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold",
									children: section.title
								}), section.values.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: value
								}, value))] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setStep(section.index),
									className: "text-xs font-semibold text-primary hover:underline",
									children: "Editar"
								})]
							})
						}, section.title)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "pt-2 text-xs text-muted-foreground",
							children: "Ao finalizar, sua conta será criada e você poderá escolher um serviço para ativar a dashboard."
						})]
					})
				]
			}),
			(invalid || error) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "alert",
				className: "rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive",
				children: error || invalid
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: step === 0 || loading,
					onClick: () => {
						setAttempted(false);
						setError(null);
						setStep((current) => current - 1);
					},
					className: "inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent disabled:invisible",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Voltar"]
				}), step < steps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: continueStep,
					className: "ml-auto inline-flex items-center gap-1 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90",
					children: ["Continuar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: finish,
					disabled: loading,
					className: "ml-auto inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60",
					children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Finalizar"]
				})]
			})
		]
	});
}
var SplitComponent = RegisterForm;
//#endregion
export { SplitComponent as component };
