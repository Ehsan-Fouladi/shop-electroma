"use client";

import { useRecentlyViewedStore } from "@/store/shop-store";
import { useEffect } from "react";

export function ProductViewTracker({ productId }: { productId: string }) {
  const record = useRecentlyViewedStore((state) => state.record);

  useEffect(() => {
    record(productId);
  }, [productId, record]);

  return null;
}
