import { Badge } from "@/components/ui/badge";
import {
  discountPercent,
  formatPercent,
  formatPrice,
} from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";

interface PriceProps {
  price: number;
  oldPrice?: number;
  size?: "default" | "lg";
  /** Lets a narrow container scale the value down (container queries). */
  valueClassName?: string;
  className?: string;
}

/** Price block: discount chip, struck-through old price and the final price. */
export function Price({
  price,
  oldPrice,
  size = "default",
  valueClassName,
  className,
}: PriceProps) {
  const off = discountPercent(price, oldPrice);

  return (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      {off ? (
        <div className="flex items-center gap-2">
          <Badge className="tabular bg-sale text-white">
            {formatPercent(off)}
          </Badge>
          <span className="tabular text-label text-disabled-ink line-through">
            {formatPrice(oldPrice!)}
          </span>
        </div>
      ) : null}
      <div className="flex items-baseline gap-1.5 text-ink">
        <span
          className={cn(
            "tabular font-bold",
            valueClassName ??
              (size === "lg"
                ? "text-heading sm:text-heading-lg"
                : "text-title-sm sm:text-title"),
          )}
        >
          {formatPrice(price)}
        </span>
        <span className="text-label text-subtle-ink">تومان</span>
      </div>
    </div>
  );
}
