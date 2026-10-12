import Link from "next/link";
import { Check } from "lucide-react";

import { getBrand } from "@/data/brands";
import { getCategory, getSubcategoryLabel } from "@/data/categories";
import { availabilityFor, productDescription } from "@/lib/product/detail";
import type { Product } from "@/types";

/**
 * Description section: an intro built from the record's own facts, the key
 * highlights the catalogue stores and an identity fact table. Semantic headings
 * keep the (short) copy scannable instead of one long paragraph.
 */
export function ProductOverview({ product }: { product: Product }) {
  const brand = getBrand(product.brandSlug);
  const category = getCategory(product.categorySlug);
  const availability = availabilityFor(product);
  const paragraphs = productDescription(product);

  const subcategoryLabels =
    category?.children
      ?.filter((child) => product.subcategories?.includes(child.slug))
      .map((child) => ({
        slug: child.slug,
        title: getSubcategoryLabel(child.slug) || child.title,
      })) ?? [];

  const facts: { label: string; value: string; href?: string }[] = [
    ...(brand ? [{ label: "برند", value: brand.title, href: `/brand/${brand.slug}` }] : []),
    ...(category
      ? [{ label: "دسته‌بندی", value: category.title, href: `/category/${category.slug}` }]
      : []),
    ...(subcategoryLabels.length
      ? [
          {
            label: "زیردسته",
            value: subcategoryLabels.map((item) => item.title).join("، "),
          },
        ]
      : []),
    { label: "فروشنده", value: product.seller },
    { label: "گارانتی", value: product.warranty },
    { label: "وضعیت", value: availability.label },
  ];

  return (
    <section
      aria-labelledby="overview-title"
      className="flex flex-col gap-4 rounded-lg border border-line bg-card p-4 shadow-soft sm:p-5"
    >
      <h2 id="overview-title" className="text-title font-bold text-ink">
        معرفی محصول
      </h2>

      <div className="flex flex-col gap-3">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-body-sm text-body sm:text-body">
            {paragraph}
          </p>
        ))}
      </div>

      {product.highlights.length ? (
        <div className="flex flex-col gap-2.5 border-t border-line-subtle pt-4">
          <h3 className="text-body-sm font-bold text-ink">نکات کلیدی</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-body-sm text-body">
                <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-col gap-2.5 border-t border-line-subtle pt-4">
        <h3 className="text-body-sm font-bold text-ink">در یک نگاه</h3>
        <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-baseline justify-between gap-4">
              <dt className="shrink-0 text-body-sm text-subtle-ink">{fact.label}</dt>
              <dd className="text-end text-body-sm font-medium text-ink">
                {fact.href ? (
                  <Link href={fact.href} className="transition-colors hover:text-brand">
                    {fact.value}
                  </Link>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}