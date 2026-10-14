"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import {
  AccountPageHeading,
  AccountPanel,
} from "@/components/account/account-page-heading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatPersianDate } from "@/lib/formatters/date";
import { formatPrice } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import { useCustomerStore } from "@/store/customer-store";
import { useState } from "react";

export default function AccountWalletPage() {
  const walletBalance = useCustomerStore((state) => state.walletBalance);
  const transactions = useCustomerStore((state) => state.walletTransactions);

  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(5_000_000);

  const handleTopUp = () => {
    useCustomerStore.setState((state) => ({
      walletBalance: state.walletBalance + topUpAmount,
      walletTransactions: [
        {
          id: `tx-${Date.now().toString(36)}`,
          title: "شارژ کیف پول (شبیه‌سازی)",
          date: new Date().toISOString(),
          amount: topUpAmount,
          direction: "in",
          note: "افزایش اعتبار نمایشی در محیط آزمایشی فرانت‌اند.",
        },
        ...state.walletTransactions,
      ],
    }));
    setIsTopUpOpen(false);
    toast.success("کیف پول با موفقیت شارژ شد (نمایشی)", {
      description: `مبلغ ${formatPrice(topUpAmount)} تومان به حساب اضافه شد.`,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeading
        title="کیف پول الکتروما"
        description="مدیریت موجودی اعتباری، افزایش شارژ و مشاهده ریز تراکنش‌ها."
      />

      {/* Balance Card */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-l from-primary via-brand to-primary p-6 text-white shadow-raised sm:p-8">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
              <Wallet className="size-8" aria-hidden />
            </span>
            <div>
              <p className="text-body-sm text-white/80">موجودی قابل استفاده</p>
              <p className="mt-1 text-heading font-bold sm:text-display-sm">
                {formatPrice(walletBalance)}{" "}
                <span className="text-body font-normal text-white/80">
                  تومان
                </span>
              </p>
            </div>
          </div>

          <Button
            type="button"
            size="lg"
            className="bg-white text-ink hover:bg-white/90"
            onClick={() => setIsTopUpOpen(true)}
          >
            <Plus aria-hidden />
            افزایش اعتبار (نمایشی)
          </Button>
        </div>
      </div>

      {/* Transactions List */}
      <AccountPanel
        title="تاریخچه تراکنش‌های کیف پول"
        description="فهرست واریزها، پرداخت‌های خرید و اصلاحات اعتباری"
      >
        {transactions.length === 0 ? (
          <p className="py-6 text-center text-body-sm text-subtle-ink">
            هیچ تراکنشی در این کیف پول ثبت نشده است.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-line-subtle">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-full text-caption",
                      tx.direction === "in"
                        ? "bg-success-soft text-success"
                        : "bg-surface-muted text-sale",
                    )}
                  >
                    {tx.direction === "in" ? (
                      <ArrowDownLeft className="size-4" />
                    ) : (
                      <ArrowUpRight className="size-4" />
                    )}
                  </span>
                  <div>
                    <p className="text-body-sm font-bold text-ink">
                      {tx.title}
                    </p>
                    <p className="text-caption text-subtle-ink">
                      {formatPersianDate(tx.date)}
                      {tx.note ? ` • ${tx.note}` : ""}
                    </p>
                  </div>
                </div>

                <div className="text-end font-bold">
                  <span
                    className={cn(
                      "text-body-sm",
                      tx.direction === "in" ? "text-success" : "text-ink",
                    )}
                  >
                    {tx.direction === "in" ? "+" : "−"} {formatPrice(tx.amount)}{" "}
                    تومان
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </AccountPanel>

      {/* Top-up Dialog */}
      <Dialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>افزایش موجودی کیف پول (شبیه‌سازی)</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <p className="text-body-sm text-subtle-ink">
              مبلغ مورد نظر برای شارژ آزمایشی کیف پول را انتخاب کنید:
            </p>

            <div className="grid grid-cols-2 gap-2">
              {[2_000_000, 5_000_000, 10_000_000, 20_000_000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTopUpAmount(amt)}
                  className={cn(
                    "rounded-lg border p-3 text-center transition-colors",
                    topUpAmount === amt
                      ? "border-primary bg-brand-soft font-bold text-brand-active"
                      : "border-line bg-surface hover:bg-surface-soft text-body-sm",
                  )}
                >
                  {formatPrice(amt)} تومان
                </button>
              ))}
            </div>

            <div className="rounded-lg bg-surface-soft p-3 text-caption text-subtle-ink">
              <ShieldCheck className="mb-1 size-4 text-brand inline me-1" />
              این شارژ صرفاً در وضعیت حافظه مرورگر اعمال می‌شود و مستلزم پرداخت
              بانکی واقعی نیست.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsTopUpOpen(false)}>
                انصراف
              </Button>
              <Button onClick={handleTopUp}>تأیید و شارژ حساب</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
