import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { Camera, Fingerprint, Building2, Globe, Lightbulb, Layers, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/explore/services")({
  head: () => ({ meta: [{ title: "Services — Sentinel" }] }),
  component: Services,
});

const services = [
  {
    icon: <Camera className="h-6 w-6" />, title: "AI CCTV Solutions",
    desc: "Intelligent surveillance cameras with on-device and on-prem AI analytics.",
    benefits: ["Object & human detection", "License plate recognition", "Behavior & loitering analytics"],
    features: ["4K · low-light · thermal", "Edge AI inference", "Existing-CCTV upgrade kits"],
    install: ["Site survey (1 day)", "Cabling & camera install (2-5 days)", "VMS + AI calibration (1 day)"],
    value: "Stop incidents before they escalate. Cut investigation time by 70%.",
  },
  {
    icon: <Fingerprint className="h-6 w-6" />, title: "Biometric Access Control",
    desc: "Face, fingerprint, card, mobile and visitor passes — unified across every door.",
    benefits: ["Multi-factor at the door", "Visitor & contractor flows", "Centralized user management"],
    features: ["Anti-spoofing biometrics", "Mustering & evacuation", "ERP / HR integration"],
    install: ["Door audit (1 day)", "Controllers & readers (3-7 days)", "User onboarding (ongoing)"],
    value: "Know who is in your building right now. End shared badges and tailgating.",
  },
  {
    icon: <Building2 className="h-6 w-6" />, title: "Smart Building Automation",
    desc: "Lighting, gates, alarms, HVAC and environmental sensors orchestrated as one.",
    benefits: ["Energy savings 15-30%", "Rule-based automations", "Fire & life-safety integration"],
    features: ["BACnet / Modbus / KNX", "Mobile control app", "Open API integrations"],
    install: ["Building scan & BIM map", "Hub & sensor install (5-10 days)", "Rule design workshop"],
    value: "Lower opex while raising comfort and safety. One pane of glass for facilities.",
  },
  {
    icon: <Globe className="h-6 w-6" />, title: "Remote Monitoring 24/7",
    desc: "Trained operators watch your facilities around the clock from our SOC.",
    benefits: ["3-min avg response", "Live verification of alarms", "Police & dispatch coordination"],
    features: ["Bilingual operators", "Video verification", "Monthly executive report"],
    install: ["Site & camera onboarding", "Runbook & escalation design", "Go-live within 14 days"],
    value: "Replace passive cameras with active prevention. SLA-backed peace of mind.",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />, title: "Security Consulting",
    desc: "Risk assessment, master planning and vendor-neutral design for your estate.",
    benefits: ["Threat & vulnerability assessment", "Master security plan", "Audit & certification support"],
    features: ["ISO / ONVIF / NDAA aligned", "Insurance-friendly designs", "Vendor-neutral specs"],
    install: ["Stakeholder workshops", "Site assessment & report", "Roadmap delivered in 4-6 weeks"],
    value: "Spend security budget where it actually reduces risk — backed by data.",
  },
  {
    icon: <Layers className="h-6 w-6" />, title: "Integrated Security Projects",
    desc: "Turnkey delivery for new sites: CCTV, access, automation, SOC — one contract.",
    benefits: ["Single accountable partner", "Predictable budget", "Faster time to operations"],
    features: ["Civil + low voltage + IT", "OEM partnerships", "Lifecycle maintenance plans"],
    install: ["Design-build-operate model", "Phased commissioning", "5-year service plan available"],
    value: "Open a new facility fully secured from day one. No vendor finger-pointing.",
  },
];

function Services() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">Service Catalog</Badge>
        <h1 className="mt-3 text-3xl font-bold">Physical security, end to end</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Six integrated practices, one accountable team. Designed, installed and operated by Sentinel.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s) => (
          <Card key={s.title} className="flex h-full flex-col p-6 transition hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-gradient-to-br from-primary/20 to-cyan/10 text-cyan">{s.icon}</div>
            <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>

            <Section title="Benefits" items={s.benefits} />
            <Section title="Features" items={s.features} />
            <Section title="Installation" items={s.install} />

            <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 p-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-primary">Business value</div>
              <p className="mt-1 text-xs text-foreground/90">{s.value}</p>
            </div>

            <Link to="/explore/proposal" className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-primary/50 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10">Request Proposal <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Card>
        ))}
      </div>

      {/* Engagement packages */}
      <div className="pt-6 text-center">
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Engagement models</div>
        <h2 className="mt-2 text-3xl font-bold">Built for your scale</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          { name: "Single Site", price: "From $4,900", popular: false, items: ["Up to 32 cameras", "Up to 12 doors", "8×5 monitoring", "Quarterly review", "Local field support"], cta: "Get Started" },
          { name: "Multi-Site", price: "From $14,900", popular: true, items: ["Up to 250 cameras", "Up to 80 doors", "24/7 monitoring", "Dedicated operator pool", "Monthly review", "Priority field dispatch"], cta: "Most Popular" },
          { name: "Enterprise Program", price: "Custom", popular: false, items: ["Unlimited cameras & doors", "24/7 monitoring + dispatch", "Master security plan", "Named account team", "On-site engineer (option)", "Custom integrations"], cta: "Contact Sales" },
        ].map((p) => (
          <Card key={p.name} className={`relative p-7 ${p.popular ? "border-primary/60 ring-1 ring-primary/30" : ""}`}>
            {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-lg shadow-primary/40">Most Popular</div>}
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{p.name}</div>
            <div className="mt-3 font-mono text-3xl font-bold">{p.price}{p.price !== "Custom" && <span className="text-base font-normal text-muted-foreground"> / mo</span>}</div>
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

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="mt-1.5 space-y-1.5">
        {items.map((b) => (
          <div key={b} className="flex items-start gap-2 text-xs"><Check className="mt-0.5 h-3 w-3 shrink-0 text-success" />{b}</div>
        ))}
      </div>
    </div>
  );
}
