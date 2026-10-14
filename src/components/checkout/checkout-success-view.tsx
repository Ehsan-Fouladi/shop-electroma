"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  FileText,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { ProductMedia } from "@/components/product/product-media";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { formatPersianDate } from "@/lib/formatters/date";
import { formatPrice, toPersianDigits } from "@/lib/formatters/number";
import { useCustomerStore } from "@/store/customer-store";
import { Suspense } from "react";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orders = useCustomerStore((state) => state.orders);

  const order = (orderId ? orders.find((o) => o.id === orderId) : orders[0]) || orders[0];

  return (
    <Container className="flex flex-col gap-6 py-6 sm:py-8 lg:py-10">
      <Breadcrumb
        items={[
          { label: "خانه", href: "/" },
          { label: "تسویه حساب", href: "/checkout" },
          { label: "تأیید سفارش" },
        ]}
      />

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 rounded-xl border border-line bg-surface p-6 text-center shadow-soft sm:p-8">
        <span className="grid size-16 place-items-center rounded-full bg-success-soft text-success shadow-soft">
          <CheckCircle2 className="size-10" aria-hidden />
        </span>

        <div>
          <h1 className="text-heading font-bold text-ink sm:text-heading-lg">
            سفارش شما با موفقیت ثبت شد!
          </h1>
          <p className="mt-1 text-body-sm text-subtle-ink">
            کد رهگیری سفارش:{" "}
            <span className="font-bold text-ink" dir="ltr">
              {order ? order.id : "ثبت آزمایشی"}
            </span>
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-lg border border-line-subtle bg-surface-soft p-4 text-start text-body-sm sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-subtle pb-3">
            <span className="text-caption text-subtle-ink">تاریخ ثبت:</span>
            <span className="font-medium text-ink">
              {order ? formatPersianDate(order.placedAt) : "امروز"}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-subtle pb-3">
            <span className="text-caption text-subtle-ink">مبلغ پرداختی (نمایشی):</span>
            <span className="font-bold text-brand-active">
              {order ? formatPrice(order.total) : "۰"} تومان
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-subtle pb-3">
            <span className="text-caption text-subtle-ink">روش تحویل:</span>
            <span className="font-medium text-ink">
              {order?.shippingMethod || "ارسال استاندارد"}
            </span>
          </div>

          {order?.address && (
            <div className="pt-1">
              <span className="text-caption text-subtle-ink">نشانی ارسال:</span>
              <p className="mt-1 font-medium text-ink">
                {order.address.recipient} — {order.address.address}
              </p>
            </div>
          )}
        </div>

        {order && order.items.length > 0 && (
          <div className="w-full text-start">
            <h2 className="mb-2 text-label font-bold text-ink">اقلام ثبت‌شده در سفارش:</h2>
            <div className="divide-y divide-line-subtle rounded-lg border border-line">
              {order.items.map((item, idx) => {
                const prod = products.find((p) => p.id === item.productId);
                return (
                  <div key={idx} className="flex items-center gap-3 p-3">
                    {prod ? (
                      <div className="relative size-12 shrink-0 overflow-hidden rounded border border-line bg-surface">
                        <ProductMedia product={prod} sizes="48px" />
                      </div>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-body-sm font-medium text-ink">{item.title}</p>
                      <p className="text-caption text-subtle-ink">
                        {toPersianDigits(item.quantity)} عدد × {formatPrice(item.unitPrice)} تومان
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-2 flex w-full flex-col gap-2.5 sm:flex-row">
          {order ? (
            <Button asChild className="sm:flex-1">
              <Link href={`/account/orders/${order.id}/tracking`}>
                <Truck aria-hidden />
                پیگیری وضعیت سفارش
              </Link>
            </Button>
          ) : null}

          {order ? (
            <Button asChild variant="outline" className="sm:flex-1">
              <Link href={`/account/orders/${order.id}`}>
                <FileText aria-hidden />
                مشاهده جزئیات سفارش
              </Link>
            </Button>
          ) : null}

          <Button asChild variant="secondary" className="sm:flex-1">
            <Link href="/products">
              <ShoppingBag aria-hidden />
              ادامه خرید
            </Link>
          </Button>
        </div>

        <p className="text-caption text-subtle-ink">
          سفارش به فهرست سفارش‌های حساب کاربری شما اضافه شد. به دلیل نبود سرور واقعی، پیامک ارسال نمی‌شود.
        </p>
      </div>
    </Container>
  );
}

export function CheckoutSuccessView() {
  return (
    <Suspense
      fallback={
        <Container className="py-12 text-center text-body-sm text-subtle-ink">
          در حال بارگذاری اطلاعات سفارش…
        </Container>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
