import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, r as CardHeader, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { a as Video, q as Clock, rt as Calendar } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore.meeting-kkAwO0GK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var days = Array.from({ length: 14 }, (_, i) => {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() + i + 1);
	return d;
});
var slots = [
	"09:00",
	"10:00",
	"11:00",
	"14:00",
	"15:00",
	"16:00"
];
function Meeting() {
	const [day, setDay] = (0, import_react.useState)(0);
	const [slot, setSlot] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold",
			children: "Agende uma consultoria"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Vídeo de 30 minutos com um engenheiro sênior. Sem pitch comercial, é uma sessão de trabalho."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[1fr_360px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: "Escolha uma data",
				description: "Horários no seu fuso local",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "info",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "mr-1 inline h-3 w-3" }), "Google Meet"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-3",
					children: days.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setDay(i);
							setSlot(null);
						},
						className: `flex shrink-0 flex-col items-center rounded-lg border px-4 py-3 transition ${day === i ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:border-primary/40"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-mono uppercase",
								children: d.toLocaleDateString("pt-BR", { weekday: "short" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xl font-bold",
								children: d.getDate()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px]",
								children: d.toLocaleDateString("pt-BR", { month: "short" })
							})
						]
					}, i))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid grid-cols-3 gap-3",
					children: slots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSlot(s),
						className: `flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm transition ${slot === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50 hover:bg-accent"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
							" ",
							s
						]
					}, s))
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { title: "Seus dados" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3 p-5",
				onSubmit: (e) => {
					e.preventDefault();
					if (!slot) return toast.error("Selecione um horário");
					toast.success(`Reunião marcada para ${days[day].toLocaleDateString("pt-BR")} às ${slot}`);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						placeholder: "Nome completo",
						className: "w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						placeholder: "E-mail corporativo",
						type: "email",
						className: "w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						placeholder: "Empresa",
						className: "w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						placeholder: "O que você gostaria de discutir?",
						className: "w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border border-primary/30 bg-primary/10 p-3 text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-primary" }),
								" ",
								slot ? `${days[day].toLocaleDateString("pt-BR")} · ${slot}` : "Selecione data e horário"
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90",
						children: "Confirmar reunião"
					})
				]
			})] })]
		})]
	});
}
//#endregion
export { Meeting as component };
