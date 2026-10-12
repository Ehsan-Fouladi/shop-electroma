"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  CreditCard,
  Lock,
  MapPin,
  Plus,
  RefreshCw,
  ShieldCheck,
  Tag,
  Truck,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import { AddressForm } from "@/components/account/address-form";
import {
  CheckoutStepper,
  type CheckoutStepItem,
} from "@/components/checkout/checkout-stepper";
import {
  CouponSection,
  type AppliedCouponState,
} from "@/components/checkout/coupon-section";
import { ProductMedia } from "@/components/product/product-media";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";
import { getCartEntries } from "@/lib/cart/summary";
import { DELIVERY_OPTIONS } from "@/lib/constants/commerce";
import { siteConfig } from "@/lib/constants/site";
import { formatPrice, toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import { useCustomerStore } from "@/store/customer-store";
import { useCartStore } from "@/store/shop-store";
import type { CustomerOrder, PaymentMethod } from "@/types/customer";
import { useState } from "react";

const CHECKOUT_STEPS: CheckoutStepItem[] = [
  {
    id: 1,
    title: "نشانی تحویل",
    shortTitle: "نشانی",
    description: "انتخاب آدرس مقصد",
    icon: MapPin,
  },
  {
    id: 2,
    title: "روش تحویل",
    shortTitle: "روش ارسال",
    description: "شیوه و زمان ارسال",
    icon: Truck,
  },
  {
    id: 3,
    title: "شیوه پرداخت",
    shortTitle: "پرداخت",
    description: "درگاه یا کیف پول",
    icon: CreditCard,
  },
  {
    id: 4,
    title: "بررسی نهایی",
    shortTitle: "تأیید نهایی",
    description: "مرور اقلام و ثبت",
    icon: CheckCircle2,
  },
];

const BANK_GATEWAYS = [
  { id: "saman", name: "درگاه سامان کیش", badge: "پیشنهادی" },
  { id: "mellat", name: "به پرداخت ملت", badge: "پایدار" },
  { id: "parsian", name: "تجارت الکترونیک پارسیان", badge: "مستقیم" },
  { id: "pasargad", name: "پرداخت الکترونیک پاسارگاد", badge: "سریع" },
];

export function CheckoutFlow() {
  const router = useRouter();
  const lines = useCartStore((state) => state.lines);
  const clearCart = useCartStore((state) => state.clear);

  const addresses = useCustomerStore((state) => state.addresses);
  const addAddress = useCustomerStore((state) => state.addAddress);
  const walletBalance = useCustomerStore((state) => state.walletBalance);
  const chargeMockWallet = useCustomerStore((state) => state.chargeMockWallet);
  const addOrder = useCustomerStore((state) => state.addOrder);

  const [step, setStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
    const def = addresses.find((a) => a.isDefault);
    return def ? def.id : addresses[0]?.id || "";
  });
  const [shippingMethodId, setShippingMethodId] = useState<string>("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("gateway");
  const [selectedBank, setSelectedBank] = useState<string>("saman");
  const [isNewAddressOpen, setIsNewAddressOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCouponState | null>(null);

  const entries = getCartEntries(lines, products);

  // Subtotal before any discount
  const subtotal = entries.reduce(
    (sum, { line, product }) => sum + (product.oldPrice ?? product.price) * line.quantity,
    0,
  );

  // Catalog product discount
  const productDiscount = entries.reduce(
    (sum, { line, product }) =>
      sum + Math.max(0, (product.oldPrice ?? product.price) - product.price) * line.quantity,
    0,
  );

  // Price after product discounts
  const itemTotal = Math.max(0, subtotal - productDiscount);

  // Coupon discount amount (capped to itemTotal)
  const couponDiscount = appliedCoupon
    ? Math.min(appliedCoupon.discountAmount, itemTotal)
    : 0;

  // Final items total after both product discount and coupon discount
  const finalItemTotal = Math.max(0, itemTotal - couponDiscount);

  // Shipping
  const freeShipping = itemTotal >= siteConfig.freeShippingThreshold;
  const currentShippingOption =
    DELIVERY_OPTIONS.find((opt) => opt.id === shippingMethodId) || DELIVERY_OPTIONS[0];
  const shippingFee = freeShipping ? 0 : currentShippingOption.fee;

  // Final grand total
  const grandTotal = finalItemTotal + shippingFee;

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  // If cart is empty, show empty state
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-surface p-8 text-center shadow-soft sm:p-12">
        <span className="grid size-14 place-items-center rounded-full bg-surface-muted text-subtle-ink">
          <AlertCircle className="size-8" aria-hidden />
        </span>
        <div>
          <h2 className="text-title font-bold text-ink">سبد خرید شما برای تسویه حساب خالی است</h2>
          <p className="mt-1 text-body-sm text-subtle-ink">
            لطفاً ابتدا کالای مورد نظرتان را به سبد خرید اضافه کنید.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/products">مشاهده کاتالوگ محصولات</Link>
        </Button>
      </div>
    );
  }

  // Navigation conditions
  const canNavigateToStep = (targetId: number): boolean => {
    if (targetId === 1) return true;
    if (targetId === 2) return Boolean(selectedAddress);
    if (targetId === 3) return Boolean(selectedAddress) && Boolean(shippingMethodId);
    if (targetId === 4) {
      if (!selectedAddress || !shippingMethodId) return false;
      if (paymentMethod === "wallet" && walletBalance < grandTotal) return false;
      return true;
    }
    return false;
  };

  const handleStepClick = (targetStep: number) => {
    if (!canNavigateToStep(targetStep)) {
      if (targetStep >= 2 && !selectedAddress) {
        toast.error("لطفاً ابتدا نشانی تحویل را انتخاب کنید.");
      } else if (targetStep === 4 && paymentMethod === "wallet" && walletBalance < grandTotal) {
        toast.error("موجودی کیف پول کافی نیست.");
      }
      return;
    }
    setStep(targetStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedAddress) {
      toast.error("لطفاً یک نشانی تحویل انتخاب یا ثبت کنید.");
      return;
    }
    if (step === 3 && paymentMethod === "wallet" && walletBalance < grandTotal) {
      toast.error("موجودی کیف پول شما برای این سفارش کافی نیست.");
      return;
    }
    setStep((prev) => Math.min(4, prev + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickChargeWallet = () => {
    const deficit = Math.max(1_000_000, grandTotal - walletBalance + 500_000);
    useCustomerStore.setState((state) => ({
      walletBalance: state.walletBalance + deficit,
      walletTransactions: [
        {
          id: `wallet-demo-${Date.now().toString(36)}`,
          title: "شارژ سریع آزمایشی کیف پول در تسویه حساب",
          date: new Date().toISOString(),
          amount: deficit,
          direction: "in",
          note: "شارژ شبیه‌سازی‌شده در محیط آزمایشی فرانت‌اند.",
        },
        ...state.walletTransactions,
      ],
    }));
    toast.success(`مبلغ ${formatPrice(deficit)} تومان به صورت نمایشی به کیف پول افزوده شد.`);
  };

  const handleCreateOrder = () => {
    if (!selectedAddress) {
      toast.error("نشانی تحویل مشخص نشده است.");
      setStep(1);
      return;
    }

    if (paymentMethod === "wallet" && walletBalance < grandTotal) {
      toast.error("موجودی کیف پول برای این سفارش کافی نیست.");
      setStep(3);
      return;
    }

    setSubmitting(true);

    const orderId = `order-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: CustomerOrder = {
      id: orderId,
      placedAt: new Date().toISOString(),
      status: "processing",
      paymentStatus: "mock-complete",
      paymentMethod,
      shippingMethod: currentShippingOption.title,
      trackingCode: `EL-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      items: entries.map(({ line, product }) => ({
        productId: product.id,
        title: product.title,
        image: product.image,
        quantity: line.quantity,
        unitPrice: product.price,
        variant: line.variant,
      })),
      subtotal,
      discount: productDiscount + couponDiscount,
      couponCode: appliedCoupon?.code,
      couponDiscount: couponDiscount > 0 ? couponDiscount : undefined,
      shipping: shippingFee,
      total: grandTotal,
      address: {
        title: selectedAddress.title,
        recipient: selectedAddress.recipient,
        phone: selectedAddress.phone,
        province: selectedAddress.province,
        city: selectedAddress.city,
        address: selectedAddress.address,
        postalCode: selectedAddress.postalCode,
        unit: selectedAddress.unit,
        building: selectedAddress.building,
      },
    };

    setTimeout(() => {
      if (paymentMethod === "wallet") {
        chargeMockWallet(grandTotal, `پرداخت سفارش ${orderId}`);
      }
      addOrder(newOrder);
      clearCart();
      setSubmitting(false);
      toast.success("سفارش شما با موفقیت ثبت شد (شبیه‌سازی فرانت‌اند)");
      router.push(`/checkout/success?order=${orderId}`);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Visual step indicator */}
      <CheckoutStepper
        steps={CHECKOUT_STEPS}
        currentStep={step}
        onStepClick={handleStepClick}
        canNavigateToStep={canNavigateToStep}
      />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        {/* Main Step Content */}
        <div className="flex min-w-0 flex-col gap-6">
          {/* STEP 1: Address */}
          {step === 1 && (
            <section
              aria-labelledby="step-1-title"
              className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line-subtle pb-4">
                <div>
                  <h2 id="step-1-title" className="text-title font-bold text-ink">
                    انتخاب نشانی تحویل
                  </h2>
                  <p className="mt-1 text-body-sm text-subtle-ink">
                    کالاهای شما به نشانی انتخابی ارسال خواهند شد.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsNewAddressOpen(true)}
                  className="gap-1.5"
                >
                  <Plus className="size-4" aria-hidden />
                  افزودن نشانی جدید
                </Button>
              </div>

              {addresses.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-body-sm text-subtle-ink">هیچ نشانی ثبت‌شده‌ای در حساب شما وجود ندارد.</p>
                  <Button
                    type="button"
                    className="mt-3 gap-1.5"
                    onClick={() => setIsNewAddressOpen(true)}
                  >
                    <Plus className="size-4" aria-hidden />
                    ثبت اولین نشانی
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <label
                        key={addr.id}
                        className={cn(
                          "relative flex cursor-pointer flex-col justify-between rounded-lg border p-4 transition-all",
                          isSelected
                            ? "border-primary bg-brand-soft/25 ring-2 ring-primary/20 shadow-soft"
                            : "border-line bg-surface hover:bg-surface-soft hover:border-line-subtle",
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="checkout-address"
                              value={addr.id}
                              checked={isSelected}
                              onChange={() => setSelectedAddressId(addr.id)}
                              className="size-4 text-primary focus:ring-primary"
                            />
                            <span className="font-bold text-ink">{addr.title}</span>
                          </div>
                          {addr.isDefault ? (
                            <Badge variant="brand" className="text-caption font-medium">
                              پیش‌فرض
                            </Badge>
                          ) : null}
                        </div>

                        <p className="mt-2 line-clamp-2 text-body-sm text-body">{addr.address}</p>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line-subtle pt-2.5 text-caption text-subtle-ink">
                          <span>گیرنده: {addr.recipient}</span>
                          <span dir="ltr">{addr.phone}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* Add Address Dialog */}
              <Dialog open={isNewAddressOpen} onOpenChange={setIsNewAddressOpen}>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>افزودن نشانی جدید</DialogTitle>
                  </DialogHeader>
                  <AddressForm
                    onSubmit={(vals) => {
                      const newId = addAddress({ ...vals, isDefault: addresses.length === 0 });
                      setSelectedAddressId(newId);
                      setIsNewAddressOpen(false);
                      toast.success("نشانی جدید ثبت و انتخاب شد");
                    }}
                    onCancel={() => setIsNewAddressOpen(false)}
                    submitLabel="ثبت و انتخاب نشانی"
                  />
                </DialogContent>
              </Dialog>
            </section>
          )}

          {/* STEP 2: Shipping Method */}
          {step === 2 && (
            <section
              aria-labelledby="step-2-title"
              className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6"
            >
              <div className="mb-4 border-b border-line-subtle pb-4">
                <h2 id="step-2-title" className="text-title font-bold text-ink">
                  انتخاب روش تحویل
                </h2>
                <p className="mt-1 text-body-sm text-subtle-ink">
                  زمان و شیوه تحویل بسته را متناسب با نیاز خود مشخص کنید.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {DELIVERY_OPTIONS.map((opt) => {
                  const isSelected = shippingMethodId === opt.id;
                  const fee = freeShipping ? 0 : opt.fee;
                  return (
                    <label
                      key={opt.id}
                      className={cn(
                        "flex cursor-pointer items-start justify-between gap-4 rounded-lg border p-4 transition-all",
                        isSelected
                          ? "border-primary bg-brand-soft/25 ring-2 ring-primary/20 shadow-soft"
                          : "border-line bg-surface hover:bg-surface-soft hover:border-line-subtle",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="shipping-method"
                          value={opt.id}
                          checked={isSelected}
                          onChange={() => setShippingMethodId(opt.id)}
                          className="mt-1 size-4 text-primary focus:ring-primary"
                        />
                        <div>
                          <p className="font-bold text-ink">{opt.title}</p>
                          <p className="mt-0.5 text-body-sm text-subtle-ink">{opt.description}</p>
                          <p className="mt-1 text-caption font-medium text-brand-active">
                            زمان تقریبی تحویل: {opt.days}
                          </p>
                        </div>
                      </div>
                      <div className="text-end shrink-0">
                        {freeShipping ? (
                          <span className="font-bold text-success">ارسال رایگان</span>
                        ) : (
                          <span className="font-bold text-ink">
                            {formatPrice(fee)}{" "}
                            <span className="text-caption font-normal">تومان</span>
                          </span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>

              {freeShipping && (
                <Alert variant="success" className="mt-4">
                  <CheckCircle2 className="size-4 text-success" aria-hidden />
                  <AlertDescription>
                    سفارش شما بیش از ۵ میلیون تومان است؛ ارسال استاندارد سفارش شما کاملاً رایگان خواهد بود!
                  </AlertDescription>
                </Alert>
              )}
            </section>
          )}

          {/* STEP 3: Payment Method */}
          {step === 3 && (
            <section
              aria-labelledby="step-3-title"
              className="rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6"
            >
              <div className="mb-4 border-b border-line-subtle pb-4">
                <h2 id="step-3-title" className="text-title font-bold text-ink">
                  شیوه پرداخت
                </h2>
                <p className="mt-1 text-body-sm text-subtle-ink">
                  درگاه شبیه‌سازی‌شده شاپرک یا کیف پول الکتروما را انتخاب نمایید.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* 1. Payment Gateway Option */}
                <div
                  className={cn(
                    "flex flex-col gap-3 rounded-lg border p-4 transition-all",
                    paymentMethod === "gateway"
                      ? "border-primary bg-brand-soft/20 ring-2 ring-primary/20 shadow-soft"
                      : "border-line bg-surface hover:bg-surface-soft",
                  )}
                >
                  <label className="flex cursor-pointer items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment-method"
                        value="gateway"
                        checked={paymentMethod === "gateway"}
                        onChange={() => setPaymentMethod("gateway")}
                        className="mt-1 size-4 text-primary focus:ring-primary"
                      />
                      <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-active">
                        <CreditCard className="size-5" aria-hidden />
                      </div>
                      <div>
                        <p className="font-bold text-ink">پرداخت اینترنتی با کلیه کارت‌های عضو شتاب</p>
                        <p className="text-caption text-subtle-ink">
                          اتصال مستقیم به درگاه پرداخت امن شاپرک (محیط شبیه‌سازی‌شده فرانت‌اند)
                        </p>
                      </div>
                    </div>
                    <Badge variant="brand" className="shrink-0 text-caption">
                      سریع و بدون کارمزد
                    </Badge>
                  </label>

                  {paymentMethod === "gateway" && (
                    <div className="mt-2 border-t border-line-subtle pt-3">
                      <p className="mb-2.5 text-caption font-bold text-subtle-ink">
                        انتخاب درگاه بانکی فعال:
                      </p>
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {BANK_GATEWAYS.map((bank) => {
                          const isBankActive = selectedBank === bank.id;
                          return (
                            <button
                              key={bank.id}
                              type="button"
                              onClick={() => setSelectedBank(bank.id)}
                              className={cn(
                                "flex flex-col items-center justify-center gap-1 rounded-lg border p-2.5 text-center transition-all",
                                isBankActive
                                  ? "border-primary bg-primary text-white font-bold shadow-soft scale-[1.02]"
                                  : "border-line bg-surface text-body hover:bg-surface-soft hover:border-line-subtle",
                              )}
                              aria-pressed={isBankActive}
                            >
                              <Building2
                                className={cn("size-4.5", isBankActive ? "text-white" : "text-subtle-ink")}
                                aria-hidden
                              />
                              <span className="text-caption leading-tight">{bank.name}</span>
                              <span
                                className={cn(
                                  "rounded-xs px-1.5 py-0.2 text-[10px]",
                                  isBankActive
                                    ? "bg-white/20 text-white"
                                    : "bg-surface-muted text-subtle-ink",
                                )}
                              >
                                {bank.badge}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Wallet Option */}
                <div
                  className={cn(
                    "flex flex-col gap-3 rounded-lg border p-4 transition-all",
                    paymentMethod === "wallet"
                      ? "border-primary bg-brand-soft/20 ring-2 ring-primary/20 shadow-soft"
                      : "border-line bg-surface hover:bg-surface-soft",
                  )}
                >
                  <label className="flex cursor-pointer items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment-method"
                        value="wallet"
                        checked={paymentMethod === "wallet"}
                        onChange={() => setPaymentMethod("wallet")}
                        className="mt-1 size-4 text-primary focus:ring-primary"
                      />
                      <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-active">
                        <Wallet className="size-5" aria-hidden />
                      </div>
                      <div>
                        <p className="font-bold text-ink">پرداخت با کیف پول الکتروما</p>
                        <p className="text-caption text-subtle-ink">
                          موجودی اعتباری فعلی:{" "}
                          <span className="font-bold text-ink">
                            {formatPrice(walletBalance)} تومان
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {walletBalance < grandTotal ? (
                        <Badge variant="sale-soft" className="text-caption">
                          کسری موجودی
                        </Badge>
                      ) : (
                        <Badge variant="success" className="text-caption">
                          موجودی کافی
                        </Badge>
                      )}
                    </div>
                  </label>

                  {paymentMethod === "wallet" && (
                    <div className="border-t border-line-subtle pt-3 text-caption">
                      {walletBalance < grandTotal ? (
                        <div className="flex flex-col gap-2 rounded-md bg-sale-soft/50 p-3 text-sale">
                          <div className="flex items-center gap-1.5 font-bold">
                            <AlertCircle className="size-4 shrink-0" aria-hidden />
                            <span>
                              کسری موجودی: مبلغ {formatPrice(grandTotal - walletBalance)} تومان برای پرداخت با کیف پول نیاز دارید.
                            </span>
                          </div>
                          <p className="text-subtle-ink">
                            می‌توانید درگاه اینترنتی شتاب را انتخاب کنید یا با کلیک زیر کیف پول نمایشی را شارژ نمایید:
                          </p>
                          <div>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={handleQuickChargeWallet}
                              className="gap-1.5 border-sale/40 text-sale hover:bg-sale-soft"
                            >
                              <RefreshCw className="size-3.5" aria-hidden />
                              شارژ سریع آزمایشی کیف پول
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between rounded-md bg-success-soft/60 p-3 text-success">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Check className="size-4 shrink-0" aria-hidden />
                            <span>
                              موجودی کیف پول برای پرداخت این سفارش کافی است ({formatPrice(grandTotal)} تومان کسر خواهد شد).
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Simulation Disclaimer Alert */}
              <Alert variant="warning" className="mt-5">
                <ShieldCheck className="size-4 text-warning" aria-hidden />
                <AlertDescription className="text-caption leading-relaxed">
                  <strong>یادآوری محیط شبیه‌سازی:</strong> تمام روش‌های پرداخت در این سیستم صرفاً جهت بررسی رابط کاربری طراحی شده‌اند و هیچ‌گونه تراکنش بانکی، انتقال پول یا اتصال به شبکه شاپرک انجام نخواهد شد.
                </AlertDescription>
              </Alert>
            </section>
          )}

          {/* STEP 4: Review */}
          {step === 4 && (
            <section
              aria-labelledby="step-4-title"
              className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-5 shadow-soft sm:p-6"
            >
              <div className="border-b border-line-subtle pb-4">
                <h2 id="step-4-title" className="text-title font-bold text-ink">
                  بررسی نهایی و ثبت سفارش
                </h2>
                <p className="mt-1 text-body-sm text-subtle-ink">
                  اطلاعات نشانی، روش ارسال و اقلام سفارش را مرور و تأیید فرمایید.
                </p>
              </div>

              {/* Delivery & Payment Recap */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-caption font-bold text-subtle-ink">نشانی تحویل گیرنده</span>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-caption text-brand hover:underline"
                    >
                      ویرایش
                    </button>
                  </div>
                  <p className="mt-2 text-body-sm font-medium text-ink">{selectedAddress?.recipient}</p>
                  <p className="mt-1 text-caption text-body">{selectedAddress?.address}</p>
                  <p className="mt-1 text-caption text-subtle-ink">
                    تلفن: <span dir="ltr">{selectedAddress?.phone}</span> | کد پستی:{" "}
                    <span dir="ltr">{selectedAddress?.postalCode}</span>
                  </p>
                </div>

                <div className="rounded-lg border border-line-subtle bg-surface-soft p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-caption font-bold text-subtle-ink">روش تحویل و پرداخت</span>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-caption text-brand hover:underline"
                    >
                      ویرایش
                    </button>
                  </div>
                  <p className="mt-2 text-body-sm font-medium text-ink">
                    روش ارسال: {currentShippingOption.title} ({currentShippingOption.days})
                  </p>
                  <p className="mt-1 text-caption text-subtle-ink">
                    شیوه پرداخت:{" "}
                    {paymentMethod === "gateway"
                      ? `درگاه شتاب (${BANK_GATEWAYS.find((b) => b.id === selectedBank)?.name || "سامان"})`
                      : "کیف پول الکتروما (کسر اعتباری)"}
                  </p>
                  {appliedCoupon && (
                    <div className="mt-2 flex items-center gap-1.5 border-t border-line-subtle pt-2 text-caption text-success font-medium">
                      <Tag className="size-3.5" aria-hidden />
                      <span>کد تخفیف: {appliedCoupon.code} ({formatPrice(couponDiscount)} تومان تخفیف)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items List */}
              <div className="flex flex-col gap-3">
                <h3 className="text-label font-bold text-ink">
                  اقلام سفارش ({toPersianDigits(entries.length)} قلم کالا)
                </h3>
                <div className="divide-y divide-line-subtle rounded-lg border border-line">
                  {entries.map(({ line, product }) => (
                    <div
                      key={`${line.productId}-${line.variant ?? ""}`}
                      className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4"
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-md border border-line bg-surface-soft">
                        <ProductMedia product={product} sizes="56px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-body-sm font-medium text-ink">{product.title}</p>
                        {line.variant && (
                          <p className="text-caption text-subtle-ink">مدل: {line.variant}</p>
                        )}
                        <p className="text-caption text-subtle-ink">
                          تعداد: {toPersianDigits(line.quantity)} × {formatPrice(product.price)} تومان
                        </p>
                      </div>
                      <div className="text-end font-bold text-ink">
                        {formatPrice(product.price * line.quantity)} تومان
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cancellation link */}
              <div className="rounded-lg bg-surface-soft p-3 text-caption text-subtle-ink">
                می‌توانید برای انصراف از پرداخت یا شبیه‌سازی وضعیت لغو، به صفحه{" "}
                <Link href="/checkout/cancelled" className="text-sale hover:underline">
                  انصراف از پرداخت
                </Link>{" "}
                بروید.
              </div>
            </section>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between gap-3">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handlePrevStep} className="gap-1.5">
                <ArrowRight className="size-4" aria-hidden />
                مرحله قبل
              </Button>
            ) : (
              <Button asChild variant="outline" className="gap-1.5">
                <Link href="/cart">
                  <ArrowRight className="size-4" aria-hidden />
                  بازگشت به سبد خرید
                </Link>
              </Button>
            )}

            {step < 4 ? (
              <Button type="button" size="lg" onClick={handleNextStep} className="gap-1.5">
                ادامه به مرحله بعد
                <ArrowLeft className="size-4" aria-hidden />
              </Button>
            ) : (
              <Button
                type="button"
                size="lg"
                disabled={submitting}
                onClick={handleCreateOrder}
                className="gap-2 bg-success text-white hover:bg-success/90 shadow-soft"
              >
                <Lock className="size-4" aria-hidden />
                {submitting ? "در حال ثبت سفارش…" : "پرداخت و ثبت نهایی سفارش (نمایشی)"}
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar Order Summary & Coupon Section */}
        <aside className="sticky top-28 flex flex-col gap-4">
          {/* Coupon Section */}
          <CouponSection
            subtotal={subtotal}
            shippingFee={shippingFee}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={setAppliedCoupon}
            onRemoveCoupon={() => setAppliedCoupon(null)}
          />

          {/* Order Summary Card */}
          <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-5 shadow-soft">
            <h2 className="text-title-sm font-bold text-ink">خلاصه پیش‌فاکتور</h2>

            <dl className="flex flex-col gap-2.5 text-body-sm">
              <div className="flex items-center justify-between text-subtle-ink">
                <dt>قیمت کالاها ({toPersianDigits(entries.length)})</dt>
                <dd className="font-medium text-ink">{formatPrice(subtotal)} تومان</dd>
              </div>

              {productDiscount > 0 && (
                <div className="flex items-center justify-between text-subtle-ink">
                  <dt>تخفیف کالاها</dt>
                  <dd className="font-medium text-success">
                    − {formatPrice(productDiscount)} تومان
                  </dd>
                </div>
              )}

              {appliedCoupon && couponDiscount > 0 && (
                <div className="flex items-center justify-between text-subtle-ink">
                  <dt className="flex items-center gap-1.5">
                    <span>کد تخفیف</span>
                    <Badge variant="brand" className="font-mono text-caption" dir="ltr">
                      {appliedCoupon.code}
                    </Badge>
                  </dt>
                  <dd className="font-medium text-success">
                    − {formatPrice(couponDiscount)} تومان
                  </dd>
                </div>
              )}

              <div className="flex items-center justify-between text-subtle-ink">
                <dt>هزینه ارسال ({currentShippingOption.title})</dt>
                <dd className="font-medium text-ink">
                  {freeShipping ? (
                    <span className="text-success font-bold">ارسال رایگان</span>
                  ) : (
                    `${formatPrice(shippingFee)} تومان`
                  )}
                </dd>
              </div>
            </dl>

            <Separator />

            <div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-body-sm font-bold text-ink">مبلغ قابل پرداخت</p>
                  <p className="text-caption text-subtle-ink">با احتساب کلیه تخفیف‌ها و هزینه ارسال</p>
                </div>
                <p className="text-title font-bold text-brand-active">
                  {formatPrice(grandTotal)} <span className="text-caption font-normal">تومان</span>
                </p>
              </div>
            </div>

            <div className="rounded-md bg-surface-soft p-3 text-caption text-subtle-ink">
              <p className="font-medium text-ink">ضمانت‌های خرید از الکتروما:</p>
              <ul className="mt-1 flex flex-col gap-0.5">
                <li>• ۷ روز ضمانت بازگشت کالا</li>
                <li>• تضمین ۱۰۰٪ اصالت کالای دیجیتال</li>
                <li>• ارسال سریع و بسته‌بندی امن ضدضربه</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
