import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Fingerprint, DoorOpen, DoorClosed, Users, ShieldAlert, Calendar, ScanFace } from "lucide-react";

export const Route = createFileRoute("/portal/biometric")({
  head: () => ({ meta: [{ title: "Access Control — Sentinel" }] }),
  component: Biometric,
});

const logs = [
  { time: "14:34:11", user: "J. Almeida", method: "Fingerprint", door: "Server Room B", result: "granted" },
  { time: "14:33:42", user: "M. Silva (Visitor)", method: "QR Pass", door: "Lobby Gate", result: "granted" },
  { time: "14:32:18", user: "Unknown", method: "Face scan", door: "Plant Gate 4", result: "denied" },
  { time: "14:31:55", user: "K. Park", method: "Card + PIN", door: "SOC Floor", result: "granted" },
  { time: "14:31:02", user: "Unknown", method: "Fingerprint", door: "Vault Corridor", result: "denied" },
  { time: "14:30:21", user: "A. Costa", method: "Face scan", door: "Executive Floor", result: "granted" },
  { time: "14:29:48", user: "L. Tanaka", method: "Fingerprint", door: "Server Room A", result: "granted" },
  { time: "14:28:55", user: "Contractor #88412", method: "Temp Card", door: "Loading Dock 5", result: "granted" },
];

const doors = [
  { door: "Lobby Gate · HQ", status: "closed", mode: "Auto" },
  { door: "Server Room B · DC-1", status: "closed", mode: "Locked" },
  { door: "Vault Corridor · HQ", status: "closed", mode: "Locked" },
  { door: "Loading Dock 5 · Warehouse", status: "open", mode: "Scheduled" },
  { door: "Plant Gate 4 · Monterrey", status: "alert", mode: "Forced" },
  { door: "Executive Floor · HQ", status: "closed", mode: "Auto" },
];

const users = [
  { name: "J. Almeida", role: "Infrastructure Lead", access: 14, last: "5m ago" },
  { name: "K. Park", role: "SOC Operator", access: 8, last: "12m ago" },
  { name: "A. Costa", role: "Executive", access: 22, last: "32m ago" },
  { name: "L. Tanaka", role: "Datacenter Engineer", access: 11, last: "1h ago" },
  { name: "R. Mendes", role: "Security Officer", access: 18, last: "2h ago" },
];

function Biometric() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">Biometric Access Control</Badge>
        <h1 className="mt-3 text-2xl font-bold">Access Control</h1>
        <p className="mt-1 text-sm text-muted-foreground">Entries, exits, biometric validation and door state across every facility.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Entries Today" value="1,842" delta="+6% vs yesterday" deltaPositive icon={<DoorOpen className="h-5 w-5" />} accent="success" />
        <KpiCard label="Exits Today" value="1,770" delta="balanced flow" icon={<DoorClosed className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Unauthorized Attempts" value="14" delta="3 high risk" icon={<ShieldAlert className="h-5 w-5" />} accent="destructive" />
        <KpiCard label="Registered Users" value="2,418" delta="+12 this week" deltaPositive icon={<Users className="h-5 w-5" />} accent="primary" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Visitor Access Requests" value="46" delta="today" icon={<ScanFace className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Biometric Validations" value="1,284" delta="fingerprint + face" deltaPositive icon={<Fingerprint className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Active Schedules" value="38" delta="across 12 sites" icon={<Calendar className="h-5 w-5" />} accent="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Access logs" description="Real-time entries and validations" action={<Badge variant="destructive">2 denied</Badge>} />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-secondary/40 text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">TIME</th>
                  <th className="px-4 py-2 font-medium">USER</th>
                  <th className="px-4 py-2 font-medium">METHOD</th>
                  <th className="px-4 py-2 font-medium">DOOR</th>
                  <th className="px-4 py-2 font-medium">RESULT</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {logs.map((l, i) => (
                  <tr key={i} className="border-t border-border hover:bg-accent/30">
                    <td className="px-4 py-2.5 text-muted-foreground">{l.time}</td>
                    <td className="px-4 py-2.5">{l.user}</td>
                    <td className="px-4 py-2.5 text-cyan">{l.method}</td>
                    <td className="px-4 py-2.5">{l.door}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={l.result === "granted" ? "success" : "destructive"}>{l.result.toUpperCase()}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Door status" description="Live state · controlled doors" />
          <div className="divide-y divide-border">
            {doors.map((d) => (
              <div key={d.door} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{d.door}</div>
                  <div className="text-[11px] text-muted-foreground">Mode · {d.mode}</div>
                </div>
                {d.status === "closed" && <Badge variant="success">● Secured</Badge>}
                {d.status === "open" && <Badge variant="info">● Open</Badge>}
                {d.status === "alert" && <Badge variant="destructive">● Forced</Badge>}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="User management" description="Recent active users · access rights summary" action={<Badge variant="info">2,418 total</Badge>} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                <tr><th className="px-5 py-3 font-medium">User</th><th className="px-5 py-3 font-medium">Role</th><th className="px-5 py-3 font-medium">Access points</th><th className="px-5 py-3 font-medium">Last seen</th></tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.name} className="border-t border-border hover:bg-accent/30">
                    <td className="px-5 py-3 font-medium">{u.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{u.role}</td>
                    <td className="px-5 py-3 font-mono">{u.access}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{u.last}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Access schedules" description="Time-based authorization rules" />
          <div className="space-y-3 p-5">
            {[
              { name: "Business Hours · HQ Floors 1–6", window: "Mon–Fri 07:00–20:00", users: "1,840" },
              { name: "Maintenance Window · DC-1", window: "Sun 02:00–06:00", users: "12" },
              { name: "Executive Access · Floor 18", window: "24/7", users: "28" },
              { name: "Contractor Pass · Plant", window: "Mon–Sat 06:00–22:00", users: "146" },
              { name: "Night Shift · Warehouse", window: "Daily 22:00–06:00", users: "62" },
            ].map((s) => (
              <div key={s.name} className="rounded-lg border border-border bg-secondary/30 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium">{s.name}</div>
                  <Badge variant="info">{s.users} users</Badge>
                </div>
                <div className="mt-1 font-mono text-[11px] text-cyan">{s.window}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
