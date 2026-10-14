import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { BrandLogo } from "@/components/product/brand-logo";
import { featuredBrands } from "@/data/brands";
import { formatNumber } from "@/lib/formatters/number";

/**
 * Brand discovery wall. Every tile links to the brand route, so it works as a
 * real navigation surface instead of decoration.
 */
export function BrandWall() {
  return (
    <Section aria-labelledby="brands-title">
      <Container className="flex flex-col gap-4 sm:gap-5">
        <SectionHeading
          title="برندهای معتبر"
          subtitle="خرید از میان برندهای پیشرو حوزه کالای دیجیتال"
          href="/brands"
          linkLabel="همه برندها"
        />
        <h2 id="brands-title" className="sr-only">
          برندهای فروشگاه
        </h2>

        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-6 lg:gap-3">
          {featuredBrands.map((brand) => (
            <li key={brand.slug}>
              <Link
                href={`/brand/${brand.slug}`}
                className="group flex h-full flex-col items-center gap-2 rounded-lg border border-line bg-card px-3 py-4 text-center transition-[border-color,box-shadow] hover:border-primary/25 hover:shadow-soft"
              >
                <BrandLogo
                  mark={brand.mark}
                  label={brand.title}
                  latin={brand.latin}
                  className="size-7 text-disabled-ink transition-colors group-hover:text-ink"
                />
                <span className="text-label font-medium text-body transition-colors group-hover:text-brand-active">
                  {brand.title}
                </span>
                <span className="tabular text-caption text-disabled-ink">
                  {formatNumber(brand.productCount)} کالا
                </span>
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/brands"
              className="group flex h-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-line-strong bg-surface-soft px-3 py-4 text-center transition-colors hover:border-primary/40 hover:bg-brand-soft"
            >
              <span className="text-label font-medium text-brand-active">
                مشاهده همه
              </span>
              <ChevronLeft
                className="size-4 text-brand transition-transform group-hover:-translate-x-0.5"
                aria-hidden
              />
            </Link>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
