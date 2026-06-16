import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Eye, User, Car, Scan, Brain, Ban, Camera } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/portal/ai-cctv")({
  head: () => ({ meta: [{ title: "AI CCTV — Sentinel" }] }),
  component: AICCTV,
});

const detections = Array.from({ length: 24 }, (_, i) => ({
  h: `${String(i).padStart(2, "0")}h`,
  people: 80 + Math.round(Math.max(0, 200 - Math.abs(i - 12) * 18) + Math.random() * 30),
  vehicles: 30 + Math.round(Math.max(0, 90 - Math.abs(i - 9) * 8) + Math.random() * 18),
  objects: 12 + Math.round(Math.random() * 28),
}));

const aiEvents = [
  { time: "14:33", camera: "CAM-06", type: "Loitering >5min", confidence: 96, severity: "high" },
  { time: "14:31", camera: "CAM-04", type: "Vehicle in restricted zone", confidence: 99, severity: "critical" },
  { time: "14:28", camera: "CAM-08", type: "Face match · J. Almeida", confidence: 98, severity: "info" },
  { time: "14:24", camera: "CAM-12", type: "Unattended object", confidence: 87, severity: "high" },
  { time: "14:19", camera: "CAM-22", type: "Crowd density · 38 ppl", confidence: 94, severity: "medium" },
  { time: "14:11", camera: "CAM-31", type: "License plate · ABC-2241", confidence: 99, severity: "info" },
  { time: "14:02", camera: "CAM-17", type: "Aggressive behavior pattern", confidence: 81, severity: "high" },
  { time: "13:58", camera: "CAM-09", type: "Perimeter crossing", confidence: 92, severity: "critical" },
];

const modules = [
  { icon: <User className="h-5 w-5" />, name: "Human Detection", events: "1,284", accuracy: "98.6%" },
  { icon: <Car className="h-5 w-5" />, name: "Vehicle Detection", events: "612", accuracy: "99.2%" },
  { icon: <Scan className="h-5 w-5" />, name: "Facial Recognition", events: "428", accuracy: "97.4%" },
  { icon: <Eye className="h-5 w-5" />, name: "Object Detection", events: "892", accuracy: "96.1%" },
  { icon: <Brain className="h-5 w-5" />, name: "Behavioral Analysis", events: "146", accuracy: "91.8%" },
  { icon: <Ban className="h-5 w-5" />, name: "Restricted Area Violations", events: "23", accuracy: "99.8%" },
];

function AICCTV() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">AI-Powered Surveillance</Badge>
        <h1 className="mt-3 text-2xl font-bold">AI CCTV Intelligence</h1>
        <p className="mt-1 text-sm text-muted-foreground">Object, human, vehicle, facial and behavioral detections from every camera in your estate.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="AI Cameras Online" value="612 / 618" delta="99.0%" deltaPositive icon={<Camera className="h-5 w-5" />} accent="primary" />
        <KpiCard label="AI Events (24h)" value="3,395" delta="+8% vs avg" icon={<Brain className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="High-priority alerts" value="22" delta="3 unresolved" icon={<Eye className="h-5 w-5" />} accent="warning" />
        <KpiCard label="Avg Model Confidence" value="96.4%" delta="across modules" deltaPositive icon={<Scan className="h-5 w-5" />} accent="success" />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((m) => (
          <Card key={m.name} className="p-5">
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-gradient-to-br from-primary/20 to-cyan/10 text-cyan">{m.icon}</div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="mt-4 text-sm font-semibold">{m.name}</div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-mono text-2xl font-bold">{m.events}</span>
              <span className="text-[11px] text-muted-foreground">events 24h</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Model accuracy</span>
              <span className="font-mono text-cyan">{m.accuracy}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Detections — last 24h" description="People · Vehicles · Objects" action={<Badge variant="info">Live</Badge>} />
          <div className="h-72 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={detections}>
                <defs>
                  <linearGradient id="ap" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.62 0.21 258)" stopOpacity={0.6} /><stop offset="100%" stopColor="oklch(0.62 0.21 258)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="av" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.78 0.13 210)" stopOpacity={0.6} /><stop offset="100%" stopColor="oklch(0.78 0.13 210)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="ao" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.72 0.17 160)" stopOpacity={0.6} /><stop offset="100%" stopColor="oklch(0.72 0.17 160)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.06 265 / 0.4)" />
                <XAxis dataKey="h" stroke="oklch(0.7 0.03 255)" fontSize={11} tickLine={false} axisLine={false} interval={2} />
                <YAxis stroke="oklch(0.7 0.03 255)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.21 0.07 268)", border: "1px solid oklch(0.32 0.06 265)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="people" stroke="oklch(0.62 0.21 258)" fill="url(#ap)" strokeWidth={2} />
                <Area type="monotone" dataKey="vehicles" stroke="oklch(0.78 0.13 210)" fill="url(#av)" strokeWidth={2} />
                <Area type="monotone" dataKey="objects" stroke="oklch(0.72 0.17 160)" fill="url(#ao)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Restricted area watch" description="Behavioral & boundary alerts" />
          <div className="space-y-3 p-5">
            {[
              { area: "Server Room B", violations: 0, status: "ok" },
              { area: "Executive Floor", violations: 1, status: "warn" },
              { area: "Chemical Storage", violations: 0, status: "ok" },
              { area: "Vault Corridor", violations: 0, status: "ok" },
              { area: "Plant Gate 4", violations: 4, status: "alert" },
            ].map((r) => (
              <div key={r.area} className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3">
                <div className="text-sm font-medium">{r.area}</div>
                <Badge variant={r.status === "alert" ? "destructive" : r.status === "warn" ? "warning" : "success"}>{r.violations} violations</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="AI-generated event history" description="Cross-camera detections · last hour" action={<Badge variant="destructive">2 critical</Badge>} />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-secondary/40 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">TIME</th>
                <th className="px-4 py-2 font-medium">CAMERA</th>
                <th className="px-4 py-2 font-medium">DETECTION</th>
                <th className="px-4 py-2 font-medium">CONFIDENCE</th>
                <th className="px-4 py-2 font-medium">SEVERITY</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {aiEvents.map((e, i) => (
                <tr key={i} className="border-t border-border hover:bg-accent/30">
                  <td className="px-4 py-2.5 text-muted-foreground">{e.time}</td>
                  <td className="px-4 py-2.5 text-cyan">{e.camera}</td>
                  <td className="px-4 py-2.5">{e.type}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-20 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan" style={{ width: `${e.confidence}%` }} />
                      </div>
                      <span>{e.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge variant={e.severity === "critical" ? "destructive" : e.severity === "high" ? "warning" : e.severity === "info" ? "info" : "outline"}>{e.severity.toUpperCase()}</Badge>
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
