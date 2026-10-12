export const siteConfig = {
  name: "الکتروما",
  latinName: "ELECTROMA",
  description:
    "فروشگاه اینترنتی کالای دیجیتال الکتروما؛ خرید موبایل، لپ‌تاپ، هدفون، ساعت هوشمند و لوازم جانبی اصل با ضمانت اصالت کالا، ارسال سریع و پرداخت امن.",
  url: "https://electroma.example",
  supportPhone: "۰۲۱-۹۱۰۰۲۲۳۳",
  supportPhoneHref: "tel:+982191002233",
  address: "تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج فناوری، طبقه ۹",
  email: "support@electroma.example",
  socials: [
    { title: "اینستاگرام", href: "#", icon: "instagram" },
    { title: "تلگرام", href: "#", icon: "send" },
    { title: "لینکدین", href: "#", icon: "linkedin" },
  ],
  freeShippingThreshold: 5_000_000,
  defaultOgImage: {
    url: "https://electroma.example/images/category/mobile.webp",
    width: 1200,
    height: 630,
    alt: "الکتروما — فروشگاه اینترنتی کالای دیجیتال",
  },
} as const;
