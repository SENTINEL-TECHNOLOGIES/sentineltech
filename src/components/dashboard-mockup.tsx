import { Camera, Bell, ShieldCheck, Activity } from "lucide-react";

const bars = [38, 52, 44, 70, 61, 84, 58, 92, 66, 78, 49, 88];

export function DashboardMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border bg-card/80 shadow-2xl shadow-primary/10 backdrop-blur-sm ${className}`}>
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <div className="ml-3 truncate font-mono text-[11px] text-muted-foreground">sentinel · centro de comando</div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" /> AO VIVO
        </span>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-3">
        {/* KPIs */}
        {[
          { icon: <Camera className="h-3.5 w-3.5" />, l: "Câmeras ativas", v: "1.248" },
          { icon: <Bell className="h-3.5 w-3.5" />, l: "Alertas hoje", v: "37" },
          { icon: <ShieldCheck className="h-3.5 w-3.5" />, l: "Resposta média", v: "2m 41s" },
        ].map((k) => (
          <div key={k.l} className="rounded-lg border border-border bg-secondary/30 p-3">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              <span className="text-cyan">{k.icon}</span>
              {k.l}
            </div>
            <div className="mt-1.5 font-mono text-xl font-bold">{k.v}</div>
          </div>
        ))}

        {/* chart */}
        <div className="rounded-lg border border-border bg-secondary/30 p-3 sm:col-span-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            <Activity className="h-3.5 w-3.5 text-cyan" /> Eventos detectados · 12h
          </div>
          <div className="mt-3 flex h-24 items-end gap-1.5">
            {bars.map((b, i) => (
              <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-primary/40 to-cyan/80" style={{ height: `${b}%` }} />
            ))}
          </div>
        </div>

        {/* camera grid */}
        <div className="rounded-lg border border-border bg-secondary/30 p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Feeds</div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {["Portaria", "Pátio", "Doca 3", "Perímetro"].map((c, i) => (
              <div key={c} className="relative aspect-video overflow-hidden rounded bg-gradient-to-br from-primary/25 via-secondary to-background">
                <div className="absolute inset-0 bg-grid-sm opacity-40" />
                <span className="absolute bottom-1 left-1 font-mono text-[8px] text-foreground/80">{c}</span>
                {i === 1 && <span className="absolute right-1 top-1 h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />}
              </div>
            ))}
          </div>
        </div>

        {/* alert feed */}
        <div className="rounded-lg border border-border bg-secondary/30 p-3 sm:col-span-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Alertas em tempo real</div>
          <div className="mt-2 space-y-1.5">
            {[
              ["12:04", "Pessoa em área restrita — Doca 3", "bg-destructive"],
              ["11:52", "Veículo não autorizado — Portaria", "bg-warning"],
              ["11:31", "Acesso biométrico validado — Bloco B", "bg-success"],
            ].map(([t, txt, tone]) => (
              <div key={t as string} className="flex items-center gap-2.5 rounded border border-border/60 bg-background/40 px-2.5 py-1.5">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tone}`} />
                <span className="font-mono text-[10px] text-muted-foreground">{t}</span>
                <span className="truncate text-[11px]">{txt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
