"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { Price } from "@/components/product/price";
import { ProductMedia } from "@/components/product/product-media";
import { Rating } from "@/components/product/rating";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getBrand } from "@/data/brands";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types";

/** Compact product preview opened from the card without leaving the homepage. */
export function QuickViewDialog({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const brand = getBrand(product.brandSlug);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          className={cn("bg-surface/95 backdrop-blur", className)}
          aria-label={`مشاهده سریع ${product.title}`}
        >
          <Eye aria-hidden />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg sm:max-w-2xl max-sm:h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="pe-8 text-body-lg leading-8 sm:text-title">
            {product.title}
          </DialogTitle>
          <DialogDescription>
            {brand ? `${brand.title} • ` : ""}
            مشاهده سریع مشخصات و افزودن سریع به سبد خرید
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-5">
          <div className="relative aspect-square overflow-hidden rounded-md border border-line bg-surface-soft">
            <ProductMedia
              product={product}
              sizes="(max-width: 640px) 60vw, 220px"
              imageClassName="!object-cover !p-0"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Rating value={product.rating} reviewCount={product.reviewCount} />
            <Price
              price={product.price}
              oldPrice={product.oldPrice}
              size="lg"
            />
            <dl className="grid grid-cols-1 gap-1.5 text-body-sm sm:grid-cols-2">
              {product.specs.slice(0, 4).map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between gap-3 rounded-sm bg-surface-soft px-2.5 py-1.5"
                >
                  <dt className="text-subtle-ink">{spec.label}</dt>
                  <dd className="font-medium text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-2">
            <AddToCartButton
              productId={product.id}
              productTitle={product.title}
              size="default"
            />
            <Button asChild variant="outline" size="default">
              <Link href={`/product/${product.slug}`}>مشاهده صفحه محصول</Link>
            </Button>
          </div>
          <p className="text-caption text-subtle-ink">{product.warranty}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
