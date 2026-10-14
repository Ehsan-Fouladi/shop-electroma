import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertCircle,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  FileCheck2,
  Headphones,
  HelpCircle,
  Info,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container, Section } from "@/components/layout/container";
import {
  ContactForm,
  InteractiveFaqList,
  OrderTrackingLookup,
} from "@/components/support/support-interactive";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants/site";

interface SupportTopicMeta {
  title: string;
  description: string;
  breadcrumb: string;
}

const topicMeta: Record<string, SupportTopicMeta> = {
  shipping: {
    title: "رویه و هزینه‌های ارسال کالا",
    description:
      "راهنمای کامل شیوه‌های ارسال اکسپرس، استاندارد و پست پیشتاز، زمان‌بندی تحویل تهران و شهرستان‌ها و قوانین ارسال رایگان.",
    breadcrumb: "رویه ارسال کالا",
  },
  payment: {
    title: "روش‌های پرداخت و تسویه حساب",
    description:
      "اطلاعات درگاه‌های پرداخت امن اینترنتی شتاب، پرداخت از کیف پول الکتروما، خرید اقساطی و پیگیری تراکنش‌های ناموفق.",
    breadcrumb: "روش‌های پرداخت",
  },
  warranty: {
    title: "شرایط گارانتی و اصالت کالا",
    description:
      "ضمانت اصالت ۱۰۰٪ کالاهای دیجیتال، شرایط گارانتی ۱۸ ماهه شرکتی، مراکز مجاز خدمات پس از فروش و رویه استعلام اصالت.",
    breadcrumb: "شرایط گارانتی",
  },
  returns: {
    title: "رویه بازگرداندن کالا و استرداد وجه",
    description:
      "ضمانت ۷ روزه بازگشت کالا، شرایط مرجوعی، نحوه ثبت درخواست در پنل کاربری و زمان‌بندی استرداد وجه به حساب مشتری.",
    breadcrumb: "رویه بازگرداندن کالا",
  },
  faq: {
    title: "سوالات متداول کاربران",
    description:
      "پاسخ سریع به پرسش‌های پرتکرار درباره خرید، پیگیری سفارش، پرداخت، گارانتی و حساب کاربری در الکتروما.",
    breadcrumb: "سوالات متداول",
  },
  tracking: {
    title: "پیگیری آنلاین مرسوله پستی",
    description:
      "استعلام وضعیت لحظه‌ای مرسوله با وارد کردن کد رهگیری یا شماره سفارش، مشاهده آخرین وضعیت توزیع و تحویل.",
    breadcrumb: "پیگیری سفارش",
  },
  contact: {
    title: "تماس با ما و پشتیبانی",
    description:
      "راه‌های ارتباط با کارشناسان فروش و خدمات پس از فروش الکتروما، آدرس دفاتر و فروشگاه‌های فیزیکی، شماره تماس و فرم ارسال پیام.",
    breadcrumb: "تماس با ما",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const meta = topicMeta[topic];
  if (!meta) return { title: "مرکز پشتیبانی" };

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/support/${topic}` },
    openGraph: {
      title: `${meta.title} | ${siteConfig.name}`,
      description: meta.description,
      url: `/support/${topic}`,
      images: [siteConfig.defaultOgImage],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(topicMeta).map((topic) => ({ topic }));
}

export default async function SupportTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const meta = topicMeta[topic];
  if (!meta) notFound();

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <div className="border-b border-line bg-gradient-to-b from-brand-soft/30 to-surface py-7 sm:py-10">
        <Container size="narrow">
          <Breadcrumb
            items={[
              { label: "خانه", href: "/" },
              { label: "مرکز پشتیبانی", href: "/support" },
              { label: meta.breadcrumb },
            ]}
            className="mb-3"
          />
          <h1 className="text-heading font-bold text-ink sm:text-display">
            {meta.title}
          </h1>
          <p className="mt-2 text-body-sm text-subtle-ink leading-relaxed sm:text-body">
            {meta.description}
          </p>
        </Container>
      </div>

      <Section>
        <Container size="narrow">
          {topic === "faq" && <FaqTopicContent />}
          {topic === "shipping" && <ShippingTopicContent />}
          {topic === "returns" && <ReturnsTopicContent />}
          {topic === "warranty" && <WarrantyTopicContent />}
          {topic === "payment" && <PaymentTopicContent />}
          {topic === "contact" && <ContactTopicContent />}
          {topic === "tracking" && <TrackingTopicContent />}
        </Container>
      </Section>
    </div>
  );
}

// ----------------------------------------------------------------------
// TOPIC CONTENTS
// ----------------------------------------------------------------------

const ALL_FAQS = [
  {
    category: "ارسال و تحویل",
    q: "هزینه ارسال سفارش‌ها چگونه محاسبه می‌شود؟",
    a: "برای کلیه خریدهای با مبلغ بیش از ۵٬۰۰۰٬۰۰۰ تومان ارسال به تمام نقاط کشور رایگان است. برای مبالغ کمتر، هزینه ارسال در شهر تهران ۶۵٬۰۰۰ تومان و برای شهرستان‌ها بر اساس تعرفه مصوب پست پیشتاز محاسبه می‌شود.",
  },
  {
    category: "ارسال و تحویل",
    q: "سفارش‌ها در چه بازه زمانی تحویل داده می‌شوند؟",
    a: "سفارش‌های اکسپرس شهر تهران در صورت ثبت تا ساعت ۱۶، در همان روز یا اولین روز کاری بعد بین ساعات ۹ تا ۲۱ تحویل می‌گردند. برای سایر استان‌ها ارسال با پست پیشتاز بین ۲ تا ۴ روز کاری زمان می‌برد.",
  },
  {
    category: "گارانتی و اصالت",
    q: "آیا کالاهای الکتروما دارای گارانتی معتبر هستند؟",
    a: "بله، ۱۰۰٪ کالاهای موجود در الکتروما اصل و اورجینال بوده و دارای ۱۸ ماه گارانتی رسمی معتبر شرکتی به همراه کد رجیستری در سامانه همتا هستند.",
  },
  {
    category: "گارانتی و اصالت",
    q: "مهلت تست ۷ روزه شامل چه مواردی است؟",
    a: "در صورت وجود هرگونه ایراد فنی ناشی از تولید در ۷ روز نخست، کالا بدون کسر وجه تعویض یا مبلغ سفارش به‌طور کامل استرداد می‌شود. شرط بازگرداندن سلیقه‌ای، پلمپ ماندن بسته‌بندی کالا است.",
  },
  {
    category: "پرداخت و فاکتور",
    q: "چه روش‌های پرداختی در سایت فعال است؟",
    a: "پرداخت آنلاین امن با کلیه کارت‌های عضو شبکه شتاب از طریق درگاه‌های معتبر بانکی و همچنین پرداخت از طریق موجودی کیف پول الکتروما فعال است.",
  },
  {
    category: "پرداخت و فاکتور",
    q: "در صورت کسر مبلغ از حساب و عدم ثبت سفارش چه اقدامی انجام دهم؟",
    a: "در موارد نادری که اختلال بانکی رخ دهد، مبلغ کسرشده حداکثر ظرف ۷۲ ساعت کاری طبق چرخه شاپرک به‌طور خودکار به حساب شما بازگردانده می‌شود.",
  },
  {
    category: "سفارش و حساب",
    q: "چگونه می‌توانم وضعیت سفارش خود را پیگیری کنم؟",
    a: "با ورود به حساب کاربری و مراجعه به بخش «سفارش‌های من»، یا استفاده از صفحه «پیگیری آنلاین سفارش» با وارد کردن کد پیگیری اختصاصی، وضعیت لحظه‌ای مرسوله قابل مشاهده است.",
  },
  {
    category: "سفارش و حساب",
    q: "امکان لغو سفارش ثبت‌شده وجود دارد؟",
    a: "تا زمانی که سفارش در وضعیت «در حال آماده‌سازی» قرار دارد و به شرکت حمل تحویل داده نشده است، می‌توانید از پنل کاربری یا تماس با پشتیبانی اقدام به لغو و استرداد وجه نمایید.",
  },
];

function FaqTopicContent() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <InteractiveFaqList faqs={ALL_FAQS} />
    </div>
  );
}

function ShippingTopicContent() {
  return (
    <div className="flex flex-col gap-10">
      {/* Disclaimer Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-line bg-surface-soft p-4 text-caption text-subtle-ink">
        <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
        <p className="leading-relaxed">
          <strong className="text-ink font-bold">
            اطلاعیه شفافیت نسخه نمایشی:
          </strong>{" "}
          اطلاعات مندرج در این صفحه منعکس‌کننده رویه‌های استاندارد فروشگاه‌های
          دیجیتال در ایران بوده و زمان‌بندی‌ها و تعرفه‌ها در بستر این پروتوتایپ
          به‌صورت نمایشی تعریف شده‌اند. تعرفه و شیوه قطعی در مرحله نهایی تسویه
          حساب بر اساس آدرس انتخابی شما محاسبه می‌شود.
        </p>
      </div>

      {/* Overview Cards */}
      <div>
        <h2 className="text-title font-bold text-ink sm:text-heading">
          روش‌های اصلی ارسال مرسولات
        </h2>
        <p className="mt-1 text-caption text-subtle-ink sm:text-body-sm">
          توزیع سفارش‌های الکتروما بر اساس محدوده جغرافیایی مقصد، ابعاد کالا و
          اولویت انتخابی خریدار انجام می‌پذیرد.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
            <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand-active">
              <Truck className="size-5" aria-hidden />
            </span>
            <h3 className="mt-3 text-body font-bold text-ink">اکسپرس تهران</h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              تحویل در همان روز کاری برای سفارش‌های پیش از ظهر یا حداکثر ۲۴ ساعت
              کاری با ناوگان اختصاصی الکتروما در مناطق ۲۲گانه.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
            <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand-active">
              <Clock className="size-5" aria-hidden />
            </span>
            <h3 className="mt-3 text-body font-bold text-ink">
              پست پیشتاز سراسری
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              ارسال به تمام استان‌ها، شهرستان‌ها و مناطق روستایی کشور ظرف ۲ الی
              ۴ روز کاری با بیمه کامل مرسولات دیجیتال.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
            <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand-active">
              <Building2 className="size-5" aria-hidden />
            </span>
            <h3 className="mt-3 text-body font-bold text-ink">
              تیپاکس و توزیع سریع
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              ارسال سریع به مراکز استان‌ها و شهرستان‌های بزرگ با امکان تحویل در
              محل کار یا منزل بین ۲۴ الی ۴۸ ساعت.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
            <span className="grid size-10 place-items-center rounded-lg bg-success-soft text-success">
              <CheckCircle2 className="size-5" aria-hidden />
            </span>
            <h3 className="mt-3 text-body font-bold text-ink">ارسال رایگان</h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              کلیه سفارش‌های با مبلغ بیش از ۵٬۰۰۰٬۰۰۰ تومان بدون در نظر گرفتن
              وزن یا مقصد جغرافیایی مشمول ارسال رایگان هستند.
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Schedule and Cost Table */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
        <h2 className="text-title font-bold text-ink sm:text-heading">
          جدول جامع تعرفه و زمان‌بندی توزیع
        </h2>
        <p className="mt-1 text-caption text-subtle-ink sm:text-body-sm">
          مشخصات زمان‌بندی تقریبی و هزینه‌های استاندارد ارسال سفارش‌های فروشگاه
        </p>

        <div className="mt-4 overflow-x-auto w-full">
          <table className="w-full text-start max-sm:text-nowrap text-caption sm:text-body-sm">
            <thead>
              <tr className="border-b border-line bg-surface-soft text-caption font-bold text-ink">
                <th className="p-3 text-start">روش ارسال</th>
                <th className="p-3 text-start">محدوده پوشش</th>
                <th className="p-3 text-start">زمان تحویل تقریبی</th>
                <th className="p-3 text-start">سفارش زیر ۵ م.ت</th>
                <th className="p-3 text-start">سفارش بالای ۵ م.ت</th>
                <th className="p-3 text-start">شیوه رهگیری</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-subtle">
              <tr className="hover:bg-surface-soft/40">
                <td className="p-3 font-medium text-ink">اکسپرس الکتروما</td>
                <td className="p-3 text-subtle-ink">مناطق ۲۲گانه شهر تهران</td>
                <td className="p-3 text-subtle-ink">
                  همان روز یا حداکثر ۲۴ ساعت
                </td>
                <td className="p-3 text-subtle-ink">۶۵٬۰۰۰ تومان</td>
                <td className="p-3 font-bold text-success">رایگان</td>
                <td className="p-3 text-subtle-ink">پیامک و رهگیری آنلاین</td>
              </tr>
              <tr className="hover:bg-surface-soft/40">
                <td className="p-3 font-medium text-ink">پست پیشتاز</td>
                <td className="p-3 text-subtle-ink">
                  سراسر کشور (شهری و روستایی)
                </td>
                <td className="p-3 text-subtle-ink">۲ الی ۴ روز کاری</td>
                <td className="p-3 text-subtle-ink">۵۵٬۰۰۰ تومان</td>
                <td className="p-3 font-bold text-success">رایگان</td>
                <td className="p-3 text-subtle-ink">کد ۲۴ رقمی پست ملی</td>
              </tr>
              <tr className="hover:bg-surface-soft/40">
                <td className="p-3 font-medium text-ink">تیپاکس بین‌استانی</td>
                <td className="p-3 text-subtle-ink">
                  مراکز استان‌ها و شهرهای تحت پوشش
                </td>
                <td className="p-3 text-subtle-ink">۲۴ الی ۴۸ ساعت کاری</td>
                <td className="p-3 text-subtle-ink">طبق تعرفه رسمی تیپاکس</td>
                <td className="p-3 font-bold text-success">رایگان</td>
                <td className="p-3 text-subtle-ink">بارکد بارنامه تیپاکس</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4-Step Fulfillment Lifecycle */}
      <div className="flex flex-col gap-4">
        <h2 className="text-title font-bold text-ink sm:text-heading">
          مراحل چهارگانه پردازش تا تحویل سفارش
        </h2>
        <p className="text-caption text-subtle-ink sm:text-body-sm">
          چرخه عمر هر سفارش از لحظه ثبت نهایی در درگاه پرداخت تا رسیدن به دستان
          شما
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-caption font-bold text-white">
              ۱
            </span>
            <h3 className="mt-3 text-body-sm font-bold text-ink">
              ثبت و تخصیص انبار
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              تایید مالی خودکار سفارش و رزرو فیزیکی اقلام کالا در سیستم
              انبارداری مرکزی الکتروما.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-caption font-bold text-white">
              ۲
            </span>
            <h3 className="mt-3 text-body-sm font-bold text-ink">
              کنترل کیفیت و بسته‌بندی
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              تطابق بارکد سریال و IMEI دستگاه با فاکتور، بسته‌بندی چندلایه
              ضدضربه و نصب برچسب پلمپ امنیتی.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-caption font-bold text-white">
              ۳
            </span>
            <h3 className="mt-3 text-body-sm font-bold text-ink">
              تحویل به ناوگان و ارسال
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              صدور بارنامه پستی یا تحویل به سفیر اختصاصی الکتروما همراه با ارسال
              پیامک کد پیگیری به شماره موبایل کاربر.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-caption font-bold text-white">
              ۴
            </span>
            <h3 className="mt-3 text-body-sm font-bold text-ink">
              تحویل حضوری و بررسی
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              تحویل مرسوله به شخص گیرنده با احراز هویت اولیه، بررسی سلامت کارتن
              پلمپ‌شده و امضای رسید تحویل.
            </p>
          </div>
        </div>
      </div>

      {/* Important Factors Affecting Delivery Time */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
        <h2 className="text-title font-bold text-ink sm:text-heading">
          نحوه محاسبه زمان و عوامل مؤثر بر تحویل
        </h2>
        <ul className="mt-3 flex flex-col gap-3 text-body-sm text-subtle-ink leading-relaxed">
          <li className="flex items-start gap-2.5">
            <Check className="mt-1 size-4 shrink-0 text-brand" />
            <span>
              <strong className="text-ink font-bold">ساعت ثبت سفارش:</strong>{" "}
              سفارش‌هایی که تا ساعت ۱۲:۰۰ روزهای شنبه تا چهارشنبه ثبت شوند، در
              همان روز تحویل ناوگان حمل‌ونقل می‌گردند. سفارش‌های بعد از این
              ساعت، در اولین روز کاری بعد پردازش خواهند شد.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <Check className="mt-1 size-4 shrink-0 text-brand" />
            <span>
              <strong className="text-ink font-bold">
                روزهای تعطیل و مناسبت‌ها:
              </strong>{" "}
              روزهای پنج‌شنبه بعدازظهر، جمعه‌ها و تعطیلات رسمی جزو روزهای کاری
              پست و انبار مرکزی محاسبه نمی‌شوند.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <Check className="mt-1 size-4 shrink-0 text-brand" />
            <span>
              <strong className="text-ink font-bold">شرایط نامساعد جوی:</strong>{" "}
              در شرایط بارندگی شدید، یخ‌بندان جاده‌ای یا اختلالات ترانزیتی
              فرودگاهی، ممکن است زمان رسیدن مرسوله‌ها تا ۲۴ ساعت افزایش یابد.
            </span>
          </li>
        </ul>
      </div>

      {/* Order Tracking Guidance */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
        <h2 className="text-title font-bold text-ink sm:text-heading">
          شیوه‌های رهگیری وضعیت سفارش
        </h2>
        <p className="mt-1 text-caption text-subtle-ink sm:text-body-sm">
          کاربران می‌توانند در هر ساعت از شبانه‌روز وضعیت سفارش خود را از
          مسیرهای زیر دنبال کنند:
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              ۱. سامانه آنلاین رهگیری الکتروما
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              با مراجعه به صفحه رهگیری و وارد کردن شماره سفارش، وضعیت دقیق مرحله
              پردازش و بارنامه را مشاهده نمایید.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-3">
              <Link href="/support/tracking">رهگیری با شماره سفارش</Link>
            </Button>
          </div>

          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              ۲. پنل تاریخچه سفارش‌های کاربری
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              در بخش حساب کاربری، لیست سفارش‌ها با جزئیات وضعیت، اقلام و فاکتور
              رسمی در دسترس شماست.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-3">
              <Link href="/account/orders">مشاهده سفارش‌های من</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Unavailability, Address Errors & Inspection Checklist */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <h3 className="text-body font-bold text-ink flex items-center gap-2">
            <AlertCircle className="size-5 text-warning" />
            عدم حضور گیرنده یا نقص نشانی
          </h3>
          <ul className="mt-3 flex flex-col gap-2.5 text-caption text-subtle-ink leading-relaxed sm:text-body-sm">
            <li>
              • در صورت عدم حضور گیرنده، مامور ارسال حداقل یک نوبت دیگر در روز
              بعد مراجعه خواهد کرد.
            </li>
            <li>
              • در روش پست پیشتاز، مرسوله به باجه معطله اداره پست منطقه منتقل
              شده و تا مهلت قانونی قابل تحویل حضوری است.
            </li>
            <li>
              • در صورت هرگونه مغایرت آدرس، سریعاً با پشتیبانی الکتروما تماس
              حاصل نمایید.
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <h3 className="text-body font-bold text-ink flex items-center gap-2">
            <ShieldCheck className="size-5 text-brand" />
            دستورالعمل تحویل و اعلام آسیب
          </h3>
          <ul className="mt-3 flex flex-col gap-2.5 text-caption text-subtle-ink leading-relaxed sm:text-body-sm">
            <li>
              • سلامت فیزیکی کارتن، برچسب پلمپ و عدم فرورفتگی را پیش از امضا
              بررسی کنید.
            </li>
            <li>
              • در صورت مشاهده ضربه‌خوردگی شدید جعبه، از دریافت کالا خودداری
              کرده و صورت‌جلسه پستی تنظیم نمایید.
            </li>
            <li>
              • هرگونه مغایرت یا عیب ظاهری حداکثر ظرف ۲۴ ساعت باید به پشتیبانی
              اعلام گردد.
            </li>
          </ul>
        </div>
      </div>

      {/* Distinction Guide: Shipping vs Cancellation vs Returns vs Warranty */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
        <h2 className="text-base font-bold text-ink sm:text-heading">
          تفاوت رویه ارسال با سایر رویه‌های فروشگاه
        </h2>
        <div className="mt-4 overflow-x-auto w-full">
          <table className="w-full text-start max-sm:text-nowrap text-caption sm:text-body-sm">
            <thead>
              <tr className="border-b border-line bg-surface-soft font-bold text-ink">
                <th className="p-3 text-start">موضوع رویه</th>
                <th className="p-3 text-start">بازه زمانی مجاز</th>
                <th className="p-3 text-start">اقدام مورد نیاز خریدار</th>
                <th className="p-3 text-start">صفحه راهنما</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-subtle">
              <tr>
                <td className="p-3 font-bold text-ink">رویه ارسال کالا</td>
                <td className="p-3 text-subtle-ink">تا زمان دریافت بسته</td>
                <td className="p-3 text-subtle-ink">
                  بررسی آدرس و هماهنگی جهت تحویل‌گیری
                </td>
                <td className="p-3 font-medium text-brand">صفحه جاری</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-ink">لغو سفارش</td>
                <td className="p-3 text-subtle-ink">پیش از خروج از انبار</td>
                <td className="p-3 text-subtle-ink">
                  لغو فوری در پنل یا تماس با پشتیبانی
                </td>
                <td className="p-3">
                  <Link
                    href="/support/contact"
                    className="text-brand hover:underline"
                  >
                    تماس با ما
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-ink">
                  بازگشت کالا (مهلت تست)
                </td>
                <td className="p-3 text-subtle-ink">تا ۷ روز پس از تحویل</td>
                <td className="p-3 text-subtle-ink">
                  ثبت درخواست مرجوعی با علت معتبر
                </td>
                <td className="p-3">
                  <Link
                    href="/support/returns"
                    className="text-brand hover:underline"
                  >
                    رویه مرجوعی
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-ink">خدمات گارانتی شرکتی</td>
                <td className="p-3 text-subtle-ink">
                  ۱۸ الی ۲۴ ماه پس از خرید
                </td>
                <td className="p-3 text-subtle-ink">
                  ارائه کارت گارانتی به نمایندگی مجاز
                </td>
                <td className="p-3">
                  <Link
                    href="/support/warranty"
                    className="text-brand hover:underline"
                  >
                    شرایط گارانتی
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping FAQs */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
        <h2 className="text-title font-bold text-ink sm:text-heading">
          پرسش‌های پرتکرار ارسال و تحویل
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          <div className="rounded-lg bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              آیا امکان انتخاب بازه زمانی تحویل در تهران وجود دارد؟
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed sm:text-body-sm">
              بله؛ هنگام ثبت سفارش در مرحله انتخاب شیوه ارسال، می‌توانید
              بازه‌های صبح (۹ الی ۱۳) یا بعدازظهر (۱۴ الی ۱۹) را متناسب با
              برنامه زمانی خود برگزینید.
            </p>
          </div>
          <div className="rounded-lg bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              اگر هنگام تحویل سفارش در محل حضور نداشته باشم چه می‌شود؟
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed sm:text-body-sm">
              سفیر تحویل الکتروما پیش از مراجعه با شما تماس خواهد گرفت. در صورت
              عدم پاسخ‌گویی، هماهنگی برای نوبت دوم ارسال انجام شده و در پست
              پیشتاز، بسته در باجه معطله منطقه پستی نگهداری خواهد شد.
            </p>
          </div>
          <div className="rounded-lg bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              هزینه ارسال چگونه در سبد خرید محاسبه می‌شود؟
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed sm:text-body-sm">
              اگر مجموع سبد خرید شما بالای ۵ میلیون تومان باشد، هزینه ارسال صفر
              ریال (رایگان) محاسبه می‌شود؛ برای مبالغ کمتر، هزینه ثابت طبق جدول
              تعرفه‌ها درج خواهد شد.
            </p>
          </div>
          <div className="rounded-lg bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              چگونه کد رهگیری مرسوله پستی خود را دریافت کنم؟
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed sm:text-body-sm">
              به محض تحویل بسته به شرکت ملی پست، کد رهگیری ۲۴ رقمی پیامک شده و
              در بخش «سفارش‌های من» پنل کاربری نیز ثبت می‌گردد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReturnsTopicContent() {
  return (
    <div className="flex flex-col gap-10">
      {/* Disclaimer Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-line bg-surface-soft p-4 text-caption text-subtle-ink">
        <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
        <p className="leading-relaxed">
          <strong className="text-ink font-bold">
            اطلاعیه شفافیت نسخه نمایشی:
          </strong>{" "}
          وب‌سایت الکتروما یک پروتوتایپ فروشگاهی مدرن است و عملیات مرجوعی، تست
          آزمایشگاهی و بازگشت وجه در این نسخه به‌صورت شبیه‌سازی‌شده عمل می‌کنند
          و فاقد تعهدات تجاری الزام‌آور خارج از چارچوب پروژه هستند.
        </p>
      </div>

      {/* 7-day Guarantee Banner */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/25 bg-brand-soft/40 p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-title font-bold text-ink sm:text-heading">
            ضمانت ۷ روزه مهلت تست و بازگشت کالا
          </h2>
          <p className="mt-1 text-caption text-subtle-ink sm:text-body-sm leading-relaxed">
            آسودگی خاطر شما در خرید کالای دیجیتال اولویت ماست؛ تا ۷ روز پس از
            دریافت، امکان ثبت درخواست بررسی و عودت کالا طبق شرایط رسمی وجود
            دارد.
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/account/returns/new">ثبت آنلاین درخواست مرجوعی</Link>
        </Button>
      </div>

      {/* What to Prepare Before Filing */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
        <h2 className="text-title font-bold text-ink sm:text-heading">
          اطلاعات و مدارک مورد نیاز پیش از ثبت درخواست
        </h2>
        <p className="mt-1 text-caption text-subtle-ink sm:text-body-sm">
          برای تسریع در فرآیند بررسی، پیش از ثبت فرم آنلاین موارد زیر را آماده
          فرمایید:
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <span className="text-caption font-bold text-brand">
              ۱. شماره سفارش
            </span>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              شماره سفارش درج‌شده در فاکتور یا پیامک تایید خرید (نظیر
              ELC-1405-...).
            </p>
          </div>
          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <span className="text-caption font-bold text-brand">
              ۲. شماره سریال / IMEI
            </span>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              سریال کالای معیوب که با جعبه و فاکتور الکتروما مطابقت داشته باشد.
            </p>
          </div>
          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <span className="text-caption font-bold text-brand">
              ۳. عکس یا ویدئوی شفاف
            </span>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              تصویر یا فیلم کوتاه نشان‌دهنده نقص فنی، آسیب فیزیکی یا وضعیت پلمپ
              بسته.
            </p>
          </div>
          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <span className="text-caption font-bold text-brand">
              ۴. شماره شبا معتبر
            </span>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              شماره شبا بانکی به نام شخص خریدار جهت واریز وجه در صورت تایید
              مرجوعی.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Steps Walkthrough */}
      <div className="flex flex-col gap-4">
        <h2 className="text-title font-bold text-ink sm:text-heading">
          مراحل چهارگانه رسیدگی به درخواست مرجوعی
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-line bg-surface p-4 shadow-soft">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-caption font-bold text-white">
              ۱
            </span>
            <h3 className="mt-3 text-body-sm font-bold text-ink">
              ثبت درخواست آنلاین
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              ورود به حساب کاربری، انتخاب سفارش مربوطه و بارگذاری تصاویر و علت
              بازگشت.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4 shadow-soft">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-caption font-bold text-white">
              ۲
            </span>
            <h3 className="mt-3 text-body-sm font-bold text-ink">
              کارشناسی اولیه
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              بررسی مدارک توسط کارشناسان پشتیبانی ظرف حداکثر ۲۴ ساعت کاری و
              اعلام تایید اولیه.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4 shadow-soft">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-caption font-bold text-white">
              ۳
            </span>
            <h3 className="mt-3 text-body-sm font-bold text-ink">
              ارسال کالا به انبار
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              بسته‌بندی ایمن کالا و ارسال آن از طریق پست پیشتاز یا پیک با
              هماهنگی واحد مرجوعی.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4 shadow-soft">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-caption font-bold text-white">
              ۴
            </span>
            <h3 className="mt-3 text-body-sm font-bold text-ink">
              تست آزمایشگاهی و تسویه
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              بررسی سلامت فنی کالا در لابراتوار تخصصی و اقدام به تعویض یا
              استرداد وجه ظرف ۲۴ تا ۴۸ ساعت.
            </p>
          </div>
        </div>
      </div>

      {/* Return Scenarios Breakdown */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
        <h2 className="text-title font-bold text-ink sm:text-heading">
          بررسی سناریوهای مختلف بازگرداندن کالا
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              سناریوی ۱: نقص فنی اولیه (Dead on Arrival)
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              اگر دستگاه دیجیتال از بدو روشن‌شدن دارای نقص کارخانه‌ای (نظیر عدم
              شارژ، پیکسل سوخته فراتر از استاندارد، روشن نشدن) باشد، بلافاصله
              مشمول تعویض فوری یا استرداد کامل وجه می‌گردد.
            </p>
          </div>
          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              سناریوی ۲: مغایرت با فاکتور یا مشخصات سایت
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              در صورت عدم تطابق رنگ، ظرفیت حافظه، مدل پردازنده یا نسخه ارسالی با
              مشخصات ثبت‌شده، بدون کسر هزینه و به صورت رایگان کالا بازگردانده
              شده و مورد صحیح ارسال می‌شود.
            </p>
          </div>
          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              سناریوی ۳: آسیب فیزیکی حین حمل‌ونقل
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              اگر بسته دچار ضربه مشهود شده باشد و ظرف ۲۴ ساعت صورت‌جلسه خسارت
              ثبت گردد، مرسوله توسط بیمه پوشش داده شده و کالای جایگزین سریعاً
              ارسال می‌شود.
            </p>
          </div>
          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              سناریوی ۴: انصراف از خرید (پشیمانی)
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              انصراف از خرید صرفاً در شرایطی پذیرفته می‌شود که کالا کاملاً پلمپ
              بوده، سلفون آن باز نشده باشد و هیچ‌گونه دخل و تصرفی در بسته‌بندی
              اولیه صورت نگرفته باشد.
            </p>
          </div>
        </div>
      </div>

      {/* Conditions Checklist: Eligible vs Non-eligible */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <h3 className="text-body font-bold text-success flex items-center gap-2">
            <CheckCircle2 className="size-5" />
            شرایط پذیرش مرجوعی
          </h3>
          <ul className="mt-3 flex flex-col gap-2.5 text-caption text-subtle-ink leading-relaxed sm:text-body-sm">
            <li>
              • حفظ جعبه اصلی و کلیه متعلقات، کابل‌ها، دفترچه‌ها و آداپتور بدون
              پارگی.
            </li>
            <li>
              • عدم ثبت رمز عبور (Passcode)، اثر انگشت یا حساب ابری (Apple ID /
              Google Account) روی دستگاه.
            </li>
            <li>
              • ثبت درخواست در بازه زمانی قانونی ۷ روز پس از دریافت سفارش.
            </li>
            <li>• عدم مخدوش شدن برچسب‌های پلمپ و شماره سریال شرکتی دستگاه.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <h3 className="text-body font-bold text-sale flex items-center gap-2">
            <AlertCircle className="size-5" />
            استثنائات غیرقابل مرجوعی
          </h3>
          <ul className="mt-3 flex flex-col gap-2.5 text-caption text-subtle-ink leading-relaxed sm:text-body-sm">
            <li>
              • ضربه‌خوردگی، شکستگی، خط و خش، آب‌خوردگی یا آسیب ناشی از نوسانات
              شدید برق.
            </li>
            <li>
              • باز شدن پلمپ اقلام بهداشتی و مصرفی (نظیر ایربادها، هندزفری‌های
              توگوشی و نوک قلم).
            </li>
            <li>
              • دستکاری سخت‌افزاری یا فلش کردن فریم‌ور غیراستاندارد دستگاه.
            </li>
            <li>
              • ارسال بدون جعبه اصلی یا الصاق برچسب و نوشتن روی جعبه اصلی محصول.
            </li>
          </ul>
        </div>
      </div>

      {/* Refund & Replacement Options */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
        <h2 className="text-title font-bold text-ink sm:text-heading">
          گزینه‌های استرداد وجه و جبران خسارت
        </h2>
        <p className="mt-1 text-caption text-subtle-ink sm:text-body-sm">
          پس از تایید قطعی مرجوعی در آزمایشگاه فنی، خریدار می‌تواند یکی از
          روش‌های زیر را انتخاب کند:
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <span className="text-body-sm font-bold text-brand">
              ۱. شارژ فوری کیف پول
            </span>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              شارژ آنی موجودی کیف پول در حساب کاربری الکتروما جهت خرید فوری
              کالای دیگر بدون اتلاف وقت بانکی.
            </p>
          </div>
          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <span className="text-body-sm font-bold text-brand">
              ۲. واریز به شماره شبا
            </span>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              واریز مبلغ سفارش به شماره شبای ثبت‌شده کاربر در بخش پروفایل ظرف ۲۴
              الی ۴۸ ساعت کاری از طریق پایا.
            </p>
          </div>
          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <span className="text-body-sm font-bold text-brand">
              ۳. تعویض با کالای نو
            </span>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              ارسال یک عدد کالای کاملاً آکبند و نو از همان مدل در صورت موجود
              بودن در انبار الکتروما.
            </p>
          </div>
        </div>
      </div>

      {/* Returns FAQs */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
        <h2 className="text-title font-bold text-ink sm:text-heading">
          پرسش‌های پرتکرار مرجوعی و بازگشت کالا
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          <div className="rounded-lg bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              هزینه بازگرداندن کالا بر عهده چه کسی است؟
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed sm:text-body-sm">
              در صورت تایید نقص فنی، مغایرت یا آسیب ترانزیتی، کلیه هزینه‌های
              پستی بر عهده الکتروما است. در صورت انصراف سلیقه‌ای از خرید، هزینه
              ارسال بر عهده خریدار خواهد بود.
            </p>
          </div>
          <div className="rounded-lg bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              تست آزمایشگاهی چقدر زمان می‌برد؟
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed sm:text-body-sm">
              پس از دریافت کالا توسط انبار، نتیجه کارشناسی حداکثر ظرف ۴۸ ساعت
              کاری از طریق پیامک و تماس تلفنی به اطلاع شما خواهد رسید.
            </p>
          </div>
          <div className="rounded-lg bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              اگر کالای مرجوعی دیگر در انبار موجود نباشد چه اقدامی انجام می‌شود؟
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed sm:text-body-sm">
              در صورت عدم موجودی کالای یکسان جهت تعویض، وجه سفارش فوراً و بدون
              کسر هیچ‌گونه هزینه‌ای به حساب شبا یا کیف پول شما بازگردانده
              می‌شود.
            </p>
          </div>
          <div className="rounded-lg bg-surface-soft p-4">
            <h3 className="text-body-sm font-bold text-ink">
              تفاوت مرجوعی ۷ روزه با گارانتی ۱۸ ماهه چیست؟
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed sm:text-body-sm">
              مهلت تست ۷ روزه ویژه عیوب اولیه کارخانه‌ای و تطابق سفارش با
              فروشگاه الکتروما است؛ پس از گذشت ۷ روز، کلیه خدمات فنی توسط شرکت
              ارائه‌دهنده گارانتی طبق کارت همراه محصول ارائه خواهد شد.
            </p>
          </div>
        </div>
      </div>

      {/* Useful Quick Links */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface-soft p-4 text-caption text-subtle-ink">
        <span>پیوندهای پرکاربرد:</span>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/account/orders"
            className="font-medium text-brand hover:underline"
          >
            سفارش‌های من
          </Link>
          <span>•</span>
          <Link
            href="/support/shipping"
            className="font-medium text-brand hover:underline"
          >
            رویه ارسال
          </Link>
          <span>•</span>
          <Link
            href="/support/warranty"
            className="font-medium text-brand hover:underline"
          >
            شرایط گارانتی
          </Link>
          <span>•</span>
          <Link
            href="/support/contact"
            className="font-medium text-brand hover:underline"
          >
            تماس با پشتیبانی
          </Link>
        </div>
      </div>
    </div>
  );
}

function WarrantyTopicContent() {
  return (
    <div className="flex flex-col gap-8">
      {/* Overview Card */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
        <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand-active">
          <ShieldCheck className="size-6" aria-hidden />
        </span>
        <h2 className="mt-4 text-title font-bold text-ink sm:text-heading">
          راهنمای جامع شرایط گارانتی و خدمات پس از فروش
        </h2>
        <p className="mt-2 text-body-sm text-body leading-relaxed sm:text-body">
          گارانتی کالاهای دیجیتال، تعهد رسمی شرکت واردکننده یا تولیدکننده کالا
          نسبت به تضمین سلامت فنی، رفع عیوب ناشی از ساخت و تامین قطعات یدکی در
          دوره زمانی مشخص است. در الکتروما تمامی کالاها با مشخصات دقیق اصالت و
          نام شرکت گارانتی‌کننده عرضه می‌شوند تا خریدی شفاف و مطمئن داشته باشید.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-surface-soft p-4">
            <h3 className="font-bold text-ink text-body-sm">
              اصالت و سلامت فیزیکی
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              تضمین تحویل کالای آکبند، دست‌نخورده و بدون نقص ظاهری با مهلت تست
              اولیه ۷ روزه.
            </p>
          </div>
          <div className="rounded-lg bg-surface-soft p-4">
            <h3 className="font-bold text-ink text-body-sm">
              رجیستری رسمی در سامانه همتا
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              تمامی دستگاه‌های سیم‌کارت‌خور دارای کد فعال‌سازی قانونی و ثبت
              معتبر در شبکه ارتباطی کشور هستند.
            </p>
          </div>
          <div className="rounded-lg bg-surface-soft p-4">
            <h3 className="font-bold text-ink text-body-sm">
              شفافیت تعهدات شرکتی
            </h3>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              درج نام دقیق شرکت ارائه‌دهنده گارانتی، مدت اعتبار و شناسه رهگیری
              در صفحه مشخصات هر محصول.
            </p>
          </div>
        </div>
      </div>

      {/* Types of Warranties */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
        <h3 className="text-title font-bold text-ink">
          انواع گارانتی در بازار کالای دیجیتال
        </h3>
        <p className="mt-1 text-body-sm text-subtle-ink">
          آشنایی با تمایز گارانتی‌ها به شما کمک می‌کند متناسب با اولویت خود
          بهترین انتخاب را داشته باشید:
        </p>

        <div className="mt-4 flex flex-col gap-3">
          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <h4 className="font-bold text-ink text-body-sm">
              ۱. گارانتی رسمی شرکت‌های معتبر واردکننده (۱۸ ماهه شرکتی)
            </h4>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              رایج‌ترین و معتبرترین نوع گارانتی در بازار ایران؛ کالا توسط
              شرکت‌های دارای مجوز رسمی از وزارت صمت وارد شده و مشمول ۱۸ ماه
              خدمات پس از فروش، تعویض قطعه یا تعمیر در مراکز مجاز آن شرکت است.
            </p>
          </div>

          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <h4 className="font-bold text-ink text-body-sm">
              ۲. گارانتی بین‌المللی سازنده (Manufacturer Warranty)
            </h4>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              محصولاتی که دارای ضمانت‌نامه بین‌المللی برند سازنده هستند. با توجه
              به شرایط منطقه‌ای، پشتیبانی این گروه در کشور از طریق نمایندگی‌های
              ارائه‌دهنده خدمات تخصصی آن برند پیگیری می‌شود.
            </p>
          </div>

          <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
            <h4 className="font-bold text-ink text-body-sm">
              ۳. مهلت تست اولیه و ضمانت تطابق الکتروما (۷ روزه)
            </h4>
            <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
              تعهد فروشگاه الکتروما مبنی بر مطابقت کامل کالا با مشخصات سفارش،
              سلامت فیزیکی هنگام تحویل و امکان بازگشت یا تعویض کالا در صورت
              مشاهده نقص فنی اولیه در هفته نخست خرید.
            </p>
          </div>
        </div>
      </div>

      {/* Exclusions & Inclusions */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <h3 className="flex items-center gap-2 text-body font-bold text-ink sm:text-title-sm">
            <CheckCircle2 className="size-5 text-success" aria-hidden />
            موارد تحت پوشش گارانتی
          </h3>
          <ul className="mt-3 flex flex-col gap-2.5 text-body-sm text-subtle-ink leading-relaxed">
            <li>
              • عیوب کارخانه‌ای قطعات داخلی (نظیر بورد اصلی، پردازنده و
              چیپست‌ها).
            </li>
            <li>
              • نقص خودبه‌خودی در عملکرد صفحه نمایش بدون وجود هرگونه ضربه یا
              فشار فیزیکی.
            </li>
            <li>
              • اختلال ذاتی در عملکرد درگاه‌ها، اتصالات شبکه، وای‌فای و بلوتوث.
            </li>
            <li>
              • نقص فنی باتری در صورتی که کارایی آن در بازه زمانی کوتاه به شکل
              نامتعارف افت کند.
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <h3 className="flex items-center gap-2 text-body font-bold text-ink sm:text-title-sm">
            <AlertCircle className="size-5 text-sale" aria-hidden />
            موارد خارج از شمول گارانتی (استثنائات)
          </h3>
          <ul className="mt-3 flex flex-col gap-2.5 text-body-sm text-subtle-ink leading-relaxed">
            <li>
              • صدمات فیزیکی ناشی از سقوط، ضربه، فشار، خط و خش عمیق و شکستگی.
            </li>
            <li>
              • نفوذ رطوبت، مایعات، و زنگ‌زدگی پورت‌ها (حتی در مدل‌های دارای
              استاندارد ضدآب).
            </li>
            <li>
              • نوسانات ناشی از برق شهری یا استفاده از شارژرها و کابل‌های
              غیراستاندارد و تقلبی.
            </li>
            <li>
              • دستکاری سخت‌افزاری یا باز شدن پیچ‌های دستگاه توسط افراد یا
              تعمیرکاران متفرقه.
            </li>
            <li>
              • تغییرات نرم‌افزاری مخرب، روت کردن، آنلاک غیررسمی بوت‌لودر یا نصب
              رام‌های دستکاری‌شده.
            </li>
          </ul>
        </div>
      </div>

      {/* 5-Step Process */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
        <h3 className="text-title font-bold text-ink">
          مراحل درخواست خدمات و پیگیری گارانتی
        </h3>
        <p className="mt-1 text-body-sm text-subtle-ink">
          در صورت بروز اشکال در دستگاه، فرآیند استاندارد زیر را برای دریافت
          خدمات طی فرمایید:
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-5">
          <div className="flex flex-col gap-2 rounded-lg bg-surface-soft p-3.5">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-caption font-bold text-white">
              ۱
            </span>
            <h4 className="font-bold text-ink text-body-sm">
              بررسی کارت گارانتی
            </h4>
            <p className="text-caption text-subtle-ink leading-relaxed">
              اطلاعات شرکت گارانتی‌کننده، شماره تماس و تاریخ انقضا را از روی
              کارت یا جعبه بخوانید.
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-lg bg-surface-soft p-3.5">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-caption font-bold text-white">
              ۲
            </span>
            <h4 className="font-bold text-ink text-body-sm">
              تماس با مرکز خدمات
            </h4>
            <p className="text-caption text-subtle-ink leading-relaxed">
              با شماره پشتیبانی شرکت گارانتی تماس گرفته و کد خطای رخ‌داده را شرح
              دهید.
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-lg bg-surface-soft p-3.5">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-caption font-bold text-white">
              ۳
            </span>
            <h4 className="font-bold text-ink text-body-sm">
              آماده‌سازی مدارک
            </h4>
            <p className="text-caption text-subtle-ink leading-relaxed">
              کارت گارانتی، فاکتور خرید، جعبه دستگاه و لوازم جانبی اصلی را همراه
              دستگاه بگذارید.
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-lg bg-surface-soft p-3.5">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-caption font-bold text-white">
              ۴
            </span>
            <h4 className="font-bold text-ink text-body-sm">ارسال یا تحویل</h4>
            <p className="text-caption text-subtle-ink leading-relaxed">
              کالا را حضوری یا پستی به آدرس مرکز خدمات اعلام‌شده توسط شرکت
              واردکننده تحویل دهید.
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-lg bg-surface-soft p-3.5">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-caption font-bold text-white">
              ۵
            </span>
            <h4 className="font-bold text-ink text-body-sm">
              کارشناسی و نتیجه
            </h4>
            <p className="text-caption text-subtle-ink leading-relaxed">
              تعمیر تخصصی قطعه یا در صورت نقص اساسی، تعویض دستگاه مطابق
              دستورالعمل خدمات پس از فروش.
            </p>
          </div>
        </div>
      </div>

      {/* Honest Disclaimer */}
      <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-caption text-subtle-ink shadow-soft sm:p-5">
        <Clock className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
        <div className="leading-relaxed">
          <strong className="text-ink">نکته حقوقی و شفافیت ضوابط:</strong>{" "}
          تعهدات قطعی، ضوابط پذیرش، هزینه‌های احتمالی خارج از گارانتی و مدت‌زمان
          اعتبار گارانتی، بر اساس ضوابط رسمی شرکت گارانتی‌کننده قیدشده بر روی
          کارت یا برچسب گارانتی هر محصول تعیین می‌گردد. تیم پشتیبانی الکتروما
          آماده راهنمایی شما در زمینه معرفی و تماس با شرکت‌های خدمات‌دهنده رسمی
          است.
        </div>
      </div>
    </div>
  );
}

function PaymentTopicContent() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand-active">
            <CreditCard className="size-6" aria-hidden />
          </span>
          <h3 className="mt-3 text-body font-bold text-ink">
            درگاه پرداخت اینترنتی شاپرک
          </h3>
          <p className="mt-1.5 text-body-sm text-subtle-ink leading-relaxed">
            پرداخت آنی و امن با کلیه کارت‌های بانکی شتاب از طریق درگاه‌های
            سامان، ملت، پارسیان و پاسارگاد مجهز به پروتکل امنیتی SSL.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand-active">
            <Wallet className="size-6" aria-hidden />
          </span>
          <h3 className="mt-3 text-body font-bold text-ink">
            کیف پول دیجیتال الکتروما
          </h3>
          <p className="mt-1.5 text-body-sm text-subtle-ink leading-relaxed">
            تسویه حساب یک‌کلیکه و آنی بدون نیاز به رمز دوم پویا با شارژ حساب
            کاربری و دریافت جوایز نقدی بازگشت وجه (Cashback).
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
        <h2 className="text-title font-bold text-ink">
          پیگیری تراکنش‌های ناموفق بانکی
        </h2>
        <p className="mt-2 text-body-sm text-body leading-relaxed">
          اگر حین واریز وجه، ارتباط اینترنتی قطع شد یا با پیغام خطا مواجه شدید و
          مبلغ از حسابتان کسر گردید، نگران نباشید:
        </p>
        <ul className="mt-3 flex flex-col gap-2 text-body-sm text-subtle-ink">
          <li>
            ۱. در ۹۸٪ موارد مبلغ کسرشده ظرف ۱۵ دقیقه به‌طور اتوماتیک توسط سامانه
            شاپرک به حسابتان برگشت می‌خورد.
          </li>
          <li>
            ۲. در موارد نادر اختلال بین‌بانکی، بازگشت وجه حداکثر تا ۷۲ ساعت کاری
            انجام می‌گیرد.
          </li>
          <li>
            ۳. چنانچه پس از ۷۲ ساعت وجه بازنگشت، شماره پیگیری بانکی را از طریق
            صفحه «تماس با ما» ارسال فرمایید.
          </li>
        </ul>
      </div>
    </div>
  );
}

function ContactTopicContent() {
  return (
    <div className="flex flex-col gap-8">
      {/* Contact Info Tiles */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand-active">
            <Phone className="size-5" aria-hidden />
          </span>
          <h3 className="mt-3 text-body font-bold text-ink">
            تلفن پشتیبانی مشتریان
          </h3>
          <p className="mt-1 text-caption text-subtle-ink">
            شنبه تا چهارشنبه ۹ الی ۲۱ • پنجشنبه ۹ الی ۱۸
          </p>
          <a
            href={siteConfig.supportPhoneHref}
            className="mt-2 block font-bold text-brand text-body-sm"
            dir="ltr"
          >
            {siteConfig.supportPhone}
          </a>
        </div>

        <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand-active">
            <Mail className="size-5" aria-hidden />
          </span>
          <h3 className="mt-3 text-body font-bold text-ink">
            پست الکترونیک رسمی
          </h3>
          <p className="mt-1 text-caption text-subtle-ink">
            پاسخگویی ظرف حداکثر ۲۴ ساعت کاری
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-2 block font-bold text-brand text-body-sm"
            dir="ltr"
          >
            {siteConfig.email}
          </a>
        </div>

        <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
          <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand-active">
            <MapPin className="size-5" aria-hidden />
          </span>
          <h3 className="mt-3 text-body font-bold text-ink">دفتر مرکزی</h3>
          <p className="mt-1 text-caption text-subtle-ink leading-relaxed">
            {siteConfig.address}
          </p>
        </div>
      </div>

      {/* Guidelines Box */}
      <div className="rounded-xl border border-primary/20 bg-brand-soft/30 p-5 shadow-soft sm:p-6">
        <h3 className="text-body font-bold text-ink sm:text-title-sm">
          اطلاعات لازم پیش از ارسال پیام
        </h3>
        <p className="mt-1 text-body-sm text-subtle-ink">
          برای رسیدگی سریع‌تر، لطفاً در متن پیام خود مشخصات مربوطه را درج
          فرمایید:
        </p>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-3 text-caption text-body leading-relaxed">
          <li className="rounded-lg bg-surface p-3 border border-line-subtle">
            <strong className="block text-ink">پیگیری وضعیت سفارش:</strong>
            شماره سفارش (مانند order-1405-01042) را در متن پیام وارد کنید.
          </li>
          <li className="rounded-lg bg-surface p-3 border border-line-subtle">
            <strong className="block text-ink">امور گارانتی و خدمات:</strong>
            نام شرکت گارانتی، مدل کالا و شرح دقیق نقص را قید نمایید.
          </li>
          <li className="rounded-lg bg-surface p-3 border border-line-subtle">
            <strong className="block text-ink">مشاوره تخصصی خرید:</strong>
            بازه بودجه مورد نظر و نوع کاربرد خود را ذکر فرمایید.
          </li>
        </ul>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-8">
        <div className="mb-6">
          <h2 className="text-title font-bold text-ink sm:text-heading">
            ارسال پیام به واحد پشتیبانی
          </h2>
          <p className="mt-1 text-body-sm text-subtle-ink">
            فرم زیر را تکمیل نمایید؛ پیام‌ها بر اساس اولویت بررسی و پاسخ از طریق
            پیامک یا ایمیل ارسال می‌گردد.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

function TrackingTopicContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-8">
        <h2 className="text-title font-bold text-ink sm:text-heading">
          استعلام آنلاین وضعیت مرسوله
        </h2>
        <p className="mt-1 text-body-sm text-subtle-ink">
          برای پیگیری بسته پستی خود، شماره سفارش (مانند order-1405-01042) یا کد
          پیگیری یا شماره تماس را وارد کنید:
        </p>

        <div className="mt-6">
          <OrderTrackingLookup />
        </div>
      </div>

      <div className="rounded-xl border border-line bg-surface p-5 shadow-soft">
        <h3 className="text-body font-bold text-ink">
          راهنمای وضعیت‌های مرسوله
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3 text-caption">
          <div className="rounded-lg bg-surface-soft p-3">
            <p className="font-bold text-ink">در حال پردازش</p>
            <p className="text-subtle-ink mt-1">
              سفارش ثبت و کالاها در انبار در مرحله جمع‌آوری و بسته‌بندی هستند.
            </p>
          </div>
          <div className="rounded-lg bg-surface-soft p-3">
            <p className="font-bold text-ink">ارسال‌شده</p>
            <p className="text-subtle-ink mt-1">
              مرسوله به پست یا تیپاکس تحویل شده و در مسیر حمل بین‌شهری است.
            </p>
          </div>
          <div className="rounded-lg bg-surface-soft p-3">
            <p className="font-bold text-ink">تحویل‌شده</p>
            <p className="text-subtle-ink mt-1">
              مرسوله با دریافت امضا با موفقیت به گیرنده تحویل گردیده است.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
