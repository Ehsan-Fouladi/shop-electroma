"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  newsletterSchema,
  type NewsletterFormValues,
} from "@/lib/validations/customer";
import { useState } from "react";

/**
 * Newsletter capture. UI-only: validates the address and confirms locally,
 * nothing is submitted anywhere (no backend in this phase).
 */
export function NewsletterSection() {
  const [done, setDone] = useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (_values: NewsletterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setDone(true);
    form.reset({ email: "" });
  };

  return (
    <Section aria-labelledby="newsletter-title">
      <Container>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-bl from-ink via-ink-soft to-ink p-5 shadow-raised sm:p-7 lg:p-8">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 end-[-4rem] size-72 rounded-full bg-primary/25 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-24 start-[-3rem] size-64 rounded-full bg-brand-subtle/20 blur-3xl"
          />

          <div className="relative grid gap-5 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div className="flex flex-col gap-3 text-white">
              <span className="grid size-11 place-items-center rounded-md bg-white/10 text-white">
                <Mail className="size-5" aria-hidden />
              </span>
              <h2 id="newsletter-title" className="text-title font-bold sm:text-heading">
                از تخفیف‌ها و محصولات جدید باخبر شوید
              </h2>
              <p className="max-w-lg text-body-sm text-white/70">
                ایمیل خود را وارد کنید تا پیشنهادهای ویژه هفتگی، تخفیف‌های محدود و
                راهنماهای خرید را دریافت کنید.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  noValidate
                  className="flex flex-col gap-2 sm:flex-row"
                >
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <label htmlFor={field.name} className="sr-only">
                            آدرس ایمیل
                          </label>
                          <FormControl>
                            <Input
                              type="email"
                              dir="ltr"
                              placeholder="name@example.com"
                              className="h-12 border-white/15 bg-white/10 text-white placeholder:text-white/40 focus-visible:border-white/40 focus-visible:outline-white/30"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-sale-soft" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="h-12 gap-2 bg-white text-ink hover:bg-brand-soft hover:text-brand-active"
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                    ) : (
                      <Send aria-hidden />
                    )}
                    عضویت در خبرنامه
                  </Button>
                </form>
              </Form>

              {done ? (
                <p
                  role="status"
                  className="flex items-center gap-1.5 text-label text-success-soft"
                >
                  <CheckCircle2 className="size-4" aria-hidden />
                  ثبت شد! از این پس پیشنهادهای ویژه را در ایمیل خود دریافت می‌کنید.
                </p>
              ) : null}

              <p className="text-caption text-white/50">
                نشانی ایمیل شما محفوظ می‌ماند و برای تبلیغات شخص ثالث استفاده نمی‌شود.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}