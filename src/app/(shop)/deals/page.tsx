import type { Metadata } from "next";
import { Flame, Sparkles } from "lucide-react";

import { DealsView } from "@/components/deals/deals-view";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container, Section } from "@/components/layout/container";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "پیشنهادهای شگفت‌انگیز و تخفیف‌های ویژه",
  description:
    "بهترین تخفیف‌های روز انواع گوشی موبایل، لپ‌تاپ، هدفون، ساعت هوشمند و لوازم جانبی دیجیتال با گارانتی معتبر شرکتی در الکتروما.",
  alternates: { canonical: "/deals" },
  openGraph: {
    title: "پیشنهادهای شگفت‌انگیز و تخفیف‌های ویژه | الکتروما",
    description:
      "تخفیف‌های ویژه روزانه، کدهای تخفیف فعال و جشنواره‌های فروش کالای دیجیتال اصل.",
    url: "/deals",
    images: [siteConfig.defaultOgImage],
  },
};

export default function DealsPage() {
  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <div className="border-b border-line bg-gradient-to-b from-sale-soft/50 to-surface py-8 sm:py-12">
        <Container>
          <Breadcrumb
            items={[{ label: "خانه", href: "/" }, { label: "پیشنهادهای ویژه" }]}
            className="mb-4"
          />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid size-10 place-items-center rounded-xl bg-sale text-white shadow-soft">
                  <Flame className="size-6" aria-hidden />
                </span>
                <span className="rounded-full bg-sale-soft px-3 py-1 text-caption font-bold text-sale">
                  جشنواره تخفیف‌های شگفت‌انگیز
                </span>
              </div>
              <h1 className="mt-3 text-heading font-bold text-ink sm:text-display">
                تخفیف‌های داغ و پیشنهادهای منتخب الکتروما
              </h1>
              <p className="mt-1.5 max-w-2xl text-body-sm text-subtle-ink leading-relaxed sm:text-body">
                بهترین کالاهای دیجیتال با بالاترین درصد تخفیف، گارانتی معتبر و
                ارسال سریع به سراسر کشور.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <DealsView products={products} />
        </Container>
      </Section>
    </div>
  );
}
