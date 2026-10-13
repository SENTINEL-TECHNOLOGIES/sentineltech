import { Link } from "@tanstack/react-router";
import { Activity, AlertTriangle, ArrowRight, Camera, CircleCheck, Radio, ShieldCheck } from "lucide-react";
import { Badge, Card, CardHeader, KpiCard } from "@/components/ui-bits";
import { useSession } from "@/hooks/use-session";
import { useDevices } from "@/lib/devices";

export function CorporateDashboard() {
  const { firstName } = useSession();
  const { devices } = useDevices();
  const cameras = devices.filter((device) => device.type === "camera");
  const online = devices.filter((device) => device.status === "online").length;
  const attention = devices.filter((device) => device.status !== "online");
  const sites = [...new Set(devices.map((device) => device.location.trim()).filter(Boolean))];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold">{firstName ? `Olá, ${firstName}` : "Centro de Comando"}</h1>
            <Badge variant="success">Ambiente corporativo</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Operação e equipamentos associados à sessão da sua empresa.</p>
        </div>
        <Link to="/portal/monitoring" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-accent">
          Abrir monitoramento <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Dispositivos cadastrados" value={String(devices.length)} delta="neste ambiente" deltaPositive icon={<Activity className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Dispositivos online" value={String(online)} delta={devices.length ? `${Math.round((online / devices.length) * 100)}% disponíveis` : "sem dispositivos"} deltaPositive icon={<CircleCheck className="h-5 w-5" />} accent="success" />
        <KpiCard label="Câmeras" value={String(cameras.length)} delta="no inventário da empresa" icon={<Camera className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Equipamentos em atenção" value={String(attention.length)} delta={attention.length ? "verifique o status" : "sem alertas de equipamento"} deltaPositive={!attention.length} icon={<AlertTriangle className="h-5 w-5" />} accent={attention.length ? "warning" : "success"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <Card>
          <CardHeader title="Status dos equipamentos" description="Inventário vinculado à conta autenticada" action={<Link to="/portal/infrastructure" className="text-xs font-semibold text-primary hover:underline">Abrir dispositivos</Link>} />
          {devices.length ? (
            <div className="divide-y divide-border">
              {devices.slice(0, 6).map((device) => (
                <div key={device.id} className="flex items-center gap-3 p-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">{device.type === "camera" ? <Camera className="h-4 w-4" /> : <Activity className="h-4 w-4" />}</div>
                  <div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{device.name}</div><div className="truncate text-xs text-muted-foreground">{device.location}</div></div>
                  <Badge variant={device.status === "online" ? "success" : device.status === "maintenance" ? "warning" : "destructive"}>{device.status === "online" ? "Online" : device.status === "maintenance" ? "Manutenção" : "Offline"}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center px-5 py-12 text-center"><ShieldCheck className="h-9 w-9 text-cyan" /><h2 className="mt-3 font-semibold">Nenhum dispositivo neste ambiente</h2><p className="mt-1 max-w-md text-sm text-muted-foreground">Os dados operacionais aparecem aqui quando equipamentos forem associados a esta conta.</p></div>
          )}
        </Card>

        <Card>
          <CardHeader title="Resumo do ambiente" description="Visibilidade corporativa, sem administração global" />
          <div className="space-y-4 p-5">
            <div className="flex items-start gap-3"><div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-success/10 text-success"><Radio className="h-4 w-4" /></div><div><div className="text-sm font-medium">Monitoramento da empresa</div><div className="text-xs text-muted-foreground">Alertas e ocorrências do ambiente autorizado.</div></div></div>
            <div className="flex items-start gap-3"><div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Camera className="h-4 w-4" /></div><div><div className="text-sm font-medium">Locais cadastrados</div><div className="text-xs text-muted-foreground">{sites.length ? sites.join(", ") : "Nenhum local cadastrado nos dispositivos desta conta."}</div></div></div>
            <Link to="/portal/reports" className="flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-primary hover:underline">Consultar relatórios e evidências <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Card>
      </div>
    </div>
  );
}