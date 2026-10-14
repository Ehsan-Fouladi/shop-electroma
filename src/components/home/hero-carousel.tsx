"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { SearchField } from "@/components/navigation/search-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/data/home";
import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_MS = 3000;

const themeClasses: Record<string, string> = {
  brand: "bg-gradient-to-bl from-brand-soft via-surface to-surface-muted",
  slate: "bg-gradient-to-bl from-surface-muted via-surface to-brand-soft",
  warm: "bg-gradient-to-bl from-warning-soft via-surface to-brand-soft",
};

/**
 * Homepage hero carousel.
 * Implemented with native RTL-aware scroll snap and automated timer transitions.
 * Supports manual navigation recovery, pause/play toggling, reduced-motion awareness,
 * keyboard accessibility, and precise pagination synchronization.
 */
export function HeroCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const slideCount = heroSlides.length;
  const isProgrammaticRef = useRef(false);
  const programmaticTimeoutRef = useRef<number | undefined>(undefined);
  const timerRef = useRef<number | undefined>(undefined);
  const recoveryTimeoutRef = useRef<number | undefined>(undefined);

  // Check reduced-motion preference and respond to dynamic changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);

    const listener = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  const scrollToIndex = useCallback(
    (targetIndex: number, smooth = true) => {
      const el = scrollerRef.current;
      if (!el) return;
      const width = el.clientWidth;
      isProgrammaticRef.current = true;

      // RTL: moving "forward" means decreasing (negative) scrollLeft.
      el.scrollTo({
        left: -targetIndex * width,
        behavior: smooth && !reduceMotion ? "smooth" : "instant",
      });

      if (programmaticTimeoutRef.current) {
        window.clearTimeout(programmaticTimeoutRef.current);
      }
      programmaticTimeoutRef.current = window.setTimeout(() => {
        isProgrammaticRef.current = false;
      }, 500);
    },
    [reduceMotion],
  );

  // Sync index during manual touch/drag scrolling
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (isProgrammaticRef.current) return;
      const width = el.clientWidth || 1;
      const next = Math.round(Math.abs(el.scrollLeft) / width);
      setIndex(Math.max(0, Math.min(slideCount - 1, next)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [slideCount]);

  // Keep active slide centered on window resize
  useEffect(() => {
    const onResize = () => {
      const el = scrollerRef.current;
      if (!el) return;
      el.scrollTo({
        left: -index * el.clientWidth,
        behavior: "instant",
      });
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [index]);

  // Autoplay timer controller
  const startAutoplay = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = undefined;
    }

    if (userPaused || hoverPaused || searchFocused || slideCount < 2) {
      return;
    }

    timerRef.current = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setIndex((current) => {
        const next = (current + 1) % slideCount;
        scrollToIndex(next, true);
        return next;
      });
    }, AUTOPLAY_MS);
  }, [userPaused, hoverPaused, searchFocused, slideCount, scrollToIndex]);

  // Reset autoplay whenever active conditions change
  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, [startAutoplay]);

  // Pause on hidden document tab and resume on visible
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startAutoplay();
      } else if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [startAutoplay]);

  // Manual navigation with recovery timeout
  const goTo = (next: number) => {
    const wrapped = (next + slideCount) % slideCount;
    setIndex(wrapped);
    scrollToIndex(wrapped, true);

    // Cancel current autoplay timer during manual navigation
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = undefined;
    }

    // Reset and restart autoplay timer so user gets a full 6s on this slide
    if (recoveryTimeoutRef.current) {
      window.clearTimeout(recoveryTimeoutRef.current);
      recoveryTimeoutRef.current = undefined;
    }
    if (!userPaused) {
      startAutoplay();
    }
  };

  // Component cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (recoveryTimeoutRef.current)
        window.clearTimeout(recoveryTimeoutRef.current);
      if (programmaticTimeoutRef.current)
        window.clearTimeout(programmaticTimeoutRef.current);
    };
  }, []);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="پیشنهادهای اصلی الکتروما"
      className="border-b border-line"
    >
      <div
        className={cn(
          "relative overflow-hidden transition-colors duration-700",
          themeClasses[heroSlides[index].theme],
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 end-[-6rem] size-[26rem] rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 start-[-4rem] size-[22rem] rounded-full bg-brand-subtle/50 blur-3xl"
        />

        <Container className="relative">
          {/* Main slide display area with hover pause */}
          <div
            ref={scrollerRef}
            data-rail
            aria-label="اسلایدهای کمپین"
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
            onMouseEnter={() => setHoverPaused(true)}
            onMouseLeave={() => setHoverPaused(false)}
          >
            {heroSlides.map((slide, slideIndex) => (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${toPersianDigits(slideIndex + 1)} از ${toPersianDigits(slideCount)}`}
                inert={slideIndex !== index}
                className="w-full shrink-0 snap-center"
              >
                <div className="grid items-center gap-5 py-4 sm:gap-7 sm:py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:py-9">
                  {/* Content */}
                  <div className="order-2 flex flex-col items-start gap-4 lg:order-1 lg:gap-5">
                    <Badge
                      variant="brand"
                      className="gap-1.5 px-3 py-1 text-label shadow-soft backdrop-blur"
                    >
                      <Sparkles className="size-3.5" aria-hidden />
                      {slide.eyebrow}
                    </Badge>

                    <h2 className="text-heading-lg font-bold leading-tight text-ink sm:text-display lg:text-display-lg">
                      {slide.title}
                    </h2>

                    <p className="max-w-xl text-body text-body sm:text-body-lg">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <Button asChild size="lg">
                        <Link href={slide.primaryCta.href}>
                          {slide.primaryCta.label}
                          <ChevronLeft aria-hidden />
                        </Link>
                      </Button>
                      {slide.secondaryCta ? (
                        <Button
                          asChild
                          size="lg"
                          variant="outline"
                          className="bg-surface/70"
                        >
                          <Link href={slide.secondaryCta.href}>
                            {slide.secondaryCta.label}
                          </Link>
                        </Button>
                      ) : null}
                    </div>

                    {slide.stats ? (
                      <dl className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2">
                        {slide.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="flex items-center gap-2"
                          >
                            <ShieldCheck
                              className="size-4 text-brand"
                              aria-hidden
                            />
                            <dt className="text-label text-subtle-ink">
                              {stat.label}
                            </dt>
                            <dd className="text-body-sm font-bold text-ink">
                              {stat.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </div>

                  {/* Media */}
                  <div className="order-1 lg:order-2">
                    <div className="relative overflow-hidden rounded-lg border border-white/70 bg-surface/60 shadow-card backdrop-blur-sm lg:rounded-xl">
                      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[5/4]">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          priority={slideIndex === 0}
                          sizes="(max-width: 1024px) 100vw, 640px"
                          className="object-cover"
                        />
                      </div>
                      {slide.promoBadge ? (
                        <Badge
                          variant="sale"
                          className="absolute top-3 start-3 gap-1 px-2.5 py-1 shadow-raised"
                        >
                          {slide.promoBadge}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls: Pagination, Counter, Interactive Play/Pause, Next/Prev */}
          <div className="flex items-center justify-between gap-4 pb-5 sm:pb-6">
            <div className="flex items-center gap-3">
              <ul
                className="flex items-center gap-0"
                aria-label="انتخاب اسلاید"
              >
                {heroSlides.map((slide, slideIndex) => (
                  <li key={slide.id}>
                    <button
                      type="button"
                      onClick={() => goTo(slideIndex)}
                      aria-label={`نمایش اسلاید ${toPersianDigits(slideIndex + 1)}: ${slide.title}`}
                      aria-current={slideIndex === index}
                      className="group flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <span
                        className={cn(
                          "block h-2 rounded-full transition-all duration-300",
                          slideIndex === index
                            ? "w-7 bg-primary"
                            : "w-2 bg-ink/20 group-hover:bg-ink/40",
                        )}
                      />
                    </button>
                  </li>
                ))}
              </ul>
              <span className="tabular text-label text-subtle-ink">
                {toPersianDigits(index + 1)} / {toPersianDigits(slideCount)}
              </span>

              {/* Accessible interactive Play/Pause toggle */}
              <button
                type="button"
                onClick={() => setUserPaused((prev) => !prev)}
                aria-label={userPaused ? "شروع پخش خودکار" : "توقف پخش خودکار"}
                className="hidden items-center gap-1.5 rounded-md border border-line-subtle bg-surface/60 px-2.5 py-1 text-label text-subtle-ink backdrop-blur-sm transition-colors hover:bg-surface hover:text-ink sm:flex"
              >
                {userPaused ? (
                  <>
                    <Play className="size-3 text-brand" aria-hidden />
                    <span>شروع پخش</span>
                  </>
                ) : (
                  <>
                    <Pause className="size-3 text-brand" aria-hidden />
                    <span>پخش خودکار</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full bg-surface/80 backdrop-blur"
                onClick={() => goTo(index - 1)}
                aria-label="اسلاید قبلی"
              >
                <ChevronRight aria-hidden />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full bg-surface/80 backdrop-blur"
                onClick={() => goTo(index + 1)}
                aria-label="اسلاید بعدی"
              >
                <ChevronLeft aria-hidden />
              </Button>
            </div>
          </div>

          {/* Hero search */}
          <div
            className="pb-5 sm:pb-7 lg:pb-9"
            onFocus={() => setSearchFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setSearchFocused(false);
              }
            }}
          >
            <div className="mx-auto max-w-3xl">
              <div className="hidden sm:block">
                <SearchField tone="elevated" size="lg" />
              </div>
              <p className="mt-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-label text-subtle-ink">
                <span>جستجو در بیش از ۹٬۰۰۰ کالای دیجیتال</span>
                <span className="hidden sm:inline">•</span>
                <span>ضمانت اصالت کالا</span>
                <span className="hidden sm:inline">•</span>
                <span>ارسال سریع به سراسر ایران</span>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
