import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Eye, User, Car, Scan, Brain, Ban, Camera } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/portal/ai-cctv")({
  head: () => ({ meta: [{ title: "CFTV com IA — Sentinel" }] }),
  component: AICCTV,
});

const detections = Array.from({ length: 24 }, (_, i) => ({
  h: `${String(i).padStart(2, "0")}h`,
  pessoas: 80 + Math.round(Math.max(0, 200 - Math.abs(i - 12) * 18) + Math.random() * 30),
  veiculos: 30 + Math.round(Math.max(0, 90 - Math.abs(i - 9) * 8) + Math.random() * 18),
  objetos: 12 + Math.round(Math.random() * 28),
}));

const aiEvents = [
  { time: "14:33", camera: "CAM-06", type: "Permanência >5min", confidence: 96, severity: "alta" },
  { time: "14:31", camera: "CAM-04", type: "Veículo em zona restrita", confidence: 99, severity: "crítica" },
  { time: "14:28", camera: "CAM-08", type: "Match facial · J. Almeida", confidence: 98, severity: "info" },
  { time: "14:24", camera: "CAM-12", type: "Objeto abandonado", confidence: 87, severity: "alta" },
  { time: "14:19", camera: "CAM-22", type: "Densidade de multidão · 38 pessoas", confidence: 94, severity: "média" },
  { time: "14:11", camera: "CAM-31", type: "Placa veicular · ABC-2241", confidence: 99, severity: "info" },
  { time: "14:02", camera: "CAM-17", type: "Padrão de comportamento agressivo", confidence: 81, severity: "alta" },
  { time: "13:58", camera: "CAM-09", type: "Cruzamento de perímetro", confidence: 92, severity: "crítica" },
];

const modules = [
  { icon: <User className="h-5 w-5" />, name: "Detecção de Pessoas", events: "1.284", accuracy: "98,6%" },
  { icon: <Car className="h-5 w-5" />, name: "Detecção de Veículos", events: "612", accuracy: "99,2%" },
  { icon: <Scan className="h-5 w-5" />, name: "Reconhecimento Facial", events: "428", accuracy: "97,4%" },
  { icon: <Eye className="h-5 w-5" />, name: "Detecção de Objetos", events: "892", accuracy: "96,1%" },
  { icon: <Brain className="h-5 w-5" />, name: "Análise Comportamental", events: "146", accuracy: "91,8%" },
  { icon: <Ban className="h-5 w-5" />, name: "Violações de Área Restrita", events: "23", accuracy: "99,8%" },
];

function AICCTV() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">Vigilância com IA</Badge>
        <h1 className="mt-3 text-2xl font-bold">Inteligência de CFTV</h1>
        <p className="mt-1 text-sm text-muted-foreground">Este menu foi zerado. Para reconstituí-lo, edite os arrays do arquivo atual.</p>
      </div>

      <Card className="border-dashed">
        <div className="flex flex-col gap-4 p-6">
          <Badge variant="outline">Área vazia</Badge>
          <div>
            <h2 className="text-xl font-bold">Nenhum item cadastrado neste menu</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use as constantes do arquivo para adicionar módulos, eventos e gráficos do CFTV com IA.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">1. `modules`</span>
              <p className="mt-1 text-muted-foreground">Adicione cada módulo de IA, como detecção de pessoas, veículos, objetos e reconhecimento facial.</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">2. `detections`</span>
              <p className="mt-1 text-muted-foreground">Insira os pontos do gráfico das últimas 24 horas para popular o painel.</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm md:col-span-2">
              <span className="font-semibold text-foreground">3. `aiEvents`</span>
              <p className="mt-1 text-muted-foreground">Preencha o histórico com hora, câmera, tipo de detecção, confiança e severidade para alimentar a tabela.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
