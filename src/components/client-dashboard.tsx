import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, CircleCheck, CreditCard, Headset, Package, ShieldCheck } from "lucide-react";
import { Badge, Card, CardHeader, KpiCard } from "@/components/ui-bits";
import { getActiveServices, SERVICE_CATALOG, type ActiveService } from "@/lib/account";
import { useSession } from "@/hooks/use-session";

export function ClientDashboard() {
  const { firstName } = useSession();
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
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{firstName ? `Olá, ${firstName}` : "Visão Geral"}</h1>
            <Badge variant="info">Área do Cliente</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Acompanhe serviços contratados, investimentos e solicitações da sua conta.</p>
        </div>
        <Link to="/explore/proposal" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Solicitar proposta <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Serviços contratados" value={String(services.length)} delta={services.length ? "ativos nesta conta" : "nenhum serviço ativo"} deltaPositive={services.length > 0} icon={<Package className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Investimento mensal" value={`R$ ${monthlyInvestment.toLocaleString("pt-BR")}`} delta="com base nos serviços ativos" icon={<CreditCard className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Solicitações abertas" value="Consultar" delta="acompanhe o status de atendimento" icon={<Headset className="h-5 w-5" />} accent="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader title="Seus serviços" description="Serviços associados à sua conta" action={<Link to="/explore/services" className="text-xs font-semibold text-primary hover:underline">Ver catálogo</Link>} />
          {services.length ? (
            <div className="divide-y divide-border">
              {services.map((service) => (
                <div key={service.id} className="flex flex-wrap items-center gap-3 p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-success/10 text-success"><CircleCheck className="h-5 w-5" /></div>
                  <div className="min-w-0 flex-1"><div className="font-medium">{service.name}</div><div className="text-xs text-muted-foreground">{service.description}</div></div>
                  <Badge variant="success">Ativo</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><ShieldCheck className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1"><div className="font-medium">Nenhum serviço contratado</div><div className="text-sm text-muted-foreground">Conheça as soluções disponíveis ou solicite uma proposta para sua empresa.</div></div>
              <Link to="/explore/services" className="text-sm font-semibold text-primary hover:underline">Conhecer serviços</Link>
            </div>
          )}
        </Card>

        <Card>
          <CardHeader title="Acesso rápido" description="Gestão da sua relação com a Sentinel" />
          <div className="divide-y divide-border">
            <Link to="/portal/billing" className="flex items-center gap-3 p-4 hover:bg-accent/30"><CreditCard className="h-4 w-4 text-cyan" /><span className="flex-1 text-sm font-medium">Planos e investimentos</span><ArrowRight className="h-4 w-4 text-muted-foreground" /></Link>
            <Link to="/portal/tickets" className="flex items-center gap-3 p-4 hover:bg-accent/30"><Headset className="h-4 w-4 text-primary" /><span className="flex-1 text-sm font-medium">Solicitações e atendimento</span><ArrowRight className="h-4 w-4 text-muted-foreground" /></Link>
            <Link to="/explore/proposal" className="flex items-center gap-3 p-4 hover:bg-accent/30"><BriefcaseBusiness className="h-4 w-4 text-success" /><span className="flex-1 text-sm font-medium">Orçamentos e propostas</span><ArrowRight className="h-4 w-4 text-muted-foreground" /></Link>
          </div>
        </Card>
      </div>
    </div>
  );
}