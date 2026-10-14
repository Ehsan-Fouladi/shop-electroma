import type { Metadata } from "next";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/layout/container";
import { WishlistGrid } from "@/components/product/wishlist-grid";

export const metadata: Metadata = {
  title: "لیست علاقه‌مندی‌ها",
  description: "کالاهای نشان‌شده و ذخیره‌شده شما در فروشگاه الکتروما.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/wishlist" },
};

export default function WishlistPage() {
  return (
    <Container className="flex flex-col gap-6 py-5 sm:gap-7 sm:py-7 lg:py-9">
      <Breadcrumb
        items={[{ label: "خانه", href: "/" }, { label: "علاقه‌مندی‌ها" }]}
      />
      <WishlistGrid showHeading={true} />
    </Container>
  );
}
