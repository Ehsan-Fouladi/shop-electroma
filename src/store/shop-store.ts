import { create } from "zustand";

export interface CartLine {
  productId: string;
  quantity: number;
  /** A selected product variant, such as colour; absent for quick-adds. */
  variant?: string;
}

interface CartState {
  lines: CartLine[];
  addItem: (productId: string, quantity?: number, variant?: string) => void;
  setQuantity: (lineKey: string, quantity: number) => void;
  removeLine: (lineKey: string) => void;
  removeItem: (productId: string, variant?: string) => void;
  clear: () => void;
}

export function cartLineKey(
  line: Pick<CartLine, "productId" | "variant">,
): string {
  return `${line.productId}::${line.variant ?? ""}`;
}

/** UI-only cart state shared across product, cart and checkout routes. */
export const useCartStore = create<CartState>((set) => ({
  lines: [],
  addItem: (productId, quantity = 1, variant) =>
    set((state) => {
      const key = cartLineKey({ productId, variant });
      const existing = state.lines.find((line) => cartLineKey(line) === key);
      if (existing) {
        return {
          lines: state.lines.map((line) =>
            cartLineKey(line) === key
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          ),
        };
      }
      return {
        lines: [
          ...state.lines,
          { productId, quantity, ...(variant ? { variant } : {}) },
        ],
      };
    }),
  setQuantity: (lineKey, quantity) =>
    set((state) => ({
      lines:
        quantity <= 0
          ? state.lines.filter((line) => cartLineKey(line) !== lineKey)
          : state.lines.map((line) =>
              cartLineKey(line) === lineKey ? { ...line, quantity } : line,
            ),
    })),
  removeLine: (lineKey) =>
    set((state) => ({
      lines: state.lines.filter((line) => cartLineKey(line) !== lineKey),
    })),
  removeItem: (productId, variant) =>
    set((state) => ({
      lines: state.lines.filter((line) =>
        variant === undefined
          ? line.productId !== productId
          : line.productId !== productId || line.variant !== variant,
      ),
    })),
  clear: () => set({ lines: [] }),
}));

interface WishlistState {
  ids: string[];
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  ids: [],
  toggle: (productId) =>
    set((state) => ({
      ids: state.ids.includes(productId)
        ? state.ids.filter((id) => id !== productId)
        : [...state.ids, productId],
    })),
  remove: (productId) =>
    set((state) => ({ ids: state.ids.filter((id) => id !== productId) })),
}));

interface CompareState {
  ids: string[];
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

export const useCompareStore = create<CompareState>((set) => ({
  ids: [],
  toggle: (productId) =>
    set((state) => ({
      ids: state.ids.includes(productId)
        ? state.ids.filter((id) => id !== productId)
        : [...state.ids, productId].slice(-4),
    })),
  remove: (productId) =>
    set((state) => ({ ids: state.ids.filter((id) => id !== productId) })),
  clear: () => set({ ids: [] }),
}));

interface RecentlyViewedState {
  ids: string[];
  record: (productId: string) => void;
  clear: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>((set) => ({
  ids: [],
  record: (productId) =>
    set((state) => ({
      ids: [productId, ...state.ids.filter((id) => id !== productId)].slice(
        0,
        12,
      ),
    })),
  clear: () => set({ ids: [] }),
}));

/** Total item count, derived outside of the store to keep selectors stable. */
export function selectCartCount(state: CartState): number {
  return state.lines.reduce((total, line) => total + line.quantity, 0);
}
