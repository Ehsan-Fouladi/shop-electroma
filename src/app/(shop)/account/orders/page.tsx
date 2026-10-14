"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  PackageCheck,
  Search,
  Truck,
} from "lucide-react";

import { AccountPageHeading } from "@/components/account/account-page-heading";
import { StatusBadge } from "@/components/account/status-badge";
import { ProductMedia } from "@/components/product/product-media";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { formatPersianDate } from "@/lib/formatters/date";
import { formatPrice, toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import { useCustomerStore } from "@/store/customer-store";
import type { OrderStatus } from "@/types/customer";
import { useEffect, useState } from "react";

const tabs: { id: "all" | OrderStatus; label: string }[] = [
  { id: "all", label: "همه سفارش‌ها" },
  { id: "processing", label: "در حال پردازش" },
  { id: "shipped", label: "ارسال‌شده" },
  { id: "delivered", label: "تحویل‌شده" },
  { id: "cancelled", label: "لغوشده" },
];

const ITEMS_PER_PAGE = 3;

export default function AccountOrdersPage() {
  const orders = useCustomerStore((state) => state.orders);
  const [activeTab, setActiveTab] = useState<"all" | OrderStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Reset page when tab or search term changes
  useEffect(() => {
    setPage(1);
  }, [activeTab, searchTerm]);

  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "all" || order.status === activeTab;
    const matchesSearch =
      !searchTerm ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((i) => i.title.includes(searchTerm));
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ITEMS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE,
  );

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeading
        title="تاریخچه سفارش‌ها"
        description="سفارش‌های قبلی و جاری خود را مشاهده و پیگیری نمایید."
      />

      {/* Filter Tabs */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
          {tabs.map((tab) => {
            const count =
              tab.id === "all"
                ? orders.length
                : orders.filter((o) => o.status === tab.id).length;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-label transition-colors",
                  isSelected
                    ? "bg-primary text-white font-medium shadow-soft"
                    : "bg-surface text-body hover:bg-surface-soft border border-line",
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 text-caption tabular",
                    isSelected
                      ? "bg-white/25 text-white"
                      : "bg-surface-muted text-subtle-ink",
                  )}
                >
                  {toPersianDigits(count)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="جستجو بر اساس کد یا نام کالا…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-md border border-line bg-surface pe-9 ps-3 text-body-sm text-foreground placeholder:text-disabled-ink focus-visible:outline-2 focus-visible:outline-primary/35"
          />
          <Search
            className="pointer-events-none absolute end-3 top-2.5 size-4 text-subtle-ink"
            aria-hidden
          />
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-surface p-8 text-center shadow-soft sm:p-12">
          <span className="grid size-14 place-items-center rounded-full bg-surface-muted text-subtle-ink">
            <PackageCheck className="size-8" aria-hidden />
          </span>
          <div>
            <h2 className="text-title font-bold text-ink">
              سفارشی با این مشخصات یافت نشد
            </h2>
            <p className="mt-1 text-body-sm text-subtle-ink">
              می‌توانید فیلتر انتخابی را تغییر داده یا از فروشگاه سفارش ثبت
              کنید.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/products">مشاهده کاتالوگ فروشگاه</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {paginatedOrders.map((order) => (
            <article
              key={order.id}
              className="overflow-hidden rounded-xl border border-line bg-surface shadow-soft transition-all hover:border-line-strong"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-soft/60 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-ink" dir="ltr">
                    {order.id}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
                <div className="text-caption text-subtle-ink">
                  ثبت‌شده در {formatPersianDate(order.placedAt)}
                </div>
              </div>

              {/* Order Body */}
              <div className="flex flex-col gap-4 p-4 sm:p-5">
                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                  {/* Total & Action buttons */}
                  <div className="flex flex-col gap-3 border-t border-line-subtle pt-3 sm:items-start sm:justify-between sm:border-0 sm:pt-0">
                    <div className="flex items-center justify-between sm:flex-col sm:items-start sm:text-end">
                      <span className="text-caption text-subtle-ink">
                        مبلغ پرداختی:
                      </span>
                      <p className="text-title-sm font-bold text-brand-active">
                        {formatPrice(order.total)} تومان
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      {order.status === "shipped" && (
                        <Button asChild size="sm">
                          <Link href={`/account/orders/${order.id}/tracking`}>
                            <Truck aria-hidden />
                            رهگیری مرسوله
                          </Link>
                        </Button>
                      )}
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/account/orders/${order.id}`}>
                          مشاهده جزئیات
                        </Link>
                      </Button>
                    </div>
                  </div>
                  {/* Products thumbnails */}
                  <div className="flex flex-wrap gap-2.5">
                    {order.items.map((item, idx) => {
                      const prod = products.find(
                        (p) => p.id === item.productId,
                      );
                      return (
                        <div
                          key={idx}
                          className="relative flex items-center gap-2 rounded-md border border-line bg-surface p-2"
                        >
                          {prod ? (
                            <div className="relative size-12 shrink-0 overflow-hidden rounded bg-surface-soft">
                              <ProductMedia product={prod} sizes="48px" />
                            </div>
                          ) : null}
                          <div className="max-w-[14rem]">
                            <p className="line-clamp-1 text-caption font-medium text-ink">
                              {item.title}
                            </p>
                            <p className="text-caption text-subtle-ink">
                              {toPersianDigits(item.quantity)} عدد •{" "}
                              {formatPrice(item.unitPrice)} تومان
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Orders Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="صفحه‌بندی سفارش‌ها"
              className="mt-4 flex items-center justify-center gap-2"
            >
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={isFirst}
                aria-label="صفحه قبلی سفارش‌ها"
                className={cn(
                  "inline-flex h-10 items-center justify-center rounded-md border text-body-sm transition-colors outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                  "size-10 sm:w-auto sm:px-3 sm:gap-1",
                  isFirst
                    ? "pointer-events-none border-line bg-surface text-disabled-ink opacity-50"
                    : "border-line bg-surface text-body hover:bg-surface-soft",
                )}
              >
                <ChevronRight className="size-4 shrink-0" aria-hidden />
                <span className="hidden sm:inline">قبلی</span>
              </button>

              <ul className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pNum) => {
                    const isCurrent = pNum === currentPage;
                    return (
                      <li key={pNum}>
                        <button
                          type="button"
                          onClick={() => setPage(pNum)}
                          aria-label={`صفحه ${toPersianDigits(pNum)}`}
                          aria-current={isCurrent ? "page" : undefined}
                          className={cn(
                            "grid size-10 place-items-center rounded-md border text-body-sm tabular transition-colors outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                            isCurrent
                              ? "border-primary bg-primary font-bold text-primary-foreground shadow-soft"
                              : "border-line bg-surface text-body hover:bg-surface-soft",
                          )}
                        >
                          {toPersianDigits(pNum)}
                        </button>
                      </li>
                    );
                  },
                )}
              </ul>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={isLast}
                aria-label="صفحه بعدی سفارش‌ها"
                className={cn(
                  "inline-flex h-10 items-center justify-center rounded-md border text-body-sm transition-colors outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                  "size-10 sm:w-auto sm:px-3 sm:gap-1",
                  isLast
                    ? "pointer-events-none border-line bg-surface text-disabled-ink opacity-50"
                    : "border-line bg-surface text-body hover:bg-surface-soft",
                )}
              >
                <span className="hidden sm:inline">بعدی</span>
                <ChevronLeft className="size-4 shrink-0" aria-hidden />
              </button>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}
