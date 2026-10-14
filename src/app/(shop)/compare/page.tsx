import type { Metadata } from "next";

import { CompareView } from "@/components/catalog/compare-view";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "مقایسه تخصصی محصولات",
  description:
    "مقایسه مشخصات فنی، قیمت و ویژگی‌های کالاهای دیجیتال در فروشگاه الکتروما.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "مقایسه تخصصی محصولات | الکتروما",
    description:
      "مقایسه مشخصات فنی، قیمت و ویژگی‌های کالاهای دیجیتال در فروشگاه الکتروما.",
    url: "/compare",
    images: [siteConfig.defaultOgImage],
  },
};

export default function ComparePage() {
  return <CompareView />;
}
