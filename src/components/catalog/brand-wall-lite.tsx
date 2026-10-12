import { BrandCard } from "@/components/catalog/brand-card";
import { brands } from "@/data/brands";
import { brandCounts } from "@/lib/catalog/stats";

/**
 * Compact brand strip used at the bottom of catalogue pages for
 * cross-discovery. Only brands that actually have products are listed.
 */
export function BrandWallLite({ limit = 6, exclude }: { limit?: number; exclude?: string }) {
  const counts = brandCounts();

  const items = brands
    .map((brand) => ({ brand, count: counts.get(brand.slug) ?? 0 }))
    .filter((entry) => entry.count > 0 && entry.brand.slug !== exclude)
    .sort((a, b) => b.count - a.count || a.brand.title.localeCompare(b.brand.title, "fa"))
    .slice(0, limit);

  if (items.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map(({ brand, count }) => (
        <li key={brand.slug}>
          <BrandCard brand={brand} productCount={count} className="h-full" />
        </li>
      ))}
    </ul>
  );
}