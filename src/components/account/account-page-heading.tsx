import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Breadcrumb } from "@/components/layout/breadcrumb";

function AccountPageHeading({
  title,
  description,
  breadcrumbTitle,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbTitle?: string;
}) {
  const label =
    breadcrumbTitle ?? (typeof title === "string" ? title : undefined);
  return (
    <div className="mb-5 flex flex-col gap-2.5 sm:mb-6">
      <Breadcrumb
        items={[
          { label: "خانه", href: "/" },
          { label: "حساب کاربری", href: "/account" },
          ...(label && label !== "حساب کاربری" ? [{ label }] : []),
        ]}
      />
      <div>
        <h1 className="text-heading font-bold text-ink sm:text-heading-lg">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-body-sm text-body">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

function AccountPanel({
  title,
  description,
  action,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-line bg-surface p-4 shadow-soft sm:p-5 ${className}`}
    >
      {title || action ? (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title ? (
              <h2 className="text-title font-bold text-ink">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-1 text-caption text-subtle-ink">{description}</p>
            ) : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

function AccountBackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-label font-medium text-brand hover:underline"
    >
      <ChevronRight className="size-3.5" aria-hidden />
      {label}
    </Link>
  );
}

export { AccountPageHeading, AccountPanel, AccountBackLink };
