import type { CartLine } from "@/store/shop-store";
import type { Product } from "@/types";
import { DELIVERY_OPTIONS } from "@/lib/constants/commerce";
import { siteConfig } from "@/lib/constants/site";

export interface CartEntry {
  line: CartLine;
  product: Product;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  itemTotal: number;
  shipping: number;
  total: number;
  freeShipping: boolean;
}

export function getCartEntries(
  lines: CartLine[],
  products: Product[],
): CartEntry[] {
  return lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ line, product }] : [];
  });
}

export function getCartTotals(entries: CartEntry[]): CartTotals {
  const subtotal = entries.reduce(
    (sum, { line, product }) =>
      sum + (product.oldPrice ?? product.price) * line.quantity,
    0,
  );
  const discount = entries.reduce(
    (sum, { line, product }) =>
      sum +
      Math.max(0, (product.oldPrice ?? product.price) - product.price) *
        line.quantity,
    0,
  );
  const itemTotal = Math.max(0, subtotal - discount);
  const freeShipping = itemTotal >= siteConfig.freeShippingThreshold;
  const shipping =
    entries.length === 0 || freeShipping ? 0 : DELIVERY_OPTIONS[0].fee;

  return {
    subtotal,
    discount,
    itemTotal,
    shipping,
    total: itemTotal + shipping,
    freeShipping,
  };
}
