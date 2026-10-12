import type { Metadata } from "next";

import { AccountShell } from "@/components/account/account-shell";

export const metadata: Metadata = {
  title: {
    default: "حساب کاربری",
    template: "%s | حساب کاربری الکتروما",
  },
  robots: {
    index: false,
    follow: false,
  },
};

/** Shared customer-account navigation and responsive shell. */
export default function AccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AccountShell>{children}</AccountShell>;
}
