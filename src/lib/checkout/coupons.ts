/**
 * Frontend-only mock coupon definitions and validation logic for the Electroma checkout.
 *
 * NOTE: This is a purely client-side simulation mechanism for UI/UX testing and demonstration.
 * No real server or backend promotion engine is queried.
 */

export interface CouponDefinition {
  code: string;
  title: string;
  description: string;
  type: "percentage" | "fixed" | "free_shipping";
  /** Percentage (e.g. 10) or fixed amount in Tomans (e.g. 500000). */
  value: number;
  /** Maximum discount ceiling in Tomans for percentage discounts. */
  maxDiscount?: number;
  /** Minimum subtotal required to apply this coupon. */
  minSubtotal?: number;
}

/** Pre-configured mock coupons available for frontend demonstration. */
export const MOCK_COUPONS: Record<string, CouponDefinition> = {
  ELECTROMA: {
    code: "ELECTROMA",
    title: "تخفیف ۱۰٪ باشگاه مشتریان",
    description: "۱۰٪ تخفیف روی کل فاکتور تا سقف ۲ میلیون تومان",
    type: "percentage",
    value: 10,
    maxDiscount: 2_000_000,
    minSubtotal: 500_000,
  },
  WELCOME: {
    code: "WELCOME",
    title: "هدیه اولین خرید",
    description:
      "۵۰۰,۰۰۰ تومان تخفیف مستقیم برای سفارش‌های بالای ۱ میلیون تومان",
    type: "fixed",
    value: 500_000,
    minSubtotal: 1_000_000,
  },
  YALDA: {
    code: "YALDA",
    title: "جشنواره یلدا",
    description: "۱,۰۰۰,۰۰۰ تومان تخفیف روی سفارش‌های بالای ۳ میلیون تومان",
    type: "fixed",
    value: 1_000_000,
    minSubtotal: 3_000_000,
  },
  SPECIAL20: {
    code: "SPECIAL20",
    title: "تخفیف ویژه ۲۰ درصدی",
    description: "۲۰٪ تخفیف تا سقف ۵ میلیون تومان برای سفارش‌های منتخب",
    type: "percentage",
    value: 20,
    maxDiscount: 5_000_000,
    minSubtotal: 2_000_000,
  },
};

export interface CouponValidationResult {
  valid: boolean;
  coupon?: CouponDefinition;
  discountAmount: number;
  freeShippingDiscount?: boolean;
  errorMessage?: string;
}

/**
 * Validates a coupon code against mock definitions and computes the discount amount.
 * Normalizes input by trimming whitespace and converting to uppercase.
 */
export function validateMockCoupon(
  rawCode: string,
  subtotal: number,
  shippingFee: number = 0,
): CouponValidationResult {
  const normalized = rawCode.trim().toUpperCase();

  if (!normalized) {
    return {
      valid: false,
      discountAmount: 0,
      errorMessage: "لطفاً کد تخفیف را وارد کنید.",
    };
  }

  const coupon = MOCK_COUPONS[normalized];

  if (!coupon) {
    return {
      valid: false,
      discountAmount: 0,
      errorMessage:
        "کد تخفیف وارد شده نامعتبر است یا منقضی شده است. کدهای نمونه آزمایشی: ELECTROMA یا WELCOME یا YALDA",
    };
  }

  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      valid: false,
      discountAmount: 0,
      errorMessage: `این کد تخفیف تنها برای سفارش‌های بالای ${coupon.minSubtotal.toLocaleString("fa-IR")} تومان قابل اعمال است.`,
    };
  }

  let discountAmount = 0;
  let freeShippingDiscount = false;

  if (coupon.type === "fixed") {
    discountAmount = Math.min(coupon.value, subtotal);
  } else if (coupon.type === "percentage") {
    const calculated = Math.round((subtotal * coupon.value) / 100);
    discountAmount = coupon.maxDiscount
      ? Math.min(calculated, coupon.maxDiscount)
      : calculated;
  } else if (coupon.type === "free_shipping") {
    discountAmount = shippingFee;
    freeShippingDiscount = true;
  }

  return {
    valid: true,
    coupon,
    discountAmount,
    freeShippingDiscount,
  };
}
