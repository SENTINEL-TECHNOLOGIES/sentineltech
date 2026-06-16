import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { CreditCard, Download, FileText } from "lucide-react";

export const Route = createFileRoute("/portal/billing")({
  head: () => ({ meta: [{ title: "Billing — Sentinel" }] }),
  component: Billing,
});

const invoices = [
  { id: "INV-2026-006", date: "Jun 01, 2026", amount: "$18,420.00", status: "Paid" },
  { id: "INV-2026-005", date: "May 01, 2026", amount: "$18,420.00", status: "Paid" },
  { id: "INV-2026-004", date: "Apr 01, 2026", amount: "$17,890.00", status: "Paid" },
  { id: "INV-2026-003", date: "Mar 01, 2026", amount: "$17,890.00", status: "Paid" },
];

function Billing() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Billing &amp; Contracts</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Monthly Spend" value="$18,420" icon={<CreditCard className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Annual Contract" value="$221,040" icon={<FileText className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Next Renewal" value="Dec 31, 2026" icon={<FileText className="h-5 w-5" />} accent="success" />
      </div>

      <Card>
        <CardHeader title="Active contract" description="Professional plan — multi-year" action={<Badge variant="success">Active</Badge>} />
        <div className="grid gap-4 p-5 md:grid-cols-3">
          {[
            { l: "Plan", v: "Professional" },
            { l: "Term", v: "Jan 2026 → Dec 2026" },
            { l: "Endpoints", v: "412 / 500" },
            { l: "SOC Coverage", v: "24 / 7" },
            { l: "SLA", v: "30-min incident response" },
            { l: "Account Manager", v: "K. Park" },
          ].map((r) => (
            <div key={r.l} className="rounded-lg border border-border bg-secondary/30 p-4">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{r.l}</div>
              <div className="mt-1 font-medium">{r.v}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Invoices" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
              <tr><th className="px-5 py-3 font-medium">Invoice</th><th className="px-5 py-3 font-medium">Date</th><th className="px-5 py-3 font-medium">Amount</th><th className="px-5 py-3 font-medium">Status</th><th /></tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id} className="border-t border-border hover:bg-accent/30">
                  <td className="px-5 py-3 font-mono text-cyan">{i.id}</td>
                  <td className="px-5 py-3 text-muted-foreground">{i.date}</td>
                  <td className="px-5 py-3 font-mono">{i.amount}</td>
                  <td className="px-5 py-3"><Badge variant="success">{i.status}</Badge></td>
                  <td className="px-5 py-3 text-right"><button className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"><Download className="h-3.5 w-3.5" /> PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
