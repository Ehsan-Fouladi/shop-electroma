import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { campaignBanners } from "@/data/home";
import { cn } from "@/lib/utils/cn";

const [wideBanner, tallBanner] = campaignBanners;

/**
 * Merchandising campaign block: one dominant dark campaign plus a supporting
 * light banner — deliberately asymmetric so it does not read as another card row.
 */
export function CampaignSection() {
  return (
    <Section aria-labelledby="campaign-title">
      <Container className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-4">
        <h2 id="campaign-title" className="sr-only">
          کمپین‌های فروش
        </h2>

        <article className="relative overflow-hidden rounded-xl bg-ink text-white shadow-card lg:col-span-2">
          <div className="grid h-full items-stretch sm:grid-cols-2">
            <div className="order-2 flex flex-col items-start gap-4 p-5 sm:order-1 sm:p-7">
              <Badge
                variant="ink"
                className="gap-1.5 border border-white/15 bg-white/10 px-3 py-1"
              >
                <Sparkles className="size-3.5" aria-hidden />
                {wideBanner.eyebrow}
              </Badge>

              <p className="text-heading font-bold text-white sm:text-heading-lg">
                {wideBanner.title}
              </p>

              <p className="max-w-md text-body-sm text-white">
                {wideBanner.description}
              </p>

              {wideBanner.bullets ? (
                <ul className="flex flex-col gap-1.5">
                  {wideBanner.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-2 text-body-sm text-white/85"
                    >
                      <CheckCircle2
                        className="size-4 text-brand-subtle"
                        aria-hidden
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}

              <Button
                asChild
                className="mt-1 bg-white text-ink hover:bg-brand-soft hover:text-brand-active"
              >
                <Link href={wideBanner.href}>{wideBanner.cta}</Link>
              </Button>
            </div>

            <div className="relative order-1 min-h-44 sm:order-2 sm:min-h-full">
              <Image
                src={wideBanner.image}
                alt={wideBanner.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent sm:bg-gradient-to-l sm:from-ink/70 sm:via-ink/10 sm:to-transparent"
              />
            </div>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-xl border border-primary/15 bg-gradient-to-b from-brand-soft to-surface">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={tallBanner.image}
              alt={tallBanner.title}
              fill
              sizes="(max-width: 1024px) 100vw, 440px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col items-start gap-3 p-5">
            <Badge variant="brand">{tallBanner.eyebrow}</Badge>
            <p className="text-title font-bold text-ink">{tallBanner.title}</p>
            <p className="text-body-sm text-body">{tallBanner.description}</p>
            <Button asChild variant="outline" className={cn("mt-1 bg-surface")}>
              <Link href={tallBanner.href}>{tallBanner.cta}</Link>
            </Button>
          </div>
        </article>
      </Container>
    </Section>
  );
}
