import { CATALOG_PAGE_SIZE } from "@/lib/constants/catalog";

export type SortKey =
  | "relevance"
  | "newest"
  | "best-selling"
  | "cheapest"
  | "expensive"
  | "discount"
  | "rating";

export interface CatalogQuery {
  q: string;
  sort: SortKey;
  page: number;
  /** Category slugs — multi-select. */
  categories: string[];
  /** Brand slugs — multi-select. */
  brands: string[];
  /** Subcategory slugs — multi-select (used inside a category). */
  subcategories: string[];
  /** Colour names exactly as they appear in the product data. */
  colors: string[];
  minPrice: number | null;
  maxPrice: number | null;
  availableOnly: boolean;
  discountedOnly: boolean;
  minRating: number | null;
}

export type CatalogSearchParams = Record<string, string | string[] | undefined>;

export const defaultCatalogQuery: CatalogQuery = {
  q: "",
  sort: "newest",
  page: 1,
  categories: [],
  brands: [],
  subcategories: [],
  colors: [],
  minPrice: null,
  maxPrice: null,
  availableOnly: false,
  discountedOnly: false,
  minRating: null,
};

const SORT_KEYS: SortKey[] = [
  "relevance",
  "newest",
  "best-selling",
  "cheapest",
  "expensive",
  "discount",
  "rating",
];

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function list(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const items = Array.isArray(value) ? value : value.split(",");
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function numberOrNull(value: string | string[] | undefined): number | null {
  const raw = first(value);
  if (!raw) return null;
  const parsed = Number.parseInt(raw.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

/** Reads a typed catalogue query out of the URL search params. */
export function parseCatalogQuery(
  params: CatalogSearchParams,
  overrides: Partial<CatalogQuery> = {},
): CatalogQuery {
  const rawSort = first(params.sort);
  const sort = SORT_KEYS.includes(rawSort as SortKey) ? (rawSort as SortKey) : "newest";
  const page = Math.max(1, Number.parseInt(first(params.page) ?? "1", 10) || 1);
  const minRating = Number.parseFloat(first(params.rating) ?? "");

  return {
    q: (first(params.q) ?? "").trim(),
    sort,
    page,
    categories: list(params.category),
    brands: list(params.brand),
    subcategories: list(params.sub),
    colors: list(params.color),
    minPrice: numberOrNull(params.min),
    maxPrice: numberOrNull(params.max),
    availableOnly: first(params.available) === "1",
    discountedOnly: first(params.discount) === "1",
    minRating: Number.isFinite(minRating) && minRating >= 1 ? minRating : null,
    ...overrides,
  };
}

/** Serialises a query back into URL params, omitting everything at its default. */
export function catalogQueryToParams(query: CatalogQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (query.q) params.set("q", query.q);
  if (query.sort !== defaultCatalogQuery.sort) params.set("sort", query.sort);
  if (query.page > 1) params.set("page", String(query.page));
  if (query.categories.length) params.set("category", query.categories.join(","));
  if (query.brands.length) params.set("brand", query.brands.join(","));
  if (query.subcategories.length) params.set("sub", query.subcategories.join(","));
  if (query.colors.length) params.set("color", query.colors.join(","));
  if (query.minPrice !== null) params.set("min", String(query.minPrice));
  if (query.maxPrice !== null) params.set("max", String(query.maxPrice));
  if (query.availableOnly) params.set("available", "1");
  if (query.discountedOnly) params.set("discount", "1");
  if (query.minRating !== null) params.set("rating", String(query.minRating));

  return params;
}

/**
 * Builds a catalogue URL. Any facet change resets pagination so the visitor
 * always lands on a page that exists.
 */
export function catalogHref(
  basePath: string,
  query: CatalogQuery,
  patch: Partial<CatalogQuery> = {},
): string {
  const patchKeys = Object.keys(patch);
  const next: CatalogQuery = { ...query, ...patch };
  if (patchKeys.some((key) => key !== "page")) next.page = patch.page ?? 1;

  const params = catalogQueryToParams(next);
  const search = params.toString();
  return search ? `${basePath}?${search}` : basePath;
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export const toggleCategory = (query: CatalogQuery, value: string): Partial<CatalogQuery> => ({
  categories: toggle(query.categories, value),
});

export const toggleBrand = (query: CatalogQuery, value: string): Partial<CatalogQuery> => ({
  brands: toggle(query.brands, value),
});

export const toggleSubcategory = (
  query: CatalogQuery,
  value: string,
): Partial<CatalogQuery> => ({ subcategories: toggle(query.subcategories, value) });

export const toggleColor = (query: CatalogQuery, value: string): Partial<CatalogQuery> => ({
  colors: toggle(query.colors, value),
});

/** Number of facet filters currently applied (used for mobile badges). */
export function countActiveFilters(query: CatalogQuery): number {
  return (
    query.categories.length +
    query.brands.length +
    query.subcategories.length +
    query.colors.length +
    (query.minPrice !== null ? 1 : 0) +
    (query.maxPrice !== null ? 1 : 0) +
    (query.availableOnly ? 1 : 0) +
    (query.discountedOnly ? 1 : 0) +
    (query.minRating !== null ? 1 : 0)
  );
}

export function totalPages(count: number): number {
  return Math.max(1, Math.ceil(count / CATALOG_PAGE_SIZE));
}
