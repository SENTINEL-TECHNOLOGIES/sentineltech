// Frontend-only demo auth
export type Role = "corporate" | "customer";

const KEY = "sentinel_auth";

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

export function login(role: Role, email: string, password: string, name?: string): boolean {
  const c = CREDENTIALS[role];
  if (email.trim().toLowerCase() === c.email && password === c.password) {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEY, JSON.stringify({ role, email, name: name?.trim() || "", ts: Date.now() }));
      window.dispatchEvent(new Event("sentinel-auth-change"));
    }
    return true;
  }
  return false;
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
