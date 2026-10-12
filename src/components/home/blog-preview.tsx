import Link from "next/link";
import { ChevronLeft, Clock3 } from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { BlogCover } from "@/components/blog/blog-cover";
import { Badge } from "@/components/ui/badge";
import { getLatestPosts } from "@/data/blog";
import { formatPersianDate } from "@/lib/formatters/date";
import { toPersianDigits } from "@/lib/formatters/number";

/**
 * Editorial preview: one featured article plus a compact list, so the block has
 * a clear hierarchy and does not compete with the shopping sections.
 */
export function BlogPreview() {
  const [featured, ...rest] = getLatestPosts(4);

  if (!featured) return null;

  return (
    <Section aria-labelledby="blog-title">
      <Container className="flex flex-col gap-4 sm:gap-5">
        <SectionHeading
          title="راهنمای خرید و مقالات"
          subtitle="پیش از خرید، آگاهانه انتخاب کنید"
          href="/blog"
          linkLabel="همه مقالات"
        />
        <h2 id="blog-title" className="sr-only">
          مقالات و راهنمای خرید
        </h2>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          <article className="group lg:col-span-2">
            <Link
              href={`/blog/${featured.slug}`}
              className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-card transition-[border-color,box-shadow] hover:border-line-strong hover:shadow-card"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-surface-soft sm:aspect-[21/9] lg:aspect-video">
                <BlogCover
                  post={featured}
                  sizes="(max-width: 1024px) 100vw, 780px"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <Badge variant="brand">{featured.category}</Badge>
                  <span className="flex items-center gap-1 text-caption text-subtle-ink">
                    <Clock3 className="size-3.5" aria-hidden />
                    {toPersianDigits(featured.readingTime)} دقیقه مطالعه
                  </span>
                </div>
                <h3 className="text-title font-bold text-ink transition-colors group-hover:text-brand-active sm:text-heading">
                  {featured.title}
                </h3>
                <p className="line-clamp-2 text-body-sm text-body">{featured.excerpt}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-1 text-caption text-subtle-ink">
                  <span>{formatPersianDate(featured.publishedAt)}</span>
                  <span className="inline-flex items-center gap-1 font-medium text-brand">
                    ادامه مطلب
                    <ChevronLeft className="size-3.5" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          </article>

          <div className="flex flex-col gap-3">
            {rest.map((post) => (
              <article key={post.slug} className="group flex-1">
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex h-full items-stretch gap-3 overflow-hidden rounded-lg border border-line bg-card p-3 transition-[border-color,box-shadow] hover:border-line-strong hover:shadow-soft"
                >
                  <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-md bg-surface-soft sm:w-28">
                    <BlogCover
                      post={post}
                      sizes="120px"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-1.5 py-0.5">
                    <span className="text-caption font-medium text-brand">
                      {post.category}
                    </span>
                    <h3 className="line-clamp-2 text-body-sm font-medium leading-7 text-foreground transition-colors group-hover:text-brand-active">
                      {post.title}
                    </h3>
                    <span className="mt-auto flex items-center gap-2 text-caption text-subtle-ink">
                      <Clock3 className="size-3.5" aria-hidden />
                      {toPersianDigits(post.readingTime)} دقیقه
                      <span aria-hidden>•</span>
                      {formatPersianDate(post.publishedAt)}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}