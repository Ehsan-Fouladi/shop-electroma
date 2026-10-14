"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessageSquarePlus, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import {
  reviewFormSchema,
  type ReviewFormValues,
} from "@/lib/validations/customer";
import { useState } from "react";

/**
 * Review composer preview. Rating and text stay in local state only: there is no
 * review backend in this phase, so the form is explicitly labelled as a
 * non-persisting preview instead of pretending to publish anything.
 */
export function ReviewFormDialog({ productTitle }: { productTitle: string }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 5,
      name: "",
      review: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (_values: ReviewFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSubmitted(true);
  };

  const currentRating = form.watch("rating");

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setSubmitted(false);
          form.reset({ rating: 5, name: "", review: "" });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquarePlus aria-hidden />
          نوشتن نظر (نمایشی)
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="pe-8 text-body-lg leading-7">
            ثبت نظر برای این کالا
          </DialogTitle>
          <DialogDescription className="line-clamp-2">
            {productTitle} — این فرم به نظرهای نمونه اضافه نمی‌شود.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>امتیاز شما به این کالا</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <label
                          key={value}
                          className="cursor-pointer rounded-sm p-0.5 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary"
                        >
                          <input
                            type="radio"
                            name="review-rating"
                            value={value}
                            checked={field.value === value}
                            onChange={() => field.onChange(value)}
                            className="sr-only"
                          />
                          <Star
                            aria-hidden
                            className={cn(
                              "size-6 transition-colors",
                              value <= currentRating
                                ? "fill-warning text-warning"
                                : "text-line-strong",
                            )}
                          />
                          <span className="sr-only">
                            {toPersianDigits(value)} از ۵
                          </span>
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    نام نمایشی{" "}
                    <span className="text-sale" aria-hidden="true">
                      *
                    </span>
                    <span className="sr-only">(الزامی)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="مثلاً: کاربر الکتروما" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    متن نظر{" "}
                    <span className="text-sale" aria-hidden="true">
                      *
                    </span>
                    <span className="sr-only">(الزامی، حداقل ۵ حرف)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="تجربه‌تان از این کالا را بنویسید…"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="rounded-md bg-warning-soft px-3 py-2.5 text-caption text-warning">
              این فرم فقط پیش‌نمایش است؛ نظر شما ذخیره یا منتشر نمی‌شود و روی
              امتیاز کاتالوگ اثری ندارد.
            </p>

            {submitted ? (
              <p className="text-label text-success" aria-live="polite">
                متن نظر ثبت نشد — سامانه ثبت نظرات در این نسخه فعال نیست.
              </p>
            ) : null}

            <DialogFooter className="flex-row justify-start gap-2">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="gap-2"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    در حال ارسال…
                  </>
                ) : (
                  "ارسال نظر"
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                بستن
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
