import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Building, Camera, MapPin, Activity, Fingerprint } from "lucide-react";

export const Route = createFileRoute("/portal/infrastructure")({
  head: () => ({ meta: [{ title: "Facilities — Sentinel" }] }),
  component: Infra,
});

const sites = [
  { name: "HQ Tower · São Paulo", region: "BR-SP", cameras: 128, doors: 84, status: "healthy", load: 62 },
  { name: "DC-2 · Frankfurt", region: "EU-DE", cameras: 92, doors: 46, status: "healthy", load: 48 },
  { name: "Logistics Hub · Singapore", region: "AP-SG", cameras: 54, doors: 28, status: "degraded", load: 81 },
  { name: "Manufacturing Plant · Monterrey", region: "MX-NL", cameras: 76, doors: 32, status: "healthy", load: 55 },
  { name: "Retail Network · Brazil-South", region: "BR-RS", cameras: 124, doors: 62, status: "healthy", load: 39 },
];

function Infra() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Facilities</h1>
        <p className="text-sm text-muted-foreground">Sites, monitored locations and managed security assets across the estate.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Monitored Facilities" value="46" icon={<Building className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Total Cameras" value="856" icon={<Camera className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Access Points" value="384" icon={<Fingerprint className="h-5 w-5" />} accent="success" />
        <KpiCard label="Avg System Load" value="57%" icon={<Activity className="h-5 w-5" />} accent="warning" />
      </div>

      <Card>
        <CardHeader title="Sites & regions" description="Health and capacity across managed locations" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
              <tr><th className="px-5 py-3 font-medium">Location</th><th className="px-5 py-3 font-medium">Region</th><th className="px-5 py-3 font-medium">Cameras</th><th className="px-5 py-3 font-medium">Doors</th><th className="px-5 py-3 font-medium">Load</th><th className="px-5 py-3 font-medium">Status</th></tr>
            </thead>
            <tbody>
              {sites.map((s) => (
                <tr key={s.name} className="border-t border-border hover:bg-accent/30">
                  <td className="px-5 py-3 font-medium">{s.name}</td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{s.region}</td>
                  <td className="px-5 py-3 font-mono">{s.cameras}</td>
                  <td className="px-5 py-3 font-mono">{s.doors}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-secondary">
                        <div className={`h-full rounded-full ${s.load > 75 ? "bg-warning" : "bg-gradient-to-r from-primary to-cyan"}`} style={{ width: `${s.load}%` }} />
                      </div>
                      <span className="font-mono text-xs">{s.load}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">{s.status === "healthy" ? <Badge variant="success">● Healthy</Badge> : <Badge variant="warning">● Degraded</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader title="Top facilities by activity" />
          <div className="space-y-3 p-5">
            {[
              { id: "HQ-SP", t: "HQ Tower São Paulo", v: 92 },
              { id: "PLT-MTY", t: "Plant Monterrey", v: 78 },
              { id: "DC2-FRA", t: "Datacenter Frankfurt", v: 71 },
              { id: "WHS-SG", t: "Warehouse Singapore", v: 64 },
            ].map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                <MapPin className="h-4 w-4 text-cyan" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-mono text-sm">{d.id}</div>
                  <div className="text-[11px] text-muted-foreground">{d.t}</div>
                </div>
                <span className="font-mono text-sm">{d.v}%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Capacity forecast" description="30-day projection" />
          <div className="space-y-4 p-5">
            {[
              { label: "Camera storage", val: 68, hint: "NVR pool" },
              { label: "Access controllers", val: 74, hint: "Door count" },
              { label: "Network bandwidth", val: 42, hint: "Site uplinks" },
              { label: "Operator queue", val: 55, hint: "SOC capacity" },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-xs"><span className="font-medium">{r.label}</span><span className="text-muted-foreground">{r.hint} · <span className="font-mono text-foreground">{r.val}%</span></span></div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan" style={{ width: `${r.val}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
