import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Badge, KpiCard } from "@/components/ui-bits";
import { Ticket } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CREDENTIALS, getSession } from "@/lib/auth";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/portal/tickets")({
  head: () => ({ meta: [{ title: "Chamados — Sentinel" }] }),
  component: Tickets,
});

const corporateDemoTickets = [
  { id: "#1842", title: "CAM-09 offline — Planta Portão 4", priority: "Crítica", status: "Aberto", date: "15 Jun" },
  { id: "#1841", title: "CAM-03 com drift de imagem — sala servidores andar 3", priority: "Alta", status: "Em Andamento", date: "15 Jun" },
  { id: "#1839", title: "Leitor de acesso não responde — Portão B", priority: "Média", status: "Em Andamento", date: "14 Jun" },
  { id: "#1837", title: "Exportação do relatório mensal de vigilância falhando (Maio 2026)", priority: "Baixa", status: "Aberto", date: "13 Jun" },
  { id: "#1835", title: "Limite de armazenamento do NVR atingido — Galpão SG", priority: "Baixa", status: "Aberto", date: "12 Jun" },
  { id: "#1832", title: "Cadastro de visitantes pendente para 4 usuários", priority: "Média", status: "Resolvido", date: "11 Jun" },
];

type SupportTicket = (typeof corporateDemoTickets)[number];

function ticketStorageKey(email: string) {
  return `sentinel:tickets:${email.trim().toLowerCase()}`;
}

function readTickets(email: string): SupportTicket[] {
  try {
    const stored = localStorage.getItem(ticketStorageKey(email));
    if (stored) return JSON.parse(stored) as SupportTicket[];
  } catch { /* Fall back to this role's mock state. */ }
  return email.toLowerCase() === CREDENTIALS.corporate.email ? corporateDemoTickets : [];
}

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
  const { session } = useSession();
  const [filter, setFilter] = useState("Todos");
  const [accountTickets, setAccountTickets] = useState<SupportTicket[]>([]);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Infraestrutura");
  const [priority, setPriority] = useState("Média");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (session?.email) setAccountTickets(readTickets(session.email));
  }, [session?.email]);

  const filtered = accountTickets.filter((ticket) => filter === "Todos" || ticket.status === filter);
  const openCount = accountTickets.filter((ticket) => ticket.status === "Aberto").length;
  const inProgressCount = accountTickets.filter((ticket) => ticket.status === "Em Andamento").length;

  function submitTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session?.email || !subject.trim() || !description.trim()) {
      toast.error("Informe o assunto e a descrição da solicitação.");
      return;
    }
    const nextTicket: SupportTicket = {
      id: `#${Math.floor(Date.now() / 1000)}`,
      title: `${category}: ${subject.trim()}`,
      priority,
      status: "Aberto",
      date: new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date()),
    };
    const next = [nextTicket, ...accountTickets];
    setAccountTickets(next);
    localStorage.setItem(ticketStorageKey(session.email), JSON.stringify(next));
    setSubject("");
    setDescription("");
    toast.success("Solicitação registrada neste navegador.");
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Solicitações</h1><p className="text-sm text-muted-foreground">Acompanhe seus pedidos e histórico de atendimento.</p></div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Solicitações abertas" value={String(openCount)} icon={<Ticket className="h-5 w-5" />} accent="warning" />
        <KpiCard label="Em atendimento" value={String(inProgressCount)} icon={<Ticket className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Histórico" value={String(accountTickets.length)} delta="associado à sua conta" deltaPositive icon={<Ticket className="h-5 w-5" />} accent="success" />
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
          <form className="space-y-3 p-5" onSubmit={submitTicket}>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Assunto</label>
              <input value={subject} onChange={(event) => setSubject(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary" placeholder="Descrição breve do pedido" />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Categoria</label>
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary">
                <option>Incidente de Segurança</option><option>Infraestrutura</option><option>Acesso</option><option>Financeiro</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Prioridade</label>
              <select value={priority} onChange={(event) => setPriority(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary">
                <option>Baixa</option><option>Média</option><option>Alta</option><option>Crítica</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Descrição</label>
              <textarea rows={4} value={description} onChange={(event) => setDescription(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary" placeholder="Conte o que aconteceu..." />
            </div>
            <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">Enviar solicitação</button>
            <p className="text-[11px] text-muted-foreground">Solicitações desta demonstração são armazenadas neste navegador e não são enviadas a um backend.</p>
          </form>
        </Card>
      </div>
    </div>
  );
}
