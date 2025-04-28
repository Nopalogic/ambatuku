import CartPage from "@/pages/app/cart";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/cart/")({
  component: CartPage,
});
