import Link from "next/link";
import { PackageX, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { popularSearches } from "@/data/navigation";
import { formatNumber } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";

interface EmptyResultsProps {
  title: string;
  description: string;
  /** Clears the filters (keeps any search query). */
  clearHref?: string;
  clearLabel?: string;
  /** Optional suggestion block, e.g. categories or popular searches. */
  suggestions?: { title: string; items: { label: string; href: string; hint?: string }[] };
  className?: string;
}

/**
 * Shared empty state for every catalogue surface: explains what happened and
 * offers a way forward instead of a dead end.
 */
function EmptyResults({
  title,
  description,
  clearHref,
  clearLabel = "حذف همه فیلترها",
  suggestions,
  className,
}: EmptyResultsProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-5 rounded-lg border border-dashed border-line-strong bg-surface px-5 py-10 text-center",
        className,
      )}
    >
      <span className="grid size-14 place-items-center rounded-full bg-surface-muted text-subtle-ink">
        <PackageX className="size-7" aria-hidden />
      </span>

      <div className="flex max-w-xl flex-col gap-2">
        <p className="text-title font-bold text-ink">{title}</p>
        <p className="text-body-sm text-body">{description}</p>
      </div>

      {clearHref ? (
        <Button asChild variant="outline">
          <Link href={clearHref}>{clearLabel}</Link>
        </Button>
      ) : null}

      {suggestions ? (
        <div className="mt-1 flex w-full flex-col gap-3 border-t border-line pt-5 text-start">
          <p className="text-body-sm font-bold text-ink">{suggestions.title}</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {suggestions.items.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-label text-body transition-colors hover:border-primary/25 hover:bg-brand-soft hover:text-brand-active"
                >
                  {item.label}
                  {item.hint ? (
                    <span className="tabular text-caption text-disabled-ink">
                      {formatNumber(Number(item.hint))}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/** Compact "try a search instead" block used by empty catalogue pages. */
function EmptySearchHint({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
      <span className="flex items-center gap-1.5 text-label text-subtle-ink">
        <Search className="size-3.5" aria-hidden />
        جستجوهای پرطرفدار:
      </span>
      {popularSearches.slice(0, 4).map((term) => (
        <Link
          key={term}
          href={`/search?q=${encodeURIComponent(term)}`}
          className="rounded-full bg-surface-muted px-2.5 py-1 text-label text-body transition-colors hover:bg-brand-soft hover:text-brand-active"
        >
          {term}
        </Link>
      ))}
    </div>
  );
}

export { EmptyResults, EmptySearchHint };
