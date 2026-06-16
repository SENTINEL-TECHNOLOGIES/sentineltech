import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Camera, Fingerprint, AlertTriangle, Users, MapPin, Activity, ShieldAlert, Wrench } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, Legend } from "recharts";

export const Route = createFileRoute("/portal/dashboard")({
  head: () => ({ meta: [{ title: "Operations — Sentinel Portal" }] }),
  component: Dashboard,
});

const accessFlow = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}h`,
  entries: 20 + Math.round(Math.sin((i - 8) / 3) * 120 + Math.max(0, 200 - Math.abs(i - 9) * 22) + Math.random() * 18),
  exits: 15 + Math.round(Math.sin((i - 17) / 3) * 110 + Math.max(0, 200 - Math.abs(i - 18) * 22) + Math.random() * 18),
}));

const eventsWeek = [
  { day: "Mon", motion: 412, intrusion: 6, access: 1240 },
  { day: "Tue", motion: 388, intrusion: 4, access: 1180 },
  { day: "Wed", motion: 502, intrusion: 9, access: 1320 },
  { day: "Thu", motion: 446, intrusion: 3, access: 1270 },
  { day: "Fri", motion: 612, intrusion: 11, access: 1410 },
  { day: "Sat", motion: 184, intrusion: 2, access: 420 },
  { day: "Sun", motion: 142, intrusion: 1, access: 380 },
];

const activities = [
  { time: "2m ago", text: "AI detection — unattended bag · Lobby Cam 03 · HQ Tower", level: "warning" as const },
  { time: "8m ago", text: "Biometric access granted — J. Almeida · Server Room B", level: "success" as const },
  { time: "21m ago", text: "Maintenance scheduled — Cam 14 (DC-2 perimeter) tomorrow 09:00", level: "info" as const },
  { time: "34m ago", text: "Unauthorized access attempt blocked — Gate 4 · Warehouse SP", level: "destructive" as const },
  { time: "1h ago", text: "Visitor check-in — 12 contractors registered at Plant 2", level: "info" as const },
  { time: "2h ago", text: "Perimeter sweep complete — 0 anomalies across 4.8 km fence", level: "success" as const },
];

const facilities = [
  { name: "HQ Tower — São Paulo", cameras: "128/128", health: "operational" },
  { name: "DC-2 Frankfurt", cameras: "92/92", health: "operational" },
  { name: "Logistics Hub — Singapore", cameras: "54/56", health: "degraded" },
  { name: "Manufacturing Plant — Monterrey", cameras: "76/76", health: "operational" },
  { name: "Retail Network (42 sites)", cameras: "498/504", health: "degraded" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Security operations — Acme Corp</h1>
          <p className="text-sm text-muted-foreground">Live view of cameras, access control, automation and incidents across every facility.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
          <span className="h-2 w-2 animate-pulse-glow rounded-full bg-success" />
          All sites under active surveillance
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Active Cameras" value="848 / 856" delta="99.1% online" deltaPositive icon={<Camera className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Online Devices" value="2,184" delta="+18 this week" deltaPositive icon={<Activity className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Access Events Today" value="3,612" delta="entries + exits" icon={<Fingerprint className="h-5 w-5" />} accent="success" />
        <KpiCard label="Security Incidents (24h)" value="7" delta="2 unresolved" icon={<AlertTriangle className="h-5 w-5" />} accent="warning" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Visitor Registrations" value="142" delta="today" icon={<Users className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Monitored Locations" value="46" delta="across 12 regions" deltaPositive icon={<MapPin className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="System Health" value="98.4%" delta="all subsystems" deltaPositive icon={<ShieldAlert className="h-5 w-5" />} accent="success" />
        <KpiCard label="Platform Uptime" value="99.98%" delta="last 90 days" deltaPositive icon={<Activity className="h-5 w-5" />} accent="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Access flow — last 24h" description="Entries vs exits across all controlled doors" action={<Badge variant="info">Live</Badge>} />
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
                <Area type="monotone" dataKey="entries" stroke="oklch(0.62 0.21 258)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="exits" stroke="oklch(0.78 0.13 210)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Facility overview" description="Camera health by site" />
          <div className="space-y-3 p-5">
            {facilities.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground">Cameras {s.cameras}</div>
                </div>
                {s.health === "operational" ? <Badge variant="success">● Operational</Badge> : <Badge variant="warning">● Degraded</Badge>}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Security events — last 7 days" description="Motion, intrusion and access correlations" />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventsWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.06 265 / 0.4)" />
                <XAxis dataKey="day" stroke="oklch(0.7 0.03 255)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.7 0.03 255)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.21 0.07 268)", border: "1px solid oklch(0.32 0.06 265)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="access" name="Access events" fill="oklch(0.62 0.21 258)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="motion" name="Motion detections" fill="oklch(0.78 0.13 210)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="intrusion" name="Intrusion alerts" fill="oklch(0.62 0.22 25)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Device health" description="Subsystem status" />
          <div className="space-y-4 p-5">
            {[
              { name: "CCTV network", pct: 99 },
              { name: "Access controllers", pct: 96 },
              { name: "Biometric readers", pct: 94 },
              { name: "Alarm sensors", pct: 88 },
              { name: "Automation hubs", pct: 92 },
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
          <CardHeader title="Maintenance alerts" description="Scheduled & required interventions" action={<Badge variant="warning">3 open</Badge>} />
          <div className="divide-y divide-border">
            {[
              { device: "Cam 14 · DC-2 Perimeter", issue: "Lens calibration drift", eta: "Tomorrow 09:00" },
              { device: "Reader BR-04 · Gate 2", issue: "Fingerprint sensor wear", eta: "Friday 14:00" },
              { device: "Hub AUT-21 · HQ Floor 7", issue: "Firmware update pending", eta: "This weekend" },
              { device: "Cam 88 · Retail SP-12", issue: "Connectivity intermittent", eta: "Dispatched" },
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
          <CardHeader title="Recent activity" description="Cross-facility security feed" />
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
    </div>
  );
}
