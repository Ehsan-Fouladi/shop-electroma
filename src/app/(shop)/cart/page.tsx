import type { Metadata } from "next";

import { CartPageClient } from "@/components/cart/cart-page-client";

export const metadata: Metadata = {
  title: "سبد خرید",
  description: "بررسی کالاهای انتخاب‌شده در سبد خرید الکتروما.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return <CartPageClient />;
}
