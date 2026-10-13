import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as __exportAll } from "./server-BVfSGPBy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DrZdlpEH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/sentineltech/assets/styles-CP3gnEFy.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-gradient-blue",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Página não encontrada"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "A página que você procura não existe ou foi movida."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
					children: "Voltar ao início"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Esta página não carregou"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Algo deu errado."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						router.invalidate();
						reset();
					},
					className: "mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
					children: "Tentar novamente"
				})
			]
		})
	});
}
var Route$40 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Sentinel — Tecnologia em Segurança Física" },
			{
				name: "description",
				content: "Sentinel Technologies — CFTV com IA, controle de acesso biométrico, automação predial e monitoramento remoto 24/7 para empresas."
			},
			{
				property: "og:title",
				content: "Sentinel — Tecnologia em Segurança Física"
			},
			{
				property: "og:description",
				content: "Protegemos espaços físicos com vigilância inteligente, biometria, automação e monitoramento remoto 24/7."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:title",
				content: "Sentinel — Tecnologia em Segurança Física"
			},
			{
				name: "twitter:description",
				content: "Protegemos espaços físicos com vigilância inteligente, biometria, automação e monitoramento remoto 24/7."
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				type: "image/png",
				href: `/sentineltech/favicon.png`
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "dark bg-background text-foreground",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$40.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			theme: "dark",
			position: "top-right",
			richColors: true
		})]
	});
}
var $$splitComponentImporter$39 = () => import("./routes-DiduykZT.mjs");
var Route$39 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Sentinel — Plataforma de Tecnologia em Segurança Física" }, {
		name: "description",
		content: "CFTV com IA, controle de acesso biométrico, automação predial e monitoramento remoto 24/7 para instalações corporativas."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
var $$splitComponentImporter$38 = () => import("./cadastro-BzGXHdSy.mjs");
var Route$38 = createFileRoute("/cadastro")({
	head: () => ({ meta: [{ title: "Criar conta — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
var $$splitComponentImporter$37 = () => import("./explore-CgjJXN5v.mjs");
var Route$37 = createFileRoute("/explore")({ component: lazyRouteComponent($$splitComponentImporter$37, "component") });
var $$splitComponentImporter$36 = () => import("./login-yUrrqn9p.mjs");
var Route$36 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Entrar — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./login-admin-BujNwz4x.mjs");
var Route$35 = createFileRoute("/login-admin")({
	head: () => ({ meta: [{ title: "Acesso Administrativo — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./login-corporate-DYCrxua0.mjs");
var Route$34 = createFileRoute("/login-corporate")({
	head: () => ({ meta: [{ title: "Acesso Corporativo — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./login-customer-9_Ctxsvl.mjs");
var Route$33 = createFileRoute("/login-customer")({
	head: () => ({ meta: [{ title: "Acesso do Cliente — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./portal-JvcgM4kI.mjs");
var Route$32 = createFileRoute("/portal")({ component: lazyRouteComponent($$splitComponentImporter$32, "component") });
var $$splitComponentImporter$31 = () => import("./recuperar-senha-Bg3iIE09.mjs");
var Route$31 = createFileRoute("/recuperar-senha")({
	head: () => ({ meta: [{ title: "Recuperar senha — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./admin.audit-DMz6drNO.mjs");
var Route$30 = createFileRoute("/admin/audit")({
	head: () => ({ meta: [{ title: "Logs e Auditoria — Administração Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./admin.companies-BPl9bwp3.mjs");
var Route$29 = createFileRoute("/admin/companies")({
	head: () => ({ meta: [{ title: "Empresas — Administração Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./admin.dashboard-D83b-aD5.mjs");
var Route$28 = createFileRoute("/admin/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard Administrativo — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./admin.devices-CDJKSqER.mjs");
var Route$27 = createFileRoute("/admin/devices")({
	head: () => ({ meta: [{ title: "Câmeras e Dispositivos — Administração Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./admin.profile-C9wmoWAL.mjs");
var Route$26 = createFileRoute("/admin/profile")({
	head: () => ({ meta: [{ title: "Perfil Administrativo — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./admin.settings-AsD-2JBh.mjs");
var Route$25 = createFileRoute("/admin/settings")({
	head: () => ({ meta: [{ title: "Configurações — Administração Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./admin.users-B3k5uMO3.mjs");
var Route$24 = createFileRoute("/admin/users")({
	head: () => ({ meta: [{ title: "Usuários — Administração Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./cliente.dashboard-BdRPH_PA.mjs");
var Route$23 = createFileRoute("/cliente/dashboard")({
	head: () => ({ meta: [{ title: "Visão Geral do Cliente — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./corporativo.dashboard-CKqqH963.mjs");
var Route$22 = createFileRoute("/corporativo/dashboard")({
	head: () => ({ meta: [{ title: "Centro de Comando Corporativo — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./corporativo.users-D-OPca_l.mjs");
var Route$21 = createFileRoute("/corporativo/users")({
	head: () => ({ meta: [{ title: "Usuários da Empresa — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./explore.about-DFKjDHdZ.mjs");
var Route$20 = createFileRoute("/explore/about")({
	head: () => ({ meta: [
		{ title: "Sobre — Sentinel" },
		{
			name: "description",
			content: "A Sentinel protege espaços físicos com monitoramento inteligente e uma central ativa 24 horas."
		},
		{
			property: "og:title",
			content: "Sobre — Sentinel"
		},
		{
			property: "og:description",
			content: "Tecnologia brasileira de segurança física, monitorada 24 horas."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./explore.case-studies-qfqdxyxs.mjs");
var Route$19 = createFileRoute("/explore/case-studies")({
	head: () => ({ meta: [{ title: "Cases de Sucesso — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./explore.checkout-CCSerAiK.mjs");
var Route$18 = createFileRoute("/explore/checkout")({
	validateSearch: (search) => ({ service: typeof search.service === "string" ? search.service : "sentinel-core" }),
	head: () => ({ meta: [{ title: "Contratação — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./explore.contact-DUmOkD9Y.mjs");
var Route$17 = createFileRoute("/explore/contact")({
	head: () => ({ meta: [{ title: "Contato — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./explore.home-DFN__KJG.mjs");
var Route$16 = createFileRoute("/explore/home")({
	head: () => ({ meta: [
		{ title: "Sentinel — Monitoramento Inteligente em Tempo Real" },
		{
			name: "description",
			content: "Plataforma de segurança física que reúne câmeras, acessos e alertas em um só painel, com monitoramento 24/7."
		},
		{
			property: "og:title",
			content: "Sentinel — Monitoramento Inteligente em Tempo Real"
		},
		{
			property: "og:description",
			content: "Toda a sua segurança em um único painel, com alertas em tempo real."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./explore.industries-cRQ0nEHJ.mjs");
var Route$15 = createFileRoute("/explore/industries")({
	head: () => ({ meta: [
		{ title: "Para quem é — Sentinel" },
		{
			name: "description",
			content: "Empresas, condomínios, poder público e operações logísticas monitorados pela plataforma Sentinel."
		},
		{
			property: "og:title",
			content: "Para quem é — Sentinel"
		},
		{
			property: "og:description",
			content: "Segurança monitorada para empresas, condomínios, cidades e indústria."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./explore.meeting-kkAwO0GK.mjs");
var Route$14 = createFileRoute("/explore/meeting")({
	head: () => ({ meta: [{ title: "Agendar Reunião — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./explore.proposal-CWjXLJxk.mjs");
var Route$13 = createFileRoute("/explore/proposal")({
	head: () => ({ meta: [{ title: "Solicitar Proposta — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./explore.services-7O8KBpFm.mjs");
var Route$12 = createFileRoute("/explore/services")({
	head: () => ({ meta: [{ title: "Serviços — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./portal.ai-cctv-BQbDwA04.mjs");
var Route$11 = createFileRoute("/portal/ai-cctv")({
	head: () => ({ meta: [{ title: "CFTV com IA — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
Array.from({ length: 24 }, (_, i) => ({
	h: `${String(i).padStart(2, "0")}h`,
	pessoas: 80 + Math.round(Math.max(0, 200 - Math.abs(i - 12) * 18) + Math.random() * 30),
	veiculos: 30 + Math.round(Math.max(0, 90 - Math.abs(i - 9) * 8) + Math.random() * 18),
	objetos: 12 + Math.round(Math.random() * 28)
}));
var $$splitComponentImporter$10 = () => import("./portal.automation-D4i53R47.mjs");
var Route$10 = createFileRoute("/portal/automation")({
	head: () => ({ meta: [{ title: "Automação Predial — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./portal.billing-Dz8gYdQ_.mjs");
var Route$9 = createFileRoute("/portal/billing")({
	head: () => ({ meta: [{ title: "Financeiro — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./portal.biometric-DIGUpir2.mjs");
var Route$8 = createFileRoute("/portal/biometric")({
	head: () => ({ meta: [{ title: "Controle de Acesso — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./portal.dashboard-DHz8zaLE.mjs");
var Route$7 = createFileRoute("/portal/dashboard")({
	head: () => ({ meta: [{ title: "Operações — Portal Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./portal.infrastructure-Omun-EPZ.mjs");
var Route$6 = createFileRoute("/portal/infrastructure")({
	head: () => ({ meta: [{ title: "Instalações — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./portal.monitoring-Ba-CYT5w.mjs");
var Route$5 = createFileRoute("/portal/monitoring")({
	head: () => ({ meta: [{ title: "Centro de Comando — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./portal.projects-FWOJy3mW.mjs");
var Route$4 = createFileRoute("/portal/projects")({
	head: () => ({ meta: [{ title: "Projetos — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./portal.remote-DMeHRYBJ.mjs");
var Route$3 = createFileRoute("/portal/remote")({
	head: () => ({ meta: [{ title: "Monitoramento Remoto — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./portal.reports-D4owBy62.mjs");
var Route$2 = createFileRoute("/portal/reports")({
	head: () => ({ meta: [{ title: "Relatórios — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./portal.settings-Di8PB359.mjs");
var Route$1 = createFileRoute("/portal/settings")({
	head: () => ({ meta: [{ title: "Configurações — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./portal.tickets-o06pQ0_2.mjs");
var Route = createFileRoute("/portal/tickets")({
	head: () => ({ meta: [{ title: "Chamados — Sentinel" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$39.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$40
});
var CadastroRoute = Route$38.update({
	id: "/cadastro",
	path: "/cadastro",
	getParentRoute: () => Route$40
});
var ExploreRoute = Route$37.update({
	id: "/explore",
	path: "/explore",
	getParentRoute: () => Route$40
});
var LoginRoute = Route$36.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$40
});
var LoginAdminRoute = Route$35.update({
	id: "/login-admin",
	path: "/login-admin",
	getParentRoute: () => Route$40
});
var LoginCorporateRoute = Route$34.update({
	id: "/login-corporate",
	path: "/login-corporate",
	getParentRoute: () => Route$40
});
var LoginCustomerRoute = Route$33.update({
	id: "/login-customer",
	path: "/login-customer",
	getParentRoute: () => Route$40
});
var PortalRoute = Route$32.update({
	id: "/portal",
	path: "/portal",
	getParentRoute: () => Route$40
});
var RecuperarSenhaRoute = Route$31.update({
	id: "/recuperar-senha",
	path: "/recuperar-senha",
	getParentRoute: () => Route$40
});
var AdminAuditRoute = Route$30.update({
	id: "/admin/audit",
	path: "/admin/audit",
	getParentRoute: () => Route$40
});
var AdminCompaniesRoute = Route$29.update({
	id: "/admin/companies",
	path: "/admin/companies",
	getParentRoute: () => Route$40
});
var AdminDashboardRoute = Route$28.update({
	id: "/admin/dashboard",
	path: "/admin/dashboard",
	getParentRoute: () => Route$40
});
var AdminDevicesRoute = Route$27.update({
	id: "/admin/devices",
	path: "/admin/devices",
	getParentRoute: () => Route$40
});
var AdminProfileRoute = Route$26.update({
	id: "/admin/profile",
	path: "/admin/profile",
	getParentRoute: () => Route$40
});
var AdminSettingsRoute = Route$25.update({
	id: "/admin/settings",
	path: "/admin/settings",
	getParentRoute: () => Route$40
});
var AdminUsersRoute = Route$24.update({
	id: "/admin/users",
	path: "/admin/users",
	getParentRoute: () => Route$40
});
var ClienteDashboardRoute = Route$23.update({
	id: "/cliente/dashboard",
	path: "/cliente/dashboard",
	getParentRoute: () => Route$40
});
var CorporativoDashboardRoute = Route$22.update({
	id: "/corporativo/dashboard",
	path: "/corporativo/dashboard",
	getParentRoute: () => Route$40
});
var CorporativoUsersRoute = Route$21.update({
	id: "/corporativo/users",
	path: "/corporativo/users",
	getParentRoute: () => Route$40
});
var ExploreAboutRoute = Route$20.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => ExploreRoute
});
var ExploreCaseStudiesRoute = Route$19.update({
	id: "/case-studies",
	path: "/case-studies",
	getParentRoute: () => ExploreRoute
});
var ExploreCheckoutRoute = Route$18.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => ExploreRoute
});
var ExploreContactRoute = Route$17.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => ExploreRoute
});
var ExploreHomeRoute = Route$16.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => ExploreRoute
});
var ExploreIndustriesRoute = Route$15.update({
	id: "/industries",
	path: "/industries",
	getParentRoute: () => ExploreRoute
});
var ExploreMeetingRoute = Route$14.update({
	id: "/meeting",
	path: "/meeting",
	getParentRoute: () => ExploreRoute
});
var ExploreProposalRoute = Route$13.update({
	id: "/proposal",
	path: "/proposal",
	getParentRoute: () => ExploreRoute
});
var ExploreServicesRoute = Route$12.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => ExploreRoute
});
var PortalAiCctvRoute = Route$11.update({
	id: "/ai-cctv",
	path: "/ai-cctv",
	getParentRoute: () => PortalRoute
});
var PortalAutomationRoute = Route$10.update({
	id: "/automation",
	path: "/automation",
	getParentRoute: () => PortalRoute
});
var PortalBillingRoute = Route$9.update({
	id: "/billing",
	path: "/billing",
	getParentRoute: () => PortalRoute
});
var PortalBiometricRoute = Route$8.update({
	id: "/biometric",
	path: "/biometric",
	getParentRoute: () => PortalRoute
});
var PortalDashboardRoute = Route$7.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => PortalRoute
});
var PortalInfrastructureRoute = Route$6.update({
	id: "/infrastructure",
	path: "/infrastructure",
	getParentRoute: () => PortalRoute
});
var PortalMonitoringRoute = Route$5.update({
	id: "/monitoring",
	path: "/monitoring",
	getParentRoute: () => PortalRoute
});
var PortalProjectsRoute = Route$4.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => PortalRoute
});
var PortalRemoteRoute = Route$3.update({
	id: "/remote",
	path: "/remote",
	getParentRoute: () => PortalRoute
});
var PortalReportsRoute = Route$2.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => PortalRoute
});
var PortalSettingsRoute = Route$1.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => PortalRoute
});
var PortalTicketsRoute = Route.update({
	id: "/tickets",
	path: "/tickets",
	getParentRoute: () => PortalRoute
});
var ExploreRouteChildren = {
	ExploreAboutRoute,
	ExploreCaseStudiesRoute,
	ExploreCheckoutRoute,
	ExploreContactRoute,
	ExploreHomeRoute,
	ExploreIndustriesRoute,
	ExploreMeetingRoute,
	ExploreProposalRoute,
	ExploreServicesRoute
};
var ExploreRouteWithChildren = ExploreRoute._addFileChildren(ExploreRouteChildren);
var PortalRouteChildren = {
	PortalAiCctvRoute,
	PortalAutomationRoute,
	PortalBillingRoute,
	PortalBiometricRoute,
	PortalDashboardRoute,
	PortalInfrastructureRoute,
	PortalMonitoringRoute,
	PortalProjectsRoute,
	PortalRemoteRoute,
	PortalReportsRoute,
	PortalSettingsRoute,
	PortalTicketsRoute
};
var rootRouteChildren = {
	IndexRoute,
	CadastroRoute,
	ExploreRoute: ExploreRouteWithChildren,
	LoginRoute,
	LoginAdminRoute,
	LoginCorporateRoute,
	LoginCustomerRoute,
	PortalRoute: PortalRoute._addFileChildren(PortalRouteChildren),
	RecuperarSenhaRoute,
	AdminAuditRoute,
	AdminCompaniesRoute,
	AdminDashboardRoute,
	AdminDevicesRoute,
	AdminProfileRoute,
	AdminSettingsRoute,
	AdminUsersRoute,
	ClienteDashboardRoute,
	CorporativoDashboardRoute,
	CorporativoUsersRoute
};
var routeTree = Route$40._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		basepath: "/sentineltech/".replace(/\/$/, ""),
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route$18 as n, router_exports as t };
