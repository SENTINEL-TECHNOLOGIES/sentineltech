import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import {
  Camera,
  AlertTriangle,
  Activity,
  Eye,
  MapPin,
  Radio,
  Maximize2,
  Volume2,
} from "lucide-react";

export const Route = createFileRoute("/portal/monitoring")({
  head: () => ({ meta: [{ title: "Centro de Comando — Sentinel" }] }),
  component: Monitoring,
});

const cams = [
  {
    id: "CAM-01",
    name: "Matriz · Lobby Principal",
    zone: "Recepção",
    status: "live",
    motion: true,
  },
  {
    id: "CAM-02",
    name: "Matriz · Entrada Garagem",
    zone: "Perímetro",
    status: "live",
    motion: false,
  },
  {
    id: "CAM-03",
    name: "DC-2 · Corredor Frio A",
    zone: "Data Center",
    status: "live",
    motion: false,
  },
  { id: "CAM-04", name: "Galpão · Doca 5", zone: "Logística", status: "live", motion: true },
  { id: "CAM-05", name: "Planta · Produção L2", zone: "Industrial", status: "live", motion: false },
  { id: "CAM-06", name: "Varejo SP-12 · Loja", zone: "Varejo", status: "alert", motion: true },
  {
    id: "CAM-07",
    name: "Matriz · Cobertura Norte",
    zone: "Perímetro",
    status: "live",
    motion: false,
  },
  {
    id: "CAM-08",
    name: "Matriz · Sala Servidores B",
    zone: "Restrita",
    status: "live",
    motion: false,
  },
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
  {
    time: "14:32:08",
    camera: "CAM-06",
    zone: "Varejo SP-12",
    event: "Permanência suspeita",
    severity: "alta",
    action: "ALERTA ENVIADO",
  },
  {
    time: "14:31:55",
    camera: "CAM-22",
    zone: "Perímetro Norte",
    event: "Movimento na cerca",
    severity: "média",
    action: "VERIFICADO",
  },
  {
    time: "14:31:41",
    camera: "CAM-04",
    zone: "Doca 5",
    event: "Veículo não autorizado",
    severity: "crítica",
    action: "DESPACHAR",
  },
  {
    time: "14:31:22",
    camera: "CAM-14",
    zone: "Sala Servidores B",
    event: "Porta aberta >30s",
    severity: "alta",
    action: "ESCALADO",
  },
  {
    time: "14:30:58",
    camera: "CAM-08",
    zone: "Restrita",
    event: "Reconhecimento facial · Pessoa Demo 01",
    severity: "info",
    action: "AUTORIZADO",
  },
  {
    time: "14:30:31",
    camera: "CAM-31",
    zone: "Estacionamento",
    event: "Leitura de placa · DEMO-0001",
    severity: "info",
    action: "REGISTRADO",
  },
];

const facilityActivity = [
  { time: "14:32", text: "Equipe de ronda P-02 fez check-in no Setor 4", facility: "DC-2" },
  {
    time: "14:30",
    text: "Visitante Demo 01 escoltado até a Sala de Reunião 3",
    facility: "Matriz",
  },
  {
    time: "14:28",
    text: "Veículo demonstrativo verificado na Doca 5 — Carga DEMO-01",
    facility: "Galpão",
  },
  { time: "14:25", text: "Passagem de turno noturno concluída", facility: "Planta" },
  {
    time: "14:21",
    text: "Câmera CAM-09 ficou offline — chamado criado automaticamente",
    facility: "Planta",
  },
];

function Monitoring() {
  const onlineCameras = cams.filter((camera) => camera.status === "live").length;
  const activeAlerts = cams.filter((camera) => camera.status === "alert").length;
  const totalZoneEvents = zones.reduce((sum, zone) => sum + zone.events, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Centro de Comando</h1>
          <p className="text-sm text-muted-foreground">
            Câmeras, zonas e atividade simuladas para demonstração.
          </p>
        </div>
        <Badge variant="outline">Dados fictícios</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Câmeras online"
          value={`${onlineCameras}/${cams.length}`}
          delta="amostra simulada"
          deltaPositive
          icon={<Camera className="h-5 w-5" />}
        />
        <KpiCard
          label="Alertas ativos"
          value={String(activeAlerts)}
          delta="na lista de câmeras"
          icon={<AlertTriangle className="h-5 w-5" />}
          accent="warning"
        />
        <KpiCard
          label="Zonas monitoradas"
          value={String(zones.length)}
          delta={`${totalZoneEvents} eventos de exemplo`}
          deltaPositive
          icon={<MapPin className="h-5 w-5" />}
          accent="cyan"
        />
        <KpiCard
          label="Atividade recente"
          value={String(facilityActivity.length)}
          delta="registros fictícios"
          deltaPositive
          icon={<Activity className="h-5 w-5" />}
          accent="success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader
            title="Câmeras de exemplo"
            description="Status e movimento simulados"
            action={<Badge variant="info">{cams.length} câmeras</Badge>}
          />
          <div className="grid gap-3 p-4 sm:grid-cols-2">
            {cams.map((camera) => (
              <div key={camera.id} className="rounded-lg border border-border bg-secondary/20 p-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Camera className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-mono text-muted-foreground">
                      {camera.id} · {camera.zone}
                    </div>
                    <div className="mt-1 text-sm font-medium">{camera.name}</div>
                  </div>
                  <Maximize2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <Badge
                    variant={
                      camera.status === "live"
                        ? "success"
                        : camera.status === "alert"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {camera.status === "live"
                      ? "Online"
                      : camera.status === "alert"
                        ? "Alerta"
                        : "Offline"}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    {camera.motion ? (
                      <Volume2 className="h-3.5 w-3.5 text-warning" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                    {camera.motion ? "Movimento" : "Sem movimento"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Zonas de monitoramento"
              description="Áreas e contagens fictícias"
              action={<Radio className="h-4 w-4 text-primary" />}
            />
            <div className="divide-y divide-border">
              {zones.map((zone) => (
                <div key={zone.name} className="flex items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{zone.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {zone.cams} câmeras · {zone.events} eventos
                    </div>
                  </div>
                  <Badge variant={zone.status === "armada" ? "success" : "info"}>
                    {zone.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader title="Atividade das instalações" description="Feed sintético" />
            <div className="divide-y divide-border">
              {facilityActivity.map((item) => (
                <div key={`${item.time}-${item.facility}`} className="flex gap-3 p-4">
                  <span className="font-mono text-xs text-cyan">{item.time}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm">{item.text}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{item.facility}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader
          title="Eventos recentes"
          description="Ocorrências ilustrativas, sem alertas reais"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Hora</th>
                <th className="px-4 py-3 font-medium">Câmera</th>
                <th className="px-4 py-3 font-medium">Zona</th>
                <th className="px-4 py-3 font-medium">Evento</th>
                <th className="px-4 py-3 font-medium">Severidade</th>
                <th className="px-4 py-3 font-medium">Ação</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={`${event.time}-${event.camera}`} className="border-t border-border">
                  <td className="px-4 py-3 font-mono">{event.time}</td>
                  <td className="px-4 py-3">{event.camera}</td>
                  <td className="px-4 py-3">{event.zone}</td>
                  <td className="px-4 py-3">{event.event}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        event.severity === "crítica" || event.severity === "alta"
                          ? "warning"
                          : "info"
                      }
                    >
                      {event.severity}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{event.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <p className="text-xs text-muted-foreground">
        Todas as câmeras, ocorrências e contagens são fictícias; nenhum vídeo ou sensor está
        conectado.
      </p>
    </div>
  );
}
