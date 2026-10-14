"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductBadges } from "@/components/product/product-badge";
import { ProductMedia } from "@/components/product/product-media";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/formatters/number";
import { useWishlistStore } from "@/store/shop-store";

export function WishlistGrid({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  const ids = useWishlistStore((state) => state.ids);
  const toggle = useWishlistStore((state) => state.toggle);

  const wishlistProducts = ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[0] => Boolean(p));

  const handleRemove = (id: string, title: string) => {
    toggle(id);
    toast.success("از علاقه‌مندی‌ها حذف شد", { description: title });
  };

  return (
    <div className="flex flex-col gap-6">
      {showHeading && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-heading font-bold text-ink sm:text-heading-lg">
              لیست علاقه‌مندی‌ها
            </h1>
            <p className="mt-1 text-body-sm text-subtle-ink">
              کالاهایی که برای خرید بعدی نشان کرده‌اید.
            </p>
          </div>
          {wishlistProducts.length > 0 && (
            <span className="rounded-full bg-brand-soft px-3 py-1 text-label font-bold text-brand-active">
              {wishlistProducts.length.toLocaleString("fa-IR")} کالا
            </span>
          )}
        </div>
      )}

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-surface p-8 text-center shadow-soft sm:p-14">
          <span className="grid size-16 place-items-center rounded-full bg-sale-soft text-sale">
            <Heart className="size-8" aria-hidden />
          </span>
          <div>
            <h2 className="text-title font-bold text-ink">
              لیست علاقه‌مندی‌های شما خالی است
            </h2>
            <p className="mt-1 text-body-sm text-subtle-ink">
              می‌توانید با کلیک روی نماد قلب روی هر کالا، آن را به این لیست
              اضافه کنید.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/products">
              <ShoppingBag aria-hidden />
              مشاهده محصولات فروشگاه
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlistProducts.map((product) => {
            const outOfStock = product.stock <= 0;
            return (
              <article
                key={product.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-surface p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-raised"
              >
                <div>
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-surface-soft">
                    <ProductMedia
                      product={product}
                      sizes="(max-width: 640px) 100vw, 240px"
                    />
                    <ProductBadges product={product} />
                    <button
                      type="button"
                      onClick={() => handleRemove(product.id, product.title)}
                      className="absolute top-2 start-2 grid size-8 place-items-center rounded-full bg-surface/90 text-subtle-ink shadow-soft hover:bg-surface hover:text-sale"
                      aria-label={`حذف ${product.title} از علاقه‌مندی‌ها`}
                    >
                      <Trash2 className="size-4" aria-hidden />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-col gap-1.5">
                    <Link
                      href={`/product/${product.slug}`}
                      className="line-clamp-2 text-body-sm font-medium text-ink group-hover:text-brand-active"
                    >
                      {product.title}
                    </Link>

                    <div className="mt-1 flex items-baseline justify-between gap-2">
                      <div className="flex flex-col">
                        {product.oldPrice &&
                        product.oldPrice > product.price ? (
                          <span className="text-caption text-disabled-ink line-through">
                            {formatPrice(product.oldPrice)} تومان
                          </span>
                        ) : null}
                        <span className="text-body font-bold text-ink">
                          {formatPrice(product.price)} تومان
                        </span>
                      </div>
                      <span
                        className={`text-caption font-medium ${outOfStock ? "text-sale" : "text-success"}`}
                      >
                        {outOfStock ? "ناموجود" : "موجود در انبار"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-line-subtle pt-3">
                  <AddToCartButton
                    productId={product.id}
                    productTitle={product.title}
                    disabled={outOfStock}
                    label="افزودن به سبد"
                    addedLabel="در سبد قرار گرفت"
                    className="w-full"
                  />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
