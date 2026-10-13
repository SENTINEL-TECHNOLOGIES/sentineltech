import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, r as CardHeader, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { Q as CircleAlert, o as Users } from "../_libs/lucide-react.mjs";
import { t as RoleShell } from "./role-shell-SsFQKfo4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/corporativo.users-D-OPca_l.js
var import_jsx_runtime = require_jsx_runtime();
function CorporateUsers() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleShell, {
		role: "corporate",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold",
						children: "Usuários autorizados"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "success",
						children: "Empresa"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "-mt-5 text-sm text-muted-foreground",
					children: "Gestão de acesso dos usuários vinculados ao ambiente corporativo."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Acesso corporativo",
					description: "Permissões restritas à organização autenticada",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-primary" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-5 w-5 shrink-0 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: "Vínculo de empresas ainda não disponível"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "O modelo atual armazena usuários e sessões, mas ainda não associa usuários a uma empresa nem oferece API de permissões. Nenhum usuário de outra organização é listado ou alterável."
					})] })]
				})] })
			]
		})
	});
}
//#endregion
export { CorporateUsers as component };
