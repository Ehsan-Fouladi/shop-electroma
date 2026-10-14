"use client";

import { ArrowLeftRight, Heart } from "lucide-react";
import { toast } from "sonner";

import { QuickViewDialog } from "@/components/product/quick-view-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCompareStore, useWishlistStore } from "@/store/shop-store";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types";

/**
 * Wishlist / compare / quick-view cluster. Always visible on touch devices,
 * revealed on hover for pointer devices.
 */
export function ProductCardActions({ product }: { product: Product }) {
  const wishlistIds = useWishlistStore((state) => state.ids);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const compareIds = useCompareStore((state) => state.ids);
  const toggleCompare = useCompareStore((state) => state.toggle);

  const inWishlist = wishlistIds.includes(product.id);
  const inCompare = compareIds.includes(product.id);

  const handleWishlistToggle = () => {
    const adding = !inWishlist;
    try {
      toggleWishlist(product.id);
    } catch {
      toast.error("به‌روزرسانی علاقه‌مندی‌ها انجام نشد.", {
        id: `wishlist-${product.id}`,
      });
      return;
    }

    toast.success(
      adding ? "به علاقه‌مندی‌ها اضافه شد" : "از علاقه‌مندی‌ها حذف شد",
      {
        id: `wishlist-${product.id}`,
        description: product.title,
      },
    );
  };

  const handleCompareToggle = () => {
    const adding = !inCompare;
    const replacingOldest = adding && compareIds.length >= 4;
    try {
      toggleCompare(product.id);
    } catch {
      toast.error("به‌روزرسانی فهرست مقایسه انجام نشد.", {
        id: `compare-${product.id}`,
      });
      return;
    }

    const message = replacingOldest
      ? "حداکثر ۴ کالا قابل مقایسه است؛ قدیمی‌ترین مورد جایگزین شد"
      : adding
        ? "به فهرست مقایسه اضافه شد"
        : "از فهرست مقایسه حذف شد";

    toast.success(message, {
      id: `compare-${product.id}`,
      description: product.title,
    });
  };

  return (
    <TooltipProvider>
      <div className="absolute top-4.5 end-4.5 z-10 flex flex-col gap-1.5 opacity-100 transition-opacity duration-200 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon-sm"
              className={cn(
                "bg-surface/95 backdrop-blur",
                inWishlist && "border-sale/30 bg-sale-soft text-sale",
              )}
              aria-pressed={inWishlist}
              aria-label={
                inWishlist ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
              }
              onClick={handleWishlistToggle}
            >
              <Heart className={cn(inWishlist && "fill-sale")} aria-hidden />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {inWishlist ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon-sm"
              className={cn(
                "bg-surface/95 backdrop-blur",
                inCompare &&
                  "border-primary/30 bg-brand-soft text-brand-active",
              )}
              aria-pressed={inCompare}
              aria-label={inCompare ? "حذف از مقایسه" : "افزودن به مقایسه"}
              onClick={handleCompareToggle}
            >
              <ArrowLeftRight aria-hidden />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {inCompare ? "حذف از مقایسه" : "افزودن به مقایسه"}
          </TooltipContent>
        </Tooltip>

        <QuickViewDialog product={product} />
      </div>
    </TooltipProvider>
  );
}
