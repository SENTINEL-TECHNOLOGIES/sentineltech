import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as requestPasswordReset, s as isEmailValid } from "./auth-XT4XOf5W.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as MailCheck, k as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Field, r as inputClass, t as AuthShell } from "./auth-shell-B87dlTlP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recuperar-senha-Bg3iIE09.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPasswordForm() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const emailValid = isEmailValid(email);
	function onSubmit(e) {
		e.preventDefault();
		setError(null);
		if (!emailValid) {
			setError("Informe um e-mail válido.");
			return;
		}
		setLoading(true);
		setTimeout(() => {
			const result = requestPasswordReset(email);
			setLoading(false);
			if (result.ok) {
				setSent(true);
				toast.success("Instruções de recuperação enviadas.");
			} else {
				setError(result.error);
				toast.error(result.error);
			}
		}, 700);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthShell, {
		title: "Recuperar senha",
		subtitle: "Informe seu e-mail e enviaremos as instruções para redefinir sua senha.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Lembrou a senha?",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "font-semibold text-primary hover:underline",
				children: "Voltar para o login"
			})
		] }),
		children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 rounded-lg border border-success/40 bg-success/10 p-4 text-sm text-success",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Se existir uma conta para ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "font-semibold",
						children: email.trim()
					}),
					", você receberá um link de recuperação em alguns minutos."
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setSent(false);
					setEmail("");
				},
				className: "w-full rounded-lg border border-border px-4 py-3 text-sm font-semibold transition hover:bg-secondary/60",
				children: "Enviar para outro e-mail"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
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
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: loading,
					className: "flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60",
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, " Enviar instruções"]
				})
			]
		})
	});
}
var SplitComponent = ForgotPasswordForm;
//#endregion
export { SplitComponent as component };
