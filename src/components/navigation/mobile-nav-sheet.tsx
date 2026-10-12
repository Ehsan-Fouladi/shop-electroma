"use client";

import Link from "next/link";
import { ChevronDown, Headphones, LayoutGrid, LogIn, Menu, Percent } from "lucide-react";

import { SiteLogo } from "@/components/navigation/site-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/lib/constants/site";
import { useState } from "react";

/** Mobile navigation: category list with expandable groups. */
export function MobileNavSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="باز کردن منوی دسته‌بندی‌ها"
        >
          <Menu className="size-5" aria-hidden />
        </Button>
      </SheetTrigger>

      <SheetContent side="start" className="p-0">
        <SheetHeader className="ps-5 pe-14">
          <SiteLogo className="pointer-events-none" />
          <SheetTitle className="sr-only">منوی دسته‌بندی‌ها</SheetTitle>
          <SheetDescription className="sr-only">
            فهرست دسته‌بندی‌ها و لینک‌های اصلی فروشگاه
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-3 pb-6">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.title} className="border-b border-line-subtle last:border-0">
                {item.columns?.length ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-sm px-3 py-3.5 text-body font-medium text-foreground marker:hidden">
                      {item.title}
                      <ChevronDown
                        className="size-4 text-subtle-ink transition-transform group-open:rotate-180"
                        aria-hidden
                      />
                    </summary>
                    <div className="flex flex-col gap-3 pb-3 ps-3">
                      {item.columns.map((column) => (
                        <div key={column.title}>
                          <p className="pb-1 text-label font-bold text-subtle-ink">
                            {column.title}
                          </p>
                          <ul className="flex flex-col">
                            {column.links.map((link) => (
                              <li key={`${column.title}-${link.title}`}>
                                <Link
                                  href={link.href}
                                  onClick={() => setOpen(false)}
                                  className="block rounded-sm px-3 py-2 text-body-sm text-body transition-colors hover:bg-surface-soft hover:text-brand-active"
                                >
                                  {link.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-sm px-3 py-3.5 text-body font-medium text-foreground transition-colors hover:bg-surface-soft hover:text-brand-active"
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2 px-3">
            <Link
              href="/categories"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md bg-brand-soft px-3 py-3 text-body-sm font-medium text-brand-active"
            >
              <LayoutGrid className="size-4" aria-hidden />
              مشاهده همه دسته‌بندی‌ها
            </Link>
            <Link
              href="/deals"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md bg-sale-soft px-3 py-3 text-body-sm font-medium text-sale"
            >
              <Percent className="size-4" aria-hidden />
              پیشنهادهای ویژه و تخفیف‌ها
            </Link>
            <Link
              href="/support/contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md bg-surface-muted px-3 py-3 text-body-sm text-body"
            >
              <Headphones className="size-4" aria-hidden />
              پشتیبانی {siteConfig.supportPhone}
            </Link>
            <Button asChild variant="outline" className="mt-1 justify-start">
              <Link href="/login" onClick={() => setOpen(false)}>
                <LogIn aria-hidden />
                ورود / ثبت‌نام
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}