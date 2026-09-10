import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Lightbulb, DoorOpen, Bell, Zap, Thermometer, Droplets, Wind } from "lucide-react";

export const Route = createFileRoute("/portal/automation")({
  head: () => ({ meta: [{ title: "Automação Predial — Sentinel" }] }),
  component: Automation,
});

const sensors = [
  { icon: <Thermometer className="h-4 w-4" />, name: "Temperatura · DC-1 Corredor Frio", value: "18,4 °C", state: "ok" },
  { icon: <Droplets className="h-4 w-4" />, name: "Umidade · Sala de Servidores B", value: "42 %", state: "ok" },
  { icon: <Wind className="h-4 w-4" />, name: "Qualidade do Ar · Andar 7 Matriz", value: "94 AQI", state: "warn" },
  { icon: <Thermometer className="h-4 w-4" />, name: "Temperatura · Planta Linha 2", value: "27,1 °C", state: "ok" },
  { icon: <Droplets className="h-4 w-4" />, name: "Vazamento d'água · Subsolo", value: "Seco", state: "ok" },
  { icon: <Wind className="h-4 w-4" />, name: "Fumaça · Doca do Galpão", value: "Limpo", state: "ok" },
];

const groups = [
  { icon: <Lightbulb className="h-5 w-5" />, name: "Automação de Iluminação", devices: 1242, on: 318, schedules: 14, energy: "62 kWh" },
  { icon: <DoorOpen className="h-5 w-5" />, name: "Portões e Portas", devices: 184, on: 22, schedules: 9, energy: "—" },
  { icon: <Bell className="h-5 w-5" />, name: "Sistemas de Alarme", devices: 96, on: 96, schedules: 4, energy: "—" },
  { icon: <Zap className="h-5 w-5" />, name: "Monitoramento de Energia", devices: 48, on: 48, schedules: 6, energy: "1,2 MWh / dia" },
];

const automations = [
  { name: "Pôr do sol · Liga floodlights de perímetro", trigger: "Astronômico (pôr do sol)", action: "Ligar refletores do perímetro", state: "armada" },
  { name: "Fora do expediente · Trancar portas internas", trigger: "20:00 dias úteis", action: "Trancar 84 portas internas + armar zonas", state: "armada" },
  { name: "Chegada de visitante · Alerta de recepção", trigger: "Leitura no portão do lobby", action: "Notificar recepção + abrir catraca", state: "armada" },
  { name: "Alarme de incêndio · Liberar saídas", trigger: "Fumaça ou acionador manual", action: "Liberar todas as rotas de fuga + abrir portões", state: "armada" },
  { name: "Térmica corredor frio · Boost de HVAC", trigger: "Temp > 22 °C", action: "Aumentar vazão do CRAC + alertar operação", state: "armada" },
];

function Automation() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">Automação Predial Inteligente</Badge>
        <h1 className="mt-3 text-2xl font-bold">Automação</h1>
        <p className="mt-1 text-sm text-muted-foreground">Este menu foi zerado. Para popular a automação, edite os arrays do arquivo desta rota.</p>
      </div>

      <Card className="border-dashed">
        <div className="flex flex-col gap-4 p-6">
          <Badge variant="outline">Área vazia</Badge>
          <div>
            <h2 className="text-xl font-bold">Nenhum item cadastrado neste menu</h2>
            <p className="mt-2 text-sm text-muted-foreground">Use os arrays `sensors`, `groups` e `automations` para inserir dispositivos, agendamentos e regras.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">1. `sensors`</span>
              <p className="mt-1 text-muted-foreground">Adicione sensores ambientais e seus valores de telemetria.</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
              <span className="font-semibold text-foreground">2. `groups`</span>
              <p className="mt-1 text-muted-foreground">Defina blocos de automação, como iluminação, alarmes, energia e portões.</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-sm md:col-span-2">
              <span className="font-semibold text-foreground">3. `automations`</span>
              <p className="mt-1 text-muted-foreground">Cadastre gatilhos, ações e estados para as regras de automação do prédio.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
