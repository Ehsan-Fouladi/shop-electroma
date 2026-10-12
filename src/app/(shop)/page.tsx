import type { Metadata } from "next";

import { BlogPreview } from "@/components/home/blog-preview";
import { BrandWall } from "@/components/home/brand-wall";
import { CampaignSection } from "@/components/home/campaign-section";
import { CategoryDiscovery } from "@/components/home/category-discovery";
import { DealCard } from "@/components/home/deal-card";
import { EditorPick, type EditorPickGroup } from "@/components/home/editor-pick";
import { FlashSale } from "@/components/home/flash-sale";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { PromoStrip } from "@/components/home/promo-strip";
import { TrustServices } from "@/components/home/trust-services";
import { Container, Section } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { ProductRail } from "@/components/product/product-rail";
import {
  getDealProducts,
  getBestSellers,
  getNewArrivals,
  getRecommended,
  getSaleProducts,
  products,
} from "@/data/products";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | خرید کالای دیجیتال با ضمانت اصالت کالا`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

/** Editorial grid used inside the "منتخب سردبیر" tabs. */
function editorGrid(items: Product[]) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {items.map((product, index) => (
        <div key={product.id} className={cn(index >= 3 && "hidden sm:block")}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const flashDeals = getDealProducts(9);
  const flashDealIds = flashDeals.map((product) => product.id);

  const bestSellers = getBestSellers(10);
  const newArrivals = getNewArrivals(10);
  const saleProducts = getSaleProducts(10, flashDealIds);
  const recommended = getRecommended(10);

  const ratedPool = [...products].sort(
    (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
  );
  const pick = (categories: string[] | null) =>
    (categories
      ? ratedPool.filter((product) => categories.includes(product.categorySlug))
      : ratedPool
    ).slice(0, 6);

  const editorGroups: EditorPickGroup[] = [
    { value: "all", label: "همه", content: editorGrid(pick(null)) },
    {
      value: "mobile-phones",
      label: "موبایل",
      content: editorGrid(pick(["mobile-phones"])),
    },
    {
      value: "laptops",
      label: "لپ‌تاپ و تبلت",
      content: editorGrid(pick(["laptops", "tablets"])),
    },
    {
      value: "audio",
      label: "صوتی",
      content: editorGrid(pick(["headphones", "speakers"])),
    },
    {
      value: "accessories",
      label: "جانبی و گیمینگ",
      content: editorGrid(
        pick([
          "mobile-accessories",
          "computer-accessories",
          "chargers",
          "power-banks",
          "gaming-consoles",
          "monitors",
        ]),
      ),
    },
  ];

  return (
    <>
      <h1 className="sr-only">
        {siteConfig.name} — فروشگاه اینترنتی کالای دیجیتال با ضمانت اصالت کالا،
        ارسال سریع و پرداخت امن
      </h1>

      <HeroCarousel />

      <CategoryDiscovery />

      <PromoStrip />

      <FlashSale itemCount={flashDeals.length}>
        {flashDeals.map((product) => (
          <DealCard key={product.id} product={product} />
        ))}
      </FlashSale>

      <Section className="bg-surface-soft">
        <Container>
          <ProductRail
            title="پرفروش‌ترین‌ها"
            subtitle="محبوب‌ترین انتخاب‌های مشتریان الکتروما در این ماه"
            href="/products?sort=best-selling"
            linkLabel="مشاهده همه"
          >
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductRail>
        </Container>
      </Section>

      <Section>
        <Container>
          <ProductRail
            title="جدیدترین محصولات"
            subtitle="تازه‌ترین کالاهای اضافه‌شده به فروشگاه"
            href="/products?sort=newest"
            linkLabel="مشاهده همه"
          >
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductRail>
        </Container>
      </Section>

      <CampaignSection />

      <EditorPick groups={editorGroups} />

      <Section>
        <Container>
          <ProductRail
            title="بیشترین تخفیف‌ها"
            subtitle="بیشترین کاهش قیمت نسبت به قیمت پیشین"
            href="/deals"
            linkLabel="همه تخفیف‌ها"
          >
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductRail>
        </Container>
      </Section>

      <BrandWall />

      <Section className="bg-surface-soft">
        <Container>
          <ProductRail
            title="پیشنهادهای مناسب برای شما"
            subtitle="بر اساس امتیاز کاربران و بازدیدهای اخیر شما"
            href="/products"
            linkLabel="مشاهده همه"
          >
            {recommended.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductRail>
        </Container>
      </Section>

      <BlogPreview />

      <TrustServices />

      <NewsletterSection />
    </>
  );
}
