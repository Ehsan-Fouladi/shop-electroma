import { Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types";

/**
 * Full technical specification table. Only the specifications the record
 * actually carries are rendered — never an empty row — and the two-column
 * definition list collapses to one column on small screens.
 */
export function ProductSpecs({ product, className }: { product: Product; className?: string }) {
  const specs = product.specs.filter((spec) => spec.label.trim() && spec.value.trim());

  return (
    <section
      aria-labelledby="specs-title"
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-line bg-card p-4 shadow-soft sm:p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="specs-title" className="text-title font-bold text-ink">
          مشخصات فنی
        </h2>
        {specs.length ? (
          <Badge variant="secondary" className="tabular">
            {toPersianDigits(specs.length)} مورد
          </Badge>
        ) : null}
      </div>

      {specs.length ? (
        <dl className="grid gap-x-8 sm:grid-cols-2">
          {specs.map((spec) => (
            <div
              key={`${spec.label}-${spec.value}`}
              className="flex items-baseline justify-between gap-4 border-b border-line-subtle py-2.5 last:border-b-0"
            >
              <dt className="shrink-0 text-body-sm text-subtle-ink">{spec.label}</dt>
              <dd className="text-end text-body-sm font-medium text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="flex items-start gap-2 rounded-md bg-surface-soft p-3.5 text-body-sm text-body">
          <Info className="mt-1 size-4 shrink-0 text-subtle-ink" aria-hidden />
          مشخصات فنی برای این کالا در کاتالوگ ثبت نشده است.
        </p>
      )}
    </section>
  );
}