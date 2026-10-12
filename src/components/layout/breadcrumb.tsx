import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * RTL breadcrumb with automatic Schema.org BreadcrumbList JSON-LD integration.
 * The last item is the current page and is marked aria-current.
 */
export function Breadcrumb({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteConfig.url}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="مسیر صفحه" className={cn("min-w-0", className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-label leading-relaxed">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="rounded-xs text-subtle-ink transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "text-body",
                    isLast && "max-w-[200px] truncate font-medium text-ink sm:max-w-none",
                  )}
                  title={item.label}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <ChevronLeft className="size-3.5 shrink-0 text-disabled-ink" aria-hidden />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}