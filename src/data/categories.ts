import type { Category } from "@/types";

/**
 * Full catalogue taxonomy (UI_SPEC §2) with realistic product counts.
 * `image` is only set for the categories that own a real photo asset — the
 * rest are rendered as icon tiles, so no empty/broken tiles are possible.
 */
export const categories: Category[] = [
  {
    slug: "mobile-phones",
    title: "گوشی موبایل",
    icon: "smartphone",
    productCount: 1284,
    description:
      "گوشی‌های هوشمند برندهای معتبر، از مدل‌های اقتصادی تا پرچم‌داران؛ همراه با گارانتی معتبر و ضمانت اصالت کالا.",
    image: "/images/category/mobile.webp",
    highlight: "پرچم‌داران ۱۴۰۴",
    children: [
      { slug: "apple", title: "اپل" },
      { slug: "samsung", title: "سامسونگ" },
      { slug: "xiaomi", title: "شیائومی" },
      { slug: "huawei", title: "هواوی" },
    ],
  },
  {
    slug: "laptops",
    title: "لپ‌تاپ",
    icon: "laptop",
    productCount: 742,
    description:
      "لپ‌تاپ‌های اداری، اولترابوک و گیمینگ برای کار، تحصیل و بازی؛ در بازه‌های قیمتی مختلف.",
    image: "/images/category/laptop.webp",
    highlight: "مخصوص کار و بازی",
    children: [
      { slug: "ultrabook", title: "اولترابوک" },
      { slug: "gaming", title: "گیمینگ" },
      { slug: "macbook", title: "مک‌بوک" },
    ],
  },
  {
    slug: "headphones",
    title: "هدفون و ایرباد",
    icon: "headphones",
    productCount: 638,
    description:
      "هدفون، ایرباد و هدست با گزینه‌های نویز کنسلینگ، بی‌سیم و حرفه‌ای برای موسیقی، تماس و بازی.",
    image: "/images/category/audio.webp",
    highlight: "نویز کنسلینگ",
    children: [
      { slug: "headphone", title: "هدفون" },
      { slug: "earbuds", title: "ایرباد" },
      { slug: "headset", title: "هدست" },
    ],
  },
  {
    slug: "smart-watches",
    title: "ساعت و مچ‌بند هوشمند",
    icon: "watch",
    productCount: 415,
    description:
      "ساعت و مچ‌بند هوشمند با پایش سلامت، اعلان‌ها و قابلیت اتصال به گوشی.",
    image: "/images/category/watch.webp",
    children: [
      { slug: "watch", title: "ساعت هوشمند" },
      { slug: "band", title: "مچ‌بند" },
    ],
  },
  {
    slug: "gaming-consoles",
    title: "کنسول و گیمینگ",
    icon: "gamepad",
    productCount: 356,
    description:
      "کنسول بازی، دسته، هدست و لوازم جانبی گیمینگ برای تکمیل میز بازی شما.",
    image: "/images/category/gaming.webp",
    children: [
      { slug: "console", title: "کنسول بازی" },
      { slug: "controller", title: "دسته بازی" },
      { slug: "gaming-headset", title: "هدست گیمینگ" },
    ],
  },
  {
    slug: "mobile-accessories",
    title: "لوازم جانبی",
    icon: "plug",
    productCount: 1926,
    description:
      "لوازم جانبی موبایل شامل شارژر، پاوربانک، کابل و مبدل‌های کاربردی.",
    image: "/images/category/accessories.webp",
    children: [
      { slug: "charger", title: "شارژر" },
      { slug: "power-bank", title: "پاوربانک" },
      { slug: "cable", title: "کابل" },
    ],
  },
  {
    slug: "tablets",
    title: "تبلت",
    icon: "tablet",
    productCount: 268,
    description:
      "تبلت‌های مناسب مطالعه، طراحی، تماشای فیلم و کار سبک، همراه با پشتیبانی از قلم و کیبورد.",
    image: "/images/category/tablet.webp",
  },
  {
    slug: "cameras",
    title: "دوربین",
    icon: "camera",
    productCount: 187,
    description:
      "دوربین‌های بدون آینه و لنز برای عکاسی و فیلم‌برداری حرفه‌ای و تولید محتوا.",
    image: "/images/category/camera.webp",
  },
  {
    slug: "monitors",
    title: "مانیتور",
    icon: "monitor",
    productCount: 224,
    description:
      "مانیتورهای اداری و گیمینگ در اندازه‌ها و نرخ نوسازی مختلف با پنل‌های IPS و OLED.",
    image: "/images/category/monitor.webp",
  },
  {
    slug: "speakers",
    title: "اسپیکر",
    icon: "speaker",
    productCount: 312,
    description:
      "اسپیکرهای پرتابل و خانگی با کیفیت صدای بالا و قابلیت اتصال بی‌سیم.",
  },
  {
    slug: "chargers",
    title: "شارژر و آداپتور",
    icon: "battery-charging",
    productCount: 586,
    description:
      "شارژر و آداپتور دیواری با توان‌های مختلف و فناوری‌های شارژ سریع.",
  },
  {
    slug: "power-banks",
    title: "پاوربانک",
    icon: "battery-charging",
    productCount: 274,
    description:
      "پاوربانک با ظرفیت و توان خروجی متنوع برای شارژ موبایل و لپ‌تاپ در سفر.",
  },
  {
    slug: "cables",
    title: "کابل و مبدل",
    icon: "cable",
    productCount: 431,
    description:
      "کابل و مبدل شارژ و انتقال داده در انواع رابط‌های USB-C، Lightning و HDMI.",
  },
  {
    slug: "ssd",
    title: "حافظه SSD",
    icon: "hard-drive",
    productCount: 198,
    description:
      "حافظه‌های SSD داخلی و اکسترنال با سرعت بالا برای سیستم، کنسول و ذخیره‌سازی پرتابل.",
  },
  {
    slug: "hard-drives",
    title: "هارد دیسک",
    icon: "hard-drive",
    productCount: 143,
    description:
      "هارد دیسک داخلی و اکسترنال برای ذخیره‌سازی و پشتیبان‌گیری از داده‌ها.",
  },
  {
    slug: "flash-drives",
    title: "فلش مموری",
    icon: "hard-drive",
    productCount: 168,
    description: "فلش مموری با ظرفیت‌های مختلف برای جابه‌جایی سریع فایل‌ها.",
  },
  {
    slug: "components",
    title: "قطعات کامپیوتر",
    icon: "cpu",
    productCount: 352,
    description:
      "قطعات کامپیوتر شامل پردازنده، کارت گرافیک، مادربرد، رم و منبع تغذیه.",
  },
  {
    slug: "computer-accessories",
    title: "لوازم جانبی کامپیوتر",
    icon: "keyboard",
    productCount: 497,
    description:
      "لوازم جانبی کامپیوتر شامل کیبورد، ماوس، وبکم و پایه‌های ارگونومیک.",
  },
  {
    slug: "networking",
    title: "تجهیزات شبکه",
    icon: "wifi",
    productCount: 209,
    description: "روتر، مودم و تجهیزات شبکه برای اینترنت پرسرعت خانگی و اداری.",
  },
  {
    slug: "smart-home",
    title: "خانه هوشمند",
    icon: "house",
    productCount: 176,
    description:
      "محصولات خانه هوشمند برای کنترل روشنایی، امنیت و دستگاه‌های خانگی.",
  },
  {
    slug: "tv",
    title: "تلویزیون و سرگرمی",
    icon: "tv",
    productCount: 154,
    description: "تلویزیون و تجهیزات سرگرمی خانگی با کیفیت تصویر بالا.",
  },
  {
    slug: "content-creation",
    title: "تجهیزات تولید محتوا",
    icon: "camera",
    productCount: 231,
    description:
      "تجهیزات تولید محتوا شامل دوربین، میکروفون، نورپردازی و لوازم استودیویی.",
  },
  {
    slug: "printers",
    title: "پرینتر و اداری",
    icon: "printer",
    productCount: 121,
    description: "پرینتر، اسکنر و تجهیزات اداری برای مصارف خانگی و سازمانی.",
  },
];

/** Non-image categories surfaced as compact chips under the discovery grid. */
export const discoveryChips: string[] = [
  "speakers",
  "chargers",
  "power-banks",
  "ssd",
  "networking",
  "smart-home",
  "components",
  "content-creation",
  "printers",
  "tv",
];

export const categoryImageTiles: Category[] = [
  "mobile-phones",
  "laptops",
  "headphones",
].map((slug) => categories.find((category) => category.slug === slug)!);

export const categoryFeatureTiles: Category[] = [
  "tablets",
  "cameras",
  "smart-watches",
  "gaming-consoles",
  "monitors",
  "mobile-accessories",
].map((slug) => categories.find((category) => category.slug === slug)!);

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

/** Resolves a subcategory slug to its Persian label via the taxonomy. */
export function getSubcategoryLabel(slug: string): string {
  for (const category of categories) {
    const child = category.children?.find((item) => item.slug === slug);
    if (child) return child.title;
  }
  return slug;
}
