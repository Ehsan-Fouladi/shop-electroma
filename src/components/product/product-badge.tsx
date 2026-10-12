import { Badge } from "@/components/ui/badge";
import { discountPercent, formatPercent } from "@/lib/formatters/number";
import type { Product } from "@/types";

export const productBadgeLabels: Record<string, { label: string; variant: "sale" | "ink" | "success" }> = {
  sale: { label: "تخفیف", variant: "sale" },
  amazing: { label: "پیشنهاد ویژه", variant: "sale" },
  bestseller: { label: "پرفروش", variant: "ink" },
  new: { label: "جدید", variant: "success" },
  original: { label: "اصالت کالا", variant: "success" },
};

/** Corner badges shown on a product image — at most two, never duplicated. */
export function ProductBadges({ product }: { product: Product }) {
  const off = discountPercent(product.price, product.oldPrice);
  const meta = product.badge ? productBadgeLabels[product.badge] : undefined;

  return (
    <div className="absolute top-4.5 start-4.5 z-10 flex flex-col items-start gap-1.5">
      {off ? (
        <Badge variant="sale" className="tabular shadow-soft">
          {formatPercent(off)}
        </Badge>
      ) : null}
      {meta && !off ? (
        <Badge variant={meta.variant} className="shadow-soft">
          {meta.label}
        </Badge>
      ) : null}
    </div>
  );
}