import Products from "@/pages/admin/products";
import { createFileRoute } from "@tanstack/react-router";

import { getProducts } from "@/services/product";

export const Route = createFileRoute("/admin/products/")({
  component: Products,
  loader: async () => {
    const response = await getProducts();
    return { response };
  },
});
