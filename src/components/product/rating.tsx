import { Star } from "lucide-react";

import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";

interface RatingProps {
  value: number;
  reviewCount?: number;
  size?: "sm" | "default";
  className?: string;
}

export function Rating({ value, reviewCount, size = "sm", className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "flex items-center gap-1 font-medium text-warning",
          size === "sm" ? "text-label" : "text-body-sm",
        )}
      >
        <Star
          className={cn("fill-warning text-warning", size === "sm" ? "size-3.5" : "size-4")}
          aria-hidden
        />
        {toPersianDigits(value.toFixed(1))}
      </span>
      {typeof reviewCount === "number" ? (
        <span className="text-caption text-disabled-ink sm:text-label">
          ({toPersianDigits(reviewCount.toLocaleString("en-US"))} نظر)
        </span>
      ) : null}
      <span className="sr-only">
        امتیاز {toPersianDigits(value.toFixed(1))} از ۵
      </span>
    </div>
  );
}