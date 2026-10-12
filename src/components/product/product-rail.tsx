"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { useRailScroller } from "@/hooks/use-rail-scroller";
import { cn } from "@/lib/utils/cn";
import { Children, useEffect } from "react";

interface ProductRailProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  /** Server-rendered product cards — kept out of the client bundle. */
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

/** Card widths: 4-up on desktop, snapped peek rail on small screens. */
export const cardWidthClass =
  "w-[74%] shrink-0 snap-start min-[440px]:w-[58%] sm:w-[46%] md:w-[31.5%] lg:w-[calc((100%-3rem)/4)]";

/**
 * Desktop: a clean 4-up rail with previous/next controls that follow RTL
 * direction and disable themselves at the bounds. Mobile: a snapped touch rail
 * with a hidden scrollbar and a peek of the next card.
 */
export function ProductRail({
  title,
  subtitle,
  href,
  linkLabel,
  children,
  ariaLabel,
  className,
}: ProductRailProps) {
  const { ref, bounds, step } = useRailScroller<HTMLDivElement>();
  const count = Children.count(children);

  useEffect(() => {
    // Re-measure when the number of cards changes (e.g. filters).
    const timer = window.setTimeout(() => {
      ref.current?.dispatchEvent(new Event("scroll"));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [count, ref]);

  return (
    <div className={cn("flex flex-col gap-4 sm:gap-5", className)}>
      <SectionHeading
        title={title}
        subtitle={subtitle}
        href={href}
        linkLabel={linkLabel}
        aside={
          <div className="hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-full"
              onClick={() => step("prev")}
              disabled={bounds.atStart}
              aria-label={`محصولات قبلی در ${title}`}
            >
              <ChevronRight aria-hidden />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-full"
              onClick={() => step("next")}
              disabled={bounds.atEnd}
              aria-label={`محصولات بعدی در ${title}`}
            >
              <ChevronLeft aria-hidden />
            </Button>
          </div>
        }
      />

      <div
        ref={ref}
        data-rail
        role="group"
        aria-label={ariaLabel ?? title}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:gap-4 lg:snap-none"
      >
        {Children.map(children, (child, index) => (
          <div key={index} className={cardWidthClass}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}