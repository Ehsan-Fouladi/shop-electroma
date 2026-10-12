import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Compass,
  FileCheck2,
  HeartHandshake,
  Info,
  Laptop,
  Layers,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Truck,
  Watch,
  Zap,
} from "lucide-react";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "درباره ما — اهداف، رویکردها و اصول تجربه خرید",
  description:
    "آشنایی با فروشگاه اینترنتی کالای دیجیتال الکتروما؛ رویکرد ما در ارائه مشخصات فنی دقیق، قیمت‌گذاری شفاف، معرفی گارانتی‌های معتبر و ساده‌سازی انتخاب کالا برای کاربران.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "درباره ما | فروشگاه اینترنتی الکتروما",
    description: "شفافیت فنی، مشاوره تخصصی و تسهیل خرید آنلاین کالای دیجیتال.",
    url: "/about",
    images: [siteConfig.defaultOgImage],
  },
};

const productAreas = [
  {
    icon: Smartphone,
    title: "تلفن‌های هوشمند و تبلت",
    description:
      "پوشش مدل‌های پرچم‌دار، میان‌رده و اقتصادی با تمرکز بر رجیستری معتبر در سامانه همتا و تطابق دقیق شماره سریال.",
  },
  {
    icon: Laptop,
    title: "رایانه‌های همراه و الترابوک",
    description:
      "دستگاه‌های متناسب با نیازهای توسعه‌دهندگان، مهندسان، دانشجویان و گیمرها با تحلیل دقیق مشخصات پردازنده، رم و نمایشگر.",
  },
  {
    icon: Compass,
    title: "تجهیزات صوتی و هدفون",
    description:
      "بررسی تفکیک‌شده هدفون‌های دور گوشی و ایربادهای بی‌سیم مجهز به حذف نویز فعال (ANC) و کدک‌های صوتی پیشرفته.",
  },
  {
    icon: Watch,
    title: "ساعت و گجت‌های هوشمند",
    description:
      "تجهیزات پایش سلامت و فعالیت‌های ورزشی با اطلاعات شفاف در خصوص حسگرها، سازگاری سیستم‌عامل و عمر باتری.",
  },
];

const corePrinciples = [
  {
    icon: ShieldCheck,
    title: "شفافیت در اصالت و شرایط گارانتی",
    desc: "در الکتروما اصالت کالاها امری قطعی دانسته می‌شود. مشخصات شرکت گارانتی‌کننده، نوع خدمات و مدت اعتبار بر روی هر محصول به‌طور صریح و پیش از نهایی‌سازی خرید درج می‌گردد.",
  },
  {
    icon: FileCheck2,
    title: "ارائه مشخصات فنی بدون اغراق بازاریابی",
    desc: "اطلاعات سخت‌افزاری بر اساس ارقام استاندارد کارخانه سازنده تنظیم شده‌اند. ما باور داریم کاربر با دسترسی به مشخصات واقعی پردازنده، حافظه و نمایشگر بهترین تصمیم را اتخاذ می‌کند.",
  },
  {
    icon: Layers,
    title: "ابزارهای مقایسه و راهنمای انتخاب",
    desc: "ماتریس مقایسه تا ۴ کالا، مقالات تحلیلی مجله تخصصی، و فیلترهای دقیق دسته‌بندی امکان انتخابی منطقی و متناسب با بودجه واقعی خریدار را فراهم می‌آورند.",
  },
  {
    icon: HeartHandshake,
    title: "احترام به تجربه مشتری و مهلت بررسی",
    desc: "مهلت تست ۷ روزه اولیه و فرآیند شفاف بازگرداندن کالا در کنار پشتیبانی محترمانه، آرامش خاطر لازم را برای یک خرید دیجیتال اینترنتی ایجاد می‌نماید.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <div className="border-b border-line bg-gradient-to-b from-brand-soft/40 to-surface py-10 sm:py-16">
        <Container size="narrow" className="flex flex-col items-center text-center">
          <Breadcrumb
            items={[{ label: "خانه", href: "/" }, { label: "درباره ما" }]}
            className="mb-4"
          />
          <span className="rounded-full bg-brand-soft px-3.5 py-1 text-caption font-bold text-brand-active">
            داستان و رویکرد الکتروما
          </span>
          <h1 className="mt-3 text-heading font-bold text-ink sm:text-display">
            خرید آگاهانه و شفاف در دنیای کالای دیجیتال
          </h1>
          <p className="mt-3 max-w-2xl text-body-sm text-subtle-ink leading-relaxed sm:text-body">
            الکتروما یک پلتفرم تخصصی با تمرکز بر ساده‌سازی انتخاب، تحلیل مشخصات فنی و ارائه تجربه خریدی بدون ابهام در حوزه فناوری‌های مصرفی و سخت‌افزار است.
          </p>
        </Container>
      </div>

      {/* Brand Mission & Story */}
      <Section>
        <Container size="narrow">
          <div className="flex flex-col gap-6 text-body text-body leading-relaxed sm:text-body-lg">
            <h2 className="text-title font-bold text-ink sm:text-heading">
              چرا الکتروما شکل گرفت؟
            </h2>
            <p>
              بازار کالای دیجیتال در سال‌های اخیر با سرعت خیره‌کننده‌ای گسترش یافته است؛ ده‌ها مدل گوشی هوشمند، تنوع معماری پردازنده‌های لپ‌تاپ و صدها فناوری صوتی هر روز پیش روی خریداران قرار می‌گیرد. با این حال، تصمیم‌گیری میان این انبوه مشخصات معمولاً با سردرگمی، اصطلاحات تبلیغاتی نامفهوم و دغدغه‌های همیشگی پیرامون اصالت و گارانتی همراه است.
            </p>
            <p>
              رسالت بنیادین الکتروما، جایگزین کردن تردید با تصمیم‌گیری آگاهانه است. ما تلاش کرده‌ایم فروشگاهی بسازیم که در آن مشخصات فنی به‌دور از شعارهای مبالغه‌آمیز بازگو شوند، قیمت‌ها بدون هزینه‌های پنهان نمایش یابند و وضعیت قانونی گارانتی و رجیستری برای هر کالا کاملاً شفاف باشد.
            </p>
          </div>
        </Container>
      </Section>

      {/* Product Categories & User Needs */}
      <Section className="bg-surface-soft/60 border-y border-line">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-title font-bold text-ink sm:text-heading">
              پاسخ به نیازهای واقعی در دسته‌بندی‌های دیجیتال
            </h2>
            <p className="mt-2 text-body-sm text-subtle-ink">
              ما سبد محصولات الکتروما را بر اساس سبک زندگی، تحصیل، اشتغال حرفه‌ای و سرگرمی دسته‌بندی کرده‌ایم:
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productAreas.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col rounded-xl border border-line bg-surface p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary/40"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand-active">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-3.5 text-body font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-caption text-subtle-ink leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Core Principles & Values */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-title font-bold text-ink sm:text-heading">
              اصول و ارکان خدمت‌رسانی در الکتروما
            </h2>
            <p className="mt-2 text-body-sm text-subtle-ink">
              چهار اصل راهنمای ما در تدوین تجربه کاربری، انتخاب تامین‌کنندگان و پشتیبانی خریداران:
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {corePrinciples.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-xl border border-line bg-surface p-6 shadow-soft"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-active">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-body font-bold text-ink sm:text-title-sm">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-body-sm text-subtle-ink leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Distinctive Shopping Experience */}
      <Section className="bg-surface border-t border-line">
        <Container size="narrow">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-brand-soft/30 to-surface p-6 sm:p-10 shadow-soft">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-caption font-bold text-primary">
              <Sparkles className="size-3.5" aria-hidden />
              وجه تمایز الکتروما
            </span>
            <h2 className="mt-3 text-title font-bold text-ink sm:text-heading">
              تجربه خریدی که روی شفافیت و احترام به وقت شما بنا شده است
            </h2>
            <p className="mt-2 text-body-sm text-subtle-ink leading-relaxed sm:text-body">
              در الکتروما از پیچیدگی‌های غیرضروری پرهیز کرده‌ایم؛ استپر تسویه‌حساب مرحله‌به‌مرحله، محاسبه لحظه‌ای تخفیف‌ها، امکان بررسی فنی کالاها در کنار یکدیگر و ارائه چک‌لیست‌های پیش از خرید، همگی برای این طراحی شده‌اند که با خیالی آسوده و تسلط کامل سفارش خود را ثبت کنید.
            </p>

            {/* Quick Links */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="sm">
                <Link href="/products" className="gap-1.5">
                  مشاهده کاتالوگ محصولات
                  <ArrowLeft className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/support/warranty">شرایط و قوانین گارانتی</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/blog">مطالعه راهنماهای خرید</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/support/contact">ارتباط با پشتیبانی</Link>
              </Button>
            </div>
          </div>

          {/* Prototype / Demo Truthfulness Notice */}
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-surface-soft p-4 text-caption text-subtle-ink">
            <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
            <div className="leading-relaxed">
              <strong>یادداشت نمایشی:</strong> الکتروما در حال حاضر به عنوان یک پروژه پروتوتایپ و نمونه پیشرفته رابط کاربری (Frontend Showcase) پیاده‌سازی شده است. داده‌های محصولات، مقالات و پروفایل‌ها به عنوان نمونه استاندارد خرده‌فروشی دیجیتال برای ارزیابی تجربه کاربری آماده‌سازی شده‌اند و فاقد ثبت شرکتی رسمی هستند.
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
