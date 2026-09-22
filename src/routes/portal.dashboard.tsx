import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Camera, Fingerprint, AlertTriangle, Users, MapPin, Activity, ShieldAlert, Wrench, Trash2 } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, Legend } from "recharts";
import { AddDeviceButton } from "@/components/add-device-modal";
import { useDevices, DEVICE_TYPE_LABELS, type DeviceType } from "@/lib/devices";
import { useSession } from "@/hooks/use-session";
import { CREDENTIALS } from "@/lib/auth";
import { getActiveServices } from "@/lib/account";
import type { SecurityDevice } from "@/lib/devices";

export const Route = createFileRoute("/portal/dashboard")({
  head: () => ({ meta: [{ title: "Operações — Portal Sentinel" }] }),
  component: Dashboard,
});

const accessFlow = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}h`,
  entradas: 20 + Math.round(Math.sin((i - 8) / 3) * 120 + Math.max(0, 200 - Math.abs(i - 9) * 22) + Math.random() * 18),
  saidas: 15 + Math.round(Math.sin((i - 17) / 3) * 110 + Math.max(0, 200 - Math.abs(i - 18) * 22) + Math.random() * 18),
}));

const eventsWeek = [
  { day: "Seg", motion: 412, intrusion: 6, access: 1240 },
  { day: "Ter", motion: 388, intrusion: 4, access: 1180 },
  { day: "Qua", motion: 502, intrusion: 9, access: 1320 },
  { day: "Qui", motion: 446, intrusion: 3, access: 1270 },
  { day: "Sex", motion: 612, intrusion: 11, access: 1410 },
  { day: "Sáb", motion: 184, intrusion: 2, access: 420 },
  { day: "Dom", motion: 142, intrusion: 1, access: 380 },
];

type RiskLevel = "baixo" | "médio" | "alto";

type LiveEvent = {
  time: string;
  text: string;
  level: "success" | "warning" | "destructive" | "info";
  risk: RiskLevel;
};

const activities: LiveEvent[] = [];

const facilities = [
  { name: "Torre Matriz — São Paulo", cameras: "128/128", health: "operational" },
  { name: "DC-2 Frankfurt", cameras: "92/92", health: "operational" },
  { name: "Hub Logístico — Singapura", cameras: "54/56", health: "degraded" },
  { name: "Planta Industrial — Monterrey", cameras: "76/76", health: "operational" },
  { name: "Rede de Varejo (42 sites)", cameras: "498/504", health: "degraded" },
];

function Dashboard() {
  const { devices, removeDevice, updateStatus } = useDevices();
  const { firstName, session } = useSession();
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const hasDevices = devices.length > 0;
  const isDemoAccount = session?.email?.trim().toLowerCase() === CREDENTIALS.corporate.email;
  const hasActiveService = isDemoAccount || getActiveServices().length > 0;
  const [selectedDevice, setSelectedDevice] = useState<SecurityDevice | null>(null);

  useEffect(() => {
    if (!hasDevices) {
      setLiveEvents([]);
      return;
    }

    const timers: number[] = [];

    function addRandomEvent(device: SecurityDevice) {
      const riskRoll = Math.random();
      const risk: RiskLevel = riskRoll < 0.55 ? "baixo" : riskRoll < 0.85 ? "médio" : "alto";

      const templates: Record<DeviceType, Record<RiskLevel, { text: string; level: LiveEvent["level"] }>> = {
        camera: {
          baixo: { text: "IA reconheceu movimento normal em área monitorada", level: "info" },
          médio: { text: "IA identificou fluxo incomum em área monitorada", level: "warning" },
          alto: { text: "IA detectou intrusão em área restrita", level: "destructive" },
        },
        biometric: {
          baixo: { text: "IA validou acesso autorizado com baixa anomalia", level: "success" },
          médio: { text: "IA alertou para acesso fora do padrão", level: "warning" },
          alto: { text: "IA flagou tentativa não autorizada de acesso", level: "destructive" },
        },
        alarm: {
          baixo: { text: "IA confirmou sistema de alarme estável", level: "success" },
          médio: { text: "IA registrou falha temporária de sensor", level: "warning" },
          alto: { text: "IA detectou disparo crítico do sistema de alarme", level: "destructive" },
        },
        automation: {
          baixo: { text: "IA confirmou automação executada com sucesso", level: "info" },
          médio: { text: "IA apontou atraso de rotina automatizada", level: "warning" },
          alto: { text: "IA identificou falha crítica de automação", level: "destructive" },
        },
        sensor: {
          baixo: { text: "IA confirmou leitura ambiental dentro do limite", level: "success" },
          médio: { text: "IA sinalizou variável ambiental anormal", level: "warning" },
          alto: { text: "IA detectou risco ambiental elevado", level: "destructive" },
        },
      };

      const template = templates[device.type][risk];
      const event = {
        ...template,
        text: `${template.text} — ${device.name} · ${device.location}`,
        time: "agora",
        risk,
      } satisfies LiveEvent;

      if (risk === "alto") {
        updateStatus(device.id, "offline");
      } else if (risk === "baixo") {
        updateStatus(device.id, "online");
      }

      setLiveEvents((current) => [event, ...current].slice(0, 6));
    }

    devices.forEach((device) => {
      const timer = window.setTimeout(() => {
        addRandomEvent(device);
        const repeat = window.setInterval(() => addRandomEvent(device), 15000 + Math.floor(Math.random() * 45000));
        timers.push(repeat);
      }, 15000 + Math.floor(Math.random() * 45000));
      timers.push(timer);
    });

    return () => timers.forEach((timer) => {
      window.clearTimeout(timer);
      window.clearInterval(timer);
    });
  }, [devices, hasDevices]);

  const currentActivities = [...liveEvents, ...activities].slice(0, 6);
  if (!hasActiveService) {
    return <Card className="mx-auto max-w-2xl border-dashed"><div className="flex flex-col items-center px-6 py-16 text-center"><ShieldAlert className="h-10 w-10 text-cyan" /><h1 className="mt-4 text-2xl font-bold">Ative um serviço para acessar sua dashboard</h1><p className="mt-2 max-w-md text-sm text-muted-foreground">Escolha um serviço Sentinel para liberar o monitoramento, o cadastro de equipamentos e os eventos da sua conta.</p><Link to="/explore/services" className="mt-6 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Conhecer serviços</Link></div></Card>;
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{firstName ? `Olá, ${firstName}` : "Olá"}</h1>
          <p className="text-sm text-muted-foreground">{hasDevices ? "Visão ao vivo dos seus dispositivos e eventos de segurança." : "Adicione seu primeiro dispositivo para começar a monitorar sua operação."}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-success" />
            Todos os sites sob vigilância ativa
          </div>
          <AddDeviceButton />
        </div>
      </div>

      {!hasDevices ? (
        <Card className="border-dashed">
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <Camera className="h-10 w-10 text-cyan" />
            <h2 className="mt-4 text-lg font-semibold">Sua operação ainda está vazia</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">Quando você cadastrar um dispositivo, os eventos e indicadores aparecerão aqui em tempo real.</p>
          </div>
        </Card>
      ) : <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Câmeras Ativas" value={isDemoAccount ? "848 / 856" : `${devices.filter((device) => device.type === "camera" && device.status === "online").length} / ${devices.filter((device) => device.type === "camera").length}`} delta={isDemoAccount ? "99,1% online" : "dispositivos cadastrados"} deltaPositive icon={<Camera className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Dispositivos Online" value={isDemoAccount ? "2.184" : String(devices.filter((device) => device.status === "online").length)} delta={isDemoAccount ? "+18 esta semana" : `${devices.length} no inventário`} deltaPositive icon={<Activity className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Eventos de Acesso (Hoje)" value={isDemoAccount ? "3.612" : String(liveEvents.length)} delta={isDemoAccount ? "entradas + saídas" : "eventos simulados"} icon={<Fingerprint className="h-5 w-5" />} accent="success" />
        <KpiCard label="Incidentes (24h)" value={isDemoAccount ? "7" : String(liveEvents.filter((event) => event.risk === "médio" || event.risk === "alto").length)} delta={isDemoAccount ? "2 em aberto" : "alertas ativos"} icon={<AlertTriangle className="h-5 w-5" />} accent="warning" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Visitantes Registrados" value="142" delta="hoje" icon={<Users className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Locais Monitorados" value="46" delta="em 12 regiões" deltaPositive icon={<MapPin className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Saúde dos Sistemas" value="98,4%" delta="todos subsistemas" deltaPositive icon={<ShieldAlert className="h-5 w-5" />} accent="success" />
        <KpiCard label="Uptime da Plataforma" value="99,98%" delta="últimos 90 dias" deltaPositive icon={<Activity className="h-5 w-5" />} accent="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Fluxo de acesso — últimas 24h" description="Entradas vs saídas em todas as portas controladas" action={<Badge variant="info">Ao vivo</Badge>} />
          <div className="h-72 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accessFlow}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.21 258)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.62 0.21 258)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.13 210)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.78 0.13 210)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.06 265 / 0.4)" />
                <XAxis dataKey="hour" stroke="oklch(0.7 0.03 255)" fontSize={11} tickLine={false} axisLine={false} interval={2} />
                <YAxis stroke="oklch(0.7 0.03 255)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.21 0.07 268)", border: "1px solid oklch(0.32 0.06 265)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="entradas" stroke="oklch(0.62 0.21 258)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="saidas" name="saídas" stroke="oklch(0.78 0.13 210)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Visão por instalação" description="Saúde das câmeras por site" />
          <div className="space-y-3 p-5">
            {facilities.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground">Câmeras {s.cameras}</div>
                </div>
                {s.health === "operational" ? <Badge variant="success">● Operacional</Badge> : <Badge variant="warning">● Degradado</Badge>}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Localização dos equipamentos" description="Mapa operacional mockado · selecione um marcador para ver detalhes" action={<Badge variant="info">{devices.length} equipamentos</Badge>} />
        <div className="grid gap-4 p-4 lg:grid-cols-[1fr_280px]">
          <div className="relative min-h-72 overflow-hidden rounded-lg border border-border bg-secondary/20 bg-grid-sm">
            <div className="absolute left-[12%] top-[18%] h-24 w-36 rounded-lg border border-primary/40 bg-primary/10" /><div className="absolute right-[15%] top-[30%] h-32 w-40 rounded-lg border border-cyan/40 bg-cyan/10" /><div className="absolute bottom-[12%] left-[35%] h-20 w-56 rounded-lg border border-success/40 bg-success/10" />
            {devices.map((device, index) => <button key={device.id} type="button" onClick={() => setSelectedDevice(device)} className={`absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 text-xs shadow-lg transition hover:scale-110 ${device.status === "online" ? "border-success bg-success/20 text-success" : device.status === "offline" ? "border-destructive bg-destructive/20 text-destructive" : "border-warning bg-warning/20 text-warning"}`} style={{ left: `${18 + (index * 23) % 68}%`, top: `${25 + (index * 31) % 58}%` }} title={device.name}><MapPin className="h-4 w-4" /></button>)}
            {devices.length === 0 && <div className="absolute inset-0 grid place-items-center text-center text-sm text-muted-foreground">Cadastre um dispositivo para posicioná-lo no mapa.</div>}
          </div>
          <div className="rounded-lg border border-border bg-secondary/20 p-4">{selectedDevice ? <><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold">{selectedDevice.name}</h3><p className="mt-1 text-xs text-muted-foreground">{DEVICE_TYPE_LABELS[selectedDevice.type]}</p></div><Badge variant={selectedDevice.status === "online" ? "success" : selectedDevice.status === "offline" ? "destructive" : "warning"}>{selectedDevice.status}</Badge></div><dl className="mt-5 space-y-3 text-sm"><div><dt className="text-xs text-muted-foreground">Localização</dt><dd>{selectedDevice.location}</dd></div><div><dt className="text-xs text-muted-foreground">Última atividade</dt><dd>{liveEvents.find((event) => event.text.includes(selectedDevice.name))?.time || "aguardando evento"}</dd></div></dl></> : <div className="flex h-full min-h-40 items-center justify-center text-center text-sm text-muted-foreground">Selecione um marcador para consultar o equipamento.</div>}</div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Eventos de segurança — últimos 7 dias" description="Movimento, intrusão e correlações de acesso" />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventsWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.06 265 / 0.4)" />
                <XAxis dataKey="day" stroke="oklch(0.7 0.03 255)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.7 0.03 255)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.21 0.07 268)", border: "1px solid oklch(0.32 0.06 265)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="access" name="Eventos de acesso" fill="oklch(0.62 0.21 258)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="motion" name="Detecções de movimento" fill="oklch(0.78 0.13 210)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="intrusion" name="Alertas de intrusão" fill="oklch(0.62 0.22 25)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Saúde dos dispositivos" description="Status por subsistema" />
          <div className="space-y-4 p-5">
            {[
              { name: "Rede de CFTV", pct: 99 },
              { name: "Controladoras de acesso", pct: 96 },
              { name: "Leitores biométricos", pct: 94 },
              { name: "Sensores de alarme", pct: 88 },
              { name: "Hubs de automação", pct: 92 },
            ].map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{p.name}</span>
                  <span className="font-mono text-cyan">{p.pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan transition-all" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader title="Alertas de manutenção" description="Intervenções agendadas e necessárias" action={<Badge variant="warning">3 abertos</Badge>} />
          <div className="divide-y divide-border">
            {[
              { device: "Câmera 14 · Perímetro DC-2", issue: "Calibração de lente", eta: "Amanhã 09:00" },
              { device: "Leitor BR-04 · Portão 2", issue: "Desgaste no sensor de digital", eta: "Sexta 14:00" },
              { device: "Hub AUT-21 · Andar 7 Matriz", issue: "Atualização de firmware pendente", eta: "Este fim de semana" },
              { device: "Câmera 88 · Varejo SP-12", issue: "Conectividade intermitente", eta: "Equipe deslocada" },
            ].map((m) => (
              <div key={m.device} className="flex items-start gap-3 p-4">
                <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{m.device}</div>
                  <div className="text-xs text-muted-foreground">{m.issue}</div>
                  <div className="mt-1 font-mono text-[11px] text-cyan">{m.eta}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Atividade recente" description="Feed de segurança entre instalações" />
          <div className="divide-y divide-border">
            {currentActivities.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  a.level === "success" ? "bg-success" : a.level === "warning" ? "bg-warning" : a.level === "destructive" ? "bg-destructive" : "bg-primary"
                }`} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm">{a.text}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="text-muted-foreground">{a.time}</span>
                    <span className={`rounded-full border px-1.5 py-0.5 font-semibold ${
                      a.risk === "baixo" ? "border-success/30 bg-success/10 text-success" :
                      a.risk === "médio" ? "border-warning/30 bg-warning/10 text-warning" :
                      "border-destructive/30 bg-destructive/10 text-destructive"
                    }`}>
                      {a.risk === "baixo" ? "Risco baixo" : a.risk === "médio" ? "Risco médio" : "Risco alto"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      </>}

      <Card>
        <CardHeader title="Meus dispositivos provisionados" description="Inventário de equipamentos de segurança gerenciados" action={<Badge variant="info">{devices.length} ativos</Badge>} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/30 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Dispositivo</th>
                <th className="px-5 py-3">Tipo</th>
                <th className="px-5 py-3">Local</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {devices.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">Nenhum dispositivo. Clique em "Adicionar Dispositivo" no topo.</td></tr>
              )}
              {devices.map((d) => (
                <tr key={d.id} className="hover:bg-accent/30">
                  <td className="px-5 py-3 font-medium">{d.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{DEVICE_TYPE_LABELS[d.type]}</td>
                  <td className="px-5 py-3 text-muted-foreground">{d.location}</td>
                  <td className="px-5 py-3">
                    <select
                      value={d.status}
                      onChange={(e) => updateStatus(d.id, e.target.value as typeof d.status)}
                      className="rounded-md border border-border bg-input/50 px-2 py-1 text-xs"
                    >
                      <option value="online">● Online</option>
                      <option value="maintenance">● Manutenção</option>
                      <option value="offline">● Offline</option>
                    </select>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => removeDevice(d.id)} className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:border-destructive hover:text-destructive">
                      <Trash2 className="h-3 w-3" /> Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
