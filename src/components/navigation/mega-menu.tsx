"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/types";

interface MegaMenuProps {
  item: NavItem;
  open: boolean;
  onOpen: () => void;
  onScheduleClose: () => void;
  onClose: () => void;
}

/** Hover/focus mega menu panel for desktop navigation. */
export function MegaMenu({ item, open, onOpen, onScheduleClose, onClose }: MegaMenuProps) {
  const hasColumns = Boolean(item.columns?.length);
  const artwork =
    item.href === "/category/laptops"
      ? { src: "/images/category/laptop.webp", alt: "لپ‌تاپ" }
      : item.href === "/category/headphones"
        ? { src: "/images/category/audio.webp", alt: "هدفون" }
        : null;

  if (!hasColumns) {
    return (
      <Link
        href={item.href}
        className="inline-flex items-center gap-1.5 rounded-sm px-3 py-2.5 text-body-sm font-medium text-ink transition-colors hover:bg-surface-soft hover:text-brand-active"
      >
        {item.title}
      </Link>
    );
  }

  return (
    <Popover
      open={open}
      onOpenChange={(next) => (next ? onOpen() : onClose())}
    >
      <PopoverTrigger
        onMouseEnter={onOpen}
        onMouseLeave={onScheduleClose}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-sm px-3 py-2.5 text-body-sm font-medium transition-colors",
          open ? "bg-brand-soft text-brand-active" : "text-ink hover:bg-surface-soft hover:text-brand-active",
        )}
      >
        {item.title}
        <ChevronDown
          className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={0}
        dir="rtl"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onMouseEnter={onOpen}
        onMouseLeave={onScheduleClose}
        onCloseAutoFocus={(event) => event.preventDefault()}
        className="w-[min(78vw,46rem)] rounded-lg p-5 shadow-raised"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {item.columns?.map((column) => (
            <div key={column.title} className="flex flex-col gap-2">
              <p className="text-label font-bold text-ink">{column.title}</p>
              <ul className="flex flex-col gap-0.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.title}`}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block rounded-sm px-2 py-1.5 text-body-sm text-ink transition-colors hover:bg-surface-soft hover:text-brand-active"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {artwork ? (
            <div className="relative min-h-28 overflow-hidden rounded-md bg-surface-soft">
              <Image
                src={artwork.src}
                alt={artwork.alt}
                fill
                sizes="(max-width: 1280px) 20vw, 220px"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-md bg-brand-soft px-4 py-3">
          <div>
            <p className="text-body-sm font-bold text-brand-active">پیشنهادهای ویژه این هفته</p>
            <p className="text-caption text-body">
              تخفیف‌های محدود روی پرچم‌داران موبایل، لپ‌تاپ و لوازم جانبی
            </p>
          </div>
          <Link
            href="/deals"
            onClick={onClose}
            className="shrink-0 text-label font-medium text-brand-active hover:underline"
          >
            مشاهده همه
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}