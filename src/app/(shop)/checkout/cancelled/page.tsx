import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "انصراف از پرداخت",
  description: "وضعیت لغو فرآیند پرداخت سفارش در فروشگاه الکتروما.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutCancelledPage() {
  return (
    <Container className="flex flex-col gap-6 py-8 sm:py-12">
      <Breadcrumb
        items={[
          { label: "خانه", href: "/" },
          { label: "سبد خرید", href: "/cart" },
          { label: "انصراف از پرداخت" },
        ]}
      />

      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 rounded-xl border border-line bg-surface p-6 text-center shadow-soft sm:p-10">
        <span className="grid size-16 place-items-center rounded-full bg-warning-soft text-warning">
          <AlertTriangle className="size-9" aria-hidden />
        </span>

        <div>
          <h1 className="text-heading font-bold text-ink">پرداخت تکمیل نشد</h1>
          <p className="mt-2 text-body-sm text-subtle-ink">
            فرآیند پرداخت از سمت کاربر یا درگاه بانکی لغو شد. هیچ مبلغی از حساب
            شما کسر نشده است و کالاهای انتخابی شما همچنان در سبد خرید محفوظ
            هستند.
          </p>
        </div>

        <div className="my-2 rounded-lg bg-surface-soft p-4 text-start text-caption text-body">
          <p className="font-bold text-ink">چه کار می‌توانید بکنید؟</p>
          <ul className="mt-1.5 flex flex-col gap-1 text-subtle-ink">
            <li>• می‌توانید مجدداً درگاه دیگری را برای تسویه انتخاب کنید.</li>
            <li>
              • می‌توانید سبد خرید خود را ویرایش یا اقلام آن را کم و زیاد کنید.
            </li>
            <li>
              • در صورت بروز هرگونه ابهام، با پشتیبانی الکتروما تماس بگیرید.
            </li>
          </ul>
        </div>

        <div className="flex w-full flex-col gap-2.5 sm:flex-row">
          <Button asChild size="lg" className="flex-1">
            <Link href="/checkout">
              <RotateCcw aria-hidden />
              تلاش مجدد برای تسویه
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="flex-1">
            <Link href="/cart">
              <ShoppingCart aria-hidden />
              مشاهده سبد خرید
            </Link>
          </Button>
        </div>

        <div className="pt-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-label font-medium text-brand hover:underline"
          >
            <ShoppingBag className="size-4" aria-hidden />
            گشت‌وگذار و ادامه خرید در فروشگاه
          </Link>
        </div>
      </div>
    </Container>
  );
}
