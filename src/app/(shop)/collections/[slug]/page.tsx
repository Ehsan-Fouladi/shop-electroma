import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container, Section } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { curatedCollections, getCollection } from "@/data/collections";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/constants/site";
import { toPersianDigits } from "@/lib/formatters/number";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "مجموعه یافت نشد" };

  return {
    title: `${collection.title} — ${collection.subtitle}`,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title: `${collection.title} | ${siteConfig.name}`,
      description: collection.description,
      url: `/collections/${collection.slug}`,
      images: [siteConfig.defaultOgImage],
    },
  };
}

export function generateStaticParams() {
  return curatedCollections.map((c) => ({ slug: c.slug }));
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const collectionProducts = products.filter((p) => collection.productIds.includes(p.id));

  return (
    <div className="flex flex-col">
      <div className="border-b border-line bg-gradient-to-b from-brand-soft/40 to-surface py-8 sm:py-12">
        <Container>
          <Breadcrumb
            items={[
              { label: "خانه", href: "/" },
              { label: "مجموعه‌ها", href: "/collections" },
              { label: collection.title },
            ]}
            className="mb-4"
          />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-soft px-3 py-1 text-caption font-bold text-brand-active">
                {collection.badge}
              </span>
              <span className="font-mono text-caption text-subtle-ink" dir="ltr">
                {collection.latinTitle}
              </span>
            </div>

            <h1 className="mt-2 text-heading font-bold text-ink sm:text-display">
              {collection.title}
            </h1>
            <p className="text-body font-medium text-brand">{collection.subtitle}</p>
            <p className="mt-1 max-w-2xl text-body-sm text-subtle-ink leading-relaxed sm:text-body">
              {collection.description}
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="mb-6 flex items-center justify-between text-body-sm text-subtle-ink">
            <p>
              شامل <span className="font-bold text-ink">{toPersianDigits(collectionProducts.length)}</span> محصول منتخب و سازگار با یکدیگر
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/collections" className="gap-1">
                <ArrowRight className="size-3.5" />
                همه مجموعه‌ها
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {collectionProducts.map((prod, index) => (
              <ProductCard key={prod.id} product={prod} priority={index < 2} />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
