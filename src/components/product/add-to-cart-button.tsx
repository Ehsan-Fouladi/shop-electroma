"use client";

import { Check, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/shop-store";
import type { Product } from "@/types";
import { useEffect, useRef, useState } from "react";

/**
 * Adds the product to the local (UI-only) cart, shows the existing inline
 * confirmation, and reports successful changes through the shared Sonner toaster.
 */
export function AddToCartButton({
  productId,
  productTitle,
  quantity = 1,
  variant,
  size = "sm",
  label = "افزودن",
  addedLabel = "اضافه شد",
  disabled = false,
  className,
}: {
  productId: string;
  productTitle: string;
  /** Units added per click — the detail page feeds its quantity stepper in. */
  quantity?: number;
  /** Selected variant from the detail page, if one exists. */
  variant?: string;
  size?: "sm" | "default" | "lg";
  label?: string;
  addedLabel?: string;
  disabled?: boolean;
  className?: string;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const handleAdd = () => {
    try {
      addItem(productId, quantity, variant);
    } catch {
      toast.error("افزودن کالا به سبد خرید انجام نشد.", {
        id: `cart-${productId}`,
      });
      return;
    }

    setAdded(true);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setAdded(false), 1800);
    toast.success("به سبد خرید اضافه شد", {
      id: `cart-${productId}`,
      description: productTitle,
    });
  };

  return (
    <Button
      size={size}
      variant={added ? "subtle" : "default"}
      className={className}
      disabled={disabled}
      aria-label={
        added
          ? `${productTitle} به سبد خرید اضافه شد`
          : `افزودن ${productTitle} به سبد خرید`
      }
      onClick={handleAdd}
    >
      {added ? <Check aria-hidden /> : <ShoppingCart aria-hidden />}
      <span>{added ? addedLabel : label}</span>
    </Button>
  );
}

export type { Product };
