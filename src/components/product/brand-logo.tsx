import { getBrandMark } from "@/data/brand-logos";
import { cn } from "@/lib/utils/cn";

interface BrandLogoProps {
  /** Mark key from `brand-logos.ts`. */
  mark?: string;
  /** Persian label, used for the accessible name and the monogram fallback. */
  label: string;
  latin?: string;
  className?: string;
}

/**
 * Renders a brand mark inlined as SVG path data so it inherits `currentColor`.
 * Brands without a published mark fall back to a monogram tile.
 */
export function BrandLogo({ mark, label, latin, className }: BrandLogoProps) {
  const data = mark ? getBrandMark(mark) : undefined;

  if (!data) {
    return (
      <span
        aria-hidden
        className={cn(
          "grid size-9 place-items-center rounded-sm bg-brand-soft text-label font-bold text-brand-active",
          className,
        )}
      >
        {(latin ?? label).slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <svg
      role="img"
      aria-label={latin ?? label}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("size-9", className)}
    >
      {data.circles?.map((circle, index) => (
        <circle key={index} cx={circle.cx} cy={circle.cy} r={circle.r} />
      ))}
      {data.paths.map((path, index) => (
        <path key={index} d={path} />
      ))}
    </svg>
  );
}