/** Shared domain types — mock data shape is API-ready (BRAND_GUIDELINES §37). */

export type CategoryIcon =
  | "smartphone"
  | "laptop"
  | "tablet"
  | "watch"
  | "headphones"
  | "earbuds"
  | "speaker"
  | "monitor"
  | "gamepad"
  | "camera"
  | "keyboard"
  | "mouse"
  | "plug"
  | "battery-charging"
  | "cable"
  | "hard-drive"
  | "cpu"
  | "wifi"
  | "house"
  | "tv"
  | "printer";

export interface Category {
  slug: string;
  title: string;
  icon: CategoryIcon;
  productCount: number;
  /** Short catalogue intro shown on the category page. */
  description?: string;
  /** Only the categories with a real photo asset get an image tile. */
  image?: string;
  highlight?: string;
  children?: { slug: string; title: string }[];
}

export interface Brand {
  slug: string;
  title: string;
  /** Latin name, used next to the Persian label where useful. */
  latin: string;
  /** Key of an inlined brand mark — falls back to a monogram tile when absent. */
  mark?: string;
  productCount: number;
  featured?: boolean;
}

export type ProductBadge = "sale" | "new" | "bestseller" | "amazing" | "original";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brandSlug: string;
  categorySlug: string;
  /** Subcategory slugs this product belongs to (see the category taxonomy). */
  subcategories?: string[];
  /** Empty until a real photo exists — the card renders a designed plate. */
  image?: string;
  /** Additional genuine product photos shown after `image` in the detail gallery. */
  additionalImages?: string[];
  /** Manufacturer/store article number, when the record carries one. */
  sku?: string;
  /** Long marketing description; the detail page derives one when absent. */
  description?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: ProductBadge;
  isNew?: boolean;
  isBestSeller?: boolean;
  /** Stock already sold in the running offer — drives the stock indicator. */
  soldCount?: number;
  offerTotal?: number;
  specs: ProductSpec[];
  highlights: string[];
  warranty: string;
  seller: string;
  colors: string[];
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: string;
  /** Decorative tint behind the product photo. */
  theme: "brand" | "slate" | "warm";
  /** Optional derived discount label (computed from real catalogue prices). */
  promoBadge?: string;
  stats?: { label: string; value: string }[];
}

export interface PromoCard {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  icon:
    | "truck"
    | "credit-card"
    | "shield-check"
    | "refresh-ccw"
    | "percent"
    | "gift";
  tone: "brand" | "success" | "warning";
}

export interface CampaignBanner {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  image: string;
  layout: "wide" | "tall";
  tone: "ink" | "light";
  bullets?: string[];
}

export interface ValueProp {
  id: string;
  title: string;
  description: string;
  icon:
    | "truck"
    | "badge-check"
    | "credit-card"
    | "refresh-ccw"
    | "headset"
    | "file-check";
}

export interface BlogSubsection {
  id: string;
  title: string;
  content: string[];
}

export interface BlogSection {
  id: string;
  title: string;
  content: string[];
  subsections?: BlogSubsection[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** Empty until a real cover exists — the card renders a gradient cover. */
  image?: string;
  readingTime: number;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  authorRole?: string;
  content?: string[];
  takeaways?: string[];
  recommendedProductIds?: string[];
  sections?: BlogSection[];
  table?: { title: string; headers: string[]; rows: string[][] };
  checklist?: { title: string; items: string[] };
  faqs?: { q: string; a: string }[];
}

export interface NavItem {
  title: string;
  href: string;
  columns?: {
    title: string;
    links: { title: string; href: string }[];
  }[];
  badge?: string;
}
