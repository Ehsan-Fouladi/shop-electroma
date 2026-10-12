/** ISO date → Persian (Jalali) short date, e.g. «۱۵ مهر ۱۴۰۴». */
export function formatPersianDate(iso: string): string {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}
