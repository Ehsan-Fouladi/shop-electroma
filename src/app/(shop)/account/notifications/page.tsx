"use client";

import Link from "next/link";
import { Bell, CheckCheck, ChevronLeft, ChevronRight, Tag, Truck } from "lucide-react";
import { toast } from "sonner";

import { AccountPageHeading } from "@/components/account/account-page-heading";
import { Button } from "@/components/ui/button";
import { formatPersianDate } from "@/lib/formatters/date";
import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import { useCustomerStore } from "@/store/customer-store";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 4;

export default function AccountNotificationsPage() {
  const notifications = useCustomerStore((state) => state.notifications);
  const markNotificationRead = useCustomerStore((state) => state.markNotificationRead);
  const markAllNotificationsRead = useCustomerStore((state) => state.markAllNotificationsRead);

  const [activeTab, setActiveTab] = useState<"all" | "order" | "promotion" | "system">("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const filtered = notifications.filter(
    (n) => activeTab === "all" || n.type === activeTab,
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const handleMarkAll = () => {
    markAllNotificationsRead();
    toast.success("همه اعلان‌ها به عنوان خوانده‌شده علامت‌گذاری شدند.");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Truck className="size-5 text-brand" />;
      case "promotion":
        return <Tag className="size-5 text-sale" />;
      default:
        return <Bell className="size-5 text-warning" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AccountPageHeading
          title="پیام‌ها و اعلان‌ها"
          description="اطلاع‌رسانی وضعیت سفارش‌ها، تغییرات حساب و تخفیف‌های ویژه."
        />
        <Button variant="outline" size="sm" onClick={handleMarkAll}>
          <CheckCheck aria-hidden />
          خواندن همه
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-line pb-2">
        {[
          { id: "all", label: "همه اعلان‌ها" },
          { id: "order", label: "سفارش‌ها" },
          { id: "promotion", label: "تخفیف و پیشنهادها" },
          { id: "system", label: "سیستم" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as any)}
            className={cn(
              "rounded-md px-3 py-1.5 text-label transition-colors",
              activeTab === t.id
                ? "bg-brand-soft font-bold text-brand-active"
                : "text-subtle-ink hover:text-ink hover:bg-surface-soft",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-surface p-8 text-center shadow-soft sm:p-12">
          <span className="grid size-14 place-items-center rounded-full bg-surface-muted text-subtle-ink">
            <Bell className="size-8" aria-hidden />
          </span>
          <div>
            <h2 className="text-title font-bold text-ink">اعلانی در این بخش وجود ندارد</h2>
            <p className="mt-1 text-body-sm text-subtle-ink">
              پیام‌های جدید مربوط به سفارش‌ها یا پیشنهادهای تخفیف در اینجا نمایش داده خواهند شد.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {paginated.map((item) => (
            <article
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={cn(
                "flex items-start gap-4 rounded-xl border p-4 shadow-soft transition-colors cursor-pointer",
                item.read
                  ? "border-line bg-surface"
                  : "border-primary/40 bg-brand-soft/25 ring-1 ring-primary/20",
              )}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-soft">
                {getIcon(item.type)}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-body-sm font-bold text-ink">{item.title}</h3>
                  <span className="text-caption text-subtle-ink">
                    {formatPersianDate(item.date)}
                  </span>
                </div>
                <p className="mt-1 text-caption text-body">{item.description}</p>
                {item.href && (
                  <div className="mt-2">
                    <Link
                      href={item.href}
                      className="text-caption font-bold text-brand hover:underline"
                    >
                      مشاهده جزئیات →
                    </Link>
                  </div>
                )}
              </div>

              {!item.read && (
                <span className="size-2 shrink-0 rounded-full bg-primary" title="خوانده‌نشده" />
              )}
            </article>
          ))}

          {/* Notifications Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="صفحه‌بندی اعلان‌ها"
              className="mt-4 flex items-center justify-center gap-2"
            >
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={isFirst}
                aria-label="صفحه قبلی اعلان‌ها"
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => {
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
                })}
              </ul>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={isLast}
                aria-label="صفحه بعدی اعلان‌ها"
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
