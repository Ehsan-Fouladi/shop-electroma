"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Eye,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  MessageSquareText,
  PackageCheck,
  ShieldCheck,
  Star,
  TicketPercent,
  UserRound,
  Wallet,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useCustomerStore } from "@/store/customer-store";
import { cn } from "@/lib/utils/cn";

export const accountLinks = [
  { href: "/account", label: "نمای کلی", icon: UserRound },
  { href: "/account/orders", label: "سفارش‌ها", icon: PackageCheck },
  { href: "/account/returns", label: "مرجوعی‌ها", icon: HelpCircle },
  { href: "/account/addresses", label: "نشانی‌ها", icon: MapPin },
  { href: "/account/profile", label: "اطلاعات شخصی", icon: UserRound },
  { href: "/account/wishlist", label: "علاقه‌مندی‌ها", icon: Heart },
  { href: "/account/recently-viewed", label: "بازدیدهای اخیر", icon: Eye },
  { href: "/account/coupons", label: "کدهای تخفیف", icon: TicketPercent },
  { href: "/account/reviews", label: "دیدگاه‌های من", icon: Star },
  { href: "/account/questions", label: "پرسش‌های من", icon: MessageSquareText },
  { href: "/account/notifications", label: "اعلان‌ها", icon: Bell },
  { href: "/account/wallet", label: "کیف پول", icon: Wallet },
  { href: "/account/security", label: "امنیت حساب", icon: ShieldCheck },
];

function isActivePath(pathname: string, href: string) {
  return href === "/account"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function AccountShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const profile = useCustomerStore((state) => state.profile);
  const setDemoContact = useCustomerStore((state) => state.setDemoContact);

  return (
    <section className="py-5 sm:py-7 lg:py-9">
      <Container>
        <div className="grid items-start gap-5 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-6">
          <aside className="hidden lg:block h-full">
            <div className="sticky top-28 overflow-hidden rounded-lg border border-line bg-surface shadow-soft">
              <div className="border-b border-line-subtle bg-surface-soft p-4">
                <p className="text-label text-subtle-ink">حساب نمایشی</p>
                <p className="mt-1 truncate text-body font-bold text-ink">{profile.name}</p>
                <p className="mt-0.5 truncate text-caption text-subtle-ink">{profile.phone}</p>
              </div>
              <nav aria-label="ناوبری حساب کاربری" className="flex flex-col gap-1 p-2">
                {accountLinks.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-body-sm transition-colors",
                        active
                          ? "bg-brand-soft font-medium text-brand-active"
                          : "text-body hover:bg-surface-soft hover:text-ink",
                      )}
                    >
                      <item.icon className="size-4 shrink-0" aria-hidden />
                      {item.label}
                    </Link>
                  );
                })}
                <Button
                  type="button"
                  variant="ghost"
                  className="mt-1 justify-start text-subtle-ink"
                  onClick={() => setDemoContact(null)}
                >
                  <LogOut aria-hidden />
                  خروج نمایشی
                </Button>
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            <nav
              aria-label="ناوبری حساب کاربری"
              className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden"
            >
              {accountLinks.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-label transition-colors",
                      active
                        ? "border-primary/25 bg-brand-soft font-medium text-brand-active"
                        : "border-line bg-surface text-body hover:bg-surface-soft",
                    )}
                  >
                    <item.icon className="size-3.5" aria-hidden />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}