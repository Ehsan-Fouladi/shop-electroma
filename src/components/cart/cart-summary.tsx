import { Truck } from "lucide-react";

import { formatPrice } from "@/lib/formatters/number";
import type { CartTotals } from "@/lib/cart/summary";

export function CartSummary({
  totals,
  compact = false,
}: {
  totals: CartTotals;
  compact?: boolean;
}) {
  return (
    <section className="flex flex-col gap-3" aria-label="خلاصه سفارش">
      <h2 className="text-title-sm font-bold text-ink">خلاصه سفارش</h2>
      <dl className="flex flex-col gap-2.5 text-body-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-subtle-ink">جمع کالاها</dt>
          <dd className="font-medium text-ink">
            {formatPrice(totals.subtotal)} تومان
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-subtle-ink">تخفیف محصولات</dt>
          <dd className="font-medium text-success">
            {totals.discount ? `− ${formatPrice(totals.discount)}` : "—"} تومان
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-subtle-ink">ارسال</dt>
          <dd className="font-medium text-ink">
            {totals.freeShipping
              ? "رایگان"
              : totals.shipping
                ? `حدود ${formatPrice(totals.shipping)} تومان`
                : "در مرحله بعد"}
          </dd>
        </div>
      </dl>
      {!compact ? <div className="border-t border-line pt-3" /> : null}
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-body-sm font-bold text-ink">مبلغ قابل پرداخت</p>
          {!totals.freeShipping && totals.shipping > 0 ? (
            <p className="text-caption text-subtle-ink">
              هزینه ارسال تخمینی است
            </p>
          ) : null}
        </div>
        <p className="text-title-sm font-bold text-brand-active">
          {formatPrice(totals.total)}{" "}
          <span className="text-caption font-normal">تومان</span>
        </p>
      </div>
      {!totals.freeShipping && totals.shipping > 0 ? (
        <p className="flex items-start gap-2 rounded-md bg-brand-soft px-3 py-2 text-caption text-brand-active">
          <Truck className="mt-0.5 size-4 shrink-0" aria-hidden />
          هزینه نهایی ارسال در مرحله انتخاب روش تحویل محاسبه می‌شود.
        </p>
      ) : null}
    </section>
  );
}
