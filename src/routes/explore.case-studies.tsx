import { createFileRoute } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/explore/case-studies")({
  head: () => ({ meta: [{ title: "Case Studies — Sentinel" }] }),
  component: Cases,
});

const cases = [
  {
    client: "LogiPort SA", industry: "Logistics & Ports",
    challenge: "Operator of 42 km² of port infrastructure with 6 access gates, vulnerable perimeter and reactive surveillance from a small in-house team.",
    solution: "Deployed 312 AI-enabled cameras, thermal perimeter detection, biometric access at all gates, and centralized 24/7 monitoring from our SOC.",
    results: [{ k: "42 km²", v: "Perimeter covered" }, { k: "-82%", v: "Unauthorized entries" }, { k: "3m", v: "Avg response time" }],
  },
  {
    client: "MetroRetail Group", industry: "Retail · 240 stores",
    challenge: "Shrinkage and after-hours intrusions across a national footprint with no centralized visibility or standardized response.",
    solution: "Unified CCTV across all stores, behavioral analytics for theft patterns, and remote monitoring with police-dispatch coordination after hours.",
    results: [{ k: "-68%", v: "Shrinkage incidents" }, { k: "240", v: "Sites monitored" }, { k: "$3.4M", v: "Annual loss avoided" }],
  },
  {
    client: "MediCore Health", industry: "Healthcare · 38 sites",
    challenge: "Hospital network needed compliant visitor flow, restricted-zone enforcement and audit-grade access logs across pharmacy and pediatric wings.",
    solution: "Biometric + visitor management, AI cameras in restricted zones, integrated with HR for automatic provisioning and offboarding.",
    results: [{ k: "100%", v: "Audit-ready logs" }, { k: "-91%", v: "Incident reports" }, { k: "6,400", v: "Users managed" }],
  },
  {
    client: "EnerCore Utilities", industry: "Energy & Utilities",
    challenge: "Unmanned substations across remote regions targeted by copper theft and vandalism, with patrol-based response too slow to act.",
    solution: "Thermal AI cameras, perimeter laser detection, smart automation for lighting/sirens, and SOC-driven verified-response dispatch.",
    results: [{ k: "100%", v: "Substations monitored" }, { k: "<2 min", v: "Detection to alert" }, { k: "-94%", v: "Theft events" }],
  },
];

function Cases() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">Success Stories</Badge>
        <h1 className="mt-3 text-3xl font-bold">Real outcomes from real facilities</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Enterprises trust Sentinel because we ship measurable physical security results — not slideware.</p>
      </div>

      <div className="space-y-5">
        {cases.map((c) => (
          <Card key={c.client} className="overflow-hidden">
            <div className="grid gap-6 md:grid-cols-[1fr_320px]">
              <div className="p-7">
                <div className="flex items-center gap-3"><h3 className="text-xl font-bold">{c.client}</h3><Badge variant="info">{c.industry}</Badge></div>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <Section label="Challenge" body={c.challenge} />
                  <Section label="Solution" body={c.solution} />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-primary">Results</div>
                    <div className="mt-2 space-y-2">
                      {c.results.map((r) => (
                        <div key={r.v}><div className="font-mono text-lg font-bold text-gradient-blue">{r.k}</div><div className="text-[11px] text-muted-foreground">{r.v}</div></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative hidden border-l border-border bg-gradient-to-br from-primary/15 via-card to-cyan/10 p-7 md:flex md:flex-col md:justify-between">
                <div className="absolute inset-0 bg-grid-sm opacity-30" />
                <div className="relative">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Industry</div>
                  <div className="mt-1 text-lg font-bold">{c.industry}</div>
                </div>
                <a className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Read full case study <ArrowRight className="h-3.5 w-3.5" /></a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-primary">{label}</div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
