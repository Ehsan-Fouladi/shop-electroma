"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ProductShareButton({ productTitle }: { productTitle: string }) {
  const handleShareDesktop = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("لینک محصول با موفقیت کپی شد.");
  };

  const handleShareMobile = async () => {
    if (!navigator.share) {
      console.log("2. مرورگر از navigator.share پشتیبانی نمی‌کند");
      toast.error(
        "مرورگر شما از قابلیت اشتراک‌ گذاری مستقیم پشتیبانی نمی‌کند.",
      );
      return;
    }

    try {
      console.log("3. در حال باز کردن منوی اشتراک‌گذاری سیستم...");
      await navigator.share({
        title: productTitle,
        text: `این محصول جذاب را ببینید: ${productTitle}`,
        url: window.location.href,
      });
      console.log("4. اشتراک‌گذاری با موفقیت کامل انجام شد");
    } catch (error: any) {
      console.log("5. خطای catch گرفته شد:", error.name, error.message);
      if (error.name !== "AbortError") {
        toast.error("مشکلی در اشتراک‌ گذاری پیش آمد.");
      } else {
        console.log("6. کاربر خودش پنجره اشتراک‌گذاری را بست (AbortError)");
      }
    }
  };

  return (
    <>
      <Button
        className="hidden lg:flex"
        type="button"
        variant="outline"
        size="sm"
        aria-label={`اشتراک‌گذاری محصول ${productTitle}`}
        title={`اشتراک‌گذاری محصول ${productTitle}`}
        onClick={handleShareDesktop}
      >
        <Share2 aria-hidden />
        اشتراک‌گذاری
      </Button>
      <Button
        className="flex lg:hidden"
        type="button"
        variant="outline"
        size="sm"
        aria-label={`اشتراک‌گذاری محصول ${productTitle}`}
        title={`اشتراک‌گذاری محصول ${productTitle}`}
        onClick={handleShareMobile}
      >
        <Share2 aria-hidden />
        اشتراک‌گذاری
      </Button>
    </>
  );
}
