import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { Camera, Globe, Fingerprint, Building2, Activity, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/explore/services")({
  head: () => ({ meta: [{ title: "Soluções — Sentinel" }] }),
  component: Services,
});

const services = [
  {
    icon: <Camera className="h-7 w-7" />, title: "Monitoramento com IA", featured: true,
    desc: "Câmeras inteligentes que reconhecem pessoas, veículos e comportamentos suspeitos em tempo real.",
    bullets: ["Detecção de pessoas e objetos", "Reconhecimento de placas (LPR)", "Alertas comportamentais"],
  },
  {
    icon: <Globe className="h-7 w-7" />, title: "Monitoramento Remoto 24/7",
    desc: "Operadores treinados acompanham suas instalações em todos os turnos.",
    bullets: ["Resposta em até 3 min", "Verificação ao vivo de alarmes", "Coordenação com despacho"],
  },
  {
    icon: <Fingerprint className="h-7 w-7" />, title: "Controle de Acesso Biométrico",
    desc: "Face, digital e múltiplos fatores unificados em todas as portas.",
    bullets: ["Biometria anti-fraude", "Gestão de visitantes", "Integração com RH/ERP"],
  },
  {
    icon: <Building2 className="h-7 w-7" />, title: "Automação Inteligente",
    desc: "Iluminação, portões, alarmes e sensores orquestrados como um só.",
    bullets: ["Economia de energia 15-30%", "Regras automáticas", "App de controle móvel"],
  },
  {
    icon: <Activity className="h-7 w-7" />, title: "Analytics e Alertas",
    desc: "Dashboards executivos e alertas em tempo real para sua operação.",
    bullets: ["Relatórios mensais", "Alertas via WhatsApp/E-mail", "API aberta para integrações"],
  },
];

function Services() {
  return (
    <div className="space-y-12 pb-8">
      <header className="max-w-3xl">
        <Badge variant="info">Soluções</Badge>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Segurança física, de ponta a ponta</h1>
        <p className="mt-4 text-muted-foreground">Um único parceiro para projetar, instalar e operar sua segurança.</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {services.map((s, i) => (
          <Card key={s.title} className={`group p-7 transition hover:border-primary/60 hover:translate-y-[-2px] ${s.featured ? "md:col-span-2 border-primary/40 bg-gradient-to-br from-card to-primary/5" : ""} ${i === services.length - 1 && services.length % 2 === 0 ? "" : ""}`}>
            <div className="flex items-start gap-5">
              <div className={`grid place-items-center rounded-xl border border-border bg-secondary/50 text-cyan ${s.featured ? "h-16 w-16" : "h-14 w-14"}`}>{s.icon}</div>
              <div className="min-w-0 flex-1">
                {s.featured && <Badge variant="info">Mais procurado</Badge>}
                <h3 className={`font-bold ${s.featured ? "mt-2 text-2xl" : "text-xl"}`}>{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm"><Check className="h-3.5 w-3.5 text-success" />{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <section className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Vamos desenhar a solução ideal para o seu site</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/explore/meeting" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
            Solicitar Demonstração <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/explore/contact" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-semibold hover:bg-accent">
            Contato
          </Link>
        </div>
      </section>
    </div>
  );
}
