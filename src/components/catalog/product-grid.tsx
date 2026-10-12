import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types";

/**
 * Catalogue product grid. One column on very small screens, two from 360px,
 * three without the sidebar (md) and two/three again depending on whether the
 * desktop filter column is present.
 */
export function ProductGrid({
  products,
  className,
  priorityCount = 0,
}: {
  products: Product[];
  className?: string;
  /** Cards above the fold that should load eagerly. */
  priorityCount?: number;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}