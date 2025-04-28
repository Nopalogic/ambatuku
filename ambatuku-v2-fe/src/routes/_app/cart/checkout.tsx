import CheckoutPage from '@/pages/app/cart/checkout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/cart/checkout')({
  component: CheckoutPage,
})
