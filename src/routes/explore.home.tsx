import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardHeader, Badge } from "@/components/ui-bits";
import { Activity, Clock, Award, Lock, Users, Zap, ArrowRight, Quote, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/explore/home")({
  head: () => ({ meta: [{ title: "Explore Sentinel" }] }),
  component: Home,
});

const benefits = [
  { icon: <Activity className="h-5 w-5" />, title: "99.97% Uptime SLA", desc: "Contractually guaranteed availability" },
  { icon: <Clock className="h-5 w-5" />, title: "24/7 SOC Operations", desc: "Human analysts, never just bots" },
  { icon: <Award className="h-5 w-5" />, title: "ISO 27001 Certified", desc: "International security standard" },
  { icon: <Lock className="h-5 w-5" />, title: "Zero-Trust Architecture", desc: "Never trust, always verify" },
  { icon: <Users className="h-5 w-5" />, title: "Dedicated Account Manager", desc: "A named expert on your side" },
  { icon: <Zap className="h-5 w-5" />, title: "30-min Incident Response", desc: "SLA-backed response guarantee" },
];

const featured = [
  { title: "Managed Security (MSSP)", desc: "24/7 threat monitoring, incident response and compliance management.", tag: "MSSP" },
  { title: "Network Infrastructure", desc: "Enterprise LAN/WAN design, SD-WAN deployment and firewall management.", tag: "Network" },
  { title: "Cloud Monitoring & Security", desc: "Multi-cloud posture management, CSPM, workload protection.", tag: "Cloud" },
];

const stories = [
  { client: "FinTech Corp", industry: "Financial Services", metric: "-73%", label: "Security incidents", desc: "Deployed MSSP + SIEM integration, eliminating a 14-person internal team cost." },
  { client: "LogiPort SA", industry: "Logistics & Transport", metric: "99.99%", label: "Port uptime", desc: "Secured 42 km² of critical port infrastructure with AI perimeter detection." },
  { client: "MediCore Health", industry: "Healthcare", metric: "$4.2M", label: "Breach cost avoided", desc: "HIPAA-compliant cloud posture reduced audit findings by 91%." },
];

const testimonials = [
  { name: "Sarah Chen", role: "CISO, FinTech Corp", quote: "Sentinel cut our MTTR in half within the first quarter. Their SOC team feels like an extension of our own." },
  { name: "Diego Almeida", role: "CTO, LogiPort", quote: "From edge cameras to cloud workloads — one team, one pane of glass. No vendor finger-pointing." },
];

function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-8">
        <div className="absolute inset-0 bg-grid-sm opacity-30" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
        <div className="relative max-w-2xl">
          <Badge variant="info">● Enterprise Cybersecurity</Badge>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
            Enterprise-Grade Cybersecurity for <span className="text-gradient-blue">Modern Infrastructure.</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            From AI-powered CCTV to 24/7 SOC operations, Sentinel protects the infrastructure that powers your business — at any scale, in any sector.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/explore/meeting" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
              Schedule Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/explore/case-studies" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm font-semibold hover:bg-accent">View Our Work</Link>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            {["ISO 27001", "SOC 2 Type II", "GDPR", "24/7 SOC"].map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-success" />{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured services */}
      <section>
        <div className="mb-3 text-xs font-mono uppercase tracking-[0.3em] text-primary">What we do</div>
        <div className="space-y-3">
          {featured.map((s) => (
            <Card key={s.title} className="flex items-center gap-5 p-5 transition hover:border-primary/50">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-secondary/50 text-cyan"><ShieldCheck className="h-6 w-6" /></div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{s.title}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">{s.desc}</div>
              </div>
              <Link to="/explore/services" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline md:inline-flex">Learn More <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Sentinel */}
      <section>
        <div className="mb-3 text-xs font-mono uppercase tracking-[0.3em] text-primary">Why Sentinel</div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Card key={b.title} className={`p-5 transition hover:border-primary/50 ${i === 0 ? "border-primary/50 ring-1 ring-primary/20" : ""}`}>
              <div className="text-cyan">{b.icon}</div>
              <div className="mt-4 font-semibold">{b.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{b.desc}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Success stories */}
      <section>
        <div className="mb-3 text-xs font-mono uppercase tracking-[0.3em] text-primary">Success stories</div>
        <h2 className="mb-5 text-2xl font-bold">Results that speak for themselves</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {stories.map((s) => (
            <Card key={s.client} className="p-5">
              <div className="font-semibold">{s.client}</div>
              <Badge variant="info">{s.industry}</Badge>
              <div className="mt-4 font-mono text-3xl font-bold text-gradient-blue">{s.metric}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              <Link to="/explore/case-studies" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Read Case Study <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <Card key={t.name} className="p-6">
            <Quote className="h-6 w-6 text-primary/60" />
            <p className="mt-3 text-sm leading-relaxed">"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-cyan text-xs font-bold text-primary-foreground">{t.name.split(" ").map((n) => n[0]).join("")}</div>
              <div><div className="text-sm font-semibold">{t.name}</div><div className="text-xs text-muted-foreground">{t.role}</div></div>
            </div>
          </Card>
        ))}
      </section>

      {/* Industry stats */}
      <Card className="grid gap-6 p-6 md:grid-cols-4">
        {[
          { v: "500+", l: "Enterprise clients" },
          { v: "42M+", l: "Threats blocked / day" },
          { v: "180+", l: "Security analysts" },
          { v: "12", l: "Global SOCs" },
        ].map((s) => (
          <div key={s.l}>
            <div className="font-mono text-3xl font-bold text-gradient-blue">{s.v}</div>
            <div className="text-xs text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}
