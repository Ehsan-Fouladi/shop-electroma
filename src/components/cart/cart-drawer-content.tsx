"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { CartItemRow } from "@/components/cart/cart-item-row";
import { CartSummary } from "@/components/cart/cart-summary";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getCartEntries, getCartTotals } from "@/lib/cart/summary";
import { products } from "@/data/products";
import { useCartStore } from "@/store/shop-store";

export function CartDrawerContent({ onClose }: { onClose: () => void }) {
  const lines = useCartStore((state) => state.lines);
  const entries = getCartEntries(lines, products);
  const totals = getCartTotals(entries);

  return (
    <SheetContent
      side="start"
      className="w-[min(92vw,28rem)] max-w-none gap-0 p-0"
    >
      <SheetHeader className="ps-5 pe-14">
        <SheetTitle>سبد خرید</SheetTitle>
        <SheetDescription>
          {entries.length.toLocaleString("fa-IR")} قلم کالا در سبد شما
        </SheetDescription>
      </SheetHeader>
      {entries.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand-active">
            <ShoppingBag className="size-6" aria-hidden />
          </span>
          <p className="text-body-sm font-medium text-ink">سبد خرید خالی است</p>
          <Button asChild variant="outline" onClick={onClose}>
            <Link href="/products">مشاهده محصولات</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4">
            {entries.slice(0, 5).map(({ line, product }) => (
              <div
                key={`${line.productId}-${line.variant ?? ""}`}
                className="border-b border-line-subtle pb-4 last:border-0 last:pb-0"
              >
                <CartItemRow line={line} product={product} compact />
              </div>
            ))}
            {entries.length > 5 ? (
              <p className="text-center text-caption text-subtle-ink">
                و {(entries.length - 5).toLocaleString("fa-IR")} قلم دیگر…
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-3 border-t border-line bg-surface p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <CartSummary totals={totals} compact />
            <Button asChild className="w-full">
              <Link href="/checkout" onClick={onClose}>
                ادامه به تسویه حساب
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/cart" onClick={onClose}>
                مشاهده سبد خرید
              </Link>
            </Button>
          </div>
        </>
      )}
    </SheetContent>
  );
}
