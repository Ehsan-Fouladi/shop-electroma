"use client";

import Link from "next/link";
import { ArrowLeftRight, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductMedia } from "@/components/product/product-media";
import { Rating } from "@/components/product/rating";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import { useCompareStore } from "@/store/shop-store";
import { Fragment, useState } from "react";

export function CompareView() {
  const compareIds = useCompareStore((state) => state.ids);
  const removeCompare = useCompareStore((state) => state.remove);
  const clearCompare = useCompareStore((state) => state.clear);

  const [highlightDifferences, setHighlightDifferences] = useState(false);

  const comparedProducts = compareIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[0] => Boolean(p));

  // Collect all unique specification labels across compared products
  const allSpecLabels = Array.from(
    new Set(comparedProducts.flatMap((p) => p.specs.map((s) => s.label))),
  );

  const handleClear = () => {
    clearCompare();
    toast.success("لیست مقایسه خالی شد.");
  };

  const handleRemove = (id: string, title: string) => {
    removeCompare(id);
    toast.success("از لیست مقایسه حذف شد", { description: title });
  };

  return (
    <Container className="flex flex-col gap-6 py-5 sm:gap-7 sm:py-7 lg:py-9">
      <Breadcrumb
        items={[
          { label: "خانه", href: "/" },
          { label: "مقایسه محصولات" },
        ]}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-heading font-bold text-ink sm:text-heading-lg">
            مقایسه تخصصی محصولات
          </h1>
          <p className="mt-1 text-body-sm text-subtle-ink">
            مشخصات فنی و قیمت تا ۴ کالای دیجیتال را در کنار یکدیگر بسنجید.
          </p>
        </div>

        {comparedProducts.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-label text-body">
              <input
                type="checkbox"
                checked={highlightDifferences}
                onChange={(e) => setHighlightDifferences(e.target.checked)}
                className="size-4 rounded border-line text-primary focus:ring-primary"
              />
              <span>برجسته‌سازی تفاوت‌ها</span>
            </label>

            <Button variant="outline" size="sm" onClick={handleClear}>
              <Trash2 aria-hidden />
              حذف همه
            </Button>
          </div>
        )}
      </div>

      {comparedProducts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-surface p-8 text-center shadow-soft sm:p-14">
          <span className="grid size-16 place-items-center rounded-full bg-brand-soft text-brand-active">
            <ArrowLeftRight className="size-8" aria-hidden />
          </span>

          <div>
            <h2 className="text-title font-bold text-ink">کالایی برای مقایسه انتخاب نشده است</h2>
            <p className="mt-1 max-w-md text-body-sm text-subtle-ink">
              در کارت یا صفحه هر محصول، روی دکمه مقایسه کلیک کنید تا مشخصات آن در این صفحه قرار گیرد.
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <p className="text-label font-bold text-ink">کالاهای پیشنهادی برای شروع مقایسه:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {products.slice(0, 3).map((p) => (
                <Button
                  key={p.id}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    useCompareStore.getState().toggle(p.id);
                    toast.success("به مقایسه اضافه شد", { description: p.title });
                  }}
                >
                  <Plus aria-hidden />
                  {p.title.slice(0, 35)}…
                </Button>
              ))}
            </div>
          </div>

          <Button asChild size="lg" className="mt-2">
            <Link href="/products">
              <ShoppingBag aria-hidden />
              مشاهده محصولات
            </Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line bg-surface shadow-soft">
          <div
            className="grid min-w-[48rem] divide-x divide-x-reverse divide-line-subtle"
            style={{
              gridTemplateColumns: `14rem repeat(${comparedProducts.length}, minmax(13rem, 1fr))`,
            }}
          >
            {/* Header Column: Product Info & Actions */}
            <div className="bg-surface-soft p-4 font-bold text-ink flex items-end">
              مشخصات و قیمت
            </div>

            {comparedProducts.map((product) => (
              <div key={product.id} className="relative flex flex-col justify-between p-4 bg-surface">
                <button
                  type="button"
                  onClick={() => handleRemove(product.id, product.title)}
                  className="absolute top-3 end-3 grid size-7 place-items-center rounded-full bg-surface-muted text-subtle-ink hover:bg-sale-soft hover:text-sale"
                  aria-label={`حذف ${product.title} از مقایسه`}
                >
                  <X className="size-4" />
                </button>

                <div className="flex flex-col items-center text-center">
                  <div className="relative size-32 overflow-hidden rounded-lg bg-surface-soft">
                    <ProductMedia product={product} sizes="128px" />
                  </div>

                  <Link
                    href={`/product/${product.slug}`}
                    className="mt-3 line-clamp-2 text-body-sm font-bold text-ink hover:text-brand-active"
                  >
                    {product.title}
                  </Link>

                  <div className="mt-2 flex items-center justify-center">
                    <Rating value={product.rating} reviewCount={product.reviewCount} />
                  </div>

                  <div className="mt-2">
                    <span className="text-body font-bold text-brand-active">
                      {formatPrice(product.price)} تومان
                    </span>
                  </div>
                </div>

                <div className="mt-4 border-t border-line-subtle pt-3">
                  <AddToCartButton
                    productId={product.id}
                    productTitle={product.title}
                    label="افزودن به سبد"
                    addedLabel="در سبد"
                    className="w-full"
                  />
                </div>
              </div>
            ))}

            {/* Brand Row */}
            <div className="bg-surface-soft p-3.5 text-label font-bold text-subtle-ink border-t border-line-subtle">
              برند سازنده
            </div>
            {comparedProducts.map((p) => (
              <div
                key={`${p.id}-brand`}
                className="p-3.5 text-body-sm text-ink border-t border-line-subtle text-center font-medium"
              >
                {p.brandSlug.toUpperCase()}
              </div>
            ))}

            {/* Warranty Row */}
            <div className="bg-surface-soft p-3.5 text-label font-bold text-subtle-ink border-t border-line-subtle">
              گارانتی و ضمانت
            </div>
            {comparedProducts.map((p) => (
              <div
                key={`${p.id}-warranty`}
                className="p-3.5 text-body-sm text-ink border-t border-line-subtle text-center"
              >
                {p.warranty || "گارانتی اصالت و سلامت"}
              </div>
            ))}

            {/* Stock Row */}
            <div className="bg-surface-soft p-3.5 text-label font-bold text-subtle-ink border-t border-line-subtle">
              وضعیت موجودی
            </div>
            {comparedProducts.map((p) => (
              <div
                key={`${p.id}-stock`}
                className="p-3.5 text-body-sm border-t border-line-subtle text-center"
              >
                {p.stock > 0 ? (
                  <span className="text-success font-medium">موجود در انبار</span>
                ) : (
                  <span className="text-sale font-medium">ناموجود</span>
                )}
              </div>
            ))}

            {/* Specs Matrix Rows */}
            {allSpecLabels.map((specLabel) => {
              const values = comparedProducts.map(
                (p) => p.specs.find((s) => s.label === specLabel)?.value || "—",
              );
              const isDifferent = new Set(values).size > 1;

              return (
                <Fragment key={specLabel}>
                  <div
                    className={cn(
                      "p-3.5 text-label font-medium border-t border-line-subtle",
                      highlightDifferences && isDifferent
                        ? "bg-brand-soft/70 font-bold text-brand-active"
                        : "bg-surface-soft text-subtle-ink",
                    )}
                  >
                    {specLabel}
                  </div>

                  {comparedProducts.map((p) => {
                    const val = p.specs.find((s) => s.label === specLabel)?.value || "—";
                    return (
                      <div
                        key={`${p.id}-${specLabel}`}
                        className={cn(
                          "p-3.5 text-body-sm border-t border-line-subtle text-center",
                          highlightDifferences && isDifferent
                            ? "bg-brand-soft/30 font-bold text-ink"
                            : "text-body",
                        )}
                      >
                        {val}
                      </div>
                    );
                  })}
                </Fragment>
              );
            })}
          </div>
        </div>
      )}
    </Container>
  );
}
