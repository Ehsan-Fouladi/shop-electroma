import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";

import { PriceFilter } from "@/components/catalog/price-filter";
import { Badge } from "@/components/ui/badge";
import { catalogHref, type CatalogQuery } from "@/lib/catalog/query";
import type { CatalogFacets, FacetOption } from "@/lib/catalog/results";
import { ratingOptions } from "@/lib/constants/catalog";
import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";

/* --------------------------------- Group ---------------------------------- */

function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group/group px-3 py-2.5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-1 text-body-sm font-bold text-ink marker:hidden">
        {title}
        <ChevronDown
          className="size-4 text-subtle-ink transition-transform group-open/group:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="pt-2">{children}</div>
    </details>
  );
}

/* ------------------------------ Facet items -------------------------------- */

function CheckboxFacet({ option }: { option: FacetOption }) {
  return (
    <li>
      <Link
        href={option.href}
        aria-label={`${option.label}، ${toPersianDigits(option.count)} کالا`}
        className="flex items-center justify-between gap-2 rounded-sm px-1.5 py-1.5 transition-colors hover:bg-surface-soft"
      >
        <span className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden
            className={cn(
              "grid size-4 shrink-0 place-items-center rounded-xs border transition-colors",
              option.active
                ? "border-primary bg-primary text-white"
                : "border-line-strong bg-surface group-hover/group:border-primary/50",
            )}
          >
            {option.active ? <Check className="size-3" /> : null}
          </span>
          <span
            className={cn(
              "truncate text-body-sm",
              option.active ? "font-medium text-brand-active" : "text-body",
            )}
          >
            {option.label}
          </span>
        </span>
        <span className="tabular shrink-0 text-caption text-disabled-ink">
          {toPersianDigits(option.count)}
        </span>
      </Link>
    </li>
  );
}

function ChipFacet({ option }: { option: FacetOption }) {
  return (
    <li>
      <Link
        href={option.href}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-label transition-colors",
          option.active
            ? "border-primary/30 bg-brand-soft font-medium text-brand-active"
            : "border-line bg-surface text-body hover:border-line-strong hover:bg-surface-soft",
        )}
      >
        {option.label}
        <span className="tabular text-caption text-disabled-ink">
          {toPersianDigits(option.count)}
        </span>
      </Link>
    </li>
  );
}

function ToggleFacet({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-2 rounded-sm px-1.5 py-1.5 text-body-sm transition-colors hover:bg-surface-soft",
          active ? "font-medium text-brand-active" : "text-body",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "grid size-4 shrink-0 place-items-center rounded-xs border transition-colors",
            active ? "border-primary bg-primary text-white" : "border-line-strong bg-surface",
          )}
        >
          {active ? <Check className="size-3" /> : null}
        </span>
        {label}
      </Link>
    </li>
  );
}

/* ------------------------------ Filter panel ------------------------------- */

interface FilterPanelProps {
  query: CatalogQuery;
  basePath: string;
  facets: CatalogFacets;
  bounds: { min: number; max: number };
  /** Which facet groups this page shows (each is hidden when it has no options). */
  show?: {
    categories?: boolean;
    subcategories?: boolean;
    brands?: boolean;
    colors?: boolean;
  };
}

/**
 * The single filter surface used by the desktop sidebar and the mobile sheet.
 * Facets are links, so every filter state is shareable, crawlable and works
 * without client-side state.
 */
function FilterPanel({
  query,
  basePath,
  facets,
  bounds,
  show = { categories: true, subcategories: true, brands: true, colors: true },
}: FilterPanelProps) {
  const clearAllHref = catalogHref(basePath, query, {
    categories: [],
    brands: [],
    subcategories: [],
    colors: [],
    minPrice: null,
    maxPrice: null,
    availableOnly: false,
    discountedOnly: false,
    minRating: null,
  });

  return (
    <div className="divide-y divide-line-subtle">
      {show.categories && facets.categories.length > 1 ? (
        <FilterGroup title="دسته‌بندی">
          <ul className="flex flex-col">
            {facets.categories.map((option) => (
              <CheckboxFacet key={option.value} option={option} />
            ))}
          </ul>
        </FilterGroup>
      ) : null}

      {show.subcategories && facets.subcategories.length > 1 ? (
        <FilterGroup title="زیردسته">
          <ul className="flex flex-wrap gap-2">
            {facets.subcategories.map((option) => (
              <ChipFacet key={option.value} option={option} />
            ))}
          </ul>
        </FilterGroup>
      ) : null}

      {show.brands && facets.brands.length > 1 ? (
        <FilterGroup title="برند">
          <ul className="no-scrollbar flex max-h-56 flex-col overflow-y-auto">
            {facets.brands.map((option) => (
              <CheckboxFacet key={option.value} option={option} />
            ))}
          </ul>
        </FilterGroup>
      ) : null}

      <FilterGroup title="محدوده قیمت">
        <PriceFilter
          basePath={basePath}
          minPrice={query.minPrice}
          maxPrice={query.maxPrice}
          bounds={bounds}
        />
      </FilterGroup>

      <FilterGroup title="وضعیت کالا">
        <ul className="flex flex-col">
          <ToggleFacet
            href={catalogHref(basePath, query, { availableOnly: !query.availableOnly })}
            label="فقط کالاهای موجود"
            active={query.availableOnly}
          />
          <ToggleFacet
            href={catalogHref(basePath, query, { discountedOnly: !query.discountedOnly })}
            label="فقط کالاهای تخفیف‌دار"
            active={query.discountedOnly}
          />
        </ul>
      </FilterGroup>

      <FilterGroup title="امتیاز کاربران">
        <ul className="flex flex-col">
          {ratingOptions.map((option) => (
            <ToggleFacet
              key={option.value}
              href={catalogHref(basePath, query, {
                minRating: query.minRating === option.value ? null : option.value,
              })}
              label={option.label}
              active={query.minRating === option.value}
            />
          ))}
        </ul>
      </FilterGroup>

      {show.colors && facets.colors.length > 1 ? (
        <FilterGroup title="رنگ" defaultOpen={false}>
          <ul className="flex flex-wrap gap-2">
            {facets.colors.map((option) => (
              <ChipFacet key={option.value} option={option} />
            ))}
          </ul>
        </FilterGroup>
      ) : null}

      <div className="px-3 py-3">
        <Link
          href={clearAllHref}
          className="text-label font-medium text-brand transition-colors hover:text-brand-hover"
        >
          حذف همه فیلترها
        </Link>
      </div>
    </div>
  );
}

/** Desktop sidebar wrapper: sticky, scrollable, with its own header row. */
function FilterSidebar({ children, resultCount }: { children: React.ReactNode; resultCount: number }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-3">
        <span className="flex items-center gap-2 text-body-sm font-bold text-ink">
          فیلترها
          <Badge variant="secondary" className="tabular">
            {toPersianDigits(resultCount)} کالا
          </Badge>
        </span>
      </div>
      {children}
    </div>
  );
}

export { FilterPanel, FilterGroup, FilterSidebar, CheckboxFacet, ToggleFacet, ChipFacet };
export type { FilterPanelProps };
