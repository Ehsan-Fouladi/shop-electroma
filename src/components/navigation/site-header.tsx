"use client";

import Link from "next/link";
import { ArrowLeftRight, Heart, Phone, Percent, UserRound } from "lucide-react";

import { CartLink } from "@/components/navigation/cart-link";
import { MegaMenu } from "@/components/navigation/mega-menu";
import { MobileNavSheet } from "@/components/navigation/mobile-nav-sheet";
import { SearchField } from "@/components/navigation/search-field";
import { SiteLogo } from "@/components/navigation/site-logo";
import { Container } from "@/components/layout/container";
import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/lib/constants/site";
import { formatPrice, toPersianDigits } from "@/lib/formatters/number";
import { useCustomerStore } from "@/store/customer-store";
import { useCompareStore, useWishlistStore } from "@/store/shop-store";
import { useCallback, useEffect, useRef, useState } from "react";

/** Sticky storefront header: announcement bar, search row and category nav. */
export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  }, []);

  const demoContact = useCustomerStore((state) => state.demoContact);
  const wishlistCount = useWishlistStore((state) => state.ids.length);
  const compareCount = useCompareStore((state) => state.ids.length);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="hidden bg-ink text-white sm:block">
        <Container className="flex h-9 items-center justify-between gap-4 text-label">
          <p className="truncate text-white/85">
            ارسال رایگان برای سفارش‌های بالای{" "}
            <span className="font-medium text-white">
              {formatPrice(siteConfig.freeShippingThreshold)} تومان
            </span>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/support/tracking" className="text-white/80 hover:text-white">
              پیگیری سفارش
            </Link>
            <Link href="/support/faq" className="text-white/80 hover:text-white">
              سوالات متداول
            </Link>
            <a
              href={siteConfig.supportPhoneHref}
              className="flex items-center gap-1.5 text-white/80 hover:text-white"
            >
              <Phone className="size-3.5" aria-hidden />
              {siteConfig.supportPhone}
            </a>
          </div>
        </Container>
      </div>

      <div className="border-b border-line bg-surface/95 backdrop-blur-md">
        <Container>
          <div className="flex h-16 items-center gap-2 sm:gap-4">
            <MobileNavSheet />
            <SiteLogo />

            <div className="mx-auto hidden w-full max-w-2xl md:block">
              <SearchField />
            </div>

            <div className="ms-auto flex items-center gap-0.5 sm:gap-1">
              <Link
                href="/compare"
                className="relative hidden items-center gap-1.5 rounded-md px-2.5 py-2 text-body-sm font-medium text-ink transition-colors hover:bg-surface-soft hover:text-brand-active lg:inline-flex"
                aria-label={compareCount > 0 ? `مقایسه، ${toPersianDigits(compareCount)} کالا` : "مقایسه محصولات"}
              >
                <ArrowLeftRight className="size-5" aria-hidden />
                {compareCount > 0 ? (
                  <span className="absolute -top-1 -end-1 grid min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold leading-4 text-white tabular">
                    {toPersianDigits(compareCount)}
                  </span>
                ) : null}
                <span className="hidden 2xl:inline">مقایسه</span>
              </Link>
              <Link
                href="/wishlist"
                className="relative hidden items-center gap-1.5 rounded-md px-2.5 py-2 text-body-sm font-medium text-ink transition-colors hover:bg-surface-soft hover:text-brand-active sm:inline-flex"
                aria-label={wishlistCount > 0 ? `علاقه‌مندی‌ها، ${toPersianDigits(wishlistCount)} کالا` : "علاقه‌مندی‌ها"}
              >
                <Heart className="size-5" aria-hidden />
                {wishlistCount > 0 ? (
                  <span className="absolute -top-1 -end-1 grid min-w-4 place-items-center rounded-full bg-sale px-1 text-[10px] font-bold leading-4 text-white tabular">
                    {toPersianDigits(wishlistCount)}
                  </span>
                ) : null}
                <span className="hidden xl:inline">علاقه‌مندی‌ها</span>
              </Link>
              <Link
                href={demoContact ? "/account" : "/login"}
                aria-label={demoContact ? "حساب کاربری" : "ورود / ثبت‌نام"}
                className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-md px-2.5 py-2 text-body-sm font-medium text-ink transition-colors hover:bg-surface-soft hover:text-brand-active sm:h-auto sm:min-w-0"
              >
                <UserRound className="size-5" aria-hidden />
                <span className="hidden xl:inline">
                  {demoContact ? "حساب کاربری" : "ورود / ثبت‌نام"}
                </span>
              </Link>
              <CartLink compact className="xl:hidden" />
              <CartLink className="hidden xl:inline-flex" />
            </div>
          </div>

          <div className="pb-3 md:hidden">
            <SearchField />
          </div>
        </Container>
      </div>

      <nav
        aria-label="دسته‌بندی‌های اصلی"
        className="hidden border-b border-line bg-surface lg:block"
      >
        <Container className="flex items-center gap-0.5">
          <Link
            href="/deals"
            className="me-1 inline-flex items-center gap-1.5 rounded-sm px-3 py-2.5 text-body-sm font-medium text-sale transition-colors hover:bg-sale-soft"
          >
            <Percent className="size-4" aria-hidden />
            پیشنهاد ویژه
          </Link>

          {mainNav.map((item) => (
            <MegaMenu
              key={item.title}
              item={item}
              open={openMenu === item.title}
              onOpen={() => {
                window.clearTimeout(closeTimer.current);
                setOpenMenu(item.title);
              }}
              onScheduleClose={scheduleClose}
              onClose={() => setOpenMenu(null)}
            />
          ))}
        </Container>
      </nav>
    </header>
  );
}