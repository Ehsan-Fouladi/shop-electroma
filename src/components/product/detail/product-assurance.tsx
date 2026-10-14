import Link from "next/link";
import {
  BadgeCheck,
  RefreshCcw,
  ShieldCheck,
  Store,
  Truck,
} from "lucide-react";

import { valueProps } from "@/data/home";
import { formatNumber } from "@/lib/formatters/number";
import { siteConfig } from "@/lib/constants/site";
import type { Product } from "@/types";

const propIcons = {
  "value-shipping": Truck,
  "value-return": RefreshCcw,
  "value-original": BadgeCheck,
} as const;

/**
 * Purchase assurance: the product's own seller/warranty plus three site-level
 * promises that already exist in the project (homepage value props + site
 * constants). No guarantee is invented for the detail page.
 */
export function ProductAssurance({ product }: { product: Product }) {
  const props = valueProps.filter((prop) => prop.id in propIcons);

  return (
    <section
      aria-labelledby="assurance-title"
      className="flex flex-col gap-3 rounded-lg border border-line bg-surface-soft p-4 sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="assurance-title" className="text-body-sm font-bold text-ink">
          خرید مطمئن
        </h2>
        <Link
          href="/support/faq"
          className="text-caption font-medium text-brand transition-colors hover:text-brand-hover"
        >
          مرکز پشتیبانی
        </Link>
      </div>

      <ul className="flex flex-col gap-3">
        <li className="flex items-start gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-sm bg-surface text-subtle-ink">
            <Store className="size-4" aria-hidden />
          </span>
          <p className="text-body-sm text-body">
            <span className="text-subtle-ink">فروشنده: </span>
            <span className="font-medium text-ink">{product.seller}</span>
          </p>
        </li>

        <li className="flex items-start gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-sm bg-surface text-success">
            <ShieldCheck className="size-4" aria-hidden />
          </span>
          <p className="text-body-sm text-body">
            <span className="text-subtle-ink">گارانتی: </span>
            <span className="font-medium text-ink">{product.warranty}</span>
          </p>
        </li>

        {props.map((prop) => {
          const Icon = propIcons[prop.id as keyof typeof propIcons];
          return (
            <li key={prop.id} className="flex items-start gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-sm bg-surface text-brand">
                <Icon className="size-4" aria-hidden />
              </span>
              <p className="text-body-sm text-body">
                <span className="font-medium text-ink">{prop.title}</span>
                <span className="block text-caption text-subtle-ink">
                  {prop.id === "value-shipping"
                    ? `ارسال رایگان برای سفارش‌های بالای ${formatNumber(siteConfig.freeShippingThreshold)} تومان.`
                    : prop.description}
                </span>
              </p>
            </li>
          );
        })}
      </ul>

      <p className="border-t border-line pt-3 text-caption text-disabled-ink">
        پشتیبانی ۷ روز هفته — {siteConfig.supportPhone}
      </p>
    </section>
  );
}
