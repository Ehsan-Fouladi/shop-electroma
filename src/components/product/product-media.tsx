"use client";

import Image from "next/image";

import { CategoryIcon } from "@/components/category/category-icon";
import { getCategory } from "@/data/categories";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types";
import { useState } from "react";

interface ProductMediaProps {
  product: Product;
  sizes: string;
  priority?: boolean;
  /** Extra classes applied to the <img> when a photo exists. */
  imageClassName?: string;
}

/**
 * Product imagery with a designed safe fallback: when a catalogue record has no photo
 * or an image fails to load, the card renders an accessible brand-tinted device plate
 * with the category icon and Electroma styling, preventing broken-image icons and CLS.
 */
export function ProductMedia({
  product,
  sizes,
  priority,
  imageClassName,
}: ProductMediaProps) {
  const [hasError, setHasError] = useState(false);
  const category = getCategory(product.categorySlug);

  if (product.image && !hasError) {
    return (
      <Image
        src={product.image}
        alt={product.title}
        fill
        priority={priority}
        sizes={sizes}
        onError={() => setHasError(true)}
        className={cn("object-contain p-2", imageClassName)}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={`تصویر کالا: ${product.title}`}
      className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface-soft via-surface to-brand-soft"
    >
      <span className="grid size-12 place-items-center rounded-md bg-surface/85 text-brand shadow-soft sm:size-14">
        <CategoryIcon
          name={category?.icon ?? "smartphone"}
          className="size-6 sm:size-7"
        />
      </span>
      {category ? (
        <span className="text-caption font-medium text-subtle-ink">
          {category.title}
        </span>
      ) : null}
    </span>
  );
}
