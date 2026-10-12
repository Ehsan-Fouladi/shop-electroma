import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development" ? true : false;

export default {
  /* config options here */
  compiler: {
    removeConsole: !isDevelopment,
  },
  experimental: {
    turbopackRustReactCompiler: true,
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/webp"],
    unoptimized: true,
  },
  productionBrowserSourceMaps: isDevelopment,
  reactStrictMode: isDevelopment,
  poweredByHeader: isDevelopment,
  reactCompiler: true,
  async redirects() {
    return [
      { source: "/faq", destination: "/support/faq", permanent: true },
      { source: "/shipping", destination: "/support/shipping", permanent: true },
      { source: "/returns", destination: "/support/returns", permanent: true },
      { source: "/warranty", destination: "/support/warranty", permanent: true },
      { source: "/payment", destination: "/support/payment", permanent: true },
      { source: "/contact", destination: "/support/contact", permanent: true },
      { source: "/stores", destination: "/about#stores", permanent: true },
      { source: "/sale", destination: "/deals", permanent: true },
      { source: "/deal", destination: "/deals", permanent: true },
      { source: "/category", destination: "/categories", permanent: true },
      { source: "/brand", destination: "/brands", permanent: true },
      { source: "/collection", destination: "/collections", permanent: true },
    ];
  },
  // basePath: isDevelopment ? "" : "/shop-moda",
  // output: "export",
  // cacheComponents: true,
} as NextConfig;