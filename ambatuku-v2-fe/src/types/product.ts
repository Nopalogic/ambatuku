export interface Product {
  id: string;
  name: string;
  image: File | string;
  category: string;
  description: string;
  variant: string;
  price: number;
  stock: number;
}
