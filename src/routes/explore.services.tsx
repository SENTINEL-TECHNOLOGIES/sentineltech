import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, CreditCard, ShieldCheck } from "lucide-react";
import { Badge, Card } from "@/components/ui-bits";
import { SERVICE_CATALOG, getActiveServices } from "@/lib/account";
import { useSession } from "@/hooks/use-session";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/explore/services")({
  head: () => ({ meta: [{ title: "Serviços — Sentinel" }] }),
  component: Services,
});

function Services() {
  const { session } = useSession();
  const [activeIds, setActiveIds] = useState<string[]>([]);
  useEffect(() => { setActiveIds(getActiveServices().map((service) => service.serviceId)); }, [session]);

  return <div className="mx-auto w-full max-w-6xl space-y-10 px-5 py-8 pb-12 sm:px-8 md:py-12 lg:px-10">
    <header className="max-w-2xl"><Badge variant="info">Serviços Sentinel</Badge><h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Escolha a estrutura da sua operação</h1><p className="mt-4 text-muted-foreground">Ative um serviço para liberar sua dashboard e começar a cadastrar equipamentos monitorados.</p></header>
    <div className="grid gap-5 md:grid-cols-2">
      {SERVICE_CATALOG.map((service) => { const active = activeIds.includes(service.id); return <Card key={service.id} className="flex flex-col p-6 transition hover:border-primary/60">
        <div className="flex items-start justify-between gap-4"><div><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><ShieldCheck className="h-5 w-5" /></div><h2 className="mt-5 text-xl font-bold">{service.name}</h2></div>{active && <Badge variant="success">Ativo</Badge>}</div>
        <p className="mt-2 text-sm text-muted-foreground">{service.description}</p><ul className="mt-5 space-y-2 text-sm">{service.features.map((feature) => <li key={feature} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" />{feature}</li>)}</ul>
        <div className="mt-7 flex items-end justify-between gap-4 border-t border-border pt-5"><div><span className="font-mono text-2xl font-bold">R$ {service.price.toFixed(2).replace(".", ",")}</span><span className="text-xs text-muted-foreground"> / {service.period}</span></div>{active ? <Link to="/portal/dashboard" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent">Abrir dashboard <ArrowRight className="h-4 w-4" /></Link> : <Link to="/explore/checkout" search={{ service: service.id }} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"><CreditCard className="h-4 w-4" /> Contratar</Link>}</div>
      </Card>; })}
    </div>
    {!session && <div className="rounded-xl border border-cyan/30 bg-cyan/10 p-4 text-sm text-cyan">Crie uma conta antes de contratar um serviço. <Link to="/cadastro" className="font-semibold underline">Cadastrar agora</Link></div>}
  </div>;
}
