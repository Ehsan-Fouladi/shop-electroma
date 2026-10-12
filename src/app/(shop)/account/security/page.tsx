"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Laptop,
  Loader2,
  Lock,
  ShieldCheck,
  Smartphone,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { toast } from "sonner";

import { AccountPageHeading, AccountPanel } from "@/components/account/account-page-heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/lib/validations/customer";
import { useState } from "react";

export default function AccountSecurityPage() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    form.reset();
    toast.success("رمز عبور حساب با موفقیت تغییر کرد (نمایشی).");
  };

  const handleToggle2FA = () => {
    const next = !twoFactorEnabled;
    setTwoFactorEnabled(next);
    toast.success(
      next
        ? "ورود دو مرحله‌ای فعال شد (ارسال پیامک کد تأیید هنگام ورود)"
        : "ورود دو مرحله‌ای غیرفعال شد",
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeading
        title="امنیت حساب کاربری"
        description="تنظیمات رمز عبور، نشست‌های فعال و روش‌های افزایش امنیت حساب."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Change password */}
        <AccountPanel title="تغییر رمز عبور">
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رمز عبور فعلی</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showOld ? "text" : "password"}
                          dir="ltr"
                          placeholder="••••••••"
                          autoComplete="current-password"
                          className="pl-11 pr-3.5"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowOld(!showOld)}
                        className="absolute inset-y-0 left-0 flex items-center px-3 text-subtle-ink hover:text-ink focus-visible:outline-primary"
                        aria-label={showOld ? "پنهان کردن رمز عبور فعلی" : "نمایش رمز عبور فعلی"}
                      >
                        {showOld ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رمز عبور جدید (حداقل ۸ نویسه)</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showNew ? "text" : "password"}
                          dir="ltr"
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className="pl-11 pr-3.5"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute inset-y-0 left-0 flex items-center px-3 text-subtle-ink hover:text-ink focus-visible:outline-primary"
                        aria-label={showNew ? "پنهان کردن رمز عبور جدید" : "نمایش رمز عبور جدید"}
                      >
                        {showNew ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تکرار رمز عبور جدید</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showConfirm ? "text" : "password"}
                          dir="ltr"
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className="pl-11 pr-3.5"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute inset-y-0 left-0 flex items-center px-3 text-subtle-ink hover:text-ink focus-visible:outline-primary"
                        aria-label={showConfirm ? "پنهان کردن تکرار رمز عبور" : "نمایش تکرار رمز عبور"}
                      >
                        {showConfirm ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-2 gap-2"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    در حال به‌روزرسانی…
                  </>
                ) : (
                  <>
                    <Lock aria-hidden className="size-4" />
                    به‌روزرسانی رمز عبور
                  </>
                )}
              </Button>
            </form>
          </Form>
        </AccountPanel>

        {/* 2FA & Security Tips */}
        <div className="flex flex-col gap-6">
          <AccountPanel title="تأیید دو مرحله‌ای (2FA)">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-body-sm font-medium text-ink">ورود با رمز یک‌بارمصرف پیامکی</p>
                <p className="mt-1 text-caption text-subtle-ink">
                  هنگام ورود از مرورگر جدید، علاوه بر رمز عبور، یک پیامک تأیید دریافت خواهید کرد.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggle2FA}
                className="text-primary hover:text-brand-hover focus:outline-none"
                aria-label="تغییر وضعیت ورود دو مرحله‌ای"
              >
                {twoFactorEnabled ? (
                  <ToggleRight className="size-9 text-success" />
                ) : (
                  <ToggleLeft className="size-9 text-disabled-ink" />
                )}
              </button>
            </div>
          </AccountPanel>

          <AccountPanel title="نکات امنیتی">
            <div className="flex flex-col gap-2 text-caption text-body">
              <div className="flex items-center gap-2 text-success font-medium">
                <ShieldCheck className="size-4 shrink-0" />
                <span>حساب شما در وضعیت ایمن قرار دارد.</span>
              </div>
              <p className="text-subtle-ink">
                هیچ‌گاه رمز عبور یا کد تأیید ارسال‌شده به شماره همراه خود را در اختیار دیگران قرار ندهید.
                پشتیبانی الکتروما هرگز رمز عبور شما را درخواست نمی‌کند.
              </p>
            </div>
          </AccountPanel>
        </div>
      </div>

      {/* Active Sessions UI */}
      <AccountPanel
        title="دستگاه‌ها و نشست‌های فعال"
        description="فهرست دستگاه‌هایی که هم‌اکنون به این حساب کاربری متصل هستند."
        action={
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => toast.success("همه نشست‌های دیگر با موفقیت بسته شدند (نمایشی).")}
          >
            خروج از سایر دستگاه‌ها
          </Button>
        }
      >
        <div className="flex flex-col divide-y divide-line-subtle">
          <div className="flex items-center justify-between py-3 first:pt-0">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand-active">
                <Laptop className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-body-sm font-bold text-ink">مرورگر فعلی (Chrome در ویندوز)</p>
                <p className="text-caption text-subtle-ink">تهران، ایران • هم‌اکنون فعال</p>
              </div>
            </div>
            <span className="rounded-full bg-success-soft px-2.5 py-0.5 text-caption font-medium text-success">
              نشست جاری
            </span>
          </div>

          <div className="flex items-center justify-between py-3 last:pb-0">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-surface-muted text-subtle-ink">
                <Smartphone className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-body-sm font-medium text-ink">اپلیکیشن موبایل (iOS)</p>
                <p className="text-caption text-subtle-ink">تهران، ایران • ۲ روز پیش</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => toast.info("نشست دستگاه با موفقیت خاتمه یافت.")}
            >
              خروج
            </Button>
          </div>
        </div>
      </AccountPanel>
    </div>
  );
}
