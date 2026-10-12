"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatNumber, toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import { FormEvent, useEffect, useState } from "react";

interface PriceFilterProps {
  basePath: string;
  minPrice: number | null;
  maxPrice: number | null;
  /** Cheapest / most expensive product currently in scope. */
  bounds: { min: number; max: number };
  className?: string;
}

/** Accepts Persian or Latin digits and keeps only the numeric value. */
function parseAmount(value: string): number | null {
  const normalized = value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[^\d]/g, "");
  if (!normalized) return null;
  const parsed = Number.parseInt(normalized, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Min/max price form. Values are applied through the URL so the filtered view
 * stays shareable; submitting clears pagination.
 */
export function PriceFilter({ basePath, minPrice, maxPrice, bounds, className }: PriceFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [min, setMin] = useState(minPrice ? String(minPrice) : "");
  const [max, setMax] = useState(maxPrice ? String(maxPrice) : "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMin(minPrice ? String(minPrice) : "");
    setMax(maxPrice ? String(maxPrice) : "");
  }, [minPrice, maxPrice]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextMin = parseAmount(min);
    const nextMax = parseAmount(max);

    if (nextMin !== null && nextMax !== null && nextMin > nextMax) {
      setError("کمترین قیمت باید کمتر از بیشترین قیمت باشد.");
      return;
    }

    setError(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (nextMin !== null) params.set("min", String(nextMin));
    else params.delete("min");
    if (nextMax !== null) params.set("max", String(nextMax));
    else params.delete("max");

    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath, { scroll: false });
  };

  return (
    <form onSubmit={submit} className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        <label className="flex-1">
          <span className="sr-only">کمترین قیمت (تومان)</span>
          <Input
            value={min}
            onChange={(event) => {
              setMin(event.target.value);
              if (error) setError(null);
            }}
            inputMode="numeric"
            placeholder="از"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "price-filter-error" : undefined}
            className="tabular h-10 text-body-sm"
          />
        </label>
        <span className="text-subtle-ink" aria-hidden>
          —
        </span>
        <label className="flex-1">
          <span className="sr-only">بیشترین قیمت (تومان)</span>
          <Input
            value={max}
            onChange={(event) => {
              setMax(event.target.value);
              if (error) setError(null);
            }}
            inputMode="numeric"
            placeholder="تا"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "price-filter-error" : undefined}
            className="tabular h-10 text-body-sm"
          />
        </label>
      </div>

      {error ? (
        <p id="price-filter-error" role="alert" className="text-caption text-sale">
          {error}
        </p>
      ) : (
        <p className="text-caption text-disabled-ink">
          بازه موجود: {formatNumber(bounds.min)} تا {formatNumber(bounds.max)} تومان
        </p>
      )}

      <Button type="submit" variant="secondary" size="sm" className="self-start">
        اعمال قیمت
      </Button>

      {minPrice !== null || maxPrice !== null ? (
        <p className="tabular text-caption text-subtle-ink">
          فیلتر فعال:{" "}
          {minPrice !== null ? `از ${toPersianDigits(formatNumber(minPrice))}` : "از ابتدا"} تا{" "}
          {maxPrice !== null ? toPersianDigits(formatNumber(maxPrice)) : "بی‌نهایت"} تومان
        </p>
      ) : null}
    </form>
  );
}