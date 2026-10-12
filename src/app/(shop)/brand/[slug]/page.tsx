import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LayoutGrid, ShieldCheck, Tag, Wallet } from "lucide-react";

import { BrandWallLite } from "@/components/catalog/brand-wall-lite";
import { CatalogHeader, StatPill } from "@/components/catalog/catalog-layout";
import { CatalogResults } from "@/components/catalog/catalog-results";
import { EmptyResults } from "@/components/catalog/empty-results";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { BrandLogo } from "@/components/product/brand-logo";
import { getBrand } from "@/data/brands";
import { getCategory } from "@/data/categories";
import { catalogHref, parseCatalogQuery, type CatalogSearchParams } from "@/lib/catalog/query";
import { buildCatalogFacets, filterProducts, priceBounds, sortProducts } from "@/lib/catalog/results";
import { productsByBrand, statsFor } from "@/lib/catalog/stats";
import { formatNumber, toPersianDigits } from "@/lib/formatters/number";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: "برند یافت نشد" };

  return {
    title: `محصولات ${brand.title}`,
    description: `خرید محصولات ${brand.title} (${brand.latin}) از فروشگاه الکتروما؛ مشاهده فیلترها، قیمت‌ها و امتیاز کاربران.`,
    alternates: { canonical: `/brand/${brand.slug}` },
  };
}

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<CatalogSearchParams>;
}) {
  const [{ slug }, rawParams] = await Promise.all([params, searchParams]);
  const brand = getBrand(slug);
  if (!brand) notFound();

  const basePath = `/brand/${brand.slug}`;
  const scope = productsByBrand(brand.slug);
  const query = parseCatalogQuery(rawParams);

  const results = sortProducts(filterProducts(scope, query), query);
  const facets = buildCatalogFacets(scope, query, basePath);
  const bounds = priceBounds(scope);
  const stats = statsFor(scope);

  // Category chips are derived from the brand's own catalogue slice.
  const categorySlugs = [...new Set(scope.map((product) => product.categorySlug))];
  const categoryChips = categorySlugs
    .map((categorySlug) => ({
      slug: categorySlug,
      title: getCategory(categorySlug)?.title ?? categorySlug,
      count: scope.filter((product) => product.categorySlug === categorySlug).length,
    }))
    .sort((a, b) => b.count - a.count);

  const summary =
    stats.count === 0
      ? `در حال حاضر کالایی از ${brand.title} در کاتالوگ موجود نیست.`
      : `${formatNumber(stats.count)} کالا از ${brand.title} در ${
          categoryChips.length
        } دسته‌بندی ${categoryChips
          .slice(0, 3)
          .map((chip) => chip.title)
          .join("، ")}${categoryChips.length > 3 ? " و دیگر دسته‌ها" : ""} موجود است.`;

  return (
    <Container className="flex flex-col gap-5 py-4 sm:gap-6 sm:py-6 lg:py-8">
      <Breadcrumb
        items={[
          { label: "خانه", href: "/" },
          { label: "برندها", href: "/brands" },
          { label: brand.title },
        ]}
      />

      {/* Brand identity header */}
      <section
        aria-label={`معرفی برند ${brand.title}`}
        className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-4 shadow-soft sm:p-5 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex items-start gap-4">
          <span className="grid size-16 shrink-0 place-items-center rounded-lg border border-line bg-surface-soft">
            <BrandLogo
              mark={brand.mark}
              label={brand.title}
              latin={brand.latin}
              className="size-9 text-ink"
            />
          </span>
          <div className="min-w-0">
            <h1 className="text-heading font-bold text-ink sm:text-heading-lg">{brand.title}</h1>
            <p className="mt-0.5 text-label text-disabled-ink" dir="ltr">
              {brand.latin}
            </p>
            <p className="mt-2 max-w-2xl text-body-sm text-body">{summary}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <StatPill
              icon={<LayoutGrid className="size-3.5" aria-hidden />}
              value={toPersianDigits(stats.count)}
              label="کالا"
            />
            {stats.count > 0 ? (
              <>
                <StatPill
                  icon={<Tag className="size-3.5" aria-hidden />}
                  value={toPersianDigits(stats.discountedCount)}
                  label="تخفیف‌دار"
                />
                <StatPill
                  icon={<ShieldCheck className="size-3.5" aria-hidden />}
                  value={toPersianDigits(stats.avgRating.toFixed(1))}
                  label="میانگین امتیاز"
                />
                <StatPill
                  icon={<Wallet className="size-3.5" aria-hidden />}
                  value={`${formatNumber(stats.price.min)} تا ${formatNumber(stats.price.max)}`}
                  label="تومان"
                />
              </>
            ) : null}
          </div>

          {categoryChips.length ? (
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {categoryChips.map((chip) => (
                <li key={chip.slug}>
                  <Link
                    href={catalogHref(basePath, query, { categories: [chip.slug], page: 1 })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-label text-body transition-colors hover:border-primary/25 hover:bg-brand-soft hover:text-brand-active"
                  >
                    {chip.title}
                    <span className="tabular text-caption text-disabled-ink">
                      {toPersianDigits(chip.count)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <CatalogHeader
        headingLevel="h2"
        title={`محصولات ${brand.title}`}
        description="برای محدود کردن نتایج، از فیلترهای دسته‌بندی، قیمت، موجودی و امتیاز کاربران استفاده کنید."
      />

      <CatalogResults
        query={query}
        basePath={basePath}
        results={results}
        facets={facets}
        bounds={bounds}
        show={{ categories: true, subcategories: false, brands: false, colors: true }}
        empty={
          <EmptyResults
            title={`کالایی از ${brand.title} با این فیلترها پیدا نشد`}
            description="فیلترهای انتخابی با محصولات این برند مطابقت ندارد؛ فیلترها را حذف کنید یا برند دیگری را ببینید."
            clearHref={catalogHref(basePath, query, {
              categories: [],
              colors: [],
              minPrice: null,
              maxPrice: null,
              availableOnly: false,
              discountedOnly: false,
              minRating: null,
            })}
            suggestions={
              categoryChips.length
                ? {
                    title: "دسته‌بندی‌های این برند",
                    items: categoryChips.slice(0, 6).map((chip) => ({
                      label: chip.title,
                      href: `/category/${chip.slug}`,
                      hint: String(chip.count),
                    })),
                  }
                : undefined
            }
          />
        }
      />

      <section aria-labelledby="other-brands" className="flex flex-col gap-4 pt-1">
        <div className="flex items-end justify-between gap-4">
          <h2 id="other-brands" className="text-title font-bold text-ink">
            برندهای دیگر
          </h2>
          <Link
            href="/brands"
            className="text-label font-medium text-brand transition-colors hover:text-brand-hover"
          >
            همه برندها
          </Link>
        </div>
        <BrandWallLite limit={6} exclude={brand.slug} />
      </section>
    </Container>
  );
}
