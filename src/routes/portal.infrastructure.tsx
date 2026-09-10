import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Building, Camera, MapPin, Activity, Fingerprint } from "lucide-react";

export const Route = createFileRoute("/portal/infrastructure")({
  head: () => ({ meta: [{ title: "Instalações — Sentinel" }] }),
  component: Infra,
});

const sites = [
  { name: "Torre Matriz · São Paulo", region: "BR-SP", cameras: 128, doors: 84, status: "saudável", load: 62 },
  { name: "DC-2 · Frankfurt", region: "EU-DE", cameras: 92, doors: 46, status: "saudável", load: 48 },
  { name: "Hub Logístico · Singapura", region: "AP-SG", cameras: 54, doors: 28, status: "degradado", load: 81 },
  { name: "Planta Industrial · Monterrey", region: "MX-NL", cameras: 76, doors: 32, status: "saudável", load: 55 },
  { name: "Rede de Varejo · Sul do Brasil", region: "BR-RS", cameras: 124, doors: 62, status: "saudável", load: 39 },
];

function Infra() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Instalações</h1>
        <p className="text-sm text-muted-foreground">Este menu foi zerado. Para popular os locais e indicadores, edite o array `sites` desta rota.</p>
      </div>

      <Card className="border-dashed">
        <div className="flex flex-col gap-4 p-6">
          <Badge variant="outline">Área vazia</Badge>
          <div>
            <h2 className="text-xl font-bold">Nenhum item cadastrado neste menu</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use `sites` para inserir instalações, regiões, câmeras e indicadores de carga e saúde.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">1. `sites`</span>
              <p className="mt-1 text-muted-foreground">Adicione cada local monitorado com nome, região, câmeras, portas e status.</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">2. Carga e capacidade</span>
              <p className="mt-1 text-muted-foreground">Defina os indicadores de uso para exibir saúde, capacidade e previsões do site.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
