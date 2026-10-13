import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as useSession } from "./use-session-BevYDieA.mjs";
import { g as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as RoleShell } from "./role-shell-SsFQKfo4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-JvcgM4kI.js
var import_jsx_runtime = require_jsx_runtime();
function PortalLayout() {
	const { session, ready } = useSession();
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		"aria-busy": "true"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleShell, {
		role: session?.role ?? "customer",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { PortalLayout as component };
