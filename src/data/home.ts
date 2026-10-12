import { discountPercent } from "@/lib/formatters/number";
import { getProduct } from "@/data/products";
import { siteConfig } from "@/lib/constants/site";
import type { CampaignBanner, HeroSlide, PromoCard, ValueProp } from "@/types";

/* ------------------------------- Hero slides ------------------------------ */
/* Copy is derived from real catalogue records — no invented pricing claims.  */

const xm5 = getProduct("sony-wh-1000xm5");
const xm5Off = xm5?.oldPrice ? discountPercent(xm5.price, xm5.oldPrice) : null;
const budgetInMillions = siteConfig.freeShippingThreshold / 1_000_000;

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-flagship",
    eyebrow: "جدیدترین پرچم‌دار اپل",
    title: "آیفون ۱۶ پرو مکس",
    description:
      "بدنه تیتانیومی، تراشه A18 Pro و سیستم دوربین ۴۸ مگاپیکسلی؛ انتخابی برای کسانی که بهترین را می‌خواهند.",
    primaryCta: { label: "مشاهده و خرید", href: "/product/apple-iphone-16-pro-max-256" },
    secondaryCta: { label: "همه گوشی‌های موبایل", href: "/category/mobile-phones" },
    image: "/images/hero/slide-phone.webp",
    theme: "brand",
    stats: [
      { label: "گارانتی", value: "۱۸ ماه" },
      { label: "ارسال", value: "رایگان" },
      { label: "پرداخت", value: "اقساطی" },
    ],
  },
  {
    id: "hero-ultrabook",
    eyebrow: "کمپین بازگشت به کار و تحصیل",
    title: "مک‌بوک ایر M4",
    description:
      "نمایشگر ۱۵ اینچی، تراشه M4 و تا ۲۴ ساعت شارژدهی؛ سبک‌ترین انتخاب برای کار، مطالعه و طراحی.",
    primaryCta: { label: "مشاهده و خرید", href: "/product/apple-macbook-air-m4-15-256" },
    secondaryCta: { label: "همه لپ‌تاپ‌ها", href: "/category/laptops" },
    image: "/images/hero/slide-laptop.webp",
    theme: "slate",
    stats: [
      { label: "تراشه", value: "M4" },
      { label: "حافظه", value: "۲۵۶ گیگ" },
      { label: "گارانتی", value: "۱۲ ماه" },
    ],
  },
  {
    id: "hero-audio",
    eyebrow: "صدای بدون نویز",
    title: "هدفون سونی WH-1000XM5",
    description:
      "حذف نویز فعال دو نقطه‌ای، ۳۰ ساعت شارژدهی و صدای با کیفیت Hi-Res؛ حالا با تخفیف ویژه.",
    primaryCta: { label: "مشاهده و خرید", href: "/product/sony-wh-1000xm5" },
    secondaryCta: { label: "همه محصولات صوتی", href: "/category/headphones" },
    image: "/images/hero/slide-audio.webp",
    theme: "warm",
    promoBadge: xm5Off ? `${xm5Off}٪ تخفیف` : undefined,
    stats: [
      { label: "شارژدهی", value: "۳۰ ساعت" },
      { label: "اتصال", value: "بلوتوث ۵.۲" },
      { label: "گارانتی", value: "۱۸ ماه" },
    ],
  },
];

/* --------------------------- Promotional value cards --------------------------- */

export const promoCards: PromoCard[] = [
  {
    id: "promo-shipping",
    title: `ارسال رایگان بالای ${budgetInMillions} میلیون تومان`,
    description:
      "سفارش‌های واجد شرایط در تهران همان روز و در سایر شهرها با پست پیشتاز ارسال می‌شوند.",
    href: "/support/shipping",
    cta: "شرایط ارسال",
    icon: "truck",
    tone: "brand",
  },
  {
    id: "promo-payment",
    title: "پرداخت امن و اقساطی",
    description:
      "پرداخت آنلاین از طریق درگاه بانکی معتبر یا انتخاب روش اعتباری در مرحله تسویه سفارش.",
    href: "/support/payment",
    cta: "روش‌های پرداخت",
    icon: "credit-card",
    tone: "success",
  },
  {
    id: "promo-original",
    title: "ضمانت اصالت کالا",
    description:
      "تمام محصولات با گارانتی معتبر عرضه می‌شوند و اصالت آن‌ها تضمین شده است.",
    href: "/support/warranty",
    cta: "جزئیات گارانتی",
    icon: "shield-check",
    tone: "warning",
  },
  {
    id: "promo-return",
    title: "۷ روز مهلت بازگشت کالا",
    description:
      "اگر محصول با توضیحات یا انتظار شما مطابقت نداشت، تا ۷ روز امکان مرجوع کردن آن وجود دارد.",
    href: "/support/returns",
    cta: "فرآیند مرجوعی",
    icon: "refresh-ccw",
    tone: "brand",
  },
];

/* ------------------------------ Campaign banners ----------------------------- */

export const campaignBanners: CampaignBanner[] = [
  {
    id: "campaign-gaming",
    eyebrow: "دنیای گیمینگ",
    title: "کنسول و لوازم جانبی گیمینگ",
    description:
      "از کنسول و دسته بی‌سیم تا هدست و کیبورد مکانیکال؛ هرآنچه برای یک میز بازی کامل لازم دارید.",
    href: "/category/gaming-consoles",
    cta: "مشاهده محصولات",
    image: "/images/category/gaming.webp",
    layout: "wide",
    tone: "ink",
    bullets: ["کنسول و دسته بازی", "هدست و کیبورد گیمینگ", "مانیتورهای پرسرعت"],
  },
  {
    id: "campaign-creators",
    eyebrow: "برای تولیدکنندگان محتوا",
    title: "تجهیزات استودیوی خانگی",
    description:
      "دوربین بدون آینه، میکروفون و نورپردازی؛ انتخابی حرفه‌ای برای ساخت محتوای باکیفیت.",
    href: "/category/content-creation",
    cta: "مشاهده تجهیزات",
    image: "/images/category/camera.webp",
    layout: "tall",
    tone: "light",
  },
];

/* ------------------------------- Trust / value ------------------------------- */

export const valueProps: ValueProp[] = [
  {
    id: "value-original",
    title: "ضمانت اصالت کالا",
    description: "همه محصولات از فروشندگان معتبر و با گارانتی رسمی تأمین می‌شوند.",
    icon: "badge-check",
  },
  {
    id: "value-shipping",
    title: "ارسال سریع",
    description: "ارسال همان‌روز سفارش‌های تهران و ارسال سراسری با پست پیشتاز.",
    icon: "truck",
  },
  {
    id: "value-payment",
    title: "پرداخت امن",
    description: "اتصال به درگاه امن بانکی و امکان انتخاب پرداخت اعتباری در تسویه.",
    icon: "credit-card",
  },
  {
    id: "value-return",
    title: "۷ روز مهلت بازگشت",
    description: "امکان ثبت درخواست مرجوعی تا ۷ روز پس از دریافت سفارش.",
    icon: "refresh-ccw",
  },
  {
    id: "value-support",
    title: "پشتیبانی ۷ روز هفته",
    description: "پاسخ‌گویی کارشناسان از طریق تلفن، چت و تیکت در تمام روزهای هفته.",
    icon: "headset",
  },
  {
    id: "value-invoice",
    title: "فاکتور رسمی",
    description: "صدور فاکتور رسمی و ساده برای خریدهای شخصی و سازمانی.",
    icon: "file-check",
  },
];
