import horizontal from "@/assets/logo-horizontal.png.asset.json";
import horizontalWhite from "@/assets/logo-horizontal-white.png.asset.json";
import stacked from "@/assets/logo-stacked.png.asset.json";
import stackedWhite from "@/assets/logo-stacked-white.png.asset.json";
import mark from "@/assets/logo-mark.png.asset.json";
import markWhite from "@/assets/logo-mark-white.png.asset.json";

type Size = "sm" | "md" | "lg";
type Variant = "horizontal" | "stacked" | "mark";
/** "dark" = fundo escuro (usa a logo branca) | "light" = fundo claro (usa a logo original) */
type OnBackground = "dark" | "light";

const HEIGHTS: Record<Variant, Record<Size, string>> = {
  horizontal: { sm: "h-6 md:h-7", md: "h-8 md:h-9", lg: "h-10 md:h-12" },
  stacked: { sm: "h-10 md:h-12", md: "h-14 md:h-16", lg: "h-20 md:h-24" },
  mark: { sm: "h-7 md:h-8", md: "h-9 md:h-10", lg: "h-12 md:h-14" },
};

const SOURCES: Record<Variant, Record<OnBackground, string>> = {
  horizontal: { light: horizontal.url, dark: horizontalWhite.url },
  stacked: { light: stacked.url, dark: stackedWhite.url },
  mark: { light: mark.url, dark: markWhite.url },
};

export function SentinelLogo({
  size = "md",
  subtitle,
  variant = "horizontal",
  onBackground = "dark",
  className = "",
}: {
  size?: Size;
  subtitle?: string;
  variant?: Variant;
  onBackground?: OnBackground;
  className?: string;
}) {
  const sub = size === "sm" ? "text-[9px]" : size === "lg" ? "text-[11px]" : "text-[10px]";
  return (
    <div className={`flex ${variant === "stacked" ? "flex-col items-center gap-2" : "items-center gap-3"} ${className}`}>
      <img
        src={SOURCES[variant][onBackground]}
        alt="Sentinel Technologies"
        className={`${HEIGHTS[variant][size]} w-auto shrink-0 object-contain`}
      />
      {subtitle && (
        <span className={`${sub} uppercase tracking-[0.22em] text-muted-foreground`}>{subtitle}</span>
      )}
    </div>
  );
}
