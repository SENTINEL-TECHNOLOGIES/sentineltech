import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Badge, KpiCard } from "@/components/ui-bits";
import { Ticket } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/portal/tickets")({
  head: () => ({ meta: [{ title: "Support Tickets — Sentinel" }] }),
  component: Tickets,
});

const tickets = [
  { id: "#1842", title: "Firewall rule blocking VPN traffic", priority: "Critical", status: "Open", date: "Jun 15" },
  { id: "#1841", title: "CAM-03 offline — server room floor 3", priority: "High", status: "In Progress", date: "Jun 15" },
  { id: "#1839", title: "Access badge not responding — Gate B", priority: "Medium", status: "In Progress", date: "Jun 14" },
  { id: "#1837", title: "Monthly report export failing (May 2026)", priority: "Low", status: "Open", date: "Jun 13" },
  { id: "#1835", title: "SSL certificate renewal reminder", priority: "Low", status: "Open", date: "Jun 12" },
  { id: "#1832", title: "MFA enrollment pending for 4 users", priority: "Medium", status: "Resolved", date: "Jun 11" },
];

function priorityClass(p: string) {
  if (p === "Critical") return "text-destructive";
  if (p === "High") return "text-warning";
  if (p === "Medium") return "text-cyan";
  return "text-muted-foreground";
}
function statusBadge(s: string) {
  if (s === "Resolved") return <Badge variant="success">{s}</Badge>;
  if (s === "In Progress") return <Badge variant="info">{s}</Badge>;
  return <Badge variant="warning">{s}</Badge>;
}

function Tickets() {
  const [filter, setFilter] = useState("All");
  const filtered = tickets.filter((t) => filter === "All" || t.status === filter);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Support Center</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Open Tickets" value="7" icon={<Ticket className="h-5 w-5" />} accent="warning" />
        <KpiCard label="Avg. Response Time" value="42 min" icon={<Ticket className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="CSAT Score" value="4.8/5" icon={<Ticket className="h-5 w-5" />} accent="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <div className="flex items-center gap-2 border-b border-border p-3">
            {["All", "Open", "In Progress", "Resolved"].map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`rounded-md px-3 py-1.5 text-xs font-semibold ${filter === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}>{s}</button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                <tr><th className="px-4 py-3 font-medium">ID</th><th className="px-4 py-3 font-medium">Title</th><th className="px-4 py-3 font-medium">Priority</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Date</th></tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-t border-border hover:bg-accent/30">
                    <td className="px-4 py-3 font-mono text-cyan">{t.id}</td>
                    <td className="px-4 py-3 font-medium">{t.title}</td>
                    <td className={`px-4 py-3 font-semibold ${priorityClass(t.priority)}`}>{t.priority}</td>
                    <td className="px-4 py-3">{statusBadge(t.status)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Open new ticket" />
          <form className="space-y-3 p-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Subject</label>
              <input className="mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary" placeholder="Brief description of the issue" />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Category</label>
              <select className="mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary">
                <option>Security Incident</option><option>Infrastructure</option><option>Access</option><option>Billing</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Priority</label>
              <select className="mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary">
                <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Description</label>
              <textarea rows={4} className="mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary" placeholder="Tell us what happened..." />
            </div>
            <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">Submit ticket</button>
          </form>
        </Card>
      </div>
    </div>
  );
}
