import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LayoutGrid, ShieldCheck, Tag, Wallet } from "lucide-react";

import { CatalogHeader, StatPill } from "@/components/catalog/catalog-layout";
import { CatalogResults } from "@/components/catalog/catalog-results";
import { EmptyResults } from "@/components/catalog/empty-results";
import { SubcategoryNav } from "@/components/catalog/subcategory-nav";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { getCategory, getSubcategoryLabel } from "@/data/categories";
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
import { productsBySubcategory, statsFor } from "@/lib/catalog/stats";
import { formatNumber, toPersianDigits } from "@/lib/formatters/number";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subcategory: string }>;
}): Promise<Metadata> {
  const { slug, subcategory } = await params;
  const category = getCategory(slug);
  const child = category?.children?.find((item) => item.slug === subcategory);

  if (!category || !child) return { title: "زیردسته یافت نشد" };

  return {
    title: `${child.title} — ${category.title}`,
    description: `خرید ${child.title} از دسته‌بندی ${category.title} در فروشگاه الکتروما؛ مشاهده قیمت، امتیاز کاربران و موجودی.`,
    alternates: { canonical: `/category/${category.slug}/${child.slug}` },
  };
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; subcategory: string }>;
  searchParams: Promise<CatalogSearchParams>;
}) {
  const [{ slug, subcategory }, rawParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const category = getCategory(slug);
  const child = category?.children?.find((item) => item.slug === subcategory);
  if (!category || !child) notFound();

  const basePath = `/category/${category.slug}/${child.slug}`;
  const title = getSubcategoryLabel(child.slug);
  const scope = productsBySubcategory(category.slug, child.slug);
  const query = parseCatalogQuery(rawParams);

  const results = sortProducts(filterProducts(scope, query), query);
  const facets = buildCatalogFacets(scope, query, basePath);
  const bounds = priceBounds(scope);
  const stats = statsFor(scope);

  const siblingLinks = (category.children ?? [])
    .map((sibling) => ({
      slug: sibling.slug,
      title: getSubcategoryLabel(sibling.slug),
      count: productsBySubcategory(category.slug, sibling.slug).length,
      href: `/category/${category.slug}/${sibling.slug}`,
      active: sibling.slug === child.slug,
    }))
    .filter((link) => link.count > 0);

  return (
    <Container className="flex flex-col gap-5 py-4 sm:gap-6 sm:py-6 lg:py-8">
      <CatalogHeader
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "خانه", href: "/" },
              { label: "دسته‌بندی‌ها", href: "/categories" },
              { label: category.title, href: `/category/${category.slug}` },
              { label: title },
            ]}
          />
        }
        title={`${title} ${category.title}`}
        description={
          category.description
            ? `زیردسته ${title} از ${category.title}. ${category.description}`
            : `محصولات زیردسته ${title} در دسته‌بندی ${category.title}.`
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
        links={siblingLinks}
        allHref={`/category/${category.slug}`}
        allActive={false}
        label={`سایر زیردسته‌های ${category.title}`}
      />

      <CatalogResults
        query={query}
        basePath={basePath}
        results={results}
        facets={facets}
        bounds={bounds}
        show={{
          categories: false,
          subcategories: false,
          brands: true,
          colors: true,
        }}
        empty={
          <EmptyResults
            title={`در «${title}» کالایی با این فیلترها پیدا نشد`}
            description="فیلترها را حذف کنید یا زیردسته دیگری از این دسته‌بندی را ببینید."
            clearHref={catalogHref(basePath, query, {
              brands: [],
              colors: [],
              minPrice: null,
              maxPrice: null,
              availableOnly: false,
              discountedOnly: false,
              minRating: null,
            })}
            suggestions={{
              title: "زیردسته‌های دیگر این دسته‌بندی",
              items: siblingLinks
                .filter((link) => !link.active)
                .slice(0, 6)
                .map((link) => ({
                  label: link.title,
                  href: link.href,
                  hint: String(link.count),
                })),
            }}
          />
        }
      />
    </Container>
  );
}
