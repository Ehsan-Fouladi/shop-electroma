"use client";

import { Copy, TicketPercent } from "lucide-react";
import { toast } from "sonner";

import { AccountPageHeading } from "@/components/account/account-page-heading";
import { Button } from "@/components/ui/button";
import { customerCoupons } from "@/data/customer";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

export default function AccountCouponsPage() {
  const [activeTab, setActiveTab] = useState<"available" | "used" | "expired">("available");

  const filtered = customerCoupons.filter((c) => c.state === activeTab);

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    toast.success(`کد تخفیف ${code} کپی شد.`);
  };

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeading
        title="کدهای تخفیف"
        description="کوپن‌ها و جوایز تخفیف اختصاصی حساب کاربری شما."
      />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-line pb-2">
        {[
          { id: "available", label: "کدهای فعال" },
          { id: "used", label: "استفاده‌شده" },
          { id: "expired", label: "منقضی‌شده" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as any)}
            className={cn(
              "rounded-md px-3.5 py-1.5 text-label transition-colors",
              activeTab === t.id
                ? "bg-brand-soft font-bold text-brand-active"
                : "text-subtle-ink hover:text-ink hover:bg-surface-soft",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-surface p-8 text-center shadow-soft sm:p-12">
          <span className="grid size-14 place-items-center rounded-full bg-surface-muted text-subtle-ink">
            <TicketPercent className="size-8" aria-hidden />
          </span>
          <div>
            <h2 className="text-title font-bold text-ink">کد تخفیفی در این بخش ندارید</h2>
            <p className="mt-1 text-body-sm text-subtle-ink">
              کدهای تخفیف جشنواره‌ها و خریدهای شگفت‌انگیز در این بخش قرار می‌گیرند.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((coupon) => (
            <div
              key={coupon.code}
              className={cn(
                "flex flex-col justify-between rounded-xl border p-5 shadow-soft transition-colors",
                coupon.state === "available"
                  ? "border-line bg-surface hover:border-primary/40"
                  : "border-line-strong bg-surface-soft opacity-75",
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-2 border-b border-line-subtle pb-3">
                  <div className="flex items-center gap-2">
                    <TicketPercent className="size-5 text-brand" aria-hidden />
                    <span className="font-bold text-ink">{coupon.title}</span>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-caption font-medium",
                      coupon.state === "available"
                        ? "bg-success-soft text-success"
                        : "bg-surface-muted text-subtle-ink",
                    )}
                  >
                    {coupon.state === "available"
                      ? "فعال"
                      : coupon.state === "used"
                        ? "مصرف‌شده"
                        : "منقضی‌شده"}
                  </span>
                </div>

                <p className="mt-3 text-body-sm text-body">{coupon.description}</p>
                <p className="mt-2 text-caption text-subtle-ink">
                  مهلت اعتبار: <span dir="ltr">{coupon.expiresAt}</span>
                </p>
              </div>

              {coupon.state === "available" && (
                <div className="mt-4 flex items-center justify-between gap-2 rounded-lg border border-dashed border-primary/40 bg-brand-soft/30 p-2.5">
                  <span className="font-mono text-body font-bold text-brand-active" dir="ltr">
                    {coupon.code}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => copyCode(coupon.code)}
                  >
                    <Copy aria-hidden />
                    کپی کد
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
