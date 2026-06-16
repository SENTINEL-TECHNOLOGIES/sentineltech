import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Camera, AlertTriangle, Activity, Eye, MapPin, Radio, Maximize2, Volume2 } from "lucide-react";

export const Route = createFileRoute("/portal/monitoring")({
  head: () => ({ meta: [{ title: "Command Center — Sentinel" }] }),
  component: Monitoring,
});

const cams = [
  { id: "CAM-01", name: "HQ · Main Lobby", zone: "Reception", status: "live", motion: true },
  { id: "CAM-02", name: "HQ · Garage Entry", zone: "Perimeter", status: "live", motion: false },
  { id: "CAM-03", name: "DC-2 · Cold Aisle A", zone: "Server Floor", status: "live", motion: false },
  { id: "CAM-04", name: "Warehouse · Dock 5", zone: "Logistics", status: "live", motion: true },
  { id: "CAM-05", name: "Plant · Production L2", zone: "Industrial", status: "live", motion: false },
  { id: "CAM-06", name: "Retail SP-12 · Floor", zone: "Retail", status: "alert", motion: true },
  { id: "CAM-07", name: "HQ · Rooftop North", zone: "Perimeter", status: "live", motion: false },
  { id: "CAM-08", name: "HQ · Server Room B", zone: "Restricted", status: "live", motion: false },
  { id: "CAM-09", name: "Plant · Gate 4", zone: "Perimeter", status: "offline", motion: false },
];

const zones = [
  { name: "Perimeter — North Fence", cams: 18, status: "armed", events: 4 },
  { name: "Perimeter — South Fence", cams: 14, status: "armed", events: 1 },
  { name: "Restricted — Data Center", cams: 22, status: "armed", events: 0 },
  { name: "Public — Lobby & Reception", cams: 12, status: "monitored", events: 12 },
  { name: "Industrial — Production Lines", cams: 36, status: "monitored", events: 7 },
  { name: "Logistics — Loading Docks", cams: 24, status: "monitored", events: 5 },
];

const events = [
  { time: "14:32:08", camera: "CAM-06", zone: "Retail SP-12", event: "Loitering detected", severity: "high", action: "ALERT SENT" },
  { time: "14:31:55", camera: "CAM-22", zone: "Perimeter North", event: "Motion at fence line", severity: "medium", action: "VERIFIED" },
  { time: "14:31:41", camera: "CAM-04", zone: "Dock 5", event: "Unauthorized vehicle", severity: "critical", action: "DISPATCH" },
  { time: "14:31:22", camera: "CAM-14", zone: "Server Room B", event: "Door held open >30s", severity: "high", action: "ESCALATED" },
  { time: "14:30:58", camera: "CAM-08", zone: "Restricted", event: "Facial match · J. Almeida", severity: "info", action: "ALLOWED" },
  { time: "14:30:31", camera: "CAM-31", zone: "Parking Lot", event: "License plate scan · ABC-2241", severity: "info", action: "REGISTERED" },
];

const facilityActivity = [
  { time: "14:32", text: "Patrol team P-02 checked in at Sector 4", facility: "DC-2" },
  { time: "14:30", text: "Visitor M. Silva escorted to Conference Room 3", facility: "HQ" },
  { time: "14:28", text: "Delivery truck verified at Dock 5 — Carrier #88412", facility: "Warehouse" },
  { time: "14:25", text: "Night shift handover completed", facility: "Plant" },
  { time: "14:21", text: "Camera CAM-09 went offline — ticket auto-created", facility: "Plant" },
];

function Monitoring() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Command Center</h1>
          <p className="text-sm text-muted-foreground">Live surveillance, monitored zones and AI detections across every facility.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-mono text-primary">
          <span className="h-2 w-2 animate-pulse-glow rounded-full bg-primary" /> SOC · Operator on duty: K. Park · Shift 14:00–22:00
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Cameras Online" value="848 / 856" delta="99.1%" deltaPositive icon={<Camera className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Active Zones" value="46" delta="6 armed perimeters" icon={<MapPin className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="AI Events (24h)" value="1,284" delta="22 high priority" icon={<Eye className="h-5 w-5" />} accent="success" />
        <KpiCard label="Open Incidents" value="7" delta="2 dispatched" icon={<AlertTriangle className="h-5 w-5" />} accent="warning" />
      </div>

      {/* Live camera grid */}
      <Card>
        <CardHeader title="Live camera grid" description="Multi-view surveillance · click a tile to fullscreen" action={<Badge variant="info">9 of 856 streams</Badge>} />
        <div className="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-3">
          {cams.map((c) => (
            <div key={c.id} className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-black">
              {/* Simulated camera scanlines */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-cyan/10" />
              <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "repeating-linear-gradient(0deg, oklch(0.85 0.02 255), oklch(0.85 0.02 255) 1px, transparent 1px, transparent 3px)" }} />
              <div className="absolute inset-0 bg-grid-sm opacity-20" />
              {c.motion && <div className="absolute left-1/3 top-1/3 h-12 w-16 animate-pulse rounded border-2 border-warning bg-warning/10" />}

              {/* HUD overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-2.5 text-[10px] font-mono">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5">
                    {c.status === "live" && <span className="flex items-center gap-1 rounded bg-destructive/80 px-1.5 py-0.5 text-destructive-foreground"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />REC</span>}
                    {c.status === "alert" && <span className="rounded bg-warning px-1.5 py-0.5 text-warning-foreground">ALERT</span>}
                    {c.status === "offline" && <span className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground">OFFLINE</span>}
                    <span className="text-cyan">{c.id}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="grid h-5 w-5 place-items-center rounded bg-black/60 text-foreground"><Volume2 className="h-3 w-3" /></button>
                    <button className="grid h-5 w-5 place-items-center rounded bg-black/60 text-foreground"><Maximize2 className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-foreground/90">{c.name}</div>
                    <div className="text-muted-foreground">{c.zone}</div>
                  </div>
                  <div className="text-muted-foreground">1920×1080 · 30fps</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Zones map */}
        <Card className="lg:col-span-2">
          <CardHeader title="Camera status map" description="Active monitoring zones · armed perimeters" action={<Badge variant="success">All armed</Badge>} />
          <div className="relative h-80 overflow-hidden p-4">
            <svg viewBox="0 0 600 280" className="h-full w-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.32 0.06 265 / 0.4)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="600" height="280" fill="url(#grid)" />
              {/* Buildings */}
              <rect x="60" y="60" width="140" height="100" rx="6" fill="oklch(0.27 0.06 265 / 0.6)" stroke="oklch(0.62 0.21 258)" strokeWidth="1.5" />
              <text x="130" y="115" textAnchor="middle" fontSize="11" fill="oklch(0.85 0.02 255)" fontFamily="JetBrains Mono">HQ TOWER</text>
              <rect x="240" y="40" width="120" height="80" rx="6" fill="oklch(0.27 0.06 265 / 0.6)" stroke="oklch(0.78 0.13 210)" strokeWidth="1.5" />
              <text x="300" y="85" textAnchor="middle" fontSize="11" fill="oklch(0.85 0.02 255)" fontFamily="JetBrains Mono">DC-2</text>
              <rect x="240" y="160" width="180" height="80" rx="6" fill="oklch(0.27 0.06 265 / 0.6)" stroke="oklch(0.78 0.13 210)" strokeWidth="1.5" />
              <text x="330" y="205" textAnchor="middle" fontSize="11" fill="oklch(0.85 0.02 255)" fontFamily="JetBrains Mono">WAREHOUSE</text>
              <rect x="460" y="80" width="100" height="120" rx="6" fill="oklch(0.27 0.06 265 / 0.6)" stroke="oklch(0.62 0.22 25 / 0.7)" strokeWidth="1.5" />
              <text x="510" y="145" textAnchor="middle" fontSize="11" fill="oklch(0.85 0.02 255)" fontFamily="JetBrains Mono">PLANT</text>

              {/* Camera dots */}
              {[[80, 80], [180, 80], [80, 145], [180, 145], [260, 60], [340, 60], [260, 105], [340, 105], [260, 180], [400, 180], [260, 225], [400, 225], [475, 95], [545, 95], [475, 185], [545, 185]].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="3" fill="oklch(0.72 0.17 160)" />
                  <circle cx={x} cy={y} r="6" fill="none" stroke="oklch(0.72 0.17 160 / 0.4)">
                    <animate attributeName="r" from="3" to="12" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
              {/* Alert camera */}
              <g>
                <circle cx="510" cy="220" r="4" fill="oklch(0.62 0.22 25)" />
                <circle cx="510" cy="220" r="10" fill="none" stroke="oklch(0.62 0.22 25)">
                  <animate attributeName="r" from="4" to="20" dur="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="indefinite" />
                </circle>
              </g>
              <text x="540" y="224" fontSize="9" fill="oklch(0.62 0.22 25)" fontFamily="JetBrains Mono">ALERT · Gate 4</text>
            </svg>
          </div>
        </Card>

        <Card>
          <CardHeader title="Monitoring zones" description="Armed & monitored areas" />
          <div className="divide-y divide-border">
            {zones.map((z) => (
              <div key={z.name} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{z.name}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <Radio className="h-3 w-3" /> {z.cams} cams · {z.events} events 24h
                  </div>
                </div>
                <Badge variant={z.status === "armed" ? "destructive" : "info"}>{z.status.toUpperCase()}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="AI detection & intrusion events" description="Live stream from object/behavior models" action={<Badge variant="destructive">2 critical</Badge>} />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-secondary/40 text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">TIME</th>
                  <th className="px-4 py-2 font-medium">CAMERA</th>
                  <th className="px-4 py-2 font-medium">ZONE</th>
                  <th className="px-4 py-2 font-medium">EVENT</th>
                  <th className="px-4 py-2 font-medium">SEVERITY</th>
                  <th className="px-4 py-2 font-medium">ACTION</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {events.map((e, i) => (
                  <tr key={i} className="border-t border-border hover:bg-accent/30">
                    <td className="px-4 py-2.5 text-muted-foreground">{e.time}</td>
                    <td className="px-4 py-2.5 text-cyan">{e.camera}</td>
                    <td className="px-4 py-2.5">{e.zone}</td>
                    <td className="px-4 py-2.5">{e.event}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={e.severity === "critical" ? "destructive" : e.severity === "high" ? "warning" : e.severity === "info" ? "info" : "outline"}>{e.severity.toUpperCase()}</Badge>
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge variant={e.action === "DISPATCH" || e.action === "ESCALATED" || e.action === "ALERT SENT" ? "destructive" : "success"}>{e.action}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Facility activity feed" description="Operations across sites" />
          <div className="divide-y divide-border">
            {facilityActivity.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <Activity className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm">{f.text}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="font-mono">{f.time}</span> · {f.facility}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
