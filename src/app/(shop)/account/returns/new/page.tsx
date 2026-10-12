"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Camera, Check, Loader2, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import {
  AccountBackLink,
  AccountPageHeading,
  AccountPanel,
} from "@/components/account/account-page-heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  returnRequestSchema,
  type ReturnRequestFormValues,
} from "@/lib/validations/customer";
import { useCustomerStore } from "@/store/customer-store";
import type { ReturnRequest } from "@/types/customer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Suspense, useEffect, useState } from "react";

const REASONS = [
  "ایراد فنی و عدم کارکرد درست کالا",
  "شکستگی یا آسیب فیزیکی در حین حمل",
  "مغایرت مشخصات با اطلاعات درج‌شده در سایت",
  "انصراف از خرید (پلمب کالا باز نشده است)",
  "عدم تطابق رنگ یا مدل ارسال‌شده",
];

function NewReturnRequestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get("orderId");
  const orders = useCustomerStore((state) => state.orders);
  const addReturnRequest = useCustomerStore((state) => state.addReturnRequest);

  // Delivered orders are eligible for return
  const eligibleOrders = orders.filter(
    (o) => o.status === "delivered" || o.status === "shipped",
  );

  const initialOrderId =
    queryOrderId && eligibleOrders.some((o) => o.id === queryOrderId)
      ? queryOrderId
      : eligibleOrders[0]?.id || "";

  const initialOrder =
    eligibleOrders.find((o) => o.id === initialOrderId) || eligibleOrders[0];

  const form = useForm<ReturnRequestFormValues>({
    resolver: zodResolver(returnRequestSchema),
    defaultValues: {
      orderId: initialOrderId,
      productId: initialOrder?.items[0]?.productId || "",
      reason: REASONS[0],
      description: "",
    },
    mode: "onBlur",
  });

  const [hasMockPhoto, setHasMockPhoto] = useState<boolean>(false);

  const watchOrderId = form.watch("orderId");
  const selectedOrder =
    eligibleOrders.find((o) => o.id === watchOrderId) || eligibleOrders[0];

  // Sync selected productId when orderId changes
  useEffect(() => {
    if (selectedOrder && selectedOrder.items.length > 0) {
      const currentPid = form.getValues("productId");
      const exists = selectedOrder.items.some(
        (i) => i.productId === currentPid,
      );
      if (!exists) {
        form.setValue("productId", selectedOrder.items[0].productId, {
          shouldValidate: true,
        });
      }
    }
  }, [watchOrderId, selectedOrder, form]);

  const onSubmit = async (values: ReturnRequestFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const newRequest: ReturnRequest = {
      id: `ret-${Math.floor(10000 + Math.random() * 90000)}`,
      orderId: values.orderId,
      productId: values.productId,
      reason: values.reason,
      description: values.description,
      requestedAt: new Date().toISOString(),
      status: "reviewing",
    };

    addReturnRequest(newRequest);
    toast.success("درخواست مرجوعی ثبت شد (نمایشی)", {
      description: "کارشناسان بخش پشتیبانی وضعیت کالا را بررسی خواهند کرد.",
    });
    router.push("/account/returns");
  };

  return (
    <div className="flex flex-col gap-6">
      <AccountBackLink
        href="/account/returns"
        label="بازگشت به فهرست مرجوعی‌ها"
      />

      <AccountPageHeading
        title="ثبت درخواست مرجوعی کالا"
        description="سفارش و کالای معیوب یا نامنطبق را انتخاب کرده و دلیل بازگشت را شرح دهید."
      />

      {eligibleOrders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-surface p-8 text-center shadow-soft">
          <AlertCircle className="size-8 text-subtle-ink" aria-hidden />
          <p className="text-body-sm font-medium text-ink">
            سفارش تحویل‌شده‌ای برای مرجوعی پیدا نشد.
          </p>
          <Button asChild variant="outline">
            <Link href="/account/orders">مشاهده همه سفارش‌ها</Link>
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <AccountPanel title="۱. انتخاب سفارش و کالا">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="orderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>شماره سفارش</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            aria-label="انتخاب شماره سفارش"
                            className="w-full [&>span]:truncate"
                          >
                            <SelectValue placeholder="انتخاب سفارش..." />
                          </SelectTrigger>
                          <SelectContent>
                            {eligibleOrders.map((o) => (
                              <SelectItem key={o.id} value={String(o.id)}>
                                {o.id} ({o.items.length} قلم کالا)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>کالای مورد نظر برای مرجوعی</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            aria-label="انتخاب شماره سفارش"
                            className="w-full [&>span]:truncate"
                          >
                            <SelectValue placeholder="انتخاب سفارش..." />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedOrder?.items.map((i) => (
                              <SelectItem
                                key={i.productId}
                                value={String(i.productId)}
                              >
                                {i.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccountPanel>

            <AccountPanel title="۲. علت و توضیحات مرجوعی">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>دلیل بازگشت</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            aria-label="انتخاب شماره سفارش"
                            className="w-full [&>span]:truncate"
                          >
                            <SelectValue placeholder="انتخاب سفارش..." />
                          </SelectTrigger>
                          <SelectContent>
                            {REASONS.map((r) => (
                              <SelectItem
                                key={r}
                                value={String(r)}
                              >
                                {r}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        شرح مشکل یا مغایرت{" "}
                        <span
                          className="text-sale font-bold"
                          aria-hidden="true"
                        >
                          *
                        </span>
                        <span className="sr-only">
                          (الزامی، حداقل ۱۰ نویسه)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="لطفاً مشکل به وجود آمده را به صورت مختصر و دقیق بنویسید (حداقل ۱۰ نویسه)…"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Mock photo attachment UI */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-label font-medium text-subtle-ink">
                    تصویر از کالا یا برچسب جعبه (اختیاری)
                  </span>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setHasMockPhoto(!hasMockPhoto);
                        toast.info(
                          hasMockPhoto
                            ? "تصویر پیوست حذف شد"
                            : "تصویر نمونه پیوست شد",
                        );
                      }}
                    >
                      <Camera aria-hidden />
                      {hasMockPhoto
                        ? "حذف تصویر ضمیمه"
                        : "انتخاب تصویر (شبیه‌سازی)"}
                    </Button>
                    {hasMockPhoto && (
                      <span className="flex items-center gap-1 text-caption text-success">
                        <Check className="size-4" />
                        تصویر ضمیمه شد (sample-photo.jpg)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </AccountPanel>

            <div className="flex justify-end gap-2">
              <Button asChild variant="outline">
                <Link href="/account/returns">انصراف</Link>
              </Button>
              <Button
                type="submit"
                className="gap-2"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    در حال ارسال…
                  </>
                ) : (
                  <>
                    <RotateCcw aria-hidden className="size-4" />
                    ارسال درخواست مرجوعی
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default function NewReturnRequestPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-line bg-surface p-8 text-center text-body-sm text-subtle-ink">
          در حال بارگذاری فرم مرجوعی…
        </div>
      }
    >
      <NewReturnRequestContent />
    </Suspense>
  );
}
