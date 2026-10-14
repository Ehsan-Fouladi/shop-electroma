"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { addressSchema, type AddressFormValues } from "@/lib/validations/customer";
import type { CustomerAddress } from "@/types/customer";

const fieldLabels: Record<keyof AddressFormValues, string> = {
  title: "عنوان نشانی",
  recipient: "نام گیرنده",
  phone: "شماره موبایل",
  province: "استان",
  city: "شهر",
  address: "نشانی کامل",
  postalCode: "کد پستی",
  unit: "واحد (اختیاری)",
  building: "پلاک (اختیاری)",
};

export function AddressForm({
  address,
  onSubmit,
  onCancel,
  submitLabel = "ذخیره نشانی",
}: {
  address?: CustomerAddress;
  onSubmit: (values: AddressFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
}) {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      title: address?.title ?? "خانه",
      recipient: address?.recipient ?? "",
      phone: address?.phone ?? "",
      province: address?.province ?? "",
      city: address?.city ?? "",
      address: address?.address ?? "",
      postalCode: address?.postalCode ?? "",
      unit: address?.unit ?? "",
      building: address?.building ?? "",
    },
    mode: "onBlur",
  });

  const onFormSubmit = async (values: AddressFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabels.title}</FormLabel>
                <FormControl>
                  <Input placeholder="مثلاً: خانه، محل کار" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Recipient */}
          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabels.recipient}</FormLabel>
                <FormControl>
                  <Input placeholder="نام و نام خانوادگی تحویل‌گیرنده" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabels.phone}</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    dir="ltr"
                    inputMode="numeric"
                    placeholder="09121234567"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Province */}
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabels.province}</FormLabel>
                <FormControl>
                  <Input placeholder="مثلاً: تهران" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabels.city}</FormLabel>
                <FormControl>
                  <Input placeholder="مثلاً: تهران" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Postal Code */}
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabels.postalCode}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    dir="ltr"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="۱۰ رقم کد پستی"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Building */}
          <FormField
            control={form.control}
            name="building"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabels.building}</FormLabel>
                <FormControl>
                  <Input placeholder="پلاک ساختمان" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Unit */}
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldLabels.unit}</FormLabel>
                <FormControl>
                  <Input placeholder="شماره واحد" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>{fieldLabels.address}</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="خیابان اصلی، خیابان فرعی، کوچه، پلاک، واحد…"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-wrap justify-between gap-2">
          {onCancel ? (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={form.formState.isSubmitting}
            >
              انصراف
            </Button>
          ) : null}
          <Button type="submit" disabled={form.formState.isSubmitting} className="gap-2">
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                در حال ذخیره…
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
        <p className="text-caption text-subtle-ink">
          این نشانی فقط در همین نشست نمایشی ذخیره می‌شود.
        </p>
      </form>
    </Form>
  );
}