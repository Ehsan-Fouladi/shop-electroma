import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteLogo } from "@/components/navigation/site-logo";

export const metadata: Metadata = {
  title: {
    default: "ورود و ثبت‌نام",
    template: "%s | الکتروما",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-dvh bg-surface-soft px-4 py-8 sm:px-6">
      <header className="mx-auto flex w-full max-w-md items-center justify-between">
        <SiteLogo />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-label font-medium text-subtle-ink transition-colors hover:text-brand-active"
        >
          <ArrowRight className="size-4" aria-hidden />
          بازگشت به فروشگاه
        </Link>
      </header>

      <main className="mx-auto my-auto w-full max-w-md py-6">{children}</main>

      <footer className="text-center text-caption text-subtle-ink">
        <p>
          تمام حقوق محفوظ است © ۱۴۰۵ الکتروما — محیط نمایشی فروشگاه (بدون سرور احراز هویت)
        </p>
      </footer>
    </div>
  );
}
