import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { l as login, r as dashboardForRole, s as isEmailValid, t as CREDENTIALS } from "./auth-XT4XOf5W.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as Eye, U as EyeOff, k as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Field, r as inputClass, t as AuthShell } from "./auth-shell-B87dlTlP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-form-kt0Ua6dE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginForm({ title = "Entrar na sua conta", subtitle = "Acesse o portal de monitoramento da Sentinel Technologies.", redirectTo, demoRole = "corporate", showDemoCredentials = true }) {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	const emailValid = isEmailValid(email);
	const formValid = emailValid && password.length > 0;
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		if (!formValid) {
			setError("Preencha e-mail e senha corretamente.");
			return;
		}
		setLoading(true);
		const result = await login(email, password);
		if (result.ok) {
			toast.success("Login realizado com sucesso!");
			navigate({ to: redirectTo ?? dashboardForRole(result.role) });
		} else {
			setError(result.error);
			toast.error(result.error);
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
		title,
		subtitle,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Ainda não tem conta?",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/cadastro",
				className: "font-semibold text-primary hover:underline",
				children: "Criar conta"
			})
		] }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "mt-6 space-y-4",
			noValidate: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "E-mail",
					error: email.length > 0 && !emailValid ? "E-mail inválido." : null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: "voce@empresa.com",
						maxLength: 255,
						autoComplete: "email",
						className: inputClass
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Senha",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: show ? "text" : "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "Sua senha",
							autoComplete: "current-password",
							className: `${inputClass} pr-10`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShow(!show),
							className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
							"aria-label": show ? "Ocultar senha" : "Mostrar senha",
							children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/recuperar-senha",
						className: "text-xs font-medium text-primary hover:underline",
						children: "Esqueci minha senha"
					})
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: loading,
					className: "flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60",
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, " Entrar"]
				})
			]
		}), showDemoCredentials ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-lg border border-border/50 bg-secondary/40 p-3 text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-semibold text-muted-foreground",
				children: "Credenciais de demonstração"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					setEmail(CREDENTIALS[demoRole].email);
					setPassword(CREDENTIALS[demoRole].password);
				},
				className: "mt-1 block text-left font-mono text-[11px] text-primary hover:underline",
				children: [
					CREDENTIALS[demoRole].email,
					" / ",
					CREDENTIALS[demoRole].password
				]
			})]
		}) : null]
	});
}
//#endregion
export { LoginForm as t };
