import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as SentinelLogo } from "./sentinel-logo-CWb_F0jH.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { ft as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-shell-B87dlTlP.js
var import_jsx_runtime = require_jsx_runtime();
function AuthShell({ title, subtitle, children, footer }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-grid opacity-30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-cyan/15 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-10 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Voltar para o site"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SentinelLogo, {
							size: "lg",
							variant: "stacked",
							onBackground: "dark"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: subtitle
							}),
							children
						]
					}),
					footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 text-center text-sm text-muted-foreground",
						children: footer
					}) : null
				]
			})
		]
	});
}
function Field({ label, required = false, optional = false, hint, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
			children: [
				label,
				" ",
				required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-primary",
					"aria-label": "obrigatório",
					children: "*"
				}) : optional ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-normal normal-case tracking-normal",
					children: "(opcional)"
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1.5",
			children
		}),
		hint && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[11px] text-muted-foreground",
			children: hint
		}) : null,
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[11px] text-destructive",
			children: error
		}) : null
	] });
}
var inputClass = "w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2";
//#endregion
export { Field as n, inputClass as r, AuthShell as t };
