import type { NavItem } from "@/types";

/**
 * Header navigation. Columns reuse the real category taxonomy so the mega menu
 * can never point at a category that does not exist in the catalogue.
 */
export const mainNav: NavItem[] = [
  {
    title: "گوشی موبایل",
    href: "/category/mobile-phones",
    columns: [
      {
        title: "برندها",
        links: [
          { title: "اپل", href: "/category/mobile-phones/apple" },
          { title: "سامسونگ", href: "/category/mobile-phones/samsung" },
          { title: "شیائومی", href: "/category/mobile-phones/xiaomi" },
          { title: "هواوی", href: "/category/mobile-phones/huawei" },
        ],
      },
      {
        title: "بر اساس قیمت",
        links: [
          { title: "اقتصادی تا ۱۵ میلیون", href: "/category/mobile-phones" },
          {
            title: "میان‌رده ۱۵ تا ۴۰ میلیون",
            href: "/category/mobile-phones",
          },
          {
            title: "پرچم‌دار بالای ۴۰ میلیون",
            href: "/category/mobile-phones",
          },
        ],
      },
      {
        title: "محبوب‌ترین‌ها",
        links: [
          { title: "جدیدترین مدل‌ها", href: "/products?sort=newest" },
          { title: "پرفروش‌ترین‌ها", href: "/products?sort=best-selling" },
          { title: "بیشترین تخفیف", href: "/deals" },
        ],
      },
    ],
  },
  {
    title: "لپ‌تاپ",
    href: "/category/laptops",
    columns: [
      {
        title: "دسته‌بندی",
        links: [
          { title: "اولترابوک", href: "/category/laptops/ultrabook" },
          { title: "لپ‌تاپ گیمینگ", href: "/category/laptops/gaming" },
          { title: "مک‌بوک", href: "/category/laptops/macbook" },
        ],
      },
      {
        title: "برندها",
        links: [
          { title: "اپل", href: "/brand/apple" },
          { title: "ایسوس", href: "/brand/asus" },
          { title: "لنوو", href: "/brand/lenovo" },
          { title: "اچ‌پی", href: "/brand/hp" },
        ],
      },
    ],
  },
  {
    title: "صوتی",
    href: "/category/headphones",
    columns: [
      {
        title: "دسته‌بندی",
        links: [
          { title: "هدفون", href: "/category/headphones/headphone" },
          { title: "ایرباد", href: "/category/headphones/earbuds" },
          { title: "هدست", href: "/category/headphones/headset" },
          { title: "اسپیکر", href: "/category/speakers" },
        ],
      },
      {
        title: "ویژگی‌ها",
        links: [
          { title: "نویز کنسلینگ", href: "/category/headphones" },
          { title: "ضدآب و ورزشی", href: "/category/headphones" },
          { title: "استودیویی", href: "/category/headphones" },
        ],
      },
    ],
  },
  { title: "تبلت", href: "/category/tablets" },
  { title: "ساعت هوشمند", href: "/category/smart-watches" },
  { title: "گیمینگ", href: "/category/gaming-consoles" },
  { title: "دوربین", href: "/category/cameras" },
  { title: "مانیتور", href: "/category/monitors" },
  { title: "لوازم جانبی", href: "/category/mobile-accessories" },
  {
    title: "بیشتر",
    href: "/collections",
    columns: [
      {
        title: "خرید",
        links: [
          { title: "همه محصولات", href: "/products" },
          { title: "برندها", href: "/brands" },
          { title: "مجموعه‌ها", href: "/collections" },
          { title: "تخفیف‌ها", href: "/deals" },
        ],
      },
      {
        title: "محتوای آموزشی",
        links: [
          { title: "راهنمای خرید", href: "/blog" },
          { title: "مقالات", href: "/blog" },
          { title: "سوالات متداول", href: "/support/faq" },
        ],
      },
      {
        title: "خدمات مشتریان",
        links: [
          { title: "پیگیری سفارش", href: "/support/tracking" },
          { title: "رویه بازگرداندن کالا", href: "/support/returns" },
          { title: "تماس با ما", href: "/support/contact" },
        ],
      },
    ],
  },
];

export const popularSearches = [
  "آیفون ۱۶",
  "مک‌بوک ایر",
  "هدفون سونی",
  "ساعت هوشمند",
  "پاوربانک انکر",
  "کنسول بازی",
];

export const recentSearches = ["گوشی شیائومی", "مانیتور گیمینگ", "ایرباد اپل"];
