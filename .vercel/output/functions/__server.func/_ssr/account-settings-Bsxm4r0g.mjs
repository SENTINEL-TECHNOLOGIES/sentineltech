import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Card, r as CardHeader, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { t as useSession } from "./use-session-BevYDieA.mjs";
import { o as saveAccountProfile, r as getAccountProfile } from "./account-DOgxP7m4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-settings-Bsxm4r0g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountSettings() {
	const { session } = useSession();
	const [profile, setProfile] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!session) return;
		setProfile(getAccountProfile() ?? {
			fullName: session.name ?? "",
			companyName: "",
			taxId: "",
			username: session.name ?? "",
			email: session.email,
			phone: "",
			recoveryEmail: "",
			address: {
				zip: "",
				state: "",
				city: "",
				neighborhood: "",
				street: "",
				number: "",
				complement: ""
			}
		});
	}, [session]);
	function save(event) {
		event.preventDefault();
		if (!profile) return;
		saveAccountProfile(profile);
		toast.success("Dados do perfil salvos neste dispositivo.");
	}
	const isCustomer = session?.role === "customer";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: isCustomer ? "Perfil da Conta" : session?.role === "administrative" ? "Perfil Administrativo" : "Perfil Corporativo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					children: isCustomer ? "Cliente" : session?.role === "administrative" ? "Admin Sentinel" : "Empresa"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "-mt-5 text-sm text-muted-foreground",
				children: "Dados associados à sessão autenticada. Não há configurações globais nem integrações conectadas neste módulo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: isCustomer ? "Dados pessoais e da empresa" : "Dados do usuário",
				description: "Informações locais desta conta"
			}), profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: save,
				className: "grid gap-4 p-5 sm:grid-cols-2",
				children: [
					isCustomer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1 text-xs font-medium text-muted-foreground",
						children: ["Empresa", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: profile.companyName ?? "",
							onChange: (event) => setProfile({
								...profile,
								companyName: event.target.value
							}),
							className: "w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm text-foreground"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1 text-xs font-medium text-muted-foreground",
						children: ["CNPJ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: profile.taxId ?? "",
							onChange: (event) => setProfile({
								...profile,
								taxId: event.target.value
							}),
							className: "w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm text-foreground"
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1 text-xs font-medium text-muted-foreground",
						children: ["Nome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: profile.fullName,
							onChange: (event) => setProfile({
								...profile,
								fullName: event.target.value,
								username: event.target.value
							}),
							className: "w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm text-foreground"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1 text-xs font-medium text-muted-foreground",
						children: ["E-mail da conta", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: session?.email ?? "",
							readOnly: true,
							className: "w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm text-muted-foreground"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1 text-xs font-medium text-muted-foreground",
						children: ["Telefone", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: profile.phone,
							onChange: (event) => setProfile({
								...profile,
								phone: event.target.value
							}),
							className: "w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm text-foreground"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-1 text-xs font-medium text-muted-foreground",
						children: ["E-mail alternativo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: profile.recoveryEmail,
							onChange: (event) => setProfile({
								...profile,
								recoveryEmail: event.target.value
							}),
							className: "w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm text-foreground"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90",
							children: "Salvar dados"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: "Os dados de perfil são armazenados localmente neste navegador; não são sincronizados com um backend."
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-5 text-sm text-muted-foreground",
				children: "Carregando perfil..."
			})] })
		]
	});
}
//#endregion
export { AccountSettings as t };
