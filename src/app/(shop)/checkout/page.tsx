import type { Metadata } from "next";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";

export const metadata: Metadata = {
  title: "تسویه حساب",
  description:
    "مراحل انتخاب نشانی، روش تحویل و ثبت نهایی سفارش در فروشگاه الکتروما.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return (
    <Container className="flex flex-col gap-5 py-5 sm:gap-6 sm:py-7 lg:py-9">
      <Breadcrumb
        items={[
          { label: "خانه", href: "/" },
          { label: "سبد خرید", href: "/cart" },
          { label: "تسویه حساب" },
        ]}
      />

      <div className="flex flex-col gap-1">
        <h1 className="text-heading font-bold text-ink sm:text-heading-lg">
          مراحل تسویه حساب
        </h1>
        <p className="text-body-sm text-subtle-ink">
          سفارش خود را در ۴ مرحله سریع و بدون پیچیدگی تکمیل کنید.
        </p>
      </div>

      <CheckoutFlow />
    </Container>
  );
}
