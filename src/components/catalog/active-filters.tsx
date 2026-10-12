import Link from "next/link";
import { X } from "lucide-react";

import { catalogHref, type CatalogQuery } from "@/lib/catalog/query";
import { activeFilterChips } from "@/lib/catalog/results";
import { cn } from "@/lib/utils/cn";

/**
 * Row of removable chips describing the filters currently applied, plus a
 * single "clear all" action. Renders nothing when the catalogue is unfiltered.
 */
function ActiveFilters({
  query,
  basePath,
  className,
}: {
  query: CatalogQuery;
  basePath: string;
  className?: string;
}) {
  const chips = activeFilterChips(query, basePath);
  if (chips.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-label text-subtle-ink">فیلترهای فعال:</span>

      {chips.map((chip) => (
        <Link
          key={chip.key}
          href={chip.href}
          aria-label={`حذف فیلتر ${chip.label}`}
          className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface py-1 ps-2.5 pe-1.5 text-label text-body transition-colors hover:border-sale/30 hover:bg-sale-soft hover:text-sale"
        >
          {chip.label}
          <X className="size-3.5 text-disabled-ink transition-colors group-hover:text-sale" aria-hidden />
        </Link>
      ))}

      <Link
        href={basePath + (query.q ? `?q=${encodeURIComponent(query.q)}` : "")}
        className="text-label font-medium text-brand transition-colors hover:text-brand-hover"
      >
        حذف همه
      </Link>
    </div>
  );
}

export { ActiveFilters, catalogHref };
