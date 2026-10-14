import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { CategoryIcon } from "@/components/category/category-icon";
import { Badge } from "@/components/ui/badge";
import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import type { Category } from "@/types";

/**
 * Category tile used by the category discovery page and the "related
 * categories" strip. Categories without a photo render the taxonomy icon on a
 * brand-tinted plate, so tiles are never broken or empty.
 */
export function CategoryCard({
  category,
  productCount,
  brandCount,
  priority = false,
  className,
}: {
  category: Category;
  /** Real catalogue count (falls back to the taxonomy count). */
  productCount: number;
  /** Real number of brands in this category, shown when it has no children. */
  brandCount?: number;
  priority?: boolean;
  className?: string;
}) {
  const available = productCount > 0;
  const subcategoryCount = category.children?.length ?? 0;
  const meta =
    category.highlight ??
    (subcategoryCount > 0
      ? `${toPersianDigits(subcategoryCount)} زیردسته`
      : brandCount
        ? `${toPersianDigits(brandCount)} برند`
        : null);

  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-line bg-card transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.title}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 300px"
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-[1.05]",
              !available && "opacity-60 saturate-50",
            )}
          />
        ) : (
          <span
            aria-hidden
            className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_35%,var(--color-brand-soft),var(--color-surface-muted))]"
          >
            <span className="grid size-14 place-items-center rounded-lg border border-line-subtle bg-surface text-brand shadow-soft">
              <CategoryIcon name={category.icon} className="size-6" />
            </span>
          </span>
        )}

        {available ? (
          <Badge
            variant="secondary"
            className="absolute bottom-2 end-2 tabular bg-surface/90 shadow-soft backdrop-blur"
          >
            {toPersianDigits(productCount)} کالا
          </Badge>
        ) : (
          <Badge
            variant="warning"
            className="absolute bottom-2 end-2 shadow-soft"
          >
            به‌زودی
          </Badge>
        )}
      </div>

      <div className="flex flex-1 items-center justify-between gap-2 px-3.5 py-3">
        <div className="min-w-0">
          <p className="line-clamp-2 text-body-sm font-bold text-ink transition-colors group-hover:text-brand-active">
            {category.title}
          </p>
          {meta ? (
            <p className="truncate text-caption text-subtle-ink">{meta}</p>
          ) : null}
        </div>
        <ChevronLeft
          className="size-4 shrink-0 text-disabled-ink transition-all group-hover:-translate-x-0.5 group-hover:text-brand"
          aria-hidden
        />
      </div>
    </Link>
  );
}
