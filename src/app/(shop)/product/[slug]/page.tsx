import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { ProductMedia } from "@/components/product/product-media";
import { ProductRail } from "@/components/product/product-rail";
import { ProductViewTracker } from "@/components/product/product-view-tracker";
import { ProductAssurance } from "@/components/product/detail/product-assurance";
import { ProductGallery } from "@/components/product/detail/product-gallery";
import { ProductIdentity } from "@/components/product/detail/product-identity";
import { ProductOverview } from "@/components/product/detail/product-overview";
import { ProductPriceCard } from "@/components/product/detail/product-price-card";
import { ProductPurchasePanel } from "@/components/product/detail/product-purchase-panel";
import { ProductReviews } from "@/components/product/detail/product-reviews";
import { ProductSpecs } from "@/components/product/detail/product-specs";
import { getBrand } from "@/data/brands";
import { getCategory } from "@/data/categories";
import {
  getProduct,
  getRecommended,
  getRelatedProducts,
  getSameBrandProducts,
  products,
} from "@/data/products";
import { siteConfig } from "@/lib/constants/site";
import {
  availabilityFor,
  catalogueCode,
  colorSwatch,
  galleryImages,
  productBreadcrumb,
  productJsonLd,
  productMetaDescription,
} from "@/lib/product/detail";

/** The catalogue is local and finite, so every product page is prerendered. */
export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "کالا پیدا نشد" };

  const path = `/product/${product.slug}`;
  const description = productMetaDescription(product);

  return {
    title: product.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: siteConfig.name,
      title: product.title,
      description,
      url: path,
      ...(product.image ? { images: [{ url: product.image, alt: product.title }] } : {}),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const brand = getBrand(product.brandSlug);
  const category = getCategory(product.categorySlug);
  const availability = availabilityFor(product);
  const images = galleryImages(product);
  const code = catalogueCode(product);

  const related = getRelatedProducts(product, 8);
  const sameBrand = getSameBrandProducts(product, 8);
  const recommended = getRecommended(12)
    .filter((item) => item.id !== product.id)
    .slice(0, 8);

  // Only records that really carry offer numbers get a progress indicator.
  const offer =
    typeof product.soldCount === "number" && typeof product.offerTotal === "number" && product.offerTotal > 0
      ? { sold: product.soldCount, total: product.offerTotal }
      : undefined;

  const url = `${siteConfig.url}/product/${product.slug}`;
  const jsonLd = JSON.stringify(productJsonLd(product, url)).replace(/</g, "\\u003c");

  return (
    <Container className="flex flex-col gap-5 py-4 sm:gap-6 sm:py-6 lg:py-8">
      <ProductViewTracker productId={product.id} />
      <script
        type="application/ld+json"
        // Structured data mirrors the record's real rating, price and stock.
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Breadcrumb items={productBreadcrumb(product)} />

      {/* Product media + buy column */}
      <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-5 xl:grid-cols-[minmax(0,1.06fr)_minmax(0,1fr)]">
        <ProductGallery
          product={product}
          images={images}
          fallback={
            <ProductMedia
              product={product}
              priority
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 620px"
            />
          }
        />

        <div className="flex flex-col gap-4">
          <ProductIdentity product={product} code={code} />
          <ProductPriceCard product={product} availability={availability} />
          <ProductPurchasePanel
            productId={product.id}
            productTitle={product.title}
            price={product.price}
            stock={product.stock}
            colors={product.colors.map((name) => ({ name, swatch: colorSwatch(name) }))}
            outOfStock={availability.state === "out"}
            offer={offer}
          />
          <ProductAssurance product={product} />
        </div>
      </div>

      {/* Description and full specification table */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-5">
        <ProductOverview product={product} />
        <ProductSpecs product={product} />
      </div>

      <ProductReviews product={product} />

      {/* Discovery */}
      {related.length ? (
        <ProductRail
          title="محصولات مشابه"
          subtitle="کالاهایی با دسته‌بندی و مشخصات نزدیک به این محصول"
          href={category ? `/category/${category.slug}` : "/products"}
          linkLabel={category ? `مشاهده ${category.title}` : "همه محصولات"}
          ariaLabel="محصولات مشابه"
        >
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </ProductRail>
      ) : null}

      {brand && sameBrand.length ? (
        <ProductRail
          title={`سایر محصولات ${brand.title}`}
          subtitle="دیگر کالاهای همین برند در کاتالوگ الکتروما"
          href={`/brand/${brand.slug}`}
          linkLabel="مشاهده برند"
          ariaLabel={`سایر محصولات ${brand.title}`}
        >
          {sameBrand.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </ProductRail>
      ) : null}

      {recommended.length ? (
        <ProductRail
          title="پیشنهاد الکتروما"
          subtitle="کالاهای با امتیاز بالا که کاربران دیگر دیده‌اند"
          href="/products"
          linkLabel="همه محصولات"
          ariaLabel="پیشنهاد الکتروما"
        >
          {recommended.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </ProductRail>
      ) : null}

      <p className="text-caption text-disabled-ink">
        همه قیمت‌ها به تومان است. برای مشاهده شرایط ارسال و بازگشت کالا، صفحه{" "}
        <Link href="/support/faq" className="font-medium text-brand hover:text-brand-hover">
          پرسش‌های متداول
        </Link>{" "}
        را ببینید.
      </p>
    </Container>
  );
}
