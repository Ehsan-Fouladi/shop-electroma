/** UI-only delivery estimates. No carrier or payment service is connected. */
export const DELIVERY_OPTIONS = [
  {
    id: "standard",
    title: "ارسال استاندارد",
    description: "تحویل نمایشی طی ۲ تا ۴ روز کاری",
    fee: 120_000,
    days: "۲ تا ۴ روز کاری",
  },
  {
    id: "express",
    title: "ارسال سریع",
    description: "تحویل نمایشی در روز کاری بعد",
    fee: 240_000,
    days: "روز کاری بعد",
  },
] as const;

export const DEFAULT_DELIVERY_ID = "standard";
