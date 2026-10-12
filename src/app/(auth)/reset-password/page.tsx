"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

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
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/validations/customer";
import { Suspense, useState } from "react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const contact = searchParams.get("contact") || "حساب کاربری";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const passwordValue = form.watch("password") || "";
  const hasLength = passwordValue.length >= 8;
  const hasNumber = /\d/.test(passwordValue);
  const hasLetter = /[a-zA-Z\u0600-\u06FF]/.test(passwordValue);

  const onSubmit = async (values: ResetPasswordFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSuccess(true);
    toast.success("رمز عبور جدید با موفقیت ثبت شد");
  };

  return (
    <div className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-heading font-bold text-ink">تعیین رمز عبور جدید</h1>
        <p className="text-body-sm text-subtle-ink">
          برای {contact}، یک رمز عبور امن انتخاب کنید.
        </p>
      </div>

      {success ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-success-soft text-success">
            <CheckCircle2 className="size-7" aria-hidden />
          </span>
          <div>
            <h2 className="text-title font-bold text-ink">رمز عبور با موفقیت تغییر کرد</h2>
            <p className="mt-1 text-body-sm text-subtle-ink">
              اکنون می‌توانید با رمز جدید وارد حساب کاربری خود شوید.
            </p>
          </div>
          <Button asChild size="lg" className="w-full">
            <Link href="/login">ورود به حساب کاربری</Link>
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز عبور جدید</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        dir="ltr"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className="pl-11 pr-3.5"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 left-0 flex items-center px-3 text-subtle-ink hover:text-ink focus-visible:outline-primary"
                      aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
                    >
                      {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
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
                        type={showConfirmPassword ? "text" : "password"}
                        dir="ltr"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className="pl-11 pr-3.5"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 left-0 flex items-center px-3 text-subtle-ink hover:text-ink focus-visible:outline-primary"
                      aria-label={
                        showConfirmPassword ? "پنهان کردن تکرار رمز عبور" : "نمایش تکرار رمز عبور"
                      }
                    >
                      {showConfirmPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="rounded-md bg-surface-soft p-3 text-caption text-subtle-ink">
              <p className="font-medium text-ink">ویژگی‌های رمز عبور:</p>
              <ul className="mt-1 flex flex-col gap-1">
                <li className={hasLength ? "font-medium text-success" : ""}>
                  • حداقل ۸ نویسه {hasLength ? "✓" : ""}
                </li>
                <li className={hasLetter ? "font-medium text-success" : ""}>
                  • شامل حروف انگلیسی {hasLetter ? "✓" : ""}
                </li>
                <li className={hasNumber ? "font-medium text-success" : ""}>
                  • شامل اعداد {hasNumber ? "✓" : ""}
                </li>
              </ul>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="size-4.5 animate-spin" aria-hidden />
                  در حال ثبت…
                </>
              ) : (
                <>
                  <ShieldCheck aria-hidden className="size-4.5" />
                  ثبت رمز عبور جدید
                </>
              )}
            </Button>
          </form>
        </Form>
      )}

      <div className="mt-6 border-t border-line-subtle pt-4 text-center">
        <Link
          href="/login"
          className="text-label font-medium text-subtle-ink hover:text-ink"
        >
          انصراف و بازگشت به ورود
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-line bg-surface p-8 text-center text-body-sm text-subtle-ink">
          در حال بارگذاری…
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
