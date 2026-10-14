import type { Metadata } from "next";
import Link from "next/link";
import { Boxes, ChevronLeft, LayoutGrid, Users } from "lucide-react";

import { CatalogHeader, StatPill } from "@/components/catalog/catalog-layout";
import { CategoryCard } from "@/components/catalog/category-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, getSubcategoryLabel } from "@/data/categories";
import { products } from "@/data/products";
import {
  brandCountByCategory,
  categoryCounts,
  productsBySubcategory,
  statsFor,
} from "@/lib/catalog/stats";
import { toPersianDigits } from "@/lib/formatters/number";

export const metadata: Metadata = {
  title: "دسته‌بندی‌ها",
  description:
    "همه دسته‌بندی‌های کالای دیجیتال الکتروما؛ از گوشی موبایل و لپ‌تاپ تا هدفون، ساعت هوشمند، گیمینگ و لوازم جانبی.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  const stats = statsFor(products);
  const brandsByCategory = brandCountByCategory();
  const counts = categoryCounts();

  // Categories with stock come first, so the page never opens on empty shelves.
  const ordered = [...categories].sort((a, b) => {
    const countA = counts.get(a.slug) ?? 0;
    const countB = counts.get(b.slug) ?? 0;
    if (countA === 0 && countB === 0)
      return a.title.localeCompare(b.title, "fa");
    if (countA === 0) return 1;
    if (countB === 0) return -1;
    return countB - countA;
  });

  // Popular subcategories: only ones that actually contain products.
  const subcategoryGroups = categories
    .map((category) => ({
      category,
      children: (category.children ?? [])
        .map((child) => ({
          slug: child.slug,
          title: getSubcategoryLabel(child.slug),
          count: productsBySubcategory(category.slug, child.slug).length,
        }))
        .filter((child) => child.count > 0),
    }))
    .filter((group) => group.children.length > 0);

  return (
    <Container className="flex flex-col gap-6 py-4 sm:gap-8 sm:py-6 lg:py-8">
      <CatalogHeader
        breadcrumb={
          <Breadcrumb
            items={[{ label: "خانه", href: "/" }, { label: "دسته‌بندی‌ها" }]}
          />
        }
        title="دسته‌بندی‌ها"
        description="کل کاتالوگ الکتروما در یک نگاه. دسته‌بندی مناسب را انتخاب کنید تا محصولات، فیلترها و امتیاز کاربران همان دسته را ببینید."
        meta={
          <>
            <StatPill
              icon={<LayoutGrid className="size-3.5" aria-hidden />}
              value={toPersianDigits(categories.length)}
              label="دسته‌بندی"
            />
            <StatPill
              icon={<Boxes className="size-3.5" aria-hidden />}
              value={toPersianDigits(stats.count)}
              label="کالا"
            />
            <StatPill
              icon={<Users className="size-3.5" aria-hidden />}
              value={toPersianDigits(stats.brandCount)}
              label="برند"
            />
          </>
        }
        action={
          <Button asChild variant="outline">
            <Link href="/products">
              همه محصولات
              <ChevronLeft aria-hidden />
            </Link>
          </Button>
        }
      />

      <section aria-labelledby="all-categories" className="flex flex-col gap-4">
        <h2 id="all-categories" className="sr-only">
          همه دسته‌بندی‌ها
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {ordered.map((category, index) => (
            <li key={category.slug}>
              <CategoryCard
                category={category}
                productCount={counts.get(category.slug) ?? 0}
                brandCount={brandsByCategory.get(category.slug) ?? 0}
                priority={index < 4}
                className="h-full"
              />
            </li>
          ))}
        </ul>
      </section>

      {subcategoryGroups.length ? (
        <section
          aria-labelledby="popular-subcategories"
          className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4 shadow-soft sm:p-5"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2
                id="popular-subcategories"
                className="text-title font-bold text-ink"
              >
                زیردسته‌های پرطرفدار
              </h2>
              <p className="mt-1 text-body-sm text-subtle-ink">
                مسیرهای کوتاه‌تر برای رسیدن به محصولات پرفروش هر دسته
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {subcategoryGroups.map((group) => (
              <div key={group.category.slug} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/category/${group.category.slug}`}
                    className="text-body-sm font-bold text-ink transition-colors hover:text-brand"
                  >
                    {group.category.title}
                  </Link>
                  <Badge variant="secondary" className="tabular">
                    {toPersianDigits(group.children.length)} زیردسته
                  </Badge>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.children.map((child) => (
                    <li key={child.slug}>
                      <Link
                        href={`/category/${group.category.slug}/${child.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-label text-body transition-colors hover:border-primary/25 hover:bg-brand-soft hover:text-brand-active"
                      >
                        {child.title}
                        <span className="tabular text-caption text-disabled-ink">
                          {toPersianDigits(child.count)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
