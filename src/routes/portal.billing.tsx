import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { ArrowRight, BadgeDollarSign, CreditCard, Package } from "lucide-react";
import { getActiveServices, SERVICE_CATALOG, type ActiveService } from "@/lib/account";

export const Route = createFileRoute("/portal/billing")({
  head: () => ({ meta: [{ title: "Financeiro — Sentinel" }] }),
  component: Billing,
});

function Billing() {
  const [activeServices, setActiveServices] = useState<ActiveService[]>([]);
  useEffect(() => {
    const sync = () => setActiveServices(getActiveServices());
    sync();
    window.addEventListener("sentinel-account-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("sentinel-account-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const services = SERVICE_CATALOG.filter((service) => activeServices.some((active) => active.serviceId === service.id));
  const monthlyInvestment = services.reduce((sum, service) => sum + (service.period === "mês" ? service.price : 0), 0);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Planos e Investimentos</h1><p className="text-sm text-muted-foreground">Serviços e valores associados à sua conta.</p></div>

      <div className="grid gap-4 sm:grid-cols-2">
        <KpiCard label="Serviços ativos" value={String(services.length)} delta="nesta conta" deltaPositive icon={<Package className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Investimento mensal" value={`R$ ${monthlyInvestment.toLocaleString("pt-BR")}`} delta="estimativa pelos serviços ativos" icon={<CreditCard className="h-5 w-5" />} accent="cyan" />
      </div>

      <Card>
        <CardHeader title="Serviços contratados" description="Valores demonstrativos do catálogo Sentinel" action={<Badge variant="info">Valores de referência</Badge>} />
        {services.length ? <div className="divide-y divide-border">
          {services.map((service) => (
            <div key={service.id} className="flex flex-wrap items-center gap-3 p-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><BadgeDollarSign className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1"><div className="font-medium">{service.name}</div><div className="text-xs text-muted-foreground">{service.description}</div></div>
              <div className="text-right"><div className="font-mono font-semibold">R$ {service.price.toLocaleString("pt-BR")}</div><div className="text-xs text-muted-foreground">/{service.period}</div></div>
              <Badge variant="success">Ativo</Badge>
            </div>
          ))}
        </div> : <div className="p-6 text-sm text-muted-foreground">Você ainda não possui serviços ativos nesta conta.</div>}
        <div className="border-t border-border p-4">
          <Link to="/explore/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Explorar serviços disponíveis <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Card>

      <p className="text-xs text-muted-foreground">Preços e contratações são demonstrativos e armazenados nesta sessão local; não há cobrança nem contrato conectado.</p>
    </div>
  );
}
