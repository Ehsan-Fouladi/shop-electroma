import Link from "next/link";
import {
  BadgeCheck,
  ChevronLeft,
  FileText,
  Headset,
  PackageSearch,
  ShieldCheck,
} from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants/site";

const securePurchasePoints = [
  { icon: ShieldCheck, label: "پرداخت امن از طریق درگاه بانکی" },
  { icon: BadgeCheck, label: "ضمانت اصالت و گارانتی معتبر کالا" },
  { icon: FileText, label: "صدور فاکتور رسمی و ساده" },
];

/**
 * Customer-service band: how to reach support, track an order and what backs a
 * purchase. Content stays inside what the project already states elsewhere.
 */
export function TrustServices() {
  return (
    <Section className="bg-surface-soft" aria-labelledby="trust-title">
      <Container className="flex flex-col gap-4 sm:gap-5">
        <SectionHeading
          title="پشتیبانی و خدمات مشتریان"
          subtitle="از انتخاب تا پس از خرید، همراه شما هستیم"
          href="/support/faq"
          linkLabel="مرکز پشتیبانی"
        />
        <h2 id="trust-title" className="sr-only">
          پشتیبانی و خدمات مشتریان
        </h2>

        <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
          <article className="flex flex-col gap-3 rounded-lg border border-line bg-card p-5">
            <span className="grid size-11 place-items-center rounded-md bg-brand-soft text-primary">
              <Headset className="size-5" aria-hidden />
            </span>
            <p className="text-title font-bold text-ink">پشتیبانی ۷ روز هفته</p>
            <p className="text-body-sm text-body">
              کارشناسان الکتروما هر روز از ساعت ۹ تا ۲۱ پاسخگوی سوالات فنی و
              پیگیری سفارش‌ها هستند.
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
              <Button asChild>
                <a href={siteConfig.supportPhoneHref}>
                  {siteConfig.supportPhone}
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/support/contact">فرم تماس با ما</Link>
              </Button>
            </div>
          </article>

          <article className="flex flex-col gap-3 rounded-lg border border-line bg-card p-5">
            <span className="grid size-11 place-items-center rounded-md bg-success-soft text-success">
              <PackageSearch className="size-5" aria-hidden />
            </span>
            <p className="text-title font-bold text-ink">
              پیگیری و بازگشت سفارش
            </p>
            <ul className="flex flex-col gap-2">
              {[
                { label: "پیگیری وضعیت سفارش", href: "/support/tracking" },
                {
                  label: "رویه بازگرداندن کالا (تا ۷ روز)",
                  href: "/support/returns",
                },
                {
                  label: "شرایط گارانتی و خدمات پس از فروش",
                  href: "/support/warranty",
                },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between gap-3 rounded-md bg-surface-soft px-3 py-2.5 text-body-sm text-body transition-colors hover:bg-brand-soft hover:text-brand-active"
                  >
                    {item.label}
                    <ChevronLeft
                      className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </article>

          <article className="flex flex-col gap-3 rounded-lg border border-line bg-card p-5">
            <span className="grid size-11 place-items-center rounded-md bg-warning-soft text-warning">
              <ShieldCheck className="size-5" aria-hidden />
            </span>
            <p className="text-title font-bold text-ink">خرید مطمئن</p>
            <ul className="flex flex-col gap-2.5">
              {securePurchasePoints.map((point) => (
                <li
                  key={point.label}
                  className="flex items-start gap-2 text-body-sm text-body"
                >
                  <point.icon
                    className="mt-1 size-4 shrink-0 text-success"
                    aria-hidden
                  />
                  {point.label}
                </li>
              ))}
            </ul>
            <Link
              href="/support/shipping"
              className="mt-auto inline-flex items-center gap-1 text-label font-medium text-brand transition-colors hover:text-brand-hover"
            >
              رویه ارسال و هزینه‌ها
              <ChevronLeft className="size-3.5" aria-hidden />
            </Link>
          </article>
        </div>
      </Container>
    </Section>
  );
}
