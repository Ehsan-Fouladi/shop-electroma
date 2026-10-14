import Image from "next/image";
import { BookOpenText } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import type { BlogPost } from "@/types";

interface BlogCoverProps {
  post: BlogPost;
  sizes: string;
  className?: string;
}

/** Article cover with an editorial gradient fallback when no photo exists. */
export function BlogCover({ post, sizes, className }: BlogCoverProps) {
  if (post.image) {
    return (
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_20%_20%,var(--color-brand-subtle),transparent_60%),radial-gradient(circle_at_80%_80%,var(--color-background-muted,var(--color-background-subtle)),transparent_55%)] bg-surface-soft",
        className,
      )}
    >
      <span className="grid size-14 place-items-center rounded-md bg-surface/90 text-brand shadow-soft sm:size-16">
        <BookOpenText className="size-7 sm:size-8" />
      </span>
      <span className="rounded-full bg-surface/90 px-3 py-1 text-caption font-medium text-body shadow-soft">
        {post.category}
      </span>
    </span>
  );
}
