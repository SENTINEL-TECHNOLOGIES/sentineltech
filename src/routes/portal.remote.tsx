import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Globe, Headphones, AlertTriangle, Clock, FileText, MapPin } from "lucide-react";

export const Route = createFileRoute("/portal/remote")({
  head: () => ({ meta: [{ title: "Monitoramento Remoto — Sentinel" }] }),
  component: Remote,
});

const sites = [
  { name: "Torre Matriz · São Paulo", country: "BR", cams: 128, status: "ok", alerts: 0 },
  { name: "DC-2 · Frankfurt", country: "DE", cams: 92, status: "ok", alerts: 1 },
  { name: "Galpão · Singapura", country: "SG", cams: 54, status: "warn", alerts: 2 },
  { name: "Planta · Monterrey", country: "MX", cams: 76, status: "alert", alerts: 4 },
  { name: "Rede de Varejo · Sul do Brasil", country: "BR", cams: 124, status: "ok", alerts: 0 },
  { name: "Hub Logístico · Rotterdam", country: "NL", cams: 88, status: "ok", alerts: 1 },
];

const incidents = [
  {
    id: "INC-22841",
    site: "Planta · Monterrey",
    title: "Portão forçado no Setor 4",
    status: "investigando",
    since: "12min",
    priority: "crítica",
  },
  {
    id: "INC-22840",
    site: "Galpão · Singapura",
    title: "Câmera offline · CAM-09",
    status: "despachado",
    since: "38min",
    priority: "média",
  },
  {
    id: "INC-22839",
    site: "DC-2 · Frankfurt",
    title: "Porta aberta · corredor frio",
    status: "resolvido",
    since: "2h",
    priority: "alta",
  },
  {
    id: "INC-22838",
    site: "Planta · Monterrey",
    title: "Visitante sem escolta detectado",
    status: "investigando",
    since: "3h",
    priority: "alta",
  },
];

const team = [
  { name: "K. Park", role: "Operador Líder", shift: "14:00 – 22:00", calls: 12, status: "on" },
  { name: "R. Mendes", role: "Operador", shift: "14:00 – 22:00", calls: 8, status: "on" },
  { name: "L. Tanaka", role: "Operador", shift: "06:00 – 14:00", calls: 14, status: "off" },
  { name: "A. Diallo", role: "Despacho", shift: "rotação 24/7", calls: 22, status: "on" },
];

function Remote() {
  const totalCameras = sites.reduce((sum, site) => sum + site.cams, 0);
  const openIncidents = incidents.filter((incident) => incident.status !== "resolvido").length;
  const sitesWithAlerts = sites.filter((site) => site.alerts > 0).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="info">Monitoramento Remoto 24/7</Badge>
          <h1 className="mt-3 text-2xl font-bold">Monitoramento Remoto</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Visão demonstrativa de locais, ocorrências e equipe de operação.
          </p>
        </div>
        <Badge variant="outline">Dados fictícios</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Locais monitorados"
          value={String(sites.length)}
          delta="em diferentes regiões"
          deltaPositive
          icon={<Globe className="h-5 w-5" />}
        />
        <KpiCard
          label="Câmeras de exemplo"
          value={String(totalCameras)}
          delta="inventário fictício"
          deltaPositive
          icon={<MapPin className="h-5 w-5" />}
          accent="cyan"
        />
        <KpiCard
          label="Incidentes em aberto"
          value={String(openIncidents)}
          delta="amostra simulada"
          icon={<AlertTriangle className="h-5 w-5" />}
          accent="warning"
        />
        <KpiCard
          label="Locais com alertas"
          value={String(sitesWithAlerts)}
          delta="na amostra exibida"
          icon={<Clock className="h-5 w-5" />}
          accent="success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Locais monitorados"
            description="Inventário fictício por região"
            action={<MapPin className="h-4 w-4 text-primary" />}
          />
          <div className="divide-y divide-border">
            {sites.map((site) => (
              <div key={site.name} className="flex items-center gap-3 p-4">
                <Globe className="h-4 w-4 text-cyan" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{site.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {site.country} · {site.cams} câmeras · {site.alerts} alertas
                  </div>
                </div>
                <Badge
                  variant={
                    site.status === "ok"
                      ? "success"
                      : site.status === "warn"
                        ? "warning"
                        : "destructive"
                  }
                >
                  {site.status === "ok" ? "Normal" : site.status === "warn" ? "Atenção" : "Alerta"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader
            title="Incidentes de exemplo"
            description="Acompanhamento simulado"
            action={<Headphones className="h-4 w-4 text-primary" />}
          />
          <div className="divide-y divide-border">
            {incidents.map((incident) => (
              <div key={incident.id} className="flex items-start gap-3 p-4">
                <AlertTriangle
                  className={`mt-0.5 h-4 w-4 ${incident.priority === "crítica" ? "text-destructive" : "text-warning"}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{incident.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {incident.id} · {incident.site} · há {incident.since}
                  </div>
                </div>
                <Badge variant={incident.status === "resolvido" ? "success" : "info"}>
                  {incident.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Equipe de plantão"
          description="Escalas e atividades fictícias"
          action={<FileText className="h-4 w-4 text-primary" />}
        />
        <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{member.name}</span>
                <Badge variant={member.status === "on" ? "success" : "outline"}>
                  {member.status === "on" ? "Em turno" : "Fora de turno"}
                </Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {member.role} · {member.shift}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{member.calls} atendimentos</p>
            </div>
          ))}
        </div>
      </Card>
      <p className="text-xs text-muted-foreground">
        Locais, incidentes, operadores e escalas são fictícios; não há central remota conectada.
      </p>
    </div>
  );
}
