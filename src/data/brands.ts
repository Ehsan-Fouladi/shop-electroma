import type { Brand } from "@/types";

/**
 * Brands already present across the catalogue. `mark` refers to an inlined
 * Simple Icons mark (see `brand-logos.ts`); brands without a mark fall back to
 * a monogram tile, so the brand wall can never render an empty slot.
 */
export const brands: Brand[] = [
  {
    slug: "apple",
    title: "اپل",
    latin: "Apple",
    mark: "apple",
    productCount: 412,
    featured: true,
  },
  {
    slug: "samsung",
    title: "سامسونگ",
    latin: "Samsung",
    mark: "samsung",
    productCount: 638,
    featured: true,
  },
  {
    slug: "xiaomi",
    title: "شیائومی",
    latin: "Xiaomi",
    mark: "xiaomi",
    productCount: 574,
    featured: true,
  },
  {
    slug: "sony",
    title: "سونی",
    latin: "Sony",
    mark: "sony",
    productCount: 291,
    featured: true,
  },
  {
    slug: "jbl",
    title: "جی‌بی‌ال",
    latin: "JBL",
    mark: "jbl",
    productCount: 186,
    featured: true,
  },
  {
    slug: "lenovo",
    title: "لنوو",
    latin: "Lenovo",
    mark: "lenovo",
    productCount: 243,
    featured: true,
  },
  {
    slug: "asus",
    title: "ایسوس",
    latin: "ASUS",
    mark: "asus",
    productCount: 318,
    featured: true,
  },
  {
    slug: "hp",
    title: "اچ‌پی",
    latin: "HP",
    mark: "hp",
    productCount: 176,
    featured: true,
  },
  {
    slug: "huawei",
    title: "هواوی",
    latin: "Huawei",
    mark: "huawei",
    productCount: 204,
    featured: true,
  },
  {
    slug: "anker",
    title: "انکر",
    latin: "Anker",
    productCount: 268,
    featured: true,
  },
  {
    slug: "logitech",
    title: "لاجیتک",
    latin: "Logitech",
    mark: "logitech",
    productCount: 192,
    featured: true,
  },
  {
    slug: "hyperx",
    title: "هایپرایکس",
    latin: "HyperX",
    mark: "hyperx",
    productCount: 121,
  },
  { slug: "canon", title: "کانن", latin: "Canon", productCount: 98 },
  { slug: "lg", title: "ال‌جی", latin: "LG", mark: "lg", productCount: 167 },
  {
    slug: "tp-link",
    title: "تی‌پی-لینک",
    latin: "TP-Link",
    mark: "tplink",
    productCount: 143,
  },
  {
    slug: "western-digital",
    title: "وسترن دیجیتال",
    latin: "WD",
    mark: "westerndigital",
    productCount: 118,
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((brand) => brand.slug === slug);
}

export const featuredBrands = brands.filter((brand) => brand.featured);
