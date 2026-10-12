import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const alertVariants = cva(
  "relative w-full rounded-lg border p-3.5 text-body-sm [&>svg~*]:pe-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:end-3.5 [&>svg]:top-3.5 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "border-line bg-surface text-ink",
        destructive:
          "border-sale/30 bg-sale-soft/70 text-sale [&>svg]:text-sale",
        success:
          "border-success/30 bg-success-soft text-success [&>svg]:text-success",
        warning:
          "border-warning/30 bg-warning-soft text-warning [&>svg]:text-warning",
        brand:
          "border-primary/25 bg-brand-soft/60 text-brand-active [&>svg]:text-brand-active",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      data-slot="alert-title"
      className={cn("mb-1 font-bold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-body-sm leading-relaxed", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
