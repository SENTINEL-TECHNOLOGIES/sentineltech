import { createFileRoute } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/explore/case-studies")({
  head: () => ({ meta: [{ title: "Case Studies — Sentinel" }] }),
  component: Cases,
});

const cases = [
  {
    client: "FinTech Corp", industry: "Financial Services",
    challenge: "Rapidly scaling fintech with 11 compliance frameworks faced 1,200+ daily security alerts and a 14-person internal SOC that couldn't keep up.",
    solution: "Migrated to Sentinel MSSP with SIEM integration, automated tier-1 triage, and 24/7 analyst coverage from our São Paulo and Frankfurt SOCs.",
    results: [{ k: "-73%", v: "Security incidents" }, { k: "-58%", v: "MTTR" }, { k: "$2.1M", v: "Annual savings" }],
  },
  {
    client: "LogiPort SA", industry: "Logistics & Transport",
    challenge: "Operator of 42 km² of port infrastructure needed unified physical + cyber security, with zero downtime tolerance for cargo operations.",
    solution: "Deployed AI-powered perimeter detection, integrated CCTV with SIEM, hardened OT networks with zero-trust segmentation.",
    results: [{ k: "99.99%", v: "Port uptime" }, { k: "0", v: "Breaches in 24 mo" }, { k: "42 km²", v: "Coverage" }],
  },
  {
    client: "MediCore Health", industry: "Healthcare",
    challenge: "Hospital network with 38 sites needed HIPAA-compliant cloud posture and protection from rising ransomware in healthcare.",
    solution: "Implemented CSPM across Azure + AWS, deployed EDR on 6,400 endpoints, ran tabletop ransomware exercises with executives.",
    results: [{ k: "$4.2M", v: "Breach cost avoided" }, { k: "-91%", v: "Audit findings" }, { k: "100%", v: "HIPAA passing" }],
  },
  {
    client: "EnerGrid Power", industry: "Energy & Utilities",
    challenge: "Critical infrastructure operator targeted by nation-state actors; legacy ICS/SCADA had no visibility or segmentation.",
    solution: "OT-aware monitoring with Sentinel ICS specialists, micro-segmentation, deception technology in substations.",
    results: [{ k: "12", v: "APT campaigns detected" }, { k: "100%", v: "OT visibility" }, { k: "<5 min", v: "Detection time" }],
  },
];

function Cases() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">Success Stories</Badge>
        <h1 className="mt-3 text-3xl font-bold">Real outcomes from real customers</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Industries trust Sentinel because we ship measurable results — not slideware.</p>
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
