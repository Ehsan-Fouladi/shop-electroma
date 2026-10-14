"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  CreditCard,
  Eye,
  EyeOff,
  Info,
  Loader2,
  Pencil,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { AccountPageHeading } from "@/components/account/account-page-heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  profileSchema,
  type ProfileFormValues,
} from "@/lib/validations/customer";
import { useCustomerStore } from "@/store/customer-store";
import { useEffect, useState } from "react";

function maskSheba(sheba: string): string {
  if (!sheba || sheba.length < 8) return sheba;
  const clean = sheba.replace(/\s/g, "");
  return `IR - ${clean.slice(0, 4)} •••• •••• •••• •••• ••${clean.slice(-2)}`;
}

function maskNationalCode(code: string): string {
  if (!code || code.length < 6) return code;
  return `••••••${code.slice(-4)}`;
}

export default function AccountProfilePage() {
  const profile = useCustomerStore((state) => state.profile);
  const updateProfile = useCustomerStore((state) => state.updateProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [showMaskedSheba, setShowMaskedSheba] = useState(true);
  const [showMaskedNationalCode, setShowMaskedNationalCode] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      phone: profile.phone,
      email: profile.email || "",
      birthDate: profile.birthDate || "",
      nationalCode: profile.nationalCode || "",
      shebaNumber: profile.shebaNumber || "",
    },
    mode: "onBlur",
  });

  // Sync state if store profile updates from outside
  useEffect(() => {
    form.reset({
      name: profile.name,
      phone: profile.phone,
      email: profile.email || "",
      birthDate: profile.birthDate || "",
      nationalCode: profile.nationalCode || "",
      shebaNumber: profile.shebaNumber || "",
    });
  }, [profile, form]);

  const handleCancel = () => {
    form.reset({
      name: profile.name,
      phone: profile.phone,
      email: profile.email || "",
      birthDate: profile.birthDate || "",
      nationalCode: profile.nationalCode || "",
      shebaNumber: profile.shebaNumber || "",
    });
    setIsEditing(false);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    updateProfile(data);
    setIsEditing(false);
    toast.success("مشخصات کاربری با موفقیت در این نشست ذخیره شد.");
  };

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeading
        title="اطلاعات و مشخصات فردی"
        description="مدیریت و مشاهده اطلاعات حساب کاربری، راه‌های ارتباطی و شماره شبا جهت استرداد وجه."
      />

      {/* User Overview Header Card */}
      <Card className="overflow-hidden shadow-soft">
        <div className="bg-gradient-to-r from-brand-soft/60 via-surface-soft to-surface p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid size-16 shrink-0 place-items-center rounded-full bg-primary/10 text-primary ring-2 ring-primary/20 sm:size-18">
                <User className="size-8 sm:size-9" aria-hidden />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-body font-bold text-ink sm:text-title">
                    {profile.name}
                  </h2>
                  <Badge variant="success" className="gap-1">
                    <ShieldCheck className="size-3" aria-hidden />
                    حساب تأییدشده
                  </Badge>
                </div>
                <p className="text-caption text-subtle-ink sm:text-body-sm text-right">
                  {profile.phone}
                </p>
                <p className="text-[11px] text-disabled-ink">
                  عضو رسمی باشگاه مشتریان الکتروما • ورود با شماره معتبر
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              {!isEditing ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="gap-2"
                >
                  <Pencil className="size-4" aria-hidden />
                  ویرایش اطلاعات
                </Button>
              ) : (
                <Badge variant="brand" className="gap-1.5 py-1.5 px-3">
                  <span className="size-2 rounded-full bg-primary animate-pulse" />
                  حالت ویرایش فعال است
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Prototype Disclosure Alert */}
      <Alert variant="brand" className="shadow-soft">
        <Info className="size-4" />
        <AlertTitle className="text-body-sm font-bold">
          یادداشت شفافیت نسخه نمایشی
        </AlertTitle>
        <AlertDescription className="text-caption text-subtle-ink">
          وب‌سایت الکتروما یک نمونه پروتوتایپ رابط کاربری است. تغییرات ایجادشده
          در مشخصات حساب، صرفاً در حافظه محلی نشست مرورگر شما ثبت شده و هیچ‌گونه
          اطلاعات هویتی یا بانکی به سرور خارجی ارسال نمی‌گردد.
        </AlertDescription>
      </Alert>

      {isEditing ? (
        /* Edit Mode Form */
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6"
          >
            {/* Section 1: Personal Identity */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-body font-bold sm:text-title-sm flex items-center gap-2">
                  <User className="size-4.5 text-brand" aria-hidden />
                  ۱. مشخصات هویتی و فردی
                </CardTitle>
                <CardDescription>
                  اطلاعات رسمی منطبق با مدارک شناسایی جهت صدور فاکتور رسمی
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          نام و نام خانوادگی{" "}
                          <span
                            className="text-sale font-bold"
                            aria-hidden="true"
                          >
                            *
                          </span>
                          <span className="sr-only">(الزامی)</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: علی رضایی" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* National Code (Optional) */}
                  <FormField
                    control={form.control}
                    name="nationalCode"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>کد ملی</FormLabel>
                          <span className="text-caption text-disabled-ink">
                            (اختیاری)
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            dir="ltr"
                            maxLength={10}
                            placeholder="0912345678"
                            className="font-mono"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          ۱۰ رقم بدون خط تیره جهت صدور فاکتور رسمی
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Birth Date (Optional) */}
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <FormLabel>تاریخ تولد</FormLabel>
                          <span className="text-caption text-disabled-ink">
                            (اختیاری)
                          </span>
                        </div>
                        <FormControl>
                          <Input placeholder="۱۳۷۵/۰۷/۱۲" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Contact Information */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-body font-bold sm:text-title-sm flex items-center gap-2">
                  <Phone className="size-4.5 text-brand" aria-hidden />
                  ۲. اطلاعات تماس و ارتباطی
                </CardTitle>
                <CardDescription>
                  راه‌های ارتباطی جهت ارسال پیامک وضعیت سفارش و فاکتور الکترونیک
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          شماره موبایل{" "}
                          <span
                            className="text-sale font-bold"
                            aria-hidden="true"
                          >
                            *
                          </span>
                          <span className="sr-only">(الزامی)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            dir="ltr"
                            placeholder="09121234567"
                            className="font-mono"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          شماره فعال جهت دریافت پیامک‌های رهگیری
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email (Optional) */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>آدرس ایمیل</FormLabel>
                          <span className="text-caption text-disabled-ink">
                            (اختیاری)
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            type="email"
                            dir="ltr"
                            placeholder="name@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          جهت دریافت نسخه الکترونیکی فاکتور
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Financial & Refund Details (Optional) */}
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-body font-bold sm:text-title-sm flex items-center gap-2">
                    <CreditCard className="size-4.5 text-brand" aria-hidden />
                    ۳. اطلاعات مالی و استرداد وجه
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="text-caption text-subtle-ink"
                  >
                    اختیاری
                  </Badge>
                </div>
                <CardDescription>
                  شماره شبا بانکی صرفاً جهت واریز مبالغ مرجوعی، انصراف یا تسویه
                  کیف پول کاربرد دارد.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="shebaNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        شماره شبا بانکی (۲۴ رقم بدون پیشوند IR)
                      </FormLabel>
                      <div className="relative flex items-center">
                        <span
                          className="pointer-events-none absolute start-3 text-caption font-bold text-subtle-ink"
                          dir="ltr"
                        >
                          IR -
                        </span>
                        <FormControl>
                          <Input
                            dir="ltr"
                            maxLength={24}
                            placeholder="۵۴۰۱۲۰۰۰۰۰۰۰۰۰۱۲۳۴۵۶۷۸"
                            className="ps-12 font-mono"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormDescription>
                        شماره شبا باید به نام شخص صاحب حساب کاربری باشد تا
                        فرآیند پایا بدون تاخیر انجام پذیرد.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Form Action Controls */}
            <Card className="border-primary/20 bg-surface shadow-soft">
              <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                <span className="text-caption text-subtle-ink">
                  برای ذخیره تغییرات روی دکمه ذخیره کلیک کنید یا با انصراف به
                  اطلاعات قبلی بازگردید.
                </span>
                <div className="flex items-center gap-3 ms-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={form.formState.isSubmitting}
                    className="gap-1.5"
                  >
                    <X className="size-4" aria-hidden />
                    انصراف
                  </Button>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="gap-2"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden />
                        در حال ذخیره‌سازی…
                      </>
                    ) : (
                      <>
                        <Check className="size-4" aria-hidden />
                        ذخیره تغییرات
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      ) : (
        /* View Mode Presentation */
        <div className="flex flex-col gap-6">
          {/* Card 1: Identity Information */}
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-body font-bold sm:text-title-sm flex items-center gap-2">
                <User className="size-4.5 text-brand" aria-hidden />
                مشخصات فردی و هویتی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
                  <span className="text-caption text-subtle-ink">
                    نام و نام خانوادگی
                  </span>
                  <p className="mt-1 text-body font-bold text-ink">
                    {profile.name}
                  </p>
                </div>

                <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-caption text-subtle-ink">کد ملی</span>
                    {profile.nationalCode ? (
                      <button
                        type="button"
                        onClick={() =>
                          setShowMaskedNationalCode(!showMaskedNationalCode)
                        }
                        className="text-subtle-ink hover:text-ink focus-visible:outline-primary"
                        aria-label={
                          showMaskedNationalCode
                            ? "نمایش کد ملی"
                            : "مخفی‌سازی کد ملی"
                        }
                      >
                        {showMaskedNationalCode ? (
                          <Eye className="size-3.5" />
                        ) : (
                          <EyeOff className="size-3.5" />
                        )}
                      </button>
                    ) : null}
                  </div>
                  <p
                    className="mt-1 font-mono text-body font-bold text-ink"
                    dir="ltr"
                  >
                    {profile.nationalCode
                      ? showMaskedNationalCode
                        ? maskNationalCode(profile.nationalCode)
                        : profile.nationalCode
                      : "ثبت نشده (اختیاری)"}
                  </p>
                </div>

                <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
                  <span className="text-caption text-subtle-ink">
                    تاریخ تولد
                  </span>
                  <p className="mt-1 text-body font-bold text-ink">
                    {profile.birthDate || "ثبت نشده (اختیاری)"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Contact Information */}
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-body font-bold sm:text-title-sm flex items-center gap-2">
                <Phone className="size-4.5 text-brand" aria-hidden />
                اطلاعات تماس و ارتباطی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-caption text-subtle-ink">
                      شماره تلفن همراه
                    </span>
                    <Badge
                      variant="success"
                      className="text-[10px] px-1.5 py-0.2"
                    >
                      تایید پیامکی
                    </Badge>
                  </div>
                  <p
                    className="mt-1 font-mono text-body font-bold text-ink"
                    dir="ltr"
                  >
                    {profile.phone}
                  </p>
                </div>

                <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
                  <span className="text-caption text-subtle-ink">
                    آدرس ایمیل
                  </span>
                  <p className="mt-1 text-body font-bold text-ink" dir="ltr">
                    {profile.email || "ثبت نشده (اختیاری)"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Financial & Refund Information */}
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-body font-bold sm:text-title-sm flex items-center gap-2">
                  <CreditCard className="size-4.5 text-brand" aria-hidden />
                  اطلاعات حساب و استرداد وجه
                </CardTitle>
                <Badge
                  variant="outline"
                  className="text-caption text-subtle-ink"
                >
                  جهت مرجوعی
                </Badge>
              </div>
              <CardDescription>
                شماره شبا حساب بانکی جهت واریز مطالبات مالی و لغو احتمالی سفارش
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
                <div className="flex items-center justify-between">
                  <span className="text-caption text-subtle-ink">
                    شماره شبا بانکی (IBAN)
                  </span>
                  {profile.shebaNumber ? (
                    <button
                      type="button"
                      onClick={() => setShowMaskedSheba(!showMaskedSheba)}
                      className="flex items-center gap-1 text-caption text-brand hover:underline focus-visible:outline-primary"
                    >
                      {showMaskedSheba ? (
                        <>
                          <Eye className="size-3.5" />
                          <span>نمایش کامل</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="size-3.5" />
                          <span>ماسک کردن</span>
                        </>
                      )}
                    </button>
                  ) : null}
                </div>
                <p
                  className="mt-2 font-mono text-body font-bold text-ink"
                  dir="ltr"
                >
                  {profile.shebaNumber
                    ? showMaskedSheba
                      ? maskSheba(profile.shebaNumber)
                      : `IR - ${profile.shebaNumber}`
                    : "شماره شبا ثبت نشده است (اختیاری)"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
