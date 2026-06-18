import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Badge, KpiCard } from "@/components/ui-bits";
import { Ticket } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/portal/tickets")({
  head: () => ({ meta: [{ title: "Chamados — Sentinel" }] }),
  component: Tickets,
});

const tickets = [
  { id: "#1842", title: "CAM-09 offline — Planta Portão 4", priority: "Crítica", status: "Aberto", date: "15 Jun" },
  { id: "#1841", title: "CAM-03 com drift de imagem — sala servidores andar 3", priority: "Alta", status: "Em Andamento", date: "15 Jun" },
  { id: "#1839", title: "Leitor de acesso não responde — Portão B", priority: "Média", status: "Em Andamento", date: "14 Jun" },
  { id: "#1837", title: "Exportação do relatório mensal de vigilância falhando (Maio 2026)", priority: "Baixa", status: "Aberto", date: "13 Jun" },
  { id: "#1835", title: "Limite de armazenamento do NVR atingido — Galpão SG", priority: "Baixa", status: "Aberto", date: "12 Jun" },
  { id: "#1832", title: "Cadastro de visitantes pendente para 4 usuários", priority: "Média", status: "Resolvido", date: "11 Jun" },
];

function priorityClass(p: string) {
  if (p === "Crítica") return "text-destructive";
  if (p === "Alta") return "text-warning";
  if (p === "Média") return "text-cyan";
  return "text-muted-foreground";
}
function statusBadge(s: string) {
  if (s === "Resolvido") return <Badge variant="success">{s}</Badge>;
  if (s === "Em Andamento") return <Badge variant="info">{s}</Badge>;
  return <Badge variant="warning">{s}</Badge>;
}

function Tickets() {
  const [filter, setFilter] = useState("Todos");
  const filtered = tickets.filter((t) => filter === "Todos" || t.status === filter);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Central de Suporte</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Chamados Abertos" value="7" icon={<Ticket className="h-5 w-5" />} accent="warning" />
        <KpiCard label="Tempo Médio de Resposta" value="42 min" icon={<Ticket className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Nota de Satisfação" value="4,8/5" icon={<Ticket className="h-5 w-5" />} accent="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <div className="flex items-center gap-2 border-b border-border p-3">
            {["Todos", "Aberto", "Em Andamento", "Resolvido"].map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`rounded-md px-3 py-1.5 text-xs font-semibold ${filter === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}>{s}</button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                <tr><th className="px-4 py-3 font-medium">ID</th><th className="px-4 py-3 font-medium">Título</th><th className="px-4 py-3 font-medium">Prioridade</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Data</th></tr>
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
          <CardHeader title="Abrir novo chamado" />
          <form className="space-y-3 p-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Assunto</label>
              <input className="mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary" placeholder="Descrição breve do problema" />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Categoria</label>
              <select className="mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary">
                <option>Incidente de Segurança</option><option>Infraestrutura</option><option>Acesso</option><option>Financeiro</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Prioridade</label>
              <select className="mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary">
                <option>Baixa</option><option>Média</option><option>Alta</option><option>Crítica</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Descrição</label>
              <textarea rows={4} className="mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary" placeholder="Conte o que aconteceu..." />
            </div>
            <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">Enviar chamado</button>
          </form>
        </Card>
      </div>
    </div>
  );
}
