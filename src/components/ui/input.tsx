import { cn } from "@/lib/utils/cn";

export function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-md border border-line bg-surface px-3.5 text-body text-foreground shadow-soft transition-colors placeholder:text-disabled-ink selection:bg-brand-subtle focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary/35 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-sale aria-invalid:focus-visible:border-sale aria-invalid:focus-visible:outline-sale/35",
        className,
      )}
      {...props}
    />
  );
}