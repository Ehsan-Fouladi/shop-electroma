import Link from "next/link";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { Price } from "@/components/product/price";
import { ProductMedia } from "@/components/product/product-media";
import { toPersianDigits } from "@/lib/formatters/number";
import type { Product } from "@/types";

/** Offer card used inside the flash-sale band. */
export function DealCard({ product }: { product: Product }) {
  const sold = product.soldCount ?? Math.round(product.stock * 1.6);
  const total = product.offerTotal ?? sold + product.stock;
  const percent = Math.min(96, Math.round((sold / total) * 100));

  return (
    <article className="group flex h-full flex-col rounded-lg border border-line bg-surface p-3 transition-shadow hover:shadow-card">
      <Link
        href={`/product/${product.slug}`}
        className="relative mb-2.5 block aspect-square w-full overflow-hidden rounded-md border border-line-subtle bg-surface-soft"
      >
        <ProductMedia
          product={product}
          sizes="(max-width: 640px) 60vw, 260px"
          imageClassName="transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </Link>

      <h3 className="text-body-sm font-medium leading-7 text-foreground">
        <Link href={`/product/${product.slug}`} className="line-clamp-2 hover:text-brand">
          {product.title}
        </Link>
      </h3>

      <div className="mt-2">
        <Price price={product.price} oldPrice={product.oldPrice} />
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percent} درصد از موجودی این پیشنهاد فروخته شده است`}
        >
          <span
            className="block h-full rounded-full bg-gradient-to-l from-sale to-warning"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex items-center justify-between gap-2 text-caption">
          <span className="font-bold text-sale">{toPersianDigits(percent)}٪ فروش رفته</span>
          <span className="font-bold text-subtle-ink">
            {toPersianDigits(product.stock)} عدد باقی مانده
          </span>
        </div>
      </div>

      <div className="mt-3">
        <AddToCartButton
          productId={product.id}
          productTitle={product.title}
          className="w-full"
        />
      </div>
    </article>
  );
}