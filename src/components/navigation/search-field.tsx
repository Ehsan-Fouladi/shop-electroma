"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  Flame,
  FolderOpen,
  Package,
  PackageX,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { featuredBrands, getBrand } from "@/data/brands";
import { categories, getCategory } from "@/data/categories";
import { popularSearches, recentSearches } from "@/data/navigation";
import { products } from "@/data/products";
import { normalizeText } from "@/lib/catalog/results";
import { formatPrice, toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import type { Category, Product } from "@/types";
import {
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

interface SearchFieldProps {
  className?: string;
  size?: "default" | "lg";
  /** `elevated` renders the field on a raised surface (used inside the hero). */
  tone?: "soft" | "elevated";
  /** Pre-fills the input (used by the search results page to refine a query). */
  defaultValue?: string;
  autoFocusOnMount?: boolean;
}

type SelectableItem =
  | { type: "recent"; label: string; query: string }
  | { type: "popular"; label: string; query: string }
  | { type: "category-chip"; category: Category }
  | { type: "product"; product: Product }
  | { type: "category"; category: Category }
  | { type: "brand"; brand: (typeof featuredBrands)[number] }
  | { type: "view-all"; query: string }
  | { type: "deals"; label: string; href: string };

function expandSearchTerms(query: string): string[] {
  const norm = normalizeText(query);
  if (!norm) return [];
  const terms = new Set<string>([norm]);

  // Transliteration & synonym expansion
  if (norm.includes("ایفون") || norm.includes("آیفون")) {
    terms.add("iphone");
  }
  if (
    norm.includes("مک بوک") ||
    norm.includes("مک‌بوک") ||
    norm.includes("مکبوک")
  ) {
    terms.add("macbook");
  }
  if (norm.includes("ایپد") || norm.includes("آیپد")) {
    terms.add("ipad");
  }
  if (
    norm.includes("ایرپاد") ||
    norm.includes("ایرباد") ||
    norm.includes("بادز")
  ) {
    terms.add("airpods");
    terms.add("buds");
  }
  if (norm.includes("واچ")) {
    terms.add("watch");
  }
  if (norm.includes("پاوربانک") || norm.includes("پاور بانک")) {
    terms.add("power");
    terms.add("bank");
  }
  if (
    norm.includes("دسته") ||
    norm.includes("پلی استیشن") ||
    norm.includes("پلی‌استیشن") ||
    norm.includes("گیم پد")
  ) {
    terms.add("dualsense");
    terms.add("controller");
  }
  if (norm.includes("هندزفری")) {
    terms.add("earbuds");
    terms.add("headphone");
  }

  return Array.from(terms);
}

/**
 * Stabilized storefront search combobox built on shadcn/ui Input, Popover (with Anchor),
 * and Button primitives.
 * Fully supports Persian RTL, IRANSans typography, keyboard navigation (ArrowUp/Down, Enter, Escape),
 * instant non-flickering search suggestions, empty states, and layout stability across all viewports.
 */
export function SearchField({
  className,
  size = "default",
  tone = "soft",
  defaultValue = "",
  autoFocusOnMount,
}: SearchFieldProps) {
  const router = useRouter();
  const id = useId();
  const listboxId = `search-listbox-${id}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listboxRef = useRef<HTMLDivElement | null>(null);

  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Synchronous, non-flickering catalog search
  const query = value.trim();
  const expandedTerms = useMemo(() => expandSearchTerms(query), [query]);

  const matchingProducts = useMemo(() => {
    if (expandedTerms.length === 0) return [];
    return products
      .filter((prod) => {
        const brand = getBrand(prod.brandSlug);
        const cat = getCategory(prod.categorySlug);
        const haystack = normalizeText(
          [
            prod.title,
            prod.slug.replace(/-/g, " "),
            brand?.title,
            brand?.latin,
            cat?.title,
          ]
            .filter(Boolean)
            .join(" "),
        );

        return expandedTerms.some((term) => haystack.includes(term));
      })
      .slice(0, 4);
  }, [expandedTerms]);

  const matchingCategories = useMemo(() => {
    if (expandedTerms.length === 0) return [];
    return categories
      .filter((cat) => {
        const title = normalizeText(cat.title);
        const slug = cat.slug.replace(/-/g, " ");
        return expandedTerms.some(
          (term) => title.includes(term) || slug.includes(term),
        );
      })
      .slice(0, 3);
  }, [expandedTerms]);

  const matchingBrands = useMemo(() => {
    if (expandedTerms.length === 0) return [];
    return featuredBrands
      .filter((brand) => {
        const title = normalizeText(brand.title);
        const latin = normalizeText(brand.latin);
        return expandedTerms.some(
          (term) => title.includes(term) || latin.includes(term),
        );
      })
      .slice(0, 2);
  }, [expandedTerms]);

  const hasResults =
    matchingProducts.length > 0 ||
    matchingCategories.length > 0 ||
    matchingBrands.length > 0;

  // Flattened list of keyboard-navigable items for the current state
  const selectableItems: SelectableItem[] = useMemo(() => {
    if (!query) {
      const items: SelectableItem[] = [];
      recentSearches.forEach((term) =>
        items.push({ type: "recent", label: term, query: term }),
      );
      popularSearches
        .slice(0, 4)
        .forEach((term) =>
          items.push({ type: "popular", label: term, query: term }),
        );
      categories
        .slice(0, 5)
        .forEach((cat) => items.push({ type: "category-chip", category: cat }));
      items.push({ type: "deals", label: "مشاهده تخفیف‌ها", href: "/deals" });
      return items;
    }

    if (hasResults) {
      const items: SelectableItem[] = [];
      matchingProducts.forEach((prod) =>
        items.push({ type: "product", product: prod }),
      );
      matchingCategories.forEach((cat) =>
        items.push({ type: "category", category: cat }),
      );
      matchingBrands.forEach((brand) => items.push({ type: "brand", brand }));
      items.push({ type: "view-all", query });
      return items;
    }

    // No results: suggestions from popular searches
    return popularSearches.slice(0, 4).map((term) => ({
      type: "popular" as const,
      label: term,
      query: term,
    }));
  }, [query, hasResults, matchingProducts, matchingCategories, matchingBrands]);

  // Keep scroll position aligned when navigating via Arrow keys
  useEffect(() => {
    if (activeIndex >= 0 && listboxRef.current) {
      const activeEl = listboxRef.current.querySelector(
        `[data-item-index="${activeIndex}"]`,
      ) as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  const handleSelectItem = (item: SelectableItem) => {
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();

    switch (item.type) {
      case "recent":
      case "popular":
        setValue(item.query);
        router.push(`/search?q=${encodeURIComponent(item.query)}`);
        break;
      case "category-chip":
      case "category":
        router.push(`/category/${item.category.slug}`);
        break;
      case "product":
        router.push(`/product/${item.product.slug}`);
        break;
      case "brand":
        router.push(`/brand/${item.brand.slug}`);
        break;
      case "view-all":
        router.push(`/search?q=${encodeURIComponent(item.query)}`);
        break;
      case "deals":
        router.push(item.href);
        break;
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/search");
    }
  };

  const handleClear = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setValue("");
    setActiveIndex(-1);
    setOpen(true);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(0);
        return;
      }
      if (selectableItems.length === 0) return;
      setActiveIndex((prev) =>
        prev + 1 >= selectableItems.length ? 0 : prev + 1,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(selectableItems.length - 1);
        return;
      }
      if (selectableItems.length === 0) return;
      setActiveIndex((prev) =>
        prev <= 0 ? selectableItems.length - 1 : prev - 1,
      );
      return;
    }

    if (event.key === "Enter") {
      if (open && activeIndex >= 0 && selectableItems[activeIndex]) {
        event.preventDefault();
        handleSelectItem(selectableItems[activeIndex]);
        return;
      }
      // If no suggestion selected, form submits naturally
    }
  };

  let itemCounter = 0;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      role="search"
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <form onSubmit={handleSubmit} className="relative w-full">
            {/* Start Search Icon */}
            <Search
              className={cn(
                "pointer-events-none absolute inset-y-0 start-3.5 my-auto text-subtle-ink",
                size === "lg" ? "size-5 start-4" : "size-4.5",
              )}
              aria-hidden
            />

            {/* Input field */}
            <Input
              ref={inputRef}
              type="search"
              name="q"
              value={value}
              autoFocus={autoFocusOnMount}
              onFocus={() => {
                setOpen(true);
              }}
              onClick={() => {
                // Clicking inside already focused input keeps panel open
                if (!open) setOpen(true);
              }}
              onChange={(event) => {
                setValue(event.target.value);
                setActiveIndex(-1);
                if (!open) setOpen(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="جستجوی محصول، برند یا دسته‌بندی…"
              aria-label="جستجو در فروشگاه"
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-autocomplete="list"
              aria-controls={open ? listboxId : undefined}
              aria-activedescendant={
                open && activeIndex >= 0
                  ? `${listboxId}-item-${activeIndex}`
                  : undefined
              }
              autoComplete="off"
              className={cn(
                "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden font-sans",
                value ? "pe-32" : "pe-24",
                tone === "elevated"
                  ? "bg-surface shadow-card focus-visible:bg-surface border-line"
                  : "bg-surface-soft focus-visible:bg-surface border-line",
                size === "lg"
                  ? "h-13 rounded-lg ps-12 text-body-lg sm:h-14"
                  : "ps-11",
              )}
            />

            {/* Clear action button */}
            {value ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClear}
                onPointerDown={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
                aria-label="پاک کردن متن جستجو"
                className={cn(
                  "absolute inset-y-0 my-auto text-subtle-ink hover:bg-surface-muted hover:text-ink",
                  size === "lg" ? "end-24 size-8" : "end-20 size-7",
                )}
              >
                <X className="size-4" aria-hidden />
              </Button>
            ) : null}

            {/* Submit action button */}
            <Button
              type="submit"
              size={size === "lg" ? "default" : "sm"}
              className={cn(
                "absolute inset-y-1.5 end-1.5 my-auto font-sans",
                size === "lg" && "inset-y-2 h-10 px-5",
              )}
            >
              جستجو
            </Button>
          </form>
        </PopoverAnchor>

        <PopoverContent
          align="start"
          sideOffset={6}
          dir="rtl"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => {
            const target = e.target as HTMLElement | null;
            if (containerRef.current?.contains(target)) {
              e.preventDefault();
            }
          }}
          className="z-50 w-[var(--radix-popover-anchor-width,var(--radix-popover-trigger-width))] min-w-[280px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-line bg-card p-0 shadow-raised font-sans sm:min-w-[420px]"
        >
          <div
            id={listboxId}
            ref={listboxRef}
            role="listbox"
            aria-label="پیشنهادات جستجو"
            className="max-h-[380px] overflow-y-auto overflow-x-hidden p-2"
          >
            {/* 1. Empty Query Idle State: Recent + Popular + Top Categories */}
            {!query ? (
              <>
                <div className="grid gap-3 p-1 sm:grid-cols-2">
                  <div>
                    <p className="flex items-center gap-1.5 px-2 py-1.5 text-caption font-bold text-subtle-ink">
                      <Clock3 className="size-3.5 text-brand" aria-hidden />
                      جستجوهای اخیر
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {recentSearches.map((term) => {
                        const currentIndex = itemCounter++;
                        const isSelected = activeIndex === currentIndex;
                        return (
                          <li key={term}>
                            <button
                              id={`${listboxId}-item-${currentIndex}`}
                              role="option"
                              aria-selected={isSelected}
                              data-item-index={currentIndex}
                              type="button"
                              onClick={() =>
                                handleSelectItem({
                                  type: "recent",
                                  label: term,
                                  query: term,
                                })
                              }
                              onMouseEnter={() => setActiveIndex(currentIndex)}
                              className={cn(
                                "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-start text-body-sm transition-colors cursor-pointer",
                                isSelected
                                  ? "bg-brand-soft text-brand-active"
                                  : "text-ink hover:bg-surface-soft",
                              )}
                            >
                              <Clock3
                                className="size-3.5 text-subtle-ink shrink-0"
                                aria-hidden
                              />
                              <span>{term}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <p className="flex items-center gap-1.5 px-2 py-1.5 text-caption font-bold text-subtle-ink">
                      <TrendingUp className="size-3.5 text-brand" aria-hidden />
                      جستجوهای پرطرفدار
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {popularSearches.slice(0, 4).map((term) => {
                        const currentIndex = itemCounter++;
                        const isSelected = activeIndex === currentIndex;
                        return (
                          <li key={term}>
                            <button
                              id={`${listboxId}-item-${currentIndex}`}
                              role="option"
                              aria-selected={isSelected}
                              data-item-index={currentIndex}
                              type="button"
                              onClick={() =>
                                handleSelectItem({
                                  type: "popular",
                                  label: term,
                                  query: term,
                                })
                              }
                              onMouseEnter={() => setActiveIndex(currentIndex)}
                              className={cn(
                                "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-start text-body-sm transition-colors cursor-pointer",
                                isSelected
                                  ? "bg-brand-soft text-brand-active"
                                  : "text-ink hover:bg-surface-soft",
                              )}
                            >
                              <TrendingUp
                                className="size-3.5 text-subtle-ink shrink-0"
                                aria-hidden
                              />
                              <span>{term}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="my-2 h-px bg-line" role="separator" />

                <div className="px-2 py-1">
                  <p className="mb-1.5 text-caption font-medium text-subtle-ink">
                    دسته‌بندی‌های برگزیده:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.slice(0, 5).map((category) => {
                      const currentIndex = itemCounter++;
                      const isSelected = activeIndex === currentIndex;
                      return (
                        <button
                          key={category.slug}
                          id={`${listboxId}-item-${currentIndex}`}
                          role="option"
                          aria-selected={isSelected}
                          data-item-index={currentIndex}
                          type="button"
                          onClick={() =>
                            handleSelectItem({
                              type: "category-chip",
                              category,
                            })
                          }
                          onMouseEnter={() => setActiveIndex(currentIndex)}
                          className={cn(
                            "rounded-full border px-2.5 py-1 text-label transition-colors cursor-pointer",
                            isSelected
                              ? "border-primary bg-brand-soft text-brand-active"
                              : "border-line bg-surface-muted text-ink hover:bg-brand-soft hover:text-brand-active",
                          )}
                        >
                          {category.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : null}

            {/* 2. Query Active: Results or Empty */}
            {query && !hasResults ? (
              <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
                <PackageX className="size-8 text-disabled-ink" aria-hidden />
                <p className="text-body-sm font-bold text-ink">
                  نتیجه‌ای برای «{query}» پیدا نشد
                </p>
                <p className="max-w-xs text-caption text-subtle-ink">
                  املای عبارت را بررسی کنید یا یکی از عبارت‌های محبوب زیر را
                  انتخاب کنید:
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {popularSearches.slice(0, 4).map((term) => {
                    const currentIndex = itemCounter++;
                    const isSelected = activeIndex === currentIndex;
                    return (
                      <button
                        key={term}
                        id={`${listboxId}-item-${currentIndex}`}
                        role="option"
                        aria-selected={isSelected}
                        data-item-index={currentIndex}
                        type="button"
                        onClick={() =>
                          handleSelectItem({
                            type: "popular",
                            label: term,
                            query: term,
                          })
                        }
                        onMouseEnter={() => setActiveIndex(currentIndex)}
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-caption transition-colors cursor-pointer",
                          isSelected
                            ? "border-primary bg-brand-soft text-brand-active"
                            : "border-line bg-surface-muted text-ink hover:bg-brand-soft hover:text-brand-active",
                        )}
                      >
                        {term}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {query && hasResults ? (
              <div className="flex flex-col gap-2">
                {/* Matching Products */}
                {matchingProducts.length > 0 ? (
                  <div>
                    <p className="px-2 py-1 text-caption font-bold text-subtle-ink">
                      کالاهای مرتبط
                    </p>
                    <ul className="flex flex-col gap-1">
                      {matchingProducts.map((product) => {
                        const currentIndex = itemCounter++;
                        const isSelected = activeIndex === currentIndex;
                        const brand = getBrand(product.brandSlug);
                        const cat = getCategory(product.categorySlug);

                        return (
                          <li key={product.id}>
                            <button
                              id={`${listboxId}-item-${currentIndex}`}
                              role="option"
                              aria-selected={isSelected}
                              data-item-index={currentIndex}
                              type="button"
                              onClick={() =>
                                handleSelectItem({
                                  type: "product",
                                  product,
                                })
                              }
                              onMouseEnter={() => setActiveIndex(currentIndex)}
                              className={cn(
                                "flex w-full items-center justify-between gap-3 rounded-md p-2 text-start transition-colors cursor-pointer",
                                isSelected
                                  ? "bg-brand-soft text-brand-active"
                                  : "hover:bg-surface-soft",
                              )}
                            >
                              <div className="flex min-w-0 items-center gap-2.5">
                                <div className="relative size-10 shrink-0 overflow-hidden rounded border border-line-subtle bg-surface-soft">
                                  {product.image ? (
                                    <Image
                                      src={product.image}
                                      alt={product.title}
                                      fill
                                      sizes="40px"
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center text-disabled-ink">
                                      <Package className="size-5" />
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate text-body-sm font-medium text-ink">
                                    {product.title}
                                  </p>
                                  <p className="text-caption text-subtle-ink">
                                    {cat?.title ?? ""} • {brand?.title ?? ""}
                                  </p>
                                </div>
                              </div>
                              <span className="shrink-0 text-label font-bold text-brand">
                                {formatPrice(product.price)} تومان
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}

                {/* Matching Categories & Brands */}
                {matchingCategories.length > 0 || matchingBrands.length > 0 ? (
                  <div>
                    <div className="my-1.5 h-px bg-line" role="separator" />
                    <p className="px-2 py-1 text-caption font-bold text-subtle-ink">
                      دسته‌بندی‌ها و برندها
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {matchingCategories.map((category) => {
                        const currentIndex = itemCounter++;
                        const isSelected = activeIndex === currentIndex;
                        return (
                          <li key={category.slug}>
                            <button
                              id={`${listboxId}-item-${currentIndex}`}
                              role="option"
                              aria-selected={isSelected}
                              data-item-index={currentIndex}
                              type="button"
                              onClick={() =>
                                handleSelectItem({
                                  type: "category",
                                  category,
                                })
                              }
                              onMouseEnter={() => setActiveIndex(currentIndex)}
                              className={cn(
                                "flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-start text-body-sm transition-colors cursor-pointer",
                                isSelected
                                  ? "bg-brand-soft text-brand-active"
                                  : "text-ink hover:bg-surface-soft",
                              )}
                            >
                              <span className="flex items-center gap-2">
                                <FolderOpen
                                  className="size-4 text-brand shrink-0"
                                  aria-hidden
                                />
                                <span>دسته: {category.title}</span>
                              </span>
                              <span className="tabular text-caption text-disabled-ink">
                                {toPersianDigits(category.productCount)} کالا
                              </span>
                            </button>
                          </li>
                        );
                      })}

                      {matchingBrands.map((brand) => {
                        const currentIndex = itemCounter++;
                        const isSelected = activeIndex === currentIndex;
                        return (
                          <li key={brand.slug}>
                            <button
                              id={`${listboxId}-item-${currentIndex}`}
                              role="option"
                              aria-selected={isSelected}
                              data-item-index={currentIndex}
                              type="button"
                              onClick={() =>
                                handleSelectItem({
                                  type: "brand",
                                  brand,
                                })
                              }
                              onMouseEnter={() => setActiveIndex(currentIndex)}
                              className={cn(
                                "flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-start text-body-sm transition-colors cursor-pointer",
                                isSelected
                                  ? "bg-brand-soft text-brand-active"
                                  : "text-ink hover:bg-surface-soft",
                              )}
                            >
                              <span className="flex items-center gap-2">
                                <Sparkles
                                  className="size-4 text-brand shrink-0"
                                  aria-hidden
                                />
                                <span>
                                  برند: {brand.title} ({brand.latin})
                                </span>
                              </span>
                              <span className="tabular text-caption text-disabled-ink">
                                {toPersianDigits(brand.productCount)} کالا
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}

                {/* View all results prompt */}
                <div>
                  <div className="my-1.5 h-px bg-line" role="separator" />
                  {(() => {
                    const currentIndex = itemCounter++;
                    const isSelected = activeIndex === currentIndex;
                    return (
                      <button
                        id={`${listboxId}-item-${currentIndex}`}
                        role="option"
                        aria-selected={isSelected}
                        data-item-index={currentIndex}
                        type="button"
                        onClick={() =>
                          handleSelectItem({
                            type: "view-all",
                            query,
                          })
                        }
                        onMouseEnter={() => setActiveIndex(currentIndex)}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-start text-body-sm font-medium transition-colors cursor-pointer",
                          isSelected
                            ? "bg-brand-soft text-brand-active"
                            : "text-brand hover:bg-brand-soft hover:text-brand-active",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <Search className="size-4" aria-hidden />
                          <span>مشاهده همه نتایج برای «{query}»</span>
                        </span>
                        <ArrowLeft className="size-4" aria-hidden />
                      </button>
                    );
                  })()}
                </div>
              </div>
            ) : null}
          </div>

          {/* Footer promo strip */}
          <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-soft/60 px-3 py-2 text-caption">
            <span className="flex items-center gap-1.5 text-subtle-ink">
              <Flame className="size-3.5 text-sale" aria-hidden />
              تخفیف‌های ویژه روز
            </span>
            {(() => {
              const dealsIndex = selectableItems.findIndex(
                (it) => it.type === "deals",
              );
              const isSelected = dealsIndex >= 0 && activeIndex === dealsIndex;
              return (
                <Link
                  href="/deals"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded px-1.5 py-0.5 font-bold transition-colors",
                    isSelected
                      ? "bg-brand text-white"
                      : "text-brand hover:text-brand-hover",
                  )}
                >
                  مشاهده تخفیف‌ها
                </Link>
              );
            })()}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
