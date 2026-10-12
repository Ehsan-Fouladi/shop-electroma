import { cn } from "@/lib/utils/cn";

/** Page-level container shared by every section so widths never drift. */
function Container({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "wide" | "narrow" }) {
  return (
    <div
      data-slot="container"
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "default" && "max-w-[1360px]",
        size === "wide" && "max-w-[1520px]",
        size === "narrow" && "max-w-[980px]",
        className,
      )}
      {...props}
    />
  );
}

/** Vertical rhythm wrapper — keeps the homepage section spacing consistent. */
function Section({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return <section data-slot="section" className={cn("section-y", className)} {...props} />;
}

export { Container, Section };
