import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/explore/about")({
  head: () => ({
    meta: [
      { title: "Sobre — Sentinel" },
      { name: "description", content: "A Sentinel protege espaços físicos com monitoramento inteligente e uma central ativa 24 horas." },
      { property: "og:title", content: "Sobre — Sentinel" },
      { property: "og:description", content: "Tecnologia brasileira de segurança física, monitorada 24 horas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const metrics = [
  { v: "500+", l: "Sites protegidos" },
  { v: "120k+", l: "Câmeras monitoradas" },
  { v: "< 3 min", l: "Resposta média" },
  { v: "24/7", l: "Operação" },
];

function About() {
  return (
    <div className="space-y-16 pb-12">
      <header className="mx-auto max-w-2xl text-center">
        <Badge variant="info">Sobre</Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Tecnologia que <span className="text-gradient-blue">protege espaços reais.</span>
        </h1>
        <p className="mt-4 text-muted-foreground">Somos uma empresa brasileira de segurança física monitorada.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.l} className="p-6 text-center">
            <div className="font-mono text-3xl font-bold text-gradient-blue">{m.v}</div>
            <div className="mt-2 text-sm text-muted-foreground">{m.l}</div>
          </Card>
        ))}
      </section>

      <section className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card p-10 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">Vamos conversar</h2>
        <Link to="/explore/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
          Entrar em Contato <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
