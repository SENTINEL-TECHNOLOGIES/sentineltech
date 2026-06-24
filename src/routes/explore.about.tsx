import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { Shield, Eye, Users, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/explore/about")({
  head: () => ({ meta: [{ title: "Sobre — Sentinel" }] }),
  component: About,
});

const values = [
  { icon: <Shield className="h-6 w-6" />, title: "Confiabilidade", desc: "Operação ininterrupta com SLA garantido." },
  { icon: <Eye className="h-6 w-6" />, title: "Inteligência", desc: "Tecnologia de IA aplicada à segurança real." },
  { icon: <Users className="h-6 w-6" />, title: "Proximidade", desc: "Time dedicado e atendimento humano." },
];

const metrics = [
  { v: "500+", l: "Clientes" },
  { v: "120k+", l: "Câmeras" },
  { v: "180+", l: "Especialistas" },
  { v: "24/7", l: "Operação" },
];

function About() {
  return (
    <div className="space-y-12 pb-8">
      <header className="max-w-3xl">
        <Badge variant="info">Sobre a Sentinel</Badge>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Tecnologia que <span className="text-gradient-blue">protege espaços reais.</span></h1>
        <p className="mt-4 text-muted-foreground">Somos uma empresa brasileira especializada em segurança física inteligente para operações corporativas.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.l} className="p-6">
            <div className="font-mono text-3xl font-bold text-gradient-blue">{m.v}</div>
            <div className="mt-2 text-sm text-muted-foreground">{m.l}</div>
          </Card>
        ))}
      </section>

      <section>
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Nossos valores</div>
          <h2 className="mt-2 text-3xl font-bold">O que nos move</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className="p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary/60 text-cyan">{v.icon}</div>
              <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Vamos conversar sobre sua operação</h2>
        <Link to="/explore/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
          Entrar em Contato <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
