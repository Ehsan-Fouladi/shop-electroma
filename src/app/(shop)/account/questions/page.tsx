"use client";

import Link from "next/link";
import { MessageSquareText } from "lucide-react";

import {
  AccountPageHeading,
  AccountPanel,
} from "@/components/account/account-page-heading";
import { customerQuestions } from "@/data/customer";
import { products } from "@/data/products";

export default function AccountQuestionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeading
        title="پرسش‌های من"
        description="پرسش‌های شما درباره کالاهای مختلف و پاسخ‌های ارائه‌شده توسط کارشناسان."
      />

      {customerQuestions.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-surface p-8 text-center shadow-soft sm:p-12">
          <span className="grid size-14 place-items-center rounded-full bg-surface-muted text-subtle-ink">
            <MessageSquareText className="size-8" aria-hidden />
          </span>
          <div>
            <h2 className="text-title font-bold text-ink">
              پرسشی ثبت نکرده‌اید
            </h2>
            <p className="mt-1 text-body-sm text-subtle-ink">
              می‌توانید در صفحه هر محصول، سؤال فنی خود را از کارشناسان بپرسید.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {customerQuestions.map((q) => {
            const prod = products.find((p) => p.id === q.productId);
            return (
              <AccountPanel key={q.id}>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-subtle pb-3">
                  <Link
                    href={prod ? `/product/${prod.slug}` : "#"}
                    className="font-bold text-ink hover:text-brand-active"
                  >
                    {prod ? prod.title : q.productId}
                  </Link>
                  <span className="text-caption text-subtle-ink" dir="ltr">
                    {q.date}
                  </span>
                </div>

                <div className="mt-3 flex flex-col gap-2.5">
                  <div className="flex items-start gap-2 text-body-sm">
                    <span className="font-bold text-ink">پرسش شما:</span>
                    <span className="text-body">{q.question}</span>
                  </div>

                  {q.answer ? (
                    <div className="rounded-lg bg-surface-soft p-3 text-caption text-body">
                      <span className="font-bold text-brand-active">
                        پاسخ پشتیبانی الکتروما:{" "}
                      </span>
                      <span>{q.answer}</span>
                    </div>
                  ) : (
                    <p className="text-caption text-subtle-ink">
                      در انتظار پاسخ کارشناسان الکتروما…
                    </p>
                  )}
                </div>
              </AccountPanel>
            );
          })}
        </div>
      )}
    </div>
  );
}
