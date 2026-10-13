export type Role = "corporate" | "customer" | "administrative";

const KEY = "sentinel_auth";

export const CREDENTIALS = {
  corporate: { email: "empresa@sentinel-demo.com", password: "Sentinel2026!" },
  customer: { email: "cliente@sentinel-demo.com", password: "SentinelClient2026!" },
};

export function dashboardForRole(role: Role) {
  if (role === "administrative") return "/admin/dashboard";
  if (role === "corporate") return "/corporativo/dashboard";
  return "/cliente/dashboard";
}

export const PASSWORD_RULES = [
  { id: "len", label: "Pelo menos 8 caracteres", test: (v: string) => v.length >= 8 },
  { id: "upper", label: "Uma letra maiúscula", test: (v: string) => /[A-ZÀ-Þ]/.test(v) },
  { id: "lower", label: "Uma letra minúscula", test: (v: string) => /[a-zà-þ]/.test(v) },
  { id: "digit", label: "Um número", test: (v: string) => /\d/.test(v) },
  { id: "special", label: "Um caractere especial", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

export function isPasswordValid(v: string) {
  return PASSWORD_RULES.every((r) => r.test(v));
}

export function isEmailValid(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export type Session = { role: Role; email: string; name?: string };

function persistSession(session: Session) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify({ ...session, ts: Date.now() }));
  window.dispatchEvent(new Event("sentinel-auth-change"));
}

async function authRequest<T>(path: string, body?: Record<string, unknown>): Promise<T> {
  const response = await fetch(path, {
    method: body ? "POST" : "GET",
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  const data = await response.json() as T & { error?: string };
  if (!response.ok) throw new Error(data.error || "Serviço de autenticação indisponível.");
  return data;
}

/** Cadastro de novo usuário. */
export async function register(
  name: string,
  email: string,
  password: string,
  phone: string,
  role: Role = "corporate",
): Promise<{ ok: true } | { ok: false; error: string }> {
  const mail = email.trim().toLowerCase();
  if (name.trim().length < 2) return { ok: false, error: "Informe seu nome completo." };
  if (!isEmailValid(mail)) return { ok: false, error: "E-mail inválido." };
  if (!isPasswordValid(password)) return { ok: false, error: "A senha não atende aos requisitos de segurança." };

  try {
    const data = await authRequest<{ session: Session }>("/api/auth/register", { name: name.trim(), email: mail, password, phone, role });
    persistSession(data.session);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Não foi possível criar a conta." };
  }
}

/** Login por e-mail e senha (usuários cadastrados ou credenciais de demonstração). */
export async function login(email: string, password: string): Promise<{ ok: true; role: Role } | { ok: false; error: string }> {
  const mail = email.trim().toLowerCase();
  if (!isEmailValid(mail)) return { ok: false, error: "E-mail inválido." };
  if (!password) return { ok: false, error: "Informe sua senha." };

  try {
    const data = await authRequest<{ session: Session }>("/api/auth/login", { email: mail, password });
    persistSession(data.session);
    return { ok: true, role: data.session.role };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "E-mail ou senha inválidos." };
  }
}

/** Recuperação de senha (simulada). */
export function requestPasswordReset(email: string): { ok: true } | { ok: false; error: string } {
  const mail = email.trim().toLowerCase();
  if (!isEmailValid(mail)) return { ok: false, error: "E-mail inválido." };
  return { ok: true };
}

export async function logout() {
  if (typeof window !== "undefined") {
    try { await authRequest<{ ok: true }>("/api/auth/logout", {}); } catch { /* The local session must still be cleared. */ }
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("sentinel-auth-change"));
  }
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function getVerifiedSession(): Promise<Session | null> {
  try {
    const data = await authRequest<{ session: Session | null }>("/api/auth/session");
    return data.session;
  } catch {
    return null;
  }
}

export function firstName(session: { name?: string; email?: string } | null): string {
  if (!session) return "";
  if (session.name) return session.name.split(" ")[0];
  return session.email ? session.email.split("@")[0] : "";
}
