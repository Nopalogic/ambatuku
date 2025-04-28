import { useLoaderData } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";

import { Header } from "@/components/app/header";
// import { UserProductCard } from "@/components/product-card";

import { UserProductCard } from "@/components/product-card";

import { Product } from "@/types/product";

// import { ProductCardSkeleton } from "@/components/app/product-card-skeleton";

export default function HomePage() {
  const { response } = useLoaderData({ from: "/_app/" });

  const products = response.data.data;

  return (
    <>
      <Header />
      <main className='container mx-auto px-4 py-8'>
        <section className='mb-12'>
          <Carousel className='w-full'>
            <CarouselContent>
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <CarouselItem key={index}>
                    <div className='relative h-[400px] overflow-hidden rounded-lg'>
                      <img
                        src={`/carousel-${index + 1}.png`}
                        alt={`image-carousel-${index + 1}`}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        </section>

        <section>
          <h2 className='mb-6 text-2xl font-bold'>Products</h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5'>
            {products.length > 0 ? (
              products.map((product: Product) => (
                <UserProductCard key={product.id} {...product} />
              ))
            ) : (
              <p>not found</p>
            )}
          </div>
        </section>
      </main>

      <footer className='mt-16 bg-muted py-12'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
            <div>
              <h3 className='mb-4 font-bold'>About Us</h3>
              <p className='text-muted-foreground'>
                Discover the latest trends in fashion and lifestyle products at
                Ambatuku.
              </p>
            </div>
            <div>
              <h3 className='mb-4 font-bold'>Customer Service</h3>
              <ul className='space-y-2 text-muted-foreground'>
                <li>Contact Us</li>
                <li>Shipping Information</li>
                <li>Returns & Exchanges</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className='mb-4 font-bold'>Quick Links</h3>
              <ul className='space-y-2 text-muted-foreground'>
                <li>New Arrivals</li>
                <li>Best Sellers</li>
                <li>Sale</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className='mb-4 font-bold'>Newsletter</h3>
              <p className='mb-4 text-muted-foreground'>
                Subscribe to receive updates, access to exclusive deals, and
                more.
              </p>
              <div className='flex gap-2'>
                <Input type='email' placeholder='Enter your email' />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className='mt-8 border-t pt-8 text-center text-muted-foreground'>
            <p>&copy; 2025 Ambatuku. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
