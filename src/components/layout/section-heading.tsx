import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  /** Extra controls (e.g. rail arrows) rendered at the inline-end edge. */
  aside?: React.ReactNode;
  className?: string;
  tone?: "default" | "inverse";
}

/**
 * The signature section header used across the homepage: an accent bar, a
 * Persian title, an optional supporting line and an optional "view all" link.
 */
export function SectionHeading({
  title,
  subtitle,
  href,
  linkLabel = "مشاهده همه",
  aside,
  className,
  tone = "default",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-3 sm:gap-6",
        tone === "inverse" && "text-white",
        className,
      )}
    >
      <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
        <span
          aria-hidden
          className={cn(
            "mt-[0.45rem] h-5 w-1.5 shrink-0 rounded-full sm:h-6",
            tone === "inverse"
              ? "bg-white/70"
              : "bg-gradient-to-b from-primary to-brand-subtle",
          )}
        />
        <div className="min-w-0">
          <h2
            className={cn(
              "text-title font-bold sm:text-heading",
              tone === "inverse" ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h2>
          {subtitle ? (
            <p
              className={cn(
                "mt-1 text-body-sm",
                tone === "inverse" ? "text-white/70" : "text-subtle-ink",
              )}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {href && linkLabel ? (
          <Link
            href={href}
            className={cn(
              "group hidden items-center gap-1 rounded-sm px-1 text-label font-medium transition-colors sm:inline-flex",
              tone === "inverse"
                ? "text-white/80 hover:text-white"
                : "text-brand hover:text-brand-hover",
            )}
          >
            {linkLabel}
            <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </Link>
        ) : null}
        {aside}
      </div>
    </div>
  );
}
