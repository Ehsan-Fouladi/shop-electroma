import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { Direction } from "radix-ui";

import { siteConfig } from "@/lib/constants/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | فروشگاه اینترنتی کالای دیجیتال`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "فروشگاه اینترنتی",
    "کالای دیجیتال",
    "موبایل",
    "لپ‌تاپ",
    "هدفون",
    "ساعت هوشمند",
    "لوازم جانبی دیجیتال",
    "الکتروما",
  ],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | فروشگاه اینترنتی کالای دیجیتال`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/images/category/mobile.webp`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — فروشگاه اینترنتی کالای دیجیتال`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | فروشگاه اینترنتی کالای دیجیتال`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/category/mobile.webp`],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: siteConfig.latinName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/favicon.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.supportPhoneHref.replace("tel:", ""),
    contactType: "customer service",
    availableLanguage: "Persian",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressCountry: "IR",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" translate="no">
      <head>
        <link
          rel="preload"
          href="/fonts/IRANSansWeb.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/IRANSansWeb_Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <Direction.Provider  dir="rtl">
          {children}
          <Toaster
            position="top-right"
            dir="rtl"
            theme="light"
            richColors
            closeButton
            mobileOffset={{ bottom: 88 }}
          />
        </Direction.Provider>
      </body>
    </html>
  );
}
