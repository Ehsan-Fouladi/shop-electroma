"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { CartDrawerContent } from "@/components/cart/cart-drawer-content";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { toPersianDigits } from "@/lib/formatters/number";
import { selectCartCount, useCartStore } from "@/store/shop-store";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

/** Cart affordance: its icon opens the drawer; the text link opens the full cart. */
export function CartLink({ className, compact = false }: { className?: string; compact?: boolean }) {
  const count = useCartStore(selectCartCount);
  const [open, setOpen] = useState(false);
  const label = count > 0 ? `سبد خرید، ${toPersianDigits(count)} کالا` : "سبد خرید خالی";

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-md", className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`${label}؛ باز کردن خلاصه`}
            className="relative size-11 px-0 text-body hover:bg-surface-soft hover:text-brand-active"
          >
            <ShoppingCart className="size-5" aria-hidden />
            {count > 0 ? (
              <span className="absolute -top-1 -end-1 grid min-w-4 place-items-center rounded-full bg-sale px-1 text-caption font-bold leading-4 text-white tabular">
                {toPersianDigits(count)}
              </span>
            ) : null}
          </Button>
        </SheetTrigger>
        <CartDrawerContent onClose={() => setOpen(false)} />
      </Sheet>
      {!compact ? (
        <Link href="/cart" className="rounded-sm px-1.5 py-2 text-body-sm font-medium text-ink hover:text-brand-active">
          سبد خرید
        </Link>
      ) : null}
    </div>
  );
}