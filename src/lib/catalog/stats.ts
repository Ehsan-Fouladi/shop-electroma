import { products } from "@/data/products";
import { discountPercent } from "@/lib/formatters/number";
import type { Product } from "@/types";

export interface CatalogStats {
  /** Products that actually exist in the catalogue for this scope. */
  count: number;
  categoryCount: number;
  brandCount: number;
  discountedCount: number;
  avgRating: number;
  maxDiscount: number;
  price: { min: number; max: number };
  inStockCount: number;
}

/** Aggregates the catalogue facts a listing header is allowed to state. */
export function statsFor(scope: Product[]): CatalogStats {
  if (scope.length === 0) {
    return {
      count: 0,
      categoryCount: 0,
      brandCount: 0,
      discountedCount: 0,
      avgRating: 0,
      maxDiscount: 0,
      price: { min: 0, max: 0 },
      inStockCount: 0,
    };
  }

  const prices = scope.map((product) => product.price);
  const ratings = scope.reduce((total, product) => total + product.rating, 0) / scope.length;

  return {
    count: scope.length,
    categoryCount: new Set(scope.map((product) => product.categorySlug)).size,
    brandCount: new Set(scope.map((product) => product.brandSlug)).size,
    discountedCount: scope.filter((product) => product.oldPrice).length,
    avgRating: Math.round(ratings * 10) / 10,
    maxDiscount: Math.max(
      ...scope.map((product) => discountPercent(product.price, product.oldPrice) ?? 0),
    ),
    price: { min: Math.min(...prices), max: Math.max(...prices) },
    inStockCount: scope.filter((product) => product.stock > 0).length,
  };
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((product) => product.categorySlug === slug);
}

export function productsBySubcategory(categorySlug: string, subSlug: string): Product[] {
  return products.filter(
    (product) =>
      product.categorySlug === categorySlug && product.subcategories?.includes(subSlug),
  );
}

export function productsByBrand(slug: string): Product[] {
  return products.filter((product) => product.brandSlug === slug);
}

/** Real product counts per category, used by the category discovery page. */
export function categoryCounts(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const product of products) {
    counts.set(product.categorySlug, (counts.get(product.categorySlug) ?? 0) + 1);
  }
  return counts;
}

/** Real product counts per brand, used by the brand pages. */
export function brandCounts(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const product of products) {
    counts.set(product.brandSlug, (counts.get(product.brandSlug) ?? 0) + 1);
  }
  return counts;
}

/** Number of distinct brands represented in each category. */
export function brandCountByCategory(): Map<string, number> {
  const seen = new Map<string, Set<string>>();
  for (const product of products) {
    const set = seen.get(product.categorySlug) ?? new Set<string>();
    set.add(product.brandSlug);
    seen.set(product.categorySlug, set);
  }
  const counts = new Map<string, number>();
  for (const [slug, set] of seen) counts.set(slug, set.size);
  return counts;
}
