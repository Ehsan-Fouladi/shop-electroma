export interface CuratedCollection {
  slug: string;
  title: string;
  latinTitle: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  theme: "blue" | "purple" | "emerald" | "amber" | "rose";
  productIds: string[];
}

export const curatedCollections: CuratedCollection[] = [
  {
    slug: "apple-ecosystem",
    title: "اکوسیستم هوشمند اپل",
    latinTitle: "Apple Ecosystem",
    subtitle: "یکپارچگی بی‌نظیر آیفون، مک‌بوک و اپل واچ",
    description:
      "مجموعه‌ای دست‌چین از پرچم‌داران کوپرتینو؛ همگام‌سازی بی‌درنگ، کیفیت ساخت رده‌بالا و نهایت سرعت در انجام امور روزمره و حرفه‌ای.",
    image: "/images/category/mobile.webp",
    badge: "محبوب‌ترین",
    theme: "blue",
    productIds: ["p-001", "p-003", "p-009", "p-018", "p-026"],
  },
  {
    slug: "gaming-zone",
    title: "ست گیمینگ حرفه‌ای",
    latinTitle: "Pro Gaming Setup",
    subtitle: "کنسول‌ها، هدست‌ها و مانیتورهای با نرخ نوسازی بالا",
    description:
      "تجهیزات مورد نیاز گیمرهای حرفه‌ای برای اجرای روان بازی‌های نسل نهم؛ از جدیدترین کنسول‌های بازی تا مانیتورهای گیمینگ و تجهیزات صوتی استودیویی.",
    image: "/images/category/gaming.webp",
    badge: "گیمینگ",
    theme: "purple",
    productIds: ["p-014", "p-023", "p-036", "p-005", "p-019"],
  },
  {
    slug: "creator-studio",
    title: "تجهیزات تولید محتوا و برنامه‌نویسی",
    latinTitle: "Creator & Developer Studio",
    subtitle: "قدرت پردازش بالا، دوربین‌های شارپ و حافظه‌های سریع",
    description:
      "ابزارهای ضروری برای توسعه‌دهندگان نرم‌افزار، یوتیوبرها و طراحان گرافیک؛ لپ‌تاپ‌های با دوام باتری عالی، هارد و اس‌اس‌دی‌های فوق سریع و مانیتورهای کالیبره‌شده.",
    image: "/images/category/camera.webp",
    badge: "تخصصی",
    theme: "emerald",
    productIds: ["p-003", "p-007", "p-012", "p-015", "p-021"],
  },
  {
    slug: "audio-enthusiasts",
    title: "دنیای صوت و موسیقی بی‌سیم",
    latinTitle: "Audiophile Sound",
    subtitle: "نویز کنسلینگ پیشرفته، صدای شفاف و باس عمیق",
    description:
      "منتخبی از برترین هدفون‌ها، ایربادها و اسپیکرهای پرتابل از برندهای خوش‌نام دنیا برای کسانی که به جزئیات صدا و لذت موسیقی اهمیت می‌دهند.",
    image: "/images/category/audio.webp",
    badge: "کیفیت صدا",
    theme: "amber",
    productIds: ["p-005", "p-006", "p-017", "p-018", "p-028"],
  },
  {
    slug: "mobile-essentials",
    title: "ملزومات هوشمند همراه",
    latinTitle: "Daily Smart Essentials",
    subtitle: "پاوربانک، شارژر سریع و ساعت‌های پایش سلامت",
    description:
      "لوازم جانبی مطمئن برای روزهای پرمشغله؛ پاوربانک‌های فست شارژ انکر، کابل‌های بادوام، ساعت‌های هوشمند با پایش اکسیژن و ضربان قلب.",
    image: "/images/category/watch.webp",
    badge: "کاربردی",
    theme: "rose",
    productIds: ["p-002", "p-008", "p-010", "p-025", "p-030"],
  },
];

export function getCollection(slug: string): CuratedCollection | undefined {
  return curatedCollections.find((c) => c.slug === slug);
}
