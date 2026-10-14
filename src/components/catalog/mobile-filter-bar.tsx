"use client";

import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

interface MobileFilterBarProps {
  /** Server-rendered filter panel. */
  children: React.ReactNode;
  activeCount: number;
  resultCount: number;
  clearAllHref: string;
  className?: string;
}

/**
 * Mobile filter entry point: opens the same filter panel in a drawer, with a
 * live result count and a clear-all action pinned to the bottom.
 */
export function MobileFilterBar({
  children,
  activeCount,
  resultCount,
  clearAllHref,
  className,
}: MobileFilterBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className={cn("lg:hidden", className)}>
          <SlidersHorizontal aria-hidden />
          فیلترها
          {activeCount > 0 ? (
            <Badge variant="brand" className="tabular ms-1">
              {toPersianDigits(activeCount)}
            </Badge>
          ) : null}
        </Button>
      </SheetTrigger>

      <SheetContent side="start" className="p-0">
        <SheetHeader className="ps-5 pe-14">
          <SheetTitle className="text-title">فیلترها</SheetTitle>
          <SheetDescription className="sr-only">
            محدود کردن نتایج بر اساس دسته‌بندی، برند، قیمت و سایر ویژگی‌ها
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line bg-surface p-4">
          <Link
            href={clearAllHref}
            className="text-label font-medium text-brand transition-colors hover:text-brand-hover"
          >
            حذف فیلترها
          </Link>
          <p className="text-body-sm text-body">
            <span className="tabular font-bold text-ink">
              {toPersianDigits(resultCount)}
            </span>{" "}
            کالا
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
