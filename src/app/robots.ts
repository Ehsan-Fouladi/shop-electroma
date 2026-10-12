import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account",
        "/account/*",
        "/checkout",
        "/checkout/*",
        "/cart",
        "/wishlist",
        "/login",
        "/register",
        "/verify",
        "/forgot-password",
        "/reset-password",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
