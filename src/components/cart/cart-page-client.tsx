"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";

import { CartItemRow } from "@/components/cart/cart-item-row";
import { CartSummary } from "@/components/cart/cart-summary";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getCartEntries, getCartTotals } from "@/lib/cart/summary";
import { products } from "@/data/products";
import { cartLineKey, useCartStore } from "@/store/shop-store";

export function CartPageClient() {
  const lines = useCartStore((state) => state.lines);
  const removeLine = useCartStore((state) => state.removeLine);
  const entries = getCartEntries(lines, products);
  const totals = getCartTotals(entries);
  const missingLines = lines.filter((line) => !products.some((product) => product.id === line.productId));

  useEffect(() => {
    if (missingLines.length > 0) {
      missingLines.forEach((line) => removeLine(cartLineKey(line)));
    }
  }, [missingLines.length, removeLine]);

  return (
    <Container className="flex flex-col gap-5 py-5 sm:gap-6 sm:py-7 lg:py-9">
      <Breadcrumb items={[{ label: "خانه", href: "/" }, { label: "سبد خرید" }]} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-heading font-bold text-ink sm:text-heading-lg">سبد خرید</h1>
          <p className="mt-1 text-body-sm text-subtle-ink">کالاهای انتخاب‌شده را بررسی و تعداد آن‌ها را تنظیم کنید.</p>
        </div>
        {/* {entries.length > 0 ? (
          <Link href="/products" className="text-label font-medium text-brand hover:underline">ادامه خرید</Link>
        ) : null} */}
      </div>

      {missingLines.length > 0 ? (
        <p role="status" className="rounded-md bg-warning-soft px-4 py-3 text-body-sm text-warning">
          بعضی کالاهای قدیمی دیگر در کاتالوگ موجود نبودند و از سبد حذف شدند.
        </p>
      ) : null}

      {entries.length === 0 ? (
        <section className="mx-auto flex w-full flex-col items-center gap-4 rounded-lg border border-line bg-surface px-5 py-10 text-center shadow-soft sm:py-14">
          <span className="grid size-14 place-items-center rounded-full bg-brand-soft text-brand-active">
            <ShoppingBag className="size-7" aria-hidden />
          </span>
          <div>
            <h2 className="text-title font-bold text-ink">سبد خرید شما خالی است</h2>
            <p className="mt-1 text-body-sm text-subtle-ink">برای دیدن کالاهای دیجیتال به فروشگاه برگردید.</p>
          </div>
          <Button asChild>
            <Link href="/products"><ArrowLeft aria-hidden /> مشاهده محصولات</Link>
          </Button>
        </section>
      ) : (
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-6">
          <section className="min-w-0 rounded-lg border border-line bg-surface p-3 shadow-soft sm:p-5" aria-label="کالاهای سبد خرید">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-line-subtle pb-3">
              <p className="text-body-sm font-medium text-ink">{entries.length.toLocaleString("fa-IR")} کالا در سبد</p>
              <Link href="/products" className="text-caption text-brand hover:underline">افزودن کالا</Link>
            </div>
            <div className="flex flex-col divide-y divide-line-subtle">
              {entries.map(({ line, product }) => (
                <div key={cartLineKey(line)} className="py-4 first:pt-0 last:pb-0">
                  <CartItemRow line={line} product={product} />
                </div>
              ))}
            </div>
          </section>

          <aside className="lg:sticky lg:top-28">
            <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4 shadow-soft sm:p-5">
              <CartSummary totals={totals} />
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">ادامه به تسویه حساب</Link>
              </Button>
              <p className="text-center text-caption text-subtle-ink">ثبت سفارش و پرداخت در این نسخه فقط نمایشی است.</p>
            </div>
          </aside>
        </div>
      )}
    </Container>
  );
}