import { a as getSession } from "./auth-XT4XOf5W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-DOgxP7m4.js
var SERVICE_CATALOG = [
	{
		id: "sentinel-core",
		name: "Sentinel Core",
		description: "Monitoramento central para câmeras e sensores.",
		features: [
			"Dashboard operacional",
			"Eventos em tempo real",
			"Até 10 dispositivos"
		],
		price: 249,
		period: "mês"
	},
	{
		id: "sentinel-access",
		name: "Controle de Acesso",
		description: "Gestão de acessos, visitantes e biometria.",
		features: [
			"Histórico de entradas",
			"Visitantes",
			"Leitores biométricos"
		],
		price: 399,
		period: "mês"
	},
	{
		id: "sentinel-24x7",
		name: "Central 24/7",
		description: "Supervisão contínua com resposta operacional.",
		features: [
			"Central 24 horas",
			"Alertas prioritários",
			"Relatórios mensais"
		],
		price: 899,
		period: "mês"
	},
	{
		id: "sentinel-automation",
		name: "Automação Predial",
		description: "Regras simuladas para portões, alarmes e iluminação.",
		features: [
			"Cenas automáticas",
			"Agendamentos",
			"Controle por ambiente"
		],
		price: 549,
		period: "mês"
	}
];
var PROFILE_KEY = "sentinel:profile";
var SERVICES_KEY = "sentinel:services";
function key(base) {
	const email = getSession()?.email?.trim().toLowerCase();
	return email ? `${base}:${email}` : base;
}
function getAccountProfile() {
	if (typeof window === "undefined") return null;
	try {
		return JSON.parse(localStorage.getItem(key(PROFILE_KEY)) || "null");
	} catch {
		return null;
	}
}
function saveAccountProfile(profile) {
	localStorage.setItem(key(PROFILE_KEY), JSON.stringify(profile));
	window.dispatchEvent(new Event("sentinel-account-change"));
}
function getActiveServices() {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(localStorage.getItem(key(SERVICES_KEY)) || "[]");
	} catch {
		return [];
	}
}
function activateService(serviceId) {
	const next = {
		serviceId,
		activatedAt: Date.now(),
		paymentId: `mock-${Date.now().toString(36)}`
	};
	const services = getActiveServices().filter((service) => service.serviceId !== serviceId);
	localStorage.setItem(key(SERVICES_KEY), JSON.stringify([...services, next]));
	window.dispatchEvent(new Event("sentinel-account-change"));
	return next;
}
function getService(serviceId) {
	return SERVICE_CATALOG.find((service) => service.id === serviceId);
}
//#endregion
export { getService as a, getActiveServices as i, activateService as n, saveAccountProfile as o, getAccountProfile as r, SERVICE_CATALOG as t };
