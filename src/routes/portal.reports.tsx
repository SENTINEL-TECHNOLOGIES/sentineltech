import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Badge } from "@/components/ui-bits";
import { Download, FileBarChart } from "lucide-react";

export const Route = createFileRoute("/portal/reports")({
  head: () => ({ meta: [{ title: "Relatórios — Sentinel" }] }),
  component: Reports,
});

const reports = [
  { id: "RPT-2026-06", title: "Postura de Segurança — Junho 2026", type: "Segurança", date: "01 Jun 2026", size: "4,2 MB" },
  { id: "RPT-2026-05", title: "Postura de Segurança — Maio 2026", type: "Segurança", date: "01 Mai 2026", size: "3,9 MB" },
  { id: "RPT-Q2-26", title: "Revisão de SLA — 2º Trimestre", type: "SLA", date: "03 Abr 2026", size: "1,8 MB" },
  { id: "RPT-PEN-12", title: "Achados de Pentest Externo v12", type: "Auditoria", date: "22 Mar 2026", size: "6,1 MB" },
  { id: "RPT-SOC-04", title: "Resumo da Central — 1º Trimestre", type: "Operações", date: "10 Abr 2026", size: "2,3 MB" },
];

function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <p className="text-sm text-muted-foreground">Compliance, SLA, postura de segurança e relatórios operacionais.</p>
      </div>
      <Card>
        <CardHeader title="Relatórios disponíveis" action={<Badge variant="info">PDF / CSV</Badge>} />
        <div className="divide-y divide-border">
          {reports.map((r) => (
            <div key={r.id} className="flex items-center gap-4 p-4 hover:bg-accent/30">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary"><FileBarChart className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{r.title}</div>
                <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono">{r.id}</span> · <span>{r.type}</span> · <span>{r.date}</span> · <span>{r.size}</span>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-xs font-semibold hover:bg-accent">
                <Download className="h-3.5 w-3.5" /> Baixar
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
