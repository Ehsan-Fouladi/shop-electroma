"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Info,
  Loader2,
  Package,
  Search,
  Send,
  ThumbsDown,
  ThumbsUp,
  Truck,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { formatPersianDate } from "@/lib/formatters/date";
import { formatPrice } from "@/lib/formatters/number";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/customer";
import { useCustomerStore } from "@/store/customer-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormEvent, useState } from "react";

/** Interactive contact form for /support/contact */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "پیگیری سفارش",
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitted(true);
    toast.success("پیام آزمایشی شما با موفقیت ثبت شد (نسخه نمایشی).");
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-surface p-6 text-center shadow-soft sm:p-8">
        <span className="grid size-14 place-items-center rounded-full bg-success-soft text-success">
          <CheckCircle2 className="size-8" aria-hidden />
        </span>
        <div>
          <h3 className="text-title font-bold text-ink">
            پیام شما با موفقیت ثبت گردید
          </h3>
          <p className="mt-1 text-caption text-subtle-ink">
            شناسه پیگیری تیکت:{" "}
            <span dir="ltr" className="font-bold text-ink">
              TKT-1405-84920
            </span>
          </p>
        </div>

        <div className="flex max-w-md items-start gap-2 rounded-lg bg-surface-soft p-3 text-start text-caption text-subtle-ink">
          <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
          <p>
            <strong>نکته آزمایشی:</strong> این فروشگاه یک نسخه پروتوتایپ و
            نمایشی (UI Demo) است. پیام شما در حافظه موقت مرورگر ثبت شده و به
            سرور ارسال نمی‌گردد.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-2"
          onClick={() => {
            setSubmitted(false);
            form.reset();
          }}
        >
          ارسال پیام دیگر
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        {/* Name and Phone */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  نام و نام خانوادگی{" "}
                  <span className="text-sale" aria-hidden="true">
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

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  شماره موبایل{" "}
                  <span className="text-sale" aria-hidden="true">
                    *
                  </span>
                  <span className="sr-only">(الزامی)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    dir="ltr"
                    type="tel"
                    placeholder="۰۹۱۲۰۰۰۰۰۰۰"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email and Subject */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  آدرس ایمیل{" "}
                  <span className="text-caption text-disabled-ink">
                    (اختیاری)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    dir="ltr"
                    placeholder="example@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>موضوع پیام</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      aria-label="موضوع پیام"
                      className="h-11 w-full rounded-md border border-line bg-surface px-3 text-body-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary/35"
                    >
                      <SelectValue placeholder="انتخاب موضوع پیام..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="پیگیری سفارش">
                        پیگیری وضعیت سفارش
                      </SelectItem>
                      <SelectItem value="مشاوره خرید">
                        مشاوره تخصصی پیش از خرید
                      </SelectItem>
                      <SelectItem value="گارانتی و خدمات">
                        امور گارانتی و خدمات پس از فروش
                      </SelectItem>
                      <SelectItem value="مرجوعی کالا">
                        درخواست بازگرداندن کالا
                      </SelectItem>
                      <SelectItem value="انتقاد یا پیشنهاد">
                        انتقادات، پیشنهادات و شکایات
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Message textarea */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                متن پیام شما{" "}
                <span className="text-sale" aria-hidden="true">
                  *
                </span>
                <span className="sr-only">(الزامی، حداقل ۱۰ کاراکتر)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="شرح درخواست یا پیام خود را بنویسید (در صورت وجود سفارش، ذکر شماره سفارش الزامی است)…"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="gap-2"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                در حال ثبت پیام…
              </>
            ) : (
              <>
                <Send className="size-4" aria-hidden />
                ثبت و ارسال پیام
              </>
            )}
          </Button>

          <span className="text-caption text-subtle-ink">
            پاسخگویی به پیام‌ها ظرف حداکثر ۲۴ ساعت کاری انجام خواهد شد.
          </span>
        </div>
      </form>
    </Form>
  );
}

/** Interactive FAQ filter with categories & search */
interface FaqItem {
  q: string;
  a: string;
  category: string;
}

export function InteractiveFaqList({ faqs }: { faqs: FaqItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [feedback, setFeedback] = useState<Record<number, "up" | "down">>(
    {},
  );

  const categories = ["all", ...new Set(faqs.map((f) => f.category))];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCategory =
      selectedCategory === "all" || f.category === selectedCategory;
    const matchesSearch =
      !searchTerm.trim() ||
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVote = (idx: number, type: "up" | "down") => {
    setFeedback((prev) => ({ ...prev, [idx]: type }));
    toast.success("از بازخورد شما متشکریم!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Category Pills */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="جستجو در میان پرسش‌ها و پاسخ‌ها…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 ps-11 text-body-sm"
          />
          <Search
            className="pointer-events-none absolute start-3.5 top-3.5 size-5 text-subtle-ink"
            aria-hidden
          />
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-label font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-soft"
                  : "border border-line bg-surface text-body hover:bg-surface-soft"
              }`}
            >
              {cat === "all" ? "همه موضوعات" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs List */}
      {filteredFaqs.length === 0 ? (
        <div className="rounded-xl border border-line bg-surface p-8 text-center text-body-sm text-subtle-ink">
          پرسشی متناسب با جستجوی شما یافت نشد.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-line bg-surface p-5 shadow-soft transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded bg-brand-soft px-2 py-0.5 text-caption font-bold text-brand-active">
                    {faq.category}
                  </span>
                  <h3 className="mt-2 text-body font-bold text-ink sm:text-title-sm">
                    {faq.q}
                  </h3>
                </div>
              </div>

              <p className="mt-3 text-body-sm text-body leading-relaxed sm:text-body">
                {faq.a}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-line-subtle pt-3 text-caption text-subtle-ink">
                <span>آیا این پاسخ برای شما مفید بود؟</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleVote(idx, "up")}
                    aria-label="پاسخ مفید بود"
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors ${
                      feedback[idx] === "up"
                        ? "bg-success-soft font-bold text-success"
                        : "hover:bg-surface-soft text-body"
                    }`}
                  >
                    <ThumbsUp className="size-3.5" aria-hidden />
                    <span>بله</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVote(idx, "down")}
                    aria-label="پاسخ مفید نبود"
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors ${
                      feedback[idx] === "down"
                        ? "bg-sale-soft font-bold text-sale"
                        : "hover:bg-surface-soft text-body"
                    }`}
                  >
                    <ThumbsDown className="size-3.5" aria-hidden />
                    <span>خیر</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Interactive Order Tracking Lookup for /support/tracking */
export function OrderTrackingLookup() {
  const [orderQuery, setOrderQuery] = useState("");
  const [queryError, setQueryError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const orders = useCustomerStore((state) => state.orders);

  const matchedOrder = searched
    ? orders.find(
        (o) =>
          o.id.toLowerCase() === orderQuery.trim().toLowerCase() ||
          (o.trackingCode && o.trackingCode === orderQuery.trim()),
      )
    : null;

  const handleLookup = (e: FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) {
      setQueryError("لطفاً شماره سفارش یا کد رهگیری را وارد نمایید.");
      return;
    }
    setQueryError(null);
    setSearched(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleLookup} noValidate className="flex flex-col gap-2">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Input
              placeholder="شماره سفارش (مثال: order-1405-01042) یا کد مرسوله…"
              value={orderQuery}
              onChange={(e) => {
                setOrderQuery(e.target.value);
                setSearched(false);
                if (queryError) setQueryError(null);
              }}
              aria-invalid={Boolean(queryError)}
              aria-describedby={queryError ? "tracking-query-error" : undefined}
              className="h-12 ps-11 text-body-sm"
            />
            <Package
              className="pointer-events-none absolute start-3.5 top-3.5 size-5 text-subtle-ink"
              aria-hidden
            />
          </div>
          <Button type="submit" size="lg" className="h-12 gap-2">
            <Search className="size-4" aria-hidden />
            استعلام وضعیت
          </Button>
        </div>
        {queryError && (
          <p
            id="tracking-query-error"
            role="alert"
            className="flex items-center gap-1 text-caption text-sale"
          >
            <AlertCircle className="size-3.5 shrink-0" aria-hidden />
            <span>{queryError}</span>
          </p>
        )}
      </form>

      {/* Suggested demo chips */}
      <div className="flex flex-wrap items-center gap-2 text-caption text-subtle-ink">
        <span>نمونه‌های آزمایشی جهت بررسی:</span>
        <button
          type="button"
          onClick={() => {
            setOrderQuery("order-1405-01042");
            setSearched(true);
          }}
          className="rounded-full border border-line bg-surface px-2.5 py-1 text-brand hover:border-primary/40 hover:bg-brand-soft"
        >
          order-1405-01042 (ارسال‌شده)
        </button>
        <button
          type="button"
          onClick={() => {
            setOrderQuery("order-1405-01039");
            setSearched(true);
          }}
          className="rounded-full border border-line bg-surface px-2.5 py-1 text-brand hover:border-primary/40 hover:bg-brand-soft"
        >
          order-1405-01039 (تحویل‌شده)
        </button>
      </div>

      {searched &&
        (matchedOrder ? (
          <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div>
                <span className="text-caption text-subtle-ink">
                  سفارش یافت شد:
                </span>
                <h3 className="font-bold text-ink sm:text-title" dir="ltr">
                  {matchedOrder.id}
                </h3>
              </div>
              <span className="rounded-full bg-brand-soft px-3 py-1 text-caption font-bold text-brand-active">
                {matchedOrder.status === "shipped"
                  ? "تحویل به پست / در حال حمل"
                  : matchedOrder.status === "delivered"
                    ? "تحویل به مشتری"
                    : matchedOrder.status === "processing"
                      ? "در حال پردازش در انبار"
                      : "لغو شده"}
              </span>
            </div>

            <div className="grid gap-3 text-body-sm sm:grid-cols-3">
              <div className="rounded-lg bg-surface-soft p-3">
                <span className="text-caption text-subtle-ink">تاریخ ثبت:</span>
                <p className="font-bold text-ink">
                  {formatPersianDate(matchedOrder.placedAt)}
                </p>
              </div>
              <div className="rounded-lg bg-surface-soft p-3">
                <span className="text-caption text-subtle-ink">
                  شیوه ارسال:
                </span>
                <p className="font-bold text-ink">
                  {matchedOrder.shippingMethod === "express"
                    ? "ارسال اکسپرس تهران"
                    : matchedOrder.shippingMethod === "heavy"
                      ? "باربری کالای سنگین"
                      : "پست پیشتاز سراسری"}
                </p>
              </div>
              <div className="rounded-lg bg-surface-soft p-3">
                <span className="text-caption text-subtle-ink">
                  مبلغ کل سفارش:
                </span>
                <p className="font-bold text-brand-active">
                  {formatPrice(matchedOrder.total)} تومان
                </p>
              </div>
            </div>

            {matchedOrder.trackingCode && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary/20 bg-brand-soft/40 p-4">
                <div className="flex items-center gap-2">
                  <Truck className="size-5 text-primary" aria-hidden />
                  <span className="text-body-sm font-medium text-ink">
                    شماره بارنامه پستی:
                  </span>
                  <span dir="ltr" className="font-bold text-ink">
                    {matchedOrder.trackingCode}
                  </span>
                </div>
                <Button asChild size="sm">
                  <Link href={`/account/orders/${matchedOrder.id}/tracking`}>
                    مشاهده جزئیات کامل مرسوله
                  </Link>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-line bg-surface p-8 text-center shadow-soft">
            <HelpCircle className="size-10 text-disabled-ink" aria-hidden />
            <h4 className="font-bold text-ink text-body">
              سفارشی با این مشخصات یافت نشد
            </h4>
            <p className="max-w-md text-caption text-subtle-ink">
              لطفاً شماره سفارش واردشده را مجدداً بررسی فرمایید یا با پشتیبانی
              الکتروما تماس بگیرید.
            </p>
          </div>
        ))}
    </div>
  );
}
