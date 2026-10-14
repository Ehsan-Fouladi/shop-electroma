import { redirect } from "next/navigation";

import { ActiveFilters } from "@/components/catalog/active-filters";
import { CatalogLayout } from "@/components/catalog/catalog-layout";
import { CatalogToolbar } from "@/components/catalog/catalog-toolbar";
import { FilterPanel } from "@/components/catalog/filter-panel";
import { FilterSidebar } from "@/components/catalog/filter-panel";
import { MobileFilterBar } from "@/components/catalog/mobile-filter-bar";
import { Pagination } from "@/components/catalog/pagination";
import { ProductGrid } from "@/components/catalog/product-grid";
import { SortSelect } from "@/components/catalog/sort-select";
import {
  catalogHref,
  countActiveFilters,
  totalPages,
  type CatalogQuery,
  type SortKey,
} from "@/lib/catalog/query";
import {
  CATALOG_PAGE_SIZE,
  availableSortOptions,
} from "@/lib/constants/catalog";
import type { CatalogFacets } from "@/lib/catalog/results";
import type { Product } from "@/types";

interface CatalogResultsProps {
  query: CatalogQuery;
  /** Page path the filters and pagination link to. */
  basePath: string;
  /** Already filtered + sorted result set for the page scope. */
  results: Product[];
  facets: CatalogFacets;
  bounds: { min: number; max: number };
  /** Facet groups this page exposes (see FilterPanel). */
  show?: {
    categories?: boolean;
    subcategories?: boolean;
    brands?: boolean;
    colors?: boolean;
  };
  /** Rendered instead of the grid when nothing matches. */
  empty: React.ReactNode;
  /** Cards above the fold rendered eagerly. */
  priorityCount?: number;
}

/**
 * Composes the whole listing experience — desktop sidebar, mobile filter drawer,
 * sorting toolbar, active-filter chips, grid, pagination and empty state — so
 * every catalogue page behaves and looks identical.
 */
export function CatalogResults({
  query,
  basePath,
  results,
  facets,
  bounds,
  show,
  empty,
  priorityCount = 4,
}: CatalogResultsProps) {
  const total = results.length;
  const pages = totalPages(total);
  const page = Math.min(query.page, pages);

  // Keep the URL honest when a filter shrinks the result set below the page.
  if (total > 0 && query.page > pages) {
    redirect(catalogHref(basePath, query, { page: pages }));
  }

  const pageProducts = results.slice(
    (page - 1) * CATALOG_PAGE_SIZE,
    page * CATALOG_PAGE_SIZE,
  );
  const sortOptions = availableSortOptions(Boolean(query.q)) as {
    value: SortKey;
    label: string;
  }[];
  const activeCount = countActiveFilters(query);

  const clearAllHref = catalogHref(basePath, query, {
    categories: [],
    brands: [],
    subcategories: [],
    colors: [],
    minPrice: null,
    maxPrice: null,
    availableOnly: false,
    discountedOnly: false,
    minRating: null,
  });

  // With nothing to filter (no results and no active filters) the sidebar and
  // toolbar would only show empty controls, so the empty state takes the stage.
  if (total === 0 && activeCount === 0) {
    return <div className="flex flex-col gap-4">{empty}</div>;
  }

  const filterPanel = (
    <FilterPanel
      query={query}
      basePath={basePath}
      facets={facets}
      bounds={bounds}
      show={show}
    />
  );

  return (
    <CatalogLayout
      sidebar={<FilterSidebar resultCount={total}>{filterPanel}</FilterSidebar>}
    >
      <CatalogToolbar
        resultCount={total}
        sort={
          <SortSelect
            value={query.sort}
            options={sortOptions}
            basePath={basePath}
          />
        }
        filterTrigger={
          <MobileFilterBar
            activeCount={activeCount}
            resultCount={total}
            clearAllHref={clearAllHref}
          >
            {filterPanel}
          </MobileFilterBar>
        }
      />

      <ActiveFilters query={query} basePath={basePath} />

      {total === 0 ? (
        <div className="pb-2">{empty}</div>
      ) : (
        <>
          <ProductGrid products={pageProducts} priorityCount={priorityCount} />
          <Pagination
            query={{ ...query, page }}
            basePath={basePath}
            total={pages}
            className="pt-1"
          />
        </>
      )}
    </CatalogLayout>
  );
}
