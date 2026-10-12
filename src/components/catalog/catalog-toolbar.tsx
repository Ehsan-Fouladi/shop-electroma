import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";

interface CatalogToolbarProps {
  resultCount: number;
  /** Singular/plural result label, e.g. «کالا». */
  label?: string;
  /** Sort control (client component). */
  sort: React.ReactNode;
  /** Mobile filter trigger (client component). */
  filterTrigger?: React.ReactNode;
  className?: string;
}

/**
 * Sticky-free catalogue toolbar: result count on one side, sorting and the
 * mobile filter entry point on the other.
 */
export function CatalogToolbar({
  resultCount,
  label = "کالا",
  sort,
  filterTrigger,
  className,
}: CatalogToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2.5 shadow-soft sm:px-4",
        className,
      )}
    >

      <div className="flex min-w-0 flex-wrap items-center gap-2">
        {filterTrigger}
        {sort}
      </div>

      <p className="text-body-sm text-body">
        <span className="tabular font-bold text-ink">{toPersianDigits(resultCount)}</span> {label}
      </p>
    </div>
  );
}
