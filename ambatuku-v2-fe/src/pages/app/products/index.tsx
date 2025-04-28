import { mockProducts } from "@/mock/product";
import { mockReviews } from "@/mock/reviews";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Star } from "lucide-react";

import { useState } from "react";

import { Route } from "@/routes/_app/products.$id";

import { formatCurrency } from "@/lib/format";

import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useCheckoutStore } from "@/stores/checkout";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { UserProductCard } from "@/components/product-card";
import { useLoaderData } from "@tanstack/react-router";

const ProductImage = ({ image, name }: { image: string; name: string }) => (
  <div className='relative aspect-square h-[17.5rem] overflow-hidden rounded-lg'>
    <img src={image} alt={name} className='h-full w-full object-cover' />
  </div>
);

const ProductRating = ({ rating = 5 }: { rating?: number }) => (
  <div className='flex items-center space-x-2'>
    <div className='flex items-center'>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  </div>
);

const QuantitySelector = ({
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
      onClick={onDecrease}
      disabled={quantity <= 1}
    >
      <Minus className='h-4 w-4' />
    </Button>
    <span className='w-12 text-center'>{quantity}</span>
    <Button variant='outline' size='icon' onClick={onIncrease}>
      <Plus className='h-4 w-4' />
    </Button>
  </div>
);

const ReviewCard = ({
  userId,
  rating,
  message,
}: {
  userId: string;
  rating: number;
  message: string;
}) => {
  return (
    <Card className='p-4'>
      <div className='flex items-center space-x-2'>
        <ProductRating rating={rating} />
        <span className='font-medium'>{userId}</span>
      </div>
      <p className='mt-2 text-muted-foreground'>{message}</p>
    </Card>
  );
};

const RelatedProducts = ({
  currentProductId,
}: {
  currentProductId: string;
}) => (
  <div className='mt-16'>
    <h2 className='mb-6 text-2xl font-bold'>Produk Terkait</h2>
    <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>
      {mockProducts
        .filter((product) => product.id !== currentProductId)
        .slice(0, 4)
        .map((product) => (
          <UserProductCard key={product.id} {...product} />
        ))}
    </div>
  </div>
);

export default function ProductPage() {
  const { id } = Route.useParams();
  const { response } = useLoaderData({ from: "/_app/products/$id" });

  const product = response.data;
  const reviews = mockReviews.filter((review) => review.productId === id);

  if (!product) {
    return null;
  }

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const addToCart = useCartStore((state) => state.addToCart);
  const addToCheckout = useCheckoutStore((state) => state.addToCheckout);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate({ to: "/auth/login" });
    }

    addToCart({
      ...product,
      quantity,
    });
    toast({
      title: "Produk sudah masuk ke keranjang lho!",
      description: "Klik ikon keranjang di atas untuk melihat produk",
    });
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate({ to: "/auth/login" });
      return null;
    }

    addToCheckout({
      ...product,
      quantity,
    });
    navigate({ to: "/cart/checkout" });
  };

  return (
    <div className='px-4 py-8 lg:mx-40'>
      <div className='flex flex-col gap-8 md:flex-row'>
        <div className='space-y-4'>
          <ProductImage image={product.image} name={product.name} />
        </div>
        <div className='space-y-6'>
          <div>
            <h1 className='text-3xl font-bold'>
              {product.name} - {product.variant}
            </h1>
            <div className='flex gap-2'>
              <ProductRating />
              <span className='text-muted-foreground'>
                ({reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className='space-y-2'>
            <p className='text-3xl font-bold'>
              {formatCurrency("id-ID", "IDR", product.price)}
            </p>
            <p className='text-muted-foreground'>{`Stock: ${product.stock}`}</p>
          </div>

          <div className='space-y-4'>
            <QuantitySelector
              quantity={quantity}
              onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
              onIncrease={() => setQuantity(quantity + 1)}
            />
          </div>

          <div className='flex space-x-4'>
            <Button className='flex-1' size='lg' onClick={handleAddToCart}>
              Tambah ke Keranjang
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='flex-1'
              onClick={handleCheckout}
            >
              Beli Sekarang
            </Button>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='mb-6 text-2xl font-bold'>Deskripsi</h2>
        <p className='text-muted-foreground'>{product.description}</p>
      </div>

      <div className='mt-8 space-y-4'>
        <h2 className='mb-6 text-2xl font-bold'>Reviews</h2>
        {reviews.slice(0, 3).map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
        {reviews.length > 3 && (
          <div className='flex w-full justify-center'>
            <Button variant='link'>Lihat lainnya</Button>
          </div>
        )}
      </div>

      <RelatedProducts currentProductId={id} />
    </div>
  );
}
