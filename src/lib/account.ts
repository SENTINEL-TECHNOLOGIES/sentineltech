import { getSession } from "@/lib/auth";

export type AccountProfile = {
  fullName: string;
  companyName?: string;
  taxId?: string;
  username: string;
  email: string;
  phone: string;
  recoveryEmail: string;
  address: {
    zip: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
  };
};

export type ServiceId = "sentinel-core" | "sentinel-access" | "sentinel-24x7" | "sentinel-automation";
export type ActiveService = { serviceId: ServiceId; activatedAt: number; paymentId: string };

export const SERVICE_CATALOG: Array<{
  id: ServiceId;
  name: string;
  description: string;
  features: string[];
  price: number;
  period: "mês" | "ano" | "único";
}> = [
  { id: "sentinel-core", name: "Sentinel Core", description: "Monitoramento central para câmeras e sensores.", features: ["Dashboard operacional", "Eventos em tempo real", "Até 10 dispositivos"], price: 249, period: "mês" },
  { id: "sentinel-access", name: "Controle de Acesso", description: "Gestão de acessos, visitantes e biometria.", features: ["Histórico de entradas", "Visitantes", "Leitores biométricos"], price: 399, period: "mês" },
  { id: "sentinel-24x7", name: "Central 24/7", description: "Supervisão contínua com resposta operacional.", features: ["Central 24 horas", "Alertas prioritários", "Relatórios mensais"], price: 899, period: "mês" },
  { id: "sentinel-automation", name: "Automação Predial", description: "Regras simuladas para portões, alarmes e iluminação.", features: ["Cenas automáticas", "Agendamentos", "Controle por ambiente"], price: 549, period: "mês" },
];

const PROFILE_KEY = "sentinel:profile";
const SERVICES_KEY = "sentinel:services";

function key(base: string) {
  const email = getSession()?.email?.trim().toLowerCase();
  return email ? `${base}:${email}` : base;
}

export function getAccountProfile(): AccountProfile | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(key(PROFILE_KEY)) || "null") as AccountProfile | null; } catch { return null; }
}

export function saveAccountProfile(profile: AccountProfile) {
  localStorage.setItem(key(PROFILE_KEY), JSON.stringify(profile));
  window.dispatchEvent(new Event("sentinel-account-change"));
}

export function getActiveServices(): ActiveService[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(key(SERVICES_KEY)) || "[]") as ActiveService[]; } catch { return []; }
}

export function activateService(serviceId: ServiceId): ActiveService {
  const next = { serviceId, activatedAt: Date.now(), paymentId: `mock-${Date.now().toString(36)}` };
  const services = getActiveServices().filter((service) => service.serviceId !== serviceId);
  localStorage.setItem(key(SERVICES_KEY), JSON.stringify([...services, next]));
  window.dispatchEvent(new Event("sentinel-account-change"));
  return next;
}

export function getService(serviceId: ServiceId) {
  return SERVICE_CATALOG.find((service) => service.id === serviceId);
}
