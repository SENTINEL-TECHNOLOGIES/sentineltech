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
        <p className="mt-1 text-sm text-muted-foreground">Iluminação, portas, portões, alarmes, energia e controles ambientais em todas as instalações.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Dispositivos Conectados" value="1.570" delta="todos subsistemas" deltaPositive icon={<Zap className="h-5 w-5" />} accent="primary" />
        <KpiCard label="Automações Ativas" value="48" delta="14 agendamentos" icon={<Bell className="h-5 w-5" />} accent="cyan" />
        <KpiCard label="Energia Hoje" value="1,24 MWh" delta="-8% vs meta" deltaPositive icon={<Zap className="h-5 w-5" />} accent="success" />
        <KpiCard label="Alertas Ambientais" value="1" delta="qualidade do ar matriz" icon={<Wind className="h-5 w-5" />} accent="warning" />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {groups.map((g) => (
          <Card key={g.name} className="p-5">
            <div className="flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-gradient-to-br from-primary/20 to-cyan/10 text-cyan">{g.icon}</div>
              <Badge variant="success">Online</Badge>
            </div>
            <div className="mt-4 text-sm font-semibold">{g.name}</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div><div className="text-muted-foreground">Dispositivos</div><div className="font-mono text-base font-bold">{g.devices}</div></div>
              <div><div className="text-muted-foreground">Ativos</div><div className="font-mono text-base font-bold text-cyan">{g.on}</div></div>
              <div><div className="text-muted-foreground">Agendamentos</div><div className="font-mono text-base font-bold">{g.schedules}</div></div>
              <div><div className="text-muted-foreground">Energia</div><div className="font-mono text-base font-bold">{g.energy}</div></div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Regras de automação" description="Gatilhos e ações orquestradas" action={<Badge variant="success">Todas armadas</Badge>} />
          <div className="divide-y divide-border">
            {automations.map((a) => (
              <div key={a.name} className="grid grid-cols-1 gap-3 p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="text-sm font-medium">{a.name}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-cyan">QUANDO</span>{a.trigger}
                    <span className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-cyan">FAZER</span>{a.action}
                  </div>
                </div>
                <Badge variant="success">{a.state.toUpperCase()}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Sensores ambientais" description="Telemetria em tempo real" />
          <div className="divide-y divide-border">
            {sensors.map((s) => (
              <div key={s.name} className="flex items-center gap-3 p-4">
                <div className={`grid h-8 w-8 place-items-center rounded-lg border border-border ${s.state === "warn" ? "text-warning" : "text-cyan"}`}>{s.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{s.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">{s.value}</div>
                </div>
                {s.state === "warn" ? <Badge variant="warning">Atenção</Badge> : <Badge variant="success">OK</Badge>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
