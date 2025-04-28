import { useLoaderData } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { Main } from "@/components/admin/layout/main";
import { AdminProductCard } from "@/components/product-card";

import { Product } from "@/types/product";

import AddProductPage from "./add";

const productText = new Map<string, string>([
  ["all", "All Products"],
  ["ready", "Ready"],
  ["sold", "Sold Out"],
]);

export default function Products() {
  const { response } = useLoaderData({ from: "/admin/products/" });

  const products = response.data;

  const [sort, setSort] = useState("ascending");
  const [productType, setProductType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.data
    .sort((a: Product, b: Product) =>
      sort === "ascending"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((product: Product) =>
      productType === "ready"
        ? product.stock > 0
        : productType === "sold"
          ? product.stock == 0
          : true
    )
    .filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Main fixed>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Products</h1>
        <p className='text-muted-foreground'>
          Here&apos;s a list of your products!
        </p>
      </div>
      <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
        <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
          <Input
            placeholder='Filter products...'
            className='h-9 w-40 lg:w-[250px]'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={productType} onValueChange={setProductType}>
            <SelectTrigger className='w-36'>
              <SelectValue>{productText.get(productType)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Products</SelectItem>
              <SelectItem value='ready'>Ready</SelectItem>
              <SelectItem value='sold'>Sold Out</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className='w-16'>
              <SelectValue>
                <SlidersHorizontal className='size-4' />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align='end'>
              <SelectItem value='ascending'>
                <div className='flex items-center gap-4'>
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value='descending'>
                <div className='flex items-center gap-4'>
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AddProductPage />
      </div>
      <Separator className='shadow' />
      <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-4'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <AdminProductCard key={product.id} {...product} />
          ))
        ) : (
          <p>Not found</p>
        )}
      </ul>
    </Main>
  );
}
