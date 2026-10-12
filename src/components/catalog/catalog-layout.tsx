import { cn } from "@/lib/utils/cn";

/**
 * Two-column catalogue layout: sticky filter sidebar on large screens, content
 * column with toolbar, grid and pagination.
 */
function CatalogLayout({
  sidebar,
  children,
  className,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid items-start gap-5 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[17.5rem_minmax(0,1fr)]",
        className,
      )}
    >
      <aside className="hidden lg:block h-full">
        <div className="brand-scrollbar sticky top-[9.5rem] max-h-[calc(100dvh-11rem)] overflow-y-auto overscroll-contain rounded-lg border border-line bg-surface shadow-soft">
          {sidebar}
        </div>
      </aside>

      <div className="flex min-w-0 flex-col gap-4 sm:gap-5">{children}</div>
    </div>
  );
}

/** Page-level header band used by the catalogue pages. */
function CatalogHeader({
  breadcrumb,
  title,
  description,
  meta,
  action,
  headingLevel = "h1",
  className,
}: {
  breadcrumb?: React.ReactNode;
  title: string;
  description?: string;
  /** Small facts row under the title (counts, stats…). */
  meta?: React.ReactNode;
  action?: React.ReactNode;
  headingLevel?: "h1" | "h2";
  className?: string;
}) {
  const HeadingTag = headingLevel;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {breadcrumb}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <HeadingTag className="text-heading font-bold text-ink sm:text-heading-lg">
            {title}
          </HeadingTag>
          {description ? (
            <p className="mt-1.5 max-w-3xl text-body-sm text-body">{description}</p>
          ) : null}
          {meta ? <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">{meta}</div> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}

/** Small catalogue fact shown under a page title. */
function StatPill({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-label text-subtle-ink">
      {icon}
      <span className="tabular font-bold text-ink">{value}</span>
      {label}
    </span>
  );
}

export { CatalogLayout, CatalogHeader, StatPill };
