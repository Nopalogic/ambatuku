import * as RadioGroup from "@radix-ui/react-radio-group";
import { ChevronDown, MapPin } from "lucide-react";

import { useEffect, useState } from "react";

import { formatCurrency, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

import {
  OTHER_FEES,
  PAYMENT_OPTIONS,
  SHIPPING_OPTIONS,
} from "@/constants/chekout";

import { useCheckoutStore } from "@/stores/checkout";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const Header = () => (
  <header className='border-b bg-white px-6 py-4'>
    <div className='mx-auto max-w-6xl'>
      <h1>Ambatuku</h1>
    </div>
  </header>
);

const AddressSection = () => (
  <div className='rounded-lg bg-white p-6 shadow-sm'>
    <div className='mb-4 flex items-center justify-between'>
      <h2 className='text-sm font-semibold uppercase text-gray-600'>
        Alamat Pengiriman
      </h2>
    </div>

    <div className='flex items-start gap-2'>
      <MapPin className='mt-1 h-5 w-5 flex-shrink-0 text-green-500' />
      <div>
        <div className='font-medium'>Rumah - Naufal</div>
        <p className='mt-1 text-sm text-gray-600'>
          Jl. Lapangan Bola Jeprah RT. 001/011 no. 13 (Disamping RM Padang),
          Jonggol, Kab. Bogor, Jawa Barat, 6281211849448
        </p>
      </div>
      <button className='ml-auto rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-600'>
        Ganti
      </button>
    </div>
  </div>
);

const ProductItem = ({ item }: { item: any }) => (
  <>
    <div className='flex gap-4 py-4'>
      <div className='h-16 w-16 flex-shrink-0'>
        <img
          src={item.image}
          alt='Product'
          width={64}
          height={64}
          className='h-full w-full rounded-md object-cover'
        />
      </div>
      <div className='flex w-full items-start justify-between'>
        <div>
          <h3 className='text-base font-medium'>{item.name}</h3>
          <h3 className='text-sm'>{item.variant}</h3>
        </div>
        <div className='flex h-full items-end'>
          <div className='text-sm'>{`${item.quantity} x ${formatCurrency("id-Id", "IDR", item.price)}`}</div>
        </div>
      </div>
    </div>
    <Separator className='mb-4' />
  </>
);

const ShippingSelector = ({
  selectedShipping,
  onSelectShipping,
}: {
  selectedShipping: number;
  onSelectShipping: (index: number) => void;
}) => (
  <Select
    onValueChange={(value) => {
      const index = SHIPPING_OPTIONS.findIndex((item) => item.type === value);
      if (index !== -1) onSelectShipping(index);
    }}
  >
    <SelectTrigger className='h-16'>
      <div>
        <span className='text-sm font-medium capitalize'>
          {`${SHIPPING_OPTIONS[selectedShipping].type} (${formatCurrency("id-ID", "IDR", SHIPPING_OPTIONS[selectedShipping].price)})`}
        </span>
        <div className='mt-1 text-sm text-gray-600'>
          Estimasi{" "}
          {formatDate(SHIPPING_OPTIONS[selectedShipping].estimation, "short")}
        </div>
      </div>
    </SelectTrigger>
    <SelectContent className='h-60'>
      {SHIPPING_OPTIONS.map((item) => (
        <SelectItem key={item.type} value={item.type}>
          <span className='text-sm font-medium capitalize'>
            {`${item.type} (${formatCurrency("id-ID", "IDR", item.price)})`}
          </span>
          <div className='mt-1 text-sm text-gray-600'>
            Estimasi {formatDate(item.estimation, "short")}
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const PaymentMethod = ({
  option,
  payment,
}: {
  option: (typeof PAYMENT_OPTIONS)[0];
  payment: () => void;
}) => (
  <RadioGroup.Item
    value={option.value}
    onClick={payment}
    className={cn(
      "group relative flex items-center justify-between rounded px-3 py-2 text-start ring-[1px] ring-border",
      "data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
    )}
  >
    <div className='flex items-center'>
      <img
        src={`/${option.image}-logo.png`}
        alt={`${option.label}-logo`}
        className='mr-3 h-6 w-6'
      />
      <span className='text-sm'>{option.label}</span>
    </div>
    <div className='flex size-4 items-center justify-center rounded-full bg-blue-500 group-data-[state=unchecked]:bg-gray-600'>
      <span className='size-[14px] rounded-full border-2 border-white bg-blue-500 group-data-[state=unchecked]:bg-white' />
    </div>
  </RadioGroup.Item>
);

const OrderSummary = ({
  totalItems,
  subtotal,
  shippingCost,
  onClick,
}: {
  totalItems: number;
  subtotal: number;
  shippingCost: number;
  onClick: () => void;
}) => {
  const totalBill =
    subtotal +
    shippingCost +
    OTHER_FEES.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div>
      <h3 className='mb-4 font-medium'>Cek ringkasan transaksimu, yuk</h3>

      <div className='mb-4 space-y-2'>
        <div className='flex justify-between text-sm'>
          <span>Total Harga {`(${totalItems} Barang)`}</span>
          <span>{formatCurrency("id-ID", "IDR", subtotal)}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Ongkos Kirim</span>
          <span className='text-gray-500'>
            {formatCurrency("id-ID", "IDR", shippingCost)}
          </span>
        </div>
        <Collapsible>
          <CollapsibleTrigger className='flex w-full justify-between text-sm'>
            <span>Total Lainnya</span>
            <ChevronDown className='h-5 w-5 text-gray-400' />
          </CollapsibleTrigger>
          <CollapsibleContent className='ml-2 mt-2'>
            {OTHER_FEES.map((fee) => (
              <div key={fee.name} className='flex justify-between text-sm'>
                <span>{fee.name}</span>
                <span>{formatCurrency("id-ID", "IDR", fee.amount)}</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className='flex items-center justify-between border-b border-t py-4'>
        <span className='font-medium'>Total Tagihan</span>
        <span className='text-lg font-bold'>
          {formatCurrency("id-ID", "IDR", totalBill)}
        </span>
      </div>

      <button
        className='mt-4 flex w-full items-center justify-center rounded-md bg-green-500 py-3 font-medium text-white hover:bg-green-600'
        onClick={onClick}
      >
        Bayar Sekarang
      </button>

      <p className='mt-3 text-center text-xs text-gray-500'>
        Dengan melanjutkan pembayaran, kamu menyetujui S&K Asuransi Pengiriman &
        Proteksi
      </p>
    </div>
  );
};

export default function CheckoutPage() {
  const [selectedShipping, setSelectedShipping] = useState(0);
  const [payment, setPayment] = useState("");
  const [token, setToken] = useState("");
  const { items, total } = useCheckoutStore();

  const totalItems = items.reduce((acc, { quantity }) => acc + quantity, 0);

  const handlePayment = async () => {
    const products = items.map(({ id, quantity }) => ({
      id,
      quantity,
    }));

    console.log({ products, payment });
  };

  useEffect(() => {
    if (token) {
      (window as any).snap.pay(token, {
        onSuccess: (result: any) =>
          localStorage.setItem("pembayaran", JSON.stringify(result)),
        onPending: (result: any) =>
          localStorage.setItem("pembayaran", JSON.stringify(result)),
        onError: (error: any) => console.log(error),
        onClose: () => console.log("Pembayar belum selesai"),
      });
      setToken("");
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/v1/transactions";

    const scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = import.meta.env.MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />

      <main className='mx-auto max-w-6xl px-4 py-4'>
        <h1 className='mb-4 text-2xl font-bold'>Checkout</h1>

        <div className='flex flex-col gap-6 lg:flex-row'>
          <div className='w-full space-y-6 lg:w-2/3'>
            <AddressSection />

            <div className='rounded-lg bg-white p-6 shadow-sm'>
              {items.map((item) => (
                <ProductItem key={item.id} item={item} />
              ))}
              <ShippingSelector
                selectedShipping={selectedShipping}
                onSelectShipping={setSelectedShipping}
              />
            </div>
          </div>

          <div className='w-full lg:w-1/3'>
            <div className='sticky top-6 rounded-lg bg-white p-6 shadow-sm'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-base font-medium'>Metode Pembayaran</h2>
                <Button variant='link' className='text-sm text-green-500'>
                  Lihat Semua
                </Button>
              </div>

              <div className='mb-6 space-y-4'>
                <RadioGroup.Root
                  defaultValue={payment}
                  className='flex w-full flex-col gap-4'
                >
                  {PAYMENT_OPTIONS.map((option) => (
                    <PaymentMethod
                      key={option.value}
                      option={option}
                      payment={() => setPayment(option.value)}
                    />
                  ))}
                </RadioGroup.Root>
              </div>

              <OrderSummary
                totalItems={totalItems}
                subtotal={total}
                shippingCost={SHIPPING_OPTIONS[selectedShipping].price}
                onClick={handlePayment}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
