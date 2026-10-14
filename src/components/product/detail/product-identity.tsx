import Link from "next/link";

import { Rating } from "@/components/product/rating";
import { BrandLogo } from "@/components/product/brand-logo";
import { productBadgeLabels } from "@/components/product/product-badge";
import { Badge } from "@/components/ui/badge";
import { ProductShareButton } from "@/components/product/detail/product-share-button";
import { getBrand } from "@/data/brands";
import type { Product } from "@/types";

/**
 * Identity block of the product column: brand, badges, title, rating, share
 * action and store article number. The share control remains an isolated client island.
 */
export function ProductIdentity({
  product,
  code,
}: {
  product: Product;
  code: string;
}) {
  const brand = getBrand(product.brandSlug);
  const recordBadge = product.badge
    ? productBadgeLabels[product.badge]
    : undefined;

  // Sale treatment belongs in the price card; keep only non-sale identity badges here.
  const badges: { label: string; variant: "sale" | "success" | "ink" }[] = [];
  if (recordBadge && recordBadge.variant !== "sale") {
    badges.push({ label: recordBadge.label, variant: recordBadge.variant });
  }
  if (product.isNew && !badges.some((badge) => badge.label === "جدید")) {
    badges.push({ label: "جدید", variant: "success" });
  }
  if (
    product.isBestSeller &&
    !badges.some((badge) => badge.label === "پرفروش")
  ) {
    badges.push({ label: "پرفروش", variant: "ink" });
  }

  return (
    <header className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {brand ? (
          <Link
            href={`/brand/${brand.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-2.5 py-1 text-label font-medium text-body transition-colors hover:bg-brand-soft hover:text-brand-active"
          >
            <BrandLogo
              mark={brand.mark}
              label={brand.title}
              latin={brand.latin}
              className="size-3.5"
            />
            {brand.title}
          </Link>
        ) : null}

        {badges.map((badge) => (
          <Badge key={badge.label} variant={badge.variant} className="tabular">
            {badge.label}
          </Badge>
        ))}
      </div>

      <h1 className="text-title font-bold leading-8 text-ink sm:text-heading sm:leading-9">
        {product.title}
      </h1>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Rating
          value={product.rating}
          reviewCount={product.reviewCount}
          size="default"
        />
        <Link
          href="#reviews"
          className="text-label font-medium text-brand transition-colors hover:text-brand-hover"
        >
          مشاهده و ثبت نظر
        </Link>
        <ProductShareButton productTitle={product.title} />
        <span className="text-label text-disabled-ink">
          شناسه کالا:{" "}
          <span className="tabular font-medium text-subtle-ink" dir="ltr">
            {code}
          </span>
        </span>
      </div>
    </header>
  );
}
