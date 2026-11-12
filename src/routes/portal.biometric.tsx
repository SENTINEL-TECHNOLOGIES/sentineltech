import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import {
  Fingerprint,
  DoorOpen,
  DoorClosed,
  Users,
  ShieldAlert,
  Calendar,
  ScanFace,
} from "lucide-react";

export const Route = createFileRoute("/portal/biometric")({
  head: () => ({ meta: [{ title: "Controle de Acesso — Sentinel" }] }),
  component: Biometric,
});

const logs = [
  {
    time: "14:34:11",
    user: "Pessoa Demo 01",
    method: "Digital",
    door: "Sala Servidores B",
    result: "autorizado",
  },
  {
    time: "14:33:42",
    user: "Visitante Demo 01",
    method: "QR Pass",
    door: "Portão do Lobby",
    result: "autorizado",
  },
  {
    time: "14:32:18",
    user: "Desconhecido",
    method: "Face",
    door: "Planta Portão 4",
    result: "negado",
  },
  {
    time: "14:31:55",
    user: "Operador Demo 02",
    method: "Cartão + PIN",
    door: "Andar da Central",
    result: "autorizado",
  },
  {
    time: "14:31:02",
    user: "Desconhecido",
    method: "Digital",
    door: "Corredor do Cofre",
    result: "negado",
  },
  {
    time: "14:30:21",
    user: "Pessoa Demo 03",
    method: "Face",
    door: "Andar Executivo",
    result: "autorizado",
  },
  {
    time: "14:29:48",
    user: "Pessoa Demo 04",
    method: "Digital",
    door: "Sala Servidores A",
    result: "autorizado",
  },
  {
    time: "14:28:55",
    user: "Prestador #88412",
    method: "Cartão Temp.",
    door: "Doca de Carga 5",
    result: "autorizado",
  },
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
  { name: "Pessoa Demo 01", role: "Líder de Infraestrutura", access: 14, last: "há 5min" },
  { name: "Operador Demo 02", role: "Operador da Central", access: 8, last: "há 12min" },
  { name: "Pessoa Demo 03", role: "Diretoria", access: 22, last: "há 32min" },
  { name: "Pessoa Demo 04", role: "Engenheiro de Data Center", access: 11, last: "há 1h" },
  { name: "Agente Demo 05", role: "Agente de Segurança", access: 18, last: "há 2h" },
];

function Biometric() {
  const denied = logs.filter((log) => log.result === "negado").length;
  const activeDoors = doors.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="info">Controle de Acesso Biométrico</Badge>
          <h1 className="mt-3 text-2xl font-bold">Controle de Acesso</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Registros e usuários fictícios para demonstração do controle de acesso.
          </p>
        </div>
        <Badge variant="outline">Dados demonstrativos</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Pessoas cadastradas"
          value={String(users.length)}
          delta="perfis fictícios"
          deltaPositive
          icon={<Users className="h-5 w-5" />}
        />
        <KpiCard
          label="Portas monitoradas"
          value={String(activeDoors)}
          delta="estados simulados"
          deltaPositive
          icon={<DoorClosed className="h-5 w-5" />}
          accent="cyan"
        />
        <KpiCard
          label="Acessos na amostra"
          value={String(logs.length)}
          delta="registros demonstrativos"
          deltaPositive
          icon={<Fingerprint className="h-5 w-5" />}
          accent="success"
        />
        <KpiCard
          label="Tentativas negadas"
          value={String(denied)}
          delta="na amostra exibida"
          icon={<ShieldAlert className="h-5 w-5" />}
          accent="warning"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader
            title="Registro de acessos"
            description="Eventos fictícios de entrada"
            action={<Badge variant="info">Amostra</Badge>}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Horário</th>
                  <th className="px-4 py-3 font-medium">Usuário</th>
                  <th className="px-4 py-3 font-medium">Método</th>
                  <th className="px-4 py-3 font-medium">Porta</th>
                  <th className="px-4 py-3 font-medium">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={`${log.time}-${log.door}`} className="border-t border-border">
                    <td className="px-4 py-3 font-mono">{log.time}</td>
                    <td className="px-4 py-3">{log.user}</td>
                    <td className="px-4 py-3">{log.method}</td>
                    <td className="px-4 py-3">{log.door}</td>
                    <td className="px-4 py-3">
                      <Badge variant={log.result === "autorizado" ? "success" : "destructive"}>
                        {log.result}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Portas e catracas" description="Estados simulados" />
            <div className="divide-y divide-border">
              {doors.map((item) => (
                <div key={item.door} className="flex items-center gap-3 p-4">
                  {item.status === "aberta" ? (
                    <DoorOpen className="h-4 w-4 text-warning" />
                  ) : (
                    <DoorClosed className="h-4 w-4 text-primary" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{item.door}</div>
                    <div className="text-xs text-muted-foreground">Modo: {item.mode}</div>
                  </div>
                  <Badge variant={item.status === "fechada" ? "success" : "warning"}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader
              title="Usuários de exemplo"
              description="Identidades fictícias"
              action={<Calendar className="h-4 w-4 text-primary" />}
            />
            <div className="divide-y divide-border">
              {users.map((user) => (
                <div key={user.name} className="flex items-center gap-3 p-4">
                  <ScanFace className="h-4 w-4 text-cyan" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.role}</div>
                  </div>
                  <span className="text-right text-xs text-muted-foreground">
                    {user.access} acessos
                    <br />
                    {user.last}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Nomes, horários e leituras são fictícios. Nenhuma biometria real é coletada ou armazenada.
      </p>
    </div>
  );
}
