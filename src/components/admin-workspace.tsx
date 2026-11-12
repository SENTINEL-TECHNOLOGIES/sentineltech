import { AlertCircle, LockKeyhole } from "lucide-react";
import { Badge, Card, CardHeader } from "@/components/ui-bits";

const administrativeDemoData: Record<
  string,
  Array<{ name: string; detail: string; status: string }>
> = {
  Empresas: [
    { name: "Aurora Logística Demonstrativa", detail: "São Paulo, SP · 3 locais", status: "Ativa" },
    {
      name: "Horizonte Comércio Fictício",
      detail: "Rio de Janeiro, RJ · 2 locais",
      status: "Ativa",
    },
    {
      name: "Nuvem Azul Serviços de Exemplo",
      detail: "Curitiba, PR · 1 local",
      status: "Em implantação",
    },
  ],
  Usuários: [
    { name: "Equipe Sentinel", detail: "empresa@sentinel-demo.com · Corporativo", status: "Ativo" },
    { name: "Visitante", detail: "cliente@sentinel-demo.com · Cliente", status: "Ativo" },
    {
      name: "Admin Sentinel Demo",
      detail: "admin@sentinel-demo.com · Administrativo",
      status: "Ativo",
    },
  ],
  "Logs e Auditoria": [
    {
      name: "Login demonstrativo",
      detail: "empresa@sentinel-demo.com · Hoje, 09:14",
      status: "Sucesso",
    },
    {
      name: "Visualização de relatório",
      detail: "cliente@sentinel-demo.com · Hoje, 09:08",
      status: "Sucesso",
    },
    {
      name: "Revisão de permissões de exemplo",
      detail: "admin@sentinel-demo.com · Ontem, 17:42",
      status: "Simulado",
    },
  ],
  "Câmeras e Dispositivos": [
    { name: "CAM-DEMO-001 · Recepção", detail: "Aurora Logística · São Paulo", status: "Online" },
    { name: "CAM-DEMO-002 · Doca", detail: "Aurora Logística · Guarulhos", status: "Online" },
    {
      name: "BIO-DEMO-001 · Entrada",
      detail: "Horizonte Comércio · Rio de Janeiro",
      status: "Manutenção",
    },
  ],
  Configurações: [
    { name: "Retenção de eventos", detail: "Parâmetro demonstrativo", status: "30 dias" },
    { name: "Notificações por e-mail", detail: "Serviço não conectado", status: "Simulação" },
    { name: "Integrações externas", detail: "Nenhuma integração ativa", status: "Desativadas" },
  ],
};

export function AdminWorkspace({ title, description }: { title: string; description: string }) {
  const rows = administrativeDemoData[title] ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Badge variant="info">Área administrativa</Badge>
      </div>
      <p className="-mt-5 text-sm text-muted-foreground">{description}</p>
      <Card>
        <CardHeader
          title="Registros de demonstração"
          description="Conteúdo fictício para apresentar os módulos administrativos"
          action={<LockKeyhole className="h-4 w-4 text-primary" />}
        />
        <div className="divide-y divide-border">
          {rows.map((row) => (
            <div key={row.name} className="flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{row.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{row.detail}</div>
              </div>
              <Badge
                variant={
                  row.status === "Ativo" ||
                  row.status === "Ativa" ||
                  row.status === "Online" ||
                  row.status === "Sucesso"
                    ? "success"
                    : "info"
                }
              >
                {row.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
      <div className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
        <p className="text-xs text-muted-foreground">
          Estes registros são exemplos estáticos da interface. As operações administrativas ainda
          não estão conectadas ao banco de dados.
        </p>
      </div>
    </div>
  );
}
