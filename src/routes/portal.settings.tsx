import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Badge } from "@/components/ui-bits";

export const Route = createFileRoute("/portal/settings")({
  head: () => ({ meta: [{ title: "Settings — Sentinel" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Organization" />
          <div className="space-y-4 p-5">
            {[
              { l: "Company name", v: "Acme Corporation" },
              { l: "Tax ID", v: "00.000.000/0001-00" },
              { l: "Primary contact", v: "ops@acme.io" },
              { l: "Region", v: "Americas" },
            ].map((r) => (
              <div key={r.l} className="grid grid-cols-[180px_1fr] items-center gap-3">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{r.l}</div>
                <input defaultValue={r.v} className="rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Security preferences" />
          <div className="space-y-4 p-5">
            {[
              { l: "Enforce MFA", v: true },
              { l: "Single Sign-On (SAML)", v: true },
              { l: "IP allow-list", v: false },
              { l: "Session recording", v: true },
              { l: "Alerts to mobile", v: true },
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
          <CardHeader title="Notifications" description="Where alerts are delivered" />
          <div className="space-y-3 p-5 text-sm">
            {["Email — ops@acme.io", "Slack — #sentinel-alerts", "PagerDuty — Primary on-call", "Webhook — incidents.acme.io/in"].map((c) => (
              <div key={c} className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"><span className="font-mono text-xs">{c}</span><Badge variant="success">Active</Badge></div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="API & Integrations" />
          <div className="space-y-3 p-5">
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">API Key</div>
              <div className="mt-1 font-mono text-xs">sk_live_•••••••••••••••••• 8c4f</div>
            </div>
            {["Splunk", "Datadog", "ServiceNow", "Microsoft Sentinel"].map((c) => (
              <div key={c} className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"><span className="text-sm font-medium">{c}</span><Badge variant="info">Connected</Badge></div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
