"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toPersianDigits } from "@/lib/formatters/number";
import type { Product } from "@/types";
import { useRef } from "react";

export interface ProductZoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  images: { src: string; alt: string; isDemo?: boolean }[];
  currentIndex: number;
  onNavigate: (direction: "previous" | "next") => void;
}

/**
 * Dedicated fullscreen product photo viewer.
 * Code-split via next/dynamic to defer loading Radix dialog and zoom logic until user clicks zoom.
 */
export function ProductZoomDialog({
  open,
  onOpenChange,
  product,
  images,
  currentIndex,
  onNavigate,
}: ProductZoomDialogProps) {
  const total = images.length;
  const hasMultiple = total > 1;
  const current = images[currentIndex];

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? null;
    if (touchEndX !== null) {
      const delta = touchStartX.current - touchEndX;
      if (Math.abs(delta) > 40) {
        if (delta > 0) {
          onNavigate("next");
        } else {
          onNavigate("previous");
        }
      }
    }
    touchStartX.current = null;
  };

  const handleArrowNavigation = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!hasMultiple) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onNavigate("next");
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      onNavigate("previous");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        id="product-image-viewer"
        onKeyDown={handleArrowNavigation}
        className="h-[min(90dvh,56rem)] w-[calc(100%-1rem)] max-w-6xl grid-rows-[auto_minmax(0,1fr)] gap-2 overflow-hidden p-2 sm:gap-3 sm:p-4"
      >
        <DialogHeader className="pe-8">
          <DialogTitle className="line-clamp-1 text-body-sm sm:text-body">
            نمایش بزرگ تصویر {product.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {hasMultiple
              ? `${current?.isDemo ? "این گالری نمایشی است و تصویر یکسان تکرار شده است. " : ""}تصویر ${toPersianDigits(currentIndex + 1)} از ${toPersianDigits(total)}. برای جابه‌جایی از کلیدهای جهت‌نمای چپ و راست استفاده کنید.`
              : "برای بستن نمایش بزرگ کلید Escape را بزنید."}
          </DialogDescription>
        </DialogHeader>

        {current ? (
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative min-h-0 w-full overflow-hidden rounded-md bg-surface-soft"
          >
            <Image
              key={`viewer-${current.src}-${currentIndex}`}
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 90vw"
              className="object-contain p-1 sm:p-3"
            />

            {hasMultiple ? (
              <>
                <div className="pointer-events-none absolute inset-x-2 inset-y-0 z-10 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="pointer-events-auto bg-surface/90 shadow-soft backdrop-blur"
                    aria-label="تصویر قبلی"
                    title="تصویر قبلی"
                    onClick={() => onNavigate("previous")}
                  >
                    <ChevronRight aria-hidden />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="pointer-events-auto bg-surface/90 shadow-soft backdrop-blur"
                    aria-label="تصویر بعدی"
                    title="تصویر بعدی"
                    onClick={() => onNavigate("next")}
                  >
                    <ChevronLeft aria-hidden />
                  </Button>
                </div>
                <span
                  aria-live="polite"
                  aria-atomic="true"
                  className="absolute inset-x-0 bottom-3 z-10 mx-auto w-fit rounded-full bg-surface/90 px-3 py-1.5 text-caption text-body tabular backdrop-blur"
                >
                  تصویر {toPersianDigits(currentIndex + 1)} از{" "}
                  {toPersianDigits(total)}
                </span>
              </>
            ) : null}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
