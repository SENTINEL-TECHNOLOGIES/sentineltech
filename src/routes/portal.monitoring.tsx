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
          <p className="text-sm text-muted-foreground">Vigilância ao vivo, zonas monitoradas e detecções de IA em todas as instalações.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-mono text-primary">
          <span className="h-2 w-2 animate-pulse-glow rounded-full bg-primary" /> Central · Operador de plantão: K. Park · Turno 14:00–22:00
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Câmeras Online" value="848 / 856" delta="99,1%" deltaPositive icon={<Camera className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Zonas Ativas" value="46" delta="6 perímetros armados" icon={<MapPin className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Eventos de IA (24h)" value="1.284" delta="22 prioridade alta" icon={<Eye className="h-5 w-5" />} accent="success" />
        <KpiCard label="Incidentes Abertos" value="7" delta="2 com despacho" icon={<AlertTriangle className="h-5 w-5" />} accent="warning" />
      </div>

      <Card>
        <CardHeader title="Grade de câmeras ao vivo" description="Visão multi-câmera · clique para tela cheia" action={<Badge variant="info">9 de 856 streams</Badge>} />
        <div className="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-3">
          {cams.map((c) => (
            <div key={c.id} className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-black">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-cyan/10" />
              <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "repeating-linear-gradient(0deg, oklch(0.85 0.02 255), oklch(0.85 0.02 255) 1px, transparent 1px, transparent 3px)" }} />
              <div className="absolute inset-0 bg-grid-sm opacity-20" />
              {c.motion && <div className="absolute left-1/3 top-1/3 h-12 w-16 animate-pulse rounded border-2 border-warning bg-warning/10" />}

              <div className="absolute inset-0 flex flex-col justify-between p-2.5 text-[10px] font-mono">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5">
                    {c.status === "live" && <span className="flex items-center gap-1 rounded bg-destructive/80 px-1.5 py-0.5 text-destructive-foreground"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />REC</span>}
                    {c.status === "alert" && <span className="rounded bg-warning px-1.5 py-0.5 text-warning-foreground">ALERTA</span>}
                    {c.status === "offline" && <span className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground">OFFLINE</span>}
                    <span className="text-cyan">{c.id}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="grid h-5 w-5 place-items-center rounded bg-black/60 text-foreground" aria-label="Som"><Volume2 className="h-3 w-3" /></button>
                    <button className="grid h-5 w-5 place-items-center rounded bg-black/60 text-foreground" aria-label="Tela cheia"><Maximize2 className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-foreground/90">{c.name}</div>
                    <div className="text-muted-foreground">{c.zone}</div>
                  </div>
                  <div className="text-muted-foreground">1920×1080 · 30fps</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Mapa de status das câmeras" description="Zonas de monitoramento · perímetros armados" action={<Badge variant="success">Todas armadas</Badge>} />
          <div className="relative h-80 overflow-hidden p-4">
            <svg viewBox="0 0 600 280" className="h-full w-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.32 0.06 265 / 0.4)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="600" height="280" fill="url(#grid)" />
              <rect x="60" y="60" width="140" height="100" rx="6" fill="oklch(0.27 0.06 265 / 0.6)" stroke="oklch(0.62 0.21 258)" strokeWidth="1.5" />
              <text x="130" y="115" textAnchor="middle" fontSize="11" fill="oklch(0.85 0.02 255)" fontFamily="JetBrains Mono">TORRE MATRIZ</text>
              <rect x="240" y="40" width="120" height="80" rx="6" fill="oklch(0.27 0.06 265 / 0.6)" stroke="oklch(0.78 0.13 210)" strokeWidth="1.5" />
              <text x="300" y="85" textAnchor="middle" fontSize="11" fill="oklch(0.85 0.02 255)" fontFamily="JetBrains Mono">DC-2</text>
              <rect x="240" y="160" width="180" height="80" rx="6" fill="oklch(0.27 0.06 265 / 0.6)" stroke="oklch(0.78 0.13 210)" strokeWidth="1.5" />
              <text x="330" y="205" textAnchor="middle" fontSize="11" fill="oklch(0.85 0.02 255)" fontFamily="JetBrains Mono">GALPÃO</text>
              <rect x="460" y="80" width="100" height="120" rx="6" fill="oklch(0.27 0.06 265 / 0.6)" stroke="oklch(0.62 0.22 25 / 0.7)" strokeWidth="1.5" />
              <text x="510" y="145" textAnchor="middle" fontSize="11" fill="oklch(0.85 0.02 255)" fontFamily="JetBrains Mono">PLANTA</text>

              {[[80, 80], [180, 80], [80, 145], [180, 145], [260, 60], [340, 60], [260, 105], [340, 105], [260, 180], [400, 180], [260, 225], [400, 225], [475, 95], [545, 95], [475, 185], [545, 185]].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="3" fill="oklch(0.72 0.17 160)" />
                  <circle cx={x} cy={y} r="6" fill="none" stroke="oklch(0.72 0.17 160 / 0.4)">
                    <animate attributeName="r" from="3" to="12" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
              <g>
                <circle cx="510" cy="220" r="4" fill="oklch(0.62 0.22 25)" />
                <circle cx="510" cy="220" r="10" fill="none" stroke="oklch(0.62 0.22 25)">
                  <animate attributeName="r" from="4" to="20" dur="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="indefinite" />
                </circle>
              </g>
              <text x="540" y="224" fontSize="9" fill="oklch(0.62 0.22 25)" fontFamily="JetBrains Mono">ALERTA · Portão 4</text>
            </svg>
          </div>
        </Card>

        <Card>
          <CardHeader title="Zonas de monitoramento" description="Áreas armadas e monitoradas" />
          <div className="divide-y divide-border">
            {zones.map((z) => (
              <div key={z.name} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{z.name}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <Radio className="h-3 w-3" /> {z.cams} câmeras · {z.events} eventos 24h
                  </div>
                </div>
                <Badge variant={z.status === "armada" ? "destructive" : "info"}>{z.status.toUpperCase()}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Eventos de IA e intrusão" description="Stream em tempo real dos modelos de detecção" action={<Badge variant="destructive">2 críticos</Badge>} />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-secondary/40 text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">HORA</th>
                  <th className="px-4 py-2 font-medium">CÂMERA</th>
                  <th className="px-4 py-2 font-medium">ZONA</th>
                  <th className="px-4 py-2 font-medium">EVENTO</th>
                  <th className="px-4 py-2 font-medium">SEVERIDADE</th>
                  <th className="px-4 py-2 font-medium">AÇÃO</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {events.map((e, i) => (
                  <tr key={i} className="border-t border-border hover:bg-accent/30">
                    <td className="px-4 py-2.5 text-muted-foreground">{e.time}</td>
                    <td className="px-4 py-2.5 text-cyan">{e.camera}</td>
                    <td className="px-4 py-2.5">{e.zone}</td>
                    <td className="px-4 py-2.5">{e.event}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={e.severity === "crítica" ? "destructive" : e.severity === "alta" ? "warning" : e.severity === "info" ? "info" : "outline"}>{e.severity.toUpperCase()}</Badge>
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge variant={e.action === "DESPACHAR" || e.action === "ESCALADO" || e.action === "ALERTA ENVIADO" ? "destructive" : "success"}>{e.action}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Feed de atividade" description="Operações nas instalações" />
          <div className="divide-y divide-border">
            {facilityActivity.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <Activity className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm">{f.text}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="font-mono">{f.time}</span> · {f.facility}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
