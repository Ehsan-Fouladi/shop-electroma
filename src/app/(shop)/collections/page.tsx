import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { curatedCollections } from "@/data/collections";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/constants/site";
import { toPersianDigits } from "@/lib/formatters/number";

export const metadata: Metadata = {
  title: "مجموعه‌های منتخب کالای دیجیتال",
  description:
    "مجموعه‌های برگزیده و کارشناسی‌شده الکتروما؛ ست گیمینگ، تجهیزات تولید محتوا، اکوسیستم اپل، هدفون‌های حرفه‌ای و ملزومات همراه.",
  alternates: { canonical: "/collections" },
  openGraph: {
    title: "مجموعه‌های منتخب کالای دیجیتال | الکتروما",
    description: "کالاهای منتخب بر اساس سناریوهای کاربری و تخصص شما.",
    url: "/collections",
    images: [siteConfig.defaultOgImage],
  },
};

export default function CollectionsPage() {
  return (
    <div className="flex flex-col">
      <div className="border-b border-line bg-gradient-to-b from-brand-soft/40 to-surface py-8 sm:py-12">
        <Container>
          <Breadcrumb
            items={[{ label: "خانه", href: "/" }, { label: "مجموعه‌ها" }]}
            className="mb-4"
          />
          <span className="rounded-full bg-brand-soft px-3 py-1 text-caption font-bold text-brand-active">
            مجموعه‌های موضوعی
          </span>
          <h1 className="mt-3 text-heading font-bold text-ink sm:text-display">
            مجموعه‌های برگزیده دیجیتال برای نیازهای مختلف
          </h1>
          <p className="mt-2 max-w-2xl text-body-sm text-subtle-ink leading-relaxed sm:text-body">
            اگر برای یک سناریوی خاص (مانند گیمینگ، تولید محتوا، دانشگاه یا محل
            کار) به دنبال ست کامل کالاها هستید، مجموعه‌های کارشناسی‌شده زیر
            بهترین پیشنهادها را گرد هم آورده‌اند.
          </p>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {curatedCollections.map((col) => {
              const matchedProducts = products.filter((p) =>
                col.productIds.includes(p.id),
              );
              return (
                <article
                  key={col.slug}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-caption font-bold text-brand-active">
                        {col.badge}
                      </span>
                      <span
                        className="font-mono text-caption text-subtle-ink"
                        dir="ltr"
                      >
                        {col.latinTitle}
                      </span>
                    </div>

                    <h2 className="mt-4 text-title font-bold text-ink transition-colors group-hover:text-brand-active">
                      {col.title}
                    </h2>
                    <p className="mt-1 text-caption font-medium text-brand">
                      {col.subtitle}
                    </p>
                    <p className="mt-2.5 text-body-sm text-subtle-ink leading-relaxed">
                      {col.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line-subtle pt-4 text-caption text-subtle-ink">
                      <span>کالاهای شاخص:</span>
                      {matchedProducts.slice(0, 2).map((p) => (
                        <span key={p.id} className="font-medium text-ink">
                          {p.title.split(" ").slice(0, 4).join(" ")} •
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-line bg-surface-soft p-4 px-6 flex items-center justify-between">
                    <span className="text-caption text-subtle-ink">
                      {toPersianDigits(matchedProducts.length)} کالای منتخب
                    </span>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="gap-1 font-bold text-brand"
                    >
                      <Link href={`/collections/${col.slug}`}>
                        مشاهده مجموعه
                        <ArrowLeft className="size-3.5" />
                      </Link>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}
