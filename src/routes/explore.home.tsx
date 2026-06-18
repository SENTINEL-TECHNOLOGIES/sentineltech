import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { Camera, Fingerprint, Building2, Globe, ShieldCheck, ArrowRight, Quote, Clock, Award, Users, MapPin } from "lucide-react";

export const Route = createFileRoute("/explore/home")({
  head: () => ({ meta: [{ title: "Conheça a Sentinel — Tecnologia em Segurança Física" }] }),
  component: Home,
});

const benefits = [
  { icon: <Clock className="h-5 w-5" />, title: "Monitoramento 24/7", desc: "Operadores treinados acompanham cada câmera, em todos os turnos" },
  { icon: <Camera className="h-5 w-5" />, title: "CFTV com IA", desc: "Modelos de detecção treinados com dados reais de incidentes" },
  { icon: <Fingerprint className="h-5 w-5" />, title: "Acesso Biométrico", desc: "Face, digital e múltiplos fatores diretamente na porta" },
  { icon: <Building2 className="h-5 w-5" />, title: "Edifícios Inteligentes", desc: "Automação que conecta segurança à operação" },
  { icon: <Users className="h-5 w-5" />, title: "Time Dedicado", desc: "Um especialista nomeado para o seu parque" },
  { icon: <MapPin className="h-5 w-5" />, title: "Equipe de Campo Nacional", desc: "Atendimento, instalação e manutenção in loco" },
];

const featured = [
  { title: "Soluções de CFTV com IA", desc: "Câmeras inteligentes que reconhecem pessoas, veículos, objetos e comportamentos em tempo real.", icon: <Camera className="h-6 w-6" /> },
  { title: "Controle de Acesso Biométrico", desc: "Face, digital, cartão e crachá de visitante — unificados em todas as portas e sites.", icon: <Fingerprint className="h-6 w-6" /> },
  { title: "Monitoramento Remoto 24/7", desc: "Nossa central acompanha suas instalações para que sua equipe foque no negócio.", icon: <Globe className="h-6 w-6" /> },
];

const stories = [
  { client: "LogiPort SA", industry: "Logística e Portos", metric: "42 km²", label: "Perímetro protegido", desc: "Detecção de perímetro com IA e CFTV integrado em todo o terminal portuário." },
  { client: "MetroRetail Group", industry: "Varejo · 240 lojas", metric: "-68%", label: "Incidentes de perda", desc: "Monitoramento centralizado e analítica comportamental em todas as lojas do país." },
  { client: "EnerCore Utilities", industry: "Energia e Utilities", metric: "100%", label: "Subestações monitoradas", desc: "CFTV térmico, intrusão de perímetro e biometria para infraestrutura crítica." },
];

const testimonials = [
  { name: "Sarah Chen", role: "Diretora de Segurança, MetroRetail", quote: "A Sentinel transformou nossas câmeras em ferramenta real de prevenção. Hoje impedimos incidentes antes que aconteçam." },
  { name: "Diego Almeida", role: "COO, LogiPort", quote: "Do perímetro ao controle de acesso, uma única plataforma e um time responsável. Nada cai entre as cadeiras." },
];

function Home() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-8">
        <div className="absolute inset-0 bg-grid-sm opacity-30" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
        <div className="relative max-w-2xl">
          <Badge variant="info">● Tecnologia em Segurança Física</Badge>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
            Protegemos espaços físicos com <span className="text-gradient-blue">vigilância inteligente.</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            CFTV com IA, controle de acesso biométrico, automação predial e monitoramento remoto 24/7 — feitos para empresas que levam a segurança física a sério.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/explore/meeting" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
              Agendar Avaliação Técnica <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/explore/case-studies" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm font-semibold hover:bg-accent">Ver Nossos Cases</Link>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            {["Central 24/7", "ISO 27001", "LGPD / GDPR", "Engenharia em campo no Brasil"].map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-success" />{c}</span>
            ))}
          </div>
        </div>
      </div>

      <section>
        <div className="mb-3 text-xs font-mono uppercase tracking-[0.3em] text-primary">Capacidades principais</div>
        <div className="space-y-3">
          {featured.map((s) => (
            <Card key={s.title} className="flex items-center gap-5 p-5 transition hover:border-primary/50">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-secondary/50 text-cyan">{s.icon}</div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{s.title}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">{s.desc}</div>
              </div>
              <Link to="/explore/services" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline md:inline-flex">Saiba mais <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 text-xs font-mono uppercase tracking-[0.3em] text-primary">Por que Sentinel</div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Card key={b.title} className={`p-5 transition hover:border-primary/50 ${i === 0 ? "border-primary/50 ring-1 ring-primary/20" : ""}`}>
              <div className="text-cyan">{b.icon}</div>
              <div className="mt-4 font-semibold">{b.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{b.desc}</div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 text-xs font-mono uppercase tracking-[0.3em] text-primary">Cases de Sucesso</div>
        <h2 className="mb-5 text-2xl font-bold">Resultados que importam para a operação</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {stories.map((s) => (
            <Card key={s.client} className="p-5">
              <div className="font-semibold">{s.client}</div>
              <Badge variant="info">{s.industry}</Badge>
              <div className="mt-4 font-mono text-3xl font-bold text-gradient-blue">{s.metric}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              <Link to="/explore/case-studies" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Ler case completo <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <Card key={t.name} className="p-6">
            <Quote className="h-6 w-6 text-primary/60" />
            <p className="mt-3 text-sm leading-relaxed">"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan text-xs font-bold text-primary-foreground">{t.name.split(" ").map((n) => n[0]).join("")}</div>
              <div><div className="text-sm font-semibold">{t.name}</div><div className="text-xs text-muted-foreground">{t.role}</div></div>
            </div>
          </Card>
        ))}
      </section>

      <Card className="grid gap-6 p-6 md:grid-cols-4">
        {[
          { v: "500+", l: "Sites corporativos" },
          { v: "120k+", l: "Câmeras gerenciadas" },
          { v: "180+", l: "Profissionais em campo e operação" },
          { v: "3", l: "Centrais de monitoramento 24/7" },
        ].map((s) => (
          <div key={s.l}>
            <div className="font-mono text-3xl font-bold text-gradient-blue">{s.v}</div>
            <div className="text-xs text-muted-foreground">{s.l}</div>
          </div>
        ))}
        <div className="md:col-span-4 -mt-2 flex items-center gap-2 text-xs text-muted-foreground"><Award className="h-3.5 w-3.5 text-cyan" />Instaladores certificados em 12 países</div>
      </Card>
    </div>
  );
}
