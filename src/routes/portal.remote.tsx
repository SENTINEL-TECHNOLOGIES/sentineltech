import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Globe, Headphones, AlertTriangle, Clock, FileText, MapPin } from "lucide-react";

export const Route = createFileRoute("/portal/remote")({
  head: () => ({ meta: [{ title: "Remote Monitoring — Sentinel" }] }),
  component: Remote,
});

const sites = [
  { name: "HQ Tower · São Paulo", country: "BR", cams: 128, status: "ok", alerts: 0 },
  { name: "DC-2 · Frankfurt", country: "DE", cams: 92, status: "ok", alerts: 1 },
  { name: "Warehouse · Singapore", country: "SG", cams: 54, status: "warn", alerts: 2 },
  { name: "Plant · Monterrey", country: "MX", cams: 76, status: "alert", alerts: 4 },
  { name: "Retail Network · Brazil-South", country: "BR", cams: 124, status: "ok", alerts: 0 },
  { name: "Logistics Hub · Rotterdam", country: "NL", cams: 88, status: "ok", alerts: 1 },
];

const incidents = [
  { id: "INC-22841", site: "Plant · Monterrey", title: "Forced gate at Sector 4", status: "investigating", since: "12m", priority: "critical" },
  { id: "INC-22840", site: "Warehouse · Singapore", title: "Camera offline · CAM-09", status: "dispatched", since: "38m", priority: "medium" },
  { id: "INC-22839", site: "DC-2 · Frankfurt", title: "Door held open · cold aisle", status: "resolved", since: "2h", priority: "high" },
  { id: "INC-22838", site: "Plant · Monterrey", title: "Visitor without escort detected", status: "investigating", since: "3h", priority: "high" },
];

const team = [
  { name: "K. Park", role: "Lead Operator", shift: "14:00 – 22:00", calls: 12, status: "on" },
  { name: "R. Mendes", role: "Operator", shift: "14:00 – 22:00", calls: 8, status: "on" },
  { name: "L. Tanaka", role: "Operator", shift: "06:00 – 14:00", calls: 14, status: "off" },
  { name: "A. Diallo", role: "Dispatch", shift: "24/7 rotation", calls: 22, status: "on" },
];

function Remote() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">24/7 Remote Monitoring</Badge>
        <h1 className="mt-3 text-2xl font-bold">Remote Monitoring</h1>
        <p className="mt-1 text-sm text-muted-foreground">Multi-facility oversight, incident management and response from our 24/7 monitoring center.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Facilities Monitored" value="46" delta="12 countries" deltaPositive icon={<Globe className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Active Alerts" value="8" delta="3 critical" icon={<AlertTriangle className="h-5 w-5" />} accent="destructive" />
        <KpiCard label="Avg Response Time" value="3m 12s" delta="-18% vs SLA" deltaPositive icon={<Clock className="h-5 w-5" />} accent="success" />
        <KpiCard label="Operators On Duty" value="14" delta="across 3 SOCs" icon={<Headphones className="h-5 w-5" />} accent="cyan" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Multi-facility status" description="Real-time view of every monitored location" action={<Badge variant="warning">3 sites with alerts</Badge>} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                <tr><th className="px-5 py-3 font-medium">Facility</th><th className="px-5 py-3 font-medium">Country</th><th className="px-5 py-3 font-medium">Cameras</th><th className="px-5 py-3 font-medium">Active alerts</th><th className="px-5 py-3 font-medium">Status</th></tr>
              </thead>
              <tbody>
                {sites.map((s) => (
                  <tr key={s.name} className="border-t border-border hover:bg-accent/30">
                    <td className="px-5 py-3 font-medium">{s.name}</td>
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{s.country}</td>
                    <td className="px-5 py-3 font-mono">{s.cams}</td>
                    <td className="px-5 py-3 font-mono">{s.alerts}</td>
                    <td className="px-5 py-3">
                      {s.status === "ok" && <Badge variant="success">● Operational</Badge>}
                      {s.status === "warn" && <Badge variant="warning">● Attention</Badge>}
                      {s.status === "alert" && <Badge variant="destructive">● Incident</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Monitoring team" description="On-shift operators" />
          <div className="divide-y divide-border">
            {team.map((t) => (
              <div key={t.name} className="flex items-center gap-3 p-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan text-xs font-bold text-primary-foreground">{t.name.split(" ").map(n => n[0]).join("")}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-[11px] text-muted-foreground">{t.role} · {t.shift}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm">{t.calls}</div>
                  <div className="text-[10px] text-muted-foreground">handled</div>
                </div>
                <Badge variant={t.status === "on" ? "success" : "outline"}>{t.status === "on" ? "ON" : "OFF"}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Incident management" description="Active and recent incidents · color-coded by priority" action={<Badge variant="destructive">1 critical</Badge>} />
          <div className="divide-y divide-border">
            {incidents.map((i) => (
              <div key={i.id} className="grid grid-cols-1 gap-2 p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                <div className="font-mono text-xs text-cyan">{i.id}</div>
                <div>
                  <div className="text-sm font-medium">{i.title}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground"><MapPin className="h-3 w-3" />{i.site} · {i.since} ago</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={i.priority === "critical" ? "destructive" : i.priority === "high" ? "warning" : "info"}>{i.priority.toUpperCase()}</Badge>
                  <Badge variant={i.status === "resolved" ? "success" : i.status === "dispatched" ? "info" : "warning"}>{i.status.toUpperCase()}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Recent reports" description="Auto-generated for executives" action={<FileText className="h-4 w-4 text-muted-foreground" />} />
          <div className="space-y-2 p-4">
            {[
              { name: "Weekly Security Brief — Wk 24", date: "Mon 09:00", size: "1.8 MB" },
              { name: "Incident Postmortem — INC-22831", date: "Sun 22:14", size: "642 KB" },
              { name: "Monthly Surveillance Report — May", date: "Jun 01", size: "4.2 MB" },
              { name: "Visitor Activity — Q2 to-date", date: "Yesterday", size: "920 KB" },
            ].map((r) => (
              <div key={r.name} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{r.name}</div>
                  <div className="text-[11px] text-muted-foreground">{r.date} · {r.size}</div>
                </div>
                <button className="rounded border border-primary/40 px-2 py-1 text-[11px] font-semibold text-primary hover:bg-primary/10">Download</button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
