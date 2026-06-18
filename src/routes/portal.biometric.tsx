import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Fingerprint, DoorOpen, DoorClosed, Users, ShieldAlert, Calendar, ScanFace } from "lucide-react";

export const Route = createFileRoute("/portal/biometric")({
  head: () => ({ meta: [{ title: "Controle de Acesso — Sentinel" }] }),
  component: Biometric,
});

const logs = [
  { time: "14:34:11", user: "J. Almeida", method: "Digital", door: "Sala Servidores B", result: "autorizado" },
  { time: "14:33:42", user: "M. Silva (Visitante)", method: "QR Pass", door: "Portão do Lobby", result: "autorizado" },
  { time: "14:32:18", user: "Desconhecido", method: "Face", door: "Planta Portão 4", result: "negado" },
  { time: "14:31:55", user: "K. Park", method: "Cartão + PIN", door: "Andar da Central", result: "autorizado" },
  { time: "14:31:02", user: "Desconhecido", method: "Digital", door: "Corredor do Cofre", result: "negado" },
  { time: "14:30:21", user: "A. Costa", method: "Face", door: "Andar Executivo", result: "autorizado" },
  { time: "14:29:48", user: "L. Tanaka", method: "Digital", door: "Sala Servidores A", result: "autorizado" },
  { time: "14:28:55", user: "Prestador #88412", method: "Cartão Temp.", door: "Doca de Carga 5", result: "autorizado" },
];

const doors = [
  { door: "Portão do Lobby · Matriz", status: "fechada", mode: "Auto" },
  { door: "Sala de Servidores B · DC-1", status: "fechada", mode: "Trancada" },
  { door: "Corredor do Cofre · Matriz", status: "fechada", mode: "Trancada" },
  { door: "Doca de Carga 5 · Galpão", status: "aberta", mode: "Agendada" },
  { door: "Planta Portão 4 · Monterrey", status: "alerta", mode: "Forçada" },
  { door: "Andar Executivo · Matriz", status: "fechada", mode: "Auto" },
];

const users = [
  { name: "J. Almeida", role: "Líder de Infraestrutura", access: 14, last: "há 5min" },
  { name: "K. Park", role: "Operador da Central", access: 8, last: "há 12min" },
  { name: "A. Costa", role: "Diretoria", access: 22, last: "há 32min" },
  { name: "L. Tanaka", role: "Engenheiro de Data Center", access: 11, last: "há 1h" },
  { name: "R. Mendes", role: "Agente de Segurança", access: 18, last: "há 2h" },
];

function Biometric() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">Controle de Acesso Biométrico</Badge>
        <h1 className="mt-3 text-2xl font-bold">Controle de Acesso</h1>
        <p className="mt-1 text-sm text-muted-foreground">Entradas, saídas, validação biométrica e estado das portas em todas as instalações.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Entradas Hoje" value="1.842" delta="+6% vs ontem" deltaPositive icon={<DoorOpen className="h-5 w-5" />} accent="success" />
        <KpiCard label="Saídas Hoje" value="1.770" delta="fluxo equilibrado" icon={<DoorClosed className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Tentativas não autorizadas" value="14" delta="3 alto risco" icon={<ShieldAlert className="h-5 w-5" />} accent="destructive" />
        <KpiCard label="Usuários Cadastrados" value="2.418" delta="+12 esta semana" deltaPositive icon={<Users className="h-5 w-5" />} accent="primary" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Solicitações de Visitantes" value="46" delta="hoje" icon={<ScanFace className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Validações Biométricas" value="1.284" delta="digital + face" deltaPositive icon={<Fingerprint className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Agendamentos Ativos" value="38" delta="em 12 sites" icon={<Calendar className="h-5 w-5" />} accent="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Registros de acesso" description="Entradas e validações em tempo real" action={<Badge variant="destructive">2 negadas</Badge>} />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-secondary/40 text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">HORA</th>
                  <th className="px-4 py-2 font-medium">USUÁRIO</th>
                  <th className="px-4 py-2 font-medium">MÉTODO</th>
                  <th className="px-4 py-2 font-medium">PORTA</th>
                  <th className="px-4 py-2 font-medium">RESULTADO</th>
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
                      <Badge variant={l.result === "autorizado" ? "success" : "destructive"}>{l.result.toUpperCase()}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Estado das portas" description="Estado ao vivo · portas controladas" />
          <div className="divide-y divide-border">
            {doors.map((d) => (
              <div key={d.door} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{d.door}</div>
                  <div className="text-[11px] text-muted-foreground">Modo · {d.mode}</div>
                </div>
                {d.status === "fechada" && <Badge variant="success">● Segura</Badge>}
                {d.status === "aberta" && <Badge variant="info">● Aberta</Badge>}
                {d.status === "alerta" && <Badge variant="destructive">● Forçada</Badge>}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Gestão de usuários" description="Usuários ativos recentes · resumo de permissões" action={<Badge variant="info">2.418 no total</Badge>} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                <tr><th className="px-5 py-3 font-medium">Usuário</th><th className="px-5 py-3 font-medium">Função</th><th className="px-5 py-3 font-medium">Pontos de acesso</th><th className="px-5 py-3 font-medium">Visto</th></tr>
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
          <CardHeader title="Agendamentos de acesso" description="Regras de autorização por horário" />
          <div className="space-y-3 p-5">
            {[
              { name: "Horário Comercial · Matriz Andares 1–6", window: "Seg–Sex 07:00–20:00", users: "1.840" },
              { name: "Janela de Manutenção · DC-1", window: "Dom 02:00–06:00", users: "12" },
              { name: "Acesso Executivo · Andar 18", window: "24/7", users: "28" },
              { name: "Crachá de Prestadores · Planta", window: "Seg–Sáb 06:00–22:00", users: "146" },
              { name: "Turno Noturno · Galpão", window: "Diário 22:00–06:00", users: "62" },
            ].map((s) => (
              <div key={s.name} className="rounded-lg border border-border bg-secondary/30 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium">{s.name}</div>
                  <Badge variant="info">{s.users} usuários</Badge>
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
