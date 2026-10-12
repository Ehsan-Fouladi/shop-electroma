"use client";

import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center py-12">
      <Container size="narrow" className="flex flex-col items-center text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-sale-soft text-sale shadow-soft">
          <AlertTriangle className="size-8" aria-hidden />
        </span>

        <h1 className="mt-6 text-title font-bold text-ink sm:text-heading-lg">
          متأسفانه خطایی در پردازش رخ داد!
        </h1>
        <p className="mt-2 max-w-md text-body-sm text-subtle-ink leading-relaxed sm:text-body">
          مشکلی موقت در ارتباط با سامانه به وجود آمده است. می‌توانید صفحه را مجدداً تلاش کنید یا به صفحه اصلی بازگردید.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => reset()} size="lg" className="gap-2">
            <RotateCcw className="size-4" aria-hidden />
            تلاش مجدد
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/">
              <Home className="size-4" aria-hidden />
              بازگشت به صفحه اصلی
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
