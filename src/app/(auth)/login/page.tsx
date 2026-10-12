"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Loader2, LogIn, ShieldAlert } from "lucide-react";
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
import { loginSchema, type LoginFormValues } from "@/lib/validations/customer";
import { useCustomerStore } from "@/store/customer-store";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const setDemoContact = useCustomerStore((state) => state.setDemoContact);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      contact: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginFormValues) => {
    // Simulate brief interaction delay for realistic feedback
    await new Promise((resolve) => setTimeout(resolve, 300));
    setDemoContact(values.contact);
    toast.success("ورود نمایشی با موفقیت انجام شد", {
      description: `خوش‌آمدید (${values.contact})`,
    });
    router.push("/account");
  };

  const contactValue = form.watch("contact");

  return (
    <div className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-heading font-bold text-ink">ورود به حساب کاربری</h1>
        <p className="text-body-sm text-subtle-ink">
          برای دسترسی به سفارش‌ها و اطلاعات حساب، شماره موبایل یا ایمیل خود را وارد کنید.
        </p>
      </div>

      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شماره موبایل یا ایمیل</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    dir="ltr"
                    placeholder="09121234567 یا name@example.com"
                    autoComplete="username"
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
                <div className="flex items-center justify-between">
                  <FormLabel>رمز عبور</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-caption text-brand hover:underline"
                  >
                    فراموشی رمز عبور؟
                  </Link>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      dir="ltr"
                      placeholder="••••••••"
                      autoComplete="current-password"
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

          <div className="flex items-center justify-between pt-1">
            <label className="flex cursor-pointer items-center gap-2 text-label text-body">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="size-4 rounded border-line text-primary focus:ring-primary"
              />
              مرا به خاطر بسپار
            </label>
            <Link
              href={`/verify?contact=${encodeURIComponent(contactValue || "09121234567")}`}
              className="flex items-center gap-1 text-caption font-medium text-brand hover:underline"
            >
              <KeyRound className="size-3.5" aria-hidden />
              ورود با رمز یک‌بارمصرف
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-2 w-full gap-2"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="size-4.5 animate-spin" aria-hidden />
                در حال ورود…
              </>
            ) : (
              <>
                <LogIn aria-hidden className="size-4.5" />
                ورود به حساب کاربری
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 flex flex-col gap-3 border-t border-line-subtle pt-6 text-center">
        <p className="text-body-sm text-subtle-ink">
          کاربر جدید هستید؟{" "}
          <Link href="/register" className="font-bold text-brand hover:underline">
            ثبت‌نام در الکتروما
          </Link>
        </p>

        <div className="flex items-center gap-2 rounded-md bg-brand-soft/60 p-3 text-start text-caption text-brand-active">
          <ShieldAlert className="size-4 shrink-0" aria-hidden />
          <span>
            احراز هویت در این نسخه آزمایشی است. با هر شماره یا ایمیل دلخواه می‌توانید وارد حساب نمایشی شوید.
          </span>
        </div>
      </div>
    </div>
  );
}
