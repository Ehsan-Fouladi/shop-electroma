import { MessagesSquare, Star } from "lucide-react";

import { ReviewFormDialog } from "@/components/product/detail/review-form-dialog";
import { getProductDemoReviews } from "@/data/product-demo-reviews";
import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types";

/** Existing catalogue aggregate plus clearly identified, non-customer demo copy. */
export function ProductReviews({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const filled = Math.round(product.rating);
  const demoReviews = getProductDemoReviews(product.id);
  const reviewCount = toPersianDigits(
    product.reviewCount.toLocaleString("en-US"),
  );

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className={cn(
        "flex scroll-mt-24 flex-col gap-4 rounded-lg border border-line bg-card p-4 shadow-soft sm:p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="reviews-title" className="text-title font-bold text-ink">
          امتیاز و نظرها
        </h2>
        <ReviewFormDialog productTitle={product.title} />
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 rounded-md bg-surface-soft p-4">
        <div className="flex items-center gap-3">
          <span className="tabular text-display font-bold leading-none text-ink">
            {toPersianDigits(product.rating.toFixed(1))}
          </span>
          <span className="flex flex-col gap-1">
            <span className="flex items-center gap-0.5" aria-hidden>
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  className={cn(
                    "size-4",
                    value <= filled
                      ? "fill-warning text-warning"
                      : "text-line-strong",
                  )}
                />
              ))}
            </span>
            <span className="text-caption text-subtle-ink">
              میانگین امتیاز کاتالوگ · بر پایه {reviewCount} امتیاز ثبت‌شده
            </span>
          </span>
          <span className="sr-only">
            میانگین امتیاز کاتالوگ {toPersianDigits(product.rating.toFixed(1))}{" "}
            از ۵ بر پایه {reviewCount} امتیاز
          </span>
        </div>
        <p className="text-caption text-subtle-ink">
          این امتیاز تجمیعی از نظرهای نمونه‌ی زیر جداست.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-muted text-subtle-ink">
            <MessagesSquare className="size-4.5" aria-hidden />
          </span>
          <h3 className="text-body font-bold text-ink">نظرهای نمونه</h3>
          <span className="rounded-full bg-surface-muted px-2.5 py-1 text-caption text-subtle-ink">
            محتوای نمایشی
          </span>
        </div>
        <p className="text-body-sm text-body">
          متن‌های زیر صرفاً برای نمایش نمونه هستند و نظر تأییدشده یا تجربه‌ی
          واقعی خریداران نیستند.
        </p>

        <ul
          aria-label="سه نظر نمونه نمایشی"
          className="grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-3"
        >
          {demoReviews.map((review) => (
            <li
              key={review.id}
              className="flex min-w-0 flex-col gap-3 rounded-md border border-line bg-surface p-3.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-label font-semibold text-ink">
                  {review.name}
                </span>
                <span className="rounded-full bg-surface-muted px-2 py-1 text-caption text-subtle-ink">
                  نظر نمونه
                </span>
              </div>

              <div
                role="img"
                aria-label={`امتیاز نمونه ${toPersianDigits(review.rating)} از ۵`}
                className="flex items-center gap-1"
              >
                <span className="flex items-center gap-0.5" aria-hidden>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={cn(
                        "size-3.5",
                        value <= review.rating
                          ? "fill-warning text-warning"
                          : "text-line-strong",
                      )}
                    />
                  ))}
                </span>
                <span className="tabular text-caption text-subtle-ink">
                  {toPersianDigits(review.rating)} از ۵
                </span>
              </div>

              <p className="text-body-sm leading-6 text-body">{review.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
