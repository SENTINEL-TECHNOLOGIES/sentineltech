import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, r as CardHeader, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { O as LockKeyhole, Q as CircleAlert } from "../_libs/lucide-react.mjs";
import { t as RoleShell } from "./role-shell-SsFQKfo4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-module-gbOHVd-F.js
var import_jsx_runtime = require_jsx_runtime();
function AdminWorkspace({ title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "info",
					children: "Área administrativa"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "-mt-5 text-sm text-muted-foreground",
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: "Recurso administrativo",
				description: "Acesso restrito a administradores da Sentinel",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "h-4 w-4 text-primary" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-5 w-5 shrink-0 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold",
					children: "Este recurso ainda não possui integração de dados"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "O backend atual autentica usuários e sessões, mas ainda não oferece operações persistidas para este módulo. Nenhum registro ou ação fictícia foi criado."
				})] })]
			})] })
		]
	});
}
function AdminModule({ title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleShell, {
		role: "administrative",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminWorkspace, {
			title,
			description
		})
	});
}
//#endregion
export { AdminModule as t };
