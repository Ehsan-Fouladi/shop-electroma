import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[background-color,color,box-shadow,border-color,transform] duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:bg-brand-hover",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-surface-muted",
        outline:
          "border border-line bg-surface text-foreground hover:border-line-strong hover:bg-surface-soft",
        subtle: "bg-brand-soft text-brand-active hover:bg-brand-subtle",
        ghost: "text-body hover:bg-surface-soft hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-soft hover:bg-sale/90",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3.5 text-label [&_svg:not([class*='size-'])]:size-4",
        default: "h-11 px-5 text-body",
        lg: "h-12 px-7 text-body-lg sm:h-13 sm:text-title-sm",
        icon: "size-11",
        "icon-sm": "size-9 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
