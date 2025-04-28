import { Link } from "@tanstack/react-router";

import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Admin {
  id: string;
  name: string;
  image: File | string;
  description: string;
  variant: string;
  category: string;
  price: string;
  stock: number;
}

const AdminProductCard = ({
  id,
  image,
  stock,
  name,
  variant,
  price,
  category,
  description,
}: Admin) => (
  <Link
    to={`/admin/products/${id}`}
    className='h-[24rem] overflow-hidden rounded-lg border hover:shadow-md'
  >
    <div className='relative flex items-center justify-between'>
      <div className='aspect-square'>
        <img
          src={getImageUrl(image)}
          alt={name}
          className='h-full w-full rounded-t-lg object-cover'
        />
      </div>
      <Badge
        variant='outline'
        className={cn("absolute right-2 top-2 w-fit border px-2 py-2", {
          "border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900":
            stock > 50,
          "border-yellow-300 bg-yellow-50 hover:bg-yellow-100 dark:border-yellow-700 dark:bg-yellow-950 dark:hover:bg-yellow-900":
            stock > 0,
        })}
      >
        {stock ? `${stock} item${stock > 1 ? "s" : ""}` : "Sold Out"}
      </Badge>
    </div>
    <div className='p-4'>
      <h2 className='mb-1 font-semibold'>
        {name} - {variant}
      </h2>
      <p className='text-gray-500'>
        {category} - {formatCurrency("id-ID", "IDR", Number(price))}
      </p>
      <p className='line-clamp-2 text-gray-500'>{description}</p>
    </div>
  </Link>
);

interface User {
  id: string;
  name: string;
  image: File | string;
  category: string;
  variant: string;
  price: number;
}
const UserProductCard = ({
  id,
  image,
  name,
  category,
  variant,
  price,
}: User) => {
  const formattedPrice = formatCurrency("id-ID", "IDR", price);

  return (
    <Link to={`/products/${id}`}>
      <Card className='group'>
        <CardContent className='p-0'>
          <div className='relative aspect-square'>
            <img
              src={getImageUrl(image)}
              alt={name}
              className='h-full w-full rounded-t-lg object-cover'
            />
          </div>
          <div className='p-4'>
            <Badge variant='secondary' className='mb-2'>
              {category}
            </Badge>
            <h3 className='line-clamp-2 h-[3.5rem] font-semibold'>
              {name} - {variant}
            </h3>
            <span className='text-lg font-bold'>{formattedPrice}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const getImageUrl = (image: string | File) => {
  return typeof image === "string" ? image : URL.createObjectURL(image);
};

export { AdminProductCard, UserProductCard };
