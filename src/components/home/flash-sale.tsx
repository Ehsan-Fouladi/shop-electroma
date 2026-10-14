"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { cardWidthClass } from "@/components/product/product-rail";
import { Button } from "@/components/ui/button";
import { useRailScroller } from "@/hooks/use-rail-scroller";
import { toPersianDigits } from "@/lib/formatters/number";
import { Children, useEffect, useState } from "react";

/** Countdown to the end of the running offer (next local midnight). */
function useTimeToMidnight() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      setRemaining(Math.max(0, end.getTime() - now.getTime()));
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (remaining === null) return null;

  const totalSeconds = Math.floor(remaining / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function CountdownTile({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex flex-col items-center gap-1">
      <span className="tabular grid h-9 w-10 place-items-center rounded-md bg-white/15 text-body-sm font-bold text-white backdrop-blur-sm sm:h-10 sm:w-11 sm:text-title-sm">
        {toPersianDigits(String(value).padStart(2, "0"))}
      </span>
      <span className="text-caption text-white/70">{label}</span>
    </span>
  );
}

/**
 * Flash-sale band: gradient surface, live countdown and a rail of offer cards
 * with the same RTL-aware arrow behaviour as the standard product rails.
 * Cards are server-rendered and passed in as children.
 */
export function FlashSale({
  children,
  itemCount,
}: {
  children: React.ReactNode;
  itemCount: number;
}) {
  const { ref, bounds, step } = useRailScroller<HTMLDivElement>();
  const time = useTimeToMidnight();

  return (
    <Section aria-labelledby="flash-sale-title">
      <Container>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-bl from-foreground via-primary to-brand-active p-4 shadow-raised sm:p-6 lg:p-7">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-20 start-[-3rem] size-64 rounded-full bg-white/10 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-24 end-[-4rem] size-72 rounded-full bg-sale/20 blur-3xl"
          />

          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-white/15 text-white backdrop-blur-sm">
                <Flame className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <h2
                  id="flash-sale-title"
                  className="text-title font-bold text-white sm:text-heading"
                >
                  سرخط تخفیف‌ها
                </h2>
                <p className="text-label text-white/75">
                  پیشنهادهای ویژه امروز؛ فرصت محدود تا پایان شب
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div
                className="flex items-center gap-2"
                role="timer"
                aria-label="زمان باقی‌مانده تا پایان پیشنهادها"
              >
                <CountdownTile value={time?.hours ?? 0} label="ساعت" />
                <span className="mb-5 text-title-sm font-bold text-white/50">
                  :
                </span>
                <CountdownTile value={time?.minutes ?? 0} label="دقیقه" />
                <span className="mb-5 text-title-sm font-bold text-white/50">
                  :
                </span>
                <CountdownTile value={time?.seconds ?? 0} label="ثانیه" />
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="secondary"
                  size="icon-sm"
                  className="rounded-full bg-white/15 text-white hover:bg-white/25"
                  onClick={() => step("prev")}
                  disabled={bounds.atStart}
                  aria-label="پیشنهادهای قبلی"
                >
                  <ChevronRight aria-hidden />
                </Button>
                <Button
                  variant="secondary"
                  size="icon-sm"
                  className="rounded-full bg-white/15 text-white hover:bg-white/25"
                  onClick={() => step("next")}
                  disabled={bounds.atEnd}
                  aria-label="پیشنهادهای بعدی"
                >
                  <ChevronLeft aria-hidden />
                </Button>
              </div>
            </div>
          </div>

          <div
            ref={ref}
            data-rail
            role="group"
            aria-label="محصولات موجود در سرخط تخفیف‌ها"
            className="no-scrollbar relative mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 pt-1 sm:mt-5 sm:gap-4 lg:snap-none"
          >
            {Children.map(children, (child, index) => (
              <div key={index} className={cardWidthClass}>
                {child}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-label text-white/70">
              {toPersianDigits(itemCount)} پیشنهاد ویژه فعال
            </span>
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="bg-white/15 text-white hover:bg-white/25"
            >
              <Link href="/deals">
                مشاهده همه تخفیف‌ها
                <ChevronLeft aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
