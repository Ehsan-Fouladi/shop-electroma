import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Shield, UserCheck } from "lucide-react";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container, Section } from "@/components/layout/container";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "سیاست حفظ حریم خصوصی کاربران",
  description:
    "تعهدات فروشگاه الکتروما در خصوص حفاظت از داده‌ها، اطلاعات هویتی، کوکی‌ها و حریم شخصی خریداران و مراجعین محترم.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "حریم خصوصی | الکتروما",
    description:
      "اصول و استانداردهای الکتروما در حفظ محرمانگی و امنیت اطلاعات کاربران.",
    url: "/privacy",
    images: [siteConfig.defaultOgImage],
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      <div className="border-b border-line bg-surface-soft/60 py-8 sm:py-10">
        <Container size="narrow">
          <Breadcrumb
            items={[{ label: "خانه", href: "/" }, { label: "حریم خصوصی" }]}
            className="mb-3"
          />
          <h1 className="text-heading font-bold text-ink sm:text-display">
            سیاست حفظ حریم خصوصی در الکتروما
          </h1>
          <p className="mt-2 text-body-sm text-subtle-ink">
            الکتروما متعهد به نگهداری امن، شفاف و رمزنگاری‌شده اطلاعات شما بر
            اساس استانداردهای بین‌المللی است.
          </p>
        </Container>
      </div>

      <Section>
        <Container size="narrow">
          <div className="flex flex-col gap-8 text-body-sm text-body leading-relaxed sm:text-body">
            {/* Section 1 */}
            <article className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              <h2 className="text-title font-bold text-ink sm:text-heading">
                ۱. چه اطلاعاتی را جمع‌آوری می‌کنیم؟
              </h2>
              <div className="mt-3 flex flex-col gap-3 text-subtle-ink">
                <p>
                  هنگام ثبت‌نام و ثبت سفارش در الکتروما، اطلاعات ضروری زیر جهت
                  انجام خدمات دریافت می‌گردد:
                </p>
                <ul className="flex flex-col gap-1.5 ps-4 list-disc">
                  <li>
                    شماره تلفن همراه جهت احراز هویت و ارسال پیامک‌های رهگیری
                    سفارش
                  </li>
                  <li>
                    نام و نام خانوادگی، نشانی تحویل گیرنده، کد پستی و شماره تماس
                    هماهنگی تحویل
                  </li>
                  <li>
                    آدرس ایمیل (اختیاری) جهت ارسال پیش‌فاکتور و اطلاع‌رسانی
                    تخفیف‌ها
                  </li>
                  <li>
                    اطلاعات فنی مرورگر و لاگ دسترسی برای حفظ پایداری و امنیت
                    سامانه
                  </li>
                </ul>
              </div>
            </article>

            {/* Section 2 */}
            <article className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              <h2 className="text-title font-bold text-ink sm:text-heading">
                ۲. نحوه استفاده از داده‌های کاربران
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                <p>
                  اطلاعات دریافتی صرفاً برای موارد زیر مورد استفاده قرار
                  می‌گیرند:
                </p>
                <ul className="flex flex-col gap-1.5 ps-4 list-disc text-subtle-ink">
                  <li>
                    پردازش سفارش، صدور فاکتور و هماهنگی جهت ارسال سریع مرسوله
                  </li>
                  <li>
                    ارائه خدمات گارانتی، پیگیری رجیستری و پشتیبانی پس از فروش
                  </li>
                  <li>
                    بهبود تجربه کاربری و سرعت بارگذاری صفحات در مراجعات بعدی
                  </li>
                </ul>
              </div>
            </article>

            {/* Section 3 */}
            <article className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              <h2 className="text-title font-bold text-ink sm:text-heading">
                ۳. سیاست کوکی‌ها (Cookies)
              </h2>
              <p className="mt-3">
                الکتروما برای حفظ نشست ورود کاربر، ذخیره‌سازی کالاهای موجود در
                سبد خرید و لیست علاقه‌مندی‌ها، از کوکی‌های عملکردی ایمن استفاده
                می‌کند. کوکی‌های مورد استفاده فاقد هرگونه داده حساس بانکی یا
                رمزی هستند و کاربران در هر زمان می‌توانند از طریق تنظیمات مرورگر
                خود آن‌ها را مدیریت یا پاکسازی نمایند.
              </p>
            </article>

            {/* Section 4 */}
            <article className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              <h2 className="text-title font-bold text-ink sm:text-heading">
                ۴. عدم افشا به اشخاص ثالث
              </h2>
              <p className="mt-3">
                الکتروما تحت هیچ شرایطی اطلاعات هویتی و شماره‌های تماس کاربران
                را به اشخاص، شرکت‌های تبلیغاتی یا موسسات تجاری ثالث واگذار نکرده
                و نخواهد فروخت. تنها شرکت حمل منتخب (پست یا پیک) به نشانی و تلفن
                درج‌شده روی برچسب مرسوله دسترسی خواهد داشت.
              </p>
            </article>

            {/* Section 5 */}
            <article className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              <h2 className="text-title font-bold text-ink sm:text-heading">
                ۵. حقوق و دسترسی کاربران
              </h2>
              <p className="mt-3">
                هر کاربر در هر لحظه از طریق پنل «اطلاعات شخصی» به مشخصات ثبت‌شده
                خود دسترسی دارد و می‌تواند اقدام به تصحیح یا به‌روزرسانی آن
                نماید. همچنین امکان درخواست مسدودسازی یا حذف حساب کاربری با
                ارسال تیکت به واحد پشتیبانی فراهم است.
              </p>
            </article>
          </div>
        </Container>
      </Section>
    </div>
  );
}
