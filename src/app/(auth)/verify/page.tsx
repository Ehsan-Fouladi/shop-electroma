"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Clock, Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toPersianDigits } from "@/lib/formatters/number";
import { verifyCodeSchema } from "@/lib/validations/customer";
import { useCustomerStore } from "@/store/customer-store";
import { Suspense, useEffect, useRef, useState } from "react";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contactParam = searchParams.get("contact") || "۰۹۱۲۱۲۳۴۵۶۷";
  const setDemoContact = useCustomerStore((state) => state.setDemoContact);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleDigitChange = (index: number, val: string) => {
    const digit = val.slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);
    setError(null);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setSecondsLeft(120);
    setOtp(["", "", "", "", "", ""]);
    toast.info("کد جدید شبیه‌سازی شد", {
      description: "کد تأیید آزمایشی: ۱۲۳۴۵۶",
    });
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const codeString = otp.join("");
    const result = verifyCodeSchema.safeParse({ code: codeString });

    if (!result.success) {
      setError("لطفاً هر ۶ رقم کد را وارد کنید.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setDemoContact(contactParam);
    toast.success("تأیید با موفقیت انجام شد", {
      description: "به حساب کاربری خوش‌آمدید.",
    });
    router.push("/account");
  };

  const formatTimer = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${toPersianDigits(minutes)}:${toPersianDigits(secs < 10 ? `0${secs}` : secs)}`;
  };

  return (
    <div className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-heading font-bold text-ink">تأیید شماره و ورود</h1>
        <p className="text-body-sm text-subtle-ink">
          کد ۶ رقمی ارسال‌شده به شماره یا ایمیل{" "}
          <span className="font-bold text-ink" dir="ltr">
            {contactParam}
          </span>{" "}
          را وارد کنید.
        </p>
        <Link
          href="/login"
          className="text-caption font-medium text-brand hover:underline"
        >
          ویرایش شماره تماس / ایمیل
        </Link>
      </div>

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        <fieldset className="flex flex-col items-center gap-3">
          <legend className="sr-only">کد تأیید ۶ رقمی</legend>
          <div className="flex justify-center gap-2" dir="ltr">
            {otp.map((digit, idx) => (
              <Input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "verify-otp-error" : undefined}
                className="size-11 text-center text-title font-bold sm:size-12"
                aria-label={`رقم ${idx + 1}`}
              />
            ))}
          </div>
          {error ? (
            <p id="verify-otp-error" role="alert" className="text-caption text-sale">
              {error}
            </p>
          ) : null}
        </fieldset>

        <div className="flex items-center justify-between text-body-sm">
          {secondsLeft > 0 ? (
            <span className="flex items-center gap-1.5 text-subtle-ink">
              <Clock className="size-4" aria-hidden />
              <span>ارسال مجدد تا {formatTimer()}</span>
            </span>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleResend}
              className="text-brand hover:text-brand-active"
            >
              <RefreshCw aria-hidden />
              ارسال مجدد کد
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setOtp(["1", "2", "3", "4", "5", "6"]);
              setError(null);
            }}
            className="text-caption text-subtle-ink hover:text-ink"
          >
            تکمیل کد نمونه (۱۲۳۴۵۶)
          </Button>
        </div>

        <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="size-4.5 animate-spin" aria-hidden />
              در حال تأیید…
            </>
          ) : (
            <>
              <ShieldCheck aria-hidden className="size-4.5" />
              تأیید و ورود به حساب
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 border-t border-line-subtle pt-4 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-label font-medium text-subtle-ink hover:text-ink"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          بازگشت به صفحه ورود با رمز عبور
        </Link>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-line bg-surface p-8 text-center text-body-sm text-subtle-ink">
          در حال بارگذاری فرم تأیید…
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
