"use client";

import { AccountPageHeading } from "@/components/account/account-page-heading";
import { WishlistGrid } from "@/components/product/wishlist-grid";

export default function AccountWishlistPage() {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeading
        title="علاقه‌مندی‌های من"
        description="کالاهایی که برای بررسی بیشتر یا خرید در آینده ذخیره کرده‌اید."
      />
      <WishlistGrid showHeading={false} />
    </div>
  );
}
