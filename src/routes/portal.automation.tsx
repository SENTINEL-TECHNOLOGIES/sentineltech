import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Lightbulb, DoorOpen, Bell, Zap, Thermometer, Droplets, Wind } from "lucide-react";

export const Route = createFileRoute("/portal/automation")({
  head: () => ({ meta: [{ title: "Smart Automation — Sentinel" }] }),
  component: Automation,
});

const sensors = [
  { icon: <Thermometer className="h-4 w-4" />, name: "Temperature · DC-1 Cold Aisle", value: "18.4 °C", state: "ok" },
  { icon: <Droplets className="h-4 w-4" />, name: "Humidity · Server Room B", value: "42 %", state: "ok" },
  { icon: <Wind className="h-4 w-4" />, name: "Air Quality · HQ Floor 7", value: "94 AQI", state: "warn" },
  { icon: <Thermometer className="h-4 w-4" />, name: "Temperature · Plant Line 2", value: "27.1 °C", state: "ok" },
  { icon: <Droplets className="h-4 w-4" />, name: "Water Leak · Basement", value: "Dry", state: "ok" },
  { icon: <Wind className="h-4 w-4" />, name: "Smoke · Warehouse Dock", value: "Clear", state: "ok" },
];

const groups = [
  { icon: <Lightbulb className="h-5 w-5" />, name: "Lighting Automation", devices: 1242, on: 318, schedules: 14, energy: "62 kWh" },
  { icon: <DoorOpen className="h-5 w-5" />, name: "Gate & Door Control", devices: 184, on: 22, schedules: 9, energy: "—" },
  { icon: <Bell className="h-5 w-5" />, name: "Alarm Systems", devices: 96, on: 96, schedules: 4, energy: "—" },
  { icon: <Zap className="h-5 w-5" />, name: "Energy Monitoring", devices: 48, on: 48, schedules: 6, energy: "1.2 MWh / day" },
];

const automations = [
  { name: "Sunset · Auto-light perimeter cameras", trigger: "Astronomical (sunset)", action: "Turn on perimeter floodlights", state: "armed" },
  { name: "After-hours · Lock all internal doors", trigger: "20:00 weekdays", action: "Lock 84 internal doors + arm zones", state: "armed" },
  { name: "Visitor arrival · Concierge alert", trigger: "Lobby gate scan", action: "Notify reception + open turnstile", state: "armed" },
  { name: "Fire alarm · Unlock egress", trigger: "Smoke or pull station", action: "Release all egress + open gates", state: "armed" },
  { name: "Cold-aisle thermal · HVAC boost", trigger: "Temp > 22°C", action: "Increase CRAC airflow + alert ops", state: "armed" },
];

function Automation() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">Smart Building Automation</Badge>
        <h1 className="mt-3 text-2xl font-bold">Smart Automation</h1>
        <p className="mt-1 text-sm text-muted-foreground">Lighting, doors, gates, alarms, energy and environmental controls across every facility.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Connected Devices" value="1,570" delta="all subsystems" deltaPositive icon={<Zap className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Active Automations" value="48" delta="14 schedules" icon={<Bell className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Energy Today" value="1.24 MWh" delta="-8% vs target" deltaPositive icon={<Zap className="h-5 w-5" />} accent="success" />
        <KpiCard label="Environmental Alerts" value="1" delta="HQ air quality" icon={<Wind className="h-5 w-5" />} accent="warning" />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {groups.map((g) => (
          <Card key={g.name} className="p-5">
            <div className="flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-gradient-to-br from-primary/20 to-cyan/10 text-cyan">{g.icon}</div>
              <Badge variant="success">Online</Badge>
            </div>
            <div className="mt-4 text-sm font-semibold">{g.name}</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div><div className="text-muted-foreground">Devices</div><div className="font-mono text-base font-bold">{g.devices}</div></div>
              <div><div className="text-muted-foreground">Active</div><div className="font-mono text-base font-bold text-cyan">{g.on}</div></div>
              <div><div className="text-muted-foreground">Schedules</div><div className="font-mono text-base font-bold">{g.schedules}</div></div>
              <div><div className="text-muted-foreground">Energy</div><div className="font-mono text-base font-bold">{g.energy}</div></div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Automation rules" description="Triggers and orchestrated actions" action={<Badge variant="success">All armed</Badge>} />
          <div className="divide-y divide-border">
            {automations.map((a) => (
              <div key={a.name} className="grid grid-cols-1 gap-3 p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="text-sm font-medium">{a.name}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-cyan">WHEN</span>{a.trigger}
                    <span className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-cyan">DO</span>{a.action}
                  </div>
                </div>
                <Badge variant="success">{a.state.toUpperCase()}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Environmental sensors" description="Real-time facility telemetry" />
          <div className="divide-y divide-border">
            {sensors.map((s) => (
              <div key={s.name} className="flex items-center gap-3 p-4">
                <div className={`grid h-8 w-8 place-items-center rounded-lg border border-border ${s.state === "warn" ? "text-warning" : "text-cyan"}`}>{s.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{s.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">{s.value}</div>
                </div>
                {s.state === "warn" ? <Badge variant="warning">Warning</Badge> : <Badge variant="success">OK</Badge>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
