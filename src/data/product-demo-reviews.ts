export interface ProductDemoReview {
  id: string;
  name: string;
  rating: number;
  text: string;
}

/**
 * Small, rotating set of demonstration-only copy. These are not customer
 * submissions and are deliberately kept outside Product.rating/reviewCount.
 */
const demoReviewPool: Omit<ProductDemoReview, "id">[] = [
  {
    name: "نگار فلاحی",
    rating: 5,
    text: "طراحی و کیفیت ساختش خوبه و استفاده ازش برای کارهای روزمره راحت بوده.",
  },
  {
    name: "امیرحسین صالحی",
    rating: 4,
    text: "راه‌اندازی ساده‌ای داشت و در مجموع از انتخابم راضی‌ام.",
  },
  {
    name: "مریم موسوی",
    rating: 5,
    text: "عملکرد کلی محصول رضایت‌بخش بوده و با انتظارم هم‌خوانی داشته.",
  },
  {
    name: "علی اکبری",
    rating: 4,
    text: "برای استفاده‌ی روزمره کاربردیه؛ کیفیت کلی هم خوب به نظر می‌رسه.",
  },
  {
    name: "سارا حیدری",
    rating: 5,
    text: "کار باهاش راحت بوده و تجربه‌ی استفاده تا اینجا خوبه.",
  },
  {
    name: "پیمان کریمی",
    rating: 4,
    text: "ظاهر محصول مرتبه و از نظر کارایی نیازهای معمولم رو پوشش می‌ده.",
  },
  {
    name: "الهام رفیعی",
    rating: 5,
    text: "محصول خوش‌ساختیه و در استفاده‌ی روزانه حس خوبی داره.",
  },
  {
    name: "رضا مرادی",
    rating: 4,
    text: "از عملکردش راضی‌ام؛ کار کردن با محصول ساده و بی‌دردسره.",
  },
  {
    name: "یاسمین نادری",
    rating: 5,
    text: "کیفیت ساخت خوبی داره و برای نیاز روزمره انتخاب مناسبیه.",
  },
  {
    name: "محمدمهدی صادقی",
    rating: 4,
    text: "از نظر کیفیت و کاربری انتخاب مناسبی به نظر می‌رسه؛ استفاده‌اش راحته.",
  },
  {
    name: "پانیذ حسینی",
    rating: 5,
    text: "تجربه‌ی کار با محصول خوب بوده و طراحی‌اش هم ساده و کاربردیه.",
  },
  {
    name: "آرش جعفری",
    rating: 4,
    text: "عملکرد کلی قابل قبوله و برای استفاده‌ی معمول گزینه‌ی خوبیه.",
  },
];

function stableHash(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

/** Returns three stable, clearly-labelled demo entries for a product page. */
export function getProductDemoReviews(productId: string): ProductDemoReview[] {
  const start = stableHash(productId) % demoReviewPool.length;
  return [0, 1, 2].map((offset) => {
    const review = demoReviewPool[(start + offset) % demoReviewPool.length];
    return { ...review, id: `${productId}-demo-${offset + 1}` };
  });
}
