import { create } from "zustand";

import {
  initialCustomerAddresses,
  initialCustomerNotifications,
  initialCustomerOrders,
  initialCustomerProfile,
  initialWalletBalance,
  initialWalletTransactions,
} from "@/data/customer";
import type {
  CustomerAddress,
  CustomerNotification,
  CustomerOrder,
  CustomerProfile,
  ReturnRequest,
  WalletTransaction,
} from "@/types/customer";

interface CustomerState {
  profile: CustomerProfile;
  addresses: CustomerAddress[];
  orders: CustomerOrder[];
  returns: ReturnRequest[];
  notifications: CustomerNotification[];
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  demoContact: string | null;
  updateProfile: (changes: Partial<CustomerProfile>) => void;
  addAddress: (address: Omit<CustomerAddress, "id">) => string;
  updateAddress: (
    id: string,
    changes: Partial<Omit<CustomerAddress, "id">>,
  ) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: CustomerOrder) => void;
  chargeMockWallet: (amount: number, title: string) => boolean;
  addReturnRequest: (request: ReturnRequest) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setDemoContact: (contact: string | null) => void;
}

/** Session-only customer state. It is mock UI state, not a customer backend. */
export const useCustomerStore = create<CustomerState>((set) => ({
  profile: initialCustomerProfile,
  addresses: initialCustomerAddresses,
  orders: initialCustomerOrders,
  returns: [],
  notifications: initialCustomerNotifications,
  walletBalance: initialWalletBalance,
  walletTransactions: initialWalletTransactions,
  demoContact: null,
  updateProfile: (changes) =>
    set((state) => ({ profile: { ...state.profile, ...changes } })),
  addAddress: (address) => {
    const id = `address-${Date.now().toString(36)}`;
    set((state) => ({
      addresses: [
        ...state.addresses.map((item) => ({ ...item, isDefault: false })),
        {
          ...address,
          id,
          isDefault: state.addresses.length === 0 || address.isDefault,
        },
      ],
    }));
    return id;
  },
  updateAddress: (id, changes) =>
    set((state) => ({
      addresses: state.addresses.map((address) =>
        address.id === id ? { ...address, ...changes } : address,
      ),
    })),
  removeAddress: (id) =>
    set((state) => {
      const wasDefault = state.addresses.find(
        (address) => address.id === id,
      )?.isDefault;
      const remaining = state.addresses.filter((address) => address.id !== id);
      return {
        addresses: remaining.map((address, index) => ({
          ...address,
          isDefault: wasDefault ? index === 0 : address.isDefault,
        })),
      };
    }),
  setDefaultAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    })),
  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders.filter((item) => item.id !== order.id)],
    })),
  chargeMockWallet: (amount, title) => {
    let charged = false;
    set((state) => {
      if (amount > state.walletBalance) return state;
      charged = true;
      return {
        walletBalance: state.walletBalance - amount,
        walletTransactions: [
          {
            id: `wallet-demo-${Date.now().toString(36)}`,
            title,
            date: new Date().toISOString(),
            amount,
            direction: "out",
            note: "این تغییر فقط در کیف پول نمایشی نشست اعمال شد.",
          },
          ...state.walletTransactions,
        ],
      };
    });
    return charged;
  },
  addReturnRequest: (request) =>
    set((state) => ({ returns: [request, ...state.returns] })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      ),
    })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((item) => ({
        ...item,
        read: true,
      })),
    })),
  setDemoContact: (contact) => set({ demoContact: contact }),
}));
