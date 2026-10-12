import Link from "next/link";

import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";

export interface SubcategoryLink {
  slug: string;
  title: string;
  count: number;
  href: string;
  active?: boolean;
}

/**
 * Subcategory navigation shown under a category header. Only subcategories that
 * actually contain products are listed, so a chip never leads to an empty page.
 */
export function SubcategoryNav({
  links,
  allHref,
  allActive,
  label = "زیردسته‌ها",
  className,
}: {
  links: SubcategoryLink[];
  allHref: string;
  allActive: boolean;
  label?: string;
  className?: string;
}) {
  if (links.length === 0 && !allActive) return null;

  return (
    <nav aria-label={label} className={cn("flex flex-col gap-2", className)}>
      <p className="text-label font-medium text-subtle-ink">{label}</p>
      <ul className="no-scrollbar flex flex-wrap gap-2">
        <li>
          <Link
            href={allHref}
            aria-current={allActive ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-label transition-colors",
              allActive
                ? "border-primary/30 bg-brand-soft font-medium text-brand-active"
                : "border-line bg-surface text-body hover:border-line-strong hover:bg-surface-soft",
            )}
          >
            همه
          </Link>
        </li>

        {links.map((link) => (
          <li key={link.slug}>
            <Link
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-label transition-colors",
                link.active
                  ? "border-primary/30 bg-brand-soft font-medium text-brand-active"
                  : "border-line bg-surface text-body hover:border-line-strong hover:bg-surface-soft",
              )}
            >
              {link.title}
              <span className="tabular text-caption text-disabled-ink">
                {toPersianDigits(link.count)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}