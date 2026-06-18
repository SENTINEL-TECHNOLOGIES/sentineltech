import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Badge, KpiCard } from "@/components/ui-bits";
import { Briefcase, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/portal/projects")({
  head: () => ({ meta: [{ title: "Projetos — Sentinel" }] }),
  component: Projects,
});

const projects = [
  { id: "PRJ-204", name: "Implantação de CFTV com IA — Planta Monterrey Fase 3", status: "Em Andamento", progress: 78, deadline: "18 Jul 2026", eng: "M. Alvarez" },
  { id: "PRJ-198", name: "Migração de acesso biométrico — Torre Matriz", status: "Em Andamento", progress: 42, deadline: "02 Ago 2026", eng: "L. Tanaka" },
  { id: "PRJ-211", name: "Retrofit de automação — DC-2 Frankfurt", status: "Revisão", progress: 91, deadline: "28 Jun 2026", eng: "S. Okafor" },
  { id: "PRJ-188", name: "Câmeras térmicas de perímetro — subestações EnerCore", status: "Em Andamento", progress: 64, deadline: "30 Jul 2026", eng: "R. Petrov" },
  { id: "PRJ-225", name: "Renovação de CFTV no varejo — região APAC", status: "Planejamento", progress: 12, deadline: "15 Set 2026", eng: "K. Park" },
  { id: "PRJ-172", name: "Implantação de gestão de visitantes — MediCore", status: "Concluído", progress: 100, deadline: "30 Mai 2026", eng: "J. Mendes" },
];

function statusBadge(s: string) {
  switch (s) {
    case "Concluído": return <Badge variant="success">{s}</Badge>;
    case "Revisão": return <Badge variant="info">{s}</Badge>;
    case "Planejamento": return <Badge variant="outline">{s}</Badge>;
    default: return <Badge variant="warning">{s}</Badge>;
  }
}

function Projects() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projetos</h1>
        <p className="text-sm text-muted-foreground">Frentes ativas com o seu time de entrega Sentinel.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Projetos Ativos" value="6" icon={<Briefcase className="h-5 w-5" />} accent="primary" />
        <KpiCard label="No Prazo" value="4" icon={<CheckCircle2 className="h-5 w-5" />} accent="success" />
        <KpiCard label="Em Risco" value="1" icon={<AlertCircle className="h-5 w-5" />} accent="warning" />
        <KpiCard label="Entrega Média" value="92%" delta="No prazo" deltaPositive icon={<Clock className="h-5 w-5" />} accent="cyan" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-mono text-[11px] text-cyan">{p.id}</div>
                <div className="mt-1 truncate text-base font-semibold">{p.name}</div>
              </div>
              {statusBadge(p.status)}
            </div>
            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Progresso</span><span className="font-mono">{p.progress}%</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan" style={{ width: `${p.progress}%` }} /></div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div><div className="text-muted-foreground">Prazo</div><div className="mt-0.5 font-medium">{p.deadline}</div></div>
              <div><div className="text-muted-foreground">Engenheiro Líder</div><div className="mt-0.5 font-medium">{p.eng}</div></div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="Todos os projetos" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
              <tr><th className="px-5 py-3 font-medium">Projeto</th><th className="px-5 py-3 font-medium">Status</th><th className="px-5 py-3 font-medium">Progresso</th><th className="px-5 py-3 font-medium">Prazo</th><th className="px-5 py-3 font-medium">Engenheiro</th></tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-border hover:bg-accent/30">
                  <td className="px-5 py-3"><div className="font-mono text-[11px] text-cyan">{p.id}</div><div className="font-medium">{p.name}</div></td>
                  <td className="px-5 py-3">{statusBadge(p.status)}</td>
                  <td className="px-5 py-3"><div className="flex items-center gap-2"><div className="h-1.5 w-28 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan" style={{ width: `${p.progress}%` }} /></div><span className="font-mono text-xs">{p.progress}%</span></div></td>
                  <td className="px-5 py-3 text-muted-foreground">{p.deadline}</td>
                  <td className="px-5 py-3">{p.eng}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
