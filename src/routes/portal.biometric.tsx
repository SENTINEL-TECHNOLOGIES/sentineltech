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
        <p className="mt-1 text-sm text-muted-foreground">Este menu foi zerado. Para popular o módulo, edite os arrays do arquivo atual.</p>
      </div>

      <Card className="border-dashed">
        <div className="flex flex-col gap-4 p-6">
          <Badge variant="outline">Área vazia</Badge>
          <div>
            <h2 className="text-xl font-bold">Nenhum item cadastrado neste menu</h2>
            <p className="mt-2 text-sm text-muted-foreground">Para adicionar registros, portas, usuários e agendamentos, use as constantes `logs`, `doors`, `users` no arquivo desta rota.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">1. `logs`</span>
              <p className="mt-1 text-muted-foreground">Adicione entradas de acesso com hora, usuário, método, porta e resultado.</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">2. `doors`</span>
              <p className="mt-1 text-muted-foreground">Defina portas, estado e modo de operação para o painel de controle.</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">3. `users`</span>
              <p className="mt-1 text-muted-foreground">Cadastre usuários, funções e métricas para alimentar a gestão de acessos.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
