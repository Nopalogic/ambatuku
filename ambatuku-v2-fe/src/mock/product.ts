import { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    image: "https://picsum.photos/200/200",
    name: "Wireless Headphones",
    description: "High quality wireless headphones with noise cancellation.",
    category: "Electronics",
    stock: 25,
    variant: "Black",
    price: 199.99,
  },
  {
    id: "2",
    image: "https://picsum.photos/200/200",
    name: "Running Shoes",
    description: "Comfortable and lightweight running shoes for daily jogging.",
    category: "Footwear",
    stock: 40,
    variant: "Blue - Size 42",
    price: 89.99,
  },
  {
    id: "3",
    image: "https://picsum.photos/200/200",
    name: "Water Bottle",
    description:
      "Insulated water bottle that keeps your drink cold for 24 hours.",
    category: "Accessories",
    stock: 100,
    variant: "Stainless Steel - 750ml",
    price: 15.5,
  },
  {
    id: "4",
    image: "https://picsum.photos/200/200",
    name: "Smart Watch",
    description:
      "Track your fitness and stay connected with this sleek smartwatch.",
    category: "Electronics",
    stock: 10,
    variant: "Silver",
    price: 149.99,
  },
  {
    id: "5",
    image: "https://picsum.photos/200/200",
    name: "Graphic T-Shirt",
    description: "Cotton t-shirt with unique and trendy graphic design.",
    category: "Clothing",
    stock: 75,
    variant: "Medium - Black",
    price: 22.0,
  },
];
