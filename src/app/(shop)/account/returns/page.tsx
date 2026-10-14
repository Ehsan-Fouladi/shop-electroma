"use client";

import Link from "next/link";
import { Plus, RotateCcw } from "lucide-react";

import { AccountPageHeading, AccountPanel } from "@/components/account/account-page-heading";
import { StatusBadge } from "@/components/account/status-badge";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { formatPersianDate } from "@/lib/formatters/date";
import { useCustomerStore } from "@/store/customer-store";

export default function AccountReturnsPage() {
  const returns = useCustomerStore((state) => state.returns);

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeading
        title="مرجوعی کالاها"
        description="پیگیری درخواست‌های بازگشت کالا و ضمانت ۷ روزه تعویض."
      />

      <div>
        <Button asChild>
          <Link href="/account/returns/new">
            <Plus aria-hidden />
            ثبت درخواست مرجوعی جدید
          </Link>
        </Button>
      </div>

      {returns.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-surface p-8 text-center shadow-soft sm:p-12">
          <span className="grid size-14 place-items-center rounded-full bg-surface-muted text-subtle-ink">
            <RotateCcw className="size-8" aria-hidden />
          </span>
          <div>
            <h2 className="text-title font-bold text-ink">هیچ درخواست مرجوعی فعالی ندارید</h2>
            <p className="mt-1 text-body-sm text-subtle-ink">
              کالاهای تحویل‌شده تا ۷ روز پس از دریافت با توجه به شرایط ضمانت قابل مرجوعی هستند.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/account/orders">مشاهده سفارش‌های تحویل‌شده</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {returns.map((req) => {
            const prod = products.find((p) => p.id === req.productId);
            return (
              <AccountPanel key={req.id}>
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line-subtle pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink" dir="ltr">
                        {req.id}
                      </span>
                      <StatusBadge status={req.status} />
                    </div>
                    <p className="mt-1 text-caption text-subtle-ink">
                      مربوط به سفارش: <span dir="ltr">{req.orderId}</span> • تاریخ ثبت:{" "}
                      {formatPersianDate(req.requestedAt)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <p className="text-body-sm font-bold text-ink">
                    کالا: {prod ? prod.title : req.productId}
                  </p>
                  <p className="text-caption text-subtle-ink">دلیل مرجوعی: {req.reason}</p>
                  {req.description && (
                    <p className="rounded-md bg-surface-soft p-3 text-caption text-body">
                      توضیحات: {req.description}
                    </p>
                  )}
                </div>
              </AccountPanel>
            );
          })}
        </div>
      )}
    </div>
  );
}
