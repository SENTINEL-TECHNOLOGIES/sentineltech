import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Camera, Fingerprint, AlertTriangle, Users, MapPin, Activity, ShieldAlert, Wrench, Trash2 } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, Legend } from "recharts";
import { AddDeviceButton } from "@/components/add-device-modal";
import { useDevices, DEVICE_TYPE_LABELS } from "@/lib/devices";
import { useSession } from "@/hooks/use-session";

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

const activities = [
  { time: "há 2min", text: "Detecção por IA — objeto abandonado · Câmera Lobby 03 · Torre Matriz", level: "warning" as const },
  { time: "há 8min", text: "Acesso biométrico autorizado — J. Almeida · Sala de Servidores B", level: "success" as const },
  { time: "há 21min", text: "Manutenção agendada — Câmera 14 (perímetro DC-2) amanhã 09:00", level: "info" as const },
  { time: "há 34min", text: "Tentativa de acesso não autorizado bloqueada — Portão 4 · Galpão SP", level: "destructive" as const },
  { time: "há 1h", text: "Check-in de visitantes — 12 prestadores registrados na Planta 2", level: "info" as const },
  { time: "há 2h", text: "Varredura de perímetro concluída — 0 anomalias em 4,8 km de cerca", level: "success" as const },
];

const facilities = [
  { name: "Torre Matriz — São Paulo", cameras: "128/128", health: "operational" },
  { name: "DC-2 Frankfurt", cameras: "92/92", health: "operational" },
  { name: "Hub Logístico — Singapura", cameras: "54/56", health: "degraded" },
  { name: "Planta Industrial — Monterrey", cameras: "76/76", health: "operational" },
  { name: "Rede de Varejo (42 sites)", cameras: "498/504", health: "degraded" },
];

function Dashboard() {
  const { devices, removeDevice, updateStatus } = useDevices();
  const { firstName } = useSession();
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{firstName ? `Olá, ${firstName}` : "Operações de Segurança"}</h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan">Operações de Segurança — Acme Corp</p>
          <p className="text-sm text-muted-foreground">Visão ao vivo de câmeras, controle de acesso, automação e incidentes em todas as instalações.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-success" />
            Todos os sites sob vigilância ativa
          </div>
          <AddDeviceButton />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Câmeras Ativas" value="848 / 856" delta="99,1% online" deltaPositive icon={<Camera className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Dispositivos Online" value="2.184" delta="+18 esta semana" deltaPositive icon={<Activity className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Eventos de Acesso (Hoje)" value="3.612" delta="entradas + saídas" icon={<Fingerprint className="h-5 w-5" />} accent="success" />
        <KpiCard label="Incidentes (24h)" value="7" delta="2 em aberto" icon={<AlertTriangle className="h-5 w-5" />} accent="warning" />
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
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  a.level === "success" ? "bg-success" : a.level === "warning" ? "bg-warning" : a.level === "destructive" ? "bg-destructive" : "bg-primary"
                }`} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm">{a.text}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

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
