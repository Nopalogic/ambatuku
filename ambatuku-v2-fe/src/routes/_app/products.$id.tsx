import ProductPage from '@/pages/app/products';
import { getProduct } from '@/services/product';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/products/$id')({
  component: ProductPage,
  loader: async ({params}) => {
    const response = await getProduct(params.id);
    return { response };
  },
})
