import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Rocket, Lock, ArrowRight, Users, Activity, Clock, Award } from "lucide-react";
import { SentinelLogo } from "@/components/sentinel-logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sentinel — Enterprise Security & Infrastructure Platform" },
      { name: "description", content: "Choose how to access Sentinel: corporate client portal or explore our cybersecurity solutions." },
    ],
  }),
  component: Entry,
});

function Entry() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/20 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <SentinelLogo size="lg" />
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-cyan">Enterprise Security &amp; Infrastructure Platform</p>
          <h1 className="mt-8 max-w-3xl text-3xl md:text-5xl font-bold tracking-tight">
            How would you like to access <span className="text-gradient-blue">Sentinel?</span>
          </h1>
        </div>

        <div className="mt-14 grid w-full max-w-5xl gap-6 md:grid-cols-2">
          <AccessCard
            badge={<span className="rounded-full border border-success/40 bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success"><Lock className="mr-1 inline h-3 w-3" /> Secure Login</span>}
            icon={<Shield className="h-7 w-7 text-cyan" />}
            title="Corporate Client"
            description="Access monitoring, projects, reports and infrastructure information."
            ctaText="Access Corporate Portal"
            ctaTo="/login/corporate"
            primary
          />
          <AccessCard
            badge={<span className="rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 text-[11px] font-semibold text-warning">• No account needed</span>}
            icon={<Rocket className="h-7 w-7 text-primary" />}
            title="New Customer"
            description="Explore services, request proposals and schedule consultations."
            ctaText="Explore Solutions"
            ctaTo="/login/customer"
          />
        </div>

        <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
          <Stat icon={<Users className="h-4 w-4" />} label="Enterprise Clients" value="500+" />
          <Stat icon={<Activity className="h-4 w-4" />} label="Network Uptime" value="99.97%" />
          <Stat icon={<Clock className="h-4 w-4" />} label="SOC Operations" value="24/7" />
          <Stat icon={<Award className="h-4 w-4" />} label="Certified" value="ISO 27001" />
        </div>
      </div>
    </div>
  );
}

function AccessCard({ badge, icon, title, description, ctaText, ctaTo, primary }: { badge: React.ReactNode; icon: React.ReactNode; title: string; description: string; ctaText: string; ctaTo: string; primary?: boolean }) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/10">
      <div className="absolute right-6 top-6">{badge}</div>
      <div className="grid h-14 w-14 place-items-center rounded-xl border border-border bg-secondary/50">{icon}</div>
      <h2 className="mt-8 text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <Link to={ctaTo} className={`mt-8 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${primary ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90" : "border border-primary/50 text-primary hover:bg-primary/10"}`}>
        {ctaText} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary/60 text-cyan">{icon}</div>
      <div className="min-w-0">
        <div className="text-sm font-bold">{value}</div>
        <div className="truncate text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
