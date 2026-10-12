import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LayoutGrid, ShieldCheck, Tag, Wallet } from "lucide-react";

import { CatalogHeader, StatPill } from "@/components/catalog/catalog-layout";
import { CatalogResults } from "@/components/catalog/catalog-results";
import { CategoryCard } from "@/components/catalog/category-card";
import { EmptyResults } from "@/components/catalog/empty-results";
import { SubcategoryNav } from "@/components/catalog/subcategory-nav";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { getCategory, getSubcategoryLabel, categories } from "@/data/categories";
import {
  catalogHref,
  parseCatalogQuery,
  type CatalogSearchParams,
} from "@/lib/catalog/query";
import {
  buildCatalogFacets,
  filterProducts,
  priceBounds,
  sortProducts,
} from "@/lib/catalog/results";
import {
  brandCountByCategory,
  categoryCounts,
  productsByCategory,
  productsBySubcategory,
  statsFor,
} from "@/lib/catalog/stats";
import { formatNumber, toPersianDigits } from "@/lib/formatters/number";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "دسته‌بندی یافت نشد" };

  return {
    title: category.title,
    description:
      category.description ??
      `خرید ${category.title} از فروشگاه اینترنتی الکتروما با ضمانت اصالت کالا و ارسال سریع.`,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<CatalogSearchParams>;
}) {
  const [{ slug }, rawParams] = await Promise.all([params, searchParams]);
  const category = getCategory(slug);
  if (!category) notFound();

  const basePath = `/category/${category.slug}`;
  const scope = productsByCategory(category.slug);
  const query = parseCatalogQuery(rawParams);

  const results = sortProducts(filterProducts(scope, query), query);
  const facets = buildCatalogFacets(scope, query, basePath);
  const bounds = priceBounds(scope);
  const stats = statsFor(scope);
  const counts = categoryCounts();
  const brandsByCategory = brandCountByCategory();

  const subcategoryLinks = (category.children ?? [])
    .map((child) => ({
      slug: child.slug,
      title: getSubcategoryLabel(child.slug),
      count: productsBySubcategory(category.slug, child.slug).length,
      href: `${basePath}/${child.slug}`,
    }))
    .filter((link) => link.count > 0);

  const relatedCategories = [...categories]
    .filter(
      (item) => item.slug !== category.slug && (counts.get(item.slug) ?? 0) > 0,
    )
    .sort(
      (a, b) => (counts.get(b.slug) ?? 0) - (counts.get(a.slug) ?? 0),
    )
    .slice(0, 4);

  return (
    <Container className="flex flex-col gap-5 py-4 sm:gap-6 sm:py-6 lg:py-8">
      <CatalogHeader
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "خانه", href: "/" },
              { label: "دسته‌بندی‌ها", href: "/categories" },
              { label: category.title },
            ]}
          />
        }
        title={category.title}
        description={
          category.description ??
          `همه محصولات دسته‌بندی ${category.title} همراه با فیلتر برند، قیمت و موجودی.`
        }
        meta={
          <>
            <StatPill
              icon={<LayoutGrid className="size-3.5" aria-hidden />}
              value={toPersianDigits(stats.count)}
              label="کالای موجود"
            />
            {stats.count > 0 ? (
              <>
                <StatPill
                  icon={<Tag className="size-3.5" aria-hidden />}
                  value={toPersianDigits(stats.discountedCount)}
                  label="کالای تخفیف‌دار"
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
          </>
        }
      />

      <SubcategoryNav
        links={subcategoryLinks}
        allHref={basePath}
        allActive
        label="زیردسته‌های این دسته‌بندی"
      />

      <CatalogResults
        query={query}
        basePath={basePath}
        results={results}
        facets={facets}
        bounds={bounds}
        show={{ categories: false, subcategories: true, brands: true, colors: true }}
        empty={
          <EmptyResults
            title={`کالایی در «${category.title}» با این فیلترها پیدا نشد`}
            description="فیلترهای انتخابی با محصولات این دسته مطابقت ندارد. فیلترها را حذف کنید یا یکی از زیردسته‌های موجود را ببینید."
            clearHref={catalogHref(basePath, query, {
              brands: [],
              colors: [],
              minPrice: null,
              maxPrice: null,
              availableOnly: false,
              discountedOnly: false,
              minRating: null,
            })}
            suggestions={
              subcategoryLinks.length
                ? {
                    title: "زیردسته‌های دارای کالا",
                    items: subcategoryLinks.slice(0, 6).map((link) => ({
                      label: link.title,
                      href: link.href,
                      hint: String(link.count),
                    })),
                  }
                : undefined
            }
          />
        }
      />

      {relatedCategories.length ? (
        <section aria-labelledby="related-categories" className="flex flex-col gap-4 pt-1">
          <h2 id="related-categories" className="text-title font-bold text-ink">
            دسته‌بندی‌های مرتبط
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {relatedCategories.map((item) => (
              <li key={item.slug}>
                <CategoryCard
                  category={item}
                  productCount={counts.get(item.slug) ?? 0}
                  brandCount={brandsByCategory.get(item.slug) ?? 0}
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Container>
  );
}
