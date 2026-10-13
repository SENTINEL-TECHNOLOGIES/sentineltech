import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { at as Building2, c as UserRound, dt as ArrowRight, p as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as AuthShell } from "./auth-shell-B87dlTlP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-yUrrqn9p.js
var import_jsx_runtime = require_jsx_runtime();
function LoginChoice() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
		title: "Entrar na Sentinel",
		subtitle: "Escolha o tipo de acesso que deseja utilizar.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/login-corporate",
					className: "group flex items-center gap-4 rounded-xl border border-border bg-secondary/30 p-4 transition hover:border-primary/60 hover:bg-primary/5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: "Acesso Corporativo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: "Monitoramento, projetos e operações de segurança."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/login-customer",
					className: "group flex items-center gap-4 rounded-xl border border-border bg-secondary/30 p-4 transition hover:border-cyan/60 hover:bg-cyan/5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan/10 text-cyan",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: "Acesso do Cliente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: "Serviços, propostas e consultoria da Sentinel."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-cyan" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/login-admin",
					className: "group flex items-center gap-4 rounded-xl border border-border bg-secondary/30 p-4 transition hover:border-primary/60 hover:bg-primary/5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: "Acesso Administrativo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: "Administração interna da plataforma Sentinel."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" })
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 border-t border-border pt-5 text-center text-sm text-muted-foreground",
			children: [
				"Ainda não tem conta?",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cadastro",
					className: "font-semibold text-primary hover:underline",
					children: "Criar conta"
				})
			]
		})]
	});
}
//#endregion
export { LoginChoice as component };
