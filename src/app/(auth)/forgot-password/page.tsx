"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";

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
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validations/customer";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [submittedContact, setSubmittedContact] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      contact: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSubmittedContact(values.contact);
  };

  return (
    <div className="rounded-xl border border-line bg-surface p-6 shadow-soft sm:p-8">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-heading font-bold text-ink">فراموشی رمز عبور</h1>
        <p className="text-body-sm text-subtle-ink">
          شماره موبایل یا ایمیلی که با آن ثبت‌نام کرده‌اید را وارد کنید تا لینک
          بازیابی ارسال شود.
        </p>
      </div>

      {submittedContact ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 rounded-lg bg-success-soft p-4 text-success">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div className="text-body-sm">
              <p className="font-bold">پیام بازیابی شبیه‌سازی شد</p>
              <p className="mt-1 text-caption text-success/90">
                لینک یا کد بازنشانی برای «{submittedContact}» آماده شد. در این
                نسخه نمایشی می‌توانید مستقیماً به مرحله بازنشانی رمز بروید:
              </p>
            </div>
          </div>

          <Button asChild size="lg" className="w-full">
            <Link
              href={`/reset-password?contact=${encodeURIComponent(submittedContact)}`}
            >
              ادامه به صفحه تعیین رمز جدید
            </Link>
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setSubmittedContact(null);
              form.reset({ contact: submittedContact });
            }}
            className="w-full text-subtle-ink"
          >
            تغییر شماره یا ایمیل
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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

            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="size-4.5 animate-spin" aria-hidden />
                  در حال بررسی…
                </>
              ) : (
                <>
                  <Mail aria-hidden className="size-4.5" />
                  ارسال لینک بازیابی
                </>
              )}
            </Button>
          </form>
        </Form>
      )}

      <div className="mt-6 border-t border-line-subtle pt-4 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-label font-medium text-brand hover:underline"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          بازگشت به صفحه ورود
        </Link>
      </div>
    </div>
  );
}
