"use client";

import Link from "next/link";
import {
  Clock4,
  CreditCard,
  Info,
  Mail,
  MapPin,
  Phone,
  Truck,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { SiteLogo } from "@/components/navigation/site-logo";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/constants/site";

const columns = [
  {
    title: "دسته‌بندی‌های محبوب",
    links: [
      { title: "گوشی موبایل", href: "/category/mobile-phones" },
      { title: "لپ‌تاپ", href: "/category/laptops" },
      { title: "هدفون و ایرباد", href: "/category/headphones" },
      { title: "ساعت و مچ‌بند هوشمند", href: "/category/smart-watches" },
      { title: "کنسول و گیمینگ", href: "/category/gaming-consoles" },
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      { title: "پیگیری سفارش", href: "/support/tracking" },
      { title: "رویه ارسال کالا", href: "/support/shipping" },
      { title: "رویه بازگرداندن کالا", href: "/support/returns" },
      { title: "شرایط و ضوابط گارانتی", href: "/support/warranty" },
      { title: "تماس با ما", href: "/support/contact" },
    ],
  },
  {
    title: "راهنمای خرید",
    links: [
      { title: "همه محصولات", href: "/products" },
      { title: "همه دسته‌بندی‌ها", href: "/categories" },
      { title: "پیشنهادهای شگفت‌انگیز", href: "/deals" },
      { title: "برندهای معتبر", href: "/brands" },
      { title: "مجموعه‌های منتخب", href: "/collections" },
      { title: "مجله و مقالات تخصصی", href: "/blog" },
    ],
  },
  {
    title: "الکتروما",
    links: [
      { title: "درباره ما", href: "/about" },
      { title: "سوالات متداول", href: "/support/faq" },
      { title: "قوانین و مقررات", href: "/terms" },
      { title: "سیاست حریم خصوصی", href: "/privacy" },
    ],
  },
];

/** Storefront footer — shared shell across all views */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      {/* Main Footer Links */}
      <Container className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1.2fr)_2fr] lg:gap-14 lg:py-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-5">
          <SiteLogo />
          <p className="max-w-md text-body-sm text-subtle-ink leading-relaxed">
            {siteConfig.description}
          </p>

          <ul className="flex flex-col gap-3 text-body-sm text-body">
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-brand" aria-hidden />
              <span className="text-caption text-subtle-ink">تلفن پشتیبانی:</span>
              <a href={siteConfig.supportPhoneHref} className="font-bold text-ink hover:text-brand-active" dir="ltr">
                {siteConfig.supportPhone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-brand" aria-hidden />
              <span className="text-caption text-subtle-ink">پست الکترونیک:</span>
              <a href={`mailto:${siteConfig.email}`} className="font-medium text-ink hover:text-brand-active" dir="ltr">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <span className="text-caption text-subtle-ink leading-relaxed">
                {siteConfig.address}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock4 className="size-4 shrink-0 text-brand" aria-hidden />
              <span className="text-caption text-subtle-ink">
                ساعات پاسخ‌گویی: شنبه تا چهارشنبه ۹ الی ۲۱ • پنجشنبه ۹ الی ۱۸
              </span>
            </li>
          </ul>
        </div>

        {/* Links Navigation Columns */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
              <p className="text-body-sm font-bold text-ink">{column.title}</p>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="inline-block py-0.5 text-body-sm text-subtle-ink transition-colors hover:text-brand-active"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      {/* Trust & Supported Payment Options */}
      <div className="border-t border-line-subtle bg-surface-soft/60 py-4">
        <Container className="flex flex-col items-center justify-between gap-3 text-caption text-subtle-ink sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
            <span className="flex items-center gap-1.5 font-medium text-ink">
              <CreditCard className="size-4 text-brand" aria-hidden />
              روش‌های پرداخت آزمایشی: کلیه کارت‌های شتاب و کیف پول الکتروما
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="size-4 text-brand" aria-hidden />
              ارسال اکسپرس و پست پیشتاز
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-disabled-ink">
            <Info className="size-3.5" aria-hidden />
            <span>نسخه نمایشی (UI Prototype) • فاقد درگاه مالی واقعی یا نمادهای شبیه‌سازی‌نشده</span>
          </div>
        </Container>
      </div>

      <Separator />

      {/* Copyright Bar */}
      <Container className="flex flex-col items-center justify-between gap-3 py-4 pb-20 sm:flex-row lg:pb-4 text-caption text-subtle-ink">
        <p>
          تمامی حقوق مادی و معنوی این وب‌سایت متعلق به {siteConfig.name} است. © ۱۴۰۵
        </p>
        <p className="text-[11px] text-disabled-ink">
          طراحی‌شده بر اساس اصول تجربه کاربری و دیزاین سیستم الکتروما
        </p>
      </Container>
    </footer>
  );
}