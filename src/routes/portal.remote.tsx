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
  { id: "INC-22841", site: "Planta · Monterrey", title: "Portão forçado no Setor 4", status: "investigando", since: "12min", priority: "crítica" },
  { id: "INC-22840", site: "Galpão · Singapura", title: "Câmera offline · CAM-09", status: "despachado", since: "38min", priority: "média" },
  { id: "INC-22839", site: "DC-2 · Frankfurt", title: "Porta aberta · corredor frio", status: "resolvido", since: "2h", priority: "alta" },
  { id: "INC-22838", site: "Planta · Monterrey", title: "Visitante sem escolta detectado", status: "investigando", since: "3h", priority: "alta" },
];

const team = [
  { name: "K. Park", role: "Operador Líder", shift: "14:00 – 22:00", calls: 12, status: "on" },
  { name: "R. Mendes", role: "Operador", shift: "14:00 – 22:00", calls: 8, status: "on" },
  { name: "L. Tanaka", role: "Operador", shift: "06:00 – 14:00", calls: 14, status: "off" },
  { name: "A. Diallo", role: "Despacho", shift: "rotação 24/7", calls: 22, status: "on" },
];

function Remote() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">Monitoramento Remoto 24/7</Badge>
        <h1 className="mt-3 text-2xl font-bold">Monitoramento Remoto</h1>
        <p className="mt-1 text-sm text-muted-foreground">Este menu foi zerado. Para popular a central remota, edite os arrays do arquivo desta rota.</p>
      </div>

      <Card className="border-dashed">
        <div className="flex flex-col gap-4 p-6">
          <Badge variant="outline">Área vazia</Badge>
          <div>
            <h2 className="text-xl font-bold">Nenhum item cadastrado neste menu</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use `sites`, `incidents`, `team` e as listas de relatórios para inserir instalações monitoradas, incidentes e operadores.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">1. `sites`</span>
              <p className="mt-1 text-muted-foreground">Adicione locais monitorados, país, câmeras e status de cada instalação.</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">2. `incidents`</span>
              <p className="mt-1 text-muted-foreground">Cadastre incidentes ativos, severidade, prazo e status de resposta.</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">3. `team`</span>
              <p className="mt-1 text-muted-foreground">Preencha o time de monitoramento com operadores e escalas.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
