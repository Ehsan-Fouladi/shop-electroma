import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { CategoryIcon } from "@/components/category/category-icon";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import {
  categoryFeatureTiles,
  categoryImageTiles,
  discoveryChips,
  getCategory,
} from "@/data/categories";
import { formatNumber } from "@/lib/formatters/number";

/**
 * Category discovery. Desktop uses a two-tier grid (three large image tiles on
 * top of a six-up row); mobile turns the hero tiles into a snapped rail and
 * keeps the compact tiles in a 2-column grid so nothing is clipped.
 */
export function CategoryDiscovery() {
  return (
    <Section aria-labelledby="home-categories" className="!pt-6 pb-0 sm:!pt-8 lg:!pt-10">
      <Container className="flex flex-col gap-4 sm:gap-5">
        <SectionHeading
          title="دسته‌بندی‌ها"
          subtitle="سریع‌ترین مسیر تا محصول مورد نظر شما"
          href="/products"
          linkLabel="همه دسته‌بندی‌ها"
        />

        <h2 id="home-categories" className="sr-only">
          دسته‌بندی‌های فروشگاه
        </h2>

        <div data-rail aria-label="دسته‌بندی‌های تصویری" className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:-mx-6 sm:gap-4 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {categoryImageTiles.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group relative w-[72%] shrink-0 snap-start overflow-hidden rounded-lg border border-line bg-card shadow-soft transition-shadow hover:shadow-raised sm:w-[52%] lg:w-auto"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-surface-soft">
                <Image
                  src={category.image!}
                  alt={category.title}
                  fill
                  sizes="(max-width: 1024px) 72vw, 430px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 sm:p-4">
                <div className="min-w-0 text-white">
                  <p className="truncate text-body-lg font-bold">{category.title}</p>
                  <p className="mt-0.5 text-label text-white/80">
                    {formatNumber(category.productCount)} کالا
                    {category.highlight ? ` • ${category.highlight}` : ""}
                  </p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-white group-hover:text-ink">
                  <ChevronLeft className="size-4" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {categoryFeatureTiles.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-line bg-card transition-[border-color,box-shadow] hover:border-line-strong hover:shadow-soft"
            >
              <div className="relative aspect-[5/4] w-full overflow-hidden bg-surface-soft">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-soft via-surface to-surface-muted"
                  >
                    <span className="grid size-11 place-items-center rounded-md bg-surface/85 text-brand shadow-soft">
                      <CategoryIcon name={category.icon} className="size-5" />
                    </span>
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                <span className="truncate text-body-sm font-medium text-foreground transition-colors group-hover:text-brand-active">
                  {category.title}
                </span>
                <span className="tabular shrink-0 text-caption text-disabled-ink">
                  {formatNumber(category.productCount)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-label text-subtle-ink">دسته‌های بیشتر:</span>
          {discoveryChips.map((slug) => {
            const category = getCategory(slug);
            if (!category) return null;
            return (
              <Link
                key={slug}
                href={`/category/${category.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-label text-body transition-colors hover:border-primary/25 hover:bg-brand-soft hover:text-brand-active"
              >
                <CategoryIcon name={category.icon} className="size-3.5" />
                {category.title}
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}