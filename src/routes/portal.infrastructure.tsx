import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Building, Camera, MapPin, Activity, Fingerprint } from "lucide-react";

export const Route = createFileRoute("/portal/infrastructure")({
  head: () => ({ meta: [{ title: "Instalações — Sentinel" }] }),
  component: Infra,
});

const sites = [
  {
    name: "Torre Matriz · São Paulo",
    region: "BR-SP",
    cameras: 128,
    doors: 84,
    status: "saudável",
    load: 62,
  },
  {
    name: "DC-2 · Frankfurt",
    region: "EU-DE",
    cameras: 92,
    doors: 46,
    status: "saudável",
    load: 48,
  },
  {
    name: "Hub Logístico · Singapura",
    region: "AP-SG",
    cameras: 54,
    doors: 28,
    status: "degradado",
    load: 81,
  },
  {
    name: "Planta Industrial · Monterrey",
    region: "MX-NL",
    cameras: 76,
    doors: 32,
    status: "saudável",
    load: 55,
  },
  {
    name: "Rede de Varejo · Sul do Brasil",
    region: "BR-RS",
    cameras: 124,
    doors: 62,
    status: "saudável",
    load: 39,
  },
];

function Infra() {
  const totalCameras = sites.reduce((sum, site) => sum + site.cameras, 0);
  const totalDoors = sites.reduce((sum, site) => sum + site.doors, 0);
  const attentionSites = sites.filter((site) => site.status !== "saudável").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Instalações</h1>
          <p className="text-sm text-muted-foreground">
            Locais fictícios para demonstração da operação Sentinel.
          </p>
        </div>
        <Badge variant="outline">Dados demonstrativos</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Locais demonstrativos"
          value={String(sites.length)}
          delta="em diferentes regiões"
          deltaPositive
          icon={<Building className="h-5 w-5" />}
        />
        <KpiCard
          label="Câmeras cadastradas"
          value={String(totalCameras)}
          delta="inventário fictício"
          deltaPositive
          icon={<Camera className="h-5 w-5" />}
          accent="cyan"
        />
        <KpiCard
          label="Pontos de acesso"
          value={String(totalDoors)}
          delta="portas e catracas"
          deltaPositive
          icon={<Fingerprint className="h-5 w-5" />}
          accent="success"
        />
        <KpiCard
          label="Locais em atenção"
          value={String(attentionSites)}
          delta="verifique o status"
          icon={<Activity className="h-5 w-5" />}
          accent="warning"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {sites.map((site) => (
          <Card key={site.name}>
            <CardHeader
              title={site.name}
              description={`${site.region} · ${site.cameras} câmeras · ${site.doors} pontos de acesso`}
              action={
                <Badge variant={site.status === "saudável" ? "success" : "warning"}>
                  {site.status}
                </Badge>
              }
            />
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" /> Capacidade utilizada
                </span>
                <span className="font-mono font-semibold">{site.load}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${site.load}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Os locais, contagens e indicadores desta tela são fictícios e não representam instalações
        reais.
      </p>
    </div>
  );
}
