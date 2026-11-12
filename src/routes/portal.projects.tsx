import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Badge, KpiCard } from "@/components/ui-bits";
import { Briefcase, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/portal/projects")({
  head: () => ({ meta: [{ title: "Projetos — Sentinel" }] }),
  component: Projects,
});

const projects = [
  {
    id: "PRJ-204",
    name: "Implantação de CFTV com IA — Planta Monterrey Fase 3",
    status: "Em Andamento",
    progress: 78,
    deadline: "18 Jul 2026",
    eng: "M. Alvarez",
  },
  {
    id: "PRJ-198",
    name: "Migração de acesso biométrico — Torre Matriz",
    status: "Em Andamento",
    progress: 42,
    deadline: "02 Ago 2026",
    eng: "L. Tanaka",
  },
  {
    id: "PRJ-211",
    name: "Retrofit de automação — DC-2 Frankfurt",
    status: "Revisão",
    progress: 91,
    deadline: "28 Jun 2026",
    eng: "S. Okafor",
  },
  {
    id: "PRJ-188",
    name: "Câmeras térmicas de perímetro — subestações EnerCore",
    status: "Em Andamento",
    progress: 64,
    deadline: "30 Jul 2026",
    eng: "R. Petrov",
  },
  {
    id: "PRJ-225",
    name: "Renovação de CFTV no varejo — região APAC",
    status: "Planejamento",
    progress: 12,
    deadline: "15 Set 2026",
    eng: "K. Park",
  },
  {
    id: "PRJ-172",
    name: "Implantação de gestão de visitantes — MediCore",
    status: "Concluído",
    progress: 100,
    deadline: "30 Mai 2026",
    eng: "J. Mendes",
  },
];

function statusBadge(s: string) {
  switch (s) {
    case "Concluído":
      return <Badge variant="success">{s}</Badge>;
    case "Revisão":
      return <Badge variant="info">{s}</Badge>;
    case "Planejamento":
      return <Badge variant="outline">{s}</Badge>;
    default:
      return <Badge variant="warning">{s}</Badge>;
  }
}

function Projects() {
  const active = projects.filter((project) => project.status === "Em Andamento").length;
  const inReview = projects.filter((project) => project.status === "Revisão").length;
  const completed = projects.filter((project) => project.status === "Concluído").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Projetos</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe projetos fictícios de implantação e modernização.
          </p>
        </div>
        <Badge variant="outline">Dados demonstrativos</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Projetos ativos"
          value={String(active)}
          icon={<Briefcase className="h-5 w-5" />}
        />
        <KpiCard
          label="Em revisão"
          value={String(inReview)}
          icon={<Clock className="h-5 w-5" />}
          accent="cyan"
        />
        <KpiCard
          label="Concluídos"
          value={String(completed)}
          icon={<CheckCircle2 className="h-5 w-5" />}
          accent="success"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader
              title={project.name}
              description={`${project.id} · responsável: ${project.eng}`}
              action={statusBadge(project.status)}
            />
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" /> Prazo previsto
                </span>
                <span>{project.deadline}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <AlertCircle className="h-4 w-4" /> Progresso
                </span>
                <span className="font-mono font-semibold">{project.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Projetos, responsáveis e prazos são exemplos fictícios para demonstração.
      </p>
    </div>
  );
}
