"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types";
import { useState } from "react";

// Genuine component-level lazy loading: modal chunk is loaded only when user triggers zoom
const ProductZoomDialog = dynamic(
  () =>
    import("@/components/product/detail/product-zoom-dialog").then(
      (m) => m.ProductZoomDialog,
    ),
  { ssr: false },
);

interface ProductGalleryProps {
  product: Product;
  /** Product assets or clearly-marked temporary demo items. */
  images: { src: string; alt: string; isDemo?: boolean }[];
  /** Server-rendered fallback for records without a photo. */
  fallback?: React.ReactNode;
  className?: string;
}

/**
 * Product media area. It supports any number of real product photos while
 * keeping the existing designed fallback for products without photography.
 */
export function ProductGallery({
  product,
  images,
  fallback,
  className,
}: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const total = images.length;
  const hasImage = total > 0;
  const hasMultiple = total > 1;
  const isDemoGallery = images.some((image) => image.isDemo);
  const currentIndex = total ? ((index % total) + total) % total : 0;
  const current = images[currentIndex];

  // Keep every control on the same zero-based sequence: next is index + 1,
  // previous is index - 1. In RTL, next is physically to the left.
  const navigate = (direction: "previous" | "next") => {
    if (!hasMultiple) return;

    setIndex((selectedIndex) => {
      const activeIndex = ((selectedIndex % total) + total) % total;
      return direction === "next"
        ? (activeIndex + 1) % total
        : (activeIndex + total - 1) % total;
    });
  };

  const showNext = () => navigate("next");
  const showPrevious = () => navigate("previous");

  return (
    <>
      <div
        role="region"
        aria-label="تصاویر محصول"
        className={cn("flex min-w-0 flex-col gap-3", className)}
      >
        <div className="relative overflow-hidden rounded-lg border border-line bg-surface p-2.5 shadow-soft sm:p-3">
          <div className="relative aspect-square w-full overflow-hidden rounded-md bg-surface-soft">
            {current ? (
              <button
                type="button"
                aria-label={
                  current.isDemo
                    ? `بزرگ‌نمایی تصویر نمایشی ${toPersianDigits(currentIndex + 1)} از ${toPersianDigits(total)} برای ${product.title}`
                    : `بزرگ‌نمایی تصویر محصول: ${product.title}`
                }
                aria-haspopup="dialog"
                aria-expanded={viewerOpen}
                aria-controls="product-image-viewer"
                title="نمایش تصویر در اندازه بزرگ‌تر"
                onClick={() => setViewerOpen(true)}
                className="absolute inset-0 z-0 grid cursor-zoom-in place-items-center rounded-md focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Image
                  key={`${current.src}-${currentIndex}`}
                  src={current.src}
                  alt={current.alt}
                  fill
                  priority={currentIndex === 0}
                  loading={currentIndex === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 620px"
                  className="object-contain p-4 sm:p-8"
                />
                <span
                  aria-hidden
                  className="absolute bottom-3 end-3 z-10 grid size-9 place-items-center rounded-full bg-surface/90 text-subtle-ink shadow-soft backdrop-blur"
                >
                  <ZoomIn className="size-4" />
                </span>
              </button>
            ) : (
              fallback
            )}
          </div>

          {/* RTL flex places the first (Previous) control on the right and Next on the left. */}
          {hasMultiple ? (
            <div className="absolute inset-x-3 bottom-3 z-20 flex items-center justify-between gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="bg-surface/90 backdrop-blur"
                aria-label="تصویر قبلی"
                title="تصویر قبلی"
                onClick={showPrevious}
              >
                <ChevronRight aria-hidden />
              </Button>
              <span
                aria-live="polite"
                aria-atomic="true"
                className="rounded-xs bg-surface/90 px-2 py-1 text-caption text-body tabular backdrop-blur"
              >
                تصویر {toPersianDigits(currentIndex + 1)} از{" "}
                {toPersianDigits(total)}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="bg-surface/90 backdrop-blur"
                aria-label="تصویر بعدی"
                title="تصویر بعدی"
                onClick={showNext}
              >
                <ChevronLeft aria-hidden />
              </Button>
            </div>
          ) : null}
        </div>

        {hasMultiple ? (
          <>
            {isDemoGallery ? (
              <p className="rounded-sm bg-warning-soft px-3 py-2 text-caption text-warning">
                گالری نمایشی است؛ همین تصویر برای قابل‌آزمایش بودن کنترل‌ها سه
                بار تکرار شده است.
              </p>
            ) : null}
            <div
              role="group"
              aria-label={
                isDemoGallery
                  ? "انتخاب تصویر نمایشی محصول"
                  : "انتخاب تصویر محصول"
              }
              className="no-scrollbar flex max-w-full touch-pan-x gap-2 overflow-x-auto overscroll-x-contain rounded-md p-1"
            >
              {images.map((image, itemIndex) => (
                <button
                  key={`${image.src}-${itemIndex}`}
                  type="button"
                  aria-label={image.alt}
                  aria-pressed={itemIndex === currentIndex}
                  onClick={() => setIndex(itemIndex)}
                  className={cn(
                    "relative size-16 shrink-0 overflow-hidden rounded-md border bg-surface transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-20",
                    itemIndex === currentIndex
                      ? "border-primary ring-2 ring-primary/20 shadow-soft"
                      : "border-line hover:border-line-strong",
                  )}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain p-1.5"
                  />
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>

      {hasImage && viewerOpen ? (
        <ProductZoomDialog
          open={viewerOpen}
          onOpenChange={setViewerOpen}
          product={product}
          images={images}
          currentIndex={currentIndex}
          onNavigate={navigate}
        />
      ) : null}
    </>
  );
}
