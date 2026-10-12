import { CheckCircle2, TriangleAlert, XCircle } from "lucide-react";

import { Price } from "@/components/product/price";
import { formatNumber } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import type { Availability } from "@/lib/product/detail";
import type { Product } from "@/types";

const toneStyles: Record<Availability["tone"], { chip: string; icon: typeof CheckCircle2 }> = {
  success: { chip: "bg-success-soft text-success", icon: CheckCircle2 },
  warning: { chip: "bg-warning-soft text-warning", icon: TriangleAlert },
  error: { chip: "bg-sale-soft text-sale", icon: XCircle },
};

/**
 * Price area: the availability state, the discount hierarchy and the amount the
 * buyer saves. All figures come from the record — nothing is rounded or faked.
 */
export function ProductPriceCard({ product, availability }: { product: Product; availability: Availability }) {
  const savings = product.oldPrice ? Math.max(0, product.oldPrice - product.price) : 0;
  const tone = toneStyles[availability.tone];
  const StatusIcon = tone.icon;

  return (
    <section
      aria-label="قیمت و وضعیت موجودی"
      className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 shadow-soft sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-label font-medium",
            tone.chip,
          )}
        >
          <StatusIcon className="size-3.5" aria-hidden />
          {availability.label}
        </span>
        <span className="text-caption text-disabled-ink">قیمت برای ۱ عدد</span>
      </div>

      <Price price={product.price} oldPrice={product.oldPrice} size="lg" />

      {savings > 0 ? (
        <p className="text-label text-success">
          <span className="tabular font-bold">{formatNumber(savings)} تومان</span> سود شما از این خرید
        </p>
      ) : null}

      <p className="border-t border-line-subtle pt-3 text-body-sm text-body">{availability.hint}</p>
    </section>
  );
}