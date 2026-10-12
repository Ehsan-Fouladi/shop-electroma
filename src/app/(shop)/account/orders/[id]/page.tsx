"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  Download,
  HelpCircle,
  Package,
  RotateCcw,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

import { AccountBackLink, AccountPageHeading, AccountPanel } from "@/components/account/account-page-heading";
import { StatusBadge } from "@/components/account/status-badge";
import { ProductMedia } from "@/components/product/product-media";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { formatPersianDate } from "@/lib/formatters/date";
import { formatPrice, toPersianDigits } from "@/lib/formatters/number";
import { useCustomerStore } from "@/store/customer-store";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const orders = useCustomerStore((state) => state.orders);

  const order = orders.find(
    (o) =>
      o.id.toLowerCase() === orderId?.toLowerCase() ||
      o.id.toLowerCase() === `order-${orderId?.toLowerCase()}` ||
      orderId?.toLowerCase() === `order-${o.id.toLowerCase()}`,
  );

  if (!order) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-surface p-8 text-center shadow-soft">
        <AlertCircle className="size-10 text-subtle-ink" aria-hidden />
        <div>
          <h1 className="text-title font-bold text-ink">سفارش مورد نظر یافت نشد</h1>
          <p className="mt-1 text-body-sm text-subtle-ink">
            ممکن است شماره سفارش اشتباه باشد یا از فهرست حذف شده باشد.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/account/orders">بازگشت به فهرست سفارش‌ها</Link>
        </Button>
      </div>
    );
  }

  // const handleDownloadInvoice = () => {
  //   toast.success("پیش‌فاکتور شبیه‌سازی شد", {
  //     description: `فایل پیش‌فاکتور برای سفارش ${order.id} آماده دانلود شد.`,
  //   });
  // };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AccountBackLink href="/account/orders" label="بازگشت به سفارش‌ها" />
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => window.print()}>
            <Download aria-hidden />
            دریافت فاکتور (نمایشی)
          </Button>
          {order.status === "shipped" && (
            <Button asChild size="sm">
              <Link href={`/account/orders/${order.id}/tracking`}>
                <Truck aria-hidden />
                رهگیری مرسوله
              </Link>
            </Button>
          )}
        </div>
      </div>

      <AccountPageHeading
        title={
          <span>
            جزئیات سفارش <span dir="ltr" className="inline-block whitespace-nowrap">{order.id}</span>
          </span>
        }
        breadcrumbTitle={`جزئیات سفارش ${order.id}`}
        description={`ثبت‌شده در ${formatPersianDate(order.placedAt)}`}
      />

      {/* Status Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-surface p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand-active">
            <Package className="size-6" aria-hidden />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-body font-bold text-ink">وضعیت کنونی:</span>
              <StatusBadge status={order.status} />
            </div>
            <p className="mt-0.5 text-caption text-subtle-ink">
              کد پیگیری پستی / تحویل: {order.trackingCode ? <span dir="ltr">{order.trackingCode}</span> : "در انتظار صدور"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {order.status === "delivered" && (
            <Button asChild variant="outline" size="sm">
              <Link href={`/account/returns/new?orderId=${encodeURIComponent(order.id)}`}>
                <RotateCcw aria-hidden />
                درخواست مرجوعی کالا
              </Link>
            </Button>
          )}
          <Button asChild variant="ghost" size="sm">
            <Link href="/support/contact">
              <HelpCircle aria-hidden />
              پشتیبانی سفارش
            </Link>
          </Button>
        </div>
      </div>

      {/* Items List */}
      <AccountPanel title="اقلام سفارش">
        <div className="divide-y divide-line-subtle">
          {order.items.map((item, idx) => {
            const prod = products.find((p) => p.id === item.productId);
            return (
              <div
                key={idx}
                className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-md border border-line bg-surface-soft">
                    {prod ? <ProductMedia product={prod} sizes="64px" /> : null}
                  </div>
                  <div>
                    {prod ? (
                      <Link
                        href={`/product/${prod.slug}`}
                        className="line-clamp-1 text-body-sm font-medium text-ink hover:text-brand-active"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <p className="line-clamp-1 text-body-sm font-medium text-ink">{item.title}</p>
                    )}
                    {item.variant && (
                      <p className="mt-0.5 text-caption text-subtle-ink">مدل: {item.variant}</p>
                    )}
                    <p className="mt-1 text-caption text-subtle-ink">
                      قیمت واحد: {formatPrice(item.unitPrice)} تومان
                    </p>
                  </div>
                </div>

                <div className="text-end">
                  <span className="text-caption text-subtle-ink">
                    {toPersianDigits(item.quantity)} عدد
                  </span>
                  <p className="text-body font-bold text-ink">
                    {formatPrice(item.unitPrice * item.quantity)} تومان
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </AccountPanel>

      {/* Delivery & Payment Details */}
      <div className="grid gap-6 md:grid-cols-2">
        <AccountPanel title="نشانی تحویل گیرنده">
          <div className="flex flex-col gap-1.5 text-body-sm">
            <p className="font-bold text-ink">{order.address.recipient}</p>
            <p className="text-body">{order.address.address}</p>
            <p className="text-caption text-subtle-ink">
              استان: {order.address.province} • شهر: {order.address.city}
            </p>
            <p className="text-caption text-subtle-ink">کد پستی: {order.address.postalCode}</p>
            <p className="text-caption text-subtle-ink">تلفن تماس: {order.address.phone}</p>
          </div>
        </AccountPanel>

        <AccountPanel title="جزئیات مالی و پرداخت">
          <dl className="flex flex-col gap-2.5 text-body-sm">
            <div className="flex justify-between text-subtle-ink">
              <dt>مبلغ کالاها</dt>
              <dd className="font-medium text-ink">{formatPrice(order.subtotal)} تومان</dd>
            </div>
            <div className="flex justify-between text-subtle-ink">
              <dt>تخفیف کل</dt>
              <dd className="font-medium text-success">
                {order.discount ? `− ${formatPrice(order.discount)}` : "۰"} تومان
              </dd>
            </div>
            <div className="flex justify-between text-subtle-ink">
              <dt>هزینه ارسال ({order.shippingMethod})</dt>
              <dd className="font-medium text-ink">
                {order.shipping === 0 ? "رایگان" : `${formatPrice(order.shipping)} تومان`}
              </dd>
            </div>
            <div className="border-t border-line-subtle pt-2.5">
              <div className="flex justify-between font-bold text-ink">
                <dt>مبلغ پرداخت‌شده</dt>
                <dd className="text-title-sm text-brand-active">{formatPrice(order.total)} تومان</dd>
              </div>
            </div>
            <div className="flex justify-between text-caption text-subtle-ink pt-1">
              <dt>شیوه پرداخت</dt>
              <dd>
                {order.paymentMethod === "wallet"
                  ? "کیف پول الکتروما (نمایشی)"
                  : "درگاه اینترنتی شتاب"}
              </dd>
            </div>
          </dl>
        </AccountPanel>
      </div>
    </div>
  );
}
