"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  Box,
  Check,
  CheckCircle2,
  Clock,
  FileCheck2,
  PackageCheck,
  Truck,
} from "lucide-react";

import {
  AccountBackLink,
  AccountPageHeading,
  AccountPanel,
} from "@/components/account/account-page-heading";
import { StatusBadge } from "@/components/account/status-badge";
import { Button } from "@/components/ui/button";
import { formatPersianDate } from "@/lib/formatters/date";
import { cn } from "@/lib/utils/cn";
import { useCustomerStore } from "@/store/customer-store";
import type { OrderStatus } from "@/types/customer";

const TRACKING_STEPS = [
  {
    id: 1,
    title: "ثبت سفارش",
    desc: "سفارش در سیستم ثبت شد.",
    icon: FileCheck2,
  },
  {
    id: 2,
    title: "تأیید سفارش",
    desc: "اطلاعات مالی و پرداخت تأیید شد.",
    icon: CheckCircle2,
  },
  {
    id: 3,
    title: "آماده‌سازی",
    desc: "کالا از انبار بسته‌بندی شد.",
    icon: Box,
  },
  {
    id: 4,
    title: "تحویل به شرکت حمل",
    desc: "بسته به مأمور ارسال تحویل گردید.",
    icon: Truck,
  },
  {
    id: 5,
    title: "در مسیر تحویل",
    desc: "مرسوله در مسیر نشانی گیرنده است.",
    icon: Clock,
  },
  {
    id: 6,
    title: "تحویل‌شده",
    desc: "بسته با موفقیت به گیرنده تحویل شد.",
    icon: PackageCheck,
  },
];

function getActiveStepIndex(status: OrderStatus): number {
  switch (status) {
    case "pending":
      return 1;
    case "processing":
      return 3;
    case "shipped":
      return 4;
    case "delivered":
      return 6;
    case "cancelled":
      return 1;
    default:
      return 2;
  }
}

export default function OrderTrackingPage() {
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
          <h1 className="text-title font-bold text-ink">
            سفارش مورد نظر یافت نشد
          </h1>
          <p className="mt-1 text-body-sm text-subtle-ink">
            امکان رهگیری سفارشی با این شناسه وجود ندارد.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/account/orders">بازگشت به سفارش‌ها</Link>
        </Button>
      </div>
    );
  }

  const currentStep = getActiveStepIndex(order.status);

  return (
    <div className="flex flex-col gap-6">
      <AccountBackLink
        href={`/account/orders/${order.id}`}
        label="بازگشت به جزئیات سفارش"
      />

      <AccountPageHeading
        title={
          <span>
            رهگیری وضعیت مرسوله{" "}
            <span dir="ltr" className="inline-block whitespace-nowrap">
              {order.id}
            </span>
          </span>
        }
        breadcrumbTitle={`رهگیری وضعیت مرسوله ${order.id}`}
        description={`کد پیگیری: ${order.trackingCode || "در حال ثبت"} • ثبت در ${formatPersianDate(order.placedAt)}`}
      />

      {/* Status overview card */}
      <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-body font-bold text-ink">وضعیت مرسوله:</span>
            <StatusBadge status={order.status} />
          </div>
          <p className="mt-1 text-caption text-subtle-ink">
            روش ارسال: {order.shippingMethod} • گیرنده:{" "}
            {order.address.recipient} ({order.address.city})
          </p>
        </div>

        <div className="w-fit rounded-md border border-line bg-surface-soft px-3 py-2 text-label">
          کد رهگیری پستی:{" "}
          <span className="font-bold text-ink" dir="ltr">
            {order.trackingCode || "EL-TRK-PENDING"}
          </span>
        </div>
      </div>

      {/* Timeline Steps */}
      <AccountPanel title="مراحل ارسال سفارش">
        <div className="my-2 flex flex-col gap-1">
          {TRACKING_STEPS.map((s, idx) => {
            const isPast = currentStep > s.id;
            const isCurrent = currentStep === s.id;
            const isLast = idx === TRACKING_STEPS.length - 1;
            return (
              <div key={s.id} className="flex items-stretch gap-3.5 sm:gap-4">
                {/* Step indicator column */}
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full text-caption transition-colors",
                      isCurrent
                        ? "bg-primary text-white ring-4 ring-primary/20 shadow-soft"
                        : isPast
                          ? "bg-brand-soft text-brand-active"
                          : "bg-surface-muted text-disabled-ink",
                    )}
                  >
                    {isPast ? (
                      <Check className="size-4" aria-hidden />
                    ) : (
                      <s.icon className="size-4" aria-hidden />
                    )}
                  </span>
                  {!isLast && (
                    <div
                      className={cn(
                        "w-0.5 flex-1 my-1.5",
                        isPast ? "bg-primary/40" : "bg-line-subtle",
                      )}
                    />
                  )}
                </div>

                {/* Step content box */}
                <div className="flex-1 pb-4">
                  <div className="rounded-lg border border-line-subtle bg-surface-soft p-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p
                        className={cn(
                          "text-body-sm font-bold",
                          isCurrent
                            ? "text-brand-active"
                            : isPast
                              ? "text-ink"
                              : "text-subtle-ink",
                        )}
                      >
                        {s.title}
                      </p>
                      {isCurrent && (
                        <span className="rounded-full bg-brand-soft px-2 py-0.5 text-caption font-medium text-brand-active">
                          مرحله کنونی
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-caption text-subtle-ink">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AccountPanel>
    </div>
  );
}
