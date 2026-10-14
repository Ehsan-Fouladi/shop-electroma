import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Tag,
  User,
} from "lucide-react";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { blogPosts, getFeaturedPost } from "@/data/blog";
import { formatPersianDate } from "@/lib/formatters/date";
import { toPersianDigits } from "@/lib/formatters/number";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "مجله تخصصی و راهنمای خرید کالای دیجیتال",
  description:
    "جدیدترین مقالات تحلیلی، راهنماهای جامع خرید گوشی، لپ‌تاپ، هدفون و ساعت هوشمند، مقایسه‌های سخت‌افزاری و آموزش‌های کاربردی در مجله الکتروما.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "مجله تخصصی و راهنمای خرید کالای دیجیتال | الکتروما",
    description:
      "مرجع تخصصی بررسی سخت‌افزار، راهنمای خرید و آموزش فناوری‌های دیجیتال.",
    url: "/blog",
    images: [siteConfig.defaultOgImage],
  },
};

const CATEGORIES = [
  { id: "all", label: "همه مقالات" },
  { id: "راهنمای خرید", label: "راهنمای خرید" },
  { id: "آموزش و بررسی", label: "آموزش و بررسی" },
  { id: "تجهیزات تخصصی", label: "تجهیزات تخصصی" },
  { id: "سخت‌افزار", label: "سخت‌افزار" },
];

const PAGE_SIZE = 4;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const currentCategory = params.category || "all";

  // Filter posts by category
  const filteredPosts = blogPosts.filter((post) => {
    if (currentCategory === "all") return true;
    return post.category === currentCategory;
  });

  const total = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const rawPage = Number.parseInt(params.page ?? "1", 10);
  const currentPage = Math.min(
    Math.max(1, Number.isFinite(rawPage) ? rawPage : 1),
    totalPages,
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pagePosts = filteredPosts.slice(startIndex, startIndex + PAGE_SIZE);

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  // Build page URL helper preserving category
  const getPageUrl = (pageNumber: number) => {
    const sp = new URLSearchParams();
    if (currentCategory !== "all") sp.set("category", currentCategory);
    if (pageNumber > 1) sp.set("page", String(pageNumber));
    const qs = sp.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  const featured =
    currentCategory === "all" && currentPage === 1 ? getFeaturedPost() : null;

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <div className="border-b border-line bg-gradient-to-b from-brand-soft/40 to-surface py-8 sm:py-12">
        <Container>
          <Breadcrumb
            items={[
              { label: "خانه", href: "/" },
              { label: "مجله تخصصی و راهنمای خرید" },
            ]}
            className="mb-4"
          />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid size-10 place-items-center rounded-xl bg-primary text-white shadow-soft">
                  <BookOpen className="size-5" aria-hidden />
                </span>
                <span className="rounded-full bg-brand-soft px-3 py-1 text-caption font-bold text-brand-active">
                  مجله تخصصی الکتروما
                </span>
              </div>
              <h1 className="mt-3 text-heading font-bold text-ink sm:text-display">
                راهنمای خرید، بررسی‌های سخت‌افزاری و آموزش فناوری
              </h1>
              <p className="mt-2 max-w-2xl text-body-sm text-subtle-ink leading-relaxed sm:text-body">
                تحلیل‌های فنی بی‌طرفانه کارشناسان الکتروما جهت تسهیل انتخاب
                مطمئن، متناسب با نیاز و بودجه واقعی شما.
              </p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-1 sm:gap-2 border-t border-line-subtle pt-6">
            <span className="text-caption font-medium text-subtle-ink me-2">
              دسته‌بندی موضوعی:
            </span>
            {CATEGORIES.map((cat) => {
              const isActive = currentCategory === cat.id;
              const sp = new URLSearchParams();
              if (cat.id !== "all") sp.set("category", cat.id);
              const href = sp.toString() ? `/blog?${sp.toString()}` : "/blog";

              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-label font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white shadow-soft font-bold"
                      : "border border-line bg-surface text-body hover:bg-surface-soft hover:border-primary/30",
                  )}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Featured Article Card (when on page 1 of all categories) */}
      {featured && (
        <Section className="pb-4">
          <Container>
            <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-all duration-300 hover:border-primary/40 hover:shadow-card lg:flex-row">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-soft lg:w-1/2">
                <Image
                  src={featured.image || "/images/category/mobile.webp"}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <span className="absolute start-4 top-4 rounded-full bg-primary px-3 py-1 text-caption font-bold text-white shadow-soft">
                  مقاله ویژه تحریریه
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-caption text-subtle-ink">
                    <span className="rounded bg-brand-soft px-2.5 py-0.5 font-bold text-brand-active">
                      {featured.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {toPersianDigits(featured.readingTime)} دقیقه زمان مطالعه
                    </span>
                    <span>•</span>
                    <span>{formatPersianDate(featured.publishedAt)}</span>
                  </div>

                  <h2 className="mt-4 text-title font-bold text-ink transition-colors group-hover:text-brand-active sm:text-heading">
                    <Link href={`/blog/${featured.slug}`}>
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-body-sm text-subtle-ink leading-relaxed sm:text-body">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line-subtle pt-4">
                  <span className="flex items-center gap-1.5 text-caption font-medium text-ink">
                    <User className="size-4 text-subtle-ink" />
                    {featured.author}
                  </span>
                  <Button asChild size="sm" className="gap-1">
                    <Link href={`/blog/${featured.slug}`}>
                      مطالعه مقاله کامل
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          </Container>
        </Section>
      )}

      {/* Articles Grid */}
      <Section>
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-title font-bold text-ink sm:text-heading">
              {currentCategory === "all"
                ? "تازه‌ترین مقالات و راهنماها"
                : `مقالات در دسته‌بندی ${currentCategory}`}
            </h2>
            <span className="text-body-sm text-subtle-ink">
              {toPersianDigits(total)} مقاله یافت شد
            </span>
          </div>

          {pagePosts.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-12 text-center shadow-soft">
              <BookOpen className="size-10 text-disabled-ink" aria-hidden />
              <h3 className="text-body font-bold text-ink">
                مقاله‌ای در این دسته‌بندی یافت نشد
              </h3>
              <p className="text-caption text-subtle-ink">
                می‌توانید سایر دسته‌بندی‌ها را انتخاب کنید.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link href="/blog">نمایش همه مقالات</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {pagePosts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
                >
                  <div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-soft">
                      <Image
                        src={post.image || "/images/category/laptop.webp"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      />
                      <span className="absolute start-3 top-3 rounded-full bg-surface/90 px-2.5 py-0.5 text-caption font-bold text-ink backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-caption text-subtle-ink">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" />
                          {toPersianDigits(post.readingTime)} دقیقه
                        </span>
                        <span>•</span>
                        <span>{formatPersianDate(post.publishedAt)}</span>
                      </div>

                      <h3 className="mt-2.5 line-clamp-2 text-body font-bold text-ink transition-colors group-hover:text-brand-active sm:text-title-sm">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="mt-2.5 line-clamp-3 text-body-sm text-subtle-ink leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-line-subtle p-4 px-5 sm:px-6 flex items-center justify-between text-caption">
                    <span className="flex items-center gap-1.5 text-subtle-ink">
                      <User className="size-3.5" />
                      {post.author}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-bold text-brand transition-colors hover:underline"
                    >
                      مطالعه مقاله ←
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Working Blog Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="صفحه‌بندی مقالات مجله"
              className="mt-10 flex items-center justify-center gap-2"
            >
              <Link
                href={getPageUrl(currentPage - 1)}
                aria-label="صفحه قبلی مقالات"
                aria-disabled={isFirst}
                tabIndex={isFirst ? -1 : undefined}
                className={cn(
                  "flex h-10 items-center justify-center gap-1 rounded-md border text-body-sm transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 outline-none",
                  "size-10 sm:w-auto sm:px-3",
                  isFirst
                    ? "pointer-events-none border-line bg-surface text-disabled-ink opacity-60"
                    : "border-line bg-surface text-body hover:border-line-strong hover:bg-surface-soft",
                )}
              >
                <ChevronRight className="size-4" aria-hidden />
                <span className="hidden sm:inline">قبلی</span>
              </Link>

              <ul className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => {
                    const isCurrent = pageNum === currentPage;
                    return (
                      <li key={pageNum}>
                        <Link
                          href={getPageUrl(pageNum)}
                          aria-label={`صفحه ${toPersianDigits(pageNum)}`}
                          aria-current={isCurrent ? "page" : undefined}
                          className={cn(
                            "grid size-10 place-items-center rounded-md border text-body-sm tabular transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 outline-none",
                            isCurrent
                              ? "border-primary bg-primary font-bold text-primary-foreground"
                              : "border-line bg-surface text-body hover:border-line-strong hover:bg-surface-soft",
                          )}
                        >
                          {toPersianDigits(pageNum)}
                        </Link>
                      </li>
                    );
                  },
                )}
              </ul>

              <Link
                href={getPageUrl(currentPage + 1)}
                aria-label="صفحه بعدی مقالات"
                aria-disabled={isLast}
                tabIndex={isLast ? -1 : undefined}
                className={cn(
                  "flex h-10 items-center justify-center gap-1 rounded-md border text-body-sm transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 outline-none",
                  "size-10 sm:w-auto sm:px-3",
                  isLast
                    ? "pointer-events-none border-line bg-surface text-disabled-ink opacity-60"
                    : "border-line bg-surface text-body hover:border-line-strong hover:bg-surface-soft",
                )}
              >
                <span className="hidden sm:inline">بعدی</span>
                <ChevronLeft className="size-4" aria-hidden />
              </Link>
            </nav>
          )}
        </Container>
      </Section>
    </div>
  );
}
