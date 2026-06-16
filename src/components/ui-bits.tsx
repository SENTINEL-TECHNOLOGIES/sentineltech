import { type ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-card/60 backdrop-blur-sm ${className}`}>{children}</div>;
}

export function CardHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border p-5">
      <div className="min-w-0">
        <h3 className="text-base font-semibold">{title}</h3>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function KpiCard({ label, value, delta, deltaPositive, icon, accent = "primary" }: { label: string; value: string; delta?: string; deltaPositive?: boolean; icon: ReactNode; accent?: "primary" | "cyan" | "success" | "warning" | "destructive" }) {
  const colors: Record<string, string> = {
    primary: "from-primary/30 to-primary/0 text-primary",
    cyan: "from-cyan/30 to-cyan/0 text-cyan",
    success: "from-success/30 to-success/0 text-success",
    warning: "from-warning/30 to-warning/0 text-warning",
    destructive: "from-destructive/30 to-destructive/0 text-destructive",
  };
  return (
    <Card className="overflow-hidden p-5">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 font-mono text-3xl font-bold tracking-tight">{value}</div>
          {delta && (
            <div className={`mt-1.5 text-xs font-semibold ${deltaPositive ? "text-success" : "text-destructive"}`}>{delta}</div>
          )}
        </div>
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${colors[accent]}`}>{icon}</div>
      </div>
    </Card>
  );
}

export function Badge({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "success" | "warning" | "destructive" | "info" | "outline" }) {
  const styles: Record<string, string> = {
    default: "bg-secondary text-secondary-foreground",
    success: "bg-success/15 text-success border border-success/30",
    warning: "bg-warning/15 text-warning border border-warning/30",
    destructive: "bg-destructive/15 text-destructive border border-destructive/30",
    info: "bg-primary/15 text-primary border border-primary/30",
    outline: "border border-border text-foreground",
  };
  return <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${styles[variant]}`}>{children}</span>;
}
