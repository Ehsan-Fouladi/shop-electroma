import Link from "next/link";
import { Construction } from "lucide-react";

import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

/**
 * Neutral placeholder for routes that are outside the current task scope.
 * It exists only so homepage navigation never lands on a 404; no page design
 * work is implied here.
 */
export function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Section>
      <Container size="narrow">
        <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-line-strong bg-surface p-6 sm:p-8">
          <span className="grid size-11 place-items-center rounded-md bg-surface-muted text-subtle-ink">
            <Construction className="size-5" aria-hidden />
          </span>
          <h1 className="text-heading font-bold text-ink">{title}</h1>
          <p className="text-body-sm text-body">
            {description ??
              "این مسیر در فاز فعلی پروژه فقط به‌عنوان مقصد لینک‌های صفحه اصلی ساخته شده است و طراحی آن خارج از محدوده این تسک قرار دارد."}
          </p>
          <Button asChild variant="outline" className="mt-1">
            <Link href="/">بازگشت به صفحه اصلی</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}