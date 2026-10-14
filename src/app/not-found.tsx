import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Home,
  Search,
  ShoppingBag,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center py-12">
      <Container
        size="narrow"
        className="flex flex-col items-center text-center"
      >
        <span className="font-mono text-7xl font-extrabold text-primary/20 sm:text-9xl">
          ۴۰۴
        </span>

        <span className="mt-[-1.5rem] grid size-16 place-items-center rounded-2xl bg-brand-soft text-brand-active shadow-soft sm:mt-[-2rem]">
          <AlertCircle className="size-8" aria-hidden />
        </span>

        <h1 className="mt-6 text-title font-bold text-ink sm:text-heading-lg">
          صفحه مورد نظر پیدا نشد!
        </h1>
        <p className="mt-2 max-w-md text-body-sm text-subtle-ink leading-relaxed sm:text-body">
          آدرس واردشده ممکن است تغییر کرده یا حذف شده باشد. می‌توانید عبارت مورد
          نظر خود را جستجو کنید یا به فروشگاه بازگردید.
        </p>

        {/* Quick Categories */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {[
            { label: "گوشی موبایل", href: "/category/mobile-phones" },
            { label: "لپ‌تاپ", href: "/category/laptops" },
            { label: "هدفون و صوت", href: "/category/headphones" },
            { label: "ساعت هوشمند", href: "/category/smart-watches" },
            { label: "تخفیف‌های شگفت‌انگیز", href: "/deals" },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="rounded-full border border-line bg-surface px-3 py-1.5 text-caption font-medium text-body transition-colors hover:border-primary/40 hover:bg-brand-soft hover:text-brand-active"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="size-4" aria-hidden />
              بازگشت به صفحه اصلی
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/products">
              <ShoppingBag className="size-4" aria-hidden />
              مشاهده همه محصولات
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
