export function SentinelLogo({ size = "md", subtitle }: { size?: "sm" | "md" | "lg"; subtitle?: string }) {
  const dims = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const text = size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-lg";
  const sub = size === "sm" ? "text-[9px]" : "text-[10px]";
  return (
    <div className="flex items-center gap-3">
      <div className={`${dims} relative grid place-items-center rounded-xl bg-gradient-to-br from-primary via-primary to-cyan shadow-lg shadow-primary/40 ring-1 ring-cyan/40`}>
        {/* Sentinel mark: shield + camera aperture */}
        <svg viewBox="0 0 32 32" className="h-[62%] w-[62%]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 2.8 L27 6.5 V16 c0 7-5 12-11 13.2 C10 28 5 23 5 16 V6.5 Z" className="text-primary-foreground" fill="currentColor" fillOpacity="0.12" />
          <circle cx="16" cy="15" r="4.2" className="text-primary-foreground" />
          <circle cx="16" cy="15" r="1.4" className="text-cyan" fill="currentColor" stroke="none" />
          <path d="M16 10.8 V8.5 M20.2 15 H22.5 M16 19.2 V21.5 M11.8 15 H9.5" className="text-primary-foreground" />
        </svg>
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-success ring-2 ring-background animate-pulse-glow" />
      </div>
      <div className="leading-tight">
        <div className={`${text} font-bold tracking-tight font-mono`}>SENTINEL</div>
        {subtitle && <div className={`${sub} uppercase tracking-[0.22em] text-muted-foreground`}>{subtitle}</div>}
      </div>
    </div>
  );
}
