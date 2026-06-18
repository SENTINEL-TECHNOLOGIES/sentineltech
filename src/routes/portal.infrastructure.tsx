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
        <p className="text-sm text-muted-foreground">Sites, locais monitorados e ativos de segurança gerenciados em todo o parque.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Instalações Monitoradas" value="46" icon={<Building className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Total de Câmeras" value="856" icon={<Camera className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Pontos de Acesso" value="384" icon={<Fingerprint className="h-5 w-5" />} accent="success" />
        <KpiCard label="Carga Média" value="57%" icon={<Activity className="h-5 w-5" />} accent="warning" />
      </div>

      <Card>
        <CardHeader title="Sites e regiões" description="Saúde e capacidade nas instalações gerenciadas" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
              <tr><th className="px-5 py-3 font-medium">Local</th><th className="px-5 py-3 font-medium">Região</th><th className="px-5 py-3 font-medium">Câmeras</th><th className="px-5 py-3 font-medium">Portas</th><th className="px-5 py-3 font-medium">Carga</th><th className="px-5 py-3 font-medium">Status</th></tr>
            </thead>
            <tbody>
              {sites.map((s) => (
                <tr key={s.name} className="border-t border-border hover:bg-accent/30">
                  <td className="px-5 py-3 font-medium">{s.name}</td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{s.region}</td>
                  <td className="px-5 py-3 font-mono">{s.cameras}</td>
                  <td className="px-5 py-3 font-mono">{s.doors}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-secondary">
                        <div className={`h-full rounded-full ${s.load > 75 ? "bg-warning" : "bg-gradient-to-r from-primary to-cyan"}`} style={{ width: `${s.load}%` }} />
                      </div>
                      <span className="font-mono text-xs">{s.load}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">{s.status === "saudável" ? <Badge variant="success">● Saudável</Badge> : <Badge variant="warning">● Degradado</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader title="Instalações mais ativas" />
          <div className="space-y-3 p-5">
            {[
              { id: "HQ-SP", t: "Torre Matriz São Paulo", v: 92 },
              { id: "PLT-MTY", t: "Planta Monterrey", v: 78 },
              { id: "DC2-FRA", t: "Data Center Frankfurt", v: 71 },
              { id: "WHS-SG", t: "Galpão Singapura", v: 64 },
            ].map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                <MapPin className="h-4 w-4 text-cyan" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-mono text-sm">{d.id}</div>
                  <div className="text-[11px] text-muted-foreground">{d.t}</div>
                </div>
                <span className="font-mono text-sm">{d.v}%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Previsão de capacidade" description="Projeção de 30 dias" />
          <div className="space-y-4 p-5">
            {[
              { label: "Armazenamento de câmeras", val: 68, hint: "Pool NVR" },
              { label: "Controladoras de acesso", val: 74, hint: "Nº de portas" },
              { label: "Banda de rede", val: 42, hint: "Uplinks de site" },
              { label: "Fila de operadores", val: 55, hint: "Capacidade da central" },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-xs"><span className="font-medium">{r.label}</span><span className="text-muted-foreground">{r.hint} · <span className="font-mono text-foreground">{r.val}%</span></span></div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan" style={{ width: `${r.val}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
