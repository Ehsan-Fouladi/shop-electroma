import type { Metadata } from "next";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container, Section } from "@/components/layout/container";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "قوانین و مقررات استفاده از فروشگاه",
  description:
    "قوانین و ضوابط عمومی خرید، ثبت سفارش، حریم خصوصی و خدمات پس از فروش در فروشگاه اینترنتی کالای دیجیتال الکتروما.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "قوانین و مقررات | الکتروما",
    description:
      "شرایط و قوانین استفاده از خدمات و خرید آنلاین از فروشگاه اینترنتی الکتروما.",
    url: "/terms",
    images: [siteConfig.defaultOgImage],
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      <div className="border-b border-line bg-surface-soft/60 py-8 sm:py-10">
        <Container size="narrow">
          <Breadcrumb
            items={[{ label: "خانه", href: "/" }, { label: "قوانین و مقررات" }]}
            className="mb-3"
          />
          <h1 className="text-heading font-bold text-ink sm:text-display">
            قوانین و مقررات فروشگاه اینترنتی الکتروما
          </h1>
          <p className="mt-2 text-body-sm text-subtle-ink">
            آخرین به‌روزرسانی: مهرماه ۱۴۰۵ • استفاده از خدمات الکتروما به منزله
            پذیرش کامل این شرایط است.
          </p>
        </Container>
      </div>

      <Section>
        <Container size="narrow">
          <div className="flex flex-col gap-8 text-body-sm text-body leading-relaxed sm:text-body">
            {/* Section 1 */}
            <article className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              <h2 className="text-title font-bold text-ink sm:text-heading">
                ۱. تعاریف و اصطلاحات
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-subtle-ink">
                <li>
                  <strong className="text-ink">فروشگاه:</strong> وب‌سایت
                  اینترنتی الکتروما به آدرس{" "}
                  <span dir="ltr" className="font-mono text-ink">
                    {siteConfig.url}
                  </span>
                  .
                </li>
                <li>
                  <strong className="text-ink">کاربر یا خریدار:</strong> هر شخص
                  حقیقی یا حقوقی که با ایجاد حساب یا ثبت سفارش از خدمات فروشگاه
                  استفاده می‌کند.
                </li>
                <li>
                  <strong className="text-ink">سفارش:</strong> کالا یا کالاهای
                  دیجیتال انتخاب‌شده توسط خریدار در سبد خرید با مشخصات ثبت‌شده.
                </li>
              </ul>
            </article>

            {/* Section 2 */}
            <article className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              <h2 className="text-title font-bold text-ink sm:text-heading">
                ۲. عضویت و حساب کاربری
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                <p>
                  ثبت‌نام در الکتروما با شماره موبایل معتبر انجام می‌گیرد. حفظ
                  محرمانگی رمز عبور و کد یک‌بارمصرف (OTP) بر عهده کاربر است و
                  کلیه مسئولیت‌های قانونی فعالیت‌های انجام‌شده با حساب متوجه
                  صاحب شماره خواهد بود.
                </p>
                <p>
                  کاربر متعهد است اطلاعات هویتی و نشانی تحویل گیرنده را به‌صورت
                  دقیق و صحیح ثبت نماید. هرگونه عدم تحویل ناشی از اطلاعات ناقص
                  بر عهده سفارش‌دهنده است.
                </p>
              </div>
            </article>

            {/* Section 3 */}
            <article className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              <h2 className="text-title font-bold text-ink sm:text-heading">
                ۳. ثبت سفارش و قیمت‌گذاری
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                <p>
                  الکتروما متعهد به شفافیت در قیمت‌هاست. تمامی قیمت‌های مندرج در
                  سایت نهایی بوده و شامل مالیات بر ارزش افزوده قانونی است. در
                  صورت نوسان نامتعارف یا خطای سیستمی در درج قیمت، فروشگاه حق لغو
                  سفارش و استرداد آنی وجه به خریدار را محفوظ می‌دارد.
                </p>
                <p>
                  ثبت موفق سفارش منوط به تایید پرداخت از درگاه معتبر بانکی شتاب
                  یا کسر از کیف پول دیجیتال الکتروما است.
                </p>
              </div>
            </article>

            {/* Section 4 */}
            <article className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              <h2 className="text-title font-bold text-ink sm:text-heading">
                ۴. رویه ارسال و تحویل مرسوله
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                <p>
                  زمان‌بندی ارسال کالا بر اساس روش انتخابی (اکسپرس تهران، پست
                  پیشتاز شهرستان‌ها) محاسبه می‌شود. در زمان تحویل کالا، خریدار
                  موظف به تطبیق بسته با مشخصات گیرنده و بررسی اولیه سلامت ظاهری
                  کارتن است.
                </p>
                <p>
                  هزینه ارسال برای فاکتورهای بالاتر از ۵٬۰۰۰٬۰۰۰ تومان در سراسر
                  کشور کاملاً رایگان است.
                </p>
              </div>
            </article>

            {/* Section 5 */}
            <article className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              <h2 className="text-title font-bold text-ink sm:text-heading">
                ۵. ضمانت اصالت و شرایط گارانتی
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                <p>
                  تمام گوشی‌ها و کالاهای دیجیتال با گارانتی ۱۸ ماهه شرکتی و ثبت
                  در سامانه رسمی همتا ارائه می‌شوند. الکتروما اصالت ۱۰۰٪ تمامی
                  محصولات را تضمین می‌نماید و در صورت اثبات عدم اصالت توسط مراجع
                  ذی‌صلاح، دو برابر مبلغ پرداخت‌شده عودت خواهد شد.
                </p>
              </div>
            </article>

            {/* Section 6 */}
            <article className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              <h2 className="text-title font-bold text-ink sm:text-heading">
                ۶. حل اختلاف و قوانین حاکم
              </h2>
              <p className="mt-3">
                کلیه روابط بین الکتروما و کاربران تابع قوانین جمهوری اسلامی
                ایران، قانون تجارت الکترونیکی و قانون حمایت از حقوق مصرف‌کنندگان
                است. در صورت بروز هرگونه ابهام، پشتیبانی الکتروما همواره آماده
                گفتگو و رفع دوستانه موضوع است.
              </p>
            </article>
          </div>
        </Container>
      </Section>
    </div>
  );
}
