import Link from "next/link";
import { CheckCircle2, TriangleAlert } from "lucide-react";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { Price } from "@/components/product/price";
import { ProductMedia } from "@/components/product/product-media";
import { ProductBadges } from "@/components/product/product-badge";
import { ProductCardActions } from "@/components/product/product-card-actions";
import { Rating } from "@/components/product/rating";
import { Separator } from "@/components/ui/separator";
import { getBrand } from "@/data/brands";
import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

/** Primary commerce unit reused by every rail, grid and collection. */
export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const brand = getBrand(product.brandSlug);
  const lowStock = product.stock <= 8;
  const specLine = product.specs
    .slice(0, 2)
    .map((spec) => spec.value)
    .join(" • ");

  return (
    <article
      className={cn(
        "@container group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card focus-within:border-line-strong",
        className,
      )}
    >
      <div className="relative p-2 @[200px]:p-2.5">
        <Link
          href={`/product/${product.slug}`}
          className="block rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          tabIndex={-1}
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-md bg-surface-soft">
            <ProductMedia
              product={product}
              priority={priority}
              sizes="(max-width: 640px) 72vw, (max-width: 1024px) 45vw, 320px"
              imageClassName="transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </Link>

        <ProductBadges product={product} />
        <ProductCardActions product={product} />
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3.5 pb-3">
        {brand ? (
          <span className="text-caption font-medium text-subtle-ink">{brand.title}</span>
        ) : null}

        <h3 className="text-body-sm font-medium leading-6 text-ink">
          <Link href={`/product/${product.slug}`} className="line-clamp-2 hover:text-brand">
            {product.title}
          </Link>
        </h3>

        <div className="flex items-center gap-1.5">
          <Rating value={product.rating} />
          <span className="hidden text-caption font-bold text-disabled-ink @[205px]:inline">
            ({toPersianDigits(product.reviewCount.toLocaleString("en-US"))} نظر)
          </span>
        </div>

        <p className="hidden truncate text-caption text-disabled-ink @[190px]:block">
          {specLine}
        </p>
      </div>

      <Separator className="bg-line-subtle" />

      <div className="mt-auto flex flex-col gap-2.5 px-3.5 pb-3.5 pt-3">
        <Price
          price={product.price}
          oldPrice={product.oldPrice}
          valueClassName="text-[0.95rem] @[210px]:text-title-sm @[266px]:text-title"
        />

        <div className="flex flex-col gap-2 @[215px]:flex-row @[215px]:items-center @[215px]:justify-between">
          <span
            className={cn(
              "flex items-center gap-1 text-caption font-bold",
              lowStock ? "text-warning" : "text-success",
            )}
          >
            {lowStock ? (
              <TriangleAlert className="size-3.5" aria-hidden />
            ) : (
              <CheckCircle2 className="size-3.5" aria-hidden />
            )}
            {lowStock ? `تنها ${toPersianDigits(product.stock)} عدد` : "موجود در انبار"}
          </span>

          <AddToCartButton
            productId={product.id}
            productTitle={product.title}
            className="w-full @[215px]:w-auto"
          />
        </div>
      </div>
    </article>
  );
}