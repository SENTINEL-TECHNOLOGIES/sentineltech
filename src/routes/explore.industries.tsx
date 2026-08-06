import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { Building, Home, Landmark, Warehouse, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/explore/industries")({
  head: () => ({
    meta: [
      { title: "Para quem é — Sentinel" },
      { name: "description", content: "Empresas, condomínios, poder público e operações logísticas monitorados pela plataforma Sentinel." },
      { property: "og:title", content: "Para quem é — Sentinel" },
      { property: "og:description", content: "Segurança monitorada para empresas, condomínios, cidades e indústria." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Industries,
});

const items = [
  { icon: <Building className="h-6 w-6" />, title: "Empresas", desc: "Acesso controlado e áreas críticas sob vigilância." },
  { icon: <Home className="h-6 w-6" />, title: "Condomínios", desc: "Portaria remota e perímetro monitorado 24h." },
  { icon: <Landmark className="h-6 w-6" />, title: "Poder público", desc: "Câmeras urbanas integradas a um centro de comando." },
  { icon: <Warehouse className="h-6 w-6" />, title: "Logística e indústria", desc: "Pátios, docas e cargas acompanhados em tempo real." },
];

function Industries() {
  return (
    <div className="space-y-16 pb-12">
      <header className="mx-auto max-w-2xl text-center">
        <Badge variant="info">Para quem é</Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Feita para quem não pode parar</h1>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <Card key={i.title} className="p-7 transition hover:translate-y-[-2px] hover:border-primary/60">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary/60 text-cyan">{i.icon}</div>
            <h2 className="mt-5 text-lg font-bold">{i.title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{i.desc}</p>
          </Card>
        ))}
      </div>

      <section className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card p-10 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">Sua operação também cabe aqui</h2>
        <Link to="/explore/meeting" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
          Solicitar Demonstração <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
