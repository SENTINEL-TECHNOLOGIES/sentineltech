import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { DashboardMockup } from "@/components/dashboard-mockup";
import { Camera, Globe, Fingerprint, Building2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/explore/services")({
  head: () => ({
    meta: [
      { title: "A Plataforma — Sentinel" },
      { name: "description", content: "Vigilância, controle de acesso, automação e central 24/7 reunidos em uma única plataforma Sentinel." },
      { property: "og:title", content: "A Plataforma — Sentinel" },
      { property: "og:description", content: "Um painel único para câmeras, acessos, automação e alertas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const services = [
  { icon: <Camera className="h-6 w-6" />, title: "Vigilância inteligente", desc: "Detecta pessoas, veículos e situações de risco automaticamente." },
  { icon: <Fingerprint className="h-6 w-6" />, title: "Controle de acesso", desc: "Biometria, visitantes e histórico de cada entrada." },
  { icon: <Globe className="h-6 w-6" />, title: "Central 24/7", desc: "Operadores verificam e acionam resposta em minutos." },
  { icon: <Building2 className="h-6 w-6" />, title: "Automação predial", desc: "Portões, alarmes e iluminação em regras automáticas." },
];

function Services() {
  return (
    <div className="space-y-20 pb-12">
      <header className="mx-auto max-w-2xl text-center">
        <Badge variant="info">A plataforma</Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Uma tela para toda a operação</h1>
        <p className="mt-4 text-muted-foreground">Do sensor ao alerta, sem trocar de sistema.</p>
      </header>

      <DashboardMockup className="mx-auto max-w-4xl" />

      <section className="grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <Card key={s.title} className="p-7 transition hover:translate-y-[-2px] hover:border-primary/60">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary/60 text-cyan">{s.icon}</div>
            <h2 className="mt-5 text-lg font-bold">{s.title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
          </Card>
        ))}
      </section>

      <section className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card p-10 text-center md:p-14">
        <h2 className="text-3xl font-bold">Veja funcionando no seu site</h2>
        <Link to="/explore/meeting" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
          Solicitar Demonstração <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
