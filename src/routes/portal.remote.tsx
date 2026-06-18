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
        <p className="mt-1 text-sm text-muted-foreground">Supervisão multi-site, gestão de incidentes e resposta a partir da nossa central 24/7.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Instalações Monitoradas" value="46" delta="12 países" deltaPositive icon={<Globe className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Alertas Ativos" value="8" delta="3 críticos" icon={<AlertTriangle className="h-5 w-5" />} accent="destructive" />
        <KpiCard label="Tempo Médio de Resposta" value="3min 12s" delta="-18% vs SLA" deltaPositive icon={<Clock className="h-5 w-5" />} accent="success" />
        <KpiCard label="Operadores de Plantão" value="14" delta="em 3 centrais" icon={<Headphones className="h-5 w-5" />} accent="cyan" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Status multi-site" description="Visão em tempo real de cada local monitorado" action={<Badge variant="warning">3 sites com alertas</Badge>} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                <tr><th className="px-5 py-3 font-medium">Instalação</th><th className="px-5 py-3 font-medium">País</th><th className="px-5 py-3 font-medium">Câmeras</th><th className="px-5 py-3 font-medium">Alertas ativos</th><th className="px-5 py-3 font-medium">Status</th></tr>
              </thead>
              <tbody>
                {sites.map((s) => (
                  <tr key={s.name} className="border-t border-border hover:bg-accent/30">
                    <td className="px-5 py-3 font-medium">{s.name}</td>
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{s.country}</td>
                    <td className="px-5 py-3 font-mono">{s.cams}</td>
                    <td className="px-5 py-3 font-mono">{s.alerts}</td>
                    <td className="px-5 py-3">
                      {s.status === "ok" && <Badge variant="success">● Operacional</Badge>}
                      {s.status === "warn" && <Badge variant="warning">● Atenção</Badge>}
                      {s.status === "alert" && <Badge variant="destructive">● Incidente</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Time de monitoramento" description="Operadores em turno" />
          <div className="divide-y divide-border">
            {team.map((t) => (
              <div key={t.name} className="flex items-center gap-3 p-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan text-xs font-bold text-primary-foreground">{t.name.split(" ").map(n => n[0]).join("")}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-[11px] text-muted-foreground">{t.role} · {t.shift}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm">{t.calls}</div>
                  <div className="text-[10px] text-muted-foreground">tratados</div>
                </div>
                <Badge variant={t.status === "on" ? "success" : "outline"}>{t.status === "on" ? "ON" : "OFF"}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Gestão de incidentes" description="Incidentes ativos e recentes · cores por prioridade" action={<Badge variant="destructive">1 crítico</Badge>} />
          <div className="divide-y divide-border">
            {incidents.map((i) => (
              <div key={i.id} className="grid grid-cols-1 gap-2 p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                <div className="font-mono text-xs text-cyan">{i.id}</div>
                <div>
                  <div className="text-sm font-medium">{i.title}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground"><MapPin className="h-3 w-3" />{i.site} · há {i.since}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={i.priority === "crítica" ? "destructive" : i.priority === "alta" ? "warning" : "info"}>{i.priority.toUpperCase()}</Badge>
                  <Badge variant={i.status === "resolvido" ? "success" : i.status === "despachado" ? "info" : "warning"}>{i.status.toUpperCase()}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Relatórios recentes" description="Gerados automaticamente para a diretoria" action={<FileText className="h-4 w-4 text-muted-foreground" />} />
          <div className="space-y-2 p-4">
            {[
              { name: "Briefing Semanal de Segurança — Sem. 24", date: "Seg 09:00", size: "1,8 MB" },
              { name: "Postmortem de Incidente — INC-22831", date: "Dom 22:14", size: "642 KB" },
              { name: "Relatório Mensal de Vigilância — Maio", date: "01 Jun", size: "4,2 MB" },
              { name: "Atividade de Visitantes — T2 até agora", date: "Ontem", size: "920 KB" },
            ].map((r) => (
              <div key={r.name} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{r.name}</div>
                  <div className="text-[11px] text-muted-foreground">{r.date} · {r.size}</div>
                </div>
                <button className="rounded border border-primary/40 px-2 py-1 text-[11px] font-semibold text-primary hover:bg-primary/10">Baixar</button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
