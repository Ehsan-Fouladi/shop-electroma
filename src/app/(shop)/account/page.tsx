"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Heart, Sparkles, Truck, Wallet } from "lucide-react";

import {
  AccountPageHeading,
  AccountPanel,
} from "@/components/account/account-page-heading";
import { StatusBadge } from "@/components/account/status-badge";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { formatPersianDate } from "@/lib/formatters/date";
import { formatPrice, toPersianDigits } from "@/lib/formatters/number";
import { useCustomerStore } from "@/store/customer-store";
import { useWishlistStore } from "@/store/shop-store";

export default function AccountOverviewPage() {
  const profile = useCustomerStore((state) => state.profile);
  const orders = useCustomerStore((state) => state.orders);
  const addresses = useCustomerStore((state) => state.addresses);
  const walletBalance = useCustomerStore((state) => state.walletBalance);
  const notifications = useCustomerStore((state) => state.notifications);
  const wishlistIds = useWishlistStore((state) => state.ids);

  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];
  const unreadNotifications = notifications.filter((n) => !n.read);
  const recentOrders = orders.slice(0, 3);
  const activeOrders = orders.filter(
    (o) => o.status === "processing" || o.status === "shipped",
  );
  const recommended = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeading
        title="حساب کاربری"
        description="نمای کلی سفارش‌ها، اطلاعات شخصی و خدمات حساب کاربری شما در الکتروما."
      />

      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-l from-ink via-ink-soft to-ink p-5 text-white shadow-raised sm:p-6">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-caption font-medium">
                کاربر تأییدشده
              </span>
              <span className="text-caption text-white/70">حساب نمایشی</span>
            </div>
            <h2 className="mt-2 text-heading font-bold sm:text-heading-lg">
              {profile.name}، خوش‌آمدید
            </h2>
            <p className="mt-1 text-body-sm text-white/80">
              شماره تماس: <span dir="ltr">{profile.phone}</span> • ایمیل:{" "}
              {profile.email}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur"
            >
              <Link href="/account/profile">ویرایش مشخصات</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-white text-brand-active font-semibold shadow-soft hover:bg-white/90"
            >
              <Link href="/account/orders">مشاهده سفارش‌ها</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <Link
          href="/account/orders"
          className="flex flex-col justify-between rounded-lg border border-line bg-surface p-4 shadow-soft transition-colors hover:border-primary/40 hover:bg-surface-soft"
        >
          <div className="flex items-center justify-between text-subtle-ink">
            <span className="text-caption">سفارش‌های فعال</span>
            <Truck className="size-4 text-brand" aria-hidden />
          </div>
          <p className="mt-3 text-title font-bold text-ink">
            {toPersianDigits(activeOrders.length)}{" "}
            <span className="text-caption font-normal text-subtle-ink">
              سفارش
            </span>
          </p>
        </Link>

        <Link
          href="/account/wallet"
          className="flex flex-col justify-between rounded-lg border border-line bg-surface p-4 shadow-soft transition-colors hover:border-primary/40 hover:bg-surface-soft"
        >
          <div className="flex items-center justify-between text-subtle-ink">
            <span className="text-caption">موجودی کیف پول</span>
            <Wallet className="size-4 text-success" aria-hidden />
          </div>
          <p className="mt-3 text-title-sm font-bold text-brand-active">
            {formatPrice(walletBalance)}{" "}
            <span className="text-caption font-normal text-subtle-ink">
              تومان
            </span>
          </p>
        </Link>

        <Link
          href="/wishlist"
          className="flex flex-col justify-between rounded-lg border border-line bg-surface p-4 shadow-soft transition-colors hover:border-primary/40 hover:bg-surface-soft"
        >
          <div className="flex items-center justify-between text-subtle-ink">
            <span className="text-caption">علاقه‌مندی‌ها</span>
            <Heart className="size-4 text-sale" aria-hidden />
          </div>
          <p className="mt-3 text-title font-bold text-ink">
            {toPersianDigits(wishlistIds.length)}{" "}
            <span className="text-caption font-normal text-subtle-ink">
              کالا
            </span>
          </p>
        </Link>

        <Link
          href="/account/notifications"
          className="flex flex-col justify-between rounded-lg border border-line bg-surface p-4 shadow-soft transition-colors hover:border-primary/40 hover:bg-surface-soft"
        >
          <div className="flex items-center justify-between text-subtle-ink">
            <span className="text-caption">پیام‌ها و اعلان‌ها</span>
            <Bell className="size-4 text-warning" aria-hidden />
          </div>
          <p className="mt-3 text-title font-bold text-ink">
            {toPersianDigits(unreadNotifications.length)}{" "}
            <span className="text-caption font-normal text-subtle-ink">
              خوانده‌نشده
            </span>
          </p>
        </Link>
      </div>

      {/* Recent Orders Section */}
      <AccountPanel
        title="آخرین سفارش‌ها"
        description="سفارش‌های ثبت‌شده اخیر و وضعیت رهگیری آن‌ها"
        action={
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1 text-label font-medium text-brand hover:underline"
          >
            مشاهده همه سفارش‌ها
            <ArrowLeft className="size-3.5" aria-hidden />
          </Link>
        }
      >
        {recentOrders.length === 0 ? (
          <div className="py-6 text-center text-body-sm text-subtle-ink">
            هنوز سفارشی در این حساب ثبت نشده است.
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-line-subtle">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-body-sm font-bold text-ink" dir="ltr">
                      {order.id}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="mt-1 text-caption text-subtle-ink">
                    ثبت‌شده در {formatPersianDate(order.placedAt)} •{" "}
                    {toPersianDigits(order.items.length)} قلم کالا
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span className="text-body-sm font-bold text-ink">
                    {formatPrice(order.total)} تومان
                  </span>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/account/orders/${order.id}`}>جزئیات</Link>
                    </Button>
                    {order.status === "shipped" && (
                      <Button asChild size="sm">
                        <Link href={`/account/orders/${order.id}/tracking`}>
                          رهگیری
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </AccountPanel>

      {/* Two-column preview: Default Address & Notifications */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Default Address */}
        <AccountPanel
          title="نشانی پیش‌فرض تحویل"
          action={
            <Link
              href="/account/addresses"
              className="text-label font-medium text-brand hover:underline"
            >
              مدیریت نشانی‌ها
            </Link>
          }
        >
          {defaultAddress ? (
            <div className="flex flex-col gap-2 rounded-lg border border-line-subtle bg-surface-soft p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-ink">
                  {defaultAddress.title}
                </span>
                <span className="text-caption text-subtle-ink">
                  {defaultAddress.recipient}
                </span>
              </div>
              <p className="text-body-sm text-body">{defaultAddress.address}</p>
              <div className="flex items-center justify-between text-caption text-subtle-ink">
                <span>تلفن: {defaultAddress.phone}</span>
                <span>کد پستی: {defaultAddress.postalCode}</span>
              </div>
            </div>
          ) : (
            <p className="text-body-sm text-subtle-ink">نشانی ثبت نشده است.</p>
          )}
        </AccountPanel>

        {/* Notifications preview */}
        <AccountPanel
          title="اعلان‌های اخیر"
          action={
            <Link
              href="/account/notifications"
              className="text-label font-medium text-brand hover:underline"
            >
              همه پیام‌ها
            </Link>
          }
        >
          {notifications.length === 0 ? (
            <p className="text-body-sm text-subtle-ink">اعلانی وجود ندارد.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {notifications.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-lg border border-line-subtle bg-surface-soft p-3"
                >
                  <Bell
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-body-sm font-medium text-ink">
                      {item.title}
                    </p>
                    <p className="line-clamp-1 text-caption text-subtle-ink">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AccountPanel>
      </div>

      {/* Recommended Products for Customer */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-brand" aria-hidden />
            <h2 className="text-sm sm:text-title font-bold text-ink">
              پیشنهادهای متناسب با علایق شما
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-label font-medium text-brand hover:underline"
          >
            مشاهده همه کاتالوگ
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-4">
          {recommended.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
}
