"use client";

import { AlertCircle, CheckCircle2, Loader2, Sparkles, Tag, Ticket, X } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MOCK_COUPONS,
  validateMockCoupon,
  type CouponDefinition,
} from "@/lib/checkout/coupons";
import { formatPrice } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

export interface AppliedCouponState {
  code: string;
  coupon: CouponDefinition;
  discountAmount: number;
}

interface CouponSectionProps {
  subtotal: number;
  shippingFee: number;
  appliedCoupon: AppliedCouponState | null;
  onApplyCoupon: (coupon: AppliedCouponState) => void;
  onRemoveCoupon: () => void;
  className?: string;
}

export function CouponSection({
  subtotal,
  shippingFee,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  className,
}: CouponSectionProps) {
  const [inputCode, setInputCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleApply = (codeToApply?: string) => {
    const targetCode = (codeToApply ?? inputCode).trim();
    if (!targetCode) {
      setErrorMessage("لطفاً یک کد تخفیف وارد کنید.");
      return;
    }

    setIsApplying(true);
    setErrorMessage(null);

    // Simulate standard frontend interaction delay (400ms) for realistic UX feedback
    setTimeout(() => {
      const result = validateMockCoupon(targetCode, subtotal, shippingFee);

      if (result.valid && result.coupon) {
        onApplyCoupon({
          code: result.coupon.code,
          coupon: result.coupon,
          discountAmount: result.discountAmount,
        });
        setInputCode("");
        setErrorMessage(null);
        toast.success(`کد تخفیف «${result.coupon.code}» با موفقیت اعمال شد`);
      } else {
        setErrorMessage(
          result.errorMessage || "کد تخفیف وارد شده معتبر نیست یا منقضی شده است.",
        );
        toast.error("کد تخفیف معتبر نیست");
      }

      setIsApplying(false);
    }, 400);
  };

  const handleRemove = () => {
    onRemoveCoupon();
    setErrorMessage(null);
    toast.info("کد تخفیف حذف شد");
  };

  const handleFillDemoCode = (code: string) => {
    setInputCode(code);
    setErrorMessage(null);
    handleApply(code);
  };

  return (
    <section
      aria-labelledby="coupon-section-title"
      className={cn("flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 shadow-soft", className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket className="size-4.5 text-brand" aria-hidden />
          <h3 id="coupon-section-title" className="text-body-sm font-bold text-ink">
            کد تخفیف
          </h3>
        </div>
        {!appliedCoupon && (
          <span className="text-caption text-subtle-ink">دارای کد تخفیف هستید؟</span>
        )}
      </div>

      {appliedCoupon ? (
        /* Applied Coupon State */
        <div className="flex flex-col gap-2.5">
          <Alert variant="success" className="py-2.5">
            <CheckCircle2 className="size-4 text-success" aria-hidden />
            <AlertTitle className="text-label font-bold">کد تخفیف اعمال شد</AlertTitle>
            <AlertDescription className="text-caption">
              مبلغ {formatPrice(appliedCoupon.discountAmount)} تومان از فاکتور شما کسر گردید.
            </AlertDescription>
          </Alert>

          <div className="flex items-center justify-between rounded-md border border-success/30 bg-success-soft/30 p-2.5">
            <div className="flex items-center gap-2">
              <Badge variant="brand" className="font-mono text-label" dir="ltr">
                {appliedCoupon.code}
              </Badge>
              <div className="flex flex-col">
                <span className="text-caption font-bold text-ink">{appliedCoupon.coupon.title}</span>
                <span className="text-caption text-subtle-ink">
                  {appliedCoupon.coupon.description}
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="h-8 gap-1 text-caption text-sale hover:bg-sale-soft hover:text-sale"
              aria-label={`حذف کد تخفیف ${appliedCoupon.code}`}
            >
              <X className="size-3.5" aria-hidden />
              حذف کد
            </Button>
          </div>
        </div>
      ) : (
        /* Input & Apply Form */
        <div className="flex flex-col gap-2.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleApply();
            }}
            className="flex items-stretch gap-2"
          >
            <div className="relative flex-1">
              <Input
                type="text"
                dir="ltr"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                disabled={isApplying}
                placeholder="مثلاً: ELECTROMA"
                aria-label="کد تخفیف"
                aria-invalid={Boolean(errorMessage)}
                aria-describedby={errorMessage ? "coupon-error" : undefined}
                className="font-mono uppercase text-body-sm tracking-wider"
              />
              {inputCode && !isApplying && (
                <button
                  type="button"
                  onClick={() => setInputCode("")}
                  className="absolute inset-y-0 end-2 flex items-center text-subtle-ink hover:text-ink"
                  aria-label="پاک کردن کد وارد شده"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <Button
              type="submit"
              disabled={isApplying || !inputCode.trim()}
              className="shrink-0 gap-1.5"
            >
              {isApplying ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  بررسی…
                </>
              ) : (
                <>
                  <Tag className="size-4" aria-hidden />
                  اعمال کد
                </>
              )}
            </Button>
          </form>

          {/* Error Feedback */}
          {errorMessage && (
            <Alert id="coupon-error" role="alert" variant="destructive" className="py-2 text-caption">
              <AlertCircle className="size-4 text-sale" aria-hidden />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Demo Suggestions */}
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex items-center gap-1 text-caption text-subtle-ink">
              <Sparkles className="size-3.5 text-warning" aria-hidden />
              <span>کدهای آزمایشی پیشنهادی (تست فرانت‌اند):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(MOCK_COUPONS).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleFillDemoCode(code)}
                  className="rounded-xs border border-dashed border-primary/40 bg-brand-soft/40 px-2 py-0.5 font-mono text-caption text-brand-active transition-colors hover:bg-brand-soft hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
                  title={`اعمال کد ${code}`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="border-t border-line-subtle pt-2 text-caption text-subtle-ink">
        تخفیف‌ها در این نسخه نمایشی و برای ارزیابی رابط کاربری هستند و به سرور متصل نمی‌شوند.
      </p>
    </section>
  );
}
