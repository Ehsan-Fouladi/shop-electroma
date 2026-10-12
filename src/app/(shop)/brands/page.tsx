import type { Metadata } from "next";
import { Boxes, LayoutGrid, Star } from "lucide-react";

import { BrandCard } from "@/components/catalog/brand-card";
import { BrandSearchInput } from "@/components/catalog/brand-search-input";
import { CatalogHeader, StatPill } from "@/components/catalog/catalog-layout";
import { EmptyResults } from "@/components/catalog/empty-results";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { brands } from "@/data/brands";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";
import { normalizeText } from "@/lib/catalog/results";
import { brandCounts, statsFor } from "@/lib/catalog/stats";
import { toPersianDigits } from "@/lib/formatters/number";

export const metadata: Metadata = {
  title: "برندها",
  description:
    "برندهای موجود در فروشگاه الکتروما؛ اپل، سامسونگ، شیائومی، سونی، لنوو، ایسوس، جی‌بی‌ال، انکر و دیگر برندهای معتبر کالای دیجیتال.",
  alternates: { canonical: "/brands" },
};

/** Category labels a brand currently covers — derived from the catalogue. */
function categoriesForBrand(brandSlug: string): string[] {
  const slugs = new Set(
    products
      .filter((product) => product.brandSlug === brandSlug)
      .map((product) => product.categorySlug),
  );
  return [...slugs].map((slug) => getCategory(slug)?.title ?? slug);
}

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params.q;
  const term = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";

  const counts = brandCounts();
  const stats = statsFor(products);

  const normalizedTerm = normalizeText(term);
  const filtered = brands.filter((brand) => {
    if (!normalizedTerm) return true;
    return (
      normalizeText(brand.title).includes(normalizedTerm) ||
      normalizeText(brand.latin).includes(normalizedTerm)
    );
  });

  // Featured brands lead the list, then the busiest brands first.
  const withCounts = filtered
    .map((brand) => ({
      brand,
      count: counts.get(brand.slug) ?? 0,
      categories: categoriesForBrand(brand.slug),
    }))
    .sort(
      (a, b) =>
        Number(Boolean(b.brand.featured)) - Number(Boolean(a.brand.featured)) ||
        b.count - a.count ||
        a.brand.title.localeCompare(b.brand.title, "fa"),
    );

  const isSearching = Boolean(term);

  return (
    <Container className="flex flex-col gap-6 py-4 sm:gap-8 sm:py-6 lg:py-8">
      <CatalogHeader
        breadcrumb={<Breadcrumb items={[{ label: "خانه", href: "/" }, { label: "برندها" }]} />}
        title="برندها"
        description="برندهای فعال در کاتالوگ الکتروما. با انتخاب هر برند، همه محصولات آن برند همراه با فیلتر دسته‌بندی و قیمت نمایش داده می‌شود."
        meta={
          <>
            <StatPill
              icon={<LayoutGrid className="size-3.5" aria-hidden />}
              value={toPersianDigits(brands.length)}
              label="برند"
            />
            <StatPill
              icon={<Boxes className="size-3.5" aria-hidden />}
              value={toPersianDigits(stats.count)}
              label="کالا"
            />
            <StatPill
              icon={<Star className="size-3.5" aria-hidden />}
              value={toPersianDigits(stats.avgRating.toFixed(1))}
              label="میانگین امتیاز کالاها"
            />
          </>
        }
      />

      <BrandSearchInput initialValue={term} />

      {withCounts.length === 0 ? (
        <EmptyResults
          title={`برندی با عبارت «${term}» پیدا نشد`}
          description="نام برند را به فارسی یا انگلیسی امتحان کنید یا فهرست کامل برندها را ببینید."
          clearHref="/brands"
          clearLabel="نمایش همه برندها"
          suggestions={{
            title: "برندهای فعال",
            items: brands
              .filter((brand) => (counts.get(brand.slug) ?? 0) > 0)
              .slice(0, 8)
              .map((brand) => ({
                label: brand.title,
                href: `/brand/${brand.slug}`,
                hint: String(counts.get(brand.slug) ?? 0),
              })),
          }}
        />
      ) : (
        <section aria-labelledby="all-brands" className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="all-brands" className="text-title font-bold text-ink">
                {isSearching ? `نتایج برند برای «${term}»` : "برندهای الکتروما"}
              </h2>
              <p className="mt-1 text-body-sm text-subtle-ink">
                برندهای دارای نشان «برند ویژه» در ابتدای فهرست قرار دارند.
              </p>
            </div>
            <p className="text-label text-subtle-ink">
              <span className="tabular font-bold text-ink">
                {toPersianDigits(withCounts.length)}
              </span>{" "}
              برند
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {withCounts.map((entry) => (
              <li key={entry.brand.slug}>
                <BrandCard
                  brand={entry.brand}
                  productCount={entry.count}
                  categories={entry.categories.slice(0, 2)}
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
