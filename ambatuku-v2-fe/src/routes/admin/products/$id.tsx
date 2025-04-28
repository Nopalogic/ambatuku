import ProductEditPage from '@/pages/admin/products/edit';
import { getProduct } from '@/services/product';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/products/$id')({
  component: ProductEditPage,
  loader: async ({params}) => {
    const response = await getProduct(params.id);
    return { response };
  },
})
