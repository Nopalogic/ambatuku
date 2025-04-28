export interface CheckoutItem {
  id: string;
  name: string;
  image: string;
  category: string;
  variant: string;
  price: number;
  quantity: number;
}

export interface CheckoutState {
  items: CheckoutItem[];
  total: number;
}

export type CheckoutContextType = {
  checkoutState: CheckoutState;
  addToCheckout: (item: CheckoutItem | CheckoutItem[]) => void;
  removeFromCheckout: (itemId: string) => void;
  clearCheckout: () => void;
};
