"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { AccountPageHeading, AccountPanel } from "@/components/account/account-page-heading";
import { customerReviews } from "@/data/customer";
import { products } from "@/data/products";
import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 3;

export default function AccountReviewsPage() {
  const [activeTab, setActiveTab] = useState<"published" | "pending">("published");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const filtered = customerReviews.filter((r) => r.status === activeTab);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeading
        title="دیدگاه‌ها و نظرات من"
        description="مدیریت نظرات ثبت‌شده برای کالاهای خریداری‌شده و ثبت تجربه خرید."
      />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-line pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("published")}
          className={cn(
            "rounded-md px-3.5 py-1.5 text-label transition-colors",
            activeTab === "published"
              ? "bg-brand-soft font-bold text-brand-active"
              : "text-subtle-ink hover:text-ink hover:bg-surface-soft",
          )}
        >
          نظرات ثبت‌شده
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("pending")}
          className={cn(
            "rounded-md px-3.5 py-1.5 text-label transition-colors",
            activeTab === "pending"
              ? "bg-brand-soft font-bold text-brand-active"
              : "text-subtle-ink hover:text-ink hover:bg-surface-soft",
          )}
        >
          در انتظار ثبت نظر
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-surface p-8 text-center shadow-soft sm:p-12">
          <span className="grid size-14 place-items-center rounded-full bg-surface-muted text-subtle-ink">
            <Star className="size-8" aria-hidden />
          </span>
          <div>
            <h2 className="text-title font-bold text-ink">موردی برای نمایش وجود ندارد</h2>
            <p className="mt-1 text-body-sm text-subtle-ink">
              نظرات شما پس از تأیید کارشناسان در این بخش نمایش داده می‌شوند.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {paginated.map((rev) => {
            const prod = products.find((p) => p.id === rev.productId);
            return (
              <AccountPanel key={rev.id}>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-subtle pb-3">
                  <div>
                    <Link
                      href={prod ? `/product/${prod.slug}` : "#"}
                      className="font-bold text-ink hover:text-brand-active"
                    >
                      {prod ? prod.title : rev.productId}
                    </Link>
                    <p className="mt-1 text-caption text-subtle-ink">
                      تاریخ: <span dir="ltr">{rev.date}</span>
                    </p>
                  </div>

                  {rev.status === "published" && (
                    <div className="flex items-center gap-1 text-warning">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-4",
                            i < rev.rating ? "fill-warning text-warning" : "text-line-strong",
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <p className="text-body-sm text-body leading-relaxed">{rev.title}</p>
                </div>
              </AccountPanel>
            );
          })}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="صفحه‌بندی دیدگاه‌ها"
              className="mt-4 flex items-center justify-center gap-2"
            >
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={isFirst}
                aria-label="صفحه قبلی نظرات"
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
                aria-label="صفحه بعدی نظرات"
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
