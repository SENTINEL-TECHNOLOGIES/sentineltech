import { Shield } from "lucide-react";

export function SentinelLogo({ size = "md", subtitle }: { size?: "sm" | "md" | "lg"; subtitle?: string }) {
  const dims = size === "sm" ? "h-7 w-7" : size === "lg" ? "h-12 w-12" : "h-9 w-9";
  const text = size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-lg";
  return (
    <div className="flex items-center gap-3">
      <div className={`${dims} grid place-items-center rounded-lg bg-gradient-to-br from-primary to-cyan shadow-lg shadow-primary/30`}>
        <Shield className="h-1/2 w-1/2 text-primary-foreground" strokeWidth={2.5} />
      </div>
      <div className="leading-tight">
        <div className={`${text} font-bold tracking-tight font-mono`}>SENTINEL</div>
        {subtitle && <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{subtitle}</div>}
      </div>
    </div>
  );
}
