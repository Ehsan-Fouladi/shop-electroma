import type { Metadata } from "next";
import Link from "next/link";
import {
  Headphones,
  HelpCircle,
  Phone,
  RotateCcw,
  ShieldCheck,
  Truck,
  WalletCards,
} from "lucide-react";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "مرکز پشتیبانی و خدمات مشتریان",
  description:
    "مرکز پشتیبانی و پاسخگویی به سوالات مشتریان الکتروما؛ پیگیری سفارش، رویه ارسال، شرایط گارانتی، رویه بازگرداندن کالا و تماس با پشتیبانی.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "مرکز پشتیبانی و خدمات مشتریان | الکتروما",
    description:
      "مرکز راهنمایی، پیگیری سفارش، شرایط گارانتی و تماس با کارشناسان الکتروما.",
    url: "/support",
    images: [siteConfig.defaultOgImage],
  },
};

const supportCards = [
  {
    topic: "tracking",
    href: "/support/tracking",
    icon: Truck,
    title: "پیگیری سفارش",
    desc: "مشاهده وضعیت لحظه‌ای مرسوله با وارد کردن کد پیگیری یا شماره تماس.",
    badge: "آنلاین",
  },
  {
    topic: "faq",
    href: "/support/faq",
    icon: HelpCircle,
    title: "سوالات متداول",
    desc: "پاسخ سریع به پرسش‌های پرتکرار درباره خرید، پرداخت، ارسال و حساب کاربری.",
    badge: "پاسخ‌های فوری",
  },
  {
    topic: "shipping",
    href: "/support/shipping",
    icon: Truck,
    title: "رویه و هزینه‌های ارسال",
    desc: "زمان‌بندی تحویل تهران و شهرستان، روش‌های ارسال اکسپرس و پست پیشتاز.",
    badge: "ارسال رایگان بالای ۵ م.ت",
  },
  {
    topic: "returns",
    href: "/support/returns",
    icon: RotateCcw,
    title: "رویه بازگرداندن کالا",
    desc: "ضمانت ۷ روزه بازگشت، شرایط مرجوعی، نحوه ثبت درخواست و بازپرداخت وجه.",
    badge: "ضمانت ۷ روزه",
  },
  {
    topic: "warranty",
    href: "/support/warranty",
    icon: ShieldCheck,
    title: "شرایط گارانتی و اصالت",
    desc: "ضمانت ۱۸ ماهه شرکتی، پوشش خدمات پس از فروش و مراکز مجاز سرویس.",
    badge: "۱۰۰٪ کالای اصل",
  },
  {
    topic: "payment",
    href: "/support/payment",
    icon: WalletCards,
    title: "روش‌های پرداخت",
    desc: "پرداخت اینترنتی با کارت‌های شتاب، پرداخت از کیف پول الکتروما و راهنمای تسویه.",
    badge: "درگاه امن بانکی",
  },
  {
    topic: "contact",
    href: "/support/contact",
    icon: Headphones,
    title: "تماس با ما",
    desc: "راه‌های ارتباط مستقیم با کارشناسان پشتیبانی، فرم ارسال پیام و آدرس دفاتر.",
    badge: "پاسخگویی ۹ تا ۲۱",
  },
];

const quickFaqs = [
  {
    q: "هزینه ارسال چقدر است و چه زمانی رایگان می‌شود؟",
    a: "برای خریدهای بالای ۵٬۰۰۰٬۰۰۰ تومان ارسال به سراسر کشور رایگان است. برای سفارش‌های کمتر، هزینه ارسال طبق نرخ رسمی شرکت حمل محاسبه می‌شود.",
  },
  {
    q: "سفارش‌ها چه زمانی تحویل داده می‌شوند؟",
    a: "در شهر تهران سفارش‌های اکسپرس در همان روز کاری یا فردای آن تحویل می‌شوند. برای سایر شهرها تحویل بین ۲ تا ۴ روز کاری با پست پیشتاز انجام می‌گیرد.",
  },
  {
    q: "شرایط بازگرداندن کالا تا ۷ روز چیست؟",
    a: "کالا باید در بسته‌بندی اولیه و پلمپ باشد. در صورت نقص فنی تاییدشده توسط کارشناس، تا ۷ روز کاری امکان تعویض یا بازپرداخت وجه وجود دارد.",
  },
  {
    q: "چگونه وضعیت مرسوله را رهگیری کنم؟",
    a: "با مراجعه به بخش «پیگیری سفارش» در هدر سایت یا ورود به پنل کاربری بخش «سفارش‌های من»، می‌توانید وضعیت لحظه‌ای مرسوله را مشاهده کنید.",
  },
];

export default function SupportHubPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <div className="border-b border-line bg-gradient-to-b from-brand-soft/40 to-surface py-8 sm:py-12">
        <Container
          size="narrow"
          className="flex flex-col items-center text-center"
        >
          <Breadcrumb
            items={[{ label: "خانه", href: "/" }, { label: "مرکز پشتیبانی" }]}
            className="mb-4"
          />
          <span className="grid size-14 place-items-center rounded-2xl bg-primary text-white shadow-soft">
            <Headphones className="size-7" aria-hidden />
          </span>
          <h1 className="mt-4 text-heading font-bold text-ink sm:text-display">
            چطور می‌توانیم به شما کمک کنیم؟
          </h1>
          <p className="mt-2 max-w-xl text-body-sm text-subtle-ink sm:text-body">
            پاسخ سریع به پرسش‌ها، رهگیری مرسوله‌ها، اطلاعات گارانتی و ارتباط با
            تیم پشتیبانی الکتروما.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="/support/tracking">
                <Truck className="size-5" aria-hidden />
                پیگیری آنلاین سفارش
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/support/contact">
                <Phone className="size-5" aria-hidden />
                تماس با کارشناسان
              </Link>
            </Button>
          </div>
        </Container>
      </div>

      {/* Main Topic Grid */}
      <Section>
        <Container>
          <div className="mb-6 flex flex-col gap-1">
            <h2 className="text-title font-bold text-ink sm:text-heading">
              موضوعات راهنمایی و خدمات مشتریان
            </h2>
            <p className="text-body-sm text-subtle-ink">
              یکی از دسته‌بندی‌های زیر را انتخاب کنید تا به راهنمای کامل آن
              منتقل شوید.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {supportCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.topic}
                  href={card.href}
                  className="group flex flex-col justify-between rounded-xl border border-line bg-surface p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand-active transition-colors group-hover:bg-primary group-hover:text-white">
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <span className="rounded-full bg-surface-soft px-2.5 py-1 text-caption font-medium text-subtle-ink">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 text-body font-bold text-ink transition-colors group-hover:text-brand-active">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-body-sm text-subtle-ink leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1 text-label font-bold text-brand group-hover:underline">
                    مشاهده جزئیات
                    <span aria-hidden>←</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Quick FAQs */}
      <Section className="border-t border-line bg-surface-soft/60">
        <Container size="narrow">
          <div className="mb-6 text-center">
            <span className="rounded-full bg-brand-soft px-3 py-1 text-caption font-bold text-brand-active">
              پاسخ به سوالات متداول
            </span>
            <h2 className="mt-2 text-heading font-bold text-ink">
              پرتکرارترین پرسش‌های خریداران
            </h2>
            <p className="mt-1 text-body-sm text-subtle-ink">
              پاسخ سریع به متداول‌ترین سوالات درباره ثبت و دریافت کالاها
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {quickFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-line bg-surface p-4 shadow-soft open:border-primary/30 open:shadow-card transition-all"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-body-sm font-bold text-ink marker:hidden sm:text-body">
                  <span>{faq.q}</span>
                  <span className="text-subtle-ink transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 border-t border-line-subtle pt-3 text-body-sm text-body leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button asChild variant="outline">
              <Link href="/support/faq">مشاهده تمامی پرسش‌ها و پاسخ‌ها</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Contact Bar */}
      <Section className="border-t border-line">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-6 shadow-soft sm:flex-row sm:p-8">
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-active">
                <Phone className="size-7" aria-hidden />
              </span>
              <div>
                <h3 className="text-title font-bold text-ink">
                  نیاز به راهنمایی بیشتری دارید؟
                </h3>
                <p className="mt-0.5 text-body-sm text-subtle-ink">
                  کارشناسان پشتیبانی الکتروما هر روز از ساعت ۹ تا ۲۱ آماده
                  پاسخ‌گویی به شما هستند.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.supportPhoneHref}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-body-sm font-bold text-white shadow-soft transition-colors hover:bg-brand-hover"
              >
                <Phone className="size-4" aria-hidden />
                <span>{siteConfig.supportPhone}</span>
              </a>
              <Button asChild variant="outline">
                <Link href="/support/contact">ارسال تیکت / پیام</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
