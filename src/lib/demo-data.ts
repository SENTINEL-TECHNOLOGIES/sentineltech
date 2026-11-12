import type { AccountProfile, ActiveService } from "./account";
import type { SecurityDevice } from "./devices";

type DemoTicket = {
  id: string;
  title: string;
  priority: string;
  status: string;
  date: string;
};

const demoAccounts = {
  "empresa@sentinel-demo.com": {
    role: "corporate",
    profile: {
      fullName: "Equipe Sentinel",
      companyName: "Aurora Logística Demonstrativa",
      taxId: "00.000.000/0001-00",
      username: "Equipe Sentinel",
      email: "empresa@sentinel-demo.com",
      phone: "(11) 4000-0101",
      recoveryEmail: "suporte@aurora-demo.example",
      address: {
        zip: "01000-000",
        state: "SP",
        city: "São Paulo",
        neighborhood: "Centro",
        street: "Rua das Amostras",
        number: "100",
        complement: "Unidade demonstrativa",
      },
    } satisfies AccountProfile,
    devices: (
      [
        {
          id: "demo-cam-01",
          name: "Câmera · Recepção",
          type: "camera",
          location: "Matriz · São Paulo",
          status: "online",
        },
        {
          id: "demo-cam-02",
          name: "Câmera · Docas",
          type: "camera",
          location: "Centro Logístico · Guarulhos",
          status: "online",
        },
        {
          id: "demo-cam-03",
          name: "Câmera · Portão Norte",
          type: "camera",
          location: "Matriz · São Paulo",
          status: "offline",
        },
        {
          id: "demo-bio-01",
          name: "Leitor biométrico · Entrada",
          type: "biometric",
          location: "Matriz · São Paulo",
          status: "online",
        },
        {
          id: "demo-alarm-01",
          name: "Sensor de alarme · Depósito",
          type: "alarm",
          location: "Centro Logístico · Guarulhos",
          status: "maintenance",
        },
        {
          id: "demo-auto-01",
          name: "Hub de automação · Iluminação",
          type: "automation",
          location: "Matriz · São Paulo",
          status: "online",
        },
        {
          id: "demo-sensor-01",
          name: "Sensor ambiental · CPD",
          type: "sensor",
          location: "Matriz · São Paulo",
          status: "online",
        },
      ] satisfies Omit<SecurityDevice, "createdAt">[]
    ).map((device, index) => ({
      ...device,
      createdAt: Date.UTC(2026, 0, index + 1),
    })),
  },
  "cliente@sentinel-demo.com": {
    role: "customer",
    profile: {
      fullName: "Visitante",
      companyName: "Horizonte Comércio Fictício Ltda.",
      taxId: "11.111.111/0001-11",
      username: "Visitante",
      email: "cliente@sentinel-demo.com",
      phone: "(21) 4000-0202",
      recoveryEmail: "contato@horizonte-demo.example",
      address: {
        zip: "20000-000",
        state: "RJ",
        city: "Rio de Janeiro",
        neighborhood: "Centro",
        street: "Avenida Modelo",
        number: "250",
        complement: "Sala demonstrativa",
      },
    } satisfies AccountProfile,
    services: [
      {
        serviceId: "sentinel-core",
        activatedAt: Date.UTC(2026, 0, 15),
        paymentId: "demo-service-core",
      },
      {
        serviceId: "sentinel-access",
        activatedAt: Date.UTC(2026, 1, 1),
        paymentId: "demo-service-access",
      },
    ] satisfies ActiveService[],
  },
  "admin@sentinel-demo.com": {
    role: "administrative",
    profile: {
      fullName: "Admin Sentinel Demo",
      username: "Admin Sentinel Demo",
      email: "admin@sentinel-demo.com",
      phone: "(11) 4000-0000",
      recoveryEmail: "admin@sentinel-demo.example",
      address: {
        zip: "",
        state: "SP",
        city: "São Paulo",
        neighborhood: "",
        street: "",
        number: "",
        complement: "Perfil administrativo fictício",
      },
    } satisfies AccountProfile,
  },
} as const;

export const DEMO_TICKETS: Record<string, DemoTicket[]> = {
  "empresa@sentinel-demo.com": [
    {
      id: "#1842",
      title: "Câmera CAM-03 offline — Portão Norte",
      priority: "Alta",
      status: "Aberto",
      date: "15 Jun",
    },
    {
      id: "#1841",
      title: "Leitor de acesso precisa de revisão",
      priority: "Média",
      status: "Em Andamento",
      date: "14 Jun",
    },
    {
      id: "#1839",
      title: "Ajuste de retenção do relatório mensal",
      priority: "Baixa",
      status: "Resolvido",
      date: "12 Jun",
    },
  ],
  "cliente@sentinel-demo.com": [
    {
      id: "#2901",
      title: "Dúvida sobre o plano Sentinel Core",
      priority: "Média",
      status: "Em Andamento",
      date: "18 Jun",
    },
    {
      id: "#2898",
      title: "Solicitação de acesso ao relatório mensal",
      priority: "Baixa",
      status: "Resolvido",
      date: "10 Jun",
    },
    {
      id: "#2892",
      title: "Agendamento de demonstração de controle de acesso",
      priority: "Baixa",
      status: "Aberto",
      date: "08 Jun",
    },
  ],
};

function seedIfMissing(key: string, value: unknown) {
  if (window.localStorage.getItem(key) === null) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function seedDemoData(email: string, role: string) {
  if (typeof window === "undefined") return;
  const normalizedEmail = email.trim().toLowerCase();
  const account = demoAccounts[normalizedEmail as keyof typeof demoAccounts];
  if (!account || account.role !== role) return;

  seedIfMissing(`sentinel:profile:${normalizedEmail}`, account.profile);
  const devices = "devices" in account ? account.devices : undefined;
  if (devices) seedIfMissing(`sentinel:devices:${normalizedEmail}`, devices);
  const services = "services" in account ? account.services : undefined;
  if (services) seedIfMissing(`sentinel:services:${normalizedEmail}`, services);
  const tickets = DEMO_TICKETS[normalizedEmail];
  if (tickets) seedIfMissing(`sentinel:tickets:${normalizedEmail}`, tickets);
}
