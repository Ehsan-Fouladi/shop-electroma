"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, Heart } from "lucide-react";
import { toast } from "sonner";

import { ProductMedia } from "@/components/product/product-media";
import { Button } from "@/components/ui/button";
import { cartLineKey, useCartStore, useWishlistStore } from "@/store/shop-store";
import { formatPrice } from "@/lib/formatters/number";
import type { CartLine } from "@/store/shop-store";
import type { Product } from "@/types";
import { cn } from "@/lib/utils/cn";

export function CartItemRow({
  line,
  product,
  compact = false,
}: {
  line: CartLine;
  product: Product;
  compact?: boolean;
}) {
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeLine = useCartStore((state) => state.removeLine);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const lineKey = cartLineKey(line);
  const lineTotal = product.price * line.quantity;
  const maxQuantity = Math.max(1, Math.min(product.stock, 10));

  const saveForLater = () => {
    const alreadySaved = useWishlistStore.getState().ids.includes(product.id);
    if (!alreadySaved) toggleWishlist(product.id);
    removeLine(lineKey);
    toast.success("کالا برای بعد در علاقه‌مندی‌ها ذخیره شد", { description: product.title });
  };

  return (
    <article className={cn("grid min-w-0 grid-cols-[5rem_minmax(0,1fr)] gap-3", !compact && "sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:gap-4")}>
      <Link
        href={`/product/${product.slug}`}
        aria-label={`مشاهده ${product.title}`}
        className="relative aspect-square overflow-hidden rounded-md border border-line bg-surface-soft"
      >
        <ProductMedia product={product} sizes={compact ? "80px" : "(max-width: 640px) 80px, 104px"} />
      </Link>

      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/product/${product.slug}`} className="line-clamp-2 text-body-sm font-medium text-ink hover:text-brand-active">
              {product.title}
            </Link>
            {line.variant ? <p className="mt-1 text-caption text-subtle-ink">رنگ / مدل: {line.variant}</p> : null}
            {product.warranty ? <p className="mt-1 text-caption text-subtle-ink">{product.warranty}</p> : null}
          </div>
          {compact ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`حذف ${product.title} از سبد خرید`}
              onClick={() => removeLine(lineKey)}
            >
              <Trash2 aria-hidden />
            </Button>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-col">
            {product.oldPrice && product.oldPrice > product.price ? (
              <span className="text-caption text-disabled-ink line-through">{formatPrice(product.oldPrice * line.quantity)} تومان</span>
            ) : null}
            <span className="text-body-sm font-bold text-ink">{formatPrice(lineTotal)} تومان</span>
          </div>
          <div className="flex items-center gap-1 rounded-sm border border-line bg-surface p-0.5" aria-label={`تعداد ${product.title}`}>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`کاهش تعداد ${product.title}`}
              disabled={line.quantity <= 1}
              onClick={() => setQuantity(lineKey, line.quantity - 1)}
            >
              <Minus aria-hidden />
            </Button>
            <output aria-live="polite" className="w-8 text-center text-body-sm font-bold tabular">
              {line.quantity.toLocaleString("fa-IR")}
            </output>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`افزایش تعداد ${product.title}`}
              disabled={line.quantity >= maxQuantity}
              onClick={() => setQuantity(lineKey, line.quantity + 1)}
            >
              <Plus aria-hidden />
            </Button>
          </div>
        </div>

        {!compact ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Button type="button" variant="ghost" size="sm" className="h-auto px-0 py-1 text-caption text-sale hover:bg-transparent" onClick={() => removeLine(lineKey)}>
              <Trash2 aria-hidden />
              حذف کالا
            </Button>
            <Button type="button" variant="ghost" size="sm" className="h-auto px-0 py-1 text-caption text-subtle-ink hover:bg-transparent hover:text-sale" onClick={saveForLater}>
              <Heart aria-hidden />
              ذخیره برای بعد
            </Button>
          </div>
        ) : null}
      </div>

      {!compact ? (
        <div className="hidden min-w-24 flex-col items-end gap-2 sm:flex">
          <span className="text-caption text-subtle-ink">جمع این کالا</span>
          <span className="text-body font-bold text-ink">{formatPrice(lineTotal)} تومان</span>
        </div>
      ) : null}
    </article>
  );
}