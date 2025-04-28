import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { CheckoutItem, CheckoutState } from "@/types/checkout";

type CheckoutActions = {
  addToCheckout: (items: CheckoutItem | CheckoutItem[]) => void;
  removeFromCheckout: (itemId: string) => void;
  clearCheckout: () => void;
};

const initialState: CheckoutState = {
  items: [],
  total: 0,
};

export const useCheckoutStore = create<CheckoutState & CheckoutActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      addToCheckout: (items: CheckoutItem | CheckoutItem[]) => {
        const itemsArray = Array.isArray(items) ? items : [items];
        const newState = {
          items: itemsArray,
          total: itemsArray.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
        };
        set(newState);
      },

      removeFromCheckout: (itemId: string) => {
        const filteredItems = get().items.filter((item) => item.id !== itemId);
        set({
          items: filteredItems,
          total: filteredItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
        });
      },

      clearCheckout: () => {
        set(initialState);
      },
    }),
    {
      name: "ambatuku-checkout-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist the necessary data
      partialize: (state) => ({
        items: state.items,
        total: state.total,
      }),
      // Handle potential errors during rehydration
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Failed to rehydrate checkout state", error);
          state?.clearCheckout();
        }
      },
    }
  )
);
