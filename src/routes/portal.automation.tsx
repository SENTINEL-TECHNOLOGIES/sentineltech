import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, KpiCard, Badge } from "@/components/ui-bits";
import { Lightbulb, DoorOpen, Bell, Zap, Thermometer, Droplets, Wind } from "lucide-react";

export const Route = createFileRoute("/portal/automation")({
  head: () => ({ meta: [{ title: "Automação Predial — Sentinel" }] }),
  component: Automation,
});

const sensors = [
  {
    icon: <Thermometer className="h-4 w-4" />,
    name: "Temperatura · DC-1 Corredor Frio",
    value: "18,4 °C",
    state: "ok",
  },
  {
    icon: <Droplets className="h-4 w-4" />,
    name: "Umidade · Sala de Servidores B",
    value: "42 %",
    state: "ok",
  },
  {
    icon: <Wind className="h-4 w-4" />,
    name: "Qualidade do Ar · Andar 7 Matriz",
    value: "94 AQI",
    state: "warn",
  },
  {
    icon: <Thermometer className="h-4 w-4" />,
    name: "Temperatura · Planta Linha 2",
    value: "27,1 °C",
    state: "ok",
  },
  {
    icon: <Droplets className="h-4 w-4" />,
    name: "Vazamento d'água · Subsolo",
    value: "Seco",
    state: "ok",
  },
  {
    icon: <Wind className="h-4 w-4" />,
    name: "Fumaça · Doca do Galpão",
    value: "Limpo",
    state: "ok",
  },
];

const groups = [
  {
    icon: <Lightbulb className="h-5 w-5" />,
    name: "Automação de Iluminação",
    devices: 1242,
    on: 318,
    schedules: 14,
    energy: "62 kWh",
  },
  {
    icon: <DoorOpen className="h-5 w-5" />,
    name: "Portões e Portas",
    devices: 184,
    on: 22,
    schedules: 9,
    energy: "—",
  },
  {
    icon: <Bell className="h-5 w-5" />,
    name: "Sistemas de Alarme",
    devices: 96,
    on: 96,
    schedules: 4,
    energy: "—",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    name: "Monitoramento de Energia",
    devices: 48,
    on: 48,
    schedules: 6,
    energy: "1,2 MWh / dia",
  },
];

const automations = [
  {
    name: "Pôr do sol · Liga floodlights de perímetro",
    trigger: "Astronômico (pôr do sol)",
    action: "Ligar refletores do perímetro",
    state: "armada",
  },
  {
    name: "Fora do expediente · Trancar portas internas",
    trigger: "20:00 dias úteis",
    action: "Trancar 84 portas internas + armar zonas",
    state: "armada",
  },
  {
    name: "Chegada de visitante · Alerta de recepção",
    trigger: "Leitura no portão do lobby",
    action: "Notificar recepção + abrir catraca",
    state: "armada",
  },
  {
    name: "Alarme de incêndio · Liberar saídas",
    trigger: "Fumaça ou acionador manual",
    action: "Liberar todas as rotas de fuga + abrir portões",
    state: "armada",
  },
  {
    name: "Térmica corredor frio · Boost de HVAC",
    trigger: "Temp > 22 °C",
    action: "Aumentar vazão do CRAC + alertar operação",
    state: "armada",
  },
];

function Automation() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="info">Automação Predial Inteligente</Badge>
          <h1 className="mt-3 text-2xl font-bold">Automação</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sensores, grupos e regras fictícias para ilustrar o painel.
          </p>
        </div>
        <Badge variant="outline">Simulação sem comandos reais</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Grupos monitorados"
          value={String(groups.length)}
          icon={<Lightbulb className="h-5 w-5" />}
        />
        <KpiCard
          label="Sensores de exemplo"
          value={String(sensors.length)}
          icon={<Thermometer className="h-5 w-5" />}
          accent="cyan"
        />
        <KpiCard
          label="Regras simuladas"
          value={String(automations.length)}
          delta="sem execução real"
          icon={<Zap className="h-5 w-5" />}
          accent="success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Leituras ambientais" description="Valores fictícios de sensores" />
          <div className="divide-y divide-border">
            {sensors.map((sensor) => (
              <div key={sensor.name} className="flex items-center gap-3 p-4">
                <span className="text-primary">{sensor.icon}</span>
                <span className="min-w-0 flex-1 text-sm">{sensor.name}</span>
                <span className="font-mono text-sm">{sensor.value}</span>
                <Badge variant={sensor.state === "ok" ? "success" : "warning"}>
                  {sensor.state === "ok" ? "Normal" : "Atenção"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Grupos de automação" description="Inventário demonstrativo" />
          <div className="divide-y divide-border">
            {groups.map((group) => (
              <div key={group.name} className="flex items-center gap-3 p-4">
                <span className="text-primary">{group.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{group.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {group.devices} dispositivos · {group.schedules} agendamentos
                  </div>
                </div>
                <Badge variant="info">{group.on} ativos</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Regras de automação"
          description="Exemplos sem ligação a equipamentos reais"
        />
        <div className="divide-y divide-border">
          {automations.map((automation) => (
            <div key={automation.name} className="flex flex-wrap items-start gap-3 p-4">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{automation.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Gatilho: {automation.trigger} · Ação: {automation.action}
                </div>
              </div>
              <Badge variant="success">{automation.state}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
