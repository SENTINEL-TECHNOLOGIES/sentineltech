import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { CreditCard, Download, FileText } from "lucide-react";

export const Route = createFileRoute("/portal/billing")({
  head: () => ({ meta: [{ title: "Financeiro — Sentinel" }] }),
  component: Billing,
});

const invoices = [
  { id: "NF-2026-006", date: "01 Jun 2026", amount: "R$ 92.420,00", status: "Pago" },
  { id: "NF-2026-005", date: "01 Mai 2026", amount: "R$ 92.420,00", status: "Pago" },
  { id: "NF-2026-004", date: "01 Abr 2026", amount: "R$ 89.450,00", status: "Pago" },
  { id: "NF-2026-003", date: "01 Mar 2026", amount: "R$ 89.450,00", status: "Pago" },
];

function Billing() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Financeiro &amp; Contratos</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Gasto Mensal" value="R$ 92.420" icon={<CreditCard className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Contrato Anual" value="R$ 1.109.040" icon={<FileText className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Próxima Renovação" value="31 Dez 2026" icon={<FileText className="h-5 w-5" />} accent="success" />
      </div>

      <Card>
        <CardHeader title="Contrato ativo" description="Plano Professional — multi-ano" action={<Badge variant="success">Ativo</Badge>} />
        <div className="grid gap-4 p-5 md:grid-cols-3">
          {[
            { l: "Plano", v: "Professional" },
            { l: "Vigência", v: "Jan 2026 → Dez 2026" },
            { l: "Endpoints", v: "412 / 500" },
            { l: "Cobertura da Central", v: "24 / 7" },
            { l: "SLA", v: "Resposta em 30 min" },
            { l: "Gerente de Conta", v: "K. Park" },
          ].map((r) => (
            <div key={r.l} className="rounded-lg border border-border bg-secondary/30 p-4">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{r.l}</div>
              <div className="mt-1 font-medium">{r.v}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Notas fiscais" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
              <tr><th className="px-5 py-3 font-medium">Nota</th><th className="px-5 py-3 font-medium">Data</th><th className="px-5 py-3 font-medium">Valor</th><th className="px-5 py-3 font-medium">Status</th><th /></tr>
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
