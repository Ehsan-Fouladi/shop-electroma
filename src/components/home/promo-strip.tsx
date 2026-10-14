import Link from "next/link";
import {
  ChevronLeft,
  CreditCard,
  RefreshCcw,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { promoCards } from "@/data/home";
import { cn } from "@/lib/utils/cn";

const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  "credit-card": CreditCard,
  "shield-check": ShieldCheck,
  "refresh-ccw": RefreshCcw,
  percent: RefreshCcw,
  gift: RefreshCcw,
};

const toneClasses: Record<string, string> = {
  brand: "bg-brand-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
};

/**
 * Commercial promises strip. Rendered as a single divided surface rather than
 * four loose cards so it reads as one deliberate band under the categories.
 */
export function PromoStrip() {
  return (
    <Section
      className="pt-5 sm:pt-6 lg:pt-8"
      aria-label="مزایای خرید از الکتروما"
    >
      <Container>
        <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
          <ul className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {promoCards.map((card, index) => {
              const Icon = iconMap[card.icon] ?? Truck;
              return (
                <li
                  key={card.id}
                  className={cn(
                    "flex items-start gap-3 p-4 sm:p-5",
                    index > 0 && "sm:border-s sm:border-line",
                    index >= 2 && "sm:border-t sm:border-line lg:border-t-0",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-md",
                      toneClasses[card.tone],
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-body-sm font-bold text-ink">
                      {card.title}
                    </p>
                    <p className="mt-1 text-label leading-6 text-subtle-ink">
                      {card.description}
                    </p>
                    <Link
                      href={card.href}
                      className="mt-1.5 inline-flex items-center gap-1 text-label font-medium text-brand transition-colors hover:text-brand-hover"
                    >
                      {card.cta}
                      <ChevronLeft className="size-3.5" aria-hidden />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
