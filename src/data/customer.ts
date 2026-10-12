import type {
  CustomerAddress,
  CustomerCoupon,
  CustomerNotification,
  CustomerOrder,
  CustomerProfile,
  CustomerQuestion,
  CustomerReview,
  WalletTransaction,
} from "@/types/customer";

/** Fictional customer data for the UI-only storefront. */
export const initialCustomerProfile: CustomerProfile = {
  name: "مریم رضایی",
  phone: "09123456789",
  email: "maryam.rezaei@example.com",
  birthDate: "۱۳۷۵/۰۷/۱۲",
  nationalCode: "00123456789",
  shebaNumber: "560120000000001234567890",
};

export const initialCustomerAddresses: CustomerAddress[] = [
  {
    id: "address-tehran-home",
    title: "خانه",
    recipient: "مریم رضایی",
    phone: "09123456789",
    province: "تهران",
    city: "تهران",
    address: "خیابان ولیعصر، خیابان توانیر، کوچه سرو، پلاک ۱۸",
    postalCode: "1435874120",
    unit: "4",
    building: "18",
    isDefault: true,
  },
  {
    id: "address-office",
    title: "محل کار",
    recipient: "مریم رضایی",
    phone: "09123456789",
    province: "تهران",
    city: "تهران",
    address: "خیابان مطهری، بعد از تقاطع مفتح، ساختمان فناوری",
    postalCode: "1587643210",
    unit: "9",
    building: "24",
    isDefault: false,
  },
];

const homeAddress = {
  title: "خانه",
  recipient: "مریم رضایی",
  phone: "09123456789",
  province: "تهران",
  city: "تهران",
  address: "خیابان ولیعصر، خیابان توانیر، کوچه سرو، پلاک ۱۸",
  postalCode: "1435874120",
  unit: "4",
  building: "18",
};

export const initialCustomerOrders: CustomerOrder[] = [
  {
    id: "order-1405-01042",
    placedAt: "2026-10-05T10:20:00.000Z",
    status: "shipped",
    paymentStatus: "mock-pending",
    paymentMethod: "gateway",
    shippingMethod: "ارسال استاندارد",
    trackingCode: "EL-TRK-510842",
    items: [
      {
        productId: "p-001",
        title: "گوشی موبایل اپل مدل iPhone 16 Pro Max ظرفیت ۲۵۶ گیگابایت",
        image: "/images/products/apple-iphone-16-pro-max-256.webp",
        quantity: 1,
        unitPrice: 92_400_000,
        variant: "تیتانیوم طبیعی",
      },
    ],
    subtotal: 92_400_000,
    discount: 6_500_000,
    shipping: 0,
    total: 92_400_000,
    address: homeAddress,
  },
  {
    id: "order-1405-00831",
    placedAt: "2026-09-21T09:00:00.000Z",
    status: "delivered",
    paymentStatus: "mock-complete",
    paymentMethod: "wallet",
    shippingMethod: "ارسال سریع",
    trackingCode: "EL-TRK-508831",
    items: [
      {
        productId: "p-005",
        title: "هدفون بی‌سیم سونی مدل WH-1000XM5",
        image: "/images/products/sony-wh-1000xm5.webp",
        quantity: 1,
        unitPrice: 14_450_000,
      },
      {
        productId: "p-008",
        title: "ساعت هوشمند سامسونگ مدل Galaxy Watch7",
        image: "/images/products/samsung-galaxy-watch7-44mm.webp",
        quantity: 1,
        unitPrice: 12_650_000,
      },
    ],
    subtotal: 27_100_000,
    discount: 5_000_000,
    shipping: 0,
    total: 27_100_000,
    address: homeAddress,
  },
];

export const initialCustomerNotifications: CustomerNotification[] = [
  {
    id: "notification-order-shipped",
    title: "سفارش شما ارسال شد",
    description: "سفارش ۱۴۰۵-۰۱۰۴۲ به شرکت حمل تحویل داده شد.",
    date: "2026-10-06T08:30:00.000Z",
    type: "order",
    read: false,
    href: "/account/orders/order-1405-01042/tracking",
  },
  {
    id: "notification-new-guide",
    title: "راهنمای تازه خرید هدفون",
    description: "نکات مهم انتخاب هدفون مناسب را در مجله الکتروما بخوانید.",
    date: "2026-10-02T12:00:00.000Z",
    type: "promotion",
    read: true,
    href: "/blog",
  },
  {
    id: "notification-account-security",
    title: "یادآوری امنیت حساب",
    description: "اطلاعات تماس خود را در حساب نمایشی بررسی کنید.",
    date: "2026-09-28T12:00:00.000Z",
    type: "system",
    read: true,
    href: "/account/profile",
  },
];

export const initialWalletBalance = 18_500_000;

export const initialWalletTransactions: WalletTransaction[] = [
  {
    id: "wallet-credit-01",
    title: "شارژ کیف پول نمایشی",
    date: "2026-09-10T09:15:00.000Z",
    amount: 20_000_000,
    direction: "in",
    note: "موجودی نمونه؛ تراکنش بانکی واقعی نیست.",
  },
  {
    id: "wallet-order-01",
    title: "خرید هدفون Sony WH-1000XM5",
    date: "2026-09-21T09:00:00.000Z",
    amount: 1_500_000,
    direction: "out",
    note: "تراکنش نمونه سفارش تحویل‌شده.",
  },
];

export const customerCoupons: CustomerCoupon[] = [
  {
    code: "DIGI-1405",
    title: "تخفیف خرید لوازم جانبی",
    description: "کد نمایشی برای آشنایی با بخش کوپن‌ها؛ در تسویه‌حساب اعمال نمی‌شود.",
    expiresAt: "2026-12-30",
    state: "available",
  },
  {
    code: "WELCOME-OLD",
    title: "خوش‌آمدگویی",
    description: "کوپن نمونه مصرف‌شده.",
    expiresAt: "2026-08-01",
    state: "used",
  },
  {
    code: "SUMMER-1405",
    title: "پیشنهاد تابستانی",
    description: "کوپن نمونه منقضی‌شده.",
    expiresAt: "2026-09-01",
    state: "expired",
  },
];

export const customerReviews: CustomerReview[] = [
  {
    id: "review-demo-1",
    productId: "p-005",
    date: "2026-09-25",
    rating: 5,
    title: "کیفیت صدای عالی",
    status: "published",
  },
  {
    id: "review-demo-2",
    productId: "p-001",
    date: "2026-10-05",
    rating: 0,
    title: "پس از تحویل می‌توانید نظر ثبت کنید",
    status: "pending",
  },
];

export const customerQuestions: CustomerQuestion[] = [
  {
    id: "question-demo-1",
    productId: "p-005",
    date: "2026-09-22",
    question: "آیا نویز کنسلینگ هنگام تماس هم فعال است؟",
    answer: "بله، هدفون از کاهش نویز در تماس پشتیبانی می‌کند.",
  },
  {
    id: "question-demo-2",
    productId: "p-003",
    date: "2026-09-14",
    question: "آیا شارژر داخل جعبه قرار دارد؟",
  },
];
