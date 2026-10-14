import { getBrand } from "@/data/brands";
import { getCategory, getSubcategoryLabel } from "@/data/categories";
import {
  catalogHref,
  countActiveFilters,
  toggleBrand,
  toggleCategory,
  toggleColor,
  toggleSubcategory,
  type CatalogQuery,
} from "@/lib/catalog/query";
import { discountPercent, formatNumber } from "@/lib/formatters/number";
import type { Product } from "@/types";

/* -------------------------------------------------------------------------- */
/*                              Text normalisation                            */
/* -------------------------------------------------------------------------- */

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/**
 * Normalises Persian/Latin text for matching: unifies letter variants, strips
 * zero-width characters and diacritics, and converts digits to Latin so a query
 * typed as "16" matches a title written with "۱۶".
 */
export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)))
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[آأإ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/[\u200c\u200e\u200f\u064b-\u0652]/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function haystack(product: Product): string {
  const brand = getBrand(product.brandSlug);
  const category = getCategory(product.categorySlug);

  return normalizeText(
    [
      product.title,
      brand?.title,
      brand?.latin,
      category?.title,
      ...product.specs.map((spec) => `${spec.label} ${spec.value}`),
      ...product.highlights,
      ...product.colors,
      product.warranty,
      product.seller,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function queryTokens(query: string): string[] {
  return normalizeText(query).split(" ").filter(Boolean);
}

/** All query tokens must appear somewhere in the product (AND match). */
export function matchesQuery(product: Product, query: string): boolean {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return true;
  const text = haystack(product);
  return tokens.every((token) => text.includes(token));
}

/** Relevance score used by the "مرتبط‌ترین" sort — title hits weigh most. */
function relevanceScore(product: Product, query: string): number {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return 0;

  const title = normalizeText(product.title);
  const brand = normalizeText(
    `${getBrand(product.brandSlug)?.title ?? ""} ${getBrand(product.brandSlug)?.latin ?? ""}`,
  );
  const category = normalizeText(
    getCategory(product.categorySlug)?.title ?? "",
  );
  let score = 0;

  for (const token of tokens) {
    if (title.includes(token)) score += 6;
    if (brand.includes(token)) score += 3;
    if (category.includes(token)) score += 2;
  }

  if (title.startsWith(tokens[0])) score += 3;
  return score;
}

/* -------------------------------------------------------------------------- */
/*                                  Filtering                                 */
/* -------------------------------------------------------------------------- */

export function filterProducts(
  source: Product[],
  query: CatalogQuery,
): Product[] {
  return source.filter((product) => {
    if (
      query.categories.length &&
      !query.categories.includes(product.categorySlug)
    ) {
      return false;
    }
    if (query.brands.length && !query.brands.includes(product.brandSlug))
      return false;
    if (
      query.subcategories.length &&
      !product.subcategories?.some((slug) => query.subcategories.includes(slug))
    ) {
      return false;
    }
    if (
      query.colors.length &&
      !product.colors.some((color) => query.colors.includes(color))
    ) {
      return false;
    }
    if (query.minPrice !== null && product.price < query.minPrice) return false;
    if (query.maxPrice !== null && product.price > query.maxPrice) return false;
    if (query.availableOnly && product.stock <= 0) return false;
    if (query.discountedOnly && !product.oldPrice) return false;
    if (query.minRating !== null && product.rating < query.minRating)
      return false;
    if (query.q && !matchesQuery(product, query.q)) return false;
    return true;
  });
}

/* -------------------------------------------------------------------------- */
/*                                  Sorting                                   */
/* -------------------------------------------------------------------------- */

export function sortProducts(list: Product[], query: CatalogQuery): Product[] {
  const sorted = [...list];

  switch (query.sort) {
    case "cheapest":
      return sorted.sort((a, b) => a.price - b.price);
    case "expensive":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
      );
    case "best-selling":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "discount":
      return sorted.sort(
        (a, b) =>
          (discountPercent(b.price, b.oldPrice) ?? -1) -
          (discountPercent(a.price, a.oldPrice) ?? -1),
      );
    case "relevance":
      return sorted.sort(
        (a, b) =>
          relevanceScore(b, query.q) - relevanceScore(a, query.q) ||
          b.rating - a.rating,
      );
    case "newest":
    default:
      return sorted.sort(
        (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)),
      );
  }
}

/* -------------------------------------------------------------------------- */
/*                                    Facets                                  */
/* -------------------------------------------------------------------------- */

export interface FacetOption {
  value: string;
  label: string;
  count: number;
  active: boolean;
  href: string;
}

interface FacetContext {
  /** Products in the page's own scope (e.g. the active category). */
  scope: Product[];
  query: CatalogQuery;
  basePath: string;
}

function buildCategoryFacets({
  scope,
  query,
  basePath,
}: FacetContext): FacetOption[] {
  const counts = new Map<string, number>();
  // Count against every other filter so the numbers reflect what is reachable.
  const context = filterProducts(scope, { ...query, categories: [], page: 1 });

  for (const product of context) {
    counts.set(
      product.categorySlug,
      (counts.get(product.categorySlug) ?? 0) + 1,
    );
  }

  return [...counts.entries()]
    .map(([slug, count]) => {
      const category = getCategory(slug);
      return {
        value: slug,
        label: category?.title ?? slug,
        count,
        active: query.categories.includes(slug),
        href: catalogHref(basePath, query, toggleCategory(query, slug)),
      };
    })
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "fa"));
}

function buildBrandFacets({
  scope,
  query,
  basePath,
}: FacetContext): FacetOption[] {
  const counts = new Map<string, number>();
  const context = filterProducts(scope, { ...query, brands: [], page: 1 });

  for (const product of context) {
    counts.set(product.brandSlug, (counts.get(product.brandSlug) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([slug, count]) => {
      const brand = getBrand(slug);
      return {
        value: slug,
        label: brand?.title ?? slug,
        count,
        active: query.brands.includes(slug),
        href: catalogHref(basePath, query, toggleBrand(query, slug)),
      };
    })
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "fa"));
}

function buildColorFacets({
  scope,
  query,
  basePath,
}: FacetContext): FacetOption[] {
  const counts = new Map<string, number>();
  const context = filterProducts(scope, { ...query, colors: [], page: 1 });

  for (const product of context) {
    for (const color of product.colors) {
      counts.set(color, (counts.get(color) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([color, count]) => ({
      value: color,
      label: color,
      count,
      active: query.colors.includes(color),
      href: catalogHref(basePath, query, toggleColor(query, color)),
    }))
    .sort((a, b) => b.count - a.count);
}

function buildSubcategoryFacets({
  scope,
  query,
  basePath,
}: FacetContext): FacetOption[] {
  const counts = new Map<string, number>();
  const context = filterProducts(scope, {
    ...query,
    subcategories: [],
    page: 1,
  });

  for (const product of context) {
    for (const slug of product.subcategories ?? []) {
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }
  }

  return [...counts.entries()].map(([slug, count]) => {
    return {
      value: slug,
      label: getSubcategoryLabel(slug),
      count,
      active: query.subcategories.includes(slug),
      href: catalogHref(basePath, query, toggleSubcategory(query, slug)),
    };
  });
}

export interface CatalogFacets {
  categories: FacetOption[];
  brands: FacetOption[];
  colors: FacetOption[];
  subcategories: FacetOption[];
}

export function buildCatalogFacets(
  scope: Product[],
  query: CatalogQuery,
  basePath: string,
): CatalogFacets {
  const context: FacetContext = { scope, query, basePath };
  return {
    categories: buildCategoryFacets(context),
    brands: buildBrandFacets(context),
    colors: buildColorFacets(context),
    subcategories: buildSubcategoryFacets(context),
  };
}

/* -------------------------------------------------------------------------- */
/*                                 Price range                                */
/* -------------------------------------------------------------------------- */

export function priceBounds(source: Product[]): { min: number; max: number } {
  if (source.length === 0) return { min: 0, max: 0 };
  const prices = source.map((product) => product.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/* -------------------------------------------------------------------------- */
/*                              Active filter chips                           */
/* -------------------------------------------------------------------------- */

export interface ActiveChip {
  key: string;
  label: string;
  href: string;
}

export function activeFilterChips(
  query: CatalogQuery,
  basePath: string,
): ActiveChip[] {
  const chips: ActiveChip[] = [];

  for (const slug of query.categories) {
    chips.push({
      key: `category-${slug}`,
      label: getCategory(slug)?.title ?? slug,
      href: catalogHref(basePath, query, toggleCategory(query, slug)),
    });
  }

  for (const slug of query.brands) {
    chips.push({
      key: `brand-${slug}`,
      label: getBrand(slug)?.title ?? slug,
      href: catalogHref(basePath, query, toggleBrand(query, slug)),
    });
  }

  for (const slug of query.subcategories) {
    chips.push({
      key: `sub-${slug}`,
      label: getSubcategoryLabel(slug),
      href: catalogHref(basePath, query, toggleSubcategory(query, slug)),
    });
  }

  for (const color of query.colors) {
    chips.push({
      key: `color-${color}`,
      label: color,
      href: catalogHref(basePath, query, toggleColor(query, color)),
    });
  }

  if (query.minPrice !== null || query.maxPrice !== null) {
    const from = query.minPrice !== null ? formatNumber(query.minPrice) : "۰";
    const to =
      query.maxPrice !== null ? formatNumber(query.maxPrice) : "بی‌نهایت";
    chips.push({
      key: "price",
      label: `قیمت: ${from} تا ${to} تومان`,
      href: catalogHref(basePath, query, { minPrice: null, maxPrice: null }),
    });
  }

  if (query.availableOnly) {
    chips.push({
      key: "available",
      label: "فقط کالاهای موجود",
      href: catalogHref(basePath, query, { availableOnly: false }),
    });
  }

  if (query.discountedOnly) {
    chips.push({
      key: "discount",
      label: "فقط تخفیف‌دار",
      href: catalogHref(basePath, query, { discountedOnly: false }),
    });
  }

  if (query.minRating !== null) {
    chips.push({
      key: "rating",
      label: `${query.minRating} ستاره و بالاتر`,
      href: catalogHref(basePath, query, { minRating: null }),
    });
  }

  return chips;
}

export { countActiveFilters };
