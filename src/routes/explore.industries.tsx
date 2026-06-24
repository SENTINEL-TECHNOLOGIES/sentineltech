import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { Building, Warehouse, Store, GraduationCap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/explore/industries")({
  head: () => ({ meta: [{ title: "Indústrias — Sentinel" }] }),
  component: Industries,
});

const items = [
  { icon: <Building className="h-7 w-7" />, title: "Escritórios Corporativos", desc: "Controle de acesso biométrico, gestão de visitantes e monitoramento de áreas críticas." },
  { icon: <Warehouse className="h-7 w-7" />, title: "Centros de Distribuição", desc: "Vigilância de perímetro, leitura de placas e prevenção de perdas com IA." },
  { icon: <Store className="h-7 w-7" />, title: "Varejo", desc: "Analítica comportamental, contagem de fluxo e prevenção de furtos em loja." },
  { icon: <GraduationCap className="h-7 w-7" />, title: "Instituições de Ensino", desc: "Acesso seguro de alunos, monitoramento de campus e resposta a emergências." },
];

function Industries() {
  return (
    <div className="space-y-10 pb-8">
      <header className="max-w-3xl">
        <Badge variant="info">Indústrias</Badge>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Segurança feita para o seu setor</h1>
        <p className="mt-4 text-muted-foreground">Soluções adaptadas para os ambientes mais exigentes do Brasil.</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((i) => (
          <Card key={i.title} className="p-7 transition hover:border-primary/60 hover:translate-y-[-2px]">
            <div className="grid h-14 w-14 place-items-center rounded-xl border border-border bg-secondary/50 text-cyan">{i.icon}</div>
            <h3 className="mt-5 text-xl font-bold">{i.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
          </Card>
        ))}
      </div>

      <section className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Não encontrou seu setor?</h2>
        <p className="mt-3 text-muted-foreground">Atendemos operações sob medida em todo o país.</p>
        <Link to="/explore/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
          Falar com Especialista <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
