import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Shield, AlertTriangle, Activity, Lock, Eye, Globe } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

export const Route = createFileRoute("/portal/monitoring")({
  head: () => ({ meta: [{ title: "Security Operations — Sentinel" }] }),
  component: Monitoring,
});

const traffic = Array.from({ length: 30 }, (_, i) => ({ t: i, in: 500 + Math.round(Math.sin(i / 2) * 200 + Math.random() * 150), out: 380 + Math.round(Math.cos(i / 3) * 160 + Math.random() * 120) }));
const threatTypes = [
  { type: "Phishing", count: 84 }, { type: "Brute Force", count: 56 }, { type: "Malware", count: 22 }, { type: "DDoS", count: 8 }, { type: "Exfiltration", count: 4 }, { type: "Scanning", count: 132 },
];
const radar = [
  { axis: "Network", a: 92 }, { axis: "Endpoint", a: 88 }, { axis: "Identity", a: 95 }, { axis: "Cloud", a: 84 }, { axis: "Data", a: 78 }, { axis: "Apps", a: 86 },
];
const events = [
  { time: "14:32:08", src: "84.221.45.12", dst: "edge-prd-01", rule: "FW-DENY-001", severity: "high", action: "BLOCKED" },
  { time: "14:31:55", src: "10.0.4.122", dst: "auth.acme.io", rule: "IDP-MFA-OK", severity: "info", action: "ALLOWED" },
  { time: "14:31:41", src: "203.0.113.7", dst: "web-cluster", rule: "WAF-SQLI-2", severity: "critical", action: "BLOCKED" },
  { time: "14:31:22", src: "10.0.7.4", dst: "s3.bucket-prd", rule: "DLP-PCI-001", severity: "high", action: "QUARANTINE" },
  { time: "14:30:58", src: "172.20.1.55", dst: "vpn-edge-01", rule: "VPN-CONN", severity: "info", action: "ALLOWED" },
  { time: "14:30:31", src: "91.247.x.x", dst: "mail-gw", rule: "AS-SPAM-12", severity: "medium", action: "BLOCKED" },
];

function Monitoring() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Security Operations Center</h1>
          <p className="text-sm text-muted-foreground">Live threat monitoring across network, endpoint, identity and cloud.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-mono text-primary">
          <span className="h-2 w-2 animate-pulse-glow rounded-full bg-primary" /> SOC-NA-02 · Analyst on shift: K. Park
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Threats Blocked (24h)" value="2,418" delta="+12%" icon={<Shield className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Critical Alerts" value="3" delta="2 escalated" icon={<AlertTriangle className="h-5 w-5" />} accent="destructive" />
        <KpiCard label="Devices Online" value="1,284 / 1,290" delta="99.5%" deltaPositive icon={<Activity className="h-5 w-5" />} accent="success" />
        <KpiCard label="Endpoint Coverage" value="98.6%" delta="EDR + XDR" deltaPositive icon={<Lock className="h-5 w-5" />} accent="cyan" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Traffic analysis" description="Real-time flows — last 30 minutes" action={<Badge variant="info">LIVE</Badge>} />
          <div className="h-72 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={traffic}>
                <defs>
                  <linearGradient id="ti" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.62 0.21 258)" stopOpacity={0.6} /><stop offset="100%" stopColor="oklch(0.62 0.21 258)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="to" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.72 0.17 160)" stopOpacity={0.6} /><stop offset="100%" stopColor="oklch(0.72 0.17 160)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.06 265 / 0.4)" />
                <XAxis dataKey="t" stroke="oklch(0.7 0.03 255)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.7 0.03 255)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.21 0.07 268)", border: "1px solid oklch(0.32 0.06 265)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="in" stroke="oklch(0.62 0.21 258)" fill="url(#ti)" strokeWidth={2} />
                <Area type="monotone" dataKey="out" stroke="oklch(0.72 0.17 160)" fill="url(#to)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Security posture" description="Coverage scoring by domain" />
          <div className="h-72 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar}>
                <PolarGrid stroke="oklch(0.32 0.06 265 / 0.4)" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: "oklch(0.85 0.02 255)", fontSize: 11 }} />
                <PolarRadiusAxis stroke="oklch(0.32 0.06 265 / 0.4)" tick={false} />
                <Radar dataKey="a" stroke="oklch(0.62 0.21 258)" fill="oklch(0.62 0.21 258)" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader title="Firewall activity" description="Top denied rules" />
          <div className="space-y-3 p-5">
            {threatTypes.map((t) => (
              <div key={t.type}>
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{t.type}</span>
                  <span className="font-mono text-cyan">{t.count}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-gradient-to-r from-destructive to-warning" style={{ width: `${(t.count / 132) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Live event stream" description="Edge + endpoint correlated events" action={<Badge variant="destructive">3 critical</Badge>} />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-secondary/40 text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">TIME</th>
                  <th className="px-4 py-2 font-medium">SOURCE</th>
                  <th className="px-4 py-2 font-medium">DEST</th>
                  <th className="px-4 py-2 font-medium">RULE</th>
                  <th className="px-4 py-2 font-medium">SEVERITY</th>
                  <th className="px-4 py-2 font-medium">ACTION</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {events.map((e, i) => (
                  <tr key={i} className="border-t border-border hover:bg-accent/30">
                    <td className="px-4 py-2.5 text-muted-foreground">{e.time}</td>
                    <td className="px-4 py-2.5">{e.src}</td>
                    <td className="px-4 py-2.5">{e.dst}</td>
                    <td className="px-4 py-2.5 text-cyan">{e.rule}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={e.severity === "critical" ? "destructive" : e.severity === "high" ? "warning" : e.severity === "info" ? "info" : "outline"}>{e.severity.toUpperCase()}</Badge>
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge variant={e.action === "BLOCKED" || e.action === "QUARANTINE" ? "destructive" : "success"}>{e.action}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
