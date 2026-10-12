"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";

/**
 * Brand filter for the brand index. The term lives in the URL so the filtered
 * list stays shareable and server-rendered.
 */
export function BrandSearchInput({ initialValue = "" }: { initialValue?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const term = value.trim();
    router.push(term ? `/brands?q=${encodeURIComponent(term)}` : "/brands", {
      scroll: false,
    });
  };

  return (
    <form onSubmit={submit} role="search" className="relative w-full sm:max-w-sm">
      <Search
        className="pointer-events-none absolute inset-y-0 start-3.5 my-auto size-4 text-subtle-ink"
        aria-hidden
      />
      <Input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="جستجوی برند…"
        aria-label="جستجوی برند"
        className="pe-20 ps-10 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
      />
      <Button type="submit" size="sm" className="absolute inset-y-1.5 end-1.5 my-auto">
        جستجو
      </Button>
      {value ? (
        <Link
          href="/brands"
          onClick={() => setValue("")}
          aria-label="پاک کردن جستجو"
          className="absolute -bottom-7 start-0 text-caption text-subtle-ink hover:text-brand"
        >
          <X className="me-1 inline size-3.5" aria-hidden />
          حذف جستجو
        </Link>
      ) : null}
    </form>
  );
}
