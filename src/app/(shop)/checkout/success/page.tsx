import type { Metadata } from "next";

import { CheckoutSuccessView } from "@/components/checkout/checkout-success-view";

export const metadata: Metadata = {
  title: "سفارش با موفقیت ثبت شد",
  description: "تأییدیه و خلاصه سفارش ثبت‌شده در فروشگاه الکتروما.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccessView />;
}
