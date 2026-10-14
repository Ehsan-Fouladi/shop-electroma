"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortKey } from "@/lib/catalog/query";
import { cn } from "@/lib/utils/cn";

interface SortSelectProps {
  value: SortKey;
  options: { value: SortKey; label: string }[];
  /** Pathname the select navigates on (keeps the page, rewrites the query). */
  basePath: string;
  className?: string;
}

/**
 * Sorting control for catalogue toolbars. It re-writes the `sort` parameter of
 * the current URL and drops pagination, so the visitor always lands on page 1.
 */
export function SortSelect({
  value,
  options,
  basePath,
  className,
}: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChange = (next: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", next);
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath, { scroll: false });
  };

  const currentLabel =
    options.find((o) => o.value === value)?.label ?? "مرتب‌سازی";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ArrowUpDown
        className="hidden size-4 shrink-0 text-subtle-ink sm:block"
        aria-hidden
      />
      <span className="hidden shrink-0 text-label text-subtle-ink sm:block">
        مرتب‌سازی:
      </span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          aria-label="مرتب‌سازی نتایج"
          className="w-[7.75rem] min-w-0 sm:w-44 [&>span]:truncate"
        >
          <SelectValue placeholder={currentLabel}>{currentLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
