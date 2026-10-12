"use client";

import { Check, Copy, Flame, Tag } from "lucide-react";
import { toast } from "sonner";

import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { toPersianDigits } from "@/lib/formatters/number";
import type { Product } from "@/types";
import { useState } from "react";

interface DealsViewProps {
  products: Product[];
}

const coupons = [
  { code: "ELECTROMA", desc: "۵۰۰٬۰۰۰ تومان تخفیف روی سبدهای بالای ۱۰ میلیون تومان", discount: "۵۰۰ هزار" },
  { code: "WELCOME", desc: "۳۰۰٬۰۰۰ تومان تخفیف خرید اول برای اعضای جدید", discount: "۳۰۰ هزار" },
  { code: "YALDA", desc: "۱۵٪ تخفیف ویژه جشنواره فصلی (تا سقف ۱ میلیون)", discount: "۱۵٪" },
  { code: "SPECIAL20", desc: "۲۰٪ تخفیف روی تمامی لوازم جانبی و هدفون‌ها", discount: "۲۰٪" },
];

export function DealsView({ products }: DealsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filter products with discounts
  const dealProducts = products
    .filter((p) => p.oldPrice && p.oldPrice > p.price)
    .map((p) => {
      const discountPercent = Math.round(((p.oldPrice! - p.price) / p.oldPrice!) * 100);
      return { ...p, discountPercent };
    });

  const categories = [
    { slug: "all", title: "همه دسته‌ها" },
    { slug: "mobile-phones", title: "گوشی موبایل" },
    { slug: "laptops", title: "لپ‌تاپ" },
    { slug: "headphones", title: "هدفون و صوت" },
    { slug: "smart-watches", title: "ساعت هوشمند" },
    { slug: "tablets", title: "تبلت" },
    { slug: "gaming-consoles", title: "گیمینگ" },
  ];

  const filtered = dealProducts.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.categorySlug === selectedCategory;
    const matchesDiscount = p.discountPercent >= minDiscount;
    return matchesCategory && matchesDiscount;
  });

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`کد تخفیف ${code} کپی شد!`, {
      description: "می‌توانید در مرحله تسویه حساب از آن استفاده کنید.",
    });
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Promo Coupons Carousel / Row */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-brand-soft/60 to-surface p-5 shadow-soft sm:p-6">
        <div className="flex items-center gap-2">
          <Tag className="size-5 text-primary" />
          <h2 className="text-body font-bold text-ink sm:text-title">کدهای تخفیف فعال امروز</h2>
        </div>
        <p className="mt-1 text-caption text-subtle-ink">
          کد مورد نظر را کپی کرده و هنگام نهایی‌سازی سفارش در سبد خرید وارد نمایید.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coupons.map((c) => {
            const isCopied = copiedCode === c.code;
            return (
              <div
                key={c.code}
                className="flex flex-col justify-between rounded-xl border border-dashed border-primary/40 bg-surface p-3.5 shadow-soft transition-all hover:border-primary"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-title-sm font-bold text-brand-active" dir="ltr">
                      {c.code}
                    </span>
                    <span className="rounded-full bg-sale-soft px-2 py-0.5 text-caption font-bold text-sale">
                      {c.discount}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-caption text-subtle-ink">{c.desc}</p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copyCoupon(c.code)}
                  className="mt-3 w-full gap-1.5"
                >
                  {isCopied ? (
                    <>
                      <Check className="size-3.5 text-success" />
                      <span className="text-success font-bold">کپی شد</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>کپی کد تخفیف</span>
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`shrink-0 rounded-full px-4 py-2 text-body-sm font-medium transition-colors ${
                selectedCategory === cat.slug
                  ? "bg-primary text-white shadow-soft"
                  : "border border-line bg-surface text-body hover:bg-surface-soft"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Discount Depth Filter */}
        <div className="flex items-center gap-1.5 shrink-0 text-caption font-medium text-subtle-ink">
          <span>حداقل تخفیف:</span>
          <div className="flex rounded-lg border border-line bg-surface p-0.5">
            {[0, 15, 25].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setMinDiscount(d)}
                className={`rounded-md px-2.5 py-1 text-caption transition-colors ${
                  minDiscount === d
                    ? "bg-primary text-white font-bold"
                    : "text-body hover:text-ink"
                }`}
              >
                {d === 0 ? "همه" : `+${toPersianDigits(d)}٪`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div>
        <div className="mb-4 flex items-center justify-between text-body-sm text-subtle-ink">
          <p>
            نمایش <span className="font-bold text-ink">{toPersianDigits(filtered.length)}</span> کالای تخفیف‌دار
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-line bg-surface p-12 text-center shadow-soft">
            <Flame className="mx-auto size-12 text-subtle-ink" />
            <h3 className="mt-3 text-title font-bold text-ink">کالایی با این فیلتر یافت نشد</h3>
            <p className="mt-1 text-body-sm text-subtle-ink">
              فیلتر حداقل تخفیف یا دسته انتخابی را تغییر دهید تا کالاهای شگفت‌انگیز را ببینید.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSelectedCategory("all");
                setMinDiscount(0);
              }}
            >
              پاک کردن فیلترها
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
