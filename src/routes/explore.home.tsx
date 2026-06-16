import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { Camera, Fingerprint, Building2, Globe, Lightbulb, ShieldCheck, ArrowRight, Quote, Clock, Award, Users, MapPin } from "lucide-react";

export const Route = createFileRoute("/explore/home")({
  head: () => ({ meta: [{ title: "Explore Sentinel — Physical Security Technology" }] }),
  component: Home,
});

const benefits = [
  { icon: <Clock className="h-5 w-5" />, title: "24/7 Monitoring", desc: "Trained operators watch every camera, every shift" },
  { icon: <Camera className="h-5 w-5" />, title: "AI-Powered CCTV", desc: "Detection models trained on real incident data" },
  { icon: <Fingerprint className="h-5 w-5" />, title: "Biometric Access", desc: "Face, fingerprint and multi-factor at the door" },
  { icon: <Building2 className="h-5 w-5" />, title: "Smart Buildings", desc: "Automation that ties security to operations" },
  { icon: <Users className="h-5 w-5" />, title: "Dedicated Account Team", desc: "A named expert assigned to your estate" },
  { icon: <MapPin className="h-5 w-5" />, title: "Nationwide Field Force", desc: "On-site response, installation and maintenance" },
];

const featured = [
  { title: "AI CCTV Solutions", desc: "Intelligent cameras that recognize people, vehicles, objects and behaviors in real time.", icon: <Camera className="h-6 w-6" /> },
  { title: "Biometric Access Control", desc: "Face, fingerprint, card and visitor pass — unified across every door, every site.", icon: <Fingerprint className="h-6 w-6" /> },
  { title: "Remote Monitoring 24/7", desc: "Our operations center watches your facilities so your team can focus on the business.", icon: <Globe className="h-6 w-6" /> },
];

const stories = [
  { client: "LogiPort SA", industry: "Logistics & Ports", metric: "42 km²", label: "Perimeter secured", desc: "AI perimeter detection and integrated CCTV across the entire port terminal." },
  { client: "MetroRetail Group", industry: "Retail · 240 stores", metric: "-68%", label: "Shrinkage incidents", desc: "Centralized monitoring and behavioral analytics across every store nationwide." },
  { client: "EnerCore Utilities", industry: "Energy & Utilities", metric: "100%", label: "Substations monitored", desc: "Thermal CCTV, perimeter intrusion and biometric access for critical infrastructure." },
];

const testimonials = [
  { name: "Sarah Chen", role: "Head of Security, MetroRetail", quote: "Sentinel turned our cameras into a real prevention tool. We now stop incidents before they happen, not after." },
  { name: "Diego Almeida", role: "COO, LogiPort", quote: "From perimeter cameras to access control, one platform, one accountable team. Nothing falls through the cracks." },
];

function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-8">
        <div className="absolute inset-0 bg-grid-sm opacity-30" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
        <div className="relative max-w-2xl">
          <Badge variant="info">● Physical Security Technology</Badge>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
            We protect physical spaces with <span className="text-gradient-blue">intelligent surveillance.</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            AI-powered CCTV, biometric access control, smart building automation and 24/7 remote monitoring — built for enterprises that take physical security seriously.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/explore/meeting" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
              Schedule a Site Assessment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/explore/case-studies" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm font-semibold hover:bg-accent">See Our Work</Link>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            {["24/7 SOC", "ISO 27001", "LGPD / GDPR", "Field engineers nationwide"].map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-success" />{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured services */}
      <section>
        <div className="mb-3 text-xs font-mono uppercase tracking-[0.3em] text-primary">Core capabilities</div>
        <div className="space-y-3">
          {featured.map((s) => (
            <Card key={s.title} className="flex items-center gap-5 p-5 transition hover:border-primary/50">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-secondary/50 text-cyan">{s.icon}</div>
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
        <h2 className="mb-5 text-2xl font-bold">Outcomes that matter to operations</h2>
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
          { v: "500+", l: "Enterprise sites" },
          { v: "120k+", l: "Cameras under management" },
          { v: "180+", l: "Field & operations staff" },
          { v: "3", l: "24/7 monitoring centers" },
        ].map((s) => (
          <div key={s.l}>
            <div className="font-mono text-3xl font-bold text-gradient-blue">{s.v}</div>
            <div className="text-xs text-muted-foreground">{s.l}</div>
          </div>
        ))}
        <div className="md:col-span-4 -mt-2 flex items-center gap-2 text-xs text-muted-foreground"><Award className="h-3.5 w-3.5 text-cyan" />Certified installers across 12 countries</div>
      </Card>
    </div>
  );
}
