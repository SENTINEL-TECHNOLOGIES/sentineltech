import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { Pool } from "pg";

import type { Role } from "./auth";

const scrypt = promisify(scryptCallback);
const SESSION_COOKIE = "sentinel_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
let pool: Pool | undefined;

type AuthBody = { name?: string; email?: string; password?: string; phone?: string; role?: Role };

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error("DATABASE_URL não configurada.");
    pool = new Pool({ connectionString, max: 10 });
  }
  return pool;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function verifyPassword(password: string, storedHash: string) {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;
  const derivedKey = await scrypt(password, salt, 64) as Buffer;
  const storedKey = Buffer.from(key, "hex");
  return storedKey.length === derivedKey.length && timingSafeEqual(storedKey, derivedKey);
}

function hashSession(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function readCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookie = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null;
}

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json", ...init.headers },
  });
}

function sessionCookie(token: string, maxAge = SESSION_TTL_SECONDS) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  await getPool().query(
    "INSERT INTO auth_sessions (token_hash, user_id, expires_at) VALUES ($1, $2, NOW() + INTERVAL '30 days')",
    [hashSession(token), userId],
  );
  return token;
}

async function currentSession(request: Request) {
  const token = readCookie(request, SESSION_COOKIE);
  if (!token) return null;
  const result = await getPool().query<{ role: Role; email: string; name: string }>(
    `SELECT u.role, u.email, u.name
     FROM auth_sessions s JOIN auth_users u ON u.id = s.user_id
     WHERE s.token_hash = $1 AND s.expires_at > NOW()`,
    [hashSession(token)],
  );
  return result.rows[0] ?? null;
}

async function parseBody(request: Request) {
  try {
    return await request.json() as AuthBody;
  } catch {
    return null;
  }
}

export async function handleAuthRequest(request: Request) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/auth/")) return null;

  try {
    if (request.method === "GET" && url.pathname === "/api/auth/session") {
      return json({ session: await currentSession(request) });
    }

    if (request.method === "POST" && url.pathname === "/api/auth/register") {
      const body = await parseBody(request);
      const email = body?.email ? normalizeEmail(body.email) : "";
      const name = body?.name?.trim() ?? "";
      const password = body?.password ?? "";
      const phone = body?.phone ? normalizePhone(body.phone) : "";
      if (name.length < 2 || !isValidEmail(email) || password.length < 8 || (phone.length !== 10 && phone.length !== 11)) {
        return json({ error: "Informe nome, e-mail válido, telefone válido e uma senha segura." }, { status: 400 });
      }

      const existing = await getPool().query("SELECT 1 FROM auth_users WHERE email = $1", [email]);
      if (existing.rowCount) return json({ error: "Já existe uma conta com este e-mail." }, { status: 409 });
      const passwordHash = await hashPassword(password);
      const created = await getPool().query<{ id: string; role: Role; email: string; name: string }>(
        "INSERT INTO auth_users (name, email, phone, password_hash, role) VALUES ($1, $2, $3, $4, 'customer') RETURNING id, role, email, name",
        [name, email, phone, passwordHash],
      );
      const user = created.rows[0];
      const token = await createSession(user.id);
      return json({ session: { role: user.role, email: user.email, name: user.name } }, { headers: { "set-cookie": sessionCookie(token) } });
    }

    if (request.method === "POST" && url.pathname === "/api/auth/login") {
      const body = await parseBody(request);
      const email = body?.email ? normalizeEmail(body.email) : "";
      const password = body?.password ?? "";
      const result = await getPool().query<{ id: string; role: Role; email: string; name: string; password_hash: string }>(
        "SELECT id, role, email, name, password_hash FROM auth_users WHERE email = $1",
        [email],
      );
      const user = result.rows[0];
      if (!user || !(await verifyPassword(password, user.password_hash))) return json({ error: "E-mail ou senha inválidos." }, { status: 401 });
      const token = await createSession(user.id);
      return json({ session: { role: user.role, email: user.email, name: user.name } }, { headers: { "set-cookie": sessionCookie(token) } });
    }

    if (request.method === "POST" && url.pathname === "/api/auth/logout") {
      const token = readCookie(request, SESSION_COOKIE);
      if (token) await getPool().query("DELETE FROM auth_sessions WHERE token_hash = $1", [hashSession(token)]);
      return json({ ok: true }, { headers: { "set-cookie": sessionCookie("", 0) } });
    }

    return json({ error: "Rota de autenticação não encontrada." }, { status: 404 });
  } catch (error) {
    console.error("Auth request failed", error);
    if (error instanceof Error && error.message === "DATABASE_URL não configurada.") {
      return json({ error: "DATABASE_URL não configurada. Crie o arquivo .env e reinicie o servidor." }, { status: 503 });
    }
    return json({ error: "Serviço de autenticação indisponível." }, { status: 503 });
  }
}