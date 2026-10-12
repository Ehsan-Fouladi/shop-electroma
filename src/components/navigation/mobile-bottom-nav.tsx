"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, ShoppingCart, UserRound } from "lucide-react";

import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import { selectCartCount, useCartStore } from "@/store/shop-store";

const items = [
  { title: "خانه", href: "/", icon: Home },
  { title: "دسته‌بندی", href: "/categories", icon: LayoutGrid },
  { title: "جستجو", href: "/search", icon: Search },
  { title: "سبد خرید", href: "/cart", icon: ShoppingCart },
  { title: "حساب من", href: "/account", icon: UserRound },
];

/** Thumb-reachable navigation for small screens. */
export function MobileBottomNav() {
  const pathname = usePathname();
  const count = useCartStore(selectCartCount);

  return (
    <nav
      aria-label="ناوبری سریع"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2.5 text-caption transition-colors",
                  active ? "text-brand-active" : "text-subtle-ink hover:text-body",
                )}
              >
                <span className="relative">
                  <item.icon className="size-5" aria-hidden />
                  {item.href === "/cart" && count > 0 ? (
                    <span className="absolute -top-1.5 -end-2 grid min-w-4 place-items-center rounded-full bg-sale px-1 text-[10px] font-bold leading-4 text-white tabular">
                      {toPersianDigits(count)}
                    </span>
                  ) : null}
                </span>
                <span className="font-medium">{item.title}</span>
                {active ? (
                  <span className="absolute inset-x-4 top-0 h-0.5 rounded-full bg-primary" aria-hidden />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}