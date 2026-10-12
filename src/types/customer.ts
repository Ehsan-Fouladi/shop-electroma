export interface CustomerProfile {
  name: string;
  phone: string;
  email: string;
  birthDate: string;
  nationalCode?: string;
  shebaNumber?: string;
}

export interface CustomerAddress {
  id: string;
  title: string;
  recipient: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  unit: string;
  building: string;
  isDefault: boolean;
}

export interface OrderAddressSnapshot {
  title: string;
  recipient: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  unit: string;
  building: string;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
export type PaymentMethod = "gateway" | "wallet";
export type PaymentStatus = "mock-pending" | "mock-complete" | "cancelled";

export interface OrderLineSnapshot {
  productId: string;
  title: string;
  image?: string;
  quantity: number;
  unitPrice: number;
  variant?: string;
}

export interface CustomerOrder {
  id: string;
  placedAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingMethod: string;
  trackingCode?: string;
  items: OrderLineSnapshot[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  couponDiscount?: number;
  shipping: number;
  total: number;
  address: OrderAddressSnapshot;
}

export type ReturnStatus = "reviewing" | "approved" | "rejected" | "refunded";

export interface ReturnRequest {
  id: string;
  orderId: string;
  productId: string;
  reason: string;
  description: string;
  requestedAt: string;
  status: ReturnStatus;
}

export interface CustomerNotification {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "order" | "promotion" | "system";
  read: boolean;
  href?: string;
}

export interface WalletTransaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  direction: "in" | "out";
  note?: string;
}

export interface CustomerCoupon {
  code: string;
  title: string;
  description: string;
  expiresAt: string;
  state: "available" | "used" | "expired";
}

export interface CustomerReview {
  id: string;
  productId: string;
  date: string;
  rating: number;
  title: string;
  status: "published" | "pending";
}

export interface CustomerQuestion {
  id: string;
  productId: string;
  date: string;
  question: string;
  answer?: string;
}
