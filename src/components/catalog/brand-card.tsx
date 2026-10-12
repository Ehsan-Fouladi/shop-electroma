import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { BrandLogo } from "@/components/product/brand-logo";
import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import type { Brand } from "@/types";

/**
 * Brand tile used on the brand index and in the "other brands" strip. Brands
 * without a published mark fall back to a monogram (handled by BrandLogo).
 */
export function BrandCard({
  brand,
  productCount,
  categories = [],
  className,
}: {
  brand: Brand;
  /** Real number of products available for this brand. */
  productCount: number;
  /** Category labels this brand currently covers. */
  categories?: string[];
  className?: string;
}) {
  return (
    <Link
      href={`/brand/${brand.slug}`}
      className={cn(
        "group flex flex-col gap-3 rounded-lg border border-line bg-card p-4 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <BrandLogo
          mark={brand.mark}
          label={brand.title}
          latin={brand.latin}
          className="size-8 text-disabled-ink transition-colors group-hover:text-ink"
        />
        {brand.featured ? (
          <span className="rounded-xs bg-brand-soft px-2 py-0.5 text-caption font-medium text-brand-active">
            برند ویژه
          </span>
        ) : null}
      </div>

      <div className="min-w-0">
        <p className="truncate text-body-sm font-bold text-ink transition-colors group-hover:text-brand-active">
          {brand.title}
        </p>
        <p className="truncate text-caption text-disabled-ink" dir="ltr">
          {brand.latin}
        </p>
      </div>

      {categories.length ? (
        <p className="line-clamp-1 text-caption text-subtle-ink">
          {categories.join(" • ")}
        </p>
      ) : null}

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-line-subtle pt-3">
        <span className="tabular text-caption text-subtle-ink">
          {toPersianDigits(productCount)} کالا
        </span>
        <span className="inline-flex items-center gap-1 text-label font-medium text-brand">
          مشاهده
          <ChevronLeft
            className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}