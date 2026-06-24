import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { Camera, Globe, Fingerprint, Building2, ArrowRight, Search, Wrench, Activity, Store, GraduationCap, Warehouse, Building } from "lucide-react";

export const Route = createFileRoute("/explore/home")({
  head: () => ({ meta: [{ title: "Sentinel — Segurança Física Inteligente para Empresas" }] }),
  component: Home,
});

const solutions = [
  { icon: <Camera className="h-6 w-6" />, title: "Monitoramento com IA", desc: "Câmeras inteligentes que detectam pessoas, veículos e comportamentos em tempo real.", featured: true },
  { icon: <Globe className="h-6 w-6" />, title: "Monitoramento Remoto 24/7", desc: "Nossa central acompanha suas instalações em todos os turnos." },
  { icon: <Fingerprint className="h-6 w-6" />, title: "Controle de Acesso Biométrico", desc: "Face, digital e múltiplos fatores diretamente na porta." },
  { icon: <Building2 className="h-6 w-6" />, title: "Automação Inteligente", desc: "Iluminação, portões, alarmes e sensores em um único painel." },
];

const steps = [
  { n: "01", icon: <Search className="h-5 w-5" />, title: "Avaliação Técnica", desc: "Visita ao site e mapa de riscos." },
  { n: "02", icon: <Wrench className="h-5 w-5" />, title: "Implantação", desc: "Instalação turnkey por equipe certificada." },
  { n: "03", icon: <Activity className="h-5 w-5" />, title: "Operação 24/7", desc: "Monitoramento ativo da nossa central." },
];

const industries = [
  { icon: <Building className="h-5 w-5" />, label: "Escritórios Corporativos" },
  { icon: <Warehouse className="h-5 w-5" />, label: "Centros de Distribuição" },
  { icon: <Store className="h-5 w-5" />, label: "Varejo" },
  { icon: <GraduationCap className="h-5 w-5" />, label: "Instituições de Ensino" },
];

const metrics = [
  { v: "120k+", l: "Câmeras monitoradas" },
  { v: "24/7", l: "Cobertura ativa" },
  { v: "< 3 min", l: "Tempo médio de resposta" },
  { v: "500+", l: "Sites protegidos" },
];

function Home() {
  return (
    <div className="space-y-16 pb-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-8 md:p-14">
        <div className="absolute inset-0 bg-grid-sm opacity-30" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="relative max-w-3xl">
          <Badge variant="info">● Segurança Física Inteligente</Badge>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Proteja seus espaços com <span className="text-gradient-blue">vigilância inteligente.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground">
            CFTV com IA, biometria e monitoramento 24/7 para empresas que não aceitam falhas em segurança.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/explore/meeting" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 hover:translate-y-[-1px]">
              Solicitar Demonstração <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/explore/contact" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-semibold hover:bg-accent">
              Falar com Especialista
            </Link>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section>
        <div className="mb-8 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Soluções</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">O que entregamos</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {solutions.map((s) => (
            <Card key={s.title} className={`group relative overflow-hidden p-7 transition hover:border-primary/60 hover:translate-y-[-2px] ${s.featured ? "md:col-span-2 border-primary/40 bg-gradient-to-br from-card to-primary/5" : ""}`}>
              <div className="flex items-start gap-5">
                <div className={`grid place-items-center rounded-xl border border-border bg-secondary/50 text-cyan transition group-hover:bg-primary/10 ${s.featured ? "h-16 w-16" : "h-12 w-12"}`}>{s.icon}</div>
                <div className="min-w-0 flex-1">
                  {s.featured && <Badge variant="info">Mais procurado</Badge>}
                  <h3 className={`font-bold ${s.featured ? "mt-2 text-2xl" : "text-lg"}`}>{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="mb-8 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Como funciona</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Três passos até a operação ativa</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.n} className="p-7">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-primary">{s.n}</span>
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary/60 text-cyan">{s.icon}</div>
              </div>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section>
        <div className="mb-8 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Indústrias</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Quem confia na Sentinel</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((i) => (
            <Card key={i.label} className="flex items-center gap-3 p-5 transition hover:border-primary/50">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary/60 text-cyan">{i.icon}</div>
              <div className="text-sm font-semibold">{i.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section className="rounded-2xl border border-border bg-card/60 p-8 md:p-10">
        <div className="grid gap-8 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.l}>
              <div className="font-mono text-4xl font-bold text-gradient-blue">{m.v}</div>
              <div className="mt-2 text-sm text-muted-foreground">{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/20 via-card to-card p-10 md:p-14 text-center">
        <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-cyan/20 blur-[120px]" />
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-bold">Pronto para elevar sua segurança?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Receba uma avaliação técnica gratuita do seu site.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/explore/meeting" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
              Solicitar Demonstração <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/explore/contact" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-semibold hover:bg-accent">
              Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
