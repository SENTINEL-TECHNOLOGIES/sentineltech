import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Badge } from "@/components/ui-bits";

export const Route = createFileRoute("/portal/settings")({
  head: () => ({ meta: [{ title: "Configurações — Sentinel" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Organização" />
          <div className="space-y-4 p-5">
            {[
              { l: "Razão social", v: "Acme Corporation Ltda." },
              { l: "CNPJ", v: "00.000.000/0001-00" },
              { l: "Contato principal", v: "operacoes@acme.com.br" },
              { l: "Região", v: "Brasil" },
            ].map((r) => (
              <div key={r.l} className="grid grid-cols-[180px_1fr] items-center gap-3">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{r.l}</div>
                <input defaultValue={r.v} className="rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Preferências de segurança" />
          <div className="space-y-4 p-5">
            {[
              { l: "Exigir MFA", v: true },
              { l: "Single Sign-On (SAML)", v: true },
              { l: "Lista de IPs permitidos", v: false },
              { l: "Gravação de sessão", v: true },
              { l: "Alertas no celular", v: true },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between">
                <div className="text-sm">{r.l}</div>
                <div className={`flex h-6 w-11 items-center rounded-full transition ${r.v ? "bg-primary" : "bg-secondary"}`}>
                  <div className={`h-5 w-5 rounded-full bg-foreground transition ${r.v ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Notificações" description="Para onde os alertas são enviados" />
          <div className="space-y-3 p-5 text-sm">
            {["E-mail — operacoes@acme.com.br", "Slack — #sentinel-alertas", "PagerDuty — Plantão Principal", "Webhook — incidentes.acme.com.br/in"].map((c) => (
              <div key={c} className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"><span className="font-mono text-xs">{c}</span><Badge variant="success">Ativo</Badge></div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="API e Integrações" />
          <div className="space-y-3 p-5">
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Chave da API</div>
              <div className="mt-1 font-mono text-xs">sk_live_•••••••••••••••••• 8c4f</div>
            </div>
            {["Splunk", "Datadog", "ServiceNow", "Microsoft Sentinel"].map((c) => (
              <div key={c} className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"><span className="text-sm font-medium">{c}</span><Badge variant="info">Conectado</Badge></div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
