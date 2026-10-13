import { Link } from "@tanstack/react-router";
import { Activity, AlertTriangle, ArrowRight, Building2, Camera, FileClock, Radio, Users } from "lucide-react";
import { Badge, Card, CardHeader, KpiCard } from "@/components/ui-bits";

const platformSites = [
  { name: "Torre Matriz — São Paulo", cameras: "128/128", status: "Operacional" },
  { name: "DC-2 Frankfurt", cameras: "92/92", status: "Operacional" },
  { name: "Hub Logístico — Singapura", cameras: "54/56", status: "Atenção" },
  { name: "Planta Industrial — Monterrey", cameras: "76/76", status: "Operacional" },
  { name: "Rede de Varejo", cameras: "498/504", status: "Atenção" },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold">Dashboard Administrativo</h1><Badge variant="info">Visão global</Badge></div>
          <p className="mt-1 text-sm text-muted-foreground">Saúde da plataforma e panorama consolidado dos ambientes monitorados.</p>
        </div>
        <Badge variant="outline">Indicadores demonstrativos</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Locais monitorados" value="46" delta="em 12 regiões" deltaPositive icon={<Building2 className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Câmeras disponíveis" value="848 / 856" delta="99,1% online" deltaPositive icon={<Camera className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Dispositivos online" value="2.184" delta="indicador da plataforma" deltaPositive icon={<Activity className="h-5 w-5" />} accent="success" />
        <KpiCard label="Incidentes em 24h" value="7" delta="2 em aberto" icon={<AlertTriangle className="h-5 w-5" />} accent="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader title="Saúde dos ambientes" description="Resumo global dos locais demonstrativos" action={<Badge variant="success">Uptime 99,98%</Badge>} />
          <div className="divide-y divide-border">
            {platformSites.map((site) => (
              <div key={site.name} className="flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{site.name}</div><div className="text-xs text-muted-foreground">Câmeras {site.cameras}</div></div>
                <Badge variant={site.status === "Operacional" ? "success" : "warning"}>{site.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Administração da plataforma" description="Acesso global restrito à equipe Sentinel" />
          <div className="divide-y divide-border">
            {[
              { to: "/admin/companies", title: "Empresas", detail: "Cadastro e contratos", icon: <Building2 className="h-4 w-4" /> },
              { to: "/admin/users", title: "Usuários", detail: "Contas e permissões", icon: <Users className="h-4 w-4" /> },
              { to: "/admin/audit", title: "Logs e auditoria", detail: "Acessos e alterações", icon: <FileClock className="h-4 w-4" /> },
              { to: "/portal/monitoring", title: "Centro de Comando", detail: "Visão operacional global", icon: <Radio className="h-4 w-4" /> },
            ].map((entry) => (
              <Link key={entry.to} to={entry.to} className="flex items-center gap-3 p-4 hover:bg-accent/30"><span className="text-primary">{entry.icon}</span><span className="min-w-0 flex-1"><span className="block text-sm font-medium">{entry.title}</span><span className="block text-xs text-muted-foreground">{entry.detail}</span></span><ArrowRight className="h-4 w-4 text-muted-foreground" /></Link>
            ))}
          </div>
        </Card>
      </div>
      <p className="text-xs text-muted-foreground">Os indicadores globais desta demonstração são mocks existentes no projeto; não representam dados conectados a empresas reais.</p>
    </div>
  );
}