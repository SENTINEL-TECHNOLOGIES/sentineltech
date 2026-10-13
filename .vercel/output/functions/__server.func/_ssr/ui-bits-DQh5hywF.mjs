import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-bits-DQh5hywF.js
var import_jsx_runtime = require_jsx_runtime();
function Card({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `rounded-xl border border-border bg-card/60 backdrop-blur-sm ${className}`,
		children
	});
}
function CardHeader({ title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-4 border-b border-border p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-semibold",
				children: title
			}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: description
			})]
		}), action]
	});
}
function KpiCard({ label, value, delta, deltaPositive, icon, accent = "primary" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "overflow-hidden p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 font-mono text-3xl font-bold tracking-tight",
						children: value
					}),
					delta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mt-1.5 text-xs font-semibold ${deltaPositive ? "text-success" : "text-destructive"}`,
						children: delta
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${{
					primary: "from-primary/30 to-primary/0 text-primary",
					cyan: "from-cyan/30 to-cyan/0 text-cyan",
					success: "from-success/30 to-success/0 text-success",
					warning: "from-warning/30 to-warning/0 text-warning",
					destructive: "from-destructive/30 to-destructive/0 text-destructive"
				}[accent]}`,
				children: icon
			})]
		})
	});
}
function Badge({ children, variant = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${{
			default: "bg-secondary text-secondary-foreground",
			success: "bg-success/15 text-success border border-success/30",
			warning: "bg-warning/15 text-warning border border-warning/30",
			destructive: "bg-destructive/15 text-destructive border border-destructive/30",
			info: "bg-primary/15 text-primary border border-primary/30",
			outline: "border border-border text-foreground"
		}[variant]}`,
		children
	});
}
//#endregion
export { KpiCard as i, Card as n, CardHeader as r, Badge as t };
