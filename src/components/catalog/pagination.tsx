import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { catalogHref, type CatalogQuery } from "@/lib/catalog/query";
import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";

type PageItem = number | "gap";

/** Windowed page list: 1 … 4 5 6 … 12 */
function pageItems(current: number, total: number): PageItem[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const items: PageItem[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("gap");
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < total - 1) items.push("gap");
  items.push(total);

  return items;
}

const cellBaseClass =
  "inline-flex h-10 items-center justify-center rounded-md border text-body-sm transition-colors outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

interface PaginationProps {
  query: CatalogQuery;
  basePath: string;
  /** Total number of pages. */
  total: number;
  className?: string;
}

/**
 * Numbered pagination. Every state is a real link so results stay crawlable and
 * shareable; the current page is marked for assistive tech.
 * Fully responsive and accessible in RTL layout.
 */
export function Pagination({
  query,
  basePath,
  total,
  className,
}: PaginationProps) {
  if (total <= 1) return null;

  const current = Math.min(Math.max(1, query.page), total);
  const items = pageItems(current, total);
  const isFirst = current === 1;
  const isLast = current === total;

  return (
    <nav
      aria-label="صفحه‌بندی نتایج کاتالوگ"
      className={cn(
        "flex flex-wrap items-center justify-center gap-1.5 sm:gap-2",
        className,
      )}
    >
      {/* Previous button (RTL forward/back: قبلی with ChevronRight) */}
      <Link
        href={catalogHref(basePath, query, { page: current - 1 })}
        aria-label="صفحه قبلی"
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : undefined}
        className={cn(
          cellBaseClass,
          "size-10 sm:w-auto sm:px-3 sm:gap-1",
          isFirst
            ? "pointer-events-none border-line bg-surface text-disabled-ink opacity-50"
            : "border-line bg-surface text-body hover:border-line-strong hover:bg-surface-soft active:translate-y-px",
        )}
      >
        <ChevronRight className="size-4 shrink-0" aria-hidden />
        <span className="hidden sm:inline">قبلی</span>
      </Link>

      <ul className="flex items-center gap-1 sm:gap-1.5">
        {items.map((item, index) =>
          item === "gap" ? (
            <li
              key={`gap-${index}`}
              className="grid size-10 place-items-center text-subtle-ink"
              aria-hidden
            >
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={catalogHref(basePath, query, { page: item })}
                aria-label={`صفحه ${toPersianDigits(item)}`}
                aria-current={item === current ? "page" : undefined}
                className={cn(
                  cellBaseClass,
                  "size-10 tabular",
                  item === current
                    ? "border-primary bg-primary font-bold text-primary-foreground shadow-soft"
                    : "border-line bg-surface text-body hover:border-line-strong hover:bg-surface-soft active:translate-y-px",
                )}
              >
                {toPersianDigits(item)}
              </Link>
            </li>
          ),
        )}
      </ul>

      {/* Next button (RTL forward/back: بعدی with ChevronLeft) */}
      <Link
        href={catalogHref(basePath, query, { page: current + 1 })}
        aria-label="صفحه بعدی"
        aria-disabled={isLast}
        tabIndex={isLast ? -1 : undefined}
        className={cn(
          cellBaseClass,
          "size-10 sm:w-auto sm:px-3 sm:gap-1",
          isLast
            ? "pointer-events-none border-line bg-surface text-disabled-ink opacity-50"
            : "border-line bg-surface text-body hover:border-line-strong hover:bg-surface-soft active:translate-y-px",
        )}
      >
        <span className="hidden sm:inline">بعدی</span>
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
      </Link>
    </nav>
  );
}
