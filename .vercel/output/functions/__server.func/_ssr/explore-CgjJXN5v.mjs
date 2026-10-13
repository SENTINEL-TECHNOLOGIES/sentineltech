import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as SentinelLogo } from "./sentinel-logo-CWb_F0jH.mjs";
import { b as Link, g as Outlet, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as ChevronRight, F as House, M as Layers, P as Info, S as Menu, at as Building2, n as X, ot as BriefcaseBusiness, y as Phone, z as FileText } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore-CgjJXN5v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CRUMB_TRANSLATIONS = {
	explore: "Descoberta",
	home: "Início",
	services: "Plataforma",
	"case-studies": "Cases",
	industries: "Para quem é",
	about: "Sobre",
	contact: "Contato",
	meeting: "Reunião",
	proposal: "Proposta"
};
function ExploreShell({ items }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const crumbs = pathname.split("/").filter(Boolean);
	(0, import_react.useEffect)(() => {
		setSidebarOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		function onDocClick(e) {
			e.target;
			if (sidebarOpen) setSidebarOpen(false);
		}
		document.addEventListener("mousedown", onDocClick);
		return () => document.removeEventListener("mousedown", onDocClick);
	}, [sidebarOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [
			sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden",
				onClick: () => setSidebarOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex h-20 shrink-0 items-center justify-center border-b border-sidebar-border px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SentinelLogo, {
						size: "lg",
						variant: "horizontal",
						onBackground: "dark"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "absolute right-4 lg:hidden text-muted-foreground",
						onClick: () => setSidebarOpen(false),
						"aria-label": "Fechar menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "sidebar-scroll flex-1 overflow-y-auto p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-1",
						children: items.map((it) => {
							const active = pathname === it.to;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: it.to,
								onClick: () => setSidebarOpen(false),
								className: `group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${active ? "bg-primary/15 text-foreground shadow-inner shadow-primary/10 ring-1 ring-primary/30" : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `flex w-5 shrink-0 items-center justify-center ${active ? "text-primary" : "text-muted-foreground group-hover:text-cyan"}`,
										children: it.icon
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: it.label
									}),
									active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" })
								]
							}, it.to);
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "lg:hidden text-muted-foreground",
						onClick: () => setSidebarOpen(true),
						"aria-label": "Abrir menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-1.5 text-sm text-muted-foreground md:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-foreground",
							children: "Início"
						}), crumbs.slice(1).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: i === crumbs.length - 2 ? "text-foreground font-medium" : "",
								children: CRUMB_TRANSLATIONS[c] ?? c.replace("-", " ")
							})]
						}, i))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 overflow-y-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			})
		]
	});
}
var items = [
	{
		to: "/explore/home",
		label: "Início",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-4 w-4" })
	},
	{
		to: "/explore/services",
		label: "Plataforma",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-4 w-4" })
	},
	{
		to: "/explore/industries",
		label: "Para quem é",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" })
	},
	{
		to: "/explore/about",
		label: "Sobre",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4" })
	},
	{
		to: "/explore/case-studies",
		label: "Cases",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefcaseBusiness, { className: "h-4 w-4" })
	},
	{
		to: "/explore/proposal",
		label: "Proposta",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
	},
	{
		to: "/explore/contact",
		label: "Contato",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" })
	}
];
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExploreShell, { items });
//#endregion
export { SplitComponent as component };
