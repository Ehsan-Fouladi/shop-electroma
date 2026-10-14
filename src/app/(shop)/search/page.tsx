import type { Metadata } from "next";
import Link from "next/link";
import { Boxes, Search, TrendingUp } from "lucide-react";

import { CatalogHeader, StatPill } from "@/components/catalog/catalog-layout";
import { CatalogResults } from "@/components/catalog/catalog-results";
import { CategoryCard } from "@/components/catalog/category-card";
import { EmptyResults } from "@/components/catalog/empty-results";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { SearchField } from "@/components/navigation/search-field";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { popularSearches, recentSearches } from "@/data/navigation";
import { products } from "@/data/products";
import {
  catalogHref,
  parseCatalogQuery,
  type CatalogSearchParams,
} from "@/lib/catalog/query";
import {
  buildCatalogFacets,
  filterProducts,
  normalizeText,
  priceBounds,
  sortProducts,
} from "@/lib/catalog/results";
import {
  brandCountByCategory,
  categoryCounts,
  statsFor,
} from "@/lib/catalog/stats";
import { toPersianDigits } from "@/lib/formatters/number";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const raw = params.q;
  const term = (Array.isArray(raw) ? raw[0] : raw)?.trim();

  return {
    title: term ? `نتایج جستجو برای «${term}»` : "جستجو",
    description:
      "جستجو در کاتالوگ الکتروما؛ نتایج را بر اساس دسته‌بندی، برند، قیمت، موجودی و امتیاز کاربران محدود کنید.",
    alternates: { canonical: "/search" },
    // Result pages are query-specific and intentionally kept out of the index.
    robots: { index: false },
  };
}

const BASE_PATH = "/search";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  const params = await searchParams;
  const query = parseCatalogQuery(params);
  // Search results default to relevance ordering unless the visitor chose another sort.
  if (!params.sort) query.sort = "relevance";

  const counts = categoryCounts();
  const brandsByCategory = brandCountByCategory();
  const topCategories = [...categories]
    .map((category) => ({ category, count: counts.get(category.slug) ?? 0 }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  /* ------------------------------ No query yet ----------------------------- */
  if (!query.q) {
    return (
      <Container className="flex flex-col gap-6 py-4 sm:gap-8 sm:py-6 lg:py-8">
        <CatalogHeader
          breadcrumb={
            <Breadcrumb
              items={[{ label: "خانه", href: "/" }, { label: "جستجو" }]}
            />
          }
          title="جستجو در الکتروما"
          description="نام محصول، برند یا دسته‌بندی مورد نظر را وارد کنید. همچنین می‌توانید از جستجوهای پرطرفدار زیر شروع کنید."
        />

        <div className="mx-auto w-full max-w-3xl">
          <SearchField size="lg" tone="elevated" autoFocusOnMount />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <section
            aria-labelledby="popular-searches"
            className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 shadow-soft sm:p-5"
          >
            <h2
              id="popular-searches"
              className="flex items-center gap-2 text-body-sm font-bold text-ink"
            >
              <TrendingUp className="size-4 text-brand" aria-hidden />
              جستجوهای پرطرفدار
            </h2>
            <ul className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <li key={term}>
                  <Link
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="inline-flex rounded-full border border-line bg-surface px-3 py-1.5 text-label text-body transition-colors hover:border-primary/25 hover:bg-brand-soft hover:text-brand-active"
                  >
                    {term}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="recent-searches"
            className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 shadow-soft sm:p-5"
          >
            <h2
              id="recent-searches"
              className="flex items-center gap-2 text-body-sm font-bold text-ink"
            >
              <Search className="size-4 text-subtle-ink" aria-hidden />
              جستجوهای اخیر
            </h2>
            <ul className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <li key={term}>
                  <Link
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="inline-flex rounded-full border border-line bg-surface px-3 py-1.5 text-label text-body transition-colors hover:border-primary/25 hover:bg-brand-soft hover:text-brand-active"
                  >
                    {term}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section
          aria-labelledby="search-categories"
          className="flex flex-col gap-4"
        >
          <div className="flex items-end justify-between gap-4">
            <h2
              id="search-categories"
              className="text-title font-bold text-ink"
            >
              دسته‌بندی‌های محبوب
            </h2>
            <Link
              href="/categories"
              className="text-label font-medium text-brand transition-colors hover:text-brand-hover"
            >
              همه دسته‌بندی‌ها
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {topCategories.map(({ category, count }) => (
              <li key={category.slug}>
                <CategoryCard
                  category={category}
                  productCount={count}
                  brandCount={brandsByCategory.get(category.slug) ?? 0}
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        </section>
      </Container>
    );
  }

  /* ------------------------------ With a query ----------------------------- */
  const scope = products;
  const results = sortProducts(filterProducts(scope, query), query);
  const facets = buildCatalogFacets(scope, query, BASE_PATH);
  const bounds = priceBounds(scope);
  const stats = statsFor(results);

  const normalizedQuery = normalizeText(query.q);
  const matchingCategories = categories
    .filter((category) =>
      normalizeText(category.title).includes(normalizedQuery),
    )
    .sort((a, b) => (counts.get(b.slug) ?? 0) - (counts.get(a.slug) ?? 0))
    .slice(0, 6);

  const fallbackProducts = [...products]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 4);

  const clearFiltersHref = catalogHref(BASE_PATH, query, {
    categories: [],
    brands: [],
    colors: [],
    minPrice: null,
    maxPrice: null,
    availableOnly: false,
    discountedOnly: false,
    minRating: null,
  });

  return (
    <Container className="flex flex-col gap-5 py-4 sm:gap-6 sm:py-6 lg:py-8">
      <CatalogHeader
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "خانه", href: "/" },
              { label: "جستجو", href: "/search" },
              { label: query.q },
            ]}
          />
        }
        title={`نتایج جستجو برای «${query.q}»`}
        description="نتایج بر اساس ارتباط با عبارت جستجو مرتب شده‌اند؛ می‌توانید مرتب‌سازی و فیلترها را تغییر دهید."
        meta={
          <>
            <StatPill
              icon={<Search className="size-3.5" aria-hidden />}
              value={toPersianDigits(results.length)}
              label="کالای یافت‌شده"
            />
            {results.length > 0 ? (
              <>
                <StatPill
                  icon={<Boxes className="size-3.5" aria-hidden />}
                  value={toPersianDigits(stats.categoryCount)}
                  label="دسته‌بندی"
                />
                <StatPill
                  icon={<TrendingUp className="size-3.5" aria-hidden />}
                  value={toPersianDigits(stats.discountedCount)}
                  label="کالای تخفیف‌دار"
                />
              </>
            ) : null}
          </>
        }
      />

      <div className="mx-auto w-full max-w-3xl">
        <SearchField
          key={query.q}
          size="lg"
          tone="elevated"
          defaultValue={query.q}
        />
      </div>

      <CatalogResults
        query={query}
        basePath={BASE_PATH}
        results={results}
        facets={facets}
        bounds={bounds}
        show={{
          categories: true,
          subcategories: false,
          brands: true,
          colors: true,
        }}
        empty={
          <div className="flex flex-col gap-5">
            <EmptyResults
              title={`نتیجه‌ای برای «${query.q}» پیدا نشد`}
              description="املای عبارت را بررسی کنید، از کلمات کلی‌تر استفاده کنید یا یکی از مسیرهای پیشنهادی زیر را انتخاب کنید."
              clearHref={clearFiltersHref}
              clearLabel="حذف فیلترها و نمایش همه نتایج"
              suggestions={{
                title: "جستجوهای پرطرفدار",
                items: popularSearches.map((term) => ({
                  label: term,
                  href: `/search?q=${encodeURIComponent(term)}`,
                })),
              }}
            />

            {matchingCategories.length ? (
              <section
                aria-labelledby="search-suggested-categories"
                className="flex flex-col gap-3"
              >
                <h2
                  id="search-suggested-categories"
                  className="text-title font-bold text-ink"
                >
                  دسته‌بندی‌های مرتبط
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {matchingCategories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/category/${category.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-label text-body transition-colors hover:border-primary/25 hover:bg-brand-soft hover:text-brand-active"
                      >
                        {category.title}
                        <span className="tabular text-caption text-disabled-ink">
                          {toPersianDigits(counts.get(category.slug) ?? 0)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section
              aria-labelledby="search-fallback"
              className="flex flex-col gap-4"
            >
              <div className="flex items-end justify-between gap-4">
                <h2
                  id="search-fallback"
                  className="text-title font-bold text-ink"
                >
                  پیشنهادهای محبوب
                </h2>
                <Button asChild variant="outline" size="sm">
                  <Link href="/products">همه محصولات</Link>
                </Button>
              </div>
              <ProductGrid products={fallbackProducts} />
            </section>
          </div>
        }
      />
    </Container>
  );
}
