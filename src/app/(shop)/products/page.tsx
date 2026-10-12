import type { Metadata } from "next";
import Link from "next/link";
import { LayoutGrid, ShieldCheck, Tag, Users } from "lucide-react";

import { CatalogHeader, StatPill } from "@/components/catalog/catalog-layout";
import { CatalogResults } from "@/components/catalog/catalog-results";
import { EmptyResults, EmptySearchHint } from "@/components/catalog/empty-results";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { BrandWallLite } from "@/components/catalog/brand-wall-lite";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { catalogHref, parseCatalogQuery, type CatalogSearchParams } from "@/lib/catalog/query";
import { buildCatalogFacets, filterProducts, priceBounds, sortProducts } from "@/lib/catalog/results";
import { categoryCounts, statsFor } from "@/lib/catalog/stats";
import { toPersianDigits } from "@/lib/formatters/number";

export const metadata: Metadata = {
  title: "همه محصولات",
  description:
    "کاتالوگ کامل کالای دیجیتال الکتروما؛ فیلتر بر اساس دسته‌بندی، برند، قیمت، موجودی و امتیاز کاربران و مرتب‌سازی نتایج.",
  alternates: { canonical: "/products" },
};

const BASE_PATH = "/products";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  const params = await searchParams;
  const query = parseCatalogQuery(params);

  const results = sortProducts(filterProducts(products, query), query);
  const facets = buildCatalogFacets(products, query, BASE_PATH);
  const bounds = priceBounds(products);
  const stats = statsFor(products);
  const counts = categoryCounts();

  // Category context: only categories that currently hold products.
  const topCategories = [...categories]
    .map((category) => ({ category, count: counts.get(category.slug) ?? 0 }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <Container className="flex flex-col gap-5 py-4 sm:gap-6 sm:py-6 lg:py-8">
      <CatalogHeader
        breadcrumb={
          <Breadcrumb items={[{ label: "خانه", href: "/" }, { label: "همه محصولات" }]} />
        }
        title="همه محصولات"
        description="کاتالوگ کامل کالای دیجیتال الکتروما. با فیلترهای دسته‌بندی، برند، قیمت و امتیاز کاربران دقیقاً همان چیزی را پیدا کنید که می‌خواهید."
        meta={
          <>
            <StatPill
              icon={<LayoutGrid className="size-3.5" aria-hidden />}
              value={toPersianDigits(stats.count)}
              label="کالا"
            />
            <StatPill
              icon={<Tag className="size-3.5" aria-hidden />}
              value={toPersianDigits(stats.discountedCount)}
              label="کالای تخفیف‌دار"
            />
            <StatPill
              icon={<Users className="size-3.5" aria-hidden />}
              value={toPersianDigits(stats.brandCount)}
              label="برند"
            />
            <StatPill
              icon={<ShieldCheck className="size-3.5" aria-hidden />}
              value={toPersianDigits(stats.avgRating.toFixed(1))}
              label="میانگین امتیاز"
            />
          </>
        }
      />

      {/* Category context — quick entry into the most stocked categories */}
      <nav aria-label="ورود سریع به دسته‌بندی‌ها" className="flex flex-col gap-2">
        <p className="text-label font-medium text-subtle-ink">دسته‌بندی‌های پرکالا</p>
        <ul className="no-scrollbar flex flex-wrap gap-2">
          {topCategories.map(({ category, count }) => (
            <li key={category.slug}>
              <Link
                href={`/category/${category.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-label text-body transition-colors hover:border-primary/25 hover:bg-brand-soft hover:text-brand-active"
              >
                {category.title}
                <span className="tabular text-caption text-disabled-ink">
                  {toPersianDigits(count)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <CatalogResults
        query={query}
        basePath={BASE_PATH}
        results={results}
        facets={facets}
        bounds={bounds}
        empty={
          <EmptyResults
            title="کالایی با این فیلترها پیدا نشد"
            description="فیلترهای انتخابی با هیچ محصولی در کاتالوگ مطابقت ندارد. می‌توانید فیلترها را حذف کنید یا جستجوی خود را تغییر دهید."
            clearHref={catalogHref(BASE_PATH, query, {
              categories: [],
              brands: [],
              subcategories: [],
              colors: [],
              minPrice: null,
              maxPrice: null,
              availableOnly: false,
              discountedOnly: false,
              minRating: null,
            })}
            suggestions={{
              title: "دسته‌بندی‌های پرکالا",
              items: topCategories.slice(0, 6).map(({ category, count }) => ({
                label: category.title,
                href: `/category/${category.slug}`,
                hint: String(count),
              })),
            }}
          />
        }
      />

      <EmptySearchHint className="pb-2" />

      <section aria-labelledby="products-brands" className="flex flex-col gap-4 pt-1">
        <div className="flex items-end justify-between gap-4">
          <h2 id="products-brands" className="text-title font-bold text-ink">
            خرید بر اساس برند
          </h2>
          <Link
            href="/brands"
            className="text-label font-medium text-brand transition-colors hover:text-brand-hover"
          >
            همه برندها
          </Link>
        </div>
        <BrandWallLite limit={6} />
      </section>
    </Container>
  );
}
