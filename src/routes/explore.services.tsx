import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { Shield, Network, Activity, Lightbulb, Headset, HardDrive, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/explore/services")({
  head: () => ({ meta: [{ title: "Services — Sentinel" }] }),
  component: Services,
});

const services = [
  { icon: <Shield className="h-6 w-6" />, title: "Cybersecurity", desc: "End-to-end threat protection — MSSP, MDR, vCISO and incident response.", benefits: ["24/7 SOC monitoring", "Threat intel feeds", "Incident response SLA"], tech: ["Microsoft Sentinel", "CrowdStrike", "Splunk", "Palo Alto"] },
  { icon: <Network className="h-6 w-6" />, title: "Network Infrastructure", desc: "Design, build and operate enterprise-grade LAN, WAN and SD-WAN networks.", benefits: ["Zero-touch provisioning", "Multi-site visibility", "QoS engineering"], tech: ["Cisco Meraki", "Fortinet", "Aruba", "Juniper"] },
  { icon: <Activity className="h-6 w-6" />, title: "Monitoring Solutions", desc: "Full-stack observability across infrastructure, apps and security signals.", benefits: ["Unified dashboards", "Predictive alerting", "AIOps correlation"], tech: ["Datadog", "Grafana", "PRTG", "Zabbix"] },
  { icon: <Lightbulb className="h-6 w-6" />, title: "IT Consulting", desc: "Strategy, architecture and transformation advisory for security & infra.", benefits: ["vCISO services", "Audit readiness", "Cloud strategy"], tech: ["NIST CSF", "ISO 27001", "SOC 2", "CIS Controls"] },
  { icon: <Headset className="h-6 w-6" />, title: "Technical Support", desc: "Tier 1-3 managed support with dedicated engineers and named escalation paths.", benefits: ["30-min response", "Multilingual desk", "On-site dispatch"], tech: ["ServiceNow", "Jira", "Freshservice", "ITIL v4"] },
  { icon: <HardDrive className="h-6 w-6" />, title: "Backup & Recovery", desc: "Immutable backups, DR runbooks and tested recovery — across cloud and on-prem.", benefits: ["3-2-1-1-0 strategy", "Ransomware-proof", "Quarterly DR drills"], tech: ["Veeam", "Rubrik", "AWS Backup", "Azure Site Recovery"] },
];

function Services() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">Service Catalog</Badge>
        <h1 className="mt-3 text-3xl font-bold">Solutions built for the modern enterprise</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Six core practices, one accountable team. Mix and match into a managed program tailored to your risk profile.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s) => (
          <Card key={s.title} className="flex h-full flex-col p-6 transition hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-gradient-to-br from-primary/20 to-cyan/10 text-cyan">{s.icon}</div>
            <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            <div className="mt-5 space-y-1.5">
              {s.benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm"><Check className="h-3.5 w-3.5 text-success" />{b}</div>
              ))}
            </div>
            <div className="mt-5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Technologies</div>
              <div className="mt-2 flex flex-wrap gap-1.5">{s.tech.map((t) => <span key={t} className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[10px] font-mono">{t}</span>)}</div>
            </div>
            <Link to="/explore/proposal" className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-primary/50 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10">Request Proposal <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Card>
        ))}
      </div>

      {/* Pricing */}
      <div className="pt-6 text-center">
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Pricing packages</div>
        <h2 className="mt-2 text-3xl font-bold">Simple, transparent pricing</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          { name: "Starter", price: "$1,499", popular: false, items: ["Up to 50 endpoints", "8×5 SOC coverage", "Email alerts", "Monthly reports", "1 account manager"], cta: "Get Started" },
          { name: "Professional", price: "$3,999", popular: true, items: ["Up to 500 endpoints", "24/7 SOC coverage", "SIEM integration", "Weekly reports + dashboard", "Dedicated analyst", "Incident response SLA"], cta: "Most Popular" },
          { name: "Enterprise", price: "Custom", popular: false, items: ["Unlimited endpoints", "24/7 SOC + red team", "Custom SIEM + SOAR", "Real-time dashboard", "Named account executive", "30-min response SLA", "On-site assessment"], cta: "Contact Sales" },
        ].map((p) => (
          <Card key={p.name} className={`relative p-7 ${p.popular ? "border-primary/60 ring-1 ring-primary/30" : ""}`}>
            {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-lg shadow-primary/40">Most Popular</div>}
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{p.name}</div>
            <div className="mt-3 font-mono text-4xl font-bold">{p.price}{p.price !== "Custom" && <span className="text-base font-normal text-muted-foreground">/mo</span>}</div>
            <div className="mt-6 space-y-2.5">
              {p.items.map((i) => <div key={i} className="flex items-center gap-2 text-sm"><Check className="h-3.5 w-3.5 text-cyan" />{i}</div>)}
            </div>
            <Link to="/explore/proposal" className={`mt-8 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${p.popular ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90" : "border border-primary/50 text-primary hover:bg-primary/10"}`}>{p.cta}</Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
