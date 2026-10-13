import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sentinel-logo-CWb_F0jH.js
var import_jsx_runtime = require_jsx_runtime();
var logo_horz_default = "/sentineltech/assets/logo-horz-CIn7Cjzn.png";
var logo_horz_wht_default = "/sentineltech/assets/logo-horz-wht-CABWI1rU.png";
var logo_vert_default = "/sentineltech/assets/logo-vert-DHyf5sY5.png";
var logo_vert_wht_default = "/sentineltech/assets/logo-vert-wht-J2_QAu3x.png";
var VARIANT_MAP = {
	horizontal: "horizontal",
	vertical: "vertical",
	mark: "horizontal",
	stacked: "vertical"
};
var HEIGHTS = {
	horizontal: {
		sm: "h-6 md:h-7",
		md: "h-8 md:h-9",
		lg: "h-10 md:h-12",
		xl: "h-12 md:h-14"
	},
	vertical: {
		sm: "h-10 md:h-12",
		md: "h-14 md:h-16",
		lg: "h-20 md:h-24",
		xl: "h-24 md:h-32"
	}
};
var SOURCES = {
	horizontal: {
		light: logo_horz_default,
		dark: logo_horz_wht_default
	},
	vertical: {
		light: logo_vert_default,
		dark: logo_vert_wht_default
	}
};
function SentinelLogo({ size = "md", subtitle, variant = "horizontal", onBackground = "dark", className = "" }) {
	const resolvedVariant = VARIANT_MAP[variant];
	const sub = size === "sm" ? "text-[9px]" : size === "lg" ? "text-[11px]" : "text-[10px]";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex ${resolvedVariant === "vertical" ? "flex-col items-center gap-2" : "items-center gap-3"} ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: SOURCES[resolvedVariant][onBackground],
			alt: "Sentinel Technologies",
			className: `${HEIGHTS[resolvedVariant][size]} w-auto shrink-0 object-contain`
		}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `${sub} uppercase tracking-[0.22em] text-muted-foreground`,
			children: subtitle
		})]
	});
}
//#endregion
export { SentinelLogo as t };
