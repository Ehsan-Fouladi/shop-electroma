import type { SortKey } from "@/lib/catalog/query";

/** Products shown per page across every catalogue listing. */
export const CATALOG_PAGE_SIZE = 12;

/** Sorting options offered by the catalogue toolbar (UI_SPEC §10). */
export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "مرتبط‌ترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "best-selling", label: "پرفروش‌ترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
  { value: "discount", label: "بیشترین تخفیف" },
  { value: "rating", label: "بالاترین امتیاز" },
];

/** `relevance` only makes sense when a query exists. */
export function availableSortOptions(hasQuery: boolean) {
  return sortOptions.filter((option) => hasQuery || option.value !== "relevance");
}

export const ratingOptions = [
  { value: 4, label: "۴ ستاره و بالاتر" },
  { value: 4.5, label: "۴.۵ ستاره و بالاتر" },
] as const;

export type ActiveFilterChip = {
  key: string;
  label: string;
  /** URL that removes this single filter. */
  href: string;
};
