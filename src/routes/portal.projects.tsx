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
        <p className="text-sm text-muted-foreground">Este menu foi zerado. Para popular os projetos, edite o array `projects` desta rota.</p>
      </div>

      <Card className="border-dashed">
        <div className="flex flex-col gap-4 p-6">
          <Badge variant="outline">Área vazia</Badge>
          <div>
            <h2 className="text-xl font-bold">Nenhum item cadastrado neste menu</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use `projects` para adicionar projetos com id, nome, status, progresso, prazo e responsável.</p>
          </div>

          <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
            <span className="font-semibold text-foreground">Como adicionar um projeto</span>
            <p className="mt-1 text-muted-foreground">Insira objetos no array `projects`. Cada item precisa de `id`, `name`, `status`, `progress`, `deadline` e `eng`.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
