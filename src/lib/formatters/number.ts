const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Converts Latin digits inside any string to Persian digits. */
export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => FA_DIGITS[Number(digit)]);
}

/** 12990000 → «۱۲٬۹۹۰٬۰۰۰» */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("fa-IR").format(value);
}

/** Price in Toman, without the currency word. */
export function formatPrice(value: number): string {
  return formatNumber(value);
}

export function formatPercent(value: number): string {
  return `${toPersianDigits(Math.round(value))}٪`;
}

/** Discount percentage between the old and the current price. */
export function discountPercent(
  price: number,
  oldPrice?: number,
): number | null {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
