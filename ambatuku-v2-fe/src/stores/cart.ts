import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { CartItem } from "@/types/cart";

type CartState = {
  cartItems: CartItem[];
  selectedItems: CartItem[];
  selectedTotal: number;
  selectedCount: number;
  allItemsSelected: boolean;
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleItemSelection: (id: string) => void;
  selectAllItems: (select: boolean) => void;
  clearCart: () => void;
  clearSelectedItems: () => void;
  getItemQuantity: (id: string) => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => {
      // Helper function to calculate derived state
      const calculateDerivedState = (cartItems: CartItem[]) => {
        const selectedItems = cartItems.filter((item) => item.selected);
        return {
          selectedItems,
          selectedTotal: selectedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          selectedCount: selectedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
          allItemsSelected:
            cartItems.length > 0 && cartItems.every((item) => item.selected),
          totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
        };
      };

      return {
        cartItems: [],
        selectedItems: [],
        selectedTotal: 0,
        selectedCount: 0,
        allItemsSelected: false,
        totalItems: 0,
        totalPrice: 0,

        addToCart: (item: CartItem) => {
          set((state) => {
            const existingItemIndex = state.cartItems.findIndex(
              (cartItem) => cartItem.id === item.id
            );

            let newCartItems;
            if (existingItemIndex >= 0) {
              newCartItems = [...state.cartItems];
              newCartItems[existingItemIndex] = {
                ...newCartItems[existingItemIndex],
                quantity:
                  newCartItems[existingItemIndex].quantity + item.quantity,
              };
            } else {
              newCartItems = [...state.cartItems, { ...item, selected: true }];
            }

            return {
              cartItems: newCartItems,
              ...calculateDerivedState(newCartItems),
            };
          });
        },

        removeFromCart: (id: string) => {
          set((state) => {
            const newCartItems = state.cartItems.filter(
              (item) => !(item.id === id)
            );
            return {
              cartItems: newCartItems,
              ...calculateDerivedState(newCartItems),
            };
          });
        },

        updateQuantity: (id: string, quantity: number) => {
          if (quantity < 1) {
            get().removeFromCart(id);
            return;
          }

          set((state) => {
            const newCartItems = state.cartItems.map((item) =>
              item.id === id ? { ...item, quantity } : item
            );
            return {
              cartItems: newCartItems,
              ...calculateDerivedState(newCartItems),
            };
          });
        },

        toggleItemSelection: (id: string) => {
          set((state) => {
            const newCartItems = state.cartItems.map((item) =>
              item.id === id ? { ...item, selected: !item.selected } : item
            );
            return {
              cartItems: newCartItems,
              ...calculateDerivedState(newCartItems),
            };
          });
        },

        selectAllItems: (select: boolean) => {
          set((state) => {
            const newCartItems = state.cartItems.map((item) => ({
              ...item,
              selected: select,
            }));
            return {
              cartItems: newCartItems,
              ...calculateDerivedState(newCartItems),
            };
          });
        },

        clearCart: () => {
          set({
            cartItems: [],
            selectedItems: [],
            selectedTotal: 0,
            selectedCount: 0,
            allItemsSelected: false,
            totalItems: 0,
            totalPrice: 0,
          });
        },

        clearSelectedItems: () => {
          set((state) => {
            const newCartItems = state.cartItems.filter(
              (item) => !item.selected
            );
            return {
              cartItems: newCartItems,
              ...calculateDerivedState(newCartItems),
            };
          });
        },

        getItemQuantity: (id: string) => {
          const item = get().cartItems.find((item) => item.id === id);
          return item ? item.quantity : 0;
        },
      };
    },
    {
      name: "ambatuku-cart-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist the cartItems to storage
      partialize: (state) => ({ cartItems: state.cartItems }),
      // On rehydration, reset selection states
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.cartItems = state.cartItems.map((item) => ({
            ...item,
            selected: false,
          }));
          // Recalculate derived state
          const derived = calculateDerivedState(state.cartItems);
          Object.assign(state, derived);
        }
      },
    }
  )
);

// Helper function for derived state calculations
function calculateDerivedState(cartItems: CartItem[]) {
  const selectedItems = cartItems.filter((item) => item.selected);
  return {
    selectedItems,
    selectedTotal: selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    selectedCount: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
    allItemsSelected:
      cartItems.length > 0 && cartItems.every((item) => item.selected),
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
  };
}
