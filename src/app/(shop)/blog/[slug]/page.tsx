import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  CheckCircle2,
  Clock,
  HelpCircle,
  ListOrdered,
  User,
} from "lucide-react";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container, Section } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";
import { blogPosts, getPost } from "@/data/blog";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/constants/site";
import { formatPersianDate } from "@/lib/formatters/date";
import { toPersianDigits } from "@/lib/formatters/number";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "مقاله یافت نشد" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      siteName: siteConfig.name,
      images: post.image ? [{ url: `${siteConfig.url}${post.image}` }] : undefined,
    },
  };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const recommendedProducts = post.recommendedProductIds
    ? products.filter((p) => post.recommendedProductIds?.includes(p.id))
    : [];

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    image: post.image ? `${siteConfig.url}${post.image}` : `${siteConfig.url}/favicon.svg`,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole || "کارشناس بررسی سخت‌افزار",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/favicon.svg`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };

  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }
      : null;

  return (
    <article className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Header Banner */}
      <div className="border-b border-line bg-gradient-to-b from-brand-soft/30 to-surface py-8 sm:py-12">
        <Container size="narrow">
          <Breadcrumb
            items={[
              { label: "خانه", href: "/" },
              { label: "مجله تخصصی", href: "/blog" },
              { label: post.title },
            ]}
            className="mb-4"
          />

          <div className="flex flex-wrap items-center gap-3 text-caption text-subtle-ink">
            <span className="rounded-full bg-brand-soft px-3 py-1 font-bold text-brand-active">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" />
              منتشر شده: {formatPersianDate(post.publishedAt)}
            </span>
            {post.updatedAt && (
              <span className="flex items-center gap-1 text-disabled-ink">
                (به‌روزرسانی: {formatPersianDate(post.updatedAt)})
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {toPersianDigits(post.readingTime)} دقیقه زمان مطالعه
            </span>
          </div>

          <h1 className="mt-4 text-heading font-bold text-ink sm:text-display leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex max-sm:flex-col items-center gap-2 text-body-sm text-subtle-ink">
            <span className="flex items-center gap-1.5 font-medium text-ink">
              <User className="size-4 text-brand" />
              نویسنده: {post.author}
            </span>
            {post.authorRole && (
              <span className="text-caption text-disabled-ink">• {post.authorRole}</span>
            )}
          </div>
        </Container>
      </div>

      {/* Article Body */}
      <Section>
        <Container size="narrow">
          {/* Main Cover Image */}
          <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-surface-soft shadow-soft">
            <Image
              src={post.image || "/images/category/laptop.webp"}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 980px) 100vw, 980px"
            />
          </div>

          {/* Key Takeaways Box (Executive Summary / GEO Highlight) */}
          {post.takeaways && post.takeaways.length > 0 && (
            <div className="mb-8 rounded-2xl border border-primary/25 bg-brand-soft/40 p-6 shadow-soft">
              <h2 className="flex items-center gap-2 text-body font-bold text-ink sm:text-title">
                <CheckCircle2 className="size-5 text-primary" />
                نکات کلیدی و خلاصه اجرایی راهنما
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5 text-body-sm text-body leading-relaxed">
                {post.takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Table of Contents (Supporting H2 and H3) */}
          {post.sections && post.sections.length > 1 && (
            <nav
              aria-label="فهرست عناوین مقاله"
              className="mb-8 rounded-xl border border-line bg-surface p-5 shadow-soft"
            >
              <p className="flex items-center gap-2 text-body-sm font-bold text-ink">
                <ListOrdered className="size-4 text-brand" aria-hidden />
                فهرست عناوین و بخش‌های تفصیلی مقاله
              </p>
              <ol className="mt-3 flex flex-col gap-2.5 text-body-sm text-subtle-ink">
                {post.sections.map((sec, i) => (
                  <li key={sec.id} className="flex flex-col gap-1.5">
                    <a
                      href={`#${sec.id}`}
                      className="font-medium text-ink transition-colors hover:text-brand-active hover:underline"
                    >
                      {toPersianDigits(i + 1)}. {sec.title}
                    </a>
                    {sec.subsections && sec.subsections.length > 0 && (
                      <ul className="ms-4 flex flex-col gap-1 border-s border-line-subtle ps-3 text-caption text-subtle-ink">
                        {sec.subsections.map((sub, subIdx) => (
                          <li key={sub.id}>
                            <a
                              href={`#${sub.id}`}
                              className="transition-colors hover:text-brand-active hover:underline"
                            >
                              {toPersianDigits(i + 1)}.{toPersianDigits(subIdx + 1)} {sub.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Structured Sections with H2 and Nested H3 */}
          {post.sections && post.sections.length > 0 ? (
            <div className="flex flex-col gap-10">
              {post.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 flex flex-col gap-4 border-b border-line-subtle pb-8 last:border-0 last:pb-0"
                >
                  <h2 className="text-title font-bold text-ink sm:text-heading">
                    {section.title}
                  </h2>
                  <div className="flex flex-col gap-4 text-body text-body leading-loose sm:text-body-lg">
                    {section.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Subsections (H3) */}
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="mt-2 flex flex-col gap-6 ps-2">
                      {section.subsections.map((sub) => (
                        <div key={sub.id} id={sub.id} className="scroll-mt-24 flex flex-col gap-3">
                          <h3 className="text-body font-bold text-ink sm:text-title-sm">
                            {sub.title}
                          </h3>
                          <div className="flex flex-col gap-3 text-body-sm text-subtle-ink leading-relaxed sm:text-body">
                            {sub.content.map((p, pIdx) => (
                              <p key={pIdx}>{p}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-5 text-body text-body leading-loose sm:text-body-lg">
              {post.content ? (
                post.content.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
              ) : (
                <p>{post.excerpt}</p>
              )}
            </div>
          )}

          {/* Practical Comparison Table */}
          {post.table && (
            <div className="my-10 overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
              <div className="border-b border-line bg-surface-soft px-5 py-3.5">
                <h3 className="font-bold text-ink text-body-sm sm:text-title-sm">{post.table.title}</h3>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="w-full text-start max-sm:text-nowrap text-caption sm:text-body-sm">
                  <thead>
                    <tr className="border-b border-line bg-surface-soft/60">
                      {post.table.headers.map((h, i) => (
                        <th key={i} className="p-3 text-start font-bold text-ink">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-subtle">
                    {post.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-surface-soft/50">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 text-subtle-ink">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pre-purchase Practical Checklist */}
          {post.checklist && (
            <div className="my-10 rounded-2xl border border-primary/25 bg-brand-soft/30 p-5 sm:p-7 shadow-soft">
              <h3 className="flex items-center gap-2 text-body font-bold text-ink sm:text-title">
                <CheckCircle2 className="size-5 text-primary" />
                {post.checklist.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3 text-body-sm text-body leading-relaxed">
                {post.checklist.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="grid size-5.5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-caption font-bold">
                      {toPersianDigits(idx + 1)}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="my-10 rounded-xl border border-line bg-surface p-5 sm:p-7 shadow-soft">
              <h3 className="text-sm sm:text-title-sm font-bold text-ink mb-5 flex items-center gap-2">
                <HelpCircle className="size-5 text-brand" aria-hidden />
                پرسش‌های متداول و پاسخ‌های تخصصی
              </h3>
              <div className="flex flex-col gap-3.5">
                {post.faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl border border-line-subtle bg-surface-soft p-4 sm:p-5">
                    <h4 className="font-bold text-ink text-body-sm sm:text-body">{faq.q}</h4>
                    <p className="mt-2 text-caption text-subtle-ink leading-relaxed sm:text-body-sm">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author Box */}
          <div className="my-10 flex items-center gap-4 rounded-xl border border-line bg-surface p-5 shadow-soft">
            <span className="grid size-13 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-active">
              <User className="size-7" />
            </span>
            <div>
              <p className="font-bold text-ink text-body">{post.author}</p>
              <p className="mt-0.5 text-caption text-subtle-ink">
                {post.authorRole || "کارشناس ارشد تحلیل سخت‌افزار و عضو هیئت تحریریه مجله تخصصی الکتروما"}
              </p>
            </div>
          </div>

          {/* Recommended Products in Article */}
          {recommendedProducts.length > 0 && (
            <div className="my-10 border-t border-line pt-8">
              <h3 className="mb-4 text-title font-bold text-ink">کالاهای مرتبط و بررسی‌شده</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          <div className="border-t border-line pt-8">
            <h3 className="mb-4 text-title font-bold text-ink">سایر مقالات پیشنهادی</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <div
                  key={related.slug}
                  className="flex flex-col justify-between rounded-xl border border-line bg-surface p-4 shadow-soft transition-all hover:border-primary/40"
                >
                  <div>
                    <span className="text-caption font-medium text-brand">{related.category}</span>
                    <h4 className="mt-2 line-clamp-2 text-body-sm font-bold text-ink">
                      <Link href={`/blog/${related.slug}`} className="hover:text-brand-active">
                        {related.title}
                      </Link>
                    </h4>
                  </div>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="mt-3 text-caption font-bold text-brand hover:underline"
                  >
                    مطالعه مقاله ←
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
