import { r as __exportAll } from "../_runtime.mjs";
import { t as Pool } from "../_libs/pg.mjs";
import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
//#region node_modules/.nitro/vite/services/ssr/index.js
var ssr_exports = /* @__PURE__ */ __exportAll({
	default: () => server_default,
	t: () => renderErrorPage
});
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/sentineltech/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
var scrypt$1 = promisify(scrypt);
var SESSION_COOKIE = "sentinel_session";
var SESSION_TTL_SECONDS = 2592e3;
var pool;
function getPool() {
	if (!pool) {
		const connectionString = process.env.DATABASE_URL;
		if (!connectionString) throw new Error("DATABASE_URL não configurada.");
		pool = new Pool({
			connectionString,
			max: 10
		});
	}
	return pool;
}
function normalizeEmail(email) {
	return email.trim().toLowerCase();
}
function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function normalizePhone(phone) {
	return phone.replace(/\D/g, "");
}
async function hashPassword(password) {
	const salt = randomBytes(16).toString("hex");
	return `${salt}:${(await scrypt$1(password, salt, 64)).toString("hex")}`;
}
async function verifyPassword(password, storedHash) {
	const [salt, key] = storedHash.split(":");
	if (!salt || !key) return false;
	const derivedKey = await scrypt$1(password, salt, 64);
	const storedKey = Buffer.from(key, "hex");
	return storedKey.length === derivedKey.length && timingSafeEqual(storedKey, derivedKey);
}
function hashSession(token) {
	return createHash("sha256").update(token).digest("hex");
}
function readCookie(request, name) {
	const cookie = (request.headers.get("cookie") ?? "").split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
	return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null;
}
function json(data, init = {}) {
	return new Response(JSON.stringify(data), {
		...init,
		headers: {
			"content-type": "application/json",
			...init.headers
		}
	});
}
function sessionCookie(token, maxAge = SESSION_TTL_SECONDS) {
	return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; Secure`;
}
async function createSession(userId) {
	const token = randomBytes(32).toString("base64url");
	await getPool().query("INSERT INTO auth_sessions (token_hash, user_id, expires_at) VALUES ($1, $2, NOW() + INTERVAL '30 days')", [hashSession(token), userId]);
	return token;
}
async function currentSession(request) {
	const token = readCookie(request, SESSION_COOKIE);
	if (!token) return null;
	return (await getPool().query(`SELECT u.role, u.email, u.name
     FROM auth_sessions s JOIN auth_users u ON u.id = s.user_id
     WHERE s.token_hash = $1 AND s.expires_at > NOW()`, [hashSession(token)])).rows[0] ?? null;
}
async function parseBody(request) {
	try {
		return await request.json();
	} catch {
		return null;
	}
}
async function handleAuthRequest(request) {
	const url = new URL(request.url);
	if (!url.pathname.startsWith("/api/auth/")) return null;
	try {
		if (request.method === "GET" && url.pathname === "/api/auth/session") return json({ session: await currentSession(request) });
		if (request.method === "POST" && url.pathname === "/api/auth/register") {
			const body = await parseBody(request);
			const email = body?.email ? normalizeEmail(body.email) : "";
			const name = body?.name?.trim() ?? "";
			const password = body?.password ?? "";
			const phone = body?.phone ? normalizePhone(body.phone) : "";
			if (name.length < 2 || !isValidEmail(email) || password.length < 8 || phone.length !== 10 && phone.length !== 11) return json({ error: "Informe nome, e-mail válido, telefone válido e uma senha segura." }, { status: 400 });
			if ((await getPool().query("SELECT 1 FROM auth_users WHERE email = $1", [email])).rowCount) return json({ error: "Já existe uma conta com este e-mail." }, { status: 409 });
			const passwordHash = await hashPassword(password);
			const user = (await getPool().query("INSERT INTO auth_users (name, email, phone, password_hash, role) VALUES ($1, $2, $3, $4, 'customer') RETURNING id, role, email, name", [
				name,
				email,
				phone,
				passwordHash
			])).rows[0];
			const token = await createSession(user.id);
			return json({ session: {
				role: user.role,
				email: user.email,
				name: user.name
			} }, { headers: { "set-cookie": sessionCookie(token) } });
		}
		if (request.method === "POST" && url.pathname === "/api/auth/login") {
			const body = await parseBody(request);
			const email = body?.email ? normalizeEmail(body.email) : "";
			const password = body?.password ?? "";
			const user = (await getPool().query("SELECT id, role, email, name, password_hash FROM auth_users WHERE email = $1", [email])).rows[0];
			if (!user || !await verifyPassword(password, user.password_hash)) return json({ error: "E-mail ou senha inválidos." }, { status: 401 });
			const token = await createSession(user.id);
			return json({ session: {
				role: user.role,
				email: user.email,
				name: user.name
			} }, { headers: { "set-cookie": sessionCookie(token) } });
		}
		if (request.method === "POST" && url.pathname === "/api/auth/logout") {
			const token = readCookie(request, SESSION_COOKIE);
			if (token) await getPool().query("DELETE FROM auth_sessions WHERE token_hash = $1", [hashSession(token)]);
			return json({ ok: true }, { headers: { "set-cookie": sessionCookie("", 0) } });
		}
		return json({ error: "Rota de autenticação não encontrada." }, { status: 404 });
	} catch (error) {
		console.error("Auth request failed", error);
		if (error instanceof Error && error.message === "DATABASE_URL não configurada.") return json({ error: "DATABASE_URL não configurada. Crie o arquivo .env e reinicie o servidor." }, { status: 503 });
		return json({ error: "Serviço de autenticação indisponível." }, { status: 503 });
	}
}
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-BVfSGPBy.mjs").then((n) => n.t).then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!body.includes("\"unhandled\":true") || !body.includes("\"message\":\"HTTPError\"")) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
var server_default = { async fetch(request, env, ctx) {
	try {
		const authResponse = await handleAuthRequest(request);
		if (authResponse) return authResponse;
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { server_default as default, ssr_exports as n, renderErrorPage as t };
