export interface CartItem {
  id: string;
  name: string;
  image: string;
  category: string;
  variant: string;
  price: number;
  quantity: number;
  selected?: boolean;
}

export interface CartContextType {
  cartItems: CartItem[];
  selectedItems: CartItem[];
  addToCart: ({
    id,
    name,
    image,
    category,
    variant,
    price,
    quantity,
  }: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  toggleItemSelection: (id: string, size: string) => void;
  selectAllItems: (select: boolean) => void;
  clearCart: () => void;
  clearSelectedItems: () => void;
  totalItems: number;
  totalPrice: number;
  selectedTotal: number;
  selectedCount: number;
  allItemsSelected: boolean;
  getItemQuantity: (id: string, size: string) => number;
}
