import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-caption",
        "text-label",
        "text-body-sm",
        "text-body",
        "text-body-lg",
        "text-title-sm",
        "text-title",
        "text-heading",
        "text-heading-lg",
        "text-display",
        "text-display-lg",
      ],
      "text-color": [
        "text-brand",
        "text-brand-hover",
        "text-brand-active",
        "text-brand-soft",
        "text-brand-subtle",
        "text-brand-foreground",
        "text-ink",
        "text-ink-soft",
        "text-ink-muted",
        "text-subtle-ink",
        "text-disabled-ink",
        "text-body-text",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
