import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";

import { formatCurrency } from "@/lib/format";

import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useCheckoutStore } from "@/stores/checkout";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Header } from "@/components/app/header";

const CartHeader = ({
  cartItemsCount,
  onSelectAll,
  onClearCart,
}: {
  cartItemsCount: number;
  onSelectAll: (checked: boolean) => void;
  onClearCart: () => void;
}) => (
  <div className='flex items-center justify-between border-b p-4'>
    <div className='flex items-center'>
      <Checkbox
        id='select-all'
        onChange={(e) => onSelectAll((e.target as HTMLInputElement).checked)}
      />
      <label htmlFor='select-all' className='ml-2'>
        Pilih Semua <span className='text-gray-500'>({cartItemsCount})</span>
      </label>
    </div>
    <button className='font-medium text-red-500' onClick={onClearCart}>
      Hapus
    </button>
  </div>
);

const QuantityControl = ({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) => (
  <div className='flex items-center space-x-2'>
    <Button
      variant='outline'
      size='icon'
      className='p-1 px-2'
      onClick={onDecrease}
    >
      <Minus className='h-5 w-5 text-gray-500' />
    </Button>
    <span className='px-3 py-1'>{quantity}</span>
    <Button
      variant='outline'
      size='icon'
      className='p-1 px-2'
      onClick={onIncrease}
    >
      <Plus className='h-5 w-5 text-gray-500' />
    </Button>
  </div>
);

const CartItem = ({
  item,
  onToggleSelection,
  onUpdateQuantity,
  onRemove,
}: {
  item: any;
  onToggleSelection: () => void;
  onUpdateQuantity: (newQuantity: number) => void;
  onRemove: () => void;
}) => (
  <div className='flex flex-col border-t p-4 md:flex-row'>
    <div className='flex items-start'>
      <Checkbox
        id={item.id}
        className='mr-3 mt-1'
        checked={item.selected}
        onCheckedChange={onToggleSelection}
      />
      <div className='mr-4 h-20 w-20 flex-shrink-0'>
        <img
          src={item.image}
          alt='Product image'
          width={80}
          height={80}
          className='size-20 rounded-md object-cover'
        />
      </div>
    </div>

    <div className='mt-3 flex-1 md:mt-0'>
      <div className='flex flex-col justify-between'>
        <div className='flex justify-between'>
          <div>
            <a href={`/products/${item.id}`}>
              <h3 className='font-medium'>{item.name}</h3>
            </a>
            <h5 className='text-sm'>{item.size}</h5>
          </div>
          <span className='font-bold'>
            {formatCurrency("id-ID", "IDR", item.price)}
          </span>
        </div>

        <div className='mt-3 flex items-center justify-end gap-4 md:mt-0'>
          <button
            className='text-gray-400 hover:text-gray-600'
            onClick={onRemove}
          >
            <Trash2 className='h-6 w-6' />
          </button>
          <QuantityControl
            quantity={item.quantity}
            onDecrease={() => onUpdateQuantity(item.quantity - 1)}
            onIncrease={() => onUpdateQuantity(item.quantity + 1)}
          />
        </div>
      </div>
    </div>
  </div>
);

const CartSummary = ({
  selectedTotal,
  selectedCount,
  onCheckout,
}: {
  selectedTotal: number;
  selectedCount: number;
  onCheckout: () => void;
}) => (
  <div className='sticky top-16 rounded-lg bg-white p-4 shadow-sm'>
    <h2 className='mb-4 text-lg font-bold'>Ringkasan belanja</h2>
    <div className='mb-4 flex justify-between'>
      <span>Total</span>
      <span className='font-bold'>
        {formatCurrency("id-ID", "IDR", selectedTotal)}
      </span>
    </div>
    <button
      onClick={onCheckout}
      disabled={selectedCount === 0}
      className='mt-6 w-full rounded-lg bg-green-500 py-3 font-medium text-white transition hover:bg-green-600'
    >
      <span>Bayar</span>
      {selectedCount > 0 && <span className='ml-1'>({selectedCount})</span>}
    </button>
  </div>
);

export default function CartPage() {
  const {
    cartItems,
    selectedItems,
    selectedTotal,
    selectedCount,
    toggleItemSelection,
    selectAllItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const addToCheckout = useCheckoutStore((state) => state.addToCheckout);
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!isAuthenticated) return navigate({ to: "/auth/login" });

  const handleCheckout = () => {
    addToCheckout(selectedItems);
    navigate({ to: "/cart/checkout" });
  };

  return (
    <>
      <Header />
      <main className='container mx-auto px-4 py-6'>
        <h1 className='mb-4 text-2xl font-bold'>Keranjang</h1>
        <div className='flex flex-col gap-6 lg:flex-row'>
          <div className='lg:w-2/3'>
            <div className='overflow-hidden rounded-lg bg-white shadow-sm'>
              {cartItems.length > 0 ? (
                <>
                  <CartHeader
                    cartItemsCount={cartItems.length}
                    onSelectAll={selectAllItems}
                    onClearCart={clearCart}
                  />
                  <div className='border-b'>
                    {cartItems.map((item) => (
                      <CartItem
                        key={`${item.id}`}
                        item={item}
                        onToggleSelection={() => toggleItemSelection(item.id)}
                        onUpdateQuantity={(newQuantity) =>
                          updateQuantity(item.id, newQuantity)
                        }
                        onRemove={() => {
                          removeFromCart(item.id);
                          toast({ title: "1 produk telah dihapus." });
                        }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className='w-full text-center'>
                  <p className='py-3'>Keranjang kamu kosong!</p>
                </div>
              )}
            </div>
          </div>

          <div className='lg:w-1/3'>
            <CartSummary
              selectedTotal={selectedTotal}
              selectedCount={selectedCount}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </main>
    </>
  );
}
