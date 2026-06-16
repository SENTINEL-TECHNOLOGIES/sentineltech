import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Badge, KpiCard } from "@/components/ui-bits";
import { Briefcase, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/portal/projects")({
  head: () => ({ meta: [{ title: "Projects — Sentinel" }] }),
  component: Projects,
});

const projects = [
  { id: "PRJ-204", name: "SD-WAN rollout — Phase 3", status: "In Progress", progress: 78, deadline: "Jul 18, 2026", eng: "M. Alvarez" },
  { id: "PRJ-198", name: "Zero-Trust IAM migration", status: "In Progress", progress: 42, deadline: "Aug 02, 2026", eng: "L. Tanaka" },
  { id: "PRJ-211", name: "SOC 2 readiness audit", status: "Review", progress: 91, deadline: "Jun 28, 2026", eng: "S. Okafor" },
  { id: "PRJ-188", name: "Cloud workload protection", status: "In Progress", progress: 64, deadline: "Jul 30, 2026", eng: "R. Petrov" },
  { id: "PRJ-225", name: "Branch firewall refresh — APAC", status: "Planning", progress: 12, deadline: "Sep 15, 2026", eng: "K. Park" },
  { id: "PRJ-172", name: "DLP policy rebuild", status: "Done", progress: 100, deadline: "May 30, 2026", eng: "J. Mendes" },
];

function statusBadge(s: string) {
  switch (s) {
    case "Done": return <Badge variant="success">{s}</Badge>;
    case "Review": return <Badge variant="info">{s}</Badge>;
    case "Planning": return <Badge variant="outline">{s}</Badge>;
    default: return <Badge variant="warning">{s}</Badge>;
  }
}

function Projects() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-sm text-muted-foreground">Active engagements with your Sentinel delivery team.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Active Projects" value="6" icon={<Briefcase className="h-5 w-5" />} accent="primary" />
        <KpiCard label="On Track" value="4" icon={<CheckCircle2 className="h-5 w-5" />} accent="success" />
        <KpiCard label="At Risk" value="1" icon={<AlertCircle className="h-5 w-5" />} accent="warning" />
        <KpiCard label="Avg Delivery" value="92%" delta="On-time" deltaPositive icon={<Clock className="h-5 w-5" />} accent="cyan" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-mono text-[11px] text-cyan">{p.id}</div>
                <div className="mt-1 truncate text-base font-semibold">{p.name}</div>
              </div>
              {statusBadge(p.status)}
            </div>
            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Progress</span><span className="font-mono">{p.progress}%</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan" style={{ width: `${p.progress}%` }} /></div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div><div className="text-muted-foreground">Deadline</div><div className="mt-0.5 font-medium">{p.deadline}</div></div>
              <div><div className="text-muted-foreground">Lead Engineer</div><div className="mt-0.5 font-medium">{p.eng}</div></div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="All projects" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
              <tr><th className="px-5 py-3 font-medium">Project</th><th className="px-5 py-3 font-medium">Status</th><th className="px-5 py-3 font-medium">Progress</th><th className="px-5 py-3 font-medium">Deadline</th><th className="px-5 py-3 font-medium">Engineer</th></tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-border hover:bg-accent/30">
                  <td className="px-5 py-3"><div className="font-mono text-[11px] text-cyan">{p.id}</div><div className="font-medium">{p.name}</div></td>
                  <td className="px-5 py-3">{statusBadge(p.status)}</td>
                  <td className="px-5 py-3"><div className="flex items-center gap-2"><div className="h-1.5 w-28 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan" style={{ width: `${p.progress}%` }} /></div><span className="font-mono text-xs">{p.progress}%</span></div></td>
                  <td className="px-5 py-3 text-muted-foreground">{p.deadline}</td>
                  <td className="px-5 py-3">{p.eng}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
