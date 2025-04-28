import HomePage from '@/pages/app'
import { getProducts } from '@/services/product';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
  component: HomePage,
  loader: async () => {
    const response = await getProducts();
    return { response };
  },
})
