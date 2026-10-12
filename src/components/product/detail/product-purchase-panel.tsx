"use client";

import { ArrowLeftRight, Heart, Minus, Plus, XCircle } from "lucide-react";
import { toast } from "sonner";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { formatNumber, toPersianDigits } from "@/lib/formatters/number";
import { useCartStore, useCompareStore, useWishlistStore } from "@/store/shop-store";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

interface ProductPurchasePanelProps {
  productId: string;
  productTitle: string;
  price: number;
  /** Real remaining units — caps the quantity stepper. */
  stock: number;
  /** Real colour options from the catalogue record. */
  colors: { name: string; swatch: string | null }[];
  /** Derived from the record's stock value on the server. */
  outOfStock: boolean;
  /** Offer progress, only when the record carries real sold/offer numbers. */
  offer?: { sold: number; total: number };
  className?: string;
}

/**
 * Buy box: the only interactive block on the page. Colour choice and quantity
 * are local UI state; the actions themselves go through the existing Zustand
 * stores (cart / wishlist / compare) — there is no backend in this phase.
 */
export function ProductPurchasePanel({
  productId,
  productTitle,
  price,
  stock,
  colors,
  outOfStock,
  offer,
  className,
}: ProductPurchasePanelProps) {
  const [colorIndex, setColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const selectedColor = colors[colorIndex];

  const cartLine = useCartStore((state) =>
    state.lines.find(
      (line) => line.productId === productId && line.variant === selectedColor?.name,
    ),
  );
  const wishlistIds = useWishlistStore((state) => state.ids);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const compareIds = useCompareStore((state) => state.ids);
  const toggleCompare = useCompareStore((state) => state.toggle);

  const inWishlist = wishlistIds.includes(productId);
  const inCompare = compareIds.includes(productId);
  const maxQuantity = Math.max(1, Math.min(stock, 10));
  const soldPercent = offer ? Math.min(96, Math.round((offer.sold / offer.total) * 100)) : null;

  const handleWishlistToggle = () => {
    const adding = !inWishlist;
    try {
      toggleWishlist(productId);
    } catch {
      toast.error("به‌روزرسانی علاقه‌مندی‌ها انجام نشد.", { id: `wishlist-${productId}` });
      return;
    }

    toast.success(adding ? "به علاقه‌مندی‌ها اضافه شد" : "از علاقه‌مندی‌ها حذف شد", {
      id: `wishlist-${productId}`,
      description: productTitle,
    });
  };

  const handleCompareToggle = () => {
    const adding = !inCompare;
    const replacingOldest = adding && compareIds.length >= 4;
    try {
      toggleCompare(productId);
    } catch {
      toast.error("به‌روزرسانی فهرست مقایسه انجام نشد.", { id: `compare-${productId}` });
      return;
    }

    const message = replacingOldest
      ? "حداکثر ۴ کالا قابل مقایسه است؛ قدیمی‌ترین مورد جایگزین شد"
      : adding
        ? "به فهرست مقایسه اضافه شد"
        : "از فهرست مقایسه حذف شد";

    toast.success(message, { id: `compare-${productId}`, description: productTitle });
  };

  return (
    <section
      aria-label="خرید کالا"
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-line bg-surface p-4 shadow-soft sm:p-5",
        className,
      )}
    >
      {colors.length > 0 ? (
        <fieldset className="flex flex-col gap-2.5">
          <legend className="text-label font-medium text-subtle-ink">
            رنگ: <span className="font-bold text-ink">{selectedColor?.name}</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {colors.map((color, index) => (
              <label
                key={color.name}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-label transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary",
                  index === colorIndex
                    ? "border-primary/40 bg-brand-soft font-medium text-brand-active"
                    : "border-line bg-surface text-body hover:border-line-strong hover:bg-surface-soft",
                )}
              >
                <input
                  type="radio"
                  name="product-color"
                  value={color.name}
                  checked={index === colorIndex}
                  onChange={() => setColorIndex(index)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className="size-4 shrink-0 rounded-full border border-line-strong"
                  style={color.swatch ? { backgroundColor: color.swatch } : undefined}
                />
                {color.name}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {outOfStock ? (
        <p className="flex items-center gap-2 rounded-md bg-sale-soft px-3 py-2.5 text-body-sm font-medium text-sale">
          <XCircle className="size-4 shrink-0" aria-hidden />
          این کالا در حال حاضر موجود نیست.
        </p>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span id="quantity-label" className="text-label font-medium text-subtle-ink">
            تعداد
          </span>
          <div
            role="group"
            aria-labelledby="quantity-label"
            className="flex items-center gap-1 rounded-sm border border-line bg-surface p-0.5"
          >
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="کاهش تعداد"
              disabled={quantity <= 1}
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            >
              <Minus aria-hidden />
            </Button>
            <output aria-live="polite" className="w-9 text-center text-body font-bold text-ink tabular">
              {toPersianDigits(quantity)}
            </output>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="افزایش تعداد"
              disabled={quantity >= maxQuantity}
              onClick={() => setQuantity((value) => Math.min(maxQuantity, value + 1))}
            >
              <Plus aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {!outOfStock ? (
        <p className="text-caption text-disabled-ink">
          {quantity > 1
            ? `جمع این تعداد: ${formatNumber(price * quantity)} تومان`
            : `حداکثر ${toPersianDigits(maxQuantity)} عدد در هر سفارش`}
        </p>
      ) : null}

      <AddToCartButton
        productId={productId}
        productTitle={productTitle}
        quantity={outOfStock ? 1 : quantity}
        variant={selectedColor?.name}
        size="lg"
        label="افزودن به سبد خرید"
        addedLabel="به سبد خرید اضافه شد"
        disabled={outOfStock}
        className="w-full"
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button
          variant="outline"
          aria-pressed={inWishlist}
          onClick={handleWishlistToggle}
          className={cn(inWishlist && "border-sale/30 bg-sale-soft text-sale hover:bg-sale-soft")}
        >
          <Heart className={cn(inWishlist && "fill-sale")} aria-hidden />
          {inWishlist ? "در علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        </Button>
        <Button
          variant="outline"
          aria-pressed={inCompare}
          onClick={handleCompareToggle}
          className={cn(
            inCompare && "border-primary/30 bg-brand-soft text-brand-active hover:bg-brand-soft",
          )}
        >
          <ArrowLeftRight aria-hidden />
          {inCompare ? "در فهرست مقایسه" : "افزودن به مقایسه"}
        </Button>
      </div>

      {cartLine ? (
        <p className="text-caption text-success" aria-live="polite">
          این کالا در سبد خرید شما ({toPersianDigits(cartLine.quantity)} عدد) قرار دارد.
        </p>
      ) : null}

      {soldPercent !== null && offer && !outOfStock ? (
        <div className="flex flex-col gap-1.5 border-t border-line-subtle pt-4">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted"
            role="progressbar"
            aria-valuenow={soldPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${toPersianDigits(soldPercent)} درصد از این پیشنهاد فروخته شده است`}
          >
            <span
              className="block h-full rounded-full bg-gradient-to-l from-primary to-brand-hover"
              style={{ width: `${soldPercent}%` }}
            />
          </div>
          <p className="text-caption text-subtle-ink">
            <span className="tabular font-bold text-ink">{toPersianDigits(soldPercent)}٪</span> از{" "}
            {toPersianDigits(offer.total)} کالای این پیشنهاد فروخته شده است.
          </p>
        </div>
      ) : null}
    </section>
  );
}