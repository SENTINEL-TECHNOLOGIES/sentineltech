import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Eye, User, Car, Scan, Brain, Ban, Camera } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/portal/ai-cctv")({
  head: () => ({ meta: [{ title: "CFTV com IA — Sentinel" }] }),
  component: AICCTV,
});

const detections = Array.from({ length: 24 }, (_, i) => ({
  h: `${String(i).padStart(2, "0")}h`,
  pessoas: 80 + Math.max(0, 200 - Math.abs(i - 12) * 18) + (i % 5) * 6,
  veiculos: 30 + Math.max(0, 90 - Math.abs(i - 9) * 8) + (i % 4) * 5,
  objetos: 12 + ((i * 7) % 29),
}));

const aiEvents = [
  { time: "14:33", camera: "CAM-06", type: "Permanência >5min", confidence: 96, severity: "alta" },
  {
    time: "14:31",
    camera: "CAM-04",
    type: "Veículo em zona restrita",
    confidence: 99,
    severity: "crítica",
  },
  {
    time: "14:28",
    camera: "CAM-08",
    type: "Match facial · Pessoa Demo 01",
    confidence: 98,
    severity: "info",
  },
  { time: "14:24", camera: "CAM-12", type: "Objeto abandonado", confidence: 87, severity: "alta" },
  {
    time: "14:19",
    camera: "CAM-22",
    type: "Densidade de multidão · 38 pessoas",
    confidence: 94,
    severity: "média",
  },
  {
    time: "14:11",
    camera: "CAM-31",
    type: "Placa veicular · DEMO-0001",
    confidence: 99,
    severity: "info",
  },
  {
    time: "14:02",
    camera: "CAM-17",
    type: "Padrão de comportamento agressivo",
    confidence: 81,
    severity: "alta",
  },
  {
    time: "13:58",
    camera: "CAM-09",
    type: "Cruzamento de perímetro",
    confidence: 92,
    severity: "crítica",
  },
];

const modules = [
  {
    icon: <User className="h-5 w-5" />,
    name: "Detecção de Pessoas",
    events: "1.284",
    accuracy: "98,6%",
  },
  {
    icon: <Car className="h-5 w-5" />,
    name: "Detecção de Veículos",
    events: "612",
    accuracy: "99,2%",
  },
  {
    icon: <Scan className="h-5 w-5" />,
    name: "Reconhecimento Facial",
    events: "428",
    accuracy: "97,4%",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    name: "Detecção de Objetos",
    events: "892",
    accuracy: "96,1%",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    name: "Análise Comportamental",
    events: "146",
    accuracy: "91,8%",
  },
  {
    icon: <Ban className="h-5 w-5" />,
    name: "Violações de Área Restrita",
    events: "23",
    accuracy: "99,8%",
  },
];

function AICCTV() {
  const totalEvents = modules.reduce(
    (sum, module) => sum + Number(module.events.replace(".", "")),
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="info">Vigilância com IA</Badge>
          <h1 className="mt-3 text-2xl font-bold">Inteligência de CFTV</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Indicadores sintéticos de análise de vídeo para demonstração.
          </p>
        </div>
        <Badge variant="outline">Dados fictícios</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Eventos analisados"
          value={totalEvents.toLocaleString("pt-BR")}
          delta="volume demonstrativo"
          deltaPositive
          icon={<Eye className="h-5 w-5" />}
        />
        <KpiCard
          label="Câmeras de exemplo"
          value="32"
          delta="em 5 locais fictícios"
          deltaPositive
          icon={<Camera className="h-5 w-5" />}
          accent="cyan"
        />
        <KpiCard
          label="Alertas prioritários"
          value={String(
            aiEvents.filter((event) => event.severity === "alta" || event.severity === "crítica")
              .length,
          )}
          delta="na amostra exibida"
          icon={<Brain className="h-5 w-5" />}
          accent="warning"
        />
        <KpiCard
          label="Confiança média"
          value={`${Math.round(aiEvents.reduce((sum, event) => sum + event.confidence, 0) / aiEvents.length)}%`}
          delta="eventos da amostra"
          deltaPositive
          icon={<Scan className="h-5 w-5" />}
          accent="success"
        />
      </div>

      <Card>
        <CardHeader
          title="Detecções nas últimas 24 horas"
          description="Série horária gerada para esta demonstração"
        />
        <div className="h-72 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={detections}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="h" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="pessoas"
                name="Pessoas"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.18)"
              />
              <Area
                type="monotone"
                dataKey="veiculos"
                name="Veículos"
                stroke="hsl(var(--cyan))"
                fill="hsl(var(--cyan) / 0.15)"
              />
              <Area
                type="monotone"
                dataKey="objetos"
                name="Objetos"
                stroke="hsl(var(--success))"
                fill="hsl(var(--success) / 0.12)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Card>
          <CardHeader title="Módulos de análise" description="Volume e precisão fictícios" />
          <div className="divide-y divide-border">
            {modules.map((module) => (
              <div key={module.name} className="flex items-center gap-3 p-4">
                <span className="text-primary">{module.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{module.name}</div>
                  <div className="text-xs text-muted-foreground">{module.events} eventos</div>
                </div>
                <Badge variant="success">{module.accuracy}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Eventos recentes" description="Amostra fictícia de alertas de vídeo" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Hora</th>
                  <th className="px-4 py-3 font-medium">Câmera</th>
                  <th className="px-4 py-3 font-medium">Detecção</th>
                  <th className="px-4 py-3 font-medium">Confiança</th>
                  <th className="px-4 py-3 font-medium">Nível</th>
                </tr>
              </thead>
              <tbody>
                {aiEvents.map((event) => (
                  <tr key={`${event.time}-${event.camera}`} className="border-t border-border">
                    <td className="px-4 py-3 font-mono">{event.time}</td>
                    <td className="px-4 py-3">{event.camera}</td>
                    <td className="px-4 py-3">{event.type}</td>
                    <td className="px-4 py-3">{event.confidence}%</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <p className="text-xs text-muted-foreground">
        Detecções, horários e métricas são simulados; nenhuma câmera ou análise real está conectada.
      </p>
    </div>
  );
}
