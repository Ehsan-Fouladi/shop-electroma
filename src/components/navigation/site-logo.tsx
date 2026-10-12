import Link from "next/link";

import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

/** Brand mark + wordmark. The mark is drawn inline so no asset is required. */
export function SiteLogo({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center gap-2.5 rounded-sm", className)}
      aria-label={`${siteConfig.name} — صفحه اصلی`}
    >
      <span className="grid size-10 place-items-center rounded-md bg-gradient-to-br from-primary to-brand-active shadow-soft">
        <svg viewBox="0 0 24 24" className="size-6 text-white" aria-hidden fill="none">
          <path
            d="M13.2 2.5 5.5 13.2h5.1l-1 8.3 7.9-10.9h-5.2l1-8.1Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-title font-bold",
            onDark ? "text-white" : "text-ink",
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            "mt-0.5 text-[9px] font-medium tracking-[0.22em]",
            onDark ? "text-white/60" : "text-subtle-ink",
          )}
        >
          {siteConfig.latinName}
        </span>
      </span>
    </Link>
  );
}