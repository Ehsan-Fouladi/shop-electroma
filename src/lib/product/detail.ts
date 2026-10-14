import { getBrand } from "@/data/brands";
import { getCategory, getSubcategoryLabel } from "@/data/categories";
import type { BreadcrumbItem } from "@/components/layout/breadcrumb";
import { siteConfig } from "@/lib/constants/site";
import { formatNumber, toPersianDigits } from "@/lib/formatters/number";
import type { Product } from "@/types";

/**
 * Product-detail derivations. Everything here is computed from fields that
 * already exist on the product record (or from the shared taxonomy) so the page
 * never displays a fact the catalogue does not carry.
 */

/** Stock at or below this number is presented as "few left" (matches ProductCard). */
export const LOW_STOCK_THRESHOLD = 8;

export type AvailabilityState = "in" | "low" | "out";

export interface Availability {
  state: AvailabilityState;
  label: string;
  /** Short supporting sentence for the buy box. */
  hint: string;
  /** Tone token used for text/border colours. */
  tone: "success" | "warning" | "error";
}

/** Availability derived strictly from the record's `stock` value. */
export function availabilityFor(product: Product): Availability {
  if (product.stock <= 0) {
    return {
      state: "out",
      label: "ناموجود",
      hint: "این کالا در حال حاضر موجود نیست؛ می‌توانید کالاهای مشابه را ببینید.",
      tone: "error",
    };
  }

  if (product.stock <= LOW_STOCK_THRESHOLD) {
    return {
      state: "low",
      label: "موجودی محدود",
      hint: `تنها ${toPersianDigits(product.stock)} عدد از این کالا در انبار باقی مانده است.`,
      tone: "warning",
    };
  }

  return {
    state: "in",
    label: "موجود در انبار",
    hint: `${toPersianDigits(product.stock)} عدد در انبار الکتروما موجود است.`,
    tone: "success",
  };
}

/**
 * Store article number. Uses the record's own `sku` when present and otherwise
 * falls back to the catalogue id, so the identifier always points at real data.
 */
export function catalogueCode(product: Product): string {
  if (product.sku) return product.sku;
  const numeric = product.id.replace(/^[a-z]+-?/i, "");
  return `EL-${numeric || product.id}`.toUpperCase();
}

/** Short breadcrumb-safe title (product titles are long marketing strings). */
export function shortProductTitle(title: string, max = 42): string {
  const clean = title.replace(/\s+—\s+.*$/, "").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).trimEnd()}…`;
}

/** Home → Category → Subcategory → Product. */
export function productBreadcrumb(product: Product): BreadcrumbItem[] {
  const category = getCategory(product.categorySlug);
  const items: BreadcrumbItem[] = [{ label: "خانه", href: "/" }];

  if (category) {
    items.push({ label: category.title, href: `/category/${category.slug}` });

    const subSlug = product.subcategories?.find((slug) =>
      category.children?.some((child) => child.slug === slug),
    );
    if (subSlug) {
      items.push({
        label: getSubcategoryLabel(subSlug),
        href: `/category/${category.slug}/${subSlug}`,
      });
    }
  } else {
    items.push({ label: "همه محصولات", href: "/products" });
  }

  items.push({ label: shortProductTitle(product.title) });
  return items;
}

export interface GalleryImage {
  src: string;
  alt: string;
  /** Marks the temporary repeated-image UI preview; not a distinct product photo. */
  isDemo?: boolean;
}

const TEMPORARY_GALLERY_DEMO_COUNT = 3;

/**
 * Return real catalogue photos when present. While records have only one photo,
 * repeat that path as explicitly-labelled demo items so gallery controls can be
 * exercised without suggesting these are distinct product views.
 */
export function galleryImages(product: Product): GalleryImage[] {
  const sources = [product.image, ...(product.additionalImages ?? [])].filter(
    (src): src is string => Boolean(src?.trim()),
  );
  const uniqueSources = [...new Set(sources)];

  if (uniqueSources.length === 1) {
    const source = uniqueSources[0]!;
    return Array.from({ length: TEMPORARY_GALLERY_DEMO_COUNT }, (_, index) => ({
      src: source,
      alt: `${product.title}، تصویر نمایشی ${toPersianDigits(index + 1)}`,
      isDemo: true,
    }));
  }

  return uniqueSources.map((src, index) => {
    let angleLabel = `تصویر ${toPersianDigits(index + 1)}`;
    if (src.includes("-angle")) {
      angleLabel = "نمای جانبی و زاویه‌دار";
    } else if (src.includes("-back")) {
      angleLabel = "نمای پشت، اتصالات و جزئیات";
    } else if (index === 0) {
      angleLabel = "نمای اصلی و روبرو";
    }

    return {
      src,
      alt: `${product.title} — ${angleLabel}`,
    };
  });
}

/** One-line summary assembled from the record's own title, brand and specs. */
export function productSummary(product: Product): string {
  const brand = getBrand(product.brandSlug);
  const category = getCategory(product.categorySlug);
  const specs = product.specs
    .slice(0, 2)
    .map((spec) => `${spec.label}: ${spec.value}`)
    .join("، ");

  const parts = [
    brand ? `از برند ${brand.title}` : "",
    category ? `در دسته ${category.title}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return [
    parts ? `${product.title} ${parts}.` : `${product.title}.`,
    specs ? `مشخصات شاخص — ${specs}.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/** Paragraph list for the description section (record copy when available). */
export function productDescription(product: Product): string[] {
  if (product.description) return [product.description];

  const overview = productSummary(product);
  const warranty = product.warranty
    ? `این کالا با ${product.warranty} ارائه می‌شود.`
    : "";
  const seller = product.seller ? `فروشنده: ${product.seller}.` : "";
  const stockLine =
    product.stock > 0
      ? `در حال حاضر ${toPersianDigits(product.stock)} عدد از این کالا در انبار الکتروما موجود است.`
      : "این کالا در حال حاضر موجود نیست.";

  return [overview, [warranty, seller, stockLine].filter(Boolean).join(" ")];
}

/** Meta description for SEO — real title, brand, category and price. */
export function productMetaDescription(product: Product): string {
  const brand = getBrand(product.brandSlug);
  const category = getCategory(product.categorySlug);
  const price = `${formatNumber(product.price)} تومان`;
  const specLine = product.specs
    .slice(0, 2)
    .map((spec) => `${spec.label} ${spec.value}`)
    .join("، ");

  return [
    `خرید ${product.title}`,
    brand ? `برند ${brand.title}` : "",
    category ? `دسته ${category.title}` : "",
    specLine,
    `قیمت ${price}`,
  ]
    .filter(Boolean)
    .join(" — ")
    .concat(" | فروشگاه اینترنتی الکتروما");
}

/** Persian colour name → swatch colour. Presentation only; null = neutral chip. */
const COLOR_SWATCHES: { keys: string[]; value: string }[] = [
  { keys: ["تیتانیوم طبیعی"], value: "#b9b4ab" },
  { keys: ["تیتانیوم مشکی"], value: "#3f3f46" },
  { keys: ["تیتانیوم آبی"], value: "#4f6b8a" },
  { keys: ["تیتانیوم"], value: "#a1a1aa" },
  { keys: ["مشکی", "سیاه"], value: "#111827" },
  { keys: ["سفید", "یخی"], value: "#f8fafc" },
  { keys: ["نقره‌ای", "نقره", "استیل"], value: "#cbd5e1" },
  { keys: ["خاکستری", "طوسی", "گری"], value: "#64748b" },
  { keys: ["آبی"], value: "#2563eb" },
  { keys: ["سبز"], value: "#16a34a" },
  { keys: ["قرمز", "سرخ"], value: "#dc2626" },
  { keys: ["طلایی", "گلد"], value: "#d4af37" },
  { keys: ["بنفش", "ارغوانی"], value: "#7c3aed" },
  { keys: ["صورتی"], value: "#ec4899" },
  { keys: ["زرد"], value: "#eab308" },
  { keys: ["نارنجی"], value: "#f97316" },
  { keys: ["قهوه‌ای"], value: "#7c4a21" },
  { keys: ["کرم", "شیری"], value: "#f1e7d0" },
];

export function colorSwatch(name: string): string | null {
  for (const entry of COLOR_SWATCHES) {
    if (entry.keys.some((key) => name.includes(key))) return entry.value;
  }
  return null;
}

/**
 * Structured data for the product page. Uses the record's real rating, review
 * count, price and stock — nothing is invented for search engines.
 */
export function productJsonLd(product: Product, url: string) {
  const brand = getBrand(product.brandSlug);
  const category = getCategory(product.categorySlug);
  const availability = availabilityFor(product);

  const allImages = [product.image, ...(product.additionalImages ?? [])]
    .filter((img): img is string => Boolean(img))
    .map((img) => (img.startsWith("http") ? img : `${siteConfig.url}${img}`));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    sku: catalogueCode(product),
    productID: product.id,
    image: allImages.length > 0 ? allImages : undefined,
    description: productSummary(product),
    ...(brand
      ? {
          brand: {
            "@type": "Brand",
            name: brand.title,
            url: `${siteConfig.url}/brand/${brand.slug}`,
          },
        }
      : {}),
    ...(category ? { category: category.title } : {}),
    ...(product.highlights.length
      ? {
          additionalProperty: product.highlights.map((item) => ({
            "@type": "PropertyValue",
            name: item,
          })),
        }
      : {}),
    offers: {
      "@type": "Offer",
      url,
      price: product.price,
      priceCurrency: "IRT",
      priceValidUntil: "2026-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: `https://schema.org/${
        availability.state === "out"
          ? "OutOfStock"
          : availability.state === "low"
            ? "LimitedAvailability"
            : "InStock"
      }`,
      seller: { "@type": "Organization", name: product.seller },
    },
    ...(product.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}
