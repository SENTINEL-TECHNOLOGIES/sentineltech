// Frontend-only demo auth
export type Role = "corporate" | "customer";

const KEY = "sentinel_auth";

export const CREDENTIALS = {
  corporate: { email: "empresa@sentinel-demo.com", password: "Sentinel2026!" },
  customer: { email: "cliente@sentinel-demo.com", password: "SentinelClient2026!" },
};

export function login(role: Role, email: string, password: string): boolean {
  const c = CREDENTIALS[role];
  if (email.trim().toLowerCase() === c.email && password === c.password) {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEY, JSON.stringify({ role, email, ts: Date.now() }));
    }
    return true;
  }
  return false;
}

export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

export function getSession(): { role: Role; email: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
