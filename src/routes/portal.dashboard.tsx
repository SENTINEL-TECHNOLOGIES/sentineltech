import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Activity, Shield, AlertTriangle, FileBarChart, Server, Briefcase, CheckCircle2, Network, Cpu, Wifi } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, Legend } from "recharts";

export const Route = createFileRoute("/portal/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Sentinel Portal" }] }),
  component: Dashboard,
});

const traffic = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  inbound: 200 + Math.round(Math.sin(i / 3) * 80 + Math.random() * 60 + i * 4),
  outbound: 150 + Math.round(Math.cos(i / 4) * 60 + Math.random() * 40 + i * 3),
}));

const threats = [
  { day: "Mon", blocked: 1240, allowed: 18450 },
  { day: "Tue", blocked: 980, allowed: 19120 },
  { day: "Wed", blocked: 1560, allowed: 17880 },
  { day: "Thu", blocked: 1120, allowed: 19340 },
  { day: "Fri", blocked: 2010, allowed: 20100 },
  { day: "Sat", blocked: 420, allowed: 8240 },
  { day: "Sun", blocked: 380, allowed: 7980 },
];

const activities = [
  { time: "2m ago", text: "Firewall rule FW-2049 deployed to edge-prd-01", level: "info" as const },
  { time: "14m ago", text: "Critical patch applied to 12 endpoints", level: "success" as const },
  { time: "32m ago", text: "Unusual login attempt blocked from 84.221.x.x", level: "warning" as const },
  { time: "1h ago", text: "Monthly compliance report generated", level: "info" as const },
  { time: "2h ago", text: "Backup verified — 4.2 TB across 3 vaults", level: "success" as const },
  { time: "3h ago", text: "DDoS mitigation triggered on web-cluster", level: "destructive" as const },
];

const services = [
  { name: "Managed SOC", status: "operational", uptime: "99.99%" },
  { name: "Edge Firewall Cluster", status: "operational", uptime: "100%" },
  { name: "SIEM Pipeline", status: "operational", uptime: "99.98%" },
  { name: "Backup Vaults", status: "degraded", uptime: "99.72%" },
  { name: "Identity Provider", status: "operational", uptime: "99.99%" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Acme Corp</h1>
          <p className="text-sm text-muted-foreground">Real-time view of your infrastructure, security posture and service delivery.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
          <span className="h-2 w-2 animate-pulse-glow rounded-full bg-success" />
          All critical systems operational
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Active Services" value="14" delta="+2 this month" deltaPositive icon={<Shield className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Infrastructure Health" value="99.97%" delta="SLA met" deltaPositive icon={<Activity className="h-5 w-5" />} accent="success" />
        <KpiCard label="Open Tickets" value="7" delta="2 critical" icon={<AlertTriangle className="h-5 w-5" />} accent="warning" />
        <KpiCard label="Security Alerts (24h)" value="42" delta="-18% vs yesterday" deltaPositive icon={<Shield className="h-5 w-5" />} accent="cyan" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Network traffic — last 24h" description="Inbound / outbound throughput in Mbps" action={<Badge variant="info">Live</Badge>} />
          <div className="h-72 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={traffic}>
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
                <Area type="monotone" dataKey="inbound" stroke="oklch(0.62 0.21 258)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="outbound" stroke="oklch(0.78 0.13 210)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Network status" description="Edge & core systems" />
          <div className="space-y-3 p-5">
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground">Uptime {s.uptime}</div>
                </div>
                {s.status === "operational" ? <Badge variant="success">● Operational</Badge> : <Badge variant="warning">● Degraded</Badge>}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Threats blocked vs allowed" description="Last 7 days — perimeter & endpoint defense" />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={threats}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.06 265 / 0.4)" />
                <XAxis dataKey="day" stroke="oklch(0.7 0.03 255)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.7 0.03 255)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.21 0.07 268)", border: "1px solid oklch(0.32 0.06 265)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="allowed" name="Allowed" fill="oklch(0.62 0.21 258)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="blocked" name="Blocked" fill="oklch(0.62 0.22 25)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Project progress" description="Active engagements" />
          <div className="space-y-4 p-5">
            {[
              { name: "SD-WAN rollout — Phase 3", pct: 78 },
              { name: "Zero-Trust IAM migration", pct: 42 },
              { name: "SOC 2 readiness", pct: 91 },
              { name: "Cloud workload protection", pct: 64 },
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
        <Card className="lg:col-span-2">
          <CardHeader title="Network topology — primary site" description="Edge → Core → Cloud" action={<Badge variant="success">Healthy</Badge>} />
          <div className="relative h-72 overflow-hidden p-4">
            <svg viewBox="0 0 600 240" className="h-full w-full">
              <defs>
                <linearGradient id="ln" x1="0" x2="1">
                  <stop offset="0" stopColor="oklch(0.62 0.21 258)" />
                  <stop offset="1" stopColor="oklch(0.78 0.13 210)" />
                </linearGradient>
              </defs>
              {[
                { x1: 90, x2: 290, y: 120 },
                { x1: 290, x2: 490, y: 60 },
                { x1: 290, x2: 490, y: 120 },
                { x1: 290, x2: 490, y: 180 },
              ].map((l, i) => (
                <line key={i} x1={l.x1} y1={l.y} x2={l.x2} y2={l.y} stroke="url(#ln)" strokeWidth={2} strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1s" repeatCount="indefinite" />
                </line>
              ))}
              <Node x={90} y={120} label="EDGE" icon="wifi" />
              <Node x={290} y={120} label="CORE" icon="cpu" primary />
              <Node x={490} y={60} label="DC-1" icon="server" />
              <Node x={490} y={120} label="AWS" icon="server" />
              <Node x={490} y={180} label="AZURE" icon="server" />
            </svg>
          </div>
        </Card>

        <Card>
          <CardHeader title="Recent activities" />
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

function Node({ x, y, label, icon, primary }: { x: number; y: number; label: string; icon: string; primary?: boolean }) {
  const Icon = icon === "cpu" ? Cpu : icon === "wifi" ? Wifi : Server;
  return (
    <g transform={`translate(${x - 28} ${y - 28})`}>
      <rect width="56" height="56" rx="12" fill={primary ? "oklch(0.62 0.21 258 / 0.25)" : "oklch(0.27 0.06 265 / 0.6)"} stroke={primary ? "oklch(0.62 0.21 258)" : "oklch(0.32 0.06 265)"} />
      <foreignObject x="16" y="14" width="24" height="24">
        <Icon className={primary ? "h-6 w-6 text-primary" : "h-6 w-6 text-cyan"} />
      </foreignObject>
      <text x="28" y="72" textAnchor="middle" fontSize="10" fill="oklch(0.85 0.02 255)" fontFamily="JetBrains Mono">{label}</text>
    </g>
  );
}
