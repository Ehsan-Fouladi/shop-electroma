import { cn } from "@/lib/utils/cn";
import type { OrderStatus, PaymentStatus, ReturnStatus } from "@/types/customer";

export const statusLabels: Record<OrderStatus | ReturnStatus | PaymentStatus, { label: string; className: string }> = {
  pending: { label: "در انتظار بررسی", className: "bg-warning-soft text-warning" },
  processing: { label: "در حال آماده‌سازی", className: "bg-brand-soft text-brand-active" },
  shipped: { label: "ارسال‌شده", className: "bg-brand-soft text-brand-active" },
  delivered: { label: "تحویل‌شده", className: "bg-success-soft text-success" },
  cancelled: { label: "لغوشده", className: "bg-surface-muted text-subtle-ink" },
  reviewing: { label: "در حال بررسی", className: "bg-warning-soft text-warning" },
  approved: { label: "تأییدشده", className: "bg-success-soft text-success" },
  rejected: { label: "ردشده", className: "bg-sale-soft text-sale" },
  refunded: { label: "بازپرداخت نمایشی", className: "bg-success-soft text-success" },
  "mock-pending": { label: "پرداخت نمایشی در انتظار تأیید", className: "bg-warning-soft text-warning" },
  "mock-complete": { label: "پرداخت نمایشی", className: "bg-success-soft text-success" },
};

export function StatusBadge({ status }: { status: OrderStatus | ReturnStatus | PaymentStatus }) {
  const item = statusLabels[status];
  return (
    <span className={cn("inline-flex w-fit items-center rounded-full px-2.5 py-1 text-caption font-medium", item.className)}>
      {item.label}
    </span>
  );
}