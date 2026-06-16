import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Server, Cloud, Cpu, HardDrive, Wifi } from "lucide-react";

export const Route = createFileRoute("/portal/infrastructure")({
  head: () => ({ meta: [{ title: "Infrastructure — Sentinel" }] }),
  component: Infra,
});

const sites = [
  { name: "DC-1 São Paulo", region: "BR-SP", devices: 184, status: "healthy", load: 62 },
  { name: "DC-2 Frankfurt", region: "EU-DE", devices: 142, status: "healthy", load: 48 },
  { name: "Edge — Singapore", region: "AP-SG", devices: 56, status: "degraded", load: 81 },
  { name: "AWS us-east-1", region: "Cloud", devices: 92, status: "healthy", load: 55 },
  { name: "Azure West Europe", region: "Cloud", devices: 64, status: "healthy", load: 39 },
];

function Infra() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Infrastructure</h1>
        <p className="text-sm text-muted-foreground">Sites, cloud regions and managed assets across your estate.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total Assets" value="1,290" icon={<Server className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Cloud Workloads" value="412" icon={<Cloud className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Avg CPU Load" value="57%" icon={<Cpu className="h-5 w-5" />} accent="success" />
        <KpiCard label="Storage In Use" value="184 TB" icon={<HardDrive className="h-5 w-5" />} accent="warning" />
      </div>

      <Card>
        <CardHeader title="Sites & regions" description="Health and capacity across managed locations" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
              <tr><th className="px-5 py-3 font-medium">Location</th><th className="px-5 py-3 font-medium">Region</th><th className="px-5 py-3 font-medium">Devices</th><th className="px-5 py-3 font-medium">Load</th><th className="px-5 py-3 font-medium">Status</th></tr>
            </thead>
            <tbody>
              {sites.map((s) => (
                <tr key={s.name} className="border-t border-border hover:bg-accent/30">
                  <td className="px-5 py-3 font-medium">{s.name}</td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{s.region}</td>
                  <td className="px-5 py-3 font-mono">{s.devices}</td>
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
          <CardHeader title="Top devices by load" />
          <div className="space-y-3 p-5">
            {[
              { id: "edge-sg-01", t: "SD-WAN Edge", v: 92 },
              { id: "fw-sp-prd-02", t: "NGFW Cluster", v: 78 },
              { id: "k8s-aws-04", t: "Worker Node", v: 71 },
              { id: "siem-eu-01", t: "SIEM Collector", v: 64 },
            ].map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                <Wifi className="h-4 w-4 text-cyan" />
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
              { label: "Compute", val: 68, max: 100, hint: "vCPU pool" },
              { label: "Memory", val: 74, max: 100, hint: "Pooled RAM" },
              { label: "Storage", val: 42, max: 100, hint: "Tiered SAN" },
              { label: "Bandwidth", val: 55, max: 100, hint: "Egress / month" },
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
