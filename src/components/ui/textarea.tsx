import { cn } from "@/lib/utils/cn";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-body text-foreground shadow-soft transition-colors placeholder:text-disabled-ink focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary/35 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-sale aria-invalid:focus-visible:border-sale aria-invalid:focus-visible:outline-sale/35",
        className,
      )}
      {...props}
    />
  );
}
