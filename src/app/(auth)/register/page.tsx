"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, ShieldAlert, UserPlus } from "lucide-react";
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
import { registerSchema, type RegisterFormValues } from "@/lib/validations/customer";
import { useCustomerStore } from "@/store/customer-store";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const setDemoContact = useCustomerStore((state) => state.setDemoContact);
  const updateProfile = useCustomerStore((state) => state.updateProfile);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setDemoContact(values.phone);
    updateProfile({
      name: values.name,
      phone: values.phone,
      email: values.email || "",
    });
    toast.success("ثبت‌نام اولیه انجام شد", {
      description: "برای تکمیل، کد تأیید ارسالی را وارد کنید.",
    });
    router.push(`/verify?contact=${encodeURIComponent(values.phone)}`);
  };

  return (
    <div className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-heading font-bold text-ink">ثبت‌نام در الکتروما</h1>
        <p className="text-body-sm text-subtle-ink">
          حساب کاربری بسازید تا خرید، پیگیری سفارش و مدیریت نشانی‌ها برایتان آسان‌تر شود.
        </p>
      </div>

      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl>
                  <Input placeholder="مثلاً: سارا احمدی" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شماره موبایل</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    dir="ltr"
                    placeholder="09121234567"
                    autoComplete="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ایمیل (اختیاری)</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    dir="ltr"
                    placeholder="name@example.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رمز عبور (حداقل ۸ نویسه)</FormLabel>
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
                <FormLabel>تکرار رمز عبور</FormLabel>
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

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="pt-1">
                <div className="flex items-start gap-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      className="mt-0.5 size-4 rounded border-line text-primary focus:ring-primary"
                    />
                  </FormControl>
                  <label htmlFor={field.name} className="cursor-pointer text-label text-body">
                    با ثبت‌نام،{" "}
                    <Link href="/terms" className="text-brand hover:underline">
                      قوانین و مقررات
                    </Link>{" "}
                    و{" "}
                    <Link href="/privacy" className="text-brand hover:underline">
                      حریم خصوصی
                    </Link>{" "}
                    الکتروما را می‌پذیرم.
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="mt-2 w-full gap-2"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="size-4.5 animate-spin" aria-hidden />
                در حال ثبت‌نام…
              </>
            ) : (
              <>
                <UserPlus aria-hidden className="size-4.5" />
                ثبت‌نام و ادامه
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 flex flex-col gap-3 border-t border-line-subtle pt-6 text-center">
        <p className="text-body-sm text-subtle-ink">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link href="/login" className="font-bold text-brand hover:underline">
            ورود به حساب
          </Link>
        </p>

        <div className="flex items-center gap-2 rounded-md bg-brand-soft/60 p-3 text-start text-caption text-brand-active">
          <ShieldAlert className="size-4 shrink-0" aria-hidden />
          <span>
            ثبت‌نام در این مرحله فرم آزمایشی فرانت‌اند است و حسابی روی سرور واقعی ایجاد نمی‌کند.
          </span>
        </div>
      </div>
    </div>
  );
}
