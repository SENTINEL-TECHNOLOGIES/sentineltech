import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Camera, AlertTriangle, Activity, Eye, MapPin, Radio, Maximize2, Volume2 } from "lucide-react";

export const Route = createFileRoute("/portal/monitoring")({
  head: () => ({ meta: [{ title: "Centro de Comando — Sentinel" }] }),
  component: Monitoring,
});

const cams = [
  { id: "CAM-01", name: "Matriz · Lobby Principal", zone: "Recepção", status: "live", motion: true },
  { id: "CAM-02", name: "Matriz · Entrada Garagem", zone: "Perímetro", status: "live", motion: false },
  { id: "CAM-03", name: "DC-2 · Corredor Frio A", zone: "Data Center", status: "live", motion: false },
  { id: "CAM-04", name: "Galpão · Doca 5", zone: "Logística", status: "live", motion: true },
  { id: "CAM-05", name: "Planta · Produção L2", zone: "Industrial", status: "live", motion: false },
  { id: "CAM-06", name: "Varejo SP-12 · Loja", zone: "Varejo", status: "alert", motion: true },
  { id: "CAM-07", name: "Matriz · Cobertura Norte", zone: "Perímetro", status: "live", motion: false },
  { id: "CAM-08", name: "Matriz · Sala Servidores B", zone: "Restrita", status: "live", motion: false },
  { id: "CAM-09", name: "Planta · Portão 4", zone: "Perímetro", status: "offline", motion: false },
];

const zones = [
  { name: "Perímetro — Cerca Norte", cams: 18, status: "armada", events: 4 },
  { name: "Perímetro — Cerca Sul", cams: 14, status: "armada", events: 1 },
  { name: "Restrita — Data Center", cams: 22, status: "armada", events: 0 },
  { name: "Pública — Lobby e Recepção", cams: 12, status: "monitorada", events: 12 },
  { name: "Industrial — Linhas de Produção", cams: 36, status: "monitorada", events: 7 },
  { name: "Logística — Docas de Carga", cams: 24, status: "monitorada", events: 5 },
];

const events = [
  { time: "14:32:08", camera: "CAM-06", zone: "Varejo SP-12", event: "Permanência suspeita", severity: "alta", action: "ALERTA ENVIADO" },
  { time: "14:31:55", camera: "CAM-22", zone: "Perímetro Norte", event: "Movimento na cerca", severity: "média", action: "VERIFICADO" },
  { time: "14:31:41", camera: "CAM-04", zone: "Doca 5", event: "Veículo não autorizado", severity: "crítica", action: "DESPACHAR" },
  { time: "14:31:22", camera: "CAM-14", zone: "Sala Servidores B", event: "Porta aberta >30s", severity: "alta", action: "ESCALADO" },
  { time: "14:30:58", camera: "CAM-08", zone: "Restrita", event: "Reconhecimento facial · J. Almeida", severity: "info", action: "AUTORIZADO" },
  { time: "14:30:31", camera: "CAM-31", zone: "Estacionamento", event: "Leitura de placa · ABC-2241", severity: "info", action: "REGISTRADO" },
];

const facilityActivity = [
  { time: "14:32", text: "Equipe de ronda P-02 fez check-in no Setor 4", facility: "DC-2" },
  { time: "14:30", text: "Visitante M. Silva escoltado até a Sala de Reunião 3", facility: "Matriz" },
  { time: "14:28", text: "Caminhão de entrega verificado na Doca 5 — Transportadora #88412", facility: "Galpão" },
  { time: "14:25", text: "Passagem de turno noturno concluída", facility: "Planta" },
  { time: "14:21", text: "Câmera CAM-09 ficou offline — chamado criado automaticamente", facility: "Planta" },
];

function Monitoring() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Centro de Comando</h1>
          <p className="text-sm text-muted-foreground">Este menu foi zerado. Para reconstituí-lo, edite os arrays do arquivo desta rota.</p>
        </div>
      </div>

      <Card className="border-dashed">
        <div className="flex flex-col gap-4 p-6">
          <Badge variant="outline">Área vazia</Badge>
          <div>
            <h2 className="text-xl font-bold">Nenhum item cadastrado neste menu</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use as constantes `cams`, `zones`, `events` e `facilityActivity` para adicionar câmeras, zonas, alertas e feed de atividade.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">1. `cams`</span>
              <p className="mt-1 text-muted-foreground">Adicione câmeras ao vivo com id, nome, zona, status e movimento.</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">2. `zones`</span>
              <p className="mt-1 text-muted-foreground">Defina zonas, câmeras e eventos monitorados por área.</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">3. `events`</span>
              <p className="mt-1 text-muted-foreground">Cadastre os eventos de IA e intrusão com severidade e ação.</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">4. `facilityActivity`</span>
              <p className="mt-1 text-muted-foreground">Preencha o feed de atividade com as ocorrências recentes das instalações.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
