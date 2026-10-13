//#region node_modules/.nitro/vite/services/ssr/assets/auth-XT4XOf5W.js
var KEY = "sentinel_auth";
var CREDENTIALS = {
	corporate: {
		email: "empresa@sentinel-demo.com",
		password: "Sentinel2026!"
	},
	customer: {
		email: "cliente@sentinel-demo.com",
		password: "SentinelClient2026!"
	}
};
function dashboardForRole(role) {
	if (role === "administrative") return "/admin/dashboard";
	if (role === "corporate") return "/corporativo/dashboard";
	return "/cliente/dashboard";
}
var PASSWORD_RULES = [
	{
		id: "len",
		label: "Pelo menos 8 caracteres",
		test: (v) => v.length >= 8
	},
	{
		id: "upper",
		label: "Uma letra maiúscula",
		test: (v) => /[A-ZÀ-Þ]/.test(v)
	},
	{
		id: "lower",
		label: "Uma letra minúscula",
		test: (v) => /[a-zà-þ]/.test(v)
	},
	{
		id: "digit",
		label: "Um número",
		test: (v) => /\d/.test(v)
	},
	{
		id: "special",
		label: "Um caractere especial",
		test: (v) => /[^A-Za-z0-9]/.test(v)
	}
];
function isPasswordValid(v) {
	return PASSWORD_RULES.every((r) => r.test(v));
}
function isEmailValid(v) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function persistSession(session) {
	if (typeof window === "undefined") return;
	localStorage.setItem(KEY, JSON.stringify({
		...session,
		ts: Date.now()
	}));
	window.dispatchEvent(new Event("sentinel-auth-change"));
}
async function authRequest(path, body) {
	const response = await fetch(path, {
		method: body ? "POST" : "GET",
		headers: body ? { "content-type": "application/json" } : void 0,
		body: body ? JSON.stringify(body) : void 0,
		credentials: "include"
	});
	const data = await response.json();
	if (!response.ok) throw new Error(data.error || "Serviço de autenticação indisponível.");
	return data;
}
/** Cadastro de novo usuário. */
async function register(name, email, password, phone, role = "corporate") {
	const mail = email.trim().toLowerCase();
	if (name.trim().length < 2) return {
		ok: false,
		error: "Informe seu nome completo."
	};
	if (!isEmailValid(mail)) return {
		ok: false,
		error: "E-mail inválido."
	};
	if (!isPasswordValid(password)) return {
		ok: false,
		error: "A senha não atende aos requisitos de segurança."
	};
	try {
		persistSession((await authRequest("/api/auth/register", {
			name: name.trim(),
			email: mail,
			password,
			phone,
			role
		})).session);
		return { ok: true };
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : "Não foi possível criar a conta."
		};
	}
}
/** Login por e-mail e senha (usuários cadastrados ou credenciais de demonstração). */
async function login(email, password) {
	const mail = email.trim().toLowerCase();
	if (!isEmailValid(mail)) return {
		ok: false,
		error: "E-mail inválido."
	};
	if (!password) return {
		ok: false,
		error: "Informe sua senha."
	};
	try {
		const data = await authRequest("/api/auth/login", {
			email: mail,
			password
		});
		persistSession(data.session);
		return {
			ok: true,
			role: data.session.role
		};
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : "E-mail ou senha inválidos."
		};
	}
}
/** Recuperação de senha (simulada). */
function requestPasswordReset(email) {
	if (!isEmailValid(email.trim().toLowerCase())) return {
		ok: false,
		error: "E-mail inválido."
	};
	return { ok: true };
}
async function logout() {
	if (typeof window !== "undefined") {
		try {
			await authRequest("/api/auth/logout", {});
		} catch {}
		localStorage.removeItem(KEY);
		window.dispatchEvent(new Event("sentinel-auth-change"));
	}
}
function getSession() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
async function getVerifiedSession() {
	try {
		return (await authRequest("/api/auth/session")).session;
	} catch {
		return null;
	}
}
function firstName(session) {
	if (!session) return "";
	if (session.name) return session.name.split(" ")[0];
	return session.email ? session.email.split("@")[0] : "";
}
//#endregion
export { getSession as a, isPasswordValid as c, register as d, requestPasswordReset as f, firstName as i, login as l, PASSWORD_RULES as n, getVerifiedSession as o, dashboardForRole as r, isEmailValid as s, CREDENTIALS as t, logout as u };
