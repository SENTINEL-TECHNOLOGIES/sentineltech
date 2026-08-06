import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { DashboardMockup } from "@/components/dashboard-mockup";
import { Camera, Fingerprint, Globe, Building2, ArrowRight, Video, Cpu, BellRing, Zap, LayoutGrid, Clock, FileBarChart, Building, Home as HomeIcon, Landmark, Warehouse } from "lucide-react";

export const Route = createFileRoute("/explore/home")({
  head: () => ({
    meta: [
      { title: "Sentinel — Monitoramento Inteligente em Tempo Real" },
      { name: "description", content: "Plataforma de segurança física que reúne câmeras, acessos e alertas em um só painel, com monitoramento 24/7." },
      { property: "og:title", content: "Sentinel — Monitoramento Inteligente em Tempo Real" },
      { property: "og:description", content: "Toda a sua segurança em um único painel, com alertas em tempo real." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const features = [
  { icon: <Camera className="h-5 w-5" />, title: "Vigilância inteligente", desc: "Câmeras que identificam pessoas, veículos e riscos sozinhas." },
  { icon: <Fingerprint className="h-5 w-5" />, title: "Controle de acesso", desc: "Entradas liberadas por biometria, com registro de cada porta." },
  { icon: <Globe className="h-5 w-5" />, title: "Central 24/7", desc: "Operadores acompanham seus sites em todos os turnos." },
  { icon: <Building2 className="h-5 w-5" />, title: "Automação predial", desc: "Portões, alarmes e iluminação controlados no mesmo painel." },
];

const steps = [
  { icon: <Video className="h-6 w-6" />, n: "01", title: "Captura", desc: "Câmeras e sensores enviam imagem ao vivo." },
  { icon: <Cpu className="h-6 w-6" />, n: "02", title: "Análise", desc: "A plataforma identifica o que importa." },
  { icon: <BellRing className="h-6 w-6" />, n: "03", title: "Alerta", desc: "Você é avisado em segundos." },
];

const benefits = [
  { icon: <Zap className="h-4 w-4" />, t: "Resposta mais rápida" },
  { icon: <LayoutGrid className="h-4 w-4" />, t: "Monitoramento centralizado" },
  { icon: <Clock className="h-4 w-4" />, t: "Operação 24 horas" },
  { icon: <FileBarChart className="h-4 w-4" />, t: "Relatórios inteligentes" },
];

const audiences = [
  { icon: <Building className="h-5 w-5" />, t: "Empresas" },
  { icon: <HomeIcon className="h-5 w-5" />, t: "Condomínios" },
  { icon: <Landmark className="h-5 w-5" />, t: "Poder público" },
  { icon: <Warehouse className="h-5 w-5" />, t: "Logística e indústria" },
];

function Home() {
  return (
    <div className="space-y-24 pb-12">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-card via-card to-primary/10 px-6 py-14 md:px-12 md:py-20">
        <div className="absolute inset-0 bg-grid-sm opacity-20" />
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/25 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Badge variant="info">● Segurança física inteligente</Badge>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Toda a sua segurança em <span className="text-gradient-blue">um só painel.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground md:text-lg">
            Câmeras, acessos e alertas em tempo real — monitorados 24 horas por dia.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/explore/meeting" className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:translate-y-[-1px] hover:bg-primary/90">
              Solicitar Demonstração <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/explore/services" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-7 py-3.5 text-sm font-semibold transition hover:bg-accent">
              Conhecer a Plataforma
            </Link>
          </div>
        </div>
        <div className="relative mx-auto mt-14 max-w-4xl">
          <DashboardMockup />
        </div>
      </section>

      {/* FEATURES */}
      <section>
        <h2 className="mx-auto max-w-xl text-center text-3xl font-bold md:text-4xl">O que a plataforma faz</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="p-6 transition hover:translate-y-[-2px] hover:border-primary/60">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary/60 text-cyan">{f.icon}</div>
              <h3 className="mt-5 text-base font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <h2 className="mx-auto max-w-xl text-center text-3xl font-bold md:text-4xl">Como funciona</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <Card className="h-full p-7 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-cyan">{s.icon}</div>
                <div className="mt-4 font-mono text-xs text-primary">{s.n}</div>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </Card>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary/60 md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="rounded-2xl border border-border bg-card/50 p-8 md:p-12">
        <h2 className="text-center text-3xl font-bold md:text-4xl">O que você ganha</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.t} className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-cyan">{b.icon}</span>
              <span className="text-sm font-semibold">{b.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* AUDIENCES */}
      <section>
        <h2 className="mx-auto max-w-xl text-center text-3xl font-bold md:text-4xl">Para quem é</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <Card key={a.t} className="flex flex-col items-center gap-3 p-7 text-center transition hover:border-primary/50">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary/60 text-cyan">{a.icon}</span>
              <span className="text-sm font-semibold">{a.t}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/20 via-card to-card p-10 text-center md:p-16">
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan/20 blur-[120px]" />
        <div className="relative">
          <h2 className="text-3xl font-bold md:text-4xl">Veja a Sentinel em ação</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">Uma demonstração de 20 minutos com a sua operação em tela.</p>
          <Link to="/explore/meeting" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
            Solicitar Demonstração <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
