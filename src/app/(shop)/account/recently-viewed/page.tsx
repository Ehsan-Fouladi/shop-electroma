"use client";

import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AccountPageHeading } from "@/components/account/account-page-heading";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useRecentlyViewedStore } from "@/store/shop-store";

export default function AccountRecentlyViewedPage() {
  const ids = useRecentlyViewedStore((state) => state.ids);
  const clear = useRecentlyViewedStore((state) => state.clear);

  // If store is empty, fallback to 4 products to show realistic UI
  const viewedProducts =
    ids.length > 0
      ? ids.map((id) => products.find((p) => p.id === id)).filter((p): p is (typeof products)[0] => Boolean(p))
      : [];

  const handleClear = () => {
    clear();
    toast.success("تاریخچه بازدیدهای اخیر پاک شد.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AccountPageHeading
          title="بازدیدهای اخیر"
          description="کالاهایی که اخیراً در فروشگاه الکتروما مشاهده کرده‌اید."
        />
        {viewedProducts.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleClear}>
            <Trash2 aria-hidden />
            پاک کردن تاریخچه
          </Button>
        )}
      </div>

      {viewedProducts.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-surface p-8 text-center shadow-soft sm:p-12">
          <span className="grid size-14 place-items-center rounded-full bg-surface-muted text-subtle-ink">
            <Eye className="size-8" aria-hidden />
          </span>
          <div>
            <h2 className="text-title font-bold text-ink">تاریخچه بازدید شما خالی است</h2>
            <p className="mt-1 text-body-sm text-subtle-ink">
              هر کالایی را که در فروشگاه بررسی کنید در این قسمت ذخیره می‌شود.
            </p>
          </div>
          <Button asChild>
            <Link href="/products">مشاهده محصولات</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
          {viewedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
