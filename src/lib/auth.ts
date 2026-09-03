// Autenticação demo (somente frontend, persistida em localStorage)
export type Role = "corporate" | "customer";

const KEY = "sentinel_auth";
const USERS_KEY = "sentinel_users";

export const CREDENTIALS = {
  corporate: { email: "empresa@sentinel-demo.com", password: "Sentinel2026!" },
  customer: { email: "cliente@sentinel-demo.com", password: "SentinelClient2026!" },
};

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

type StoredUser = { name: string; email: string; password: string; role: Role };

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function persistSession(session: { role: Role; email: string; name: string }) {
  localStorage.setItem(KEY, JSON.stringify({ ...session, ts: Date.now() }));
  window.dispatchEvent(new Event("sentinel-auth-change"));
}

/** Cadastro de novo usuário. */
export function register(
  name: string,
  email: string,
  password: string,
  role: Role = "corporate",
): { ok: true } | { ok: false; error: string } {
  const mail = email.trim().toLowerCase();
  if (name.trim().length < 2) return { ok: false, error: "Informe seu nome completo." };
  if (!isEmailValid(mail)) return { ok: false, error: "E-mail inválido." };
  if (!isPasswordValid(password)) return { ok: false, error: "A senha não atende aos requisitos de segurança." };

  const users = readUsers();
  if (users.some((u) => u.email === mail) || Object.values(CREDENTIALS).some((c) => c.email === mail)) {
    return { ok: false, error: "Já existe uma conta com este e-mail." };
  }
  users.push({ name: name.trim(), email: mail, password, role });
  writeUsers(users);
  persistSession({ role, email: mail, name: name.trim() });
  return { ok: true };
}

/** Login por e-mail e senha (usuários cadastrados ou credenciais de demonstração). */
export function login(email: string, password: string): { ok: true; role: Role } | { ok: false; error: string } {
  const mail = email.trim().toLowerCase();
  if (!isEmailValid(mail)) return { ok: false, error: "E-mail inválido." };
  if (!password) return { ok: false, error: "Informe sua senha." };

  for (const [role, c] of Object.entries(CREDENTIALS) as [Role, { email: string; password: string }][]) {
    if (mail === c.email && password === c.password) {
      persistSession({ role, email: mail, name: role === "corporate" ? "Equipe Sentinel" : "Visitante" });
      return { ok: true, role };
    }
  }

  const user = readUsers().find((u) => u.email === mail);
  if (!user) return { ok: false, error: "Conta não encontrada. Verifique o e-mail ou cadastre-se." };
  if (user.password !== password) return { ok: false, error: "Senha incorreta." };

  persistSession({ role: user.role, email: user.email, name: user.name });
  return { ok: true, role: user.role };
}

/** Recuperação de senha (simulada). */
export function requestPasswordReset(email: string): { ok: true } | { ok: false; error: string } {
  const mail = email.trim().toLowerCase();
  if (!isEmailValid(mail)) return { ok: false, error: "E-mail inválido." };
  return { ok: true };
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("sentinel-auth-change"));
  }
}

export function getSession(): { role: Role; email: string; name?: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function firstName(session: { name?: string; email?: string } | null): string {
  if (!session) return "";
  if (session.name) return session.name.split(" ")[0];
  return session.email ? session.email.split("@")[0] : "";
}
