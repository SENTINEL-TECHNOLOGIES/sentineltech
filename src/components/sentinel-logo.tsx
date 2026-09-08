import horizontal from "@/assets/logos/logo-horz.png";
import horizontalWhite from "@/assets/logos/logo-horz-wht.png";
import vertical from "@/assets/logos/logo-vert.png";
import verticalWhite from "@/assets/logos/logo-vert-wht.png";

type Size = "sm" | "md" | "lg" | "xl";
type VariantInput = "horizontal" | "vertical" | "mark" | "stacked";
type VariantResolved = "horizontal" | "vertical";
/** "dark" = fundo escuro (usa a logo branca) | "light" = fundo claro (usa a logo original) */
type OnBackground = "dark" | "light";

const VARIANT_MAP: Record<VariantInput, VariantResolved> = {
  horizontal: "horizontal",
  vertical: "vertical",
  mark: "horizontal",      // mark uses horizontal logo
  stacked: "vertical",     // stacked uses vertical logo
};

const HEIGHTS: Record<VariantResolved, Record<Size, string>> = {
  horizontal: {
    sm: "h-6 md:h-7",
    md: "h-8 md:h-9",
    lg: "h-10 md:h-12",
    xl: "h-12 md:h-14",
  },
  vertical: {
    sm: "h-10 md:h-12",
    md: "h-14 md:h-16",
    lg: "h-20 md:h-24",
    xl: "h-24 md:h-32",
  },
};

const SOURCES: Record<VariantResolved, Record<OnBackground, string>> = {
  horizontal: {
    light: horizontal,
    dark: horizontalWhite,
  },
  vertical: {
    light: vertical,
    dark: verticalWhite,
  },
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
  variant?: VariantInput;
  onBackground?: OnBackground;
  className?: string;
}) {
  const resolvedVariant = VARIANT_MAP[variant];

  const sub =
    size === "sm"
      ? "text-[9px]"
      : size === "lg"
        ? "text-[11px]"
        : "text-[10px]";

  return (
    <div
      className={`flex ${
        resolvedVariant === "vertical"
          ? "flex-col items-center gap-2"
          : "items-center gap-3"
      } ${className}`}
    >
      <img
        src={SOURCES[resolvedVariant][onBackground]}
        alt="Sentinel Technologies"
        className={`${HEIGHTS[resolvedVariant][size]} w-auto shrink-0 object-contain`}
      />

      {subtitle && (
        <span
          className={`${sub} uppercase tracking-[0.22em] text-muted-foreground`}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
}